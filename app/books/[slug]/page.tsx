"use client";

import { pdfjs, Document, Page } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useSession } from "next-auth/react";
import { downloadBook } from "./action";
import useWindowDimensions from "@/app/hooks/useWindowDimensions";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function BookPage({ params }: { params: { slug: string } }) {
  const [file, setFile] = useState<string | undefined>();
  const [numPages, setNumPages] = useState<number>();
  const currentPageRef = useRef<any>(null);
  const { data: session, status: sessionStatus } = useSession();

  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    const fetchBook = async () =>
      await downloadBook(session.accessToken!, params.slug);

    fetchBook().then((data) => {
      setFile(data);
    });
  }, [sessionStatus]);

  if (!file) {
    return (
      <div className="w-[100vw] flex items-center justify-center min-h-[100vh] bg-gray-50 border">
        <div className="border w-[90vw] h-[90vh] bg-gray-100 text-4xl text-gray-400 rounded-lg flex items-center justify-center animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

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
        className="border rounded-lg w-[90vw] h-[90vh] overflow-y-scroll"
        file={`data:application/pdf;base64,${file}`}
        onLoadSuccess={onDocumentLoadSuccess}
        loading=""
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div
            ref={index + 1 == 58 ? currentPageRef : null} // todo: we're loading on to page 58 --> we need to keep track of this
            key={`page_${index + 1}`}
            className="w-full flex justify-center items-center bg-white overflow-x-hidden"
          >
            <Page
              pageIndex={index + 1}
              width={windowWidth > 1000 ? windowWidth - 400 : windowWidth}
              loading=""
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </main>
  );
}
