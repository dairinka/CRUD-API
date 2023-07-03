import { IServerAnswer } from '../src/types/types';
import { properUserData } from './fakeData';

//Add user PUT api/users
export const answerIfUserAdd: IServerAnswer = {
  resolve: properUserData,
  status: { statusCode: 201 },
};

export const answerIfWrongFieldType: IServerAnswer = {
  status: { statusCode: 400, message: 'field is invalid' },
};

export const answerIfFieldNotExist: IServerAnswer = {
  status: { statusCode: 400, message: 'request body does not contain required fields' },
};

export const answerIfPathNotCorrect: IServerAnswer = {
  status: { statusCode: 404, message: 'url is not exist' },
};

export const answerIfServerProblem: IServerAnswer = {
  status: { statusCode: 500, message: 'internal server error' },
};

export const answerIfNotCorrectUserId: IServerAnswer = {
  status: { statusCode: 400, message: 'userId is invalid ' },
};

export const answerIfUserIdNotExist: IServerAnswer = {
  status: { statusCode: 404, message: 'id is not exist' },
};
