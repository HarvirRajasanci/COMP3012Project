import * as db from "../fake-db";

export const getPostsBySubgroup = async (subgroup: string) => {
    let posts = db.getPosts(5, subgroup);
    if (posts) {
      return posts;
    }
    return null;
  };
  
