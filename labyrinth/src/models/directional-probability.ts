import Direction from "../enums/direction";

class DirectionalProbability {
    private _direction: Direction;
    private _probability: number;

    constructor(direction: Direction, probability: number) {
        this._direction = direction;
        this._probability = probability;
    }

    get direction() : Direction {
        return this._direction;
    }

    get probability() {
        return this._probability;
    }
}

export default DirectionalProbability