//
//
import UI from './ui';
import Utils from './utils';
import { setInterval } from 'timers';
import * as PIXI from 'pixi.js';

// Performance tracking and debugging infrastructure

function debugLine(name, val) {
    return '<div class="line"><span class="attr">' 
        + Utils.escapeHTML(name)
        + '&nbsp;</span><span class="val">'
        + Utils.escapeHTML(val)
        + '</span></div>';
}

class Debug {

    static init() {
        UI.show('#debug');
        Debug.active = true;
        Debug.frames = 0;
        Debug.ticks = 0;
        Debug.frameStart = 0;
        //Debug.clock = new Date();

        setInterval(Debug.update, 2000);
    }

    static update() {
        const msFrame = Debug.ticks / Debug.frames;
        let out = debugLine("msFrame:", Math.round(msFrame * 10) / 10.0);
        out += debugLine("FPS:", Math.round(PIXI.ticker.shared.FPS));
        UI.html('#debug', out);
        Debug.ticks = 0;
        Debug.frames = 0;
    }

    static startOfFrame() {
        if (Debug.active) {
            Debug.frameStart = Date.now();
        }
    }

    static endOfFrame() {
        if (Debug.active) {
            Debug.ticks += Date.now() - Debug.frameStart;
            Debug.frames++;
        }
    }
}

export default Debug;