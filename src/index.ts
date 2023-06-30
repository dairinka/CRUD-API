import http, { IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import { serverAnswer } from './serverAnswer';
import { HttpMethod } from './types/types';

const PORT = Number(process.env.PORT);

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log('Server request');
  console.log(req.url, req.method);

  res.setHeader('Content-Type', 'application/json');

  const method = req.method as HttpMethod;
  const data = JSON.stringify(serverAnswer({ url: req.url, method: method }));
  res.end(data);
});

server.on('error', (err) => {
  console.log(err.message);
});

server.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
