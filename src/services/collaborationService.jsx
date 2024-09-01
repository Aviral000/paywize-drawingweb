import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

export const updateCollaborators = (action, data) => {
    socket.emit('draw-action', { action, data });
};

export const listenForUpdates = (callback) => {
    socket.on('draw-action', (message) => {
        callback(message.action, message.data);
    });
};

socket.on('connect', () => {
    console.log('Connected to the collaboration server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the collaboration server');
});
