import express, { NextFunction, Request, Response } from "express";
import passport from "../middleware/passport";
const router = express.Router();

router.get("/login", async (req: Request, res: Response) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
});

export default router;
