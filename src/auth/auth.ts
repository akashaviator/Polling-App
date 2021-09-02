import passport from "passport";
import localStrategy from "passport-local";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";

import UserController from "../controllers/user.controller";

passport.use(
  "register",
  new localStrategy.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        console.log("here");
        const controller = new UserController();

        let user = await controller.getUserByEmail(email);
        if (user)
          return done(null, false, { message: "Email registered already." });

        req.body.password = await bcrypt.hash(password, 10);
        user = await controller.createUser(req.body);

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const User = new UserController();
        const user = await User.getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new jwtStrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        token.user = await new UserController().getUserByEmail(
          token.user.email
        );
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
