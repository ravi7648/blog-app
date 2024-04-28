export type CustomColumnType<T> = {
  column: string;
  html: (props: T) => JSX.Element;
  clickHandler?: (params: any) => void;
};
