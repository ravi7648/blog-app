import Geo from "./geo";

export default class Address {
  street!: string;
  suite!: string;
  city!: string;
  zipcode!: string;
  geo!: Geo;
}
