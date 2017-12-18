//
// Nothing will grow without your own rand implementation
import checkArgument from './preconditions';

// Linear congruental U32 gen
// Main purpose to bootstrap SW generator seed
class LCu32 {
    constructor(seedval = 1, a = 40014, c = 0, m = 2147483563) {
        checkArgument(m == 0 || (a < m && c < m), "modulus is out of bound");
        checkArgument(m % a < m / a, "multiplier is too big");

        this._multiplier = a;
        this._increment = c;
        this._modulus = m;
        this._x = 0;

        seed(seedval);
    }

    get min() {
        return this._increment == 0 ? 1 : 0;
    }

    get max() {
        return this._modulus - 1;
    }

    seed(val) {
        if ((this_.increment % this._modulus) == 0 && (val % this._modulus) == 0) {
            this._x = 1;
        } else {
            this._x = val % this._modulus;
        }
    }

    roll() {
        this._x = (this._x * this._multiplier + this._increment) % this._modulus;
        return this._x;
    }
}

/**
 * The Marsaglia-Zaman generator.
 * 
 * This is a model of a Generalized Fibonacci discrete random number
 * generator, sometimes referred to as the SWC generator.
 * 
 * A discrete random number generator that produces pseudorandom
 * numbers using:
 * x{i} -> (x{i - s}- x{i - r} - carry{i-1}) mod m
 * 
 * x - state of generator, ring buffer
 * carry - the carry
 * p - current index of x{i - r}
 * 
 * source: c++11 random lib
 * @author SiGMan
 */
class SWCu32 {
    constructor(seed_val = 19780503, w = 24, s = 10, r = 24) {
        checkArgument(0 < s && s < r, "s argument is out of bounds");
        checkArgument(0 < w && w <= 32, "w argument is out of bounds");
    
        this._word_size = w;
        this._short_lag = s;
        this._long_lag = r;
        this._p = 0;
        this._carry = 0;
        
        this._x = new Array(this._long_lag);
        
        seed(seed_val);
    }

    get min() {
        return 0;
    }

    get max() {
        return (1 << this._word_size) - 1;
    }

    seed(val) {
        // NB: There is strict relation between LCR output range (~31 bit) and SWC (default to 24 bit)
        // probably first one should not be smaller than the second
        // TODO: Read about SWC seeding quality requirements
        var lcg = new LCu32(val == 0 ? 19780503 : val);

        for (let i = 0; i < this._long_lag; ++i) {
            // i think its the correct simplification of the C++ source
            let sum = lcg.roll();
            this._x[i] = sum % (1 << this._word_size);
        }
        
        this._carry = (this._x[this._long_lag - 1] == 0) ? 1 : 0;
        this._p = 0;
    }

    roll() {
        // Derive short lag index from current index.
        let ps = this._p - this._short_lag;
        if (ps < 0) {
            ps += this._long_lag;
        }

        // Calculate new x(i) without overflow or division.
        let xi = 0;
        if (this._x[ps] >= this._x[this._p] + this._carry) {
            xi = this._x[ps] - this._x[this._p] - this._carry;
            this._carry = 0;
        } else {
            xi = ((1 << this._word_size) - this._x[this._p] - this._carry + this._x[ps]);
            this._carry = 1;
        }

        this._x[this._p] = xi;

        // Adjust current index to loop around in ring buffer.
        if (++this._p >= this._long_lag) {
            this._p = 0;
        }

        return xi;
    }
}