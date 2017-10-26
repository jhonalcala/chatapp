
var expect = require ('expect');

var {generateMessage} = require ('./message');

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