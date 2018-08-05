import * as _ from "lodash";
import Point from "../models/point";
import Direction from '../enums/direction';
import QueryBuilder from './query/query-builder';
import DirectionStatus from '../enums/direction-status';
import BacktrackStatus from '../enums/backtrack-status';
import backtrackRepo from "./backtrack-repo";

class LabyrinthRepo {
    public async getPlayerPoint(player: string): Promise<Point> {
        const queryResult = await new QueryBuilder()
            .query(
                "select l.x, l.y, l.north, l.south, l.east, l.west " +
                "from player as p                                  " +
                "inner join labyrinth l on p.x = l.x and p.y = l.y " +
                "where p.name = $1                                 "
                , [player]
            );
        const firstRow = queryResult.rows[0];
        return new Point(
            firstRow.x, firstRow.y,
            firstRow.north, firstRow.south, firstRow.east, firstRow.west
        );
    }

    public async getVisiblePoints(player: string): Promise<Array<Point>> {
        const queryResult = await new QueryBuilder()
            .query(
                "select l.x, l.y, l.north, l.south, l.east, l.west                    " +
                "from player as p                                                     " +
                "inner join labyrinth as l on (p.x + $2 >= l.x) and (p.x - $2 <= l.x) " +
                "                         and (p.y + $2 >= l.y) and (p.y - $2 <= l.y) " +
                "where p.name = $1                                                    "
                , [player, 10]
            );
        return queryResult.rows.map(r => {
            return new Point(r.x, r.y, r.north, r.south, r.east, r.west);
        });
    }

    public async move(player: string, x: number, y: number): Promise<void> {
        const queryResult = await new QueryBuilder()
            .query(
                "update player  " +
                "set            " +
                "x = $1,        " +
                "y = $2         " +
                "where name = $3"
                , [x, y, player]
            );
        return;
    }

    public getPoint(x: number, y: number): Promise<Point> {
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

    public async exists(x: number, y: number): Promise<boolean> {
        const queryResult = await new QueryBuilder()
            .query(
                "select 1       " +
                "from labyrinth " +
                "where x = $1   " +
                "and y = $2     "
                , [x, y]
            );
        return queryResult.rowCount === 1;
    }

    // returns directions, where neigbour points exist
    public getNeighbourDirections(x: number, y: number): Promise<Array<Direction>> {
        return new QueryBuilder()
            .query(
                "select 'NORTH' d     " +
                "from labyrinth       " +
                "where x = $1         " +
                "and y = $2 + 1       " +
                "union                " +
                "select 'SOUTH' d     " +
                "from labyrinth       " +
                "where x = $1         " +
                "and y = $2 - 1       " +
                "union                " +
                "select 'EAST' d      " +
                "from labyrinth       " +
                "where x = $1 + 1     " +
                "and y = $2           " +
                "union                " +
                "select 'WEST' d      " +
                "from labyrinth       " +
                "where x = $1 - 1     " +
                "and y = $2           "
                , [x, y]
            ).then(res => {
                const rows = res.rows;
                return _.map(rows, row => {
                    return row.d;
                })
            });
    }

    public async saveNewPoint(point: Point, neighboars: Array<Direction>) {
        let queryBuilder = new QueryBuilder();
        const parentDirection = point.parentDirection();
        const parent = point.parentPoint();

        for (const neigboarDirection of neighboars) {
            if (neigboarDirection !== parentDirection) {
                const neighboarCoord = point.pointInDirection(neigboarDirection);
                queryBuilder
                    .addQuery(
                        "update labyrinth                                                       " +
                        "set " + Direction.oposite(neigboarDirection).toLowerCase() + " = $3    " +
                        "where x = $1                                                           " +
                        "and y = $2                                                             "
                        , res => {
                            if (neighboarCoord.x === 100 && neighboarCoord.y === 0) {
                                console.log('x', );
                            }
                        },
                        [neighboarCoord.x, neighboarCoord.y, DirectionStatus.CLOSED]
                    )
                    .addQuery(
                        "update backtrack_info                                                  " +
                        "set " + Direction.oposite(neigboarDirection).toLowerCase() + " = $3    " +
                        "where x = $1                                                           " +
                        "and y = $2                                                             "
                        , res => {

                        },
                        [neighboarCoord.x, neighboarCoord.y, BacktrackStatus.CLOSED]
                    );
            }
        }

        await queryBuilder
            .addQuery(
                backtrackRepo.updateToVisitedChildQuery(Direction.oposite(parentDirection))
                , res => {
                    // console.log(res);
                },
                [parent.x, parent.y, BacktrackStatus.VISITED_CHILD]
            )
            .addQuery(
                "insert into                                  " +
                "labyrinth(x, y, north, south, east, west)    " +
                "values ($1, $2, $3, $4, $5, $6)              "
                , res => {
                    // console.log(res);
                },
                [point.x, point.y, point.north, point.south, point.east, point.west]
            )
            .addQuery(
                "insert into                                    " +
                "backtrack_info(x, y, north, south, east, west) " +
                "values ($1, $2, $3, $4, $5, $6)                ",
                res => {
                    // console.log(res);
                },
                [
                    point.x, point.y,
                    point.backtrackNorth, point.backtrackSouth,
                    point.backtrackEast, point.backtrackWest
                ]
            )
            .executeInAsyncTransaction();
    }

    public async cleanState() {
        await new QueryBuilder()
            .addQuery(
                "update labyrinth  " +
                "set north = $2    " +
                "where north = $1  "
                , res => { }
                , [DirectionStatus.OPEN_BUT_TOO_FAR, DirectionStatus.OPEN]
            )
            .addQuery(
                "update labyrinth  " +
                "set south = $2    " +
                "where south = $1  "
                , res => { }
                , [DirectionStatus.OPEN_BUT_TOO_FAR, DirectionStatus.OPEN]
            )
            .addQuery(
                "update labyrinth  " +
                "set east = $2    " +
                "where east = $1  "
                , res => { }
                , [DirectionStatus.OPEN_BUT_TOO_FAR, DirectionStatus.OPEN]
            )
            .addQuery(
                "update labyrinth  " +
                "set west = $2    " +
                "where west = $1  "
                , res => { }
                , [DirectionStatus.OPEN_BUT_TOO_FAR, DirectionStatus.OPEN]
            )
            .executeInAsyncTransaction();
    }

}

export default new LabyrinthRepo();