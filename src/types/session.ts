import User from "../models/user";

export type Session = {
  id: number | null;
  email: string | null | undefined;
  user: User | null;
  loggedIn: boolean;
};
