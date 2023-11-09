function main() {
    // use D3 to read in data
    // Parse the Data
    d3.csv("data/primaryCandidates.csv").then( function(data) {
        
        data.forEach(function(row) {
            row.year = +row.year;
            row.daysAfterMidtermsAnnounced = +row.daysAfterMidtermsAnnounced;
        });

        drawScatterplot(data);
    });
}

function drawScatterplot(data) {
    
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const width = window.innerWidth * 0.5;
    const height = window.innerHeight * 0.5;

    // append the svg object to the body of the page
    // document.getElementById("scatterplot") = d3.select("#scatterplot")

    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    console.log(d3.extent(data, function(d) { return d.daysAfterMidtermsAnnounced }));

    // create x scale
    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.daysAfterMidtermsAnnounced }))
        .range([margin.left, width]);
    // add x axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    // create y scale
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.year }))
        .range([ 0, height ]);
    // add Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, 0)`)
        .call(d3.axisLeft(yScale));

    // add circles
    svg.selectAll(".announcedCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr('class', 'announcedCircle')
        .attr("cx", function(row) { return xScale(row.daysAfterMidtermsAnnounced)})
        .attr("cy", function(row) { return yScale(row.year)})
        .attr("r", 10) 
        .style("fill", 'orange')
        .style('opacity', 0.75);
}

main();