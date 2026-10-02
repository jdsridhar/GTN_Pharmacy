// "use client";

// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import { ZoomIn, ZoomOut, ArrowLeft, ArrowRight } from "lucide-react";

// // pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
// pdfjs.GlobalWorkerOptions.workerSrc =
//   `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// const CustomPdfViewer = ({ file }: { file: string }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.0);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
//   const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

//   const nextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages || prev));
//   const prevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

//   return (
//     <div className="h-full w-full flex flex-col bg-neutral-200 rounded-lg overflow-hidden">
//       {/* Toolbar */}
//       <div className="bg-neutral-800 text-white flex items-center justify-between p-2 shadow-md z-20">
//         <div className="flex items-center gap-2">
//           <button
//             onClick={zoomOut}
//             disabled={scale <= 0.5}
//             className="p-1 rounded hover:bg-neutral-700 disabled:opacity-50"
//           >
//             <ZoomOut size={20} />
//           </button>
//           <span className="text-sm w-12 text-center">
//             {(scale * 100).toFixed(0)}%
//           </span>
//           <button
//             onClick={zoomIn}
//             disabled={scale >= 3.0}
//             className="p-1 rounded hover:bg-neutral-700 disabled:opacity-50"
//           >
//             <ZoomIn size={20} />
//           </button>
//         </div>

//         {/* Page Navigation Arrows */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={prevPage}
//             disabled={pageNumber <= 1}
//             className="p-1 rounded hover:bg-neutral-700 disabled:opacity-50"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <button
//             onClick={nextPage}
//             disabled={pageNumber >= (numPages || 1)}
//             className="p-1 rounded hover:bg-neutral-700 disabled:opacity-50"
//           >
//             <ArrowRight size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Scrollable PDF Container */}
//       <div className="flex-grow flex justify-center bg-neutral-100">
//         <div className="w-full max-w-5xl h-[80vh] overflow-y-auto p-4 border-t border-neutral-300 rounded-b-lg flex justify-center">
//           <Document
//             file={file}
//             onLoadSuccess={onDocumentLoadSuccess}
//             loading={<p className="text-neutral-500 text-center">Loading PDF...</p>}
//             error={<p className="text-red-500 text-center">Failed to load PDF file.</p>}
//           >
//             <div className="shadow-lg mb-6 flex justify-center">
//               <Page
//                 pageNumber={pageNumber}
//                 scale={scale}
//                 renderTextLayer={false}
//                 renderAnnotationLayer={false}
//               />
//             </div>
//           </Document>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomPdfViewer;
"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ZoomIn, ZoomOut, ArrowLeft, ArrowRight } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

const CustomPdfViewer = ({ file }: { file: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const nextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages || prev));
  const prevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

  return (
    <div className="h-full w-full flex flex-col bg-neutral-200 rounded-lg overflow-hidden">
      <div className="bg-neutral-800 text-white flex items-center justify-between p-2 shadow-md z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-1 rounded hover:bg-neutral-700 disabled:opacity-50"
          >
            <ZoomOut size={20} />
          </button>

          <span className="text-sm w-12 text-center">
            {(scale * 100).toFixed(0)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 3.0}
            className="p-1 rounded hover:bg-neutral-700 disabled:opacity-50"
          >
            <ZoomIn size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={pageNumber <= 1}
            className="p-1 rounded hover:bg-neutral-700 disabled:opacity-50"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={nextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="p-1 rounded hover:bg-neutral-700 disabled:opacity-50"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex-grow flex justify-center bg-neutral-100">
        <div className="w-full max-w-5xl h-[80vh] overflow-y-auto p-4 border-t border-neutral-300 rounded-b-lg flex justify-center">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-neutral-500 text-center">Loading PDF...</p>}
            error={<p className="text-red-500 text-center">Failed to load PDF file.</p>}
          >
            <div className="shadow-lg mb-6 flex justify-center">
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
};

export default CustomPdfViewer;
