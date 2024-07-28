const margin6 = { top: 20, right: 40, bottom: 40, left: 40 };
const width6 = 600 - margin6.left - margin6.right;
const height6 = 600 - margin6.top - margin6.bottom;

const svg6 = d3
    .select("#chart6")
    .append("svg")
    .attr("width", width6 + margin6.left + margin6.right)
    .attr("height", height6 + margin6.top + margin6.bottom)
    .append("g")
    .attr("transform", `translate(${margin6.left},${margin6.top})`);

svg6.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width6)
    .attr("height", height6)
    .attr("fill", "#f0f0f0");

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 - 40)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "black")
    .text("Summary of the Data");

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "black")
    .text(
        "1. Significant increase in global temperatures over the past century."
    );

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 + 20)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "black")
    .text("2. Corresponding rise in CO2 emissions impacting climate patterns.");

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 + 50)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "black")
    .text(
        "3. Increased frequency of extreme weather events and rising sea levels."
    );

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 + 100)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "red")
    .text("Call to Action:");

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 + 130)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "black")
    .text("1. Reduce carbon footprint by adopting sustainable practices.");

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 + 160)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "black")
    .text("2. Support renewable energy initiatives.");

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 + 190)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "black")
    .text("3. Stay informed and advocate for climate action.");

svg6.append("text")
    .attr("x", width6 / 2)
    .attr("y", height6 / 2 + 220)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "black")
    .text("4. Support policies aimed at reducing greenhouse gas emissions.");
