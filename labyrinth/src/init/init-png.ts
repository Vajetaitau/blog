import * as _ from "lodash"
import QueryBuilder from '../repositories/query/query-builder'
import * as Jimp from "jimp"
import Point from '../models/point';
import DirectionStatus from '../enums/direction-status';

process.on('unhandledRejection', up => { throw up })
let allLabyrinthPoints = new Array<Point>();

const transparent = Jimp.rgbaToInt(0, 0, 0, 0);
const pathColor = Jimp.rgbaToInt(255, 255, 255, 255); // white
const wallColor = Jimp.rgbaToInt(255, 0, 0, 255);     // red

loadRows(allLabyrinthPoints, 50, 0).then(() => {
    new (Jimp as any)(1000, 1000, (err: Error, image: Jimp.Jimp) => {
        for (const point of allLabyrinthPoints) {
            console.log(point);
            const xx = new Point(point.x * 2 + 500, point.y * 2 + 500);

            const north = paintConnection(xx.northPoint(), point.north);            
            const south = paintConnection(xx.southPoint(), point.south);
            const east = paintConnection(xx.eastPoint(), point.east);
            const west = paintConnection(xx.westPoint(), point.west);

            const topL = paintWall(xx.northPoint().westPoint());
            const topR = paintWall(xx.northPoint().eastPoint());
            const bottomL = paintWall(xx.southPoint().westPoint());
            const bottomR = paintWall(xx.southPoint().eastPoint());

            const center = paintPath(xx);           
        }

        function paintConnection(coord: Point, status: DirectionStatus) {
            if (status === DirectionStatus.OPEN) {
                paintPath(coord);
            } else {
                paintWall(coord);
            }
        }

        function paintPath(coord: Point) {
            image.setPixelColor(pathColor, coord.x, coord.y);
        }

        function paintWall(coord: Point) {
            image.setPixelColor(wallColor, coord.x, coord.y);
        }

        image.write("test.png", (err) => {
            if (err) throw err;
        });
    });
});

async function loadRows(rowArray: any[], limit: number, offset: number) {
    const rows = await returnRows(limit, offset);
    if (rows.length > 0) {
        rowArray.push(...rows);
        // await loadRows(rowArray, limit, offset + limit);
    }

    return rowArray;
}

async function returnRows(limit: number, offset: number) {
    const result = await new QueryBuilder()
        .query(
            "select x, y, north, south, east, west " +
            "from labyrinth                        " +
            "order by x, y                         " +
            "limit $1 offset $2                    "
            , [limit, offset]
        )

    return _.map(result.rows, row => { return new Point(row.x, row.y, row.north, row.south, row.east, row.west) });
}
