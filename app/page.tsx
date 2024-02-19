import Image from "next/image";
import { PT_Serif, Roboto } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ptSerif = PT_Serif({ weight: ["700"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section className="flex items-center justify-between w-2/3">
        <section>
          <h1
            className={`text-7xl text-gray-100 font-bold ${ptSerif.className}`}
          >
            My PDF Library
          </h1>
          <ul
            className={`list-inside list-disc space-y-1 pt-6 ml-2 text-gray-100  ${roboto.className}`}
          >
            <li>Continue from where you&apos;ve left off in your PDFs,</li>
            <li>Keep notes while you are reading,</li>
            <li>Have all your PDF books in one place.</li>
          </ul>

          <Button className="mt-10 px-12 py-6" variant="secondary">
            <Link href="/books">View Books</Link>
          </Button>
        </section>
        <Image
          src="/landing_v2.svg"
          alt="Landing illustration"
          width={500}
          height={200}
          priority
        />
      </section>
    </main>
  );
}
