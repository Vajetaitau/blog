import * as _ from "lodash"
import DistanceService from "./distance-service"
import DirectionalProbability from "../models/directional-probability"
import Point from "../models/point"
import Path from "../models/path"
import Direction from "../enums/direction"

class MoveOptionsService {
    public availableOptions(takenPath: Path, currentPoint: Point): Array<string> {
        if (!(takenPath instanceof Path && currentPoint instanceof Point)) {
            throw new Error("Incorrect parameters.");
        }

        let options = [];
        if (!takenPath.contains(currentPoint.northPoint())) {
            options.push(Direction.NORTH);
        }
        if (!takenPath.contains(currentPoint.southPoint())) {
            options.push(Direction.SOUTH);
        }
        if (!takenPath.contains(currentPoint.eastPoint())) {
            options.push(Direction.EAST);
        }
        if (!takenPath.contains(currentPoint.westPoint())) {
            options.push(Direction.WEST);
        }
        return options;
    }

    public availableOptionsProbabilities(takenPath: Path, currentPoint: Point, endPoint: Point, basicProbabilityPath = 0.8): Array<DirectionalProbability> {
        let options = this.availableOptions(takenPath, currentPoint);
        let directionalDistance = new DistanceService().directionalDistance(currentPoint, endPoint);
        if (options.length === 0) {
            return [];
        }

        // now we should get options, where the point should have bigger probability to move at
        let directionalOptions = _.filter(options, function (option) {
            var isOneOfDirections = _.find(directionalDistance, { direction: option });
            return !!isOneOfDirections;
        });

        if (directionalOptions.length > 0) {
            const basicProbabilityPart = 0.8;
            const basicProbability = basicProbabilityPart / options.length;
            if (directionalOptions.length === 1) {
                return _.map(options, function (option) {
                    let probability;
                    if (option === directionalOptions[0]) {
                        probability = basicProbability + 1 - basicProbabilityPart;
                    } else {
                        probability = basicProbability;
                    }
                    return new DirectionalProbability(option, probability);
                });
            } else if (directionalOptions.length === 2) {
                const d1 = directionalDistance[0], d2 = directionalDistance[1];
                const directionalProbabilityCoef = (1 - basicProbabilityPart) * (d1.distance * d2.distance) / (d1.distance + d2.distance);
                return _.map(options, function (option) {
                    let probability;
                    if (option === d1.direction) {
                        probability = basicProbability + directionalProbabilityCoef / d1.distance;
                    } else if (option === d2.direction) {
                        probability = basicProbability + directionalProbabilityCoef / d2.distance;
                    } else {
                        probability = basicProbability;
                    }
                    return new DirectionalProbability(option, probability);
                });
            }
        } else {
            const basicProbability = 1 / options.length;
            return _.map(options, function (option) {
                return new DirectionalProbability(option, basicProbability);
            });
        }
    }
}

export default MoveOptionsService