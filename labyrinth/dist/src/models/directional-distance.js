"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectionalDistance = /** @class */ (function () {
    function DirectionalDistance(direction, distance) {
        this._direction = direction;
        this._distance = distance;
    }
    Object.defineProperty(DirectionalDistance.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DirectionalDistance.prototype, "distance", {
        get: function () {
            return this._distance;
        },
        enumerable: true,
        configurable: true
    });
    return DirectionalDistance;
}());
exports.default = DirectionalDistance;
