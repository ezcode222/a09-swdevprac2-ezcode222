"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
  const { data: session } = useSession();

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-6 border-b border-gray-200">
      <div>
        {!session ? (
          <Link href="/signin" className="text-amber-700 underline font-semibold">
            Sign-In
          </Link>
        ) : (
          <button
            className="text-amber-700 underline font-semibold"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign-Out
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <TopMenuItem title="Booking" pageRef="/booking" />
        <Image
          src="/img/logo.jpg"
          alt="logo"
          width={42}
          height={42}
          className="rounded-full"
        />
      </div>
    </div>
  );
}