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
    socket.on('new_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    });
});

server.listen(process.env.PORT, () =>
    console.log('Server are up and running on port: ' + process.env.PORT)
);
