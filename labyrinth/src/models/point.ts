import Direction from '../enums/direction';
import DirectionStatus from '../enums/direction-status';

class Point {
    private _x: number;
    private _y: number;
    private _north: DirectionStatus;
    private _south: DirectionStatus;
    private _east: DirectionStatus;
    private _west: DirectionStatus;

    constructor(x: number, y: number, north?: DirectionStatus, south?: DirectionStatus, east?: DirectionStatus, west?: DirectionStatus) {
        this._x = x;
        this._y = y;
        this._north = north;
        this._south = south;
        this._east = east;
        this._west = west;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    public get north(): DirectionStatus {
        return this._north;
    }

    public get south(): DirectionStatus {
        return this._south;
    }

    public get east(): DirectionStatus {
        return this._east;
    }

    public get west(): DirectionStatus {
        return this._west;
    }

    public northPoint(): Point {
        return new Point(this.x, this.y + 1);
    }

    public southPoint(): Point {
        return new Point(this.x, this.y - 1);
    }

    public eastPoint(): Point {
        return new Point(this.x + 1, this.y);
    }

    public westPoint(): Point {
        return new Point(this.x - 1, this.y);
    }

    public pointInDirection(direction: string): Point {
        if (direction === Direction.NORTH) {
            return this.northPoint();
        } else if (direction === Direction.SOUTH) {
            return this.southPoint();
        } else if (direction === Direction.EAST) {
            return this.eastPoint();
        } else if (direction === Direction.WEST) {
            return this.westPoint();
        } else {
            console.log(direction);
            throw new Error("Wrong direction specified!");
        }
    }

    public statusInDirection(direction: Direction): DirectionStatus {
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

export default Point