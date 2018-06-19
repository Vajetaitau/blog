var assert = require('assert');
var SpiralService = require("./spiral-service");

describe('SpiralService', function () {
    describe('#getNextSpiralPoint', function () {
        it('Should return true', function () {
            assert.strictEqual(SpiralService.getNextSpiralPoint(), true, "Should be true");
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});