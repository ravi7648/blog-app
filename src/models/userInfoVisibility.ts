import User from "./user";

export default class UserInfoVisibility {
  constructor(user: User) {
    this.userId = user.id;
  }

  name = true;
  username = true;
  email = true;
  address = true;
  phone = true;
  website = true;
  company = true;
  userId!: number;
}
