import * as _ from "lodash";
import Point from "../models/point";
import Direction from "../enums/direction";
import QueryBuilder from "./query/query-builder";
import DirectionStatus from "../enums/direction-status";
import BacktrackStatus from "../enums/backtrack-status";

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

    public getPointX(x: number, y: number): Promise<Point> {
        return new QueryBuilder()
            .query(
                "select l.north north, l.south south, l.east east, l.west west, bi.north b_north, bi.south b_south, bi.east b_east, bi.west b_west " +
                "from labyrinth as l " +
                "inner join backtrack_info as bi on l.x = bi.x and l.y = bi.y " +
                "where l.x = $1 " +
                "and l.y = $2"
                , [x, y]
            )
            .then(res => {
                const firstRow = res.rows[0];
                return new Point(
                    x, y,
                    firstRow.north,
                    firstRow.south,
                    firstRow.east,
                    firstRow.west,
                    firstRow.b_north,
                    firstRow.b_south,
                    firstRow.b_east,
                    firstRow.b_west
                );
            });
    }

}

export default new LabyrinthRepo();