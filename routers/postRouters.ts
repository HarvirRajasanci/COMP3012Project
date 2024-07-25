import express, { Request, Response } from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { getPost, getPosts } from "../fake-db";

router.get("/", async (req: Request, res: Response) => {
  const posts = await getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("createPosts");
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const content = req.body;
  console.log(content);
});

router.get("/show/:postid", async (req: Request, res: Response) => {
  // ⭐ TODO
  const postId = req.params.postid;
  const post = await getPost(Number(postId));
  res.render("individualPost", { post });
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
});

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    // ⭐ TODO
  }
);

export default router;
