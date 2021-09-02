import express from "express";
import UserRouter from "./user.router";
import PollRouter from "./poll.router";
import AuthRouter from "./auth.router";
import OptionRouter from "./option.router";

import passport from "passport";

const router = express.Router();

router.use("/users", UserRouter);
router.use("/auth", AuthRouter);
router.use("/option", OptionRouter);

router.use(
  "/polls",
  passport.authenticate("jwt", { session: false }),
  PollRouter
);

export default router;
