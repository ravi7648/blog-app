import Address from "./address";
import Company from "./company";
import Follow from "./follow";

export default class User {
  constructor() {
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  id: number = 0;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;
  address: Address | null = null;
  phone: string | null = null;
  website: string | null = null;
  company: Company | null = null;
  blocked?: boolean = false;

  follow(followingUserId: number) {
    const followRecord = new Follow();
    followRecord.followerId = this.id;
    followRecord.followingId = followingUserId;
    return { ...followRecord };
  }

  unfollow(followingUserId: number) {
    return this.follow(followingUserId);
  }

  static bindMethods(user: User) {
    let bindedUser = new User();
    bindedUser.id = user.id;
    bindedUser.name = user.name;
    bindedUser.username = user.username;
    bindedUser.email = user.email;
    bindedUser.password = user.password;
    bindedUser.isAdmin = user.isAdmin;
    bindedUser.address = user.address;
    bindedUser.phone = user.phone;
    bindedUser.website = user.website;
    bindedUser.company = user.company;
    bindedUser.blocked = user.blocked;

    return bindedUser;
  }
}
