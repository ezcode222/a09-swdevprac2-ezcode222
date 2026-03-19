"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("alice@eventplanner.com");
  const [password, setPassword] = useState("g00dD@y$");

  return (
    <main className="p-8 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Sign-In</h1>

        <div className="flex flex-col gap-4">
          <input
            className="border p-3 rounded"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border p-3 rounded"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-black text-white rounded px-4 py-2"
            onClick={() =>
              signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
              })
            }
          >
            Sign-In
          </button>
        </div>
      </div>
    </main>
  );
}