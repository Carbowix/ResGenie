import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { comparePassword } from '@/lib/userUtil';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};
        if (!username || !password) {
          throw new Error('Missing username or password');
        }
        const user = await prisma.user
          .findUnique({
            where: { username },
          })
          .catch((e) => {
            console.log(e);
            throw new Error('Error has occurred, Try again later');
          });

        if (
          !user ||
          !user.password ||
          !(await comparePassword(password, user.password))
        ) {
          throw new Error('Invalid account credentials');
        }
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export const getAuthSession = () => getServerSession(authOptions);
export { handler as GET, handler as POST };
