class DirectionalProbability {
    constructor(direction, probability) {
        this._direction = direction;
        this._probability = probability;
    }

    get direction() {
        return this._direction;
    }

    get probability() {
        return this._probability;
    }
}

export default DirectionalProbability