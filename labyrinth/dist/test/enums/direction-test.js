"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var direction_1 = require("../../src/enums/direction");
var Chai = require("chai");
describe("Direction", function () {
    describe("#values", function () {
        it('Should return 4 values', function () {
            var values = direction_1.default.values();
            var expectedValues = [
                direction_1.default.NORTH,
                direction_1.default.SOUTH,
                direction_1.default.EAST,
                direction_1.default.WEST
            ];
            Chai.assert.deepStrictEqual(values, expectedValues);
        });
    });
});
