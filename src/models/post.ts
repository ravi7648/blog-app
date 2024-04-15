import Reactions from "./reactions";

export default class Post {
  id!: number;
  userId!: number;
  title!: string;
  body!: string;
  createdAt!: string;
  reactions!: Reactions;

  static create(userId: number | undefined, title: string, body: string): Post {
    const post = new Post();
    post.id = 0;
    post.userId = userId || 0;
    post.title = title || "";
    post.body = body || "";
    post.createdAt = new Date().toISOString();
    post.reactions = new Reactions();

    return post;
  }
}
