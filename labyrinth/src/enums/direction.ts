enum Direction {
    NORTH = "NORTH",
    SOUTH = "SOUTH",
    EAST = "EAST",
    WEST = "WEST"
}

namespace Direction {
    export function values(): Array<Direction> {
        return [Direction.NORTH, Direction.SOUTH, Direction.EAST, Direction.WEST];
    }
    export function oposite(direction: Direction): Direction {
        if (direction === Direction.NORTH) {
            return Direction.SOUTH;
        } else if (direction === Direction.SOUTH) {
            return Direction.NORTH;
        } else if (direction === Direction.EAST) {
            return Direction.WEST;
        } else if (direction === Direction.WEST) {
            return Direction.EAST;
        }
    }
}

export default Direction