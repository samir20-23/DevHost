const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

let players = [];
let currentTurn = 'white';

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // If there are less than 2 players, assign them to the game
    if (players.length < 2) {
        players.push(socket);
        socket.emit('your-turn', { player: currentTurn });
    }

    // Listen for move events from clients
    socket.on('move', (moveData) => {
        // Ensure correct turn order
        if (moveData.player !== currentTurn) {
            return; // Ignore if it's not the player's turn
        }

        // Change turn after a move
        currentTurn = currentTurn === 'white' ? 'black' : 'white';

        // Broadcast the move to the other player
        socket.broadcast.emit('move', moveData);
        io.emit('turn-changed', { currentTurn });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        players = players.filter(player => player !== socket);
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
