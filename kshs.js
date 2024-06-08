function analyzeFunction() {
    const expr = document.getElementById('functionInput').value;
    const math = mathjs;

    // Define the function
    const f = math.compile(expr);

    // Find the domain (assuming the domain is all real numbers)
    const domain = '\\mathbb{R}';

    // Derivative of the function
    const derivative = math.derivative(expr, 'x');
    const df = derivative.compile();

    // Solve the derivative equal to 0 for critical points
    const criticalPoints = math.solve(derivative, 'x');

    // Determine increasing/decreasing intervals
    let increasingIntervals = [];
    let decreasingIntervals = [];
    criticalPoints.sort((a, b) => a - b);
    for (let i = 0; i < criticalPoints.length - 1; i++) {
        const midPoint = (criticalPoints[i] + criticalPoints[i + 1]) / 2;
        const slope = df.evaluate({ x: midPoint });
        if (slope > 0) {
            increasingIntervals.push(`[${criticalPoints[i]}, ${criticalPoints[i + 1]}]`);
        } else {
            decreasingIntervals.push(`[${criticalPoints[i]}, ${criticalPoints[i + 1]}]`);
        }
    }

    // Find extrema points
    let extrema = [];
    for (let point of criticalPoints) {
        const value = f.evaluate({ x: point });
        extrema.push({ point, value });
    }

    // Limits at positive and negative infinity
    const limitPositiveInfinity = math.lim(f, 'x', Infinity);
    const limitNegativeInfinity = math.lim(f, 'x', -Infinity);

    // Find intercepts
    const intercepts = {
        x: math.solve(expr, 'x'),
        y: f.evaluate({ x: 0 })
    };

    // Create the output
    let output = `<p><strong>Tập xác định:</strong> \\(${domain}\\)</p>`;
    output += `<p><strong>Đạo hàm:</strong> \\(${derivative}\\)</p>`;
    output += `<p><strong>Nghiệm của đạo hàm (điểm tới hạn):</strong> \\(${criticalPoints.join(', ')}\\)</p>`;
    output += `<p><strong>Hàm số tăng trên các khoảng:</strong> \\(${increasingIntervals.join(', ')}\\)</p>`;
    output += `<p><strong>Hàm số giảm trên các khoảng:</strong> \\(${decreasingIntervals.join(', ')}\\)</p>`;
    output += `<p><strong>Cực trị tại:</strong></p><ul>`;
    for (let ext of extrema) {
        output += `<li>\\(x = ${ext.point}, f(x) = ${ext.value}\\)</li>`;
    }
    output += `</ul>`;
    output += `<p><strong>Giới hạn tại +∞:</strong> \\(${limitPositiveInfinity}\\)</p>`;
    output += `<p><strong>Giới hạn tại -∞:</strong> \\(${limitNegativeInfinity}\\)</p>`;
    output += `<p><strong>Giao điểm với trục tung:</strong> \\((0, ${intercepts.y})\\)</p>`;
    output += `<p><strong>Giao điểm với trục hoành:</strong> \\(x = ${intercepts.x.join(', ')}\\)</p>`;
    document.getElementById('output').innerHTML = output;

    // Render MathJax
    MathJax.typeset();

    // Plot the function
    plotFunction(f, expr);
}

function plotFunction(f, expr) {
    const xValues = math.range(-10, 10, 0.1).toArray();
    const yValues = xValues.map(x => f.evaluate({ x }));

    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter'
    };

    const layout = {
        title: `Đồ thị của hàm số: y = ${expr}`,
        xaxis: { title: 'x' },
        yaxis: { title: 'y' }
    };

    Plotly.newPlot('chart', [trace], layout);
}
