"use client";

import { pdfjs, Document, Page } from "react-pdf";
import { useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

export default function Book({ params }: { params: { slug: string } }) {
  const [numPages, setNumPages] = useState<number>();

  // page: 58

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <main className="min-w-[100vw] min-h-[100vh] bg-red-200 text-4xl">
      <div>My Post: {params.slug}</div>
      <Document
        file="/books/pragmatic-programmer.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </main>
  );
}
