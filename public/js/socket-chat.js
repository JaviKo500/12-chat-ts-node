
const params = new URLSearchParams( window.location.search );
if ( !params.has('name') ) {
    window.location = 'index.html';
    throw new Error('Name is required');
}

const user = {
    name : params.get('name')
}

const socket = io();
socket.on( 'connect', () => {
    socket.emit('enter-chat', user, ( resp ) => {
        console.log(resp);
    });
});
socket.on( 'disconnect', () => {
    console.log('disconnect');
});

socket.on( 'create-message', (message) => {
    console.log(message);
});

socket.on( 'user-list', (users) => {
    console.log(users);
});

// socket.emit('create-message', payload, ( id ) => {
//     console.log('server: ', id);
// });

// * private massage

socket.on( 'private-massage', ( message ) => {
    console.log('private message', message);
} );