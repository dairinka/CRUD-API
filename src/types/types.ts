export interface IServerAnswer {
  resolve?: IServerResolve[] | IServerResolve;
  status?: IStatusCode;
}
export interface IServerResolve {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export interface IStatusCode {
  statusCode: number;
  message?: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IServerGet {
  url: string;
  method: HttpMethod;
  data?: string;
}
