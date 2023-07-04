import { IServerAnswer, IServerGet } from './types/types';
import { currentUserDb } from './database/UsersDb';

const serverAnswer = (dataToServer: IServerGet): IServerAnswer => {
  try {
    const parseId = dataToServer.url.slice(10);
    let userId = '';
    if (parseId.match(/^\//)) {
      userId = parseId.slice(1);
    } else if (userId.length > 1) {
      return { status: { statusCode: 404, message: 'url is not exist' } };
    }
    const regExp = /^\/api\/users\/?/;

    if (regExp.test(dataToServer.url)) {
      const db = currentUserDb;
      const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (userId !== '' && !uuidRegExp.test(userId)) {
        return { status: { statusCode: 400, message: 'userId is invalid ' } };
      }

      switch (dataToServer.method) {
        case 'GET':
          if (!userId) {
            if (parseId.length < 2 && !dataToServer.data) return db.getUsers();
            if (parseId.length > 1) {
              return { status: { statusCode: 404, message: 'url is not exist' } };
            }
            if (dataToServer.data) {
              return {
                status: {
                  statusCode: 400,
                  message: 'should clear the body',
                },
              };
            }
          }

          if (userId) {
            const isIdExist = db.isIdExist(userId);
            if (isIdExist && !dataToServer.data) return db.getUsersById(userId);
            if (!isIdExist) {
              return { status: { statusCode: 404, message: 'id is not exist' } };
            }
            if (dataToServer.data) {
              return {
                status: {
                  statusCode: 400,
                  message: 'should clear the body',
                },
              };
            }
          }
          break;
        case 'POST':
          if (parseId.length < 2 && dataToServer.data) {
            return db.addUser(JSON.parse(dataToServer.data));
          }
          if (userId) {
            return { status: { statusCode: 404, message: 'for add user use api/users' } };
          }
          if (!dataToServer.data) {
            return {
              status: { statusCode: 400, message: 'request body does not contain required fields' },
            };
          }
          break;
        case 'PUT':
          if (userId && dataToServer.data) {
            return db.updateUserById(userId, JSON.parse(dataToServer.data));
          }
          if (parseId.length < 2) {
            return { status: { statusCode: 404, message: 'need add userId to url' } };
          }
          if (!dataToServer.data) {
            return {
              status: { statusCode: 400, message: 'request body does not contain required fields' },
            };
          }
          break;
        case 'DELETE':
          if (parseId.length < 2) {
            return { status: { statusCode: 404, message: 'need add userId to url' } };
          }
          if (!userId && parseId.length > 1) {
            return { status: { statusCode: 404, message: 'url is not exist' } };
          }
          if (userId) {
            const isIdExist = db.isIdExist(userId);
            if (isIdExist && !dataToServer.data) {
              return db.deleteUserById(userId);
            }
            if (!isIdExist) {
              return { status: { statusCode: 404, message: 'id is not exist' } };
            }
            if (dataToServer.data) {
              return {
                status: {
                  statusCode: 400,
                  message: 'should clear the body',
                },
              };
            }
          }
          break;
      }
      return { status: { statusCode: 404, message: 'url is not exist' } };
    } else {
      return { status: { statusCode: 404, message: 'url is not exist' } };
    }
  } catch {
    return { status: { statusCode: 500, message: 'internal server error' } };
  }
};

export { serverAnswer };
