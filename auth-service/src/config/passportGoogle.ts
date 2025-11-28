import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import User from "../models/User";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google OAuth credentials are not properly configured");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("Email not provided by Google"));
        }
        let user = await User.findOne({
          $or: [{ email }, { googleId: profile.id }],
        });
        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            user.picture = profile.photos?.[0]?.value ?? profile._json?.picture;
            await user.save();
          }
          return done(null, user);
        }
        const [firstName = "", lastName = ""] =
          profile.displayName?.split(" ") ?? [];
        const username = `${profile.displayName
          ?.toLowerCase()
          .replace(/\s+/g, "_")}_${Math.floor(Math.random() * 10000)}`;

        const newUser = await User.create({
          googleId: profile.id,
          email,
          username,
          firstName,
          lastName,
          displayName: profile.displayName,
          picture: profile.photos?.[0]?.value ?? profile._json?.picture,
          email_verified: true, // L'email est déjà vérifié par Google
          isActive: true,
        });

        return done(null, newUser);
      } catch (error) {
        console.error("Google OAuth Error:", error);
        return done(error);
      }
    }
  )
);
