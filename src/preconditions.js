//
//

export function checkArgument(cond, msg = null) {
    if (!cond) {
        throw new Error(msg || "Invalid argument");
    }
}

export function checkNotNull(ref, msg = null) {
    if (ref === null) {
        throw new Error(msg || "No NULL allowed");
    }
}