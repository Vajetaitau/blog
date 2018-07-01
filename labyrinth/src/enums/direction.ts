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
}

export default Direction