const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // Join room
    socket.on('join-room', (data) => {
        const { roomId, userName } = data;
        socket.join(roomId);
        socket.roomId = roomId;
        socket.userName = userName || `User-${socket.id.slice(0, 5)}`;

        console.log(`${socket.userName} (${socket.id}) joined room: ${roomId}`);

        // Notify others in the room
        socket.to(roomId).emit('user-joined', {
            id: socket.id,
            userName: socket.userName
        });

        // Send existing users in room to new user
        const socketsInRoom = io.sockets.adapter.rooms.get(roomId);
        if (socketsInRoom) {
            console.log(`Room ${roomId} has ${socketsInRoom.size} users`);
        }
    });

    // Receive location and broadcast to room
    socket.on('send-location', (data) => {
        const { latitude, longitude } = data;
        
        if (socket.roomId) {
            io.to(socket.roomId).emit('receive-location', {
                id: socket.id,
                userName: socket.userName,
                latitude,
                longitude
            });
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        if (socket.roomId) {
            io.to(socket.roomId).emit('user-disconnected', {
                id: socket.id,
                userName: socket.userName
            });
            console.log(`${socket.userName} (${socket.id}) disconnected from room: ${socket.roomId}`);
        }
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});