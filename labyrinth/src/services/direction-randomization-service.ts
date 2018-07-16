import * as _ from "lodash";
import DirectionalProbability from "../models/directional-probability";
import Direction from "../enums/direction";

class DirectionRandomizationService {

    getRandomDirection(directionalProbabilities: Array<DirectionalProbability>) : Direction {
        let probabilityMap = new Array<Direction>();
        directionalProbabilities.forEach(function(directionalProbability) {
            var percents = Math.ceil(directionalProbability.probability * 100);
            _.times(percents, function(i) {
                probabilityMap.push(directionalProbability.direction);
            });
        });    

        let randomIndex = Math.floor(Math.random() * 100);
        return probabilityMap[randomIndex];
    }

}

export let directionRandomizationService = new DirectionRandomizationService();