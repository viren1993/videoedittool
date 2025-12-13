import type { ISODateString, AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { pagesOptions } from './pages-options';

// ------------------ TYPES ------------------

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string;
  access_token: string;
  role: 'superadmin' | 'company';
  profile?: {
    username: string;
    email: string;
    role: string;
    id: string;
    company_name: string;
    mobile: string;
    status: string;
    logo_url: string;
  };
};

// ------------------ AUTH OPTIONS ------------------

export const authOptions: AuthOptions = {
  pages: {
    ...pagesOptions,
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    // -------- JWT CALLBACK --------
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.access_token = (user as any).access_token;
        token.role = (user as any).role;
        token.profile = (user as any).profile;
      }
      return token;
    },

    // -------- SESSION CALLBACK --------
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        access_token: token.access_token as string,
        role: token.role as 'superadmin' | 'company',
        profile: token.profile as any,
      };
      return session;
    },

    // -------- REDIRECT CALLBACK --------
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // ------------------ PROVIDER ------------------

  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {},

      async authorize(credentials: any) {
        if (!credentials) return null;

        // ---- FIX: PARSE PROFILE IF STRING ----
        let profile = credentials.profile;

        if (typeof profile === 'string') {
          try {
            profile = JSON.parse(profile);
          } catch (err) {
            console.error('PROFILE PARSE ERROR:', err);
          }
        }

        return {
          id: profile?.id,
          access_token: credentials.access_token,
          role: credentials.role,
          profile, // full decoded profile object
        };
      },
    }),
  ],
};
