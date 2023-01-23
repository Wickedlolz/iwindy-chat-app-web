const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data);
    });

    socket.on('new_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.', socket.id);
    });
});

server.listen(process.env.PORT, () =>
    console.log('Server are up and running on port: ' + process.env.PORT)
);
