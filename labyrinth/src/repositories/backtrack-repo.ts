import PointBacktrackStatus from "../models/point-backtrack-status";
import Point from "../models/point";
import BacktrackStatus from "../enums/backtrack-status";
import QueryBuilder from './query/query-builder';

class BacktrackRepo {
    private _sizeConstant = 1000;
    private _labyrinthTable: Array<Array<Point>>;

    public getBacktrackStatus(point: Point): Promise<PointBacktrackStatus> {

        return new QueryBuilder()
            .query(
                "select north, south, east, west " +
                "from backtrack_info as bi " + 
                "where bi.x = $1 " +
                "and bi.y = $2"
                , [point.x, point.y]
            )
            .then(res => {
                const firstRow = res.rows[0]
                return new PointBacktrackStatus(
                    firstRow.north,
                    firstRow.south,
                    firstRow.east,
                    firstRow.west
                );
            });
        
    }
}

export default new BacktrackRepo()