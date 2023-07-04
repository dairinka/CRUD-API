import http, { IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import { serverAnswer } from './serverAnswer';
import { HttpMethod, IServerAnswer } from './types/types';

const PORT = Number(process.env.PORT);

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  let dataFromUser = '';
  req.on('data', (chunk) => {
    dataFromUser += chunk;
  });
  req.on('error', () => {
    console.log('Something went wrong');
  });
  req.on('end', () => {
    const contentType = req.headers['content-type'];
    res.setHeader('Content-Type', 'application/json');
    const method = req.method as HttpMethod;
    const answer: IServerAnswer = serverAnswer({
      url: req.url!,
      method: method,
      data: dataFromUser,
    });
    const messageObj = { message: answer?.status?.message };

    let dataAnswer = JSON.stringify(answer?.resolve) || JSON.stringify(messageObj) || '';
    res.statusCode = answer?.status?.statusCode || 200;
    if (
      req.method !== 'GET' &&
      dataFromUser !== '' &&
      contentType?.toLowerCase() !== 'application/json'
    ) {
      dataAnswer = JSON.stringify({ message: 'Content-Type should be JSON' });
      res.statusCode = 400;
    }

    res.end(dataAnswer);
  });
});

server.on('error', (err) => {
  console.log(err.message);
});

server.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});

process.on('SIGINT', () => {
  process.exit();
});
