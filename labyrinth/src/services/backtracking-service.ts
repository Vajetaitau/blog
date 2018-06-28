import * as _ from "lodash"
import Path from "../models/path";
import Point from "../models/point";
import MoveOptionsService from "./move-options-service";

class BacktrackingService {
    /**
     * getLastOpenPoint
     */
    public getLastOpenPoint(path: Path): Point {
        var lastOpenPoint = _.findLast(path.pointArray, function (point) {
            return new MoveOptionsService().availableOptions(path, point).length > 0;
        });
        if (lastOpenPoint !== undefined) {
            return lastOpenPoint;
        } else {
            throw new Error("The whole path is taken!");
        }        
    }
}

export default BacktrackingService