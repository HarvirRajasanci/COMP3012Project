const { ensureAuthenticated } = require("../middleware/checkAuth");
import express, { Request, Response } from "express";
import * as database from "../controller/postController";
import { getSubs } from "../fake-db";
const router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  // ⭐ TODO
  const subgroups = await getSubs();
  res.render("subs", { subgroups });
});

router.get("/show/:subname", async (req: Request, res: Response) => {
  // ⭐ TODO
  const subName = await req.params.subname;
  const posts = await database.getPostsBySubgroup(subName);
  res.render("sub", { posts });
});

export default router;
