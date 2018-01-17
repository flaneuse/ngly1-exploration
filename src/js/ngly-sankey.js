var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var formatNumber = d3.format(",.0f"),
    format = function(d) { return formatNumber(d) + " TWh"; },
    color = d3.scaleOrdinal(d3.schemeCategory10);

var sankey = d3.sankey()
    .nodeWidth(15)
    .nodePadding(10)
    .extent([[1, 1], [width - 200, height - 6]])
    .nodeId(function(d) { return d.name});

var link = svg.append("g")
    .attr("class", "links")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-opacity", 0.2)
  .selectAll("path");

var node = svg.append("g")
    .attr("class", "nodes")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
  .selectAll("g");

d3.json("data/test.json", function(error, energy) {
  if (error) throw error;

  console.log(energy)

  // sankey(energy)
  //
  //
  // link = link
  //   .data(energy.links)
  //   .enter().append("path")
  //     .attr("d", d3.sankeyLinkHorizontal())
  //     .attr('opacity', 0.4)
  //     .attr("stroke-width", function(d) { return Math.max(1, d.width); });
  //
  // link.append("title")
  //     .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });
  //
  // node = node
  //   .data(energy.nodes)
  //   .enter().append("g");
  //
  // node.append("rect")
  //     .attr("x", function(d) { return d.x0; })
  //     .attr("y", function(d) { return d.y0; })
  //     .attr("height", function(d) {console.log(d); return d.y1 - d.y0; })
  //     .attr("width", function(d) { if(d.value > 400) {
  //       return 15;
  //     } else {
  //       return d.value*.6;
  //     } })
  //     .attr("fill", function(d) { return color(d.name.replace(/ .*/, "")); })
  //     .attr("stroke", "#000");
  //
  // node.append("text")
  //     .attr("x", function(d) { return d.x0 - 6; })
  //     .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
  //     .attr("dy", "0.35em")
  //     .attr("text-anchor", "end")
  //     .text(function(d) { return d.name; })
  //   .filter(function(d) { return d.x0 < width / 2; })
  //     .attr("x", function(d) { return d.x1 + 6; })
  //     .attr("text-anchor", "start");
  //
  // node.append("title")
  //     .text(function(d) { return d.name + "\n" + format(d.value); });
});

// // -- Determine sizing for plot
//
// // --- Setup margins for svg object
// var margin = {
//   top: 55,
//   right: 40,
//   bottom: 0,
//   left: 160
// }
//
// bufferH = 0; // number of pixels to space between vis and IC/EC nav bar
// maxH = window.innerHeight;
// // Available starting point for the visualization
// maxW = window.innerWidth;
// //
// // // Set max height to be the entire height of the window, minus top/bottom buffer
// var width = maxW - margin.left - margin.right,
//   height = maxH - margin.top - margin.bottom;
//
// var svg = d3.select('body')
// .append('svg')
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g.plot")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// var plot = svg.selectAll('.plot');
//
// var sgraph = d3.sankey()
//     .nodeWidth(15)
//     .nodePadding(10)
//     .extent([[1, 1], [width - 1, height - 6]]);
//
//
//     var link = svg.append("g")
//         .attr("class", "links")
//         .attr("fill", "none")
//         .attr("stroke", "#000")
//         .attr("stroke-opacity", 0.2)
//       .selectAll("path");
//
//     var node = svg.append("g")
//         .attr("class", "nodes")
//         .attr("font-family", "Lato")
//         .attr("font-size", 10)
//       .selectAll("g");
//
//
//
// // !! DATA DEPENDENT SECTION
// // --- Load data, populate vis ---
//
//
// d3.json('/data/energy.json', function(error, graph) {
//     // graph.forEach(function(d) {
//     //   d.n = +d.n;
//     //   d.node_num = +d.node_num;
//     // })
//     console.log(graph)
// console.log()
//     sgraph
//     .nodes(graph.nodes)
//     .links(graph.links);
//
// console.log(sgraph)
//     node = node
//         .data(graph.nodes)
//         .enter().append("g").append("text")
//       .attr("x", function(d) { return d.x0 - 6; })
//       .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "end")
//       .text(function(d) { return d.name; })
//     .filter(function(d) { return d.x0 < width / 2; })
//       .attr("x", function(d) { return d.x1 + 6; })
//       .attr("text-anchor", "start");
//             link = link
//         .data(graph.links)
//         .enter().append("path")
//           .attr("d", d3.sankeyLinkHorizontal())
//           .attr("stroke-width", 10);
// })
