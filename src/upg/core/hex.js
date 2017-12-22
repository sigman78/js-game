//
//

import Vector2 from './vector2';
import Vector3 from './vector3';

// module namespace
export default /* Coords */ {
    DIR_E = 0,
    
    // Vector2 -> Vector3
    axial2Cube(axial) {
        return new Vector3(axial.x, axial.y - axial.x, -axial.y);
    },

    // Vector3 -> Vector2
    cube2Axial(cube) {
        return new Vector2(cube.x, -cube.z);
    },

    // Vector2 -> Vector3
    oddr2Cube(oddr) {
        const p = oddr.x + (oddr.y + (oddr.y & 1)) / 2;
        return new Vector3(p, oddr.y - p, -oddr.y);
    },

    // Vector3 -> Vector2
    cube2Oddr(cube) {
        const q = -cube.z;
        return new Vector2(cube.x - (q + (q & 1)) / 2, q);
    },

    // Vector2 -> Vecor2
    oddr2Axial(oddr) {
        const p = oddr.x + (oddr.y + (oddr.y &1)) / 2;
        return new Vector2(p, oddr.y);
    },

    // Vector2 -> Vector2
    axial2Oddr(axial) {
        return new Vector2(axial.x - (axial.y + (axial.y & 1)) / 2, axial.y);
    }
};