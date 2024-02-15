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
const hexFlatLayout = new Orientation(
    Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0,
    Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0,
    0.5
);

/**
 * @const {Orientation}
 * @description Represents an orientation for a flat-topped hexagon layout, with specific matrix elements and a start angle.
 */
const hexPointyLayout = new Orientation(
    3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),
    2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0,
    0.0
);
/**
 * @const {Orientation}
 * @description Represents an orientation for a triangle shaped hexagon layout with the tip pointing left, with specific matrix
 *  elements and a start angle.
 */
const triangleLeft = new Orientation(
    -3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),
    2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0,
    0.0
);
/**
 * @const {Orientation}
 * @description Represents an orientation for a triangle shaped hexagon layout with the tip pointing right, with specific matrix
 *  elements and a start angle.
 */
const triangleRight = new Orientation(
    3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),
    2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0,
    0.0
);
/**
 * @const {Orientation}
 * @description Represents an orientation for a triangle shaped hexagon layout with the tip pointing up, with specific matrix
 *  elements and a start angle.
 */
const triangleUp = new Orientation(
    Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, -3.0 / 2.0,
    Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0,
    0.5
);
/**
 * @const {Orientation}
 * @description Represents an orientation for a triangle shaped hexagon layout with the tip pointing down, with specific matrix
 *  elements and a start angle.
 */
const triangleDown = new Orientation(
    Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0,
    Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0,
    0.5
);

/**
 * @class
 * @classdesc Defines a layout by aggregating a Orientation object and two Point objects.
 * 
 * @param {Orientation} orientation Orientation object with the orientation of the layout.
 * @param {Point} size Point object with the size of the layout. Width & height. x,y.
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
 * @class
 * @classdesc
 * Optional Class representing configuration for SVG styling, including fill color, stroke color, stroke width, and stroke dash style.
 *
 * @param {string | undefined} fillColour The default fill colour.
 * @param {string | undefined} strokeColour The colour of the stroke.
 * @param {string | number | undefined} strokeWidth The width of the stroke.
 * @param {string | number | undefined} strokeDash The dash style of the stroke.
 */
class SvgConfigs {
    constructor(fillColour, strokeColour, strokeWidth, strokeDash) {
        this.fillColour = fillColour;
        this.strokeColour = strokeColour;
        this.strokeWidth = strokeWidth;
        this.strokeDash = strokeDash;
    }
}

/**
 * @class
 * @classdesc
 * Optional Class representing configuration for a default class name, ID name, and an extra class name.
 * 
 * @param {string | undefined} defaultClass Replaces default class of the SVG polygons.
 * @param {string | undefined} defaultId ID prefix to be added to the SVG polygons with an iterator suffix to give each polygon a unique id.
 * @param {string | undefined} extraClass An additional class to be added to the SVG polygons.
 */
class ClassConfigs {
    constructor(defaultClass, defaultId, extraClass) {
        this.defaultClass = defaultClass;
        this.defaultId = defaultId;
        this.extraClass = extraClass
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
    const origin = layout.origin;
    const size = layout.size;
    
    const x = (matrix.f0 * hex.q + matrix.f1 * hex.r) * size.x;
    const y = (matrix.f2 * hex.q + matrix.f3 * hex.r) * size.y;
    return new Point(x + origin.x, y + origin.y);
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
    const origin = layout.origin;
    const size = layout.size;

    const pt = new Point((point.x - origin.x) / size.x, (point.y - origin.y) / size.y)
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
 * Calculates the six corner points of a hexagon in pixel coordinates (x, y) and puts it in an array of Point objects.
 *
 * @param {Layout} layout Layout object containing size, origin and orientation data.
 * @param {HexCubeC} hex Hex object for which to calculate the corners.
 * @returns {Array<Point>} Array of Point objects, containing points of corners in a polygon in pixel coordinates as x, y.
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

/**
 * Generates a hexagon grid with associated information for a given grid size and orientation.
 *
 * @param {number} gridSize The size of the hexagon grid. Determines the range of cube coordinates.
 * @param {Orientation} orientation The orientation of the grid. Should be one of the predefined orientation objects.
 * @returns {Map<string, { coordinates: { q: number, r: number, s: number }, distance: number }>} A map containing hexagon data with cube
 * coordinates, for a triangle shaped hexagon grid.
 */
function generateTriangleGrid(gridSize, orientation){
    const grid = new Map();
    if (orientation === triangleUp || orientation === triangleDown){
        for (let q = -gridSize; q <= gridSize; q++) {
            for (let r = 0; r <= gridSize - q; r++) {
                const hex = new HexCubeC(q, r, -q - r);
                const key = `${hex.q},${hex.r},${hex.s}`;
    
                const distance = hexLength(hex);
    
                const hexInfo = {
                    coordinates: { q: hex.q, r: hex.r, s: hex.s },
                    distance
                };
                grid.set(key, hexInfo);
            }
        }
    }
    else if (orientation === triangleLeft || orientation === triangleRight){
        for (let r = -gridSize; r <= gridSize; r++) {
            for (let q = 0; q <= gridSize - r; q++) {
                const hex = new HexCubeC(q, r, -q - r);
                const key = `${hex.q},${hex.r},${hex.s}`;
    
                const distance = hexLength(hex);
    
                const hexInfo = {
                    coordinates: { q: hex.q, r: hex.r, s: hex.s },
                    distance
                };
                grid.set(key, hexInfo);
            }
        }
    }
    console.log(grid)
    return grid;
}

/**
 * Generates a hexagon map with associated information for a given grid size.
 *
 * @param {number} gridSize The size of the hexagon grid. Determines the range of cube coordinates.
 * @returns {Map<string, { coordinates: { q: number, r: number, s: number }, distance: number }>} A map containing hexagon data with cube
 *  coordinates and distance information.
 */
function generateHexagonGrid(gridSize) {
    const grid = new Map();

    for (let q = -gridSize; q <= gridSize; q++) {
        const rStart = Math.max(-gridSize, -q - gridSize);
        const rEnd = Math.min(gridSize, -q + gridSize);

        for (let r = rStart; r <= rEnd; r++) {
            const hex = new HexCubeC(q, r, -q - r);
            const key = `${hex.q},${hex.r},${hex.s}`;

            const distance = hexLength(hex);

            const hexInfo = {
                coordinates: { q: hex.q, r: hex.r, s: hex.s },
                distance
            };
            grid.set(key, hexInfo);
        }
    }
    return grid;
}

/**
 * Generates an array of corner points for each hexagon in the provided hexMap based on the specified layout.
 *
 * @param {Layout} layout Layout object containing size, origin and orientation data.
 * @param {Map<string, any>} hexMap The map containing hexagon data.
 * @returns {Array<Array<Point>>}  An array of arrays containing hexagon corner points. (Points objects turned into Arrays).
 */
function generateHexCorners(layout, hexMap){
    hexMapArrayed = [...hexMap.values()];
    return hexMapArrayed.map(hex => polygonCorners(layout, hex.coordinates));
}

/**
 * Generates SVG polygons for hexagons and appends them to the specified SVG body.
 *
 * @param {Map<string, string | number>} hexMap The map containing individual hexagon data. Guaranteed to have q, r s coordinates.
 * Can have distance tracked.
 * @param {Array<Array<Point>>} allCorners An array of arrays containing hexagon corner points. (Points objects turned into Arrays).
 * @param {SVGElement} svgOrigin The SVG element to which polygons will be appended. Basically the origin of the grid.
 * 
 * @param {SvgConfigs} [svgConfig] Optional configuration for SVG styling.
 * @property {string | undefined} svgConfig.defaultFill The default fill color.
 * @property {string | undefined} svgConfig.strokeColour The color of the stroke.
 * @property {string | number | undefined} svgConfig.strokeWidth The width of the stroke.
 * @property {string | number | undefined} svgConfig.strokeDash The dash style of the stroke.
 * 
 * @param {ClassConfigs} [classConfig] Optional configuration for adding classes and ID to SVG polygons.
 * @property {string | undefined} [classConfig.defaultClass] Replaces default class of the SVG polygons.
 * @property {string | undefined} [classConfig.defaultId] ID prefix to be added to the SVG polygons with an iterator suffix
 *  to give each polygon a unique id.
 * @property {string | undefined} [classConfig.extraClass] An additional class to be added to the SVG polygons.
 */
function generateHexagonSVGs(hexMap, allCorners, svgOrigin, svgConfig = {}, classConfig = {}){
    let = i = -1;
    hexMap.forEach(hex => {
        i++;
        const corners = allCorners[i];
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const pointsString = corners.map(point => `${point.x},${point.y}`).join(" ");

        polygon.setAttribute("points", pointsString);
        polygon.setAttribute("fill", svgConfig.defaultFill || "white");
        polygon.setAttribute("stroke", svgConfig.strokeColour || "black");
        polygon.setAttribute("stroke-width", svgConfig.strokeWidth || 1);
        polygon.setAttribute("stroke-dasharray", svgConfig.strokeDash || "none");

        polygon.classList.add(classConfig.defaultClass || "hex-cell")

        if(classConfig.defaultId !== undefined){
            polygon.setAttribute("id", `${classConfig.defaultId}-${i + 1}`);  
        }
        if(classConfig.extraClass !== undefined){
            polygon.classList.add(classConfig.extraClass);  
        }

        if(hex.distance !== undefined){
            polygon.classList.add(`distance-${hex.distance}`);  
        }

        svgOrigin.appendChild(polygon);
        
        //Test
        polygon.hexData = hex;
        polygon.addEventListener("click", () => handlePolygonClick(polygon));
    });
}

/**
 * Generates a hexagon grid with associated SVG polygons and appends them to the specified SVG origin.
 *
 * @param {generateHexagonGrid | generateTriangleGrid} gridType A function that generates the hexagon grid based on the grid type and size.
 * @param {number} gridSize The size of the hexagon grid. Determines the range of cube coordinates.
 * @param {SVGElement} svgOrigin The SVG element to which polygons will be appended. Represents the origin of the grid.
 * @param {Layout} layout Layout object containing size, origin and orientation data.
 * @param {SvgConfigs} svgConfig Configuration for SVG styling, including fill color, stroke color, stroke width, and stroke dash style.
 */
function generateHexGridWithSVG(gridType, gridSize, svgOrigin, layout, svgConfig, classConfig){
    hexMap = gridType(gridSize, layout.orientation);
    allCorners = generateHexCorners(layout, hexMap);
    generateHexagonSVGs(hexMap, allCorners, svgOrigin, svgConfig, classConfig)
}

//Test
function handlePolygonClick(polygon){
    const hexData = polygon.hexData;
    console.log(hexData);
    console.log(polygon.classList);
    console.log(polygon.id)
}

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "500");
svg.setAttribute("height", "500");
document.body.appendChild(svg);



generateHexGridWithSVG(generateHexagonGrid, 6, svg, new Layout(hexFlatLayout, new Point(10, 10), new Point(250, 250)));
