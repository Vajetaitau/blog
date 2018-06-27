class DirectionalProbability {
    private _direction: string;
    private _probability: number;

    constructor(direction: string, probability: number) {
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