import * as Koa from 'koa';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as bodyparser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as koastatic from 'koa-static';

import { indexRouter } from './routes/index';

const onerror = require('koa-onerror');
const websockify = require('koa-websocket');

const app = websockify(new Koa());

onerror(app);

app.use(bodyparser());
app.use(json());
app.use(helmet());
app.use(logger());

app.use(koastatic(__dirname+'/../static'));


app.ws.use(indexRouter.routes());
app.ws.use(indexRouter.allowedMethods());

// app.ws.use(function (ctx, next) {
//     return next();
// });

// app.ws.use(route.all('/', function (ctx) {
//     ctx.websocket.on('message', function (message) {
//         // 返回给前端的数据
//         ctx.websocket.send(message)
//     })
// }));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});