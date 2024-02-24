import { Button } from "@/components/ui/button";
import { PT_Serif } from "next/font/google";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const ptSerif = PT_Serif({ weight: ["700"], subsets: ["latin"] });

export default async function Home() {
  const { accessToken } = (await getServerSession(authOptions))!;

  const folderQuery = encodeURIComponent(
    `name='books' and mimeType='application/vnd.google-apps.folder'`
  );

  const folderResponse = await axios.get(
    `https://www.googleapis.com/drive/v3/files?q=${folderQuery}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const folderId = folderResponse.data.files[0].id;

  const filesQuery = encodeURIComponent(`'${folderId}' in parents`);
  const filesResponse = await axios.get(
    `https://www.googleapis.com/drive/v3/files?q=${filesQuery}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const responseData: { files: { id: string; name: string }[] } =
    filesResponse.data;

  const books = responseData.files.map((d) => {
    return { id: d.id, name: d.name };
  });

  return (
    <main className="flex min-h-screen flex-col justify-start items-center p-4 lg:p-24">
      <section className="flex flex-col w-full lg:w-3/4">
        <h1
          className={`text-4xl lg:text-6xl text-gray-400 font-bold text-center mt-12 lg:mt-0 ${ptSerif.className}`}
        >
          My Books
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {books.map((book) => {
            return (
              <div
                className="rounded-3xl p-9 lg:p-12 bg-gray-100 text-slate-900 flex flex-col items-center justify-center text-center"
                key={book.id}
              >
                <h1 className={`font-black text-2xl ${ptSerif.className}`}>
                  {book.name}
                </h1>

                <Button className="mt-6">
                  <Link href={`/books/${book.id}`}>Continue Reading</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
