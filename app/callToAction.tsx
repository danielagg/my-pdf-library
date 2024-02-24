"use client";

import { Button } from "@/components/ui/button";
import { KeySquare } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export const CallToAction = () => {
  const { status } = useSession();

  if (status == "loading") {
    return <></>;
  }

  if (status === "authenticated") {
    return (
      <Button className="mt-10" variant="secondary">
        <Link href="/books" className="px-12 py-6">
          View My Books
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="mt-10 px-12 py-6 flex items-center space-x-2"
      variant="secondary"
      onClick={() => signIn("google")}
    >
      <KeySquare className="w-4 h-4" />
      <p>Sign in</p>
    </Button>
  );
};
