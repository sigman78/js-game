//
//

import * as PIXI from "pixi.js";

class Graphics {

    static init(width, height) {
        // PIXI.utils.skipHello();
        this._rwidth = width;
        this._rheight = height;

        const opt = {
            autoResize: false,
            clearBeforeRender: true,
            preserveDrawingBuffer: false,
            antialias: false,
            transparent: false,
            resolution: 1 /* 2 for hidpi */
        };

        const renderer = new PIXI.WebGLRenderer(width, height, opt);

        // Style the renderer
        renderer.view.className = "renderArea";
        
        // Add to the DOM
        document.getElementById("main").appendChild(renderer.view);
        
        this.renderer = renderer;

        return renderer;
    }

    static resize(width, height) {
        this.renderer.resize(width, height);
    }
}

export default Graphics;