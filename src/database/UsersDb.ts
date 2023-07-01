import { v4 as uuidv4 } from 'uuid';
import { IServerResolve, IServerAnswer } from '../types/types';

interface IUserData {
  username: string;
  age: number;
  hobbies: string[] | [];
}

class UsersDb {
  database: Map<string, IServerResolve> | null;

  constructor() {
    this.database = new Map();
  }

  addUser(data: IUserData): IServerAnswer {
    const uniqueId = uuidv4();
    //ToDo check data.hobbies on empty array
    // if (!data.age || !data.hobbies || !data.username) {
    //   return {
    //     status: { statusCode: 404, message: 'request body does not contain required fields' },
    //   };
    // }
    const userData: IServerResolve = {
      id: uniqueId,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };

    this.database.set(uniqueId, userData);
    return { status: { statusCode: 201, message: 'create new user' } };
  }
  //ToDo return all users
  getUsers(): IServerAnswer {
    // console.log('map.values');
    // console.log(this.database.values());
    // console.log('map.entries');
    // console.log(this.database.entries());
    const userArr = Array.from(this.database.values());
    return { resolve: userArr };
  }

  getUsersById(id: string): IServerAnswer {
    return this.isIdExist(id)
      ? { status: { statusCode: 200, message: `id === ${id}` } }
      : { status: { statusCode: 404, message: 'id is not exist' } };
  }
  //ToDo check is id UUIDV4
  isIdExist(id: string): boolean {
    return this.database.has(id);
  }

  updateUserById(id: string, data: IUserData): IServerAnswer {
    if (this.isIdExist(id)) {
      const userData: IServerResolve = {
        id: id,
        username: data.username,
        age: data.age,
        hobbies: data.hobbies,
      };

      this.database.set(id, userData);
      return { status: { statusCode: 200, message: 'user info was update' } };
    }
    return { status: { statusCode: 404, message: 'id is not exist' } };
  }

  deleteUserById(id: string): IServerAnswer {
    if (this.isIdExist(id)) {
      this.database.delete(id);
      return { status: { statusCode: 204, message: 'user info was deleted' } };
    }
    return { status: { statusCode: 404, message: 'id is not exist' } };
  }
}

export const currentUserDb = new UsersDb();
