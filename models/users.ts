export class Users {
    private users: User [];

    constructor() {
        this.users = [];
    }

    addUser = ( user: User ) => {
        this.users.push( user );    
        return this.users;
    }

    getUserById = (id: string) => {
        return this.users.find( user => user.id === id );
    }

    getUsers = () => {
        return this.users;    
    }

    getUserBySale = ( sale: string ) => {
        // TODO after
    }

    removeUser = ( id: string ) => {
        const removeUser = this.getUserById( id );
        this.users = this.users.filter( user => user.id !== id );
        return removeUser;
    }
}

interface User {
    id: string;
    name: string;
    sale?: string;
}