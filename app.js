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
class HexAxialC {
    constructor(q, r, s) {
        this.q_ = q;
        this.r_ = r;
        if (q + r + s !== 0) {
            throw new Error("Invalid Cube Coordinates: q + r + s must equal 0.");
        }
    }

    get q() {
        return this.q_;
    }

    get r() {
        return this.r_;
    }

    get s() {
        return -this.q_ - this.r_;
    }
}
const possibleHexDirections = [
    new HexCubeC(1, 0, -1),
    new HexCubeC(1, -1, 0),
    new HexCubeC(0, -1, 1),
    new HexCubeC(-1, 0, 1),
    new HexCubeC(-1, 1, 0),
    new HexCubeC(0, 1, -1)
  ];
//Boolean check for if hexes are equal
function areHexesEqual(hexA, hexB) {
    return hexA.q === hexB.q && hexA.r === hexB.r && hexA.s === hexB.s;
}
//Adds coordinates of two hexagons (cube coords) and returns a new object with the results.
function addHexes(hexA, hexB){
    return new HexCubeC(hexA.q + hexB.q, hexA.r + hexB.r, hexA.s + hexB.s);
}
//Subtracts coordinates of one hexagon from another (cube coords) and returns a new object with the results.
function subtractHexes(hexA, hexB){
    return new HexCubeC(hexA.q - hexB.q, hexA.r - hexB.r, hexA.s - hexB.s);
}
//Multiply coordinates of a hexagon (cube coords) with a multiplier and new object with the results.
function multiplyHex(hex, multiplier){
    return new HexCubeC(hex.q * multiplier, hex.r * multiplier, hex.s * multiplier)
}
//Represents the distance of a hexagon from the center (or the origin) of the grid.
function hexLength(hex) {
    return Math.floor((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
}
//Measures the distance between two hexagons (cube coords)
function hexDistance(hexA, hexB){
    return hexLength(subtractHexes(hexA, hexB));
}
/*hexDirection but can take any input as it gets wrapped to the range, below or above 0-6.
 function hexDirection(direction) {
     const directionWrapped = (6 + (direction % 6)) % 6;
     return possibleHexDirections[directionWrapped];
}*/
//Retrieves a hexagonal direction based on the specified index.
function hexDirection(direction) {
    if (direction < 0 || direction >= 6) {
      throw new Error("Invalid direction. Direction should be in the range of 0 to 5.");
    }
    return possibleHexDirections[direction];
}
//Calculates a neighbor hexagons coords in the specified direction from the given hexagon.
function hexNeighbour(hex, direction){
    return addHexes(hex, hexDirection(direction))
}