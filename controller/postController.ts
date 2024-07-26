import * as db from "../fake-db";
import { TVote } from "../types";

export const getPostsBySubgroup = async (subgroup: string) => {
    const ALL_POSTS = -1;
    let posts = db.getPosts(ALL_POSTS, subgroup);
    posts.sort((a, b) => b.timestamp - a.timestamp);
    if (posts) {
      return posts;
    }
    return null;
  };

  export const addVote = async(vote: TVote) => {
    const newVote = await db.addVoteToDb(vote.user_id, vote.post_id, vote.value);
    return newVote;
  }
