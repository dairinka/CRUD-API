import { randomUUID } from 'crypto';
import { IServerGet, IServerResolve } from '../src/types/types';
export const userId = randomUUID();

interface IServerUserData {
  username: string;
  age: number;
  hobbies: string[];
}

export const properUserData: IServerResolve = {
  id: userId,
  username: 'Petro', //— user's name (string, required)
  age: 24, //— user's age (number, required)
  hobbies: ['skating'], //— user's hobbies (array of strings or empty array, required)
};

export const properEnterUserData: IServerUserData = {
  username: 'Petro',
  age: 24,
  hobbies: ['skating'],
};

export const properUpdateUserData = {
  hobbies: ['skating', 'dancing'],
};

export const enterUserDataWithoutField = {
  username: 'Petro',
  hobbies: ['skating'],
};
export const enterUserDataWithWrongFieldType = {
  username: 'Petro',
  age: '24',
  hobbies: ['skating'],
};

export const POSTproperDataToServerUrlWithoutEndSlash: IServerGet = {
  url: '/api/users',
  method: 'POST',
  data: JSON.stringify(properEnterUserData),
};
export const GETproperDataToServerUrlWithoutEndSlash: IServerGet = {
  url: '/api/users',
  method: 'GET',
  data: '',
};

export const PUTproperUpdateData: IServerGet = {
  url: '/api/users/',
  method: 'PUT',
  data: JSON.stringify(properUpdateUserData),
};

export const DELETEproperUpdateData: IServerGet = {
  url: '/api/users/',
  method: 'DELETE',
  data: JSON.stringify(properUpdateUserData),
};

export const POSTproperDataToServerUrlWithEndSlash: IServerGet = {
  url: '/api/users/',
  method: 'POST',
  data: JSON.stringify(properEnterUserData),
};

export const GETproperDataToServerUrlWithEndSlash: IServerGet = {
  url: '/api/users/',
  method: 'GET',
  data: '',
};

export const PUTproperDataToServerUrlWithEndSlash: IServerGet = {
  url: '/api/users/',
  method: 'PUT',
  data: JSON.stringify(properEnterUserData),
};

export const SDpostWithUUIDwithoutSlash: IServerGet = {
  url: '/api/users6f844343-ae47-4f79-b050-d64f8980a183',
  method: 'POST',
  data: JSON.stringify(properEnterUserData),
};

export const SDgetWithUUIDwithoutSlash: IServerGet = {
  url: '/api/users6f844343-ae47-4f79-b050-d64f8980a183',
  method: 'GET',
  data: JSON.stringify(properEnterUserData),
};

export const SDputWithUUIDwithoutSlash: IServerGet = {
  url: '/api/users6f844343-ae47-4f79-b050-d64f8980a183',
  method: 'GET',
  data: JSON.stringify(properEnterUserData),
};

export const SDdeleteWithUUIDwithoutSlash: IServerGet = {
  url: '/api/users6f844343-ae47-4f79-b050-d64f8980a183',
  method: 'DELETE',
  data: JSON.stringify(properEnterUserData),
};

export const SDpostWithUUID: IServerGet = {
  url: '/api/users/6f844343-ae47-4f79-b050-d64f8980a183',
  method: 'POST',
  data: JSON.stringify(properEnterUserData),
};
export const SDgetWithUUID: IServerGet = {
  url: '/api/users/6f844343-ae47-4f79-b050-d64f8980a183',
  method: 'GET',
  data: JSON.stringify(properEnterUserData),
};
export const SDputWithUUID: IServerGet = {
  url: '/api/users/6f844343-ae47-4f79-b050-d64f8980a183',
  method: 'PUT',
  data: JSON.stringify(properEnterUserData),
};
export const SDdeleteWithUUID: IServerGet = {
  url: '/api/users/6f844343-ae47-4f79-b050-d64f8980a183',
  method: 'DELETE',
  data: JSON.stringify(properEnterUserData),
};

export const SDpostWithWrongUserId: IServerGet = {
  url: '/api/users/145df-hqwfhg',
  method: 'POST',
  data: JSON.stringify(properEnterUserData),
};
export const SDgetWithWrongUserId: IServerGet = {
  url: '/api/users/145df-hqwfhg',
  method: 'GET',
  data: JSON.stringify(properEnterUserData),
};
export const SDwithoutRequireField: IServerGet = {
  url: '/api/users/',
  method: 'POST',
  data: JSON.stringify(enterUserDataWithoutField),
};

export const SDpostWithWrongFieldType: IServerGet = {
  url: '/api/users/',
  method: 'POST',
  data: JSON.stringify(enterUserDataWithWrongFieldType),
};

export const SDputWithWrongFieldType: IServerGet = {
  url: '/api/users/',
  method: 'PUT',
  data: JSON.stringify(enterUserDataWithWrongFieldType),
};
