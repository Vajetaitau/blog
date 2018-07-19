"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var DirectionRandomizationService = /** @class */ (function () {
    function DirectionRandomizationService() {
    }
    DirectionRandomizationService.prototype.getRandomDirection = function (directionalProbabilities) {
        var probabilityMap = new Array();
        directionalProbabilities.forEach(function (directionalProbability) {
            var percents = Math.ceil(directionalProbability.probability * 100);
            _.times(percents, function (i) {
                probabilityMap.push(directionalProbability.direction);
            });
        });
        var randomIndex = Math.floor(Math.random() * 100);
        // console.log(probabilityMap);
        // console.log(randomIndex);
        return probabilityMap[randomIndex];
    };
    return DirectionRandomizationService;
}());
exports.directionRandomizationService = new DirectionRandomizationService();
