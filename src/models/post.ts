import Reactions from "./reactions";

export default class Post {
  id!: number;
  userId!: number;
  title!: string;
  body!: string;
  createdAt!: string;
  isPublished!: boolean;
  reactions!: Reactions;

  static create(
    userId: number | undefined,
    title: string,
    body: string,
    isPublished: boolean = true
  ): Post {
    const post = new Post();
    post.id = 0;
    post.userId = userId || 0;
    post.title = title || "";
    post.body = body || "";
    post.createdAt = new Date().toISOString();
    post.isPublished = isPublished;
    post.reactions = new Reactions();

    return post;
  }

  static update(
    post: Post,
    title: string,
    body: string,
    isPublished: boolean = true
  ): Post {
    const updatedPost = { ...post}
    updatedPost.title = title || "";
    updatedPost.body = body || "";
    updatedPost.isPublished = isPublished;

    return updatedPost;
  }
}
