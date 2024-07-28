const margin = { top: 20, right: 30, bottom: 40, left: 85 };
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

d3.csv("co2_emissions.csv").then((data) => {
    data.forEach((d) => {
        d.Year = new Date(d.Year);
        d.Emissions = +d.Emissions;
    });

    x.domain(d3.extent(data, (d) => d.Year));
    y.domain([0, d3.max(data, (d) => d.Emissions)]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(
            d3
                .axisBottom(x)
                .ticks(d3.timeYear.every(20))
                .tickFormat(d3.timeFormat("%Y"))
        );

    svg.append("g").call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.Year))
        .attr("width", 10)
        .attr("y", (d) => y(d.Emissions))
        .attr("height", (d) => height - y(d.Emissions))
        .attr("fill", "steelblue");

    svg.append("text")
        .attr("x", x(new Date("1960")))
        .attr("y", y(9386421000))
        .attr("dy", "-0.7em")
        .style("fill", "maroon")
        .text("Increase in Emission");

    svg.append("circle")
        .attr("cx", x(new Date("1960")) + 5)
        .attr("cy", y(9386421000))
        .attr("r", 5)
        .style("fill", "maroon");
});
