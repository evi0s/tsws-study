const IO = require('koa-socket-2');

const io = new IO();

io.on('connection', (socket: any) => {
    socket.socket.on('sendMsg', (msg: any) => {
        console.log('message: ' + msg);
        socket.socket.emit('getMsg', msg);
        io.broadcast('broadcast', msg);
    });
});

export { io }