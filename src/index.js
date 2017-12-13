import * as PIXI from "pixi.js";
import initRenderer from "./initRenderer";
import preloadResources from "./preloadResources";
//import getTexture from "./getTexture";

// "Global" variables we need to use across multiple functions
let demoStage, ghostSprite;
let hSpeed = 1, vSpeed = 1;

// Define the main game loop
const redraw = (time, renderer) => {

    // Redraw when browser is ready
    requestAnimationFrame(t => redraw(t, renderer));

    // Move the ghost sprite around
    ghostSprite.x += 2.3 * hSpeed;
    ghostSprite.y += 0.8 * vSpeed;

    // Bounce on the view boundaries
    if (ghostSprite.x <= 0 || ghostSprite.x + ghostSprite.width >= renderer.view.width)
        hSpeed *= -1;

    if (ghostSprite.y <= 0 || ghostSprite.y + ghostSprite.height >= renderer.view.height)
        vSpeed *= -1;

    // Render the scene
    renderer.render(demoStage);
};

/**
 *  Set up the game after the window and resources have finished loading.
 *  Creates the renderer, sets up the stages, and performs the initial render.
 */
const setup = () => {

    const renderer = initRenderer();

    // Create a container object called the `stage`
    demoStage = new PIXI.Container();

//    const ghostTex = getTexture("images/ghost.png");
//    ghostSprite = new PIXI.Sprite(ghostTex);
    const ids = PIXI.loader.resources["assets/sprites.json"].textures;
    ghostSprite = new PIXI.Sprite(ids["001"]);

    ghostSprite.position.set(160, 80);

    demoStage.addChild(ghostSprite);

    renderer.plugins.interaction.on('mousedown', (e) => {
        console.log(e.data.global);
        const pt = e.data.global;
        ghostSprite.x = pt.x;
        ghostSprite.y = pt.y;
    });

    // Perform initial render
    redraw(-1, renderer);
};

/* ---------- Initialisation ---------- */

// Wait until the page is fully loaded
window.addEventListener("load", () => {

    // List of resources to load
    const resources = [
        "images/ghost.png",
        "assets/sprites.json"
    ];

    // Then load the images
    preloadResources(resources, () => {

        // Then run the setup() function
        setup();
    });
});
