
const expect = require ('expect');
const {Users} = require ('./users');

var users;

beforeEach(() =>{
    users = new Users();
    users.users [
        {
            id: '1',
            name: 'Ken',
            room: 'River'
        },
        {
            id: '2',
            name: 'Jhon',
            room: 'River'
        },
        {
            id: '3',
            name: 'Alcala',
            room: 'Reekoh'
        }

    ]
})

describe('Users', () =>{

    it('Should be add user', () =>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'Margo',
            room: 'Accenture'
        }

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);

    }) 

    it('Should return names from River', () =>{
        var userList = users.getUserList('River');

        expect(userList).toEqual(['Ken', 'Jhon']);
    })

    it('Should return names from Reekoh', () =>{
        var userList = users.getUserList('Reekoh');

        expect(userList).toEqual(['Alcala']);
})
})