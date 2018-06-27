import * as _ from "lodash"
import DirectionalProbability from "./directional-probability";

class DirectionRandomizer {
    private _probabilityMap: Array<string>;

    constructor (directionalProbabilities: Array<DirectionalProbability>) {
        let self = this;
        self._probabilityMap = [];
        directionalProbabilities.forEach(function(directionalProbability) {
            var percents = Math.ceil(directionalProbability.probability * 100);
            _.times(percents, function(i) {
                self._probabilityMap.push(directionalProbability.direction);
            });
        });    
    }

    randomDirection() {
        let randomIndex = Math.floor(Math.random() * 100);
        return this._probabilityMap[randomIndex];
    }
}

export default DirectionRandomizer;