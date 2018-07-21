import Point from "../models/point";
import BacktrackStatus from '../enums/backtrack-status';
import QueryBuilder from './query/query-builder';
import Direction from '../enums/direction';

class BacktrackRepo {
    public updateToVisitedChildQuery(direction: Direction) {
        return "update backtrack_info                 " +
            "set " + direction.toLowerCase() + " = $3 " +
            "where x = $1                             " +
            "and y = $2                               "
    }

    public async updateToVisitedChild(point: Point, direction: Direction): Promise<void> {
        await new QueryBuilder()
            .query(
                this.updateToVisitedChildQuery(direction)
                , [point.x, point.y, BacktrackStatus.VISITED_CHILD]
            )
        return;
    }

    public async cleanState() {
        await new QueryBuilder()
            .addQuery(
                "update backtrack_info  " +
                "set north = $2    " +
                "where north = $1  "
                , res => { }
                , [BacktrackStatus.VISITED_CHILD, BacktrackStatus.NOT_VISITED_CHILD]
            )
            .addQuery(
                "update backtrack_info  " +
                "set south = $2    " +
                "where south = $1  "
                , res => { }
                , [BacktrackStatus.VISITED_CHILD, BacktrackStatus.NOT_VISITED_CHILD]
            )
            .addQuery(
                "update backtrack_info  " +
                "set east = $2    " +
                "where east = $1  "
                , res => { }
                , [BacktrackStatus.VISITED_CHILD, BacktrackStatus.NOT_VISITED_CHILD]
            )
            .addQuery(
                "update backtrack_info  " +
                "set west = $2    " +
                "where west = $1  "
                , res => { }
                , [BacktrackStatus.VISITED_CHILD, BacktrackStatus.NOT_VISITED_CHILD]
            )
            .executeInAsyncTransaction();
    }
}

export default new BacktrackRepo()