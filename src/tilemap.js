//
//
import { Point, Rectangle } from 'pixi.js';

// const MAGICSCALE = 1024;

// // Point to discrete key
// function toKey(point, step) {
//     const x = Math.floor(point.x / step) + MAGICSCALE / 2;
//     const y = Math.floor(point.y / step) + MAGICSCALE / 2;
//     return y * MAGICSCALE + x;
// }

// function toPoint(key, step) {
//     const x = key % MAGICSCALE;
//     const y = key / MAGICSCALE;
//     return new Point(x * step, y * step);
// }

function makeKey(xx, yy) {
    // return (x + MAGICSCALE / 2) + MAGICSCALE * (y / MAGICSCALE / 2);
    // this should work as well
    return "" + xx + ":" + yy;
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
// - tileMaker signature: function(tileX, tileY) -> DisplayObject
export class TileMap {
    constructor(parent, tileSize, tileMaker, worldRect = null) {
        this.parent = parent;
        this.tileSize = tileSize;
        this.tileMaker = tileMaker;
        this.worldRect = worldRect;
        // containers
        this.view = new Rectangle();

        this.workset = new Map();
        this.worksetPending = new Map();

        // this.becoming = new Set();
        // this.retiring = new Set();
    }

    sync(viewRect) {
        // to tile space
        const newTL = new Point(
            Math.floor(viewRect.x / this.tileSize),
            Math.floor(viewRect.y / this.tileSize)
        );
        const newBR = new Point(
            Math.ceil(viewRect.right / this.tileSize),
            Math.ceil(viewRect.bottom / this.tileSize)
        );

        const newView = new Rectangle(newTL.x, newTL.y, newBR.x - newTL.x, newBR.y - newTL.y);

        if (newView.x != this.view.x || newView.y != this.view.y
            || newView.width != this.view.width
            || newView.height != this.view.height) {

            for(let yy = newView.y; yy < newView.bottom; yy++) {
                for(let xx = newView.x; xx < newView.right; xx++) {
                    const tileKey = makeKey(xx, yy);
                    
                    let tile = this.workset.get(tileKey);
                    // not active
                    if (tile === undefined) {
                        tile = this.tileMaker(xx, yy, this.tileSize);
                        tile.setParent(this.parent);
                    } else {
                        this.workset.delete(tileKey);
                    }
                    // populate pending page
                    this.worksetPending.set(tileKey, tile);
                }
            }

            // now old workset contains left overs and visible in worksetPending
            for(const tile in this.workset.values()) {
                // also this removes from parent
                tile.destroy();
            }
            this.workset.clear();
            // swap worksets
            const tmpSet = this.workset;
            this.workset = this.worksetPending;
            this.worksetPending = tmpSet;
        }
    }
}
