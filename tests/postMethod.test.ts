import { serverAnswer } from '../src/serverAnswer';
import * as fakeData from './fakeData';
import * as fakeAnswer from './fakeAnswer';

describe('check POST method(add user), wrong variants', () => {
  test('handle url with user UUID api/users/6f844343-ae47-4f79-b050-d64f8980a183', () => {
    const currentAnswer = serverAnswer(fakeData.SDpostWithUUID);
    expect(currentAnswer).toEqual({
      status: { statusCode: 404, message: 'for add user use api/users' },
    });
  });
  test('handle url with user UUID without a slash api/users6f844343-ae47-4f79-b050-d64f8980a183', () => {
    const currentAnswer = serverAnswer(fakeData.SDpostWithUUIDwithoutSlash);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfPathNotCorrect);
  });
  test('handle data without requery fields', () => {
    const currentAnswer = serverAnswer(fakeData.SDwithoutRequireField);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfFieldNotExist);
  });
  test('handle data with wrong field type', () => {
    const currentAnswer = serverAnswer(fakeData.SDpostWithWrongFieldType);
    expect(currentAnswer).toEqual(fakeAnswer.answerIfWrongFieldType);
  });
});

describe('check POST method(add user), proper variants', () => {
  test('handle url with a slash at the end of the line', () => {
    const currentAnswer = serverAnswer(fakeData.POSTproperDataToServerUrlWithEndSlash);
    expect(currentAnswer.status).toEqual(fakeAnswer.answerIfUserAdd.status);
  });
  test('handle url without a slash at the end of the line', () => {
    const currentAnswer = serverAnswer(fakeData.POSTproperDataToServerUrlWithoutEndSlash);
    expect(currentAnswer.status).toEqual(fakeAnswer.answerIfUserAdd.status);
  });
});
