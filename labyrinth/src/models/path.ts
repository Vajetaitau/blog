import * as _ from "lodash"
import Point from "./point"

class Path {
    private _path: Array<Point>;

    constructor(path : Array<Point>) {
        let self = this;
        self._path = [];
        
        if (arguments.length > 1) { // point1, point2, ...
            _.forEach(arguments, function(point) {
                self._path.push(point);
            });
        } else { // array
            if (path) {
                _.forEach(path, function(point) {
                    self._path.push(point);
                });
            }            
        }
    }

    contains(point: Point) {
        return !!_.find(this._path, point);
    }
    
    add(point: Point) {
        this._path.push(point);
    }

    get pointArray() {
        return this._path;
    }

    get length() {
        return this._path.length;
    }
}

export default Path