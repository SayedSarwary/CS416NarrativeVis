const margin = { top: 20, right: 85, bottom: 40, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleLinear().range([0, width]);
const yTemperature = d3.scaleLinear().range([height, 0]);
const yEmissions = d3.scaleLinear().range([height, 0]);

Promise.all([
    d3.csv("global_temperatures.csv"),
    d3.csv("co2_emissions.csv"),
]).then(([temperatureData, emissionsData]) => {
    temperatureData.forEach((d) => {
        d.Year = +d.Year;
        d.Temperature = +d.Temperature;
    });
    emissionsData.forEach((d) => {
        d.Year = +d.Year;
        d.Emissions = +d.Emissions;
    });

    const combinedData = temperatureData
        .map((d) => ({
            Year: d.Year,
            Temperature: d.Temperature,
            Emissions: emissionsData.find((e) => e.Year === d.Year)?.Emissions,
        }))
        .filter((d) => d.Emissions !== undefined);

    x.domain(d3.extent(combinedData, (d) => d.Year));
    yTemperature.domain(d3.extent(combinedData, (d) => d.Temperature));
    yEmissions.domain(d3.extent(combinedData, (d) => d.Emissions));

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "green")
        .call(d3.axisLeft(yTemperature));

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", `translate(${width},0)`)
        .style("fill", "blue")
        .call(d3.axisRight(yEmissions));

    svg.selectAll(".dot-temperature")
        .data(combinedData)
        .enter()
        .append("circle")
        .attr("class", "dot-temperature")
        .attr("cx", (d) => x(d.Year))
        .attr("cy", (d) => yTemperature(d.Temperature))
        .attr("r", 5)
        .style("fill", "green")
        .style("opacity", 0.7)
        .append("title")
        .text((d) => `Year: ${d.Year}\nTemperature: ${d.Temperature}`);

    svg.selectAll(".dot-emissions")
        .data(combinedData)
        .enter()
        .append("circle")
        .attr("class", "dot-emissions")
        .attr("cx", (d) => x(d.Year))
        .attr("cy", (d) => yEmissions(d.Emissions))
        .attr("r", 5)
        .style("fill", "steelblue")
        .style("opacity", 0.7)
        .append("title")
        .text((d) => `Year: ${d.Year}\nEmissions: ${d.Emissions}`);

    svg.append("text")
        .attr("x", x(1960))
        .attr("y", yTemperature(0.13))
        .attr("dy", "-0.7em")
        .style("fill", "maroon")
        .text("Increase in Temperature");

    svg.append("circle")
        .attr("cx", x(1960))
        .attr("cy", yTemperature(0.1))
        .attr("r", 5)
        .style("fill", "maroon");

    svg.append("text")
        .attr("x", x(1960))
        .attr("y", yEmissions(9386421000))
        .attr("dy", "-0.7em")
        .style("fill", "red")
        .text("Increase in Emissions");

    svg.append("circle")
        .attr("cx", x(1960))
        .attr("cy", yEmissions(9386421000))
        .attr("r", 5)
        .style("fill", "red");
});
