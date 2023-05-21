import MongooseAdapter from '@/lib/auth-adapter/mongoose-adapter';
import dbConnect from '@/lib/dbConnect';
import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const getEnvVar = (variable: string): string => {
  const val = process.env[variable];
  if (val === undefined) {
    throw new Error(`process.env.${variable} is undefined!`);
  }
  return val;
};

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: getEnvVar('GITHUB_ID'),
      clientSecret: getEnvVar('GITHUB_SECRET'),
    }),
    GoogleProvider({
      clientId: getEnvVar('GOOGLE_CLIENT_ID'),
      clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET'),
    }),
  ],
  secret: getEnvVar('NEXTAUTH_SECRET'),
  // adapter: MongooseAdapter(dbConnect),
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id.toString();
      return Promise.resolve(session);
    },
  },
});
