export type CustomColumnType<T> = {
  column: string;
  html: (id: string, name: string, props: T, args?: number) => JSX.Element;
  clickHandler?: (params: any) => void;
};
