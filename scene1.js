const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

d3.csv("global_temperatures.csv").then((data) => {
    data.forEach((d) => {
        d.Year = new Date(d.Year);
        d.Temperature = +d.Temperature;
    });

    x.domain(d3.extent(data, (d) => d.Year));
    y.domain(d3.extent(data, (d) => d.Temperature));

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 1.5)
        .attr(
            "d",
            d3
                .line()
                .x((d) => x(d.Year))
                .y((d) => y(d.Temperature))
        );

    svg.append("text")
        .attr("x", x(new Date("1960")))
        .attr("y", y(0.13))
        .attr("dy", "-0.7em")
        .style("fill", "red")
        .text("Increase in Temperature");

    svg.append("circle")
        .attr("cx", x(new Date("1960")))
        .attr("cy", y(0.1))
        .attr("r", 5)
        .style("fill", "red");
});
