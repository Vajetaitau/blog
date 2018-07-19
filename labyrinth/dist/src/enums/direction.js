"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["SOUTH"] = "SOUTH";
    Direction["EAST"] = "EAST";
    Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
(function (Direction) {
    function values() {
        return [Direction.NORTH, Direction.SOUTH, Direction.EAST, Direction.WEST];
    }
    Direction.values = values;
    function oposite(direction) {
        if (direction === Direction.NORTH) {
            return Direction.SOUTH;
        }
        else if (direction === Direction.SOUTH) {
            return Direction.NORTH;
        }
        else if (direction === Direction.EAST) {
            return Direction.WEST;
        }
        else if (direction === Direction.WEST) {
            return Direction.EAST;
        }
    }
    Direction.oposite = oposite;
})(Direction || (Direction = {}));
exports.default = Direction;
