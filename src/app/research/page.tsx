import Section from "@/components/Section";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Research | Your College",
};

export default function Page(){ 
  return <Section title="Research" desc="Labs, centers, institutes" /> 
}