import { ensureAuthenticated } from "../middleware/checkAuth";
import express, { Request, Response } from "express";
import * as database from "../controller/postController";
import { getSubs } from "../fake-db";
import { TUser } from "../types";
const router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  const subgroups = await getSubs();
  res.render("subs", { subgroups });
});

router.get("/show/:subname", ensureAuthenticated, async (req: Request, res: Response) => {
  const subName = await req.params.subname;
  const user = await req.user as TUser;
  const posts = await database.getPostsBySubgroup(subName);
  res.render("sub", { posts, user });
});

export default router;
