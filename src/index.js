import * as PIXI from "pixi.js";
//import initRenderer from "./initRenderer";
//import preloadResources from "./preloadResources";
//import getTexture from "./getTexture";
import Utils from "./utils";
import Resources from "./resources";
import Graphics from "./graphics";
import { Input, Keys } from "./input";
import Debug from "./debugger";
import { TileMap } from "./tilemap";

// "Global" variables we need to use across multiple functions
let demoStage, ghostSprite, starTextures;
let hSpeed = 1, vSpeed = 1;
let tilemap, tilemap2;
let viewRect;

// Define the main game loop
const redraw = (time, renderer) => {

    Debug.startOfFrame();
    // Redraw when browser is ready
    requestAnimationFrame(t => redraw(t, renderer));

    // Move the ghost sprite around
    ghostSprite.x += 2.3 * hSpeed;
    ghostSprite.y += 0.8 * vSpeed;

    // Bounce on the view boundaries
    if (ghostSprite.x <= 0 || ghostSprite.x + ghostSprite.width >= renderer.view.width) {
        hSpeed *= -1;
    }

    if (ghostSprite.y <= 0 || ghostSprite.y + ghostSprite.height >= renderer.view.height) {
        vSpeed *= -1;
    }

    viewRect.x ++;
    viewRect.y += 2;
    demoStage.x --;
    demoStage.y -= 2;
    tilemap.sync(viewRect);

    // Render the scene
    renderer.render(demoStage);

    //console.log(Input.key(Keys.ENTER), Input.keyDown(Keys.ENTER), Input.keyUp(Keys.ENTER));
    Input.onFrameEnd();
    Debug.endOfFrame();
};

/**
 *  Set up the game after the window and resources have finished loading.
 *  Creates the renderer, sets up the stages, and performs the initial render.
 */
const setup = () => {
    Input.init();
    Debug.init();
    
    const renderer = Graphics.init(window.innerWidth, window.innerHeight);
    viewRect = renderer.screen.clone();

    // Create a container object called the `stage`
    demoStage = new PIXI.Container();

    //    const ghostTex = getTexture("images/ghost.png");
    //    ghostSprite = new PIXI.Sprite(ghostTex);
    const ids = PIXI.loader.resources["sprites/battle.json"].textures;
    starTextures = [
        ids["star-010b.png"], ids["star-010c.png"], ids["star-010d.png"], 
        ids["star-011b.png"], ids["star-011c.png"], ids["star-011d.png"]
    ];

    const animIds = Utils.range(0, 30).map(n => {
        return ids[Utils.sprintf("asteroid-big-%03d.png", n)];
    });
    //ghostSprite = new PIXI.Sprite(ids["asteroid-big-001.png"]);
    ghostSprite = new PIXI.extras.AnimatedSprite(animIds, true);
    ghostSprite.gotoAndPlay(0);

    ghostSprite.position.set(160, 80);

    demoStage.addChild(ghostSprite);


    // tilemap = new TileMap(demoStage, 256, (xx, yy, sz) => {
    //     const tile = new PIXI.Graphics();
    //     const fillColor = (xx ^ yy) & 1 ? 0x202080 : 0x3333a0;
    //     tile.beginFill(fillColor);
    //     tile.drawRect(xx * sz, yy * sz, sz, sz);
    //     tile.endFill();
    //     tile.beginFill(0xffffff);
    //     for(let n = 0; n < 5; n++) {
    //         const sx = xx * sz + Math.random() * sz;
    //         const sy = yy * sz + Math.random() * sz;
    //         const r = 3 + Math.random() * 5;
    //         tile.drawCircle(sx, sy, r);
    //     }
    //     tile.endFill();
        
    //     return tile;
    // });
    tilemap = new TileMap(demoStage, 256, (xx, yy, sz) => {
        const tile = new PIXI.Graphics();
        const fillColor = (xx ^ yy) & 1 ? 0x202080 : 0x3333a0;
        tile.beginFill(fillColor);
        //tile.drawRect(xx * sz, yy * sz, sz, sz);
        tile.endFill();
        for(let n = 0; n < 5; n++) {
            const sx = xx * sz + Math.random() * sz;
            const sy = yy * sz + Math.random() * sz;
            const spr = new PIXI.Sprite(Utils.randPick(starTextures));
            spr.position.x = sx;
            spr.position.y = sy;
            tile.addChild(spr);
        }
        
        return tile;
    });

    tilemap.sync(new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight));


    renderer.plugins.interaction.on('mousedown', (e) => {
        console.log(e.data.global);
        const pt = e.data.global;
        ghostSprite.x = pt.x;
        ghostSprite.y = pt.y;
    });

    // Perform initial render
    redraw(-1, renderer);

    window.addEventListener("resize", () => {
        window.setTimeout(() => {
            Graphics.resize(window.innerWidth, window.innerHeight);
        }, 250);
    });

};

/* ---------- Initialisation ---------- */

// Wait until the page is fully loaded
window.addEventListener("load", () => {

    // List of resources to load
    const resources = [
        "images/ghost.png",
        "sprites/battle.json"
    ];

    // Then load the images
    Resources.preload(resources, () => {
        // Then run the setup() function
        setup();
    });
});
