import * as Router from 'koa-router';
import * as xss from 'xss';

const indexRouter = new Router();

let conversationList: any[] = [];

class Conversation {
    public ctx: any;
    constructor (ctx: any) {
        this.ctx = ctx;
    }
}

function send(msg: any) {
    conversationList.forEach((conversation, index, conversationList) => {
        conversation.ctx.websocket.send(msg);
    });
}

// indexRouter.all('/websocket', (ctx) => {
//     conversationList.push(new Conversation(ctx));
//     console.log(ctx.websocket.readyState);
//     if (ctx.websocket.readyState != 1) {
//         ctx.websocket.close();
//         ctx.websocket.terminate();
//         return;
//     }
//     ctx.websocket.on('message', (message: any) => {
//         console.log(message);
//         for(let i = 0; i < conversationList.length; i++) {
//             if (ctx == conversationList[i])
//                 continue;
//             if (conversationList[i].ctx.websocket.readyState != 1) {
//                 console.log(conversationList[i].ctx.websocket.readyState);
//                 continue;
//             }
//
//             conversationList[i].ctx.websocket.send(xss(message));
//         }
//     });
//     ctx.websocket.on("close", (message: any) => {
//         let index = conversationList.indexOf(ctx);
//         conversationList.splice(index, 1);
//     });
// });

export { indexRouter }
