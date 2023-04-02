
const params = new URLSearchParams( window.location.search );
if ( !paramsChat.has('name') || !paramsChat.has('sale') ) {
    window.location = 'index.html';
    throw new Error('Name and sale are required');
}

const user = {
    name : paramsChat.get('name'),
    sale : paramsChat.get('sale')
}

const socket = io();
socket.on( 'connect', () => {
    socket.emit('enter-chat', user, ( resp ) => {
        renderUsers( resp );
    });
});
socket.on( 'disconnect', () => {
    console.log('disconnect');
});

socket.on( 'create-message', (message) => {
    // console.log(message);
    renderMessages(message);
});

socket.on( 'user-list', (users) => {
    renderUsers(users);
});

// socket.emit('create-message', payload, ( id ) => {
//     console.log('server: ', id);
// });

// * private massage

socket.on( 'private-massage', ( message ) => {
    console.log('private message', message);
} );