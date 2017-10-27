const expect = require ('expect');

const {isRealString} = require ('./validation');

describe('isRealString', () =>{
    it('should be a non-string values', () =>{
        var res = isRealString(99);
        expect(res).toBe(false);

    })
    it('should be a non-space values', () =>{
        var res = isRealString('     ');
        expect(res).toBe(false);

    })

    it('should be allow a non-string values', () =>{
        var res = isRealString('  Ken  ');
        expect(res).toBe(true);

    })

})