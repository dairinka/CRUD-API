export interface IServerAnswer {
  resolve?: IServerResolve;
  reject?: IServerReject;
}
export interface IServerResolve {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
  statusCode: number;
}
export interface IServerReject {
  statusCode: number;
  message: string;
}
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
