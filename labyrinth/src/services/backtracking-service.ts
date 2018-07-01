import * as _ from "lodash"
import Path from "../models/path";
import Point from "../models/point";
import BacktrackStatus from "../enums/backtrack-status";
import Direction from "../enums/direction";
import DirectionStatus from "../enums/direction-status";
import { moveOptionsService } from "./move-options-service";
import backtrackRepo from "../repositories/backtrack-repo";

class BacktrackingService {
    public getLastOpenPoint(path: Path): Point {
        var lastOpenPoint = _.findLast(path.pointArray, function (point) {
            return moveOptionsService.availableOptions(path, point).length > 0;
        });
        if (lastOpenPoint !== undefined) {
            return lastOpenPoint;
        } else {
            throw new Error("The whole path is taken!");
        }
    }

    public getUnexploredOptions(point: Point) {
        return backtrackRepo.getBacktrackStatus(point).then((pointBacktrackStatus) => {
            let unexploredOptions = new Array<Direction>();
            Direction.values().forEach(function (direction) {
                if (point.statusInDirection(direction) === DirectionStatus.OPEN &&
                    pointBacktrackStatus.statusInDirection(direction) === BacktrackStatus.NOT_VISITED_CHILD) {
    
                    unexploredOptions.push(direction);
                }
            });
            return unexploredOptions;
        });
    }
}

export let backtrackingService =  new BacktrackingService()