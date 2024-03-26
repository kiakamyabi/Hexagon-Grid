# Hexagon Grid Generator
Work in progress. <br>
Allows creation of hexagon grids in different shapes and configurations. <br>

## Grid Shapes
- Hexagon Shape. Options: Flat top grid, Pointy top grid <br>
- Triangle Shape. Options: Pointing Up, Down, Left or Right. <br>

## Quick how to use (with SVG)
With this function, a hexagon grid will be created at in an SVG element. <br>

gridType = Shape of hexagon grid generated. Currently supports triangle shaped grid and hexagon shaped grid. <br>

gridSize = Size of the grid in number of cells. <br>

svgOrigin = The SVG element which is the location of where the grid will be created. <br>

layout = Layout, a class object which contains the data of the orientation of the grid, the size of the individual hexagons and the
location of the origin of the grid. For hexagon shaped grids the origin is the centre of the grid, for triangle grids it is the middle 
of the flat end, opposite the triangles middle point. <br>

(Optional) svgConfig = SvgConfigs, a class object which contains the data for configuring default SVG attributes. Can change fill colour,
stroke colour, stroke width and stroke dash. <br>

(Optional) classConfig = ClassConfigs, a class object which contains the data for configuring the default SVG class name, and can add an id
to each hexagon cell and/or an additional class.<br>

`generateHexGridWithSVG(gridType, gridSize, svgOrigin, layout, svgConfig, classConfig)` <br>

There is an example in the code, which looks like this <br>
`generateHexGridWithSVG(generateHexagonGrid, 6, svg, new Layout(pointyLayout, new Point(10, 10), new Point(250, 250)))` <br>
This will create a hexagon shaped grid with hexagon cells. <br>

The grid size is 6. This results in 6 rows of hexagon cells around its origin point. <br>

The orientation of the layout is pointyLayout. This results in the hexagon cells pointing upwards. <br>

The size of the layout is 10(x), 10(y). This results in regular shaped hexagon. <br>

The origin of the layout is 250, 250. This results in the origin of the grid being placed right in the middle of the 500, 500 SVG element in this example. <br>