export default interface IState<T> {
  data: T | null;
  loading: boolean;
  error: string | null | undefined;
}
