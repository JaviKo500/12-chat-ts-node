import { Socket } from 'socket.io';
import { Users } from '../models/users';

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
        socket.broadcast.emit('create-message', { user: 'Admin', message: `${name} out chat` });
        socket.broadcast.emit( 'user-list',  users.getUsers()  );
    });
}