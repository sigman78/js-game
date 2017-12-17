//
//
import * as PIXI from "pixi.js";
import Utils from "./utils";
import Resources from "./resources";
import Graphics from "./graphics";
import Vector from "./vector";


export class Game {
    constructor() {
        // init with current viewport size
        this.screenSize = new Vector(window.innerWidth, window.innerHeight);

        // init gfx
        this.renderer = Graphics.init(screenSize.x, screenSize.y);
        this.stage = new PIXI.Container();
        // init render looop
        this.ticker = PIXI.ticker.shared;
        this.ticker.autoStart = false;
        this.ticker.add(this.onRenderFrame, this, UPDATE_PRIORITY.LOW);

        // init event listeners
        renderer.plugins.interaction.on("mousedown", this.onMouseDown);
        window.addEventListener("resize", () => {
            // kicks in after 1/4 sec to prevent nasty reinit
            window.setTimeout(this.onWindowResize, 25);
        });

        // kick the timer on
        this.ticker.start();
    }

    onMouseDown(ev) {
        const pt = ev.data.global;
        console.log(pt);
    }

    onWindowResize() {
        newScreenSize = new Vector(window.innerWidth, window.innerHeight);
        if (!newScreenSize.equal(this.screenSize)) {
            this.screenSize = newScreenSize;
            // update graphics
            Graphics.resize(this.screenSize.x, this.screenSize.y);
            // update camera etc
        }
    }

    onFrameRender(time) {
        onUpdate(time);
        this.renderer.render(this.stage);
    }

    onUpdate(time) {

    }
}