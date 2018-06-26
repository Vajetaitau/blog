import _ from "lodash"

class DirectionRandomizer {
    constructor (directionalProbabilities) {
        let self = this;
        self._probabilityMap = [];
        _.forEach(directionalProbabilities, function(directionalProbability) {
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