//
//

export default class Vector3 {
    
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    neg() {
        return new Vector3(-this.x, -this.y, this.z);
    }

    mult(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }

    div(s) {
        this.x /= s;
        this.y /= s;
        this.z /= s;
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    equal(v) {
        return this.x == v.x && this.y == v.y && this.z == v.z;
    }

    static zero() {
        return new Vector3(0, 0, 0);
    }
}
