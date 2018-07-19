"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var DirectionRandomizer = /** @class */ (function () {
    function DirectionRandomizer(directionalProbabilities) {
        var self = this;
        self._probabilityMap = [];
        directionalProbabilities.forEach(function (directionalProbability) {
            var percents = Math.ceil(directionalProbability.probability * 100);
            _.times(percents, function (i) {
                self._probabilityMap.push(directionalProbability.direction);
            });
        });
    }
    DirectionRandomizer.prototype.randomDirection = function () {
        var randomIndex = Math.floor(Math.random() * 100);
        return this._probabilityMap[randomIndex];
    };
    return DirectionRandomizer;
}());
exports.default = DirectionRandomizer;
