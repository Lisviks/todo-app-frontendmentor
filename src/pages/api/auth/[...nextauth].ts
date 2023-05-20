import MongooseAdapter from '@/lib/auth-adapter/mongoose-adapter';
import dbConnect from '@/lib/dbConnect';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

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
  ],
  secret: getEnvVar('NEXTAUTH_SECRET'),
  adapter: MongooseAdapter(dbConnect),
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id.toString();
      return Promise.resolve(session);
    },
  },
});
