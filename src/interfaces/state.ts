export default interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null | undefined;
}
