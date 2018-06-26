class DirectionalDistance {
    constructor(direction, distance) {
        this._direction = direction;
        this._distance = distance;
    }

    get direction() {
        return this._direction;
    }

    get distance() {
        return this._distance;
    }
}

export default DirectionalDistance