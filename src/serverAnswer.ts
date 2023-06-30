import { v4 as uuidv4 } from 'uuid';
import { IServerAnswer, HttpMethod, IServerReject, IServerResolve } from './types/types';

interface IServerGet {
  url: string;
  method: HttpMethod;
}
const fakeData: IServerResolve = {
  id: uuidv4(), //— unique identifier (string, uuid) generated on server side
  username: 'Petro', //— user's name (string, required)
  age: 24, //— user's age (number, required)
  hobbies: ['skating'], //— user's hobbies (array of strings or empty array, required)
  statusCode: 200,
};

const serverAnswer = ({ url, method }: IServerGet): IServerAnswer => {
  console.log(url, method);
  const endpoint = '/api/users';
  switch (url) {
    case '/api/users': {
      if (method === 'GET') {
        return { resolve: fakeData };
      }
      break;
    }
    default: {
      return { reject: { statusCode: 404, message: 'such url not found' } };
    }
  }
  return {};
};

export { serverAnswer };
