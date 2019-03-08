import * as IO from 'socket.io';
import { HandleKoaSession } from 'koa-socketio-session';
import { app, server, sessionOpt } from "../app";


const io = IO(server, {
    cookie: true
});

io.use(HandleKoaSession(app, sessionOpt));


io.on('connection', (socket: any) => {

    if (! socket.hasOwnProperty("session") || ! socket.session) {
        socket.emit('sysError', 'No Login');
        socket.disconnect(true);
        console.log('No Session');
        return;
    }

    console.log('Has Session');

    if (! socket.session.hasOwnProperty('roomId') || ! socket.session.roomId) {
        socket.emit('sysError', 'No Room Joined');
        socket.disconnect(true);
        console.log('No Room');
        return;
    }
    let roomId = socket.session.roomId;

    console.log(socket.session);
    socket.join(roomId);

    socket.on('clientMsg', (msg: string) => {
        console.log('message: ' + msg);
        let roomMsg: object = {
            message: msg,
            code   : 200
        };

        io.to(roomId).emit('roomMsg', roomMsg);
        console.log(roomId + 'Sent');
        socket.emit('serverMsg', roomMsg);
        socket.broadcast.emit('broadcast', roomMsg);
    });

    socket.on('exit', (id: string) => {
        console.log('Exit: ' + id);
        socket.session.roomId = null;
        socket.leave(roomId);
        socket.disconnect(true);
    });
});

export { io }