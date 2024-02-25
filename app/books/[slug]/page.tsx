"use client";

import { pdfjs, Document, Page } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useSession } from "next-auth/react";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function BookPage({ params }: { params: { slug: string } }) {
  const [numPages, setNumPages] = useState<number>();
  const currentPageRef = useRef<any>(null);
  const { data: session, status: sessionStatus } = useSession();

  const [fileUrl, setFileUrl] = useState<string | undefined>();

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;

    const accessToken = session!.accessToken!;

    const fetchBook = async () => {
      const url = new URL(
        `https://www.googleapis.com/drive/v3/files/${params.slug}`
      );
      url.searchParams.append("fields", "webContentLink");
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const downloadUrl = response.data.webContentLink;
      console.log(downloadUrl);
      setFileUrl(`https://cors-anywhere.herokuapp.com/${downloadUrl}`);

      // const fileResponse = await axios.get(downloadUrl, {
      //   responseType: "blob",
      //   headers: {
      //     "Access-Control-Allow-Origin": `*`,
      //   },
      // });

      // const blob = new Blob([fileResponse.data], {
      //   type: fileResponse.headers["content-type"],
      // });
      // const filename = response.data.name || "book.pdf";
    };

    fetchBook();
  }, [sessionStatus]);

  if (!fileUrl) {
    return <div>Loading...</div>;
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
        className="border w-2/3 h-[90vh] overflow-y-scroll hidden lg:block"
        // file="/books/01.pdf"
        file={fileUrl}
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
    </main>
  );
}
