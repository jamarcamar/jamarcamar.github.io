// D3.js Visualizations for Personal Website

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Create all visualizations
    createSkillsChart();
    createTimelineChart();
    createAnalyticsChart();
    createNetworkChart();
});

// 1. Skills Proficiency Bar Chart
function createSkillsChart() {
    const container = d3.select("#skills-chart");
    const containerWidth = container.node().getBoundingClientRect().width;
    const margin = {top: 20, right: 30, bottom: 40, left: 100};
    const width = containerWidth - margin.left - margin.right;
    const height = 260 - margin.top - margin.bottom;

    // Clear any existing content
    container.selectAll("*").remove();

    const svg = container
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Sample data - update with your actual data science skills
    const data = [
        {skill: "Python", proficiency: 95},
        {skill: "Machine Learning", proficiency: 90},
        {skill: "SQL", proficiency: 88},
        {skill: "R", proficiency: 85},
        {skill: "TensorFlow", proficiency: 82},
        {skill: "Tableau", proficiency: 87},
        {skill: "Statistics", proficiency: 92},
        {skill: "Deep Learning", proficiency: 80}
    ];

    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.skill))
        .range([0, height])
        .padding(0.1);

    // Add bars
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.skill))
        .attr("width", 0)
        .attr("height", y.bandwidth())
        .attr("fill", (d, i) => d3.interpolateViridis(i / data.length))
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100)
        .attr("width", d => x(d.proficiency));

    // Add value labels
    g.selectAll(".label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(d.proficiency) + 5)
        .attr("y", d => y(d.skill) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .style("fill", "#333")
        .text(d => d.proficiency + "%")
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 100 + 500)
        .style("opacity", 1);

    // Add axes
    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d => d + "%"));
}

// 2. Experience Timeline Chart
function createTimelineChart() {
    const container = d3.select("#timeline-chart");
    const containerWidth = container.node().getBoundingClientRect().width;
    const margin = {top: 20, right: 30, bottom: 40, left: 50};
    const width = containerWidth - margin.left - margin.right;
    const height = 260 - margin.top - margin.bottom;

    container.selectAll("*").remove();

    const svg = container
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Sample timeline data - data science career progression
    const data = [
        {year: 2020, projects: 3, experience: 1},
        {year: 2021, projects: 8, experience: 2},
        {year: 2022, projects: 12, experience: 3},
        {year: 2023, projects: 18, experience: 4},
        {year: 2024, projects: 22, experience: 5},
        {year: 2025, projects: 25, experience: 6}
    ];

    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.projects)])
        .range([height, 0]);

    // Create line generator
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.projects))
        .curve(d3.curveMonotoneX);

    // Add the line
    const path = g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", "#667eea")
        .style("stroke-width", 3)
        .style("fill", "none");

    // Animate the line
    const totalLength = path.node().getTotalLength();
    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);

    // Add dots
    g.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.year))
        .attr("cy", d => y(d.projects))
        .attr("r", 0)
        .style("fill", "#764ba2")
        .transition()
        .duration(500)
        .delay((d, i) => i * 200 + 1000)
        .attr("r", 5);

    // Add axes
    g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    // Add labels
    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#666")
        .text("Data Science Projects");
}

// 3. Project Analytics Pie Chart
function createAnalyticsChart() {
    const container = d3.select("#analytics-chart");
    const containerWidth = container.node().getBoundingClientRect().width;
    const width = containerWidth;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;

    container.selectAll("*").remove();

    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("transform", `translate(${width/2},${height/2})`);

    // Sample project data - data science project categories
    const data = [
        {category: "Predictive Modeling", count: 8, color: "#667eea"},
        {category: "Data Visualization", count: 6, color: "#764ba2"},
        {category: "NLP/Text Analysis", count: 4, color: "#f093fb"},
        {category: "Computer Vision", count: 3, color: "#4facfe"},
        {category: "Time Series Analysis", count: 4, color: "#43e97b"}
    ];

    const pie = d3.pie()
        .sort(null)
        .value(d => d.count);

    const arc = d3.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius);

    const arcs = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    // Add pie slices
    arcs.append("path")
        .attr("d", arc)
        .style("fill", d => d.data.color)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .style("opacity", 1)
        .attrTween("d", function(d) {
            const interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function(t) {
                return arc(interpolate(t));
            };
        });

    // Add labels
    arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "white")
        .style("font-weight", "bold")
        .text(d => d.data.count)
        .style("opacity", 0)
        .transition()
        .duration(500)
        .delay(1500)
        .style("opacity", 1);

    // Add legend
    const legend = svg.append("g")
        .attr("transform", `translate(20, 20)`);

    const legendItems = legend.selectAll(".legend-item")
        .data(data)
        .enter().append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legendItems.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", d => d.color);

    legendItems.append("text")
        .attr("x", 18)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .style("fill", "#333")
        .text(d => d.category);
}

// 4. Interactive Network Graph
function createNetworkChart() {
    const container = d3.select("#network-chart");
    const containerWidth = container.node().getBoundingClientRect().width;
    const width = containerWidth;
    const height = 400;

    container.selectAll("*").remove();

    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Sample network data representing data science technologies and their connections
    const nodes = [
        {id: "Python", group: 1, size: 22},
        {id: "Pandas", group: 1, size: 18},
        {id: "NumPy", group: 1, size: 16},
        {id: "Scikit-learn", group: 2, size: 20},
        {id: "TensorFlow", group: 2, size: 19},
        {id: "PyTorch", group: 2, size: 17},
        {id: "Tableau", group: 3, size: 16},
        {id: "D3.js", group: 3, size: 14},
        {id: "R", group: 4, size: 15},
        {id: "SQL", group: 5, size: 18},
        {id: "Jupyter", group: 1, size: 14},
        {id: "Apache Spark", group: 5, size: 13}
    ];

    const links = [
        {source: "Python", target: "Pandas"},
        {source: "Python", target: "NumPy"},
        {source: "Python", target: "Scikit-learn"},
        {source: "Python", target: "TensorFlow"},
        {source: "Python", target: "PyTorch"},
        {source: "Python", target: "Jupyter"},
        {source: "Pandas", target: "NumPy"},
        {source: "Pandas", target: "Scikit-learn"},
        {source: "Scikit-learn", target: "TensorFlow"},
        {source: "TensorFlow", target: "PyTorch"},
        {source: "Python", target: "Tableau"},
        {source: "Tableau", target: "D3.js"},
        {source: "R", target: "SQL"},
        {source: "Python", target: "SQL"},
        {source: "SQL", target: "Apache Spark"},
        {source: "Apache Spark", target: "Python"}
    ];

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(80))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke", "#999")
        .style("stroke-width", 2);

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", d => d.size)
        .style("fill", d => color(d.group))
        .style("stroke", "#fff")
        .style("stroke-width", 2)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const label = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "node-label")
        .style("font-size", "12px")
        .style("fill", "#333")
        .style("text-anchor", "middle")
        .text(d => d.id);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y + d.size + 15);
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // Add hover effects
    node.on("mouseover", function(event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("r", d.size * 1.2);
    })
    .on("mouseout", function(event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr("r", d.size);
    });
}

// Resize function for responsive charts
function resizeCharts() {
    createSkillsChart();
    createTimelineChart();
    createAnalyticsChart();
    createNetworkChart();
}

// Add resize listener
window.addEventListener('resize', debounce(resizeCharts, 250));

// Debounce function to limit resize calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced Artistic D3.js Visualizations

// Add creative transitions and interactions to existing charts
function enhanceChartsWithArtisticElements() {
    
    // Add breathing animation to chart containers
    document.querySelectorAll('.chart-container').forEach(container => {
        container.style.animation = 'none';
        let scale = 1;
        let growing = true;
        
        setInterval(() => {
            if (growing) {
                scale += 0.002;
                if (scale >= 1.02) growing = false;
            } else {
                scale -= 0.002;
                if (scale <= 0.98) growing = true;
            }
            container.style.transform = `scale(${scale})`;
        }, 50);
    });
    
    // Add interactive glow effects to charts
    const charts = ['#skills-chart', '#timeline-chart', '#analytics-chart', '#network-chart'];
    charts.forEach(chartId => {
        const chart = d3.select(chartId);
        if (chart.node()) {
            chart.style('filter', 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.3))');
            
            chart.on('mouseenter', function() {
                d3.select(this).style('filter', 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.6))');
            });
            
            chart.on('mouseleave', function() {
                d3.select(this).style('filter', 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.3))');
            });
        }
    });
}

// Create artistic particle system for network chart
function addParticleSystemToNetwork() {
    const networkContainer = d3.select("#network-chart");
    if (!networkContainer.node()) return;
    
    const containerRect = networkContainer.node().getBoundingClientRect();
    const width = containerRect.width;
    const height = 400;
    
    // Create particle layer
    const particleLayer = networkContainer.select('svg').append('g').attr('class', 'particle-layer');
    
    // Create particles
    const particles = d3.range(20).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1
    }));
    
    const particleElements = particleLayer.selectAll('.particle')
        .data(particles)
        .enter()
        .append('circle')
        .attr('class', 'particle')
        .attr('r', d => d.radius)
        .attr('fill', (d, i) => d3.interpolateViridis(i / particles.length))
        .attr('opacity', 0.6);
    
    // Animate particles
    function animateParticles() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            p.x = Math.max(0, Math.min(width, p.x));
            p.y = Math.max(0, Math.min(height, p.y));
        });
        
        particleElements
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Add morphing transitions to bar chart
function enhanceSkillsChartWithMorphing() {
    // This will be called after the original chart is created
    setTimeout(() => {
        const bars = d3.selectAll('#skills-chart .bar');
        
        bars.on('click', function(event, d) {
            const bar = d3.select(this);
            const currentWidth = bar.attr('width');
            
            // Morphing animation
            bar.transition()
                .duration(500)
                .attr('width', 0)
                .transition()
                .duration(500)
                .attr('width', currentWidth)
                .attr('fill', d3.interpolateRainbow(Math.random()));
        });
        
        // Add pulsing effect
        bars.style('filter', 'drop-shadow(0 0 5px rgba(102, 126, 234, 0.5))')
            .on('mouseenter', function() {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style('filter', 'drop-shadow(0 0 15px rgba(102, 126, 234, 0.8))')
                    .attr('transform', 'scale(1.05)');
            })
            .on('mouseleave', function() {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style('filter', 'drop-shadow(0 0 5px rgba(102, 126, 234, 0.5))')
                    .attr('transform', 'scale(1)');
            });
    }, 2000);
}

// Add liquid-like animation to timeline chart
function enhanceTimelineWithLiquidEffect() {
    setTimeout(() => {
        const line = d3.select('#timeline-chart .line');
        if (line.node()) {
            // Add liquid drop effect along the line
            const lineLength = line.node().getTotalLength();
            const drops = d3.range(5).map((d, i) => ({
                position: (i / 4) * lineLength,
                offset: 0
            }));
            
            const svg = d3.select('#timeline-chart svg');
            const dropGroup = svg.append('g').attr('class', 'liquid-drops');
            
            const dropElements = dropGroup.selectAll('.drop')
                .data(drops)
                .enter()
                .append('circle')
                .attr('class', 'drop')
                .attr('r', 4)
                .attr('fill', '#4facfe')
                .attr('opacity', 0.8);
            
            function animateDrops() {
                drops.forEach(drop => {
                    drop.offset += 2;
                    if (drop.offset > lineLength) drop.offset = 0;
                });
                
                dropElements.each(function(d) {
                    const point = line.node().getPointAtLength((d.position + d.offset) % lineLength);
                    d3.select(this)
                        .attr('cx', point.x + 50) // Adjust for margins
                        .attr('cy', point.y + 20);
                });
                
                requestAnimationFrame(animateDrops);
            }
            
            animateDrops();
        }
    }, 3000);
}

// Add interactive constellation effect to pie chart
function enhancePieChartWithConstellation() {
    setTimeout(() => {
        const pieContainer = d3.select('#analytics-chart svg');
        if (pieContainer.node()) {
            const width = +pieContainer.attr('width');
            const height = +pieContainer.attr('height');
            
            // Create constellation points
            const stars = d3.range(15).map(() => ({
                x: Math.random() * width,
                y: Math.random() * height,
                brightness: Math.random()
            }));
            
            const starGroup = pieContainer.append('g').attr('class', 'constellation');
            
            // Add stars
            starGroup.selectAll('.star')
                .data(stars)
                .enter()
                .append('circle')
                .attr('class', 'star')
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
                .attr('r', d => d.brightness * 2 + 0.5)
                .attr('fill', '#ffffff')
                .attr('opacity', d => d.brightness * 0.8 + 0.2)
                .style('filter', 'drop-shadow(0 0 3px #ffffff)');
            
            // Add connecting lines
            for (let i = 0; i < stars.length - 1; i++) {
                const distance = Math.sqrt(
                    Math.pow(stars[i].x - stars[i + 1].x, 2) + 
                    Math.pow(stars[i].y - stars[i + 1].y, 2)
                );
                
                if (distance < 100) {
                    starGroup.append('line')
                        .attr('x1', stars[i].x)
                        .attr('y1', stars[i].y)
                        .attr('x2', stars[i + 1].x)
                        .attr('y2', stars[i + 1].y)
                        .attr('stroke', '#667eea')
                        .attr('stroke-width', 0.5)
                        .attr('opacity', 0.3);
                }
            }
            
            // Animate twinkling
            starGroup.selectAll('.star')
                .transition()
                .duration(2000)
                .attr('opacity', function() { return Math.random() * 0.8 + 0.2; })
                .on('end', function repeat() {
                    d3.select(this)
                        .transition()
                        .duration(2000)
                        .attr('opacity', Math.random() * 0.8 + 0.2)
                        .on('end', repeat);
                });
        }
    }, 4000);
}

// Initialize artistic enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Wait for D3 charts to be created first
    setTimeout(() => {
        enhanceChartsWithArtisticElements();
        addParticleSystemToNetwork();
        enhanceSkillsChartWithMorphing();
        enhanceTimelineWithLiquidEffect();
        enhancePieChartWithConstellation();
    }, 5000);
});
