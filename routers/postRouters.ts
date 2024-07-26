import express, { Request, Response } from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { getPost, getPosts, addPost, editPost, deletePost, addComment } from "../fake-db";
import { TUser, TVote } from "../types";
import { addVote } from "../controller/postController";

router.get("/", async (req: Request, res: Response) => {
  const posts = await getPosts(20);
  const user = await req.user;
  res.render("posts", { posts, user });
});

router.get("/create", ensureAuthenticated, (req: Request, res: Response) => {
  res.render("createPosts");
});

router.post("/create", ensureAuthenticated, async (req: Request, res: Response) => {
  // ⭐ TODO
  const content = await req.body;

  if(content.title === "" || content.description === "" || content.subgroup === ""){
    return res.status(400).send("<h1>All fields (except link) are required.<h1>");
  }
  
  const user = await req.user as TUser;
  const post = addPost(content.title, content.link, user.id, content.description, content.subgroup);
  res.redirect("/posts/show/" + post.id);
});

router.get("/show/:postid", async (req: Request, res: Response) => {
  // ⭐ TODO
  const postId = await req.params.postid;
  const post = await getPost(Number(postId));
  const comments = await post.comments;
  const user = await req.user as TUser;
  res.render("individualPost", { post, comments, user });
});

router.get("/edit/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  const postId = await req.params.postid;
  res.render("editPost", { postId });
});

router.post("/edit/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  const postId = await req.params.postid;
  const content = await req.body;
  const post = getPost(Number(postId));

  await editPost(Number(postId), {title: content.title, link: content.link, description: content.description, subgroup: content.subgroup});

  res.redirect("/posts/show/" + postId);
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  // ⭐ TODO
  const postId = await req.params.postid;
  res.render("deletePost", { postId });
});

router.post("/delete/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  // ⭐ TODO
  const postId = await req.params.postid;
  const post = await getPost(Number(postId));
  
  await deletePost(Number(postId));

  res.redirect("/subs/show/" + post.subgroup);
});

router.post("/comment-create/:postid",ensureAuthenticated, async (req: Request, res: Response) => {
    // ⭐ TODO
    const postId = await req.params.postid;
    const content = await req.body;
    const user = await req.user as TUser;

    if(content.description === ""){
      return res.status(400).send("<h1>Description is required to post a comment.</h1>");
    }

    addComment(Number(postId), user.id, content.description);

    res.redirect("/posts/show/" + postId)
  }
);

router.post("/vote/:postid", ensureAuthenticated, async (req: Request, res: Response) => {
  // ⭐ TODO
  const postId = await req.params.postid;
  const voteValue = await req.body.setvoteto;
  const user = await req.user as TUser;
  
  const vote:TVote = { user_id: user.id, post_id: Number(postId), value: voteValue };

  await addVote(vote);

  res.redirect("/posts/show/" + postId);
});

export default router;
