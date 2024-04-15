import { AxiosResponse } from "axios";

export default interface JsonPlaceholder<T> {
  list(): Promise<AxiosResponse<T[], any>>;
  get(id: number): Promise<AxiosResponse<T, any>>;
  post(payload: T): Promise<AxiosResponse<T, any>>;
  put(payload: T): Promise<AxiosResponse<T, any>>;
  delete(id: number): Promise<AxiosResponse<T, any>>;
}
