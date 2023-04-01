const socket = io();
socket.on( 'connect', () => {
    console.log('connect');
});
socket.on( 'disconnect', () => {
    console.log('disconnect');
});

socket.on( 'send-message-client', (payload) => {
    console.log(payload);
});
