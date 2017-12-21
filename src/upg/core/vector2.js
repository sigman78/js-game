//
//

export default class Vector2 {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    neg() {
        return new Vector2(-this.x, -this.y);
    }

    mult(s) {
        this.x *= s;
        this.y *= s;
    }

    div(s) {
        this.x /= s;
        this.y /= s;
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    angle() {
        return Math.atan2(this.y, this.x) - Math.PI / 2;
    }

    equal(v) {
        return this.x == v.x && this.y == v.y;
    }

    static zero() {
        return new Vector2(0, 0);
    }

    static left() {
        return new Vector2(1, 0);
    }

    static down() {
        return new Vector2(0, 1);
    }
}
