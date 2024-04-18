import User from "./user";

export default class Comment {
  id!: number;
  postId!: number;
  name!: string;
  email!: string;
  body!: string;

  static create(body: string, postId: number, user: User) {
    const comment = new Comment();
    comment.body = body;
    comment.postId = postId;
    comment.email = user?.email || "";
    comment.name = user?.name || "";

    return comment;
  }
}
