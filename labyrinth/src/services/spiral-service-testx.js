import assert from "assert"
import SpiralService from "./spiral-service"

describe('SpiralService', function () {
    describe('#getNextSpiralPoint', function () {
        it('Should return true', function () {
            assert.strictEqual(SpiralService.getNextSpiralPoint(), true, "Should be true");
        });
    });
    // describe("#getSpiralPoints", function() {
    //     it("Should be straight line", function() {
    //         assert.strictEqual(SpiralService.getSpiralPoints(1440 * 4), null);
    //     });
    // });
    describe("#getMustVisitSpiralPoints", function() {
        it("3 loops should have 54 points", function() {
            assert.strictEqual(SpiralService.getMustVisitSpiralPoints(3).length, 54);
        });
    });
});