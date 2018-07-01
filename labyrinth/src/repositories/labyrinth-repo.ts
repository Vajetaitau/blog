import * as _ from "lodash";
import Point from "../models/point";
import Direction from "../enums/direction";

class LabyrinthRepo {
    private _sizeConstant = 1000;
    private _labyrinthTable: Array<Array<Point>>;

    constructor() {
        this._labyrinthTable = new Array(this._sizeConstant);
        this._labyrinthTable.forEach(function (row, index) {
            this._labyrinthTable[index] = new Array(this._sizeConstant);
        });
    }

    public getOptions(point: Point): Array<Direction> {
        let options = [];
        if (this.exists(point.northPoint())) {
            options.push(Direction.NORTH);
        }
        if (this.exists(point.southPoint())) {
            options.push(Direction.SOUTH);
        }
        if (this.exists(point.eastPoint())) {
            options.push(Direction.EAST);
        }
        if (this.exists(point.westPoint())) {
            options.push(Direction.WEST);
        }
        return options;
    }

    private exists(point: Point): boolean {
        return !!this.getPoint(point.x, point.y);
    }

    private getPoint(x: number, y: number) {
        // x and y coordinates can be negative as well as positive
        // so we always have to add some amount, to transform to
        // array indexes
        const ammountToAdd = this._sizeConstant / 2;
        return this._labyrinthTable[y + ammountToAdd][x + ammountToAdd];
    }

}

export default new LabyrinthRepo();