//
//
// import * as PIXI from "pixi.js";

export const Keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ENTER: 13,
    SPACE: 32,
    PGUP:33,
    PGDN: 34,
    PAUSE: 19,
    F1: 112,
    F2: 113,
    ESC: 27
};

// singleton style
export class Input {
    static init() {
        Input.keysDown = new Set();
        Input.keysJustDown = new Set();
        Input.keysJustUp = new Set();
        Input.suspended = false;

        document.addEventListener("keydown", Input.onKeyDown);
        document.addEventListener("keyup", Input.onKeyUp);
    }

    // temporary suspend input (like in case of chat typing etc)
    static suspend() {
        if (!Input.suspended) {
            Input.suspended = true;
            // need to forcefully release all currently pressed buttons
            for (const key in Input.keysDown) {
                Input.keysJustUp.add(key);
            }
            Input.keysDown.clear();
            Input.keysJustDown.clear();
        }
    }

    static resume() {
        if (Input.suspended) {
            Input.suspended = false;
            // to be sure
            Input.keysJustUp.clear();
        }
    }

    static onFrameEnd() {
        Input.keysJustDown.clear();
        Input.keysJustUp.clear();
    }

    static onKeyDown(ev) {
        if (!Input.suspended) {
            const keyCode = ev.keyCode;
            Input.keysDown.add(keyCode);
            Input.keysJustDown.add(keyCode);
        }
    }

    static onKeyUp(ev) {
        if (!Input.suspended) {
            const keyCode = ev.keyCode;
            Input.keysDown.delete(keyCode);
            Input.keysJustUp.add(keyCode);
        }
    }

    // true if key pressed
    static key(keyCode) {
        return Input.keysDown.has(keyCode);
    }

    // true if key being down on this frame
    static keyDown(keyCode) {
        return Input.keysJustDown.has(keyCode);
    }

    // true if key being up on this frame
    static keyUp(keyCode) {
        return Input.keysJustUp.has(keyCode);
    }


}