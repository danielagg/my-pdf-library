import { Button } from "@/components/ui/button";
import { PT_Serif } from "next/font/google";
import Link from "next/link";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const ptSerif = PT_Serif({ weight: ["700"], subsets: ["latin"] });

export default async function Home() {
  const { accessToken } = (await getServerSession(authOptions))!;

  let books: {
    id: string;
    name: string;
    previewLink: string | undefined;
  }[] = [];

  const removeFileExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) return fileName;

    return fileName.substring(0, lastDotIndex);
  };

  const folderQuery = encodeURIComponent(
    `name='books' and mimeType='application/vnd.google-apps.folder'`
  );

  try {
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

    books = responseData.files.map((d) => {
      return { id: d.id, name: d.name, previewLink: undefined };
    });

    for (const book of books) {
      const previewPictureResponse = await axios.get(
        `https://www.googleapis.com/drive/v3/files/${book.id}?fields=thumbnailLink`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      book.previewLink = previewPictureResponse.data.thumbnailLink;
    }
  } catch (error: any) {
    console.log(error);
  }

  return (
    <main className="flex min-h-screen flex-col justify-start items-center p-4 md:p-24">
      <section className="flex flex-col w-full lg:w-1/2">
        <h1
          className={`text-4xl md:text-6xl font-bold text-center mt-12 lg:mt-0 ${ptSerif.className}`}
        >
          My Books
        </h1>

        <div className="mt-20 space-y-12">
          {books.map((book) => {
            return (
              <div
                className="bg-white/40 flex relative w-full min-h-[20vh] rounded-2xl border border-blue-100/60"
                key={book.id}
              >
                {book.previewLink ? (
                  <div
                    style={{ backgroundImage: `url(${book.previewLink})` }}
                    className="w-[140px] h-[190px] rounded-lg absolute top-0 left-0 ml-2 -mt-4 shadow-xl bg-cover bg-center border"
                  />
                ) : (
                  <div className="w-[140px] h-[190px] bg-gray-50 text-gray-200 rounded-lg absolute top-0 left-0 ml-2 -mt-4 shadow-xl border flex items-center justify-center text-3xl">
                    <h1>?</h1>
                  </div>
                )}

                <div className="pl-[175px] w-[85%] min-h-full flex flex-col justify-between py-4">
                  <div>
                    <h1 className={`text-xl`}>
                      {removeFileExtension(book.name)}
                    </h1>
                    <div className="w-1/2 h-2 rounded-full bg-gray-300 mt-3">
                      <div className="w-1/2 h-2 rounded-full bg-gray-500" />
                    </div>
                    <p className="pt-1 text-gray-500 text-sm">
                      Currently on page 58.
                    </p>
                  </div>

                  <Button className="w-fit">
                    <Link href={`/books/${book.id}`}>Continue Reading</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
