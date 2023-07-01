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
  console.log(dataToServer.url, dataToServer.method, dataToServer.data);
  const userId = dataToServer.url.slice(10);
  const regExp = /^\/api\/users/;
  console.log('userId', userId);
  console.log('dataToServer.url', dataToServer.url);
  console.log('regExp.test(dataToServer.url)', regExp.test(dataToServer.url));
  if (regExp.test(dataToServer.url)) {
    const db = currentUserDb;
    // if (!userId.match(/a/)) {
    //   return { status: { statusCode: 400, message: 'userId is invalid ' } };
    // }
    switch (dataToServer.method) {
      case 'PUT':
        if (userId) return db.updateUserById(userId, JSON.parse(dataToServer.data));
        break;
      case 'GET':
        return userId ? db.getUsersById(userId) : db.getUsers();
        break;
      case 'POST':
        return db.addUser(JSON.parse(dataToServer.data));
        break;
      case 'DELETE':
        if (userId) return db.deleteUserById(userId);
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
