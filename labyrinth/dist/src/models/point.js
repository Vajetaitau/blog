"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var direction_1 = require("../enums/direction");
var backtrack_status_1 = require("../enums/backtrack-status");
var Point = /** @class */ (function () {
    function Point(x, y, north, south, east, west, backtrackNorth, backtrackSouth, backtrackEast, backtrackWest) {
        this._x = x;
        this._y = y;
        this._north = north;
        this._south = south;
        this._east = east;
        this._west = west;
        this._backtrackNorth = backtrackNorth;
        this._backtrackSouth = backtrackSouth;
        this._backtrackEast = backtrackEast;
        this._backtrackWest = backtrackWest;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "north", {
        get: function () {
            return this._north;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "south", {
        get: function () {
            return this._south;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "east", {
        get: function () {
            return this._east;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "west", {
        get: function () {
            return this._west;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "backtrackNorth", {
        get: function () {
            return this._backtrackNorth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "backtrackSouth", {
        get: function () {
            return this._backtrackSouth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "backtrackEast", {
        get: function () {
            return this._backtrackEast;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "backtrackWest", {
        get: function () {
            return this._backtrackWest;
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.northPoint = function () {
        return new Point(this.x, this.y + 1);
    };
    Point.prototype.southPoint = function () {
        return new Point(this.x, this.y - 1);
    };
    Point.prototype.eastPoint = function () {
        return new Point(this.x + 1, this.y);
    };
    Point.prototype.westPoint = function () {
        return new Point(this.x - 1, this.y);
    };
    Point.prototype.parentDirection = function () {
        if (this._backtrackNorth === backtrack_status_1.default.PARENT) {
            return direction_1.default.NORTH;
        }
        else if (this._backtrackSouth === backtrack_status_1.default.PARENT) {
            return direction_1.default.SOUTH;
        }
        else if (this._backtrackEast === backtrack_status_1.default.PARENT) {
            return direction_1.default.EAST;
        }
        else if (this._backtrackWest === backtrack_status_1.default.PARENT) {
            return direction_1.default.WEST;
        }
        else {
            throw new Error("Parent point does not exist :/");
        }
    };
    Point.prototype.parentPoint = function () {
        return this.pointInDirection(this.parentDirection());
    };
    Point.prototype.pointInDirection = function (direction) {
        if (direction === direction_1.default.NORTH) {
            return this.northPoint();
        }
        else if (direction === direction_1.default.SOUTH) {
            return this.southPoint();
        }
        else if (direction === direction_1.default.EAST) {
            return this.eastPoint();
        }
        else if (direction === direction_1.default.WEST) {
            return this.westPoint();
        }
        else {
            throw new Error("Wrong direction specified! (" + direction + ")");
        }
    };
    Point.prototype.statusInDirection = function (direction) {
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
            throw new Error("Wrong direction specified! (" + direction + ")");
        }
    };
    Point.prototype.hasSameCoordinates = function (point) {
        return this.x === point.x && this.y === point.y;
    };
    return Point;
}());
exports.default = Point;
