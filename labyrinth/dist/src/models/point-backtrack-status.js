"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var direction_1 = require("../enums/direction");
var PointBacktrackStatus = /** @class */ (function () {
    function PointBacktrackStatus(north, south, east, west) {
        this._north = north;
        this._south = south;
        this._east = east;
        this._west = west;
    }
    Object.defineProperty(PointBacktrackStatus.prototype, "north", {
        get: function () {
            return this._north;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointBacktrackStatus.prototype, "south", {
        get: function () {
            return this._south;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointBacktrackStatus.prototype, "east", {
        get: function () {
            return this._east;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointBacktrackStatus.prototype, "west", {
        get: function () {
            return this._west;
        },
        enumerable: true,
        configurable: true
    });
    PointBacktrackStatus.prototype.statusInDirection = function (direction) {
        if (direction === direction_1.default.NORTH) {
            return this._north;
        }
        else if (direction === direction_1.default.SOUTH) {
            return this._south;
        }
        else if (direction === direction_1.default.EAST) {
            return this._east;
        }
        else if (direction === direction_1.default.WEST) {
            return this._west;
        }
        else {
            throw new Error("Wrong direction specified! :/");
        }
    };
    return PointBacktrackStatus;
}());
exports.default = PointBacktrackStatus;
