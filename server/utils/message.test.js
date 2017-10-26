
var expect = require ('expect');

var {generateMessage, generateLocationMessage} = require ('./message');

describe('generateMessage', () =>{
    it('Should generate correct message', () =>{
        //store res in variable
        var from = 'Ken';
        var text = 'Alcala is heart';
        //assert from match
        //assert from text
        var message = generateMessage(from,text);
        //assert createdAt Number
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text})
    })
})

describe('generateLocationMessage',() =>{
    it('Should generate location correct message', () =>{
        var from = 'Margo';
        var latitude = 15;
        var longitude = 19;
        var url ='https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude,longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    })
})