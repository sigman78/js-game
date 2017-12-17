//
//
import * as PIXI from "pixi.js";

class Resources {
    
    // Preload resources, call cb on completion
    static preload(resources, cb, progress=null) {
        PIXI.loader.add(resources);
        if (progress !== null)
            PIXI.loader.on("progress", progress);
        PIXI.loader.load(cb);
    }

    static getTexture(name) {
        const res = PIXI.loader.resources[name];
        if (res === null)
            throw new Error("Unknown texture ${name}");
        return res.texture;
    }

    static getAtlasTexture(name, atlasName) {
        const atlas = PIXI.loader.resources[atlasName];
        if (atlas === null)
            throw new Error("Unknown atlas ${atlasName}");
        const texture = atlas.textures[name];
        if (texture === null)
            throw new Error("Unknown texture ${name} in atlas ${atlasName}");
        return texture;
    }
}

export default Resources;