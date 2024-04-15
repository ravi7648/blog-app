export default class Reactions {
  like: number = 0;
  love: number = 0;
  celebrate: number = 0;
  insightful: number = 0;
  funny: number = 0;

  get total() {
    return this.like + this.love + this.celebrate + this.insightful + this.funny;
  }
}