import * as Router from 'koa-router';
import * as xss from 'xss';


const indexRouter = new Router();


indexRouter.post('/login', (ctx) => {
   let username = ctx.request.body.username;
   let password = ctx.request.body.password;

   if (username == 'admin' && password == 'admin') {
       ctx.session.name = username;
       ctx.session.signined = true;
       ctx.body = username;
       return;
   }
   ctx.body = 'failed';
});

indexRouter.post('/joinRoom', (ctx) => {
    let roomId = ctx.request.body.roomId;
    console.log(roomId);
    ctx.session.roomId = roomId;
    ctx.body = roomId;
});

indexRouter.delete('/exit', (ctx) => {
    ctx.session.roomId = null;
    ctx.body = 'OK';
});

indexRouter.get('/status', (ctx) => {
    if (! ctx.session || ctx.session == null || ! ctx.session.signined) {
        ctx.body = 'null';
        return;
    }
    ctx.body = ctx.session.name;
});

export { indexRouter }
