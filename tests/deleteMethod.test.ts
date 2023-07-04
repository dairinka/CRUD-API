import { serverAnswer } from '../src/serverAnswer';
import * as fakeData from './fakeData';
import * as fakeAnswer from './fakeAnswer';
import { IServerGet, IServerResolve } from '../src/types/types';

describe('check DELETE method without add user', () => {
  test('handle url without user UUID', () => {
    const currentAnswer = serverAnswer(fakeData.DELETEproperUpdateData);
    expect(currentAnswer).toEqual({
      status: { statusCode: 404, message: 'need add userId to url' },
    });
  });
  test('handle url with user UUID without a slash api/users6f844343-ae47-4f79-b050-d64f8980a183', () => {
    const currentAnswer = serverAnswer(fakeData.SDdeleteWithUUIDwithoutSlash);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfPathNotCorrect);
  });
  test('handle url with user UUID  api/users/6f844343-ae47-4f79-b050-d64f8980a183', () => {
    const currentAnswer = serverAnswer(fakeData.SDdeleteWithUUID);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfUserIdNotExist);
  });
});

describe('first addUser and test delete method', () => {
  const addUser = serverAnswer(fakeData.POSTproperDataToServerUrlWithEndSlash);
  const resolveAnswer = addUser.resolve as IServerResolve;
  const userId = resolveAnswer.id;

  const withBodyToserver: IServerGet = {
    url: `/api/users/${userId}`,
    method: 'DELETE',
    data: JSON.stringify({ age: ['soccer', 'dancing'] }),
  };
  test('handle url with user UUID api/users/6f844343-ae47-4f79-b050-d64f8980a183', () => {
    const currentAnswer = serverAnswer(fakeData.SDdeleteWithUUID);
    expect(currentAnswer).toEqual({ status: { statusCode: 404, message: 'id is not exist' } });
  });
  test('handle url with user UUID without a slash api/users6f844343-ae47-4f79-b050-d64f8980a183', () => {
    const currentAnswer = serverAnswer(fakeData.SDdeleteWithUUIDwithoutSlash);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfPathNotCorrect);
  });
  test('handle data with wrong field type', () => {
    const currentAnswer = serverAnswer(withBodyToserver);
    expect(currentAnswer).toEqual({
      status: { statusCode: 400, message: 'should clear the body' },
    });
  });
  test('with property data', () => {
    const addUser = serverAnswer(fakeData.POSTproperDataToServerUrlWithEndSlash);
    const resolveAnswer = addUser.resolve as IServerResolve;
    const userId = resolveAnswer.id;
    const dataToserver: IServerGet = {
      url: `/api/users/${userId}`,
      method: 'DELETE',
      data: '',
    };
    const currentAnswer = serverAnswer(dataToserver);
    expect(currentAnswer.status?.statusCode).toEqual(204);
  });
});
