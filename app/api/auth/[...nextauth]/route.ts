import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/docs https://www.googleapis.com/auth/drive",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token }) {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.access_token as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
