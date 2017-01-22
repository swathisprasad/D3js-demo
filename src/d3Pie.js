var width = 560,
height = 300,
radius = Math.min(width, height) / 2;

var tip = d3.tip()
.attr('class', 'd3-tip')
.offset([-9, 1])
.html(function(d) {
	return "<strong>Population</strong>: <span style='color:red'>" + d.data.population + "</span>";
});

d3.json("pieData.json", function(error, data) {

	var pie = d3.layout.pie().value(function(d){return d.population;});

	var svg = d3.select("#piechart").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("id", "tooltip")
	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	svg.call(tip);

//	declare an arc generator function
	var color = d3.scale.ordinal().range(["#b2ebf2", "#e6ee9c", "#c5e1a5", "#ef9a9a", "#b39ddb", "#f48fb1", "#b2dfdb"]);

	var arc = d3.svg.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

	// select paths, use arc generator to draw
	var arcs = svg.selectAll(".arc")
	.data(pie(data))
	.enter()
	.append("g")
	.attr("class", "arc")
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide)
	.on("click", function() {
		console.log("Clicked!");
	});

	arcs.append("path")
	.attr("fill", function(d, i){
		return color(i);
	})
	.attr("d", function (d) {
		// log the result of the arc generator to show how cool it is :)
		console.log(arc(d));
		return arc(d);
	});

	// add the text
	arcs.append("text").attr("transform", function(d){
		d.innerRadius = 0;
		d.outerRadius = radius;
		return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
			return data[i].city;
		});
});