export interface ServerResponse<T> {
  message: string;
  result: T | null;
  statusCode: number;
}
