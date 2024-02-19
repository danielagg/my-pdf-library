import { Button } from "@/components/ui/button";
import { PT_Serif } from "next/font/google";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const ptSerif = PT_Serif({ weight: ["700"], subsets: ["latin"] });

export default function Home() {
  const books = [
    {
      title: "The Pragmatic Programmer",
      author: "Andy Hunt, Dave Thomas",
      currentPage: 58,
      totalPages: 340,
      slug: "pragmatic-programmer",
    },
  ];
  return (
    <main className="flex min-h-screen flex-col justify-start items-center p-4 lg:p-24">
      <section className="flex flex-col w-full lg:w-3/4">
        <h1
          className={`text-4xl lg:text-6xl text-gray-400 font-bold text-center mt-12 lg:mt-0 ${ptSerif.className}`}
        >
          My Books
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {[...books, ...books, ...books, ...books, ...books, ...books].map(
            (book) => {
              return (
                <div
                  className="rounded-3xl py-4 bg-gray-100 text-slate-900 flex flex-col items-center justify-center text-center"
                  key={book.title}
                >
                  <Skeleton className="h-[24rem] w-[90%] mt-4 mb-12 rounded-xl" />
                  <h1
                    className={`font-black text-xl lg:text-2xl ${ptSerif.className}`}
                  >
                    {book.title}
                  </h1>
                  <p className="pt-1 opacity-75">{book.author}</p>

                  <Button className="mt-6">
                    <Link href={`/books/${book.slug}`}>Continue Reading</Link>
                  </Button>
                </div>
              );
            }
          )}
        </div>
      </section>
    </main>
  );
}
