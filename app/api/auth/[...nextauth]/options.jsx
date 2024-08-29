import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";

connectMongoDB();

export const options = {
  secret: process.env.NEXTAUTH_SECRET, //unneccesarry If you set NEXTAUTH_SECRET as an environment variable, you don't have to define this option.
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        if (credentials) {
          const { email, password } = credentials;
          const user = await User.findOne({
            email,
          });
          
          if (!user || !user.password) {
            throw new Error("🖐 Please check password");
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new Error("🔐 Invalid email or password");
          }
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // console.log("THIS IS CALLBACK", baseUrl);
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        (token.id = user._id),
          (token.user = {
            avatar: user?.avatar,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user?.email,
            role: user?.role,
            isVerifiedEmail: user?.isVerifiedEmail,
          });
      }
      // console.log("TOKEN IN OPTIONS", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.id = token.id),
          (session.user = {
            avatar: token.user.avatar,
            firstName: token.user.firstName,
            lastName: token.user.lastName,
            email: token.user.email,
            role: token.user.role,
            isVerifiedEmail: token.user.isVerifiedEmail,
          });
      }
      // console.log("SESSION IN OPTIONS:", session);
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/",
  },
};

