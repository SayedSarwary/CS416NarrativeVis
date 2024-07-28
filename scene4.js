const margin4 = { top: 20, right: 40, bottom: 40, left: 40 };
const width4 = 600 - margin4.left - margin4.right;
const height4 = 400 - margin4.top - margin4.bottom;

const svg4 = d3
    .select("#chart4")
    .append("svg")
    .attr("width", width4 + margin4.left + margin4.right)
    .attr("height", height4 + margin4.top + margin4.bottom)
    .append("g")
    .attr("transform", `translate(${margin4.left},${margin4.top})`);

const x4 = d3.scaleLinear().range([0, width4]);
const y4 = d3.scaleLinear().range([height4, 0]);

d3.csv("sea_levels.csv").then((data) => {
    data.forEach((d) => {
        d.Year = +d.Year;
        d.SeaLevel = +d.SeaLevel;
    });

    x4.domain(d3.extent(data, (d) => d.Year));
    y4.domain(d3.extent(data, (d) => d.SeaLevel));

    svg4.append("g")
        .attr("transform", `translate(0,${height4})`)
        .call(d3.axisBottom(x4).tickFormat(d3.format("d")));

    svg4.append("g").call(d3.axisLeft(y4));

    svg4.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
            "d",
            d3
                .line()
                .x((d) => x4(d.Year))
                .y((d) => y4(d.SeaLevel))
        );

    svg4.append("text")
        .attr("x", x4(1960))
        .attr("y", y4(-70))
        .attr("dy", "-0.7em")
        .style("fill", "red")
        .text("Rapid Rise of Sea Level ");

    svg4.append("circle")
        .attr("cx", x4(1960))
        .attr("cy", y4(-70))
        .attr("r", 5)
        .style("fill", "red");
});
