//
//
import { Point, Rectangle } from 'pixi.js';

const MAGICSCALE = 1024;

// Point to discrete key
function keify(point, step) {
    const x = Math.floor(point.x / step);
    const y = Math.floor(point.y / step);
    return y * MAGICSCALE + x;
}

// Non caching version of tilemap layer
// -----------------------------------------
// Maintains a collection of tiles attached to the parent layer
// Tiles defined as square `size` within the parent's space
// update(viewrect):
// 1) transforms a rect to discrete tiles space
// 2) diffs active tiles with the tiles of the new view
// 3) creates a +diff tiles
// 4) destroys -diff tiles
// assumptions:
// - parent layer is in worldspace, independant from the camera
export class TileMap {
    constructor() {

    }

    sync(newView) {

    }
}