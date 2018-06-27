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

    get northPoint() {
        return new Point(this.x, this.y + 1);
    }

    get southPoint() {
        return new Point(this.x, this.y - 1);
    }

    get eastPoint() {
        return new Point(this.x + 1, this.y);
    }

    get westPoint() {
        return new Point(this.x - 1, this.y);
    }

    pointInDirection(direction: string) {
        if (direction === Direction.NORTH) {
            return this.northPoint;
        } else if (direction === Direction.SOUTH) {
            return this.southPoint;
        } else if (direction === Direction.EAST) {
            return this.eastPoint;
        } else if (direction === Direction.WEST) {
            return this.westPoint;
        } else {
            console.log(direction);
            throw new Error("Wrong direction specified!");
        }
    }
}

export default Point