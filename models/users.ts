export class Users {
    private users: User [];

    constructor() {
        this.users = [];
    }

    addUser = ( user: User ) => {
        this.users.push( user );    
    }

    getUserById = (id: string) => {
        return this.users.find( user => user.id === id );
    }

    getUsers = () => {
        return this.users;    
    }

    getUsersBySale = ( sale: string ) => {
       return this.users.filter( user => user.sale === sale );
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