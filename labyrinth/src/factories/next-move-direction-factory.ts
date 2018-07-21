import * as _ from "lodash"
import Direction from '../enums/direction';
import Point from '../models/point';
import DirectionalProbability from '../models/directional-probability';

class NextMoveDirectionFactory {
    private _currentPoint: Point;
    private _endCoord: Point;

    constructor(currentPoint: Point, endCoord: Point) {
        this._currentPoint = currentPoint;
        this._endCoord = endCoord;
    }

    public getRandomDirection() {
        let probabilityMap = new Array<Direction>();

        const optionsProbabilities = this.getOptionsProbabilities();
        optionsProbabilities.forEach(function (optionProbability) {
            var percents = Math.ceil(optionProbability.probability * 100);
            _.times(percents, function (i) {
                probabilityMap.push(optionProbability.direction);
            });
        });

        let randomIndex = Math.floor(Math.random() * 100);
        return probabilityMap[randomIndex];
    }

    private getOptionsProbabilities() {
        const options = this._currentPoint.getAvailableOptions();
        const averageProb = 1 / options.length;

        let directionalProbs = new Array<DirectionalProbability>();
        if (options.find(opt => opt === Direction.NORTH)) {
            directionalProbs.push(new DirectionalProbability(Direction.NORTH, averageProb));
        }
        if (options.find(opt => opt === Direction.SOUTH)) {
            directionalProbs.push(new DirectionalProbability(Direction.SOUTH, averageProb));
        }
        if (options.find(opt => opt === Direction.EAST)) {
            directionalProbs.push(new DirectionalProbability(Direction.EAST, averageProb));
        }
        if (options.find(opt => opt === Direction.WEST)) {
            directionalProbs.push(new DirectionalProbability(Direction.WEST, averageProb));
        }
        return directionalProbs;
    }
}

export default NextMoveDirectionFactory