import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={roboto.className}>{children}</main>;
}
