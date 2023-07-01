import { v4 as uuidv4 } from 'uuid';
import { IServerResolve } from '../types/types';

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

  addUser(data: IUserData) {
    const uniqueId = uuidv4();
    const userData: IServerResolve = {
      id: uniqueId,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };

    this.database.set(uniqueId, userData);
  }

  getUsers() {
    console.log('map.values');
    console.log(this.database.values());
    console.log('map.entries');
    console.log(this.database.entries());
  }

  getUsersById(id: string): IServerResolve {
    return this.database.get(id);
  }
  //ToDo check is id UUIDV4
  isIdExist(id: string): boolean {
    return this.database.has(id);
  }

  updateUserById(id: string, data: IUserData): void {
    if (this.isIdExist(id)) {
      const userData: IServerResolve = {
        id: id,
        username: data.username,
        age: data.age,
        hobbies: data.hobbies,
      };

      this.database.set(id, userData);
    }
  }

  deleteUserById(id: string): void {
    this.database.delete(id);
  }
}

export const currentUserDb = new UsersDb();
