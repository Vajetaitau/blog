import BacktrackStatus from '../enums/backtrack-status';
import Direction from '../enums/direction';

class PointBacktrackStatus {
    private readonly _north: BacktrackStatus;
    private readonly _south: BacktrackStatus;
    private readonly _east: BacktrackStatus;
    private readonly _west: BacktrackStatus;

    constructor(north: BacktrackStatus, south: BacktrackStatus, east: BacktrackStatus, west: BacktrackStatus) {
        this._north = north;
        this._south = south;
        this._east = east;
        this._west = west;
    }

    public get north() {
        return this._north;
    }

    public get south() {
        return this._south;
    }

    public get east() {
        return this._east;
    }

    public get west() {
        return this._west;
    }

    public statusInDirection(direction: Direction): BacktrackStatus {
        if (direction === Direction.NORTH) {
            return this._north;
        } else if (direction === Direction.SOUTH) {
            return this._south;
        } else if (direction === Direction.EAST) {
            return this._east;
        } else if (direction === Direction.WEST) {
            return this._west;
        } else {
            throw new Error("Wrong direction specified! :/")
        }
    }
}

export default PointBacktrackStatus