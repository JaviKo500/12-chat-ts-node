import { Socket } from 'socket.io';
import { Users } from '../models/users';
import { createMessage } from '../utils/createMessage';

const users = new Users();

export const socketController = ( socket: Socket ) => {
    console.log( 'connect', socket.id);
    socket.on( 'enter-chat', ( user, callback ) => {
        console.log(user);
        const { name, sale } = user;
        if ( !name || !sale ) {
            return callback({
                error: true,
                message: 'Name is required'
            });
        }
        
        socket.join( sale );

        user.id = socket.id;
        users.addUser( user );
        socket.broadcast.to(sale).emit( 'user-list',  users.getUsersBySale( sale )  );
        callback(users.getUsersBySale( sale )); 
    });

    socket.on('disconnect', () => {
        const { name, sale } = users.removeUser( socket.id ) ?? {};
        socket.broadcast.to(sale ?? []).emit('create-message', createMessage( 'Admin', `${name} out chat`) );
        socket.broadcast.to(sale ?? []).emit( 'user-list',  users.getUsersBySale(sale ?? '')  );
    });

    socket.on( 'create-message', ( data ) => {
        const  { message } = data;
        const { name, sale }  = users.getUserById( socket.id ) ?? {};
        const customMessage = createMessage( name ?? '', message );
        socket.broadcast.to(sale ?? []).emit('create-message', customMessage );
    } );

    // * private message
    socket.on( 'private-message', ( data ) => {
        const  { id, message } = data;
        const { name }  = users.getUserById( socket.id ) ?? {};
        const customMessage = createMessage( name ?? '', message );
        socket.broadcast.to(id).emit('create-message', customMessage );
    } );
}