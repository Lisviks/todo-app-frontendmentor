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
});
