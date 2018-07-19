"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var spiral_service_1 = require("./spiral-service");
describe('SpiralService', function () {
    describe('#getNextSpiralPoint', function () {
        it('Should return true', function () {
            assert_1.default.strictEqual(spiral_service_1.default.getNextSpiralPoint(), true, "Should be true");
        });
    });
    // describe("#getSpiralPoints", function() {
    //     it("Should be straight line", function() {
    //         assert.strictEqual(SpiralService.getSpiralPoints(1440 * 4), null);
    //     });
    // });
    describe("#getMustVisitSpiralPoints", function () {
        it("3 loops should have 54 points", function () {
            assert_1.default.strictEqual(spiral_service_1.default.getMustVisitSpiralPoints(3).length, 54);
        });
    });
});
