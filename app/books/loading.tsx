import { Skeleton } from "@/components/ui/skeleton";
import { PT_Serif } from "next/font/google";

const ptSerif = PT_Serif({ weight: ["700"], subsets: ["latin"] });

export default function Loading() {
  const BookSkeleton = () => {
    return (
      <div className="bg-white/40 flex relative w-full min-h-[20vh] rounded-2xl border border-blue-100/60">
        <div className="w-[140px] h-[190px] bg-gray-50 text-gray-200 rounded-lg absolute top-0 left-0 ml-2 -mt-4 shadow-xl border flex items-center justify-center text-3xl" />

        <div className="pl-[175px] w-[85%] min-h-full flex flex-col py-4">
          <Skeleton className="w-2/3 h-7" />
          <Skeleton className="w-1/2 h-7 mt-1" />
          <Skeleton className="w-1/2 h-2 rounded-full  mt-3" />
          <Skeleton className="w-1/4 h-4 mt-1" />
          <Skeleton className="w-1/4 h-10 mt-3" />
        </div>
      </div>
    );
  };
  return (
    <main className="flex min-h-screen flex-col justify-start items-center p-4 md:p-24">
      <section className="flex flex-col w-full lg:w-1/2">
        <h1
          className={`text-4xl md:text-6xl font-bold text-center mt-12 lg:mt-0 ${ptSerif.className}`}
        >
          My Books
        </h1>

        <div className="mt-20 space-y-12">
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
        </div>
      </section>
    </main>
  );
}
