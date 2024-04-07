"use client";

import Image from "next/image";
import { PT_Serif, Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { CallToAction } from "./callToAction";

const ptSerif = PT_Serif({ weight: ["700"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <SessionProvider>
        <section className="flex items-center justify-between w-2/3">
          <section>
            <h1 className={`text-7xl font-bold ${ptSerif.className}`}>
              My PDF Library
            </h1>
            <ul
              className={`list-inside list-disc space-y-1 pt-6 ml-2  ${roboto.className}`}
            >
              <li>Continue from where you&apos;ve left off in your PDFs,</li>
              <li>Keep notes while you are reading,</li>
              <li>Have all your PDF books in one place.</li>
            </ul>

            <CallToAction />
          </section>
          <Image
            src="/landing_v2.svg"
            alt="Landing illustration"
            width={500}
            height={200}
            priority
          />
        </section>
      </SessionProvider>
    </main>
  );
}
