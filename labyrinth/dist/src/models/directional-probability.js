"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalProbability = /** @class */ (function () {
    function DirectionalProbability(direction, probability) {
        this._direction = direction;
        this._probability = probability;
    }
    Object.defineProperty(DirectionalProbability.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalProbability.prototype, "probability", {
        get: function () {
            return this._probability;
        },
        enumerable: true,
        configurable: true
    });
    return DirectionalProbability;
}());
exports.default = DirectionalProbability;
