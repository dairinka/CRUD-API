import { randomUUID } from 'crypto';
import { IServerResolve, IServerAnswer } from '../types/types';

interface IUserData {
  username: string;
  age: number;
  hobbies: string[] | [];
}

class UsersDb {
  database: Map<string, IServerResolve>;

  constructor() {
    this.database = new Map();
  }

  addUser(data: IUserData): IServerAnswer {
    const uniqueId = randomUUID();
    if (!data.age || !data.hobbies || !data.username) {
      return {
        status: { statusCode: 400, message: 'request body does not contain required fields' },
      };
    }
    if (
      typeof data.age !== 'number' ||
      !Array.isArray(data.hobbies) ||
      typeof data.username !== 'string'
    ) {
      return {
        status: { statusCode: 400, message: 'field is invalid' },
      };
    }
    const userData: IServerResolve = {
      id: uniqueId,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };

    this.database.set(uniqueId, userData);
    return {
      resolve: userData,
      status: { statusCode: 201 },
    };
  }

  getUsers(): IServerAnswer {
    const userArr = Array.from(this.database.values());
    return { resolve: userArr };
  }

  getUsersById(id: string): IServerAnswer {
    return { resolve: this.database.get(id) };
  }

  isIdExist(id: string): boolean {
    return this.database.has(id);
  }

  updateUserById(id: string, data: IUserData): IServerAnswer {
    if (this.isIdExist(id)) {
      const oldData = this.database.get(id);
      if (oldData) {
        if (
          (data.age !== undefined && typeof data.age !== 'number') ||
          (data.hobbies !== undefined && !Array.isArray(data.hobbies)) ||
          (data.username !== undefined && typeof data.username !== 'string')
        ) {
          return {
            status: { statusCode: 400, message: 'field is invalid' },
          };
        }
        const userData: IServerResolve = {
          id: id,
          username: data.username || oldData.username,
          age: data.age || oldData.age,
          hobbies: data.hobbies || oldData.hobbies,
        };

        this.database.set(id, userData);
        return { resolve: this.database.get(id) };
      }
    }
    return { status: { statusCode: 404, message: 'id is not exist' } };
  }

  deleteUserById(id: string): IServerAnswer {
    this.database.delete(id);
    return { status: { statusCode: 204 } };
  }
}

export const currentUserDb = new UsersDb();
