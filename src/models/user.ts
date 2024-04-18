import Address from "./address";
import Company from "./company";

export default class User {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;
  address: Address | null = null;
  phone: string | null = null;
  website: string | null = null;
  company: Company | null = null;
}
