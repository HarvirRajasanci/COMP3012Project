const { ensureAuthenticated } = require("../middleware/checkAuth");
import express, { Request, Response } from "express";
import * as database from "../controller/postController";
const router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  // ⭐ TODO
  res.render("subs");
});

router.get("/show/:subname", async (req: Request, res: Response) => {
  // ⭐ TODO
  res.render("sub");
});

export default router;
