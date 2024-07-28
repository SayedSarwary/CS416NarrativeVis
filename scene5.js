const margin5 = { top: 20, right: 40, bottom: 40, left: 40 };
const width5 = 600 - margin5.left - margin5.right;
const height5 = 400 - margin5.top - margin5.bottom;

const svg5 = d3
    .select("#chart5")
    .append("svg")
    .attr("width", width5 + margin5.left + margin5.right)
    .attr("height", height5 + margin5.top + margin5.bottom)
    .append("g")
    .attr("transform", `translate(${margin5.left},${margin5.top})`);

const x5 = d3.scaleLinear().range([0, width5]);
const y5 = d3.scaleLinear().range([height5, 0]);

d3.csv("extreme_weather_events.csv").then((data) => {
    data.forEach((d) => {
        d.Year = +d.Year;
        d.Events = +d.Events;
    });

    const years = data.map((d) => d.Year);
    x5.domain([d3.min(years), d3.max(years)]);
    y5.domain([0, d3.max(data, (d) => d.Events)]);

    svg5.append("g")
        .attr("transform", `translate(0,${height5})`)
        .call(
            d3
                .axisBottom(x5)
                .ticks(Math.ceil((d3.max(years) - d3.min(years)) / 20))
                .tickFormat(d3.format("d"))
        );

    svg5.append("g").call(d3.axisLeft(y5));

    svg5.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x5(d.Year))
        .attr("width", width5 / data.length)
        .attr("y", (d) => y5(d.Events))
        .attr("height", (d) => height5 - y5(d.Events))
        .attr("fill", "orange")
        .append("title")
        .text((d) => `Year: ${d.Year}\nEvents: ${d.Events}`);

    svg5.append("text")
        .attr("x", x5(1960))
        .attr("y", y5(40))
        .attr("dy", "-0.7em")
        .style("fill", "red")
        .text("Rise of Natural Disasters");

    svg5.append("circle")
        .attr("cx", x5(1960))
        .attr("cy", y5(40))
        .attr("r", 5)
        .style("fill", "red");
});
