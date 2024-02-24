"use client";

import { pdfjs, Document, Page } from "react-pdf";
import { useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function BookPage() {
  const [numPages, setNumPages] = useState<number>();
  const currentPageRef = useRef<any>(null);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);

    setTimeout(() => {
      if (currentPageRef?.current != null) {
        currentPageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }, 1000);
  }

  return (
    <main className="min-w-[100vw] min-h-[100vh] flex flex-col items-center justify-center">
      <Document
        className="border w-2/3 h-[90vh] overflow-y-scroll hidden lg:block"
        file="/books/01.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        loading=""
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div
            ref={index + 1 == 58 ? currentPageRef : null}
            key={`page_${index + 1}`}
          >
            <Page
              pageIndex={index + 1}
              // pageNumber={pageNumber}
              width={1200}
              loading=""
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
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
