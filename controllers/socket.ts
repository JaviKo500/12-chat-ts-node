import { Socket } from 'socket.io';
import { Users } from '../models/users';
import { createMessage } from '../utils/createMessage';

const users = new Users();

export const socketController = ( socket: Socket ) => {
    console.log( 'connect', socket.id);
    socket.on( 'enter-chat', ( user, callback ) => {
        console.log(user);
        if ( !user.name ) {
            return callback({
                error: true,
                message: 'Name is required'
            });
        }
        user.id = socket.id;
        const usersList = users.addUser( user );
        socket.broadcast.emit( 'user-list',  users.getUsers()  );
        callback(usersList); 
    });

    socket.on('disconnect', () => {
        const { name } = users.removeUser( socket.id ) ?? {};
        socket.broadcast.emit('create-message', createMessage( 'Admin', `${name} out chat`) );
        socket.broadcast.emit( 'user-list',  users.getUsers()  );
    });

    socket.on( 'create-message', ( data ) => {
        const  { message } = data;
        const { name }  = users.getUserById( socket.id ) ?? {};
        const customMessage = createMessage( name ?? '', message );
        socket.broadcast.emit('create-message', customMessage );
    } );

    // * private message
    socket.on( 'private-message', ( data ) => {
        const  { id, message } = data;
        const { name }  = users.getUserById( socket.id ) ?? {};
        const customMessage = createMessage( name ?? '', message );
        socket.broadcast.to(id).emit('create-message', customMessage );
    } );
}