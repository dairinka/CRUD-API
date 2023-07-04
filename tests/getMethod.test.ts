import { serverAnswer } from '../src/serverAnswer';
import * as fakeData from './fakeData';
import * as fakeAnswer from './fakeAnswer';
import { IServerGet, IServerResolve } from '../src/types/types';

describe('check GET method, wrong variants', () => {
  test('handle url with user UUID without a slash', () => {
    const currentAnswer = serverAnswer(fakeData.SDgetWithUUIDwithoutSlash);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfPathNotCorrect);
  });
  test('handle url with wrong user UUID', () => {
    const currentAnswer = serverAnswer(fakeData.SDgetWithWrongUserId);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfNotCorrectUserId);
  });
  test('handle url with not exist user UUID', () => {
    const currentAnswer = serverAnswer(fakeData.SDgetWithUUID);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfUserIdNotExist);
  });
});

describe('check GET method, proper variants', () => {
  test('check get all users, if database is empty with api/users/', () => {
    const currentAnswer = serverAnswer(fakeData.GETproperDataToServerUrlWithEndSlash);
    expect(currentAnswer).toEqual({ resolve: [] });
  });
  test('check get all users, if database is empty with api/users', () => {
    const currentAnswer = serverAnswer(fakeData.GETproperDataToServerUrlWithoutEndSlash);
    expect(currentAnswer).toEqual({ resolve: [] });
  });
  test('check get user by id', () => {
    const addUser = serverAnswer(fakeData.POSTproperDataToServerUrlWithEndSlash);
    const resolveAnswer = addUser.resolve as IServerResolve;
    const userId = resolveAnswer.id;
    const dataToserver: IServerGet = {
      url: `/api/users/${userId}`,
      method: 'GET',
      data: '',
    };
    const currentAnswer = serverAnswer(dataToserver);
    const fakeAnswer: IServerResolve = {
      id: userId,
      username: 'Petro',
      age: 24,
      hobbies: ['skating'],
    };
    expect(currentAnswer).toEqual({ resolve: fakeAnswer });
  });
});
