import _range from "js-range";
import _sprintf from "sprintf";
//import * as PIXI from "pixi.js";

class RgbRamp {
    constructor(ramp) {
        this.ramp = ramp;
    }
    
    at(factor) {
        const at = Math.min(this.ramp.length - 1, this.ramp.length * factor);
        return this.ramp[at];
    }
}

class Utils {
    static range(a, b) {
        return _range(a, b);
    }

    static sprintf(...args) {
        return _sprintf(...args);
    }

    static error(what) {
        throw new Error(what);
    }

    // "%03.png", 1, 3 => [001.png, 002.png]
    static namesRange(template, a, b) {
        return Utils.range(a, b).map(n => {
            return Utils.sprintf(template, n);
        });
    }

    // max is exclusive
    static randFloatRange(maxOrMin, max=null) {
        if (max === null) {
            return Math.random() * maxOrMin;
        } else {
            return Math.random() * (max- maxOrMin) + maxOrMin;
        }
    }

    // max is inclusive!
    static randRange(maxOrMin, max=null) {
        if (max === null) {
            return Math.floor(Math.random() * (maxOrMin + 1));
        } else {
            return Math.floor(Math.random() * (max - maxOrMin + 1) + maxOrMin);
        }
    }

    static randPick(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    static rgbInterpolate(a, b, factor) {
        const r1 = a & 0xff;
        const g1 = (a >> 8) & 0xff;
        const b1 = (a >> 16) & 0xff;
        const a1 = (a >> 24) & 0xff;

        const r2 = b & 0xff;
        const g2 = (b >> 8) & 0xff;
        const b2 = (b >> 16) & 0xff;
        const a2 = (b >> 24) & 0xff;

        const f1 = factor;
        const f2 = 1.0 - factor;
        
        const rd = (r1 * f2) + (r2 * f1);
        const gd = (g1 * f2) + (g2 * f1);
        const bd = (b1 * f2) + (b2 * f1);
        const ad = (a1 * f2) + (a2 * f1);

        return Math.floor(rd) + Math.floor(gd) << 8 + Math.floor(bd) << 16 + Math.floor(ad) << 24;
    }

    static rgbRamp(a, b, steps) {
        const ramp = new Array(steps);
        for(let n = 0; n < steps; n++) {
            const f = n / (steps - 1);
            ramp[n] = Utils.rgbInterpolate(a, b, f);
        }
        return new RgbRamp(ramp);
    }

    static escapeHTML(str) {
        str = '' + str;
        return str
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;')
            .replace('\'', '&#x27;')
            .replace('`', '&#x60;')
            .replace('/', '&x2f;');
    }

    static clamp(val, min, max) {
        if (val < min) {
            return min;
        } else if (max < val) {
            return max;
        } else {
            return val;
        }
    }
}

export default Utils;