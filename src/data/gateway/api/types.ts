export interface RequestResponse<T = any> {
  data: T;
  isError: false;
}

export interface RequestError<T = any> {
  data: T
  message: string;
  isError: true;
}
