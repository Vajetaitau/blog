import _ from "lodash"
import Point from "./point"

class Path {
    constructor(path) {
        let self = this;
        self._path = [];
        
        if (arguments.length > 1) { // point1, point2, ...
            _.forEach(arguments, function(point) {
                point = Point.from(point);
                self._path.push(point);
            });
        } else { // array
            if (path) {
                _.forEach(path, function(point) {
                    point = Point.from(point);
                    self._path.push(point);
                });
            }            
        }
    }

    contains(point) {
        point = Point.from(point);
        return !!_.find(this._path, point);
    }
    
    add(point) {
        point = Point.from(point);
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