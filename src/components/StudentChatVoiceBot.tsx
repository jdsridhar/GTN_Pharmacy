"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  MessageSquare,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  Key,
  Trash2,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  ExternalLink,
  ChevronDown,
  Info,
  RefreshCw,
  Phone,
  User,
  ShieldCheck,
  Building,
} from "lucide-react";
import {
  ChatMessage,
  askGeminiStudentBot,
  getGeminiApiKey,
  saveGeminiApiKey,
  queryLocalStudentData,
} from "@/lib/geminiService";
import { StudentRecord, studentsDatabase } from "@/data/portalData";

const INITIAL_MESSAGE: ChatMessage = {
  id: "msg-welcome",
  role: "assistant",
  content: `👋 **Welcome to GTN Pharmacy AI Voice & Chat Assistant!**

I am powered by **Google Gemini** and connected directly to the **GTN College of Pharmacy Student Records Database** for our inaugural 1st Batch (2024–2028).

🎙️ **You can ask me questions via Voice or Text about:**
- **Student Profiles**: Bio-data, parent contact, registration numbers
- **Fees**: Dues, payments made, tuition & lab breakdowns
- **Attendance**: Day-wise records, percentage, and **PCI 75% exam compliance**
- **Academics**: Sessional exam marks, CGPA, and ranks
- **Hospital Postings**: GTN Hospital orientation & clinical hours

*Try clicking one of the quick suggestions below or tap the microphone to speak!*`,
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

const SUGGESTIONS = [
  "Who has pending fee dues?",
  "Attendance shortage below 75%",
  "Details for K. Anitha",
  "Top CGPA rankers",
  "Parent contact directory",
  "Hospital posting hours",
];

export default function StudentChatVoiceBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Voice States
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [autoVoiceResponse, setAutoVoiceResponse] = useState(false);

  // API Key Settings Modal
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [keyTestStatus, setKeyTestStatus] = useState<"idle" | "testing" | "valid" | "invalid">("idle");
  const [keyTestMessage, setKeyTestMessage] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech and API Key on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeKey = getGeminiApiKey();
      setSavedKey(activeKey);
      setApiKeyInput(activeKey);

      // Check Speech Recognition support
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setSpeechSupported(false);
      }
    }
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized, interimTranscript, isLoading]);

  // Clean up speech synthesis when closed
  useEffect(() => {
    if (!isOpen && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
    }
  }, [isOpen]);

  // Handle Text-to-Speech playback
  const handleToggleSpeak = (text: string, msgId: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking && speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown for spoken words
    const cleanText = text
      .replace(/[#*`_~]/g, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // link text only
      .replace(/\|/g, " ")
      .replace(/👉|💳|📅|🎓|📞|📜|👤|💰|⚠️|✅|🏆|📢|📌|🥇|🥈|🥉/g, "")
      .replace(/\n+/g, ". ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingMsgId(msgId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMsgId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Stop all speaking
  const handleStopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
    }
  };

  // Toggle Speech-to-Text
  const handleToggleListening = () => {
    if (!speechSupported) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN"; // Supports English (Indian accent)

    recognition.onstart = () => {
      setIsListening(true);
      setInterimTranscript("");
    };

    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setInterimTranscript(currentTranscript);

      if (event.results[0].isFinal) {
        const finalQuery = currentTranscript.trim();
        setInput(finalQuery);
        setInterimTranscript("");
        setIsListening(false);
        // Automatically ask question when speech completes
        if (finalQuery.length > 2) {
          handleSendMessage(finalQuery, true);
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
      setInterimTranscript("");
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Send message
  const handleSendMessage = async (queryText?: string, fromVoice = false) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isLoading) return;

    // Stop speaking any previous message
    handleStopSpeaking();

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isVoice: fromVoice,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askGeminiStudentBot(textToSend, messages);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        relatedStudents: response.relatedStudents,
      };

      setMessages((prev) => [...prev, botMsg]);

      // If auto voice response is enabled or query came from voice, read response aloud
      if (autoVoiceResponse || fromVoice) {
        setTimeout(() => {
          handleToggleSpeak(response.text, botMsg.id);
        }, 300);
      }
    } catch (err) {
      console.error("Error asking bot:", err);
      const fallback = queryLocalStudentData(textToSend);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: fallback.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        relatedStudents: fallback.relatedStudents,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Test Gemini API Key
  const handleTestApiKey = async () => {
    const key = apiKeyInput.trim();
    if (!key) {
      setKeyTestStatus("invalid");
      setKeyTestMessage("Please enter an API key first.");
      return;
    }

    setKeyTestStatus("testing");
    setKeyTestMessage("Testing connection to Gemini API...");

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${key}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Hello! Respond with: 'GTN Gemini API Connected Successfully'" }] }],
        }),
      });

      if (res.ok) {
        setKeyTestStatus("valid");
        setKeyTestMessage("✅ Gemini API connected and verified successfully!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        setKeyTestStatus("invalid");
        setKeyTestMessage(`❌ API Error: ${errorData?.error?.message || "Invalid API key"}`);
      }
    } catch (e: any) {
      setKeyTestStatus("invalid");
      setKeyTestMessage(`❌ Network error: ${e.message || "Failed to reach Gemini API"}`);
    }
  };

  // Save API Key
  const handleSaveApiKey = () => {
    const key = apiKeyInput.trim();
    saveGeminiApiKey(key);
    setSavedKey(key);
    setShowSettings(false);
    setKeyTestStatus("idle");
    setKeyTestMessage("");
  };

  // Clear Chat History
  const handleClearChat = () => {
    handleStopSpeaking();
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      {/* Floating Bot Launcher Button (Bottom-Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Tooltip Pill */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur text-white px-3.5 py-1.5 rounded-full shadow-lg border border-slate-700/50 text-xs animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Ask student data with Chat / Voice</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            aria-label="Open GTN Student AI Assistant"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-red-800 via-rose-900 to-red-950 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-red-500/50"
          >
            {/* Pulsing ring */}
            <span className="absolute -inset-1 rounded-full bg-red-600/30 blur-sm group-hover:bg-red-500/50 transition duration-300 animate-pulse" />

            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white group-hover:hidden transition-all" />
              <Sparkles className="w-6 h-6 text-amber-300 hidden group-hover:block transition-all" />
            </div>

            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-slate-900 items-center justify-center">
                AI
              </span>
            </span>
          </button>
        </div>
      )}

      {/* Main Bot Dialog Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-in-out shadow-2xl border border-slate-700/40 bg-slate-900/95 backdrop-blur-xl text-slate-100 flex flex-col ${
            isMinimized
              ? "bottom-6 right-6 w-80 h-14 rounded-2xl overflow-hidden"
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[480px] md:w-[520px] h-[650px] max-h-[88vh] rounded-2xl overflow-hidden"
          }`}
        >
          {/* Top Bar Header */}
          <div className="bg-gradient-to-r from-red-900 via-rose-950 to-slate-900 px-4 py-3 border-b border-red-800/40 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-red-700 to-amber-600 text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm tracking-wide text-white">
                    GTN Student AI Bot
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                    {savedKey ? "Gemini AI" : "Local Engine"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300/80 truncate">
                  Inaugural Batch 2024 Records • Voice & Chat
                </p>
              </div>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-1 text-slate-300">
              {/* Voice auto-read toggle */}
              <button
                onClick={() => setAutoVoiceResponse(!autoVoiceResponse)}
                title={autoVoiceResponse ? "Mute Bot Voice" : "Enable Bot Voice"}
                className={`p-1.5 rounded-lg transition-colors ${
                  autoVoiceResponse
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "hover:bg-white/10 text-slate-400"
                }`}
              >
                {autoVoiceResponse ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Gemini Settings Button */}
              <button
                onClick={() => setShowSettings(true)}
                title="Configure Gemini API Key"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors text-slate-400"
              >
                <Key className="w-4 h-4" />
              </button>

              {/* Clear chat */}
              <button
                onClick={handleClearChat}
                title="Clear conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-rose-300 transition-colors text-slate-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Minimize / Maximize */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors text-slate-400"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  handleStopSpeaking();
                  setIsOpen(false);
                }}
                title="Close Assistant"
                className="p-1.5 rounded-lg hover:bg-rose-500/30 hover:text-rose-200 transition-colors text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* If minimized, just show top bar */}
          {!isMinimized && (
            <>
              {/* Key status indicator banner if using local fallback */}
              {!savedKey && (
                <div className="bg-amber-950/40 border-b border-amber-600/30 px-3 py-1.5 flex items-center justify-between text-xs text-amber-200/90">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Using verified local student database.</span>
                  </div>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="text-amber-300 underline font-medium hover:text-amber-100 text-[11px]"
                  >
                    Add Gemini API Key
                  </button>
                </div>
              )}

              {/* Global active speech banner */}
              {isSpeaking && (
                <div className="bg-red-950/70 border-b border-red-500/30 px-3 py-1.5 flex items-center justify-between text-xs text-rose-200">
                  <div className="flex items-center gap-2">
                    <span className="flex space-x-0.5">
                      <span className="w-1 h-3 bg-red-400 animate-pulse rounded-full" />
                      <span className="w-1 h-4 bg-red-300 animate-pulse delay-75 rounded-full" />
                      <span className="w-1 h-2 bg-red-400 animate-pulse delay-150 rounded-full" />
                    </span>
                    <span>Speaking assistant response...</span>
                  </div>
                  <button
                    onClick={handleStopSpeaking}
                    className="px-2 py-0.5 bg-rose-500/20 hover:bg-rose-500/30 rounded border border-rose-500/40 text-[11px] font-medium"
                  >
                    Stop Speaking
                  </button>
                </div>
              )}

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-sm bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950/90">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      {/* Message Bubble Header */}
                      <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400 px-1">
                        {isUser ? (
                          <>
                            {msg.isVoice && (
                              <span className="flex items-center gap-0.5 text-rose-400">
                                <Mic className="w-3 h-3" /> Voice
                              </span>
                            )}
                            <span>You</span>
                            <span>•</span>
                            <span>{msg.timestamp}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span className="font-medium text-slate-300">GTN Pharmacy AI</span>
                            <span>•</span>
                            <span>{msg.timestamp}</span>
                            {/* Read Aloud Button for Bot */}
                            <button
                              onClick={() => handleToggleSpeak(msg.content, msg.id)}
                              title={
                                isSpeaking && speakingMsgId === msg.id
                                  ? "Stop reading aloud"
                                  : "Read aloud"
                              }
                              className="ml-1 text-slate-400 hover:text-amber-300 transition-colors p-0.5 rounded"
                            >
                              {isSpeaking && speakingMsgId === msg.id ? (
                                <VolumeX className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </>
                        )}
                      </div>

                      {/* Message Content */}
                      <div
                        className={`rounded-2xl px-4 py-3 max-w-[90%] leading-relaxed ${
                          isUser
                            ? "bg-gradient-to-r from-red-800 to-rose-900 text-white rounded-br-none shadow-md border border-red-700/50"
                            : "bg-slate-800/80 text-slate-100 rounded-bl-none shadow-lg border border-slate-700/60"
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        ) : (
                          <div className="prose prose-invert prose-sm max-w-none prose-headings:text-amber-300 prose-headings:font-semibold prose-headings:my-2 prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-table:my-2 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1 prose-td:border-b prose-td:border-slate-700 text-slate-200">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        )}
                      </div>

                      {/* Interactive Student Cards if related */}
                      {msg.relatedStudents && msg.relatedStudents.length > 0 && (
                        <div className="mt-2.5 w-full space-y-2">
                          <p className="text-[11px] text-slate-400 flex items-center gap-1">
                            <GraduationCap className="w-3 h-3 text-red-400" />
                            <span>Matched Student Profiles ({msg.relatedStudents.length}):</span>
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {msg.relatedStudents.slice(0, 4).map((st) => (
                              <div
                                key={st.id}
                                className="bg-slate-800/90 border border-slate-700/70 rounded-xl p-2.5 flex flex-col justify-between hover:border-red-500/50 transition-colors"
                              >
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-700 shrink-0 border border-slate-600">
                                    <Image
                                      src={st.avatar}
                                      alt={st.name}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-xs text-white truncate">
                                      {st.name}
                                    </h4>
                                    <p className="text-[10px] text-slate-400 truncate">
                                      {st.id} • {st.courseShort}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] border-t border-slate-700/50 pt-1.5 text-center">
                                  <div className="bg-slate-900/50 rounded py-0.5">
                                    <span className="text-slate-400 block text-[9px]">CGPA</span>
                                    <span className="font-bold text-amber-400">{st.cgpa}</span>
                                  </div>
                                  <div className="bg-slate-900/50 rounded py-0.5">
                                    <span className="text-slate-400 block text-[9px]">Attd</span>
                                    <span
                                      className={`font-bold ${
                                        st.attendanceData.percentage >= 75
                                          ? "text-emerald-400"
                                          : "text-rose-400"
                                      }`}
                                    >
                                      {st.attendanceData.percentage}%
                                    </span>
                                  </div>
                                  <div className="bg-slate-900/50 rounded py-0.5">
                                    <span className="text-slate-400 block text-[9px]">Fee</span>
                                    <span
                                      className={`font-bold ${
                                        st.feesData.status === "Paid"
                                          ? "text-emerald-400"
                                          : "text-amber-400"
                                      }`}
                                    >
                                      {st.feesData.status === "Paid" ? "Cleared" : `₹${(st.feesData.pendingAmount / 1000).toFixed(0)}k`}
                                    </span>
                                  </div>
                                </div>

                                <Link
                                  href={`/student/${st.id}`}
                                  className="mt-2 text-center text-[10px] font-medium bg-red-950/60 hover:bg-red-900 text-rose-200 border border-red-700/40 rounded-lg py-1 flex items-center justify-center gap-1 transition-colors"
                                >
                                  <span>View Complete Profile</span>
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading state indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-400" />
                    <span>Gemini is analyzing student records...</span>
                  </div>
                )}

                {/* Live speech preview */}
                {isListening && (
                  <div className="bg-red-950/40 border border-red-600/50 rounded-xl p-3 flex items-center gap-3 animate-pulse">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white shrink-0">
                      <Mic className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-rose-300">
                        Listening... Speak your student query
                      </p>
                      <p className="text-xs text-slate-300 italic truncate">
                        {interimTranscript || "Say e.g.: 'Show fee dues' or 'Details for Vignesh'"}
                      </p>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Suggestion Chips */}
              <div className="px-3 py-2 bg-slate-900/95 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 select-none">
                <span className="text-[10px] text-slate-400 font-semibold shrink-0 uppercase tracking-wider pl-1">
                  Quick:
                </span>
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-white border border-slate-700 hover:border-red-600/50 transition-colors whitespace-nowrap"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Chat & Voice Input Box */}
              <div className="p-3 bg-slate-950 border-t border-slate-800/90 flex items-center gap-2">
                {/* Voice Input (Microphone) */}
                <button
                  type="button"
                  onClick={handleToggleListening}
                  title={
                    isListening
                      ? "Stop listening"
                      : speechSupported
                      ? "Speak using voice"
                      : "Voice input not supported in this browser"
                  }
                  className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                    isListening
                      ? "bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/40"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4 text-rose-400" />
                  )}
                </button>

                {/* Text Input */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={
                    isListening
                      ? "Listening to your voice..."
                      : "Ask about fees, attendance, marks, Anitha, Vignesh..."
                  }
                  className="flex-1 bg-slate-800/90 text-white placeholder-slate-400 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send Message"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-red-700 to-rose-800 hover:from-red-600 hover:to-rose-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* Gemini API Key Configuration Modal Overlay */}
          {showSettings && (
            <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-amber-400" />
                    <h4 className="font-semibold text-sm text-white">Gemini API Settings</h4>
                  </div>
                  <button
                    onClick={() => {
                      setShowSettings(false);
                      setKeyTestStatus("idle");
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Connect your own <strong>Google Gemini API Key</strong> for dynamic, high-accuracy conversational responses across the GTN student database.
                  </p>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Gemini API Key
                    </label>
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => {
                        setApiKeyInput(e.target.value);
                        setKeyTestStatus("idle");
                      }}
                      placeholder="AIzaSy..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Test Feedback */}
                  {keyTestMessage && (
                    <div
                      className={`p-2.5 rounded-lg text-xs ${
                        keyTestStatus === "valid"
                          ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
                          : keyTestStatus === "invalid"
                          ? "bg-rose-950/60 border border-rose-500/40 text-rose-300"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {keyTestMessage}
                    </div>
                  )}

                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-1.5">
                    <p className="font-semibold text-slate-300">How to get a free key:</p>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300/90">
                      <li>
                        Visit{" "}
                        <a
                          href="https://aistudio.google.com/app/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-400 underline hover:text-amber-300 inline-flex items-center gap-0.5"
                        >
                          Google AI Studio <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                        </a>
                      </li>
                      <li>Sign in with your Google Account and click &quot;Create API Key&quot;</li>
                      <li>Paste the generated key above and click Save</li>
                    </ol>
                    <p className="text-[10px] text-slate-500 italic pt-1">
                      Note: You can also set <code>NEXT_PUBLIC_GEMINI_API_KEY</code> in <code>.env.local</code>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleTestApiKey}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  Test Key
                </button>

                <div className="flex items-center gap-2">
                  {savedKey && (
                    <button
                      type="button"
                      onClick={() => {
                        setApiKeyInput("");
                        saveGeminiApiKey("");
                        setSavedKey("");
                        setKeyTestStatus("idle");
                        setKeyTestMessage("API key cleared. Now using local database engine.");
                      }}
                      className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-medium"
                    >
                      Remove Key
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSaveApiKey}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white text-xs font-semibold shadow-md transition-all"
                  >
                    Save & Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
