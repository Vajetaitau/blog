class DirectionalDistance {
    private _direction: string;
    private _distance: number;

    constructor(direction: string, distance: number) {
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