export type CustomColumnType<T> = {
  column: string;
  html: (id:string, name: string, props: T) => JSX.Element;
  clickHandler?: (params: any) => void;
};
