import { assert } from "chai"
import Point from "../../src/models/point";
import { generationService } from "../../src/services/generation-service";
import Direction from "../../src/enums/direction";

describe('GenerationService', function () {
    describe('#getAvailableOptions', function () {
        it('Should be only EAST', async function () {
            var currentPoint = new Point(0, 0);
            const options = await generationService.getAvailableOptions(currentPoint);
            assert.deepStrictEqual(options, [Direction.EAST]);
        });
        it('Should be only NORTH', async function () {
            var currentPoint = new Point(1, 0);
            const options = await generationService.getAvailableOptions(currentPoint);
            assert.deepStrictEqual(options, [Direction.NORTH]);
        });
    });
});