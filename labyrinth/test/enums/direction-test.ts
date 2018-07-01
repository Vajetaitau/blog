import Direction from '../../src/enums/direction';
import * as Chai from 'chai';

describe("Direction", function () {
    describe("#values", function () {
        it('Should return 4 values', function () {
            var values = Direction.values();
            var expectedValues = [
                Direction.NORTH,
                Direction.SOUTH,
                Direction.EAST,
                Direction.WEST
            ];
            Chai.assert.deepStrictEqual(values, expectedValues);
        });
    });
});