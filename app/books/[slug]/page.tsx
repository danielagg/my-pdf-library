"use client";

import { pdfjs, Document, Page } from "react-pdf";
import { useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };

export default function Book({ params }: { params: { slug: string } }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  // page: 58

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <main className="min-w-[100vw] min-h-[100vh] flex flex-col items-center justify-center">
      <Document
        className="border w-2/3 h-[90vh] overflow-y-scroll hidden lg:block"
        file="/books/pragmatic-programmer.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={58}
            width={1200}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
      <Document
        className="border w-full h-[90vh] overflow-y-scroll block lg:hidden"
        file="/books/pragmatic-programmer.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={58}
            width={600}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </main>
  );
}
