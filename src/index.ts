import http, { IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import { serverAnswer } from './serverAnswer';
import { HttpMethod, IServerAnswer } from './types/types';

const PORT = Number(process.env.PORT);

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log('Server request');
  console.log(req.url, req.method);
  let dataFromUser = '';
  req.on('data', (chunk) => {
    dataFromUser += chunk;
  });
  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json');
    const method = req.method as HttpMethod;
    const answer: IServerAnswer = serverAnswer({
      url: req.url,
      method: method,
      data: dataFromUser,
    });
    const dataAnswer = JSON.stringify(answer.resolve) || '';
    res.statusCode = answer.status.statusCode || 200;
    res.statusMessage = answer.status?.message;

    res.end(dataAnswer);
  });
});

server.on('error', (err) => {
  console.log(err.message);
});

server.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
