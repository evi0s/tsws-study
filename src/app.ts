import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as bodyparser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as koastatic from 'koa-static';
import { indexRouter } from './routes/index';

const onerror = require('koa-onerror');
const Koa = require('koa');
const app = new Koa();
import { io } from './websocket/websocket';
onerror(app);

io.attach(app);
app.use(bodyparser());
app.use(json());
app.use(helmet());
app.use(logger());

app.use(koastatic(__dirname+'/../static'));

app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());
//
// app._io.on('connection', (socket: any) => {
//     socket.on('sendMsg', (msg: any) => {
//         console.log('message: ' + msg);
//         socket.emit('getMsg', msg);
//         app.io.broadcast('broadcast', msg);
//     });
// });

export { app }