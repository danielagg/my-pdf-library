import { AuthOptions, TokenSet } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.readonly",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ account, token }) {
      if (account?.access_token) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;

        token.expires_at = Math.floor(Date.now() / 1060);

        if (Date.now() > (token.expires_at as any) * 1000) {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: "" + process.env.GOOGLE_CLIENT_ID,
              client_secret: "" + process.env.GOOGLE_CLIENT_SECRET,
              grant_type: "refresh_token",
              refresh_token: "" + token.refresh_token,
            }),
            method: "POST",
          });

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          token.access_token = tokens.access_token as string;
          token.expires_at = Math.floor(Date.now() / 1060);

          return token;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.access_token as string;
      return session;
    },
  },
};
