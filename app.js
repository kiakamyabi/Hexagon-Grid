/**
 * @class
 * @classdesc Represents a hexagon in a hexagonal grid using cube coordinates.
 *
 * @param {number} q - (x) Represents the horizontal position. 
 * @param {number} r - (y) Represents the diagonal position in the northeast-southwest direction.
 * @param {number} s - (z) Represents the diagonal position in the northwest-southeast direction.
 *
 * @throws {Error} Throws an error if cube coordinates do not sum to zero. (q + r + s = 0).
 */
class HexCubeC{
    constructor(q, r, s){
        this.q = q;
        this.r = r;
        this.s = s;
        if (q + r + s !== 0){
            throw new Error("Invalid Cube Coordinates: q + r + s must equal 0.")

        }
    }
}

/**
 * Six Hex objects representing six possible directions on a hexagon grid with cube coordinates.
 * @type {Array<HexCubeC>}
 */
const possibleHexDirections = [
    new HexCubeC(1, 0, -1),
    new HexCubeC(1, -1, 0),
    new HexCubeC(0, -1, 1),
    new HexCubeC(-1, 0, 1),
    new HexCubeC(-1, 1, 0),
    new HexCubeC(0, 1, -1)
];

/**
 * Checks if two Hex objects cube coordinates (q, r, s) are equal.
 *
 * @function 
 * @param {HexCubeC} hexA The first Hex object.
 * @param {HexCubeC} hexB The second Hex object. 
 * @returns {boolean} True if the two Hex objects have equal cube coordinates (q, r, s), and false otherwise.
 */
function areHexesEqual(hexA, hexB) {
    return hexA.q === hexB.q && hexA.r === hexB.r && hexA.s === hexB.s;
}

/**
 * Adds cube coordinates (q, r, s) of two Hex objects and returns a new Hex object with the results.
 * 
 * @function
 * @param {HexCubeC} hexA The first Hex object.
 * @param {HexCubeC} hexB The second Hex object.
 * @returns {HexCubeC} A new Hex object with cube coordinates equal to the sum of the two input Hex objects' coordinates.
 */
function addHexes(hexA, hexB){
    return new HexCubeC(hexA.q + hexB.q, hexA.r + hexB.r, hexA.s + hexB.s);
}

/**
 * Subtracts cube coordinates (q, r, s) of one Hex object from another and returns a new Hex object with the results.
 * 
 * @function
 * @param {HexCubeC} hexA The Hex object being subtracted from.
 * @param {HexCubeC} hexB The Hex object used as the subtractor.
 * @returns {HexCubeC} A new Hex object with cube coordinates (q, r, s) equal to the subtraction of the
 *  second Hex objects' coordinates from the first Hex objects' coordinates.
 */
function subtractHexes(hexA, hexB){
    return new HexCubeC(hexA.q - hexB.q, hexA.r - hexB.r, hexA.s - hexB.s);
}

/**
 * Multiplies the cube coordinates of a Hex object by a specified multiplier and returns a new Hex object with the results.
 * 
 * @function
 * @param {HexCubeC} hex The Hex object to be multiplied.
 * @param {number} multiplier The multiplier used to multiply the cube coordinates.
 * @returns {HexCubeC} A new Hex object with cube coordinates multiplied by the specified multiplier.
 */
function multiplyHex(hex, multiplier){
    return new HexCubeC(hex.q * multiplier, hex.r * multiplier, hex.s * multiplier)
}

/**
 * Calculates and returns the hexagonal distance of a hexagon from the center (or the origin) of the grid.
 * 
 * @function
 * @param {HexCubeC} hex The Hex object for which to calculate the distance.
 * @returns {number} The distance of the hexagon from the center of the grid.
 */
function hexLength(hex) {
    return Math.floor((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
}

/**
 * Calculates and returns the hexagonal distance between two hexagons (coordinates from two Hex objects) in the grid.
 * 
 * @function
 * @param {HexCubeC} hexA The first Hex object.
 * @param {HexCubeC} hexB The second Hex object.
 * @returns {number} The hexagonal distance between the two hexagons, representing the number of hexagonal steps
 *  needed to move from one hexagon to the other.
 */
function hexDistance(hexA, hexB){
    return hexLength(subtractHexes(hexA, hexB));
}

/**
 * Retrieves cube coordinates representing a specific direction in a hexagonal grid.
 * 
 * @function
 * @param {number} direction An integer representing the direction by indexing object holding possible directions in coordinates
 * (0 to 5) in the hexagonal grid.
 * @returns {HexCubeC} The cube coordinates corresponding to the specified direction.
 * @throws {Error} Throws an error if the provided direction is outside the valid range (0 to 5).
 */
function hexDirection(direction) {
    if (direction < 0 || direction >= 6) {
      throw new Error("Invalid direction. Direction should be in the range of 0 to 5.");
    }
    return possibleHexDirections[direction];
}

/**
 * Calculates and returns the hexagon neighboring a given hexagon in the specified direction.
 * 
 * @function
 * @param {HexCubeC} hex The Hex object from which to find the neighboring hexagon.
 * @param {number} direction An integer representing the direction by indexing object holding possible directions in coordinates
 * (0 to 5) in the hexagonal grid.
 * @returns {HexCubeC} The hexagon neighboring the input hexagon in the specified direction, in the form of a Hex object with cube coordinates.
 */
function hexNeighbour(hex, direction){
    return addHexes(hex, hexDirection(direction))
}

/**
 * @class
 * @classdesc Represents an orientation in a hexagonal grid, defined by six floating-point values and a start angle.
 * 
 * @param {number} f0 Forward matrix element.
 * @param {number} f1 Forward matrix element.
 * @param {number} f2 Forward matrix element.
 * @param {number} f3 Forward matrix element.
 * @param {number} b0 Backward matrix element.
 * @param {number} b1 Backward matrix element.
 * @param {number} b2 Backward matrix element.
 * @param {number} b3 Backward matrix element.
 * @param {number} startAngle Represents the initial rotational angle of the hexagon. It is specified in multiples
 *  of 60 degrees, indicating how the hexagon is initially rotated within the hexagonal grid.
 */
class Orientation {
    constructor(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
      this.f0 = f0;
      this.f1 = f1;
      this.f2 = f2;
      this.f3 = f3;
      this.b0 = b0;
      this.b1 = b1;
      this.b2 = b2;
      this.b3 = b3;
      this.startAngle = startAngle;
    }
}

/**
 * @class
 * @classdesc Defines a point with coordinates (x, y) in a two-dimensional space.
 *
 * @param {number} x The x-coordinate of the point.
 * @param {number} y The y-coordinate of the point.
 */
class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
}

/**
 * @const {Orientation}
 * @description Represents an orientation for a pointy-topped hexagon layout, with specific matrix elements and a start angle.
 */
const pointyLayout = new Orientation(
    Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0,
    Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0,
    0.5
);

/**
 * @const {Orientation}
 * @description Represents an orientation for a flat-topped hexagon layout, with specific matrix elements and a start angle.
 */
const flatLayout = new Orientation(
    3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),
    2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0,
    0.0
);

/**
 * @class
 * @classdesc Defines a layout by aggregating a Orientation object and two Point objects.
 * 
 * @param {Orientation} orientation Orientation object with the orientation of the layout.
 * @param {Point} size Point object with the size of the layout.
 * @param {Point} origin Point object with the origin of the layout.
 */
class Layout {
    constructor(orientation, size, origin) {
        this.orientation = orientation;
        this.size = size;
        this.origin = origin;
    }
}

/**
 * Converts cube coordinates to pixel coordinates.
 *
 * @function
 * @param {Layout} layout Layout object containing orientation (Orientation class), size (Point class), and origin (Point class).
 * @param {HexCubeC} hex Hex object specifying which hexagon's pixel coordinates are being calculated from cube coordinates (q, r, s). 
 * @returns {Point} Point object with the pixel coordinates.
 */
function hexToPixel(layout, hex) {
    const matrix = layout.orientation;
    const x = (matrix.f0 * hex.q + matrix.f1 * hex.r) * layout.size.x;
    const y = (matrix.f2 * hex.q + matrix.f3 * hex.r) * layout.size.y;
    return new Point(x + layout.origin.x, y + layout.origin.y);
}

/**
 * Converts pixel coordinates to cube coordinates.
 *
 * @function
 * @param {Layout} layout Layout object containing orientation (Orientation class), size (Point class), and origin (Point class).
 * @param {Point} point Point object with the pixel coordinates.
 * @returns {HexCubeC} Hex object with cube coordinates, likely resulting in fractional cube coordinates.
 */
function pixelToHex(layout, point) {
    const matrix = layout.orientation;
    const pt = {
        x: (point.x - layout.origin.x) / layout.size.x,
        y: (point.y - layout.origin.y) / layout.size.y
    };
    const q = matrix.b0 * pt.x + matrix.b1 * pt.y;
    const r = matrix.b2 * pt.x + matrix.b3 * pt.y;
    const s = -q - r;
    return new HexCubeC(q, r, s);
}

/**
 * Rounds fractional cube coordinates to the nearest whole cube coordinates.
 * 
 * @function
 * @param {HexCubeC} hex Hex object representing cube coordinates with fractional values.
 * @returns {HexCubeC} Hex object with rounded cube coordinates.
 */
function roundHex(hex) {
    const q = Math.round(hex.q);
    const r = Math.round(hex.r);
    const s = Math.round(hex.s);

    const qDiff = Math.abs(q - hex.q);
    const rDiff = Math.abs(r - hex.r);
    const sDiff = Math.abs(s - hex.s);

    if (qDiff > rDiff && qDiff > sDiff) {
        return new HexCubeC(-r - s, r, s);
    } else if (rDiff > sDiff) {
        return new HexCubeC(q, -q - s, s);
    } else {
        return new HexCubeC(q, r, -q - r);
    }
}

/**
 * Calculates the offset in x and y coordinates, of a hexagon corner based on the layout (size, start angle) and corner index.
 *
 * @function
 * @param {Layout} layout Layout object containing the size and orientation data.
 * @param {number} corner The index (six points) of the corner of a hexagon to calculate the offset.
 * @returns {Point} The coordinates of the corner offset as a Point object.
 */
function hexCornerOffset(layout, corner) {
    if (corner < 0 || corner >= 6) {
        throw new Error("Invalid corner number. Corner should be in the range of 0 to 5 (Indexed, representing six points of a hexagon).");
    }
    const size = layout.size;
    const startAngle = layout.orientation.startAngle;
    const angle = 2.0 * Math.PI * (startAngle + corner) / 6;
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
}

/**
 * Calculates the corner points of a hexagon in pixel coordinates.
 *
 * @param {Layout} layout Layout object containing size, origin and orientation data.
 * @param {HexCubeC} hex Hex object for which to calculate the corners.
 * @returns {Array<Point>} Array of Point objects, containing points of corners in a polygon in pixel coordinates as x & y.
 */
function polygonCorners(layout, hex) {
    const corners = [];
    const center = hexToPixel(layout, hex);

    for (let i = 0; i < 6; i++) {
        const offset = hexCornerOffset(layout, i);
        const corner = new Point(center.x + offset.x, center.y + offset.y);
        corners.push(corner);
    }
    return corners;
}
