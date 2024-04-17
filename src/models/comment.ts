import { Session } from "../types/session";

export default class Comment {
  id!: number;
  postId!: number;
  name!: string;
  email!: string;
  body!: string;

  static create(body: string, postId: number, session: Session) {
    const comment = new Comment();
    comment.body = body;
    comment.postId = postId;
    comment.email = session.user?.email || "";
    comment.name = session.user?.name || "";

    return comment;
  }
}
