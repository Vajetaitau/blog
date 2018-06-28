import Direction from "../enums/direction"

class Point {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
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
}

export default Point