# Hexagon Grid Generator
Work in progress. <br>
Allows creation of hexagon grids in different shapes and configurations. <br>

## Grid Shapes
- Hexagon Shape. Can be expanded indefinitely and has a cells distance tracked from the centre. <br>
- Triangle Shape. [x] Pointing Down, [x] Pointing Right, [ ] Pointing Left, [ ] Pointing Up

## Quick how to use (with SVG)
With the function
`generateHexGridWithSVG(gridType, gridSize, svgOrigin, layout, svgConfig)`

There is an example in the code, which looks like this

`generateHexGridWithSVG(generateTriangleGrid, 6, svg, new Layout(pointyLayout, new Point(10, 10), new Point(250, 250)))`