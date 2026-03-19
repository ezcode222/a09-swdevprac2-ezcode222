import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "../../../../libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const loginResult = await userLogIn(
          credentials.email,
          credentials.password
        );

        if (!loginResult) return null;

        return {
          id: "logged-in-user",
          token: loginResult.token,
        } as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user = {
        ...(session.user || {}),
        token: token.token,
      };
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};