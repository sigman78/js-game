//
//

export function argument(cond, msg = null) {
    if (!cond) {
        throw new Error(msg || "Invalid argument");
    }
}

export function notNull(ref, msg = null) {
    if (ref === null) {
        throw new Error(msg || "No NULL is allowed");
    }
}

export function isDefined(ref, msg = null) {
    if (ref === undefined) {
        throw new Error(msg || "No undefined is allowed");
    }
}