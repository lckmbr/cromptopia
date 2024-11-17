import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      //Store the user ID from MongoDB to the session
      const userSession = await User.findOne({ email: session.user.email });
      session.user.id = userSession._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        //Check if User exists
        const userExists = await User.findOne({ email: profile.email });

        //if not, create a new document and save in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(
          "An error occurred while checking or creating the user in the database:",
          error.message
        );
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
