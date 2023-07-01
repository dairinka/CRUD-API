import { v4 as uuidv4 } from 'uuid';
import { IServerAnswer, HttpMethod, IServerResolve } from './types/types';
import { currentUserDb } from './database/UsersDb';

interface IServerGet {
  url: string;
  method: HttpMethod;
  data?: string;
}

const fakeData: IServerResolve = {
  id: uuidv4(), //— unique identifier (string, uuid) generated on server side
  username: 'Petro', //— user's name (string, required)
  age: 24, //— user's age (number, required)
  hobbies: ['skating'], //— user's hobbies (array of strings or empty array, required)
};

const serverAnswer = (dataToServer: IServerGet): IServerAnswer => {
  console.log(dataToServer.url, dataToServer.method);
  const endpoint = '/api/users';
  if (dataToServer.url.match(/^\/api\/users./)) {
    const db = currentUserDb;
    switch (dataToServer.method) {
      case 'PUT':
        db.addUser();
        break;
      case 'GET':
        db.getUsers();
        break;
      case 'POST':
        break;
      case 'DELETE':
        db.deleteUserById();
        break;
      default:
        return;
    }
    // case '/api/users': {
    //   if (method === 'GET') {
    //     return { resolve: fakeData };
    //   }
    //   break;
  } else {
    return { status: { statusCode: 404, message: 'such url not found' } };
  }

  return {};
};

export { serverAnswer };
