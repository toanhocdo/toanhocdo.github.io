// Hàm xử lý dấu + -, - - và - +
function cleanUpOutput(output) {
    // Tách biểu thức thành các dòng riêng biệt
    let lines = output.split('\n');

    // Duyệt qua từng dòng và áp dụng các thay thế nếu không bắt đầu bằng các từ khóa cần tránh
    lines = lines.map(line => {
        // Kiểm tra nếu dòng bắt đầu với \draw, \patch, hoặc \fill
        if (/^\s*(\\draw|barChart|\\patch|\\fill)/.test(line)) {
            return line; // Giữ nguyên dòng này
        }

        // Áp dụng các thay thế cho các dòng khác
        line = line
            .replace(/=\s*\+\s*/g, ' = ') // Remove "+ " right after "="
            .replace(/\+\s*-/g, '-') // Change "+ -" to "-"
            .replace(/-\s*-/g, '+') // Change "- -" to "+"
            .replace(/-\s*\+/g, '-') // Change "- +" to "-"
            .replace(/\+\s*\+/g, '+') // Change "+ +" to "+"
            .replace(/\{\s*\+\s*/g, '{') // Remove "+" right after "{"
            .replace(/^\+\s*/g, ''); // Remove leading "+"

        return line; // Trả về dòng đã xử lý
    });

    // Ghép các dòng lại với nhau
    return lines.join('\n');
}
function lamdeppmG(expression) {
    expression = expression
        .replace(/\b1([a-zA-Z])/g, '$1') // 1x -> x
        .replace(/\b0[a-zA-Z]\^?\d*/g, '') // 0x, 0x^n -> ''
        .replace(/\+\+/g, '+') // ++ -> +
        .replace(/--/g, '+') // -- -> +
        .replace(/\+-/g, '-') // +- -> -
        .replace(/-\+/g, '-') // -+ -> -
        .replace(/^\+/, ''); // Remove leading +
    
    return expression;
}
function lamdeppm(expression) {
    // Tách biểu thức thành các dòng riêng biệt
    let lines = expression.split('\n');

    // Duyệt qua từng dòng và áp dụng các thay thế nếu không bắt đầu bằng các từ khóa cần tránh
    lines = lines.map(line => {
        // Kiểm tra nếu dòng bắt đầu với \draw, \patch, hoặc \fill
        if (/^\s*(\\draw|barChart|\\patch|\\fill)/.test(line)) {
            return line; // Giữ nguyên dòng này
        }

        // Áp dụng các thay thế cho các dòng khác
        line = line.replace(/\b1([a-zA-Z])/g, '$1'); // 1x, 1m -> x, m
        line = line.replace(/\b0[a-zA-Z]\^?\d*/g, ''); // 0x, 0x^n, 0m -> ''
        line = line.replace(/\+\+/g, '+'); // ++ -> +
        line = line.replace(/--/g, '+'); // -- -> +
        line = line.replace(/\+-/g, '-'); // +- -> -
        line = line.replace(/-\+/g, '-'); // -+ -> -
        line = line.replace(/^\+/, ''); // Xóa dấu + ở đầu biểu thức nếu có

        return line; // Trả về dòng đã xử lý
    });

    // Ghép các dòng lại với nhau
    return lines.join('\n');
}
function tim_toa_do_nguyen_hai_tren_mot() {
    function randomCoefficients() {
        let a, b, c, d;
        do {
            a = Math.floor(Math.random() * 10) - 5; // random từ -5 đến 4
            b = Math.floor(Math.random() * 10) - 5;
            c = Math.floor(Math.random() * 10) - 5;
            d = Math.floor(Math.random() * 10) - 5;
        } while (a * Math.pow(-d, 2) - b * d + c === 0 || d === 0|| a === 0);
        return { a, b, c, d };
    }
 
    function getDivisors(n) {
        const divisors = [];
        for (let i = 1; i <= Math.abs(n); i++) {
            if (n % i === 0) {
                divisors.push(i, -i);
            }
        }
        return divisors;
    }

    function generateUniqueDistractors(correctAnswer, range) {
        const distractors = new Set();
        while (distractors.size < 3) {
            const offset = range[Math.floor(Math.random() * range.length)];
            const distractor = correctAnswer + offset;
            if (distractor !== correctAnswer && !distractors.has(distractor)) {
                distractors.add(distractor);
            }
        }
        return Array.from(distractors);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const coefficients = randomCoefficients();
    const { a, b, c, d } = coefficients;

    const yExpression = `y = \\dfrac{${a}x^2 + ${b}x + ${c}}{x + ${d}}`;
    const ySimplified = `y = ${a}x + ${b - a * d} + \\dfrac{${a * d ** 2 - b * d + c}}{x + ${d}}`;

    const divisor = a * d ** 2 - b * d + c;
    const divisors = getDivisors(divisor);
    const xEquations = divisors.map(divisor => `x + ${d} = ${divisor}`).join(' \\\\&');
    const xValues = divisors.map(divisor => divisor - d);
    const xSolutions = xValues.map(x => `x = ${x}`).join(' \\\\& ');
    const yValues = xValues.map(x => (a * x ** 2 + b * x + c) / (x + d));

    const numberOfPoints = xValues.length;

    // Tạo các đáp án nhiễu ngẫu nhiên
    const range = [-2, -1, 1, 2, 3, 4, 5];    
    const distractors = generateUniqueDistractors(numberOfPoints, range);

    // Chèn đáp án đúng vào mảng các lựa chọn
    const choices = [
        { answer: distractors[0], correct: false },  
        { answer: distractors[1], correct: false },
        { answer: numberOfPoints, correct: true },
        { answer: distractors[2], correct: false }
    ];

    // Hoán vị ngẫu nhiên các lựa chọn
    const shuffledChoices = shuffleArray(choices);

    // Tạo các lựa chọn trong định dạng LaTeX
    const choiceString = shuffledChoices.map(choice => {
        return choice.correct 
            ? `{\\True $${choice.answer}$}` 
            : `{$${choice.answer}$}`;
    }).join('\n');

    let problem = `
\\begin{ex}
Có bao nhiêu điểm thuộc đồ thị hàm số $(C)\\colon ${yExpression}$ mà tọa độ là số nguyên?
\\choice 
${choiceString}
\\loigiai{
Ta có $${ySimplified}$.\\\\
Điểm có tọa độ nguyên khi $x \\in \\mathbb{Z}$ và $x + ${d} \\in \\{ ${divisors.join('; ')} \\}$.\\\\\n $\\Rightarrow \\hoac{&${xEquations}}
\\Leftrightarrow \\hoac{&${xSolutions}}$.\\\\
Từ đó suy ra có $${numberOfPoints}$ điểm có tọa độ là số nguyên thuộc $(C)$.
}
\\end{ex}
`;

    problem = lamdeppm(problem);
    problem = cleanUpOutput(problem);
    problem = problem.replace(/x\s*\+\s*0\s*\+\s*/g, 'x + '); 
    problem = problem.replace(/\s*\+\s*0}{x/g, ' }{x ');   
    return problem;
}
function tim_toa_do_nguyen_mot_tren_mot() {
    function randomCoefficients() {
        let a, b, c, d;
        do {
            a = Math.floor(Math.random() * 1)  + 0; // random từ -5 đến 4
            b = Math.floor(Math.random() * 10) - 5;
            c = Math.floor(Math.random() * 10) - 5;
            d = Math.floor(Math.random() * 10) - 5;
        } while (a * Math.pow(-d, 2) - b * d + c === 0 || d === 0);
        return { a, b, c, d };
    }
 
    function getDivisors(n) {
        const divisors = [];
        for (let i = 1; i <= Math.abs(n); i++) {
            if (n % i === 0) {
                divisors.push(i, -i);
            }
        }
        return divisors;
    }

    function generateUniqueDistractors(correctAnswer, range) {
        const distractors = new Set();
        while (distractors.size < 3) {
            const offset = range[Math.floor(Math.random() * range.length)];
            const distractor = correctAnswer + offset;
            if (distractor !== correctAnswer && !distractors.has(distractor)) {
                distractors.add(distractor);
            }
        }
        return Array.from(distractors);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const coefficients = randomCoefficients();
    const { a, b, c, d } = coefficients;

    const yExpression = `y = \\dfrac{${a}x^2 + ${b}x + ${c}}{x + ${d}}`;
    const ySimplified = `y = ${a}x + ${b - a * d} + \\dfrac{${a * d ** 2 - b * d + c}}{x + ${d}}`;

    const divisor = a * d ** 2 - b * d + c;
    const divisors = getDivisors(divisor);
    const xEquations = divisors.map(divisor => `x + ${d} = ${divisor}`).join(' \\\\&');
    const xValues = divisors.map(divisor => divisor - d);
    const xSolutions = xValues.map(x => `x = ${x}`).join(' \\\\& ');
    const yValues = xValues.map(x => (a * x ** 2 + b * x + c) / (x + d));

    const numberOfPoints = xValues.length;

    // Tạo các đáp án nhiễu ngẫu nhiên
    const range = [-2, -1, 1, 2, 3, 4, 5];    
    const distractors = generateUniqueDistractors(numberOfPoints, range);

    // Chèn đáp án đúng vào mảng các lựa chọn
    const choices = [
        { answer: distractors[0], correct: false },  
        { answer: distractors[1], correct: false },
        { answer: numberOfPoints, correct: true },
        { answer: distractors[2], correct: false }
    ];

    // Hoán vị ngẫu nhiên các lựa chọn
    const shuffledChoices = shuffleArray(choices);

    // Tạo các lựa chọn trong định dạng LaTeX
    const choiceString = shuffledChoices.map(choice => {
        return choice.correct 
            ? `{\\True $${choice.answer}$}` 
            : `{$${choice.answer}$}`;
    }).join('\n');

    let problem = `
\\begin{ex}
Có bao nhiêu điểm thuộc đồ thị hàm số $(C)\\colon ${yExpression}$ mà tọa độ là số nguyên?
\\choice 
${choiceString}
\\loigiai{
Ta có $${ySimplified}$.\\\\
Điểm có tọa độ nguyên khi $x \\in \\mathbb{Z}$ và $x + ${d} \\in \\{ ${divisors.join('; ')} \\}$.\\\\\n $\\Rightarrow \\hoac{&${xEquations}}
\\Leftrightarrow \\hoac{&${xSolutions}}$.\\\\
Từ đó suy ra có $${numberOfPoints}$ điểm có tọa độ là số nguyên thuộc $(C)$.
}
\\end{ex}
`;

    problem = lamdeppm(problem);
    problem = cleanUpOutput(problem);
    problem = problem.replace(/x\s*\+\s*0\s*\+\s*/g, 'x + '); 
    problem = problem.replace(/\s*\+\s*0}{x/g, ' }{x ');   
    return problem;
}
function thongke_tim_deltaQ(e) {
    // Danh sách các loại trái cây
    const fruits = ["cam", "bưởi", "quýt", "xoài", "chuối", "táo","bơ"];
    
    // Chọn một loại trái cây ngẫu nhiên
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    // Tạo các khoảng cân nặng ngẫu nhiên
    const weightRanges = [];
    let startWeight = 200;
    for (let i = 0; i < 5; i++) {
        const endWeight = startWeight + Math.floor(Math.random() * 50) + 30;
        weightRanges.push([startWeight, endWeight]);
        startWeight = endWeight;
    }
    
    // Tạo tần số ngẫu nhiên cho mỗi khoảng từ 5 đến 20 với điều kiện n chia 4 dư 2 hoặc 3
    let frequencies = [];
    let totalFruits = 0;
    while (totalFruits % 4 !== 2 && totalFruits % 4 !== 3) {
        frequencies = [];
        totalFruits = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 16) + 5; // Tạo số ngẫu nhiên từ 5 đến 20
            frequencies.push(frequency);
            totalFruits += frequency;
        }
    }
    
    // Cỡ mẫu
    const n = totalFruits;
    
    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = n / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = weightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }
    
    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * n / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = weightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }
    
    // Khoảng tứ phân vị
    const IQR = Math.round(Q3 - Q1);
    
    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D3H1-3]\n`;
    result += `Bảng sau thống kê cân nặng của $${n}$ quả ${randomFruit} được lựa chọn ngẫu nhiên sau khi thu hoạch ở một nông trường\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline\n`;
    result += `Cân nặng (g) & ${weightRanges.map(range => `[${range[0]};${range[1]})`).join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `Số quả ${randomFruit} & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Hãy tìm khoảng tứ phân vị của mẫu số liệu ghép nhóm trên, kết quả làm tròn đến phần nguyên.\n`;
    result += `\\shortans{$${IQR}$}\n`;
    result += `\\loigiai{Cỡ mẫu $n=${n}$.\\\\\n`;
    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${n}}$ là mẫu số liệu gốc gồm cân nặng của $${n}$ quả ${randomFruit} được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`
    let cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        result += `\\item $x_{${cumulativeFreq - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFreq}} \\in [${weightRanges[i][0]};${weightRanges[i][1]})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\nTứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range[0]};${Q1Range[1]})$.\\\\\n`;

    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range[0]}+\\dfrac{\\dfrac{${n}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range[1]}-${Q1Range[0]})\\approx ${(Q1).toFixed(2)}$$\n`;

    cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        if (cumulativeFreq >= positionQ3) break;
    }

    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range[0]};${Q3Range[1]})$.\\\\\n`;

    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range[0]}+\\dfrac{\\dfrac{3\\cdot${n}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range[1]}-${Q3Range[0]})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${IQR}$.}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_tim_deltaQ_R(e) {
    // Danh sách các loại trái cây
    const fruits = ["cam", "bưởi", "quýt", "xoài", "chuối", "táo", "bơ"];
    
    // Chọn một loại trái cây ngẫu nhiên
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    // Tạo các khoảng cân nặng ngẫu nhiên
    const weightRanges = [];
    let startWeight = 200;
    for (let i = 0; i < 5; i++) {
        const endWeight = startWeight + Math.floor(Math.random() * 50) + 30;
        weightRanges.push([startWeight, endWeight]);
        startWeight = endWeight;
    }
    
    // Tạo tần số ngẫu nhiên cho mỗi khoảng từ 5 đến 20 với điều kiện n chia 4 dư 1
    let frequencies = [];
    let totalFruits = 0;
    while (totalFruits % 4 !== 1) {
        frequencies = [];
        totalFruits = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 16) + 5; // Tạo số ngẫu nhiên từ 5 đến 20
            frequencies.push(frequency);
            totalFruits += frequency;
        }
    }
    
    // Cỡ mẫu
    const n = totalFruits;
    
    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = n / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            if (Math.ceil(positionQ1) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ1) > cumulativeFrequency) {
                // Nếu hai giá trị nằm ở hai nhóm khác nhau, lấy biên của nhóm sau
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = weightRanges[i - 1] || weightRanges[i]; // Nhóm trước hoặc nhóm hiện tại nếu không có nhóm trước
                Q1GroupB = weightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = weightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }
    
    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * n / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            if (Math.ceil(positionQ3) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ3) > cumulativeFrequency) {
                // Nếu hai giá trị nằm ở hai nhóm khác nhau, lấy biên của nhóm sau
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = weightRanges[i - 1] || weightRanges[i]; // Nhóm trước hoặc nhóm hiện tại nếu không có nhóm trước
                Q3GroupB = weightRanges[i];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = weightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }
    
    // Khoảng tứ phân vị
    const IQR = Math.round(Q3 - Q1);
    
    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D3H1-3]\n`;
    result += `Bảng sau thống kê cân nặng của $${n}$ quả ${randomFruit} được lựa chọn ngẫu nhiên sau khi thu hoạch ở một nông trường\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline\n`;
    result += `Cân nặng (g) & ${weightRanges.map(range => `[${range[0]};${range[1]})`).join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `Số quả ${randomFruit} & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Hãy tìm khoảng tứ phân vị của mẫu số liệu ghép nhóm trên, kết quả làm tròn đến phần nguyên.\n`;
    result += `\\shortans{$${IQR}$}\n`;
    result += `\\loigiai{Cỡ mẫu $n=${n}$.\\\\\n`;
    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${n}}$ là mẫu số liệu gốc gồm cân nặng của $${n}$ quả ${randomFruit} được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    let cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        result += `\\item $x_{${cumulativeFreq - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFreq}} \\in [${weightRanges[i][0]};${weightRanges[i][1]})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA[0]};${Q1GroupA[1]})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB[0]};${Q1GroupB[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB[0]}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range[0]};${Q1Range[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range[0]}+\\dfrac{\\dfrac{${n}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range[1]}-${Q1Range[0]})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        if (cumulativeFrequency >= positionQ3) break;
    }

    // Xác định tứ phân vị thứ ba
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}} \\in [${Q3GroupA[0]};${Q3GroupA[1]})$, $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupB[0]};${Q3GroupB[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB[0]}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}, x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range[0]};${Q3Range[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range[0]}+\\dfrac{\\dfrac{3\\cdot${n}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range[1]}-${Q3Range[0]})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${IQR}$.}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_tim_ngoai_lai(e) {
    // Danh sách các loại trái cây
    const fruits = ["cam", "bưởi", "quýt", "xoài", "chuối", "táo", "bơ"];
    
    // Chọn một loại trái cây ngẫu nhiên
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    
    // Tạo các khoảng cân nặng ngẫu nhiên
    const weightRanges = [];
    let startWeight = 200;
    for (let i = 0; i < 5; i++) {
        const endWeight = startWeight + Math.floor(Math.random() * 50) + 30;
        weightRanges.push([startWeight, endWeight]);
        startWeight = endWeight;
    }
    
    // Tạo tần số ngẫu nhiên cho mỗi khoảng từ 5 đến 20 với điều kiện n chia 4 dư 1
    let frequencies = [];
    let totalFruits = 0;
    while (totalFruits % 4 !== 1) {
        frequencies = [];
        totalFruits = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 16) + 5; // Tạo số ngẫu nhiên từ 5 đến 20
            frequencies.push(frequency);
            totalFruits += frequency;
        }
    }
    
    // Cỡ mẫu
    const n = totalFruits;
    
    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = n / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            if (Math.ceil(positionQ1) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ1) > cumulativeFrequency) {
                // Nếu hai giá trị nằm ở hai nhóm khác nhau, lấy biên của nhóm sau
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = weightRanges[i - 1] || weightRanges[i]; // Nhóm trước hoặc nhóm hiện tại nếu không có nhóm trước
                Q1GroupB = weightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = weightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }
    
    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * n / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = weightRanges[i][0];
            const u_m1 = weightRanges[i][1];
            if (Math.ceil(positionQ3) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ3) > cumulativeFrequency) {
                // Nếu hai giá trị nằm ở hai nhóm khác nhau, lấy biên của nhóm sau
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = weightRanges[i - 1] || weightRanges[i]; // Nhóm trước hoặc nhóm hiện tại nếu không có nhóm trước
                Q3GroupB = weightRanges[i];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = weightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }
    
    // Khoảng tứ phân vị
    const IQR = Q3 - Q1;
    
    // Tính các ngưỡng ngoại lai
    const lowerBound = Q1 - 1.5 * IQR;
    const upperBound = Q3 + 1.5 * IQR;

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D3H1-3]\n`;
    result += `Bảng sau thống kê cân nặng của $${n}$ quả ${randomFruit} được lựa chọn ngẫu nhiên sau khi thu hoạch ở một nông trường\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline\n`;
    result += `Cân nặng (g) & ${weightRanges.map(range => `[${range[0]};${range[1]})`).join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `Số quả ${randomFruit} & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Hãy tìm khoảng tứ phân vị và các giá trị ngoại lai của mẫu số liệu ghép nhóm trên, kết quả làm tròn đến phần nguyên.\n`;
    result += `\\shortans{Khoảng tứ phân vị: $${Math.round(IQR)}$, giá trị ngoại lai: $[${Math.round(lowerBound)}, ${Math.round(upperBound)}]$}\n`;
    result += `\\loigiai{Cỡ mẫu $n=${n}$.\\\\\n`;
    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${n}}$ là mẫu số liệu gốc gồm cân nặng của $${n}$ quả ${randomFruit} được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    let cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        result += `\\item $x_{${cumulativeFreq - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFreq}} \\in [${weightRanges[i][0]};${weightRanges[i][1]})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA[0]};${Q1GroupA[1]})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB[0]};${Q1GroupB[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB[0]}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range[0]};${Q1Range[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range[0]}+\\dfrac{\\dfrac{${n}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range[1]}-${Q1Range[0]})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        if (cumulativeFrequency >= positionQ3) break;
    }

    // Xác định tứ phân vị thứ ba
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}} \\in [${Q3GroupA[0]};${Q3GroupA[1]})$, $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupB[0]};${Q3GroupB[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB[0]}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}, x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range[0]};${Q3Range[1]})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range[0]}+\\dfrac{\\dfrac{3\\cdot${n}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range[1]}-${Q3Range[0]})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${Math.round(IQR)}$.\\\\\n`;
    result += `Các giá trị ngoại lai thấp hơn ngưỡng dưới là $<${Math.round(lowerBound)}$ và cao hơn ngưỡng trên là $>${Math.round(upperBound)}$.}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_phuong_sai_do_lech_chuan(e) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 6) + 150;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < 5; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ1) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ1) > cumulativeFrequency) {
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                Q1GroupB = heightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ2) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ2) > cumulativeFrequency) {
                Q2 = u_m;
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ3) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ3) > cumulativeFrequency) {
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                Q3GroupB = heightRanges[i];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính phương sai, độ lệch chuẩn, trung vị, mốt và khoảng biến thiên của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline Chiều cao (cm) & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Số học sinh & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline Chiều cao (cm) & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Số học sinh & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm chiều cao của $${totalStudents}$ học sinh được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định tứ phân vị thứ hai
    if (Q2BoundaryUsed) {
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2) - 1}}}$ và $x_{{${Math.ceil(positionQ2)}}}$ mà $x_{{${Math.ceil(positionQ2) - 1}}} \\in [${Q2GroupA.split(";")[0].replace("[", "")};${Q2GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ2)}}} \\in [${Q2GroupB.split(";")[0].replace("[", "")};${Q2GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_2=${Q2GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2) - 1}}}$ và $x_{{${Math.ceil(positionQ2)}}}$ mà $x_{{${Math.ceil(positionQ2) - 1}}}, x_{{${Math.ceil(positionQ2)}}} \\in [${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    }

    cumulativeFreq = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFreq += frequencies[i];
        if (cumulativeFreq >= positionQ3) break;
    }

    // Xác định tứ phân vị thứ ba
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}, x_{{${Math.ceil(positionQ3)}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${IQR}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_phuong_sai_do_lech_chuanN(e) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 6) + 150;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < 5; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1 && totalStudents % 4 !== 2 && totalStudents % 4 !== 3) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < 5; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (totalStudents % 4 === 1) {
                if (Math.ceil(positionQ1) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
            } else if (totalStudents % 4 === 2 || totalStudents % 4 === 3) {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (totalStudents % 4 === 2) {
                if (Math.ceil(positionQ2) - 1 <= cumulativeFrequency - frequencies[i] && Math.ceil(positionQ2) <= cumulativeFrequency) {
                    Q2 = (u_m + u_m1) / 2;
                } else {
                    Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else if (totalStudents % 4 === 1 || totalStudents % 4 === 3) {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (totalStudents % 4 === 1) {
                if (Math.ceil(positionQ3) - 1 <= cumulativeFrequency - frequencies[i] || Math.ceil(positionQ3) > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
            } else if (totalStudents % 4 === 2 || totalStudents % 4 === 3) {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Kiểm tra và gán giá trị mặc định nếu Q1, Q2, Q3 không được gán giá trị
    Q1 = Q1 !== undefined ? Q1 : 0;
    Q2 = Q2 !== undefined ? Q2 : 0;
    Q3 = Q3 !== undefined ? Q3 : 0;

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline Chiều cao (cm) & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Số học sinh & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c|}\n`;
    result += `\\hline Chiều cao (cm) & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Số học sinh & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm chiều cao của $${totalStudents}$ học sinh được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}$ nằm trong nhóm có khoảng [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")}), $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    if (totalStudents % 4 === 2 && Q2BoundaryUsed) {
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2) - 1}}}$ và $x_{{${Math.ceil(positionQ2)}}}$ mà $x_{{${Math.ceil(positionQ2) - 1}}}$ nằm trong nhóm có khoảng [${Q2GroupA.split(";")[0].replace("[", "")};${Q2GroupA.split(";")[1].replace(")", "")}), $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng [${Q2GroupB.split(";")[0].replace("[", "")};${Q2GroupB.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=\\dfrac{${Q2GroupA.split(";")[1].replace(")", "")}+${Q2GroupB.split(";")[0].replace("[", "")}}{2}\\approx ${(Q2).toFixed(2)}$$\n`;
    } else {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng [${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    }

    // Xác định tứ phân vị thứ ba
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3) - 1}}}$ và $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3) - 1}}}$ nằm trong nhóm có khoảng [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")}), $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")}).\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${IQR}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng và đảm bảo tổng chia hết cho 4
    const frequencies = [];
    let totalStudents = 0;

    // Tạo tần số cho tất cả các nhóm trừ nhóm cuối cùng
    for (let i = 0; i < numRanges - 1; i++) {
        const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
        frequencies.push(frequency);
        totalStudents += frequency;
    }

    // Tính toán tần số cho nhóm cuối cùng sao cho tổng chia hết cho 4
    let lastFrequency = Math.floor(Math.random() * 6) + 6;
    const remainder = (totalStudents + lastFrequency) % 4;

    // Điều chỉnh tần số cuối cùng để đảm bảo tổng chia hết cho 4
    if (remainder !== 0) {
        lastFrequency += (4 - remainder);
    }

    frequencies.push(lastFrequency);
    totalStudents += lastFrequency;

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const parts = range ? range.split(";") : null;
        if (!parts || parts.length < 2) return 0; // Kiểm tra nếu parts không tồn tại hoặc không đủ phần tử
        const lowerBound = parseInt(parts[0].replace("[", ""));
        const upperBound = parseInt(parts[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const parts = heightRanges[i] ? heightRanges[i].split(";") : null;
            if (parts && parts.length >= 2) {
                const u_m = parseInt(parts[0].replace("[", ""));
                const u_m1 = parseInt(parts[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2a = totalStudents / 2;
    const positionQ2b = positionQ2a + 1;
    cumulativeFrequency = 0;
    let Q2RangeA, Q2RangeB, Q2FrequencyA, Q2FrequencyB;
    let Q2PreviousCumulativeA, Q2PreviousCumulativeB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2a && !Q2RangeA) {
            Q2RangeA = heightRanges[i];
            Q2FrequencyA = frequencies[i];
            Q2PreviousCumulativeA = cumulativeFrequency - frequencies[i];
        }
        if (cumulativeFrequency >= positionQ2b && !Q2RangeB) {
            Q2RangeB = heightRanges[i];
            Q2FrequencyB = frequencies[i];
            Q2PreviousCumulativeB = cumulativeFrequency - frequencies[i];
        }
    }

    if (Q2RangeA === Q2RangeB) {
        const parts = Q2RangeA ? Q2RangeA.split(";") : null;
        if (parts && parts.length >= 2) {
            const u_m = parseInt(parts[0].replace("[", ""));
            const u_m1 = parseInt(parts[1].replace(")", ""));
            Q2 = u_m + ((positionQ2a - Q2PreviousCumulativeA) / Q2FrequencyA) * (u_m1 - u_m);
        }
    } else {
        const partsA = Q2RangeA ? Q2RangeA.split(";") : null;
        const partsB = Q2RangeB ? Q2RangeB.split(";") : null;
        if (partsA && partsB && partsA.length >= 2 && partsB.length >= 2) {
            const u_mA = parseInt(partsA[0].replace("[", ""));
            const u_m1A = parseInt(partsA[1].replace(")", ""));
            const u_mB = parseInt(partsB[0].replace("[", ""));
            const u_m1B = parseInt(partsB[1].replace(")", ""));
            const Q2A = u_mA + ((positionQ2a - Q2PreviousCumulativeA) / Q2FrequencyA) * (u_m1A - u_mA);
            const Q2B = u_mB + ((positionQ2b - Q2PreviousCumulativeB) / Q2FrequencyB) * (u_m1B - u_mB);
            Q2 = (Q2A + Q2B) / 2;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const parts = heightRanges[i] ? heightRanges[i].split(";") : null;
            if (parts && parts.length >= 2) {
                const u_m = parseInt(parts[0].replace("[", ""));
                const u_m1 = parseInt(parts[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3) + 1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    let mode = null;
    let modeFormula = '';

    if (modeIndex >= 0) {
        const partsMode = heightRanges[modeIndex] ? heightRanges[modeIndex].split(";") : null;
        if (partsMode && partsMode.length >= 2) {
            const u_m_mode = parseInt(partsMode[0].replace("[", ""));
            const u_m1_mode = parseInt(partsMode[1].replace(")", ""));
            const n_m = frequencies[modeIndex];
            const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
            const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;

            // Tính toán mốt
            mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
            
            // Tạo công thức hiển thị
            modeFormula = `M_0 = ${u_m_mode} + \\dfrac{${n_m} - ${n_m_1}}{(${n_m} - ${n_m_1}) + (${n_m} - ${n_m_1_next})} \\cdot (${u_m1_mode} - ${u_m_mode}) \\approx ${mode.toFixed(2)}`;
        }
    }

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (heightRanges[i]) {
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    if (Q2RangeA === Q2RangeB) {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2a)}}}$ và $x_{{${Math.ceil(positionQ2b)}}}$ mà $x_{{${Math.ceil(positionQ2a)}}}, x_{{${Math.ceil(positionQ2b)}}}$ đều thuộc cùng nhóm $[${Q2RangeA.split(";")[0].replace("[", "")};${Q2RangeA.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là \n`;
        result += `$$Q_2=${Q2RangeA.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulativeA}}{${Q2FrequencyA}} \\cdot(${Q2RangeA.split(";")[1].replace(")", "")}-${Q2RangeA.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    } else {
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2a)}}}$ và $x_{{${Math.ceil(positionQ2b)}}}$ mà $x_{{${Math.ceil(positionQ2a)}}}$ thuộc nhóm $[${Q2RangeA.split(";")[0].replace("[", "")};${Q2RangeA.split(";")[1].replace(")", "")})$ và $x_{{${Math.ceil(positionQ2b)}}}$ thuộc nhóm $[${Q2RangeB.split(";")[0].replace("[", "")};${Q2RangeB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2.toFixed(2)}$$\n`;
    }

    // Xác định tứ phân vị thứ ba (Q3)
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3) + 1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3) + 1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3) + 1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3) + 1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }
 
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    if (mode !== null) {
        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ ${modeFormula} $$\n`;
    }

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}

function thongke_4k_1() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                Q1GroupB = heightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ2) - 1 <= previousCumulative || Math.ceil(positionQ2) > cumulativeFrequency) {
                Q2 = u_m;
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = heightRanges[i] || heightRanges[i+1];
                Q3GroupB = heightRanges[i+1];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }
 
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_2() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 2) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range1, Q2Range2, Q2Frequency1, Q2Frequency2, Q2PreviousCumulative;
    let Q2Value1, Q2Value2;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2Value1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value1 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range1 = heightRanges[i];
            Q2Frequency1 = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
        if (cumulativeFrequency >= positionQ2 + 1 && !Q2Value2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value2 = u_m + ((positionQ2 + 1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range2 = heightRanges[i];
            Q2Frequency2 = frequencies[i];
            break;
        }
    }

    if (Q2Range1 === Q2Range2) {
        Q2 = Q2Value1; // Nếu cả hai giá trị nằm trong cùng một nhóm, sử dụng giá trị tính toán
    } else {
        Q2 = (Q2Value1 + Q2Value2) / 2; // Nếu giá trị nằm trong hai nhóm khác nhau, lấy trung bình của hai giá trị
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)                
    if (Q2Range1 === Q2Range2) {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong nhóm có khoảng $[${Q2Range1.split(";")[0].replace("[", "")};${Q2Range1.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency1}} \\cdot(${Q2Range1.split(";")[1].replace(")", "")}-${Q2Range1.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    } else { 
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong hai nhóm khác nhau.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[1].replace(")", "")}$$\n`;
    }

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_3() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 30) + 120;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 3) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_1_2mauGGG() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 1
    while (totalStudentsA % 4 !== 1 || totalStudentsB % 4 !== 1) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q1BoundaryUsed = false, Q1GroupA, Q1GroupB;
        let Q3BoundaryUsed = false, Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        if (Q1BoundaryUsed) {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
        }

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        if (Q3BoundaryUsed) {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
        }

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau cho Mẫu A và Mẫu B\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}

function thongke_4k_1_2mau() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Hàm giúp tạo tần số sao cho tổng bằng targetSum và mỗi tần số nằm trong [minFreq, maxFreq]
    function generateFrequenciesWithSum(numRanges, minFreq, maxFreq, targetSum) {
        // Khởi tạo tất cả tần số với minFreq
        let frequencies = Array(numRanges).fill(minFreq);
        let remaining = targetSum - numRanges * minFreq;

        // Kiểm tra khả năng phân bổ
        if (remaining < 0 || remaining > numRanges * (maxFreq - minFreq)) {
            return null; // Không thể phân bổ
        }

        while (remaining > 0) {
            // Chọn ngẫu nhiên một chỉ số mà tần số hiện tại chưa đạt maxFreq
            let possibleIndices = [];
            for (let i = 0; i < numRanges; i++) {
                if (frequencies[i] < maxFreq) {
                    possibleIndices.push(i);
                }
            }

            if (possibleIndices.length === 0) {
                break; // Không thể phân bổ thêm
            }

            // Chọn ngẫu nhiên một chỉ số từ các chỉ số khả dụng
            let randomIndex = possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
            frequencies[randomIndex]++;
            remaining--;
        }

        if (remaining === 0) {
            return frequencies;
        } else {
            return null; // Phân bổ không thành công
        }
    }

    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Tìm tần số cho Mẫu A và Mẫu B sao cho tổng tần số bằng nhau và thỏa mãn các điều kiện
    let attempts = 0;
    const maxAttempts = 1000; // Giới hạn số lần thử để tránh vòng lặp vô hạn

    while (attempts < maxAttempts) {
        attempts++;

        // Tạo tần số cho Mẫu A với mỗi tần số từ 6 đến 11
        frequenciesA = [];
        totalStudentsA = 0;
        for (let i = 0; i < numRanges; i++) {
            const freqA = Math.floor(Math.random() * 6) + 6; // 6 đến 11
            frequenciesA.push(freqA);
            totalStudentsA += freqA;
        }

        // Kiểm tra điều kiện tổng tần số (ví dụ: tổng tần số là 4k + 1)
        if (totalStudentsA % 4 !== 1) {
            continue; // Không thỏa mãn, thử lại
        }

        // Kiểm tra xem có thể phân bổ cho Mẫu B hay không
        if (numRanges * 6 > totalStudentsA || numRanges * 11 < totalStudentsA) {
            continue; // Không thể phân bổ, thử lại
        }

        // Tạo tần số cho Mẫu B với tổng bằng tổng của Mẫu A
        frequenciesB = generateFrequenciesWithSum(numRanges, 6, 11, totalStudentsA);

        if (frequenciesB !== null) {
            totalStudentsB = totalStudentsA;
            break; // Thành công
        }
    }

    if (attempts === maxAttempts) {
        throw new Error("Không thể tạo được tần số cho hai mẫu sau nhiều lần thử.");
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q1BoundaryUsed = false, Q1GroupA, Q1GroupB;
        let Q3BoundaryUsed = false, Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && Q1 === undefined) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }

            if (cumulativeFrequency >= positionQ2 && Q2 === undefined) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }

            if (cumulativeFrequency >= positionQ3 && Q3 === undefined) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }

            if (Q1 !== undefined && Q2 !== undefined && Q3 !== undefined) {
                break;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        let tempCumulative = 0;
        for (let i = 0; i < frequencies.length; i++) {
            tempCumulative += frequencies[i];
            result += `\\item $x_{${tempCumulative - frequencies[i] + 1}}$, \\ldots, $x_{${tempCumulative}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        if (Q1BoundaryUsed) {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
        }

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        if (Q3BoundaryUsed) {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
        }

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau cho Mẫu A và Mẫu B\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|${'c|'.repeat(numRanges)}}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}\n\n${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}




function thongke_4k_2_2mauG() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B bằng nhau
    while (totalStudentsA % 4 !== 1 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q1BoundaryUsed = false, Q2BoundaryUsed = false, Q3BoundaryUsed = false;
        let Q1GroupA, Q1GroupB, Q2GroupA, Q2GroupB, Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ2) - 1 <= previousCumulative || Math.ceil(positionQ2) > cumulativeFrequency) {
                    Q2 = u_m;
                    Q2BoundaryUsed = true;
                    Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q2GroupB = heightRanges[i];
                } else {
                    Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3) + 1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\begin{ex}%[2D4H2-2]\n`;
        result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau (${label})\n`;
        result += `\\begin{center}\n`;
        result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
        result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
        result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
        result += `\\hline\n`;
        result += `\\end{tabular}\n`;
        result += `\\end{center}\n`;
        result += `\\loigiai{\n`;
        result += `Ta có bảng sau\n`;
        result += `\\begin{center}\n`;
        result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
        result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
        result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
        result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
        result += `\\hline\n`;
        result += `\\end{tabular}\n`;
        result += `\\end{center}\n`;
        result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        if (Q1BoundaryUsed) {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
        }

        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        if (Q3BoundaryUsed) {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
        }

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        result += `}\n`;
        result += `\\end{ex}`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    return resultA + "\n" + resultB;
}
function thongke_4k_2_2mau() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 2
    while (totalStudentsA % 4 !== 2 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau cho Mẫu A và Mẫu B\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}
function thongke_4k_3_2mau() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 120 đến 150
    const startHeight = Math.floor(Math.random() * 30) + 120;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 3) + 5;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 3
    while (totalStudentsA % 4 !== 3 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau Mẫu A và Mẫu B\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}
function thongke_4k_1_2mau_hinh() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 1
    while (totalStudentsA % 4 !== 1 || totalStudentsB % 4 !== 1) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q1BoundaryUsed = false, Q1GroupA, Q1GroupB;
        let Q3BoundaryUsed = false, Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        if (Q1BoundaryUsed) {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
        }

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        if (Q3BoundaryUsed) {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
        }

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");
    // Tìm giá trị tần số lớn nhất
const maxFrequency = Math.max(Math.max(...frequenciesA), Math.max(...frequenciesB)) + 1;

// Tạo biểu đồ cột
let barChart = `\\begin{center}\n`;
barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
barChart += `\\draw[->] (0,0)--(0,${maxFrequency + 1})node[left]{(\\text{Tần Số})};\n`;
for (let y = 1; y <= maxFrequency; y++) {
    barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
}
barChart += `\\path (5,${maxFrequency + 2}) node {\n`;
barChart += `\\normalsize{\\textbf{Hai Mẫu Số Liệu $A$ và $B$}}\n`;
barChart += `};\n`;

for (let y = 1; y <= maxFrequency; y++) {
    barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2 + 3},${y});\n`;
}
barChart += `\\draw[line cap=round,pattern=north east lines] (${numRanges * 2 + 3},${maxFrequency - 1})--(${numRanges * 2 + 3},${maxFrequency})--(${numRanges * 2 + 2},${maxFrequency})--(${numRanges * 2 + 2},${maxFrequency - 1})--(${numRanges * 2 + 3},${maxFrequency - 1}) node[above right]{\\text{Mẫu $ B $}};\n`;
barChart += `\\draw[line cap=round,pattern=dots] (${numRanges * 2 + 3},${maxFrequency + 1})--(${numRanges * 2 + 3},${maxFrequency + 2})--(${numRanges * 2 + 2},${maxFrequency + 2})--(${numRanges * 2 + 2},${maxFrequency + 1})--(${numRanges * 2 + 3},${maxFrequency + 1}) node[above right]{\\text{Mẫu $ A $}};\n`;

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 1;
    barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequenciesA[i]})--(${x + 1},${frequenciesA[i]})node[midway,above]{$ $}--(${x + 1},0)--cycle;\n`;
    barChart += `\\draw[line cap=round,pattern=north east lines] (${x + 1},0)--(${x + 1},${frequenciesB[i]})--(${x + 2},${frequenciesB[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
}

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 2;
    barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
}

barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
barChart += `\\end{tikzpicture}\n`;
barChart += `\\end{center}\n`;


    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau Mẫu A và Mẫu B\n`;
    // Thêm biểu đồ cột
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n\\loigiai{\n`;
    result += `\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n`;
        
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_2_2mau_hinh() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B bằng nhau
    while (totalStudentsA % 4 !== 1 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q1BoundaryUsed = false, Q2BoundaryUsed = false, Q3BoundaryUsed = false;
        let Q1GroupA, Q1GroupB, Q2GroupA, Q2GroupB, Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ2) - 1 <= previousCumulative || Math.ceil(positionQ2) > cumulativeFrequency) {
                    Q2 = u_m;
                    Q2BoundaryUsed = true;
                    Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q2GroupB = heightRanges[i];
                } else {
                    Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3) + 1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
        // Tìm giá trị tần số lớn nhất
        const maxFrequencyH = Math.max(Math.max(...frequenciesA), Math.max(...frequenciesB)) + 1;

// Tạo biểu đồ cột
let barChart = `\\begin{center}\n`;
barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
barChart += `\\draw[->] (0,0)--(0,${maxFrequencyH + 1})node[left]{(\\text{Tần Số})};\n`;
for (let y = 1; y <= maxFrequencyH; y++) {
    barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
}
barChart += `\\path (5,${maxFrequencyH + 2}) node {\n`;
barChart += `\\normalsize{\\textbf{Hai Mẫu Số Liệu $A$ và $B$}}\n`;
barChart += `};\n`;

for (let y = 1; y <= maxFrequencyH; y++) {
    barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2 + 3},${y});\n`;
}
barChart += `\\draw[line cap=round,pattern=north east lines] (${numRanges * 2 + 3},${maxFrequencyH - 1})--(${numRanges * 2 + 3},${maxFrequencyH})--(${numRanges * 2 + 2},${maxFrequencyH})--(${numRanges * 2 + 2},${maxFrequencyH - 1})--(${numRanges * 2 + 3},${maxFrequencyH - 1}) node[above right]{\\text{Mẫu $ B $}};\n`;
barChart += `\\draw[line cap=round,pattern=dots] (${numRanges * 2 + 3},${maxFrequencyH + 1})--(${numRanges * 2 + 3},${maxFrequencyH + 2})--(${numRanges * 2 + 2},${maxFrequencyH + 2})--(${numRanges * 2 + 2},${maxFrequencyH + 1})--(${numRanges * 2 + 3},${maxFrequencyH + 1}) node[above right]{\\text{Mẫu $ A $}};\n`;

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 1;
    barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequenciesA[i]})--(${x + 1},${frequenciesA[i]})node[midway,above]{$ $}--(${x + 1},0)--cycle;\n`;
    barChart += `\\draw[line cap=round,pattern=north east lines] (${x + 1},0)--(${x + 1},${frequenciesB[i]})--(${x + 2},${frequenciesB[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
}

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 2;
    barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
}

barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
barChart += `\\end{tikzpicture}\n`;
barChart += `\\end{center}\n`;


        let result = `\\begin{ex}%[2D4H2-2]\n`;
        result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau (${label})\n`;
        // Thêm biểu đồ cột
        result += barChart;
        // result += `\\begin{center}\n`;
        // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
        // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
        // result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
        // result += `\\hline\n`;
        // result += `\\end{tabular}\n`;
        // result += `\\end{center}\n`;
        result += `\\loigiai{\n`;
        result += `Ta có bảng sau\n`;
        result += `\\begin{center}\n`;
        result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
        result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
        result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
        result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
        result += `\\hline\n`;
        result += `\\end{tabular}\n`;
        result += `\\end{center}\n`;
        result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        if (Q1BoundaryUsed) {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
        }

        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        if (Q3BoundaryUsed) {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
        }

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        result += `}\n`;
        result += `\\end{ex}`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    return resultA + "\n" + resultB;
}
function thongke_4k_3_2mau_hinh() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 120 đến 150
    const startHeight = Math.floor(Math.random() * 30) + 120;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 3) + 5;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 3
    while (totalStudentsA % 4 !== 3 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");
    // Tìm giá trị tần số lớn nhất
    const maxFrequencyH = Math.max(Math.max(...frequenciesA), Math.max(...frequenciesB)) + 1;
    // Tạo biểu đồ cột
let barChart = `\\begin{center}\n`;
barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
barChart += `\\draw[->] (0,0)--(0,${maxFrequencyH + 1})node[left]{(\\text{Tần Số})};\n`;
for (let y = 1; y <= maxFrequencyH; y++) {
    barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
}
barChart += `\\path (5,${maxFrequencyH + 2}) node {\n`;
barChart += `\\normalsize{\\textbf{Hai Mẫu Số Liệu $A$ và $B$}}\n`;
barChart += `};\n`;

for (let y = 1; y <= maxFrequencyH; y++) {
    barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2 + 3},${y});\n`;
}
barChart += `\\draw[line cap=round,pattern=north east lines] (${numRanges * 2 + 3},${maxFrequencyH - 1})--(${numRanges * 2 + 3},${maxFrequencyH})--(${numRanges * 2 + 2},${maxFrequencyH})--(${numRanges * 2 + 2},${maxFrequencyH - 1})--(${numRanges * 2 + 3},${maxFrequencyH - 1}) node[above right]{\\text{Mẫu $ B $}};\n`;
barChart += `\\draw[line cap=round,pattern=dots] (${numRanges * 2 + 3},${maxFrequencyH + 1})--(${numRanges * 2 + 3},${maxFrequencyH + 2})--(${numRanges * 2 + 2},${maxFrequencyH + 2})--(${numRanges * 2 + 2},${maxFrequencyH + 1})--(${numRanges * 2 + 3},${maxFrequencyH + 1}) node[above right]{\\text{Mẫu $ A $}};\n`;

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 1;
    barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequenciesA[i]})--(${x + 1},${frequenciesA[i]})node[midway,above]{$ $}--(${x + 1},0)--cycle;\n`;
    barChart += `\\draw[line cap=round,pattern=north east lines] (${x + 1},0)--(${x + 1},${frequenciesB[i]})--(${x + 2},${frequenciesB[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
}

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 2;
    barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
}

barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
barChart += `\\end{tikzpicture}\n`;
barChart += `\\end{center}\n`;
    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau Mẫu A và Mẫu B\n`;
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n\\loigiai{\n`;
    result += `\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}
function thongke_4k_1hinh() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 10) + 3; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                Q1GroupB = heightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ2) - 1 <= previousCumulative || Math.ceil(positionQ2) > cumulativeFrequency) {
                Q2 = u_m;
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = heightRanges[i] || heightRanges[i+1];
                Q3GroupB = heightRanges[i+1];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo biểu đồ cột đơn
    let barChart = `\\begin{center}\n`;
    barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
    barChart += `\\draw[->] (0,0)--(0,${maxFrequency + 1})node[left]{(\\text{Tần Số})};\n`;
    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
    }
    barChart += `\\path (5,${maxFrequency + 2}) node {\n`;
    barChart += `\\normalsize{\\textbf{Cho mẫu số liệu như biểu đồ sau}}\n`;
    barChart += `};\n`;

    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2+1},${y});\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 1;
        barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequencies[i]})--(${x + 2},${frequencies[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 2;
        barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
    }

    barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
    barChart += `\\end{tikzpicture}\n`;
    barChart += `\\end{center}\n`;

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }
 
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_2hinh() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 2) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 10) + 3; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range1, Q2Range2, Q2Frequency1, Q2Frequency2, Q2PreviousCumulative;
    let Q2Value1, Q2Value2;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2Value1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value1 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range1 = heightRanges[i];
            Q2Frequency1 = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
        if (cumulativeFrequency >= positionQ2 + 1 && !Q2Value2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value2 = u_m + ((positionQ2 + 1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range2 = heightRanges[i];
            Q2Frequency2 = frequencies[i];
            break;
        }
    }

    if (Q2Range1 === Q2Range2) {
        Q2 = Q2Value1; // Nếu cả hai giá trị nằm trong cùng một nhóm, sử dụng giá trị tính toán
    } else {
        Q2 = (Q2Value1 + Q2Value2) / 2; // Nếu giá trị nằm trong hai nhóm khác nhau, lấy trung bình của hai giá trị
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
    // Tạo biểu đồ cột đơn
    let barChart = `\\begin{center}\n`;
    barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
    barChart += `\\draw[->] (0,0)--(0,${maxFrequency + 1})node[left]{(\\text{Tần Số})};\n`;
    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
    }
    barChart += `\\path (5,${maxFrequency + 2}) node {\n`;
    barChart += `\\normalsize{\\textbf{Cho mẫu số liệu như biểu đồ sau}}\n`;
    barChart += `};\n`;

    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2+1},${y});\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 1;
        barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequencies[i]})--(${x + 2},${frequencies[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 2;
        barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
    }

    barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
    barChart += `\\end{tikzpicture}\n`;
    barChart += `\\end{center}\n`;

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)                
    if (Q2Range1 === Q2Range2) {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong nhóm có khoảng $[${Q2Range1.split(";")[0].replace("[", "")};${Q2Range1.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency1}} \\cdot(${Q2Range1.split(";")[1].replace(")", "")}-${Q2Range1.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    } else { 
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong hai nhóm khác nhau.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[1].replace(")", "")}$$\n`;
    }

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_3hinh() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 30) + 120;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 3) + 5;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 3) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 8) + 3; // Tạo số ngẫu nhiên từ 4 đến 16
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
    // Tạo biểu đồ cột đơn
    let barChart = `\\begin{center}\n`;
    barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
    barChart += `\\draw[->] (0,0)--(0,${maxFrequency + 1})node[left]{(\\text{Tần Số})};\n`;
    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
    }
    barChart += `\\path (5,${maxFrequency + 2}) node {\n`;
    barChart += `\\normalsize{\\textbf{Cho mẫu số liệu như biểu đồ sau}}\n`;
    barChart += `};\n`;

    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2+1},${y});\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 1;
        barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequencies[i]})--(${x + 2},${frequencies[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 2;
        barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
    }

    barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
    barChart += `\\end{tikzpicture}\n`;
    barChart += `\\end{center}\n`;
    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng và đảm bảo tổng chia hết cho 4
    const frequencies = [];
    let totalStudents = 0;

    // Tạo tần số cho tất cả các nhóm trừ nhóm cuối cùng
    for (let i = 0; i < numRanges - 1; i++) {
        const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
        frequencies.push(frequency);
        totalStudents += frequency;
    }

    // Tính toán tần số cho nhóm cuối cùng sao cho tổng chia hết cho 4
    let lastFrequency = Math.floor(Math.random() * 6) + 6;
    const remainder = (totalStudents + lastFrequency) % 4;

    // Điều chỉnh tần số cuối cùng để đảm bảo tổng chia hết cho 4
    if (remainder !== 0) {
        lastFrequency += (4 - remainder);
    }

    frequencies.push(lastFrequency);
    totalStudents += lastFrequency;

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const parts = range ? range.split(";") : null;
        if (!parts || parts.length < 2) return 0; // Kiểm tra nếu parts không tồn tại hoặc không đủ phần tử
        const lowerBound = parseInt(parts[0].replace("[", ""));
        const upperBound = parseInt(parts[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const parts = heightRanges[i] ? heightRanges[i].split(";") : null;
            if (parts && parts.length >= 2) {
                const u_m = parseInt(parts[0].replace("[", ""));
                const u_m1 = parseInt(parts[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2a = totalStudents / 2;
    const positionQ2b = positionQ2a + 1;
    cumulativeFrequency = 0;
    let Q2RangeA, Q2RangeB, Q2FrequencyA, Q2FrequencyB;
    let Q2PreviousCumulativeA, Q2PreviousCumulativeB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2a && !Q2RangeA) {
            Q2RangeA = heightRanges[i];
            Q2FrequencyA = frequencies[i];
            Q2PreviousCumulativeA = cumulativeFrequency - frequencies[i];
        }
        if (cumulativeFrequency >= positionQ2b && !Q2RangeB) {
            Q2RangeB = heightRanges[i];
            Q2FrequencyB = frequencies[i];
            Q2PreviousCumulativeB = cumulativeFrequency - frequencies[i];
        }
    }

    if (Q2RangeA === Q2RangeB) {
        const parts = Q2RangeA ? Q2RangeA.split(";") : null;
        if (parts && parts.length >= 2) {
            const u_m = parseInt(parts[0].replace("[", ""));
            const u_m1 = parseInt(parts[1].replace(")", ""));
            Q2 = u_m + ((positionQ2a - Q2PreviousCumulativeA) / Q2FrequencyA) * (u_m1 - u_m);
        }
    } else {
        const partsA = Q2RangeA ? Q2RangeA.split(";") : null;
        const partsB = Q2RangeB ? Q2RangeB.split(";") : null;
        if (partsA && partsB && partsA.length >= 2 && partsB.length >= 2) {
            const u_mA = parseInt(partsA[0].replace("[", ""));
            const u_m1A = parseInt(partsA[1].replace(")", ""));
            const u_mB = parseInt(partsB[0].replace("[", ""));
            const u_m1B = parseInt(partsB[1].replace(")", ""));
            const Q2A = u_mA + ((positionQ2a - Q2PreviousCumulativeA) / Q2FrequencyA) * (u_m1A - u_mA);
            const Q2B = u_mB + ((positionQ2b - Q2PreviousCumulativeB) / Q2FrequencyB) * (u_m1B - u_mB);
            Q2 = (Q2A + Q2B) / 2;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const parts = heightRanges[i] ? heightRanges[i].split(";") : null;
            if (parts && parts.length >= 2) {
                const u_m = parseInt(parts[0].replace("[", ""));
                const u_m1 = parseInt(parts[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3) + 1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i] || heightRanges[i+1];
                    Q3GroupB = heightRanges[i+1];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    let mode = null;
    let modeFormula = '';

    if (modeIndex >= 0) {
        const partsMode = heightRanges[modeIndex] ? heightRanges[modeIndex].split(";") : null;
        if (partsMode && partsMode.length >= 2) {
            const u_m_mode = parseInt(partsMode[0].replace("[", ""));
            const u_m1_mode = parseInt(partsMode[1].replace(")", ""));
            const n_m = frequencies[modeIndex];
            const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
            const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;

            // Tính toán mốt
            mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
            
            // Tạo công thức hiển thị
            modeFormula = `M_0 = ${u_m_mode} + \\dfrac{${n_m} - ${n_m_1}}{(${n_m} - ${n_m_1}) + (${n_m} - ${n_m_1_next})} \\cdot (${u_m1_mode} - ${u_m_mode}) \\approx ${mode.toFixed(2)}`;
        }
    }

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (heightRanges[i]) {
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    if (Q2RangeA === Q2RangeB) {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2a)}}}$ và $x_{{${Math.ceil(positionQ2b)}}}$ mà $x_{{${Math.ceil(positionQ2a)}}}, x_{{${Math.ceil(positionQ2b)}}}$ đều thuộc cùng nhóm $[${Q2RangeA.split(";")[0].replace("[", "")};${Q2RangeA.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là \n`;
        result += `$$Q_2=${Q2RangeA.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulativeA}}{${Q2FrequencyA}} \\cdot(${Q2RangeA.split(";")[1].replace(")", "")}-${Q2RangeA.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    } else {
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2a)}}}$ và $x_{{${Math.ceil(positionQ2b)}}}$ mà $x_{{${Math.ceil(positionQ2a)}}}$ thuộc nhóm $[${Q2RangeA.split(";")[0].replace("[", "")};${Q2RangeA.split(";")[1].replace(")", "")})$ và $x_{{${Math.ceil(positionQ2b)}}}$ thuộc nhóm $[${Q2RangeB.split(";")[0].replace("[", "")};${Q2RangeB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2.toFixed(2)}$$\n`;
    }

    // Xác định tứ phân vị thứ ba (Q3)
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3) + 1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3) + 1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3) + 1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3) + 1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }
 
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    if (mode !== null) {
        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ ${modeFormula} $$\n`;
    }

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_1_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                Q1GroupB = heightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ2) - 1 <= previousCumulative || Math.ceil(positionQ2) > cumulativeFrequency) {
                Q2 = u_m;
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = heightRanges[i] || heightRanges[i+1];
                Q3GroupB = heightRanges[i+1];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }
 
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_2_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;
    // Tạo các khoảng chiều cao ngẫu nhiên
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 2) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range1, Q2Range2, Q2Frequency1, Q2Frequency2, Q2PreviousCumulative;
    let Q2Value1, Q2Value2;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2Value1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value1 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range1 = heightRanges[i];
            Q2Frequency1 = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
        if (cumulativeFrequency >= positionQ2 + 1 && !Q2Value2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value2 = u_m + ((positionQ2 + 1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range2 = heightRanges[i];
            Q2Frequency2 = frequencies[i];
            break;
        }
    }

    if (Q2Range1 === Q2Range2) {
        Q2 = Q2Value1; // Nếu cả hai giá trị nằm trong cùng một nhóm, sử dụng giá trị tính toán
    } else {
        Q2 = (Q2Value1 + Q2Value2) / 2; // Nếu giá trị nằm trong hai nhóm khác nhau, lấy trung bình của hai giá trị
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)                
    if (Q2Range1 === Q2Range2) {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong nhóm có khoảng $[${Q2Range1.split(";")[0].replace("[", "")};${Q2Range1.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency1}} \\cdot(${Q2Range1.split(";")[1].replace(")", "")}-${Q2Range1.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    } else { 
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong hai nhóm khác nhau.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[1].replace(")", "")}$$\n`;
    }

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_3_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 1) + start;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 1) + ranges;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 3) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}

function thongke_4k_1_2mau_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 1
    while (totalStudentsA % 4 !== 1 || totalStudentsB % 4 !== 1) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q1BoundaryUsed = false, Q1GroupA, Q1GroupB;
        let Q3BoundaryUsed = false, Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        if (Q1BoundaryUsed) {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
        }

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        if (Q3BoundaryUsed) {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
        }

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau cho Mẫu A và Mẫu B\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}
function thongke_4k_2_2mau_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i*step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 2
    while (totalStudentsA % 4 !== 2 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau cho Mẫu A và Mẫu B\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}
function thongke_4k_3_2mau_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 120 đến 150
    const startHeight = Math.floor(Math.random() * 30) + 120;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 3) + 5;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 3
    while (totalStudentsA % 4 !== 3 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau Mẫu A và Mẫu B\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}

function thongke_4k_1hinh_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 1) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 10) + 3; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;
    let Q1BoundaryUsed = false;
    let Q1GroupA, Q1GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                Q1 = u_m;
                Q1BoundaryUsed = true;
                Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                Q1GroupB = heightRanges[i];
            } else {
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;
    let Q2BoundaryUsed = false;
    let Q2GroupA, Q2GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ2) - 1 <= previousCumulative || Math.ceil(positionQ2) > cumulativeFrequency) {
                Q2 = u_m;
                Q2BoundaryUsed = true;
                Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                Q2GroupB = heightRanges[i];
            } else {
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;
    let Q3BoundaryUsed = false;
    let Q3GroupA, Q3GroupB;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                Q3 = u_m;
                Q3BoundaryUsed = true;
                Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                Q3GroupB = heightRanges[i];
            } else {
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            }
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

    // Tạo biểu đồ cột đơn
    let barChart = `\\begin{center}\n`;
    barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
    barChart += `\\draw[->] (0,0)--(0,${maxFrequency + 1})node[left]{(\\text{Tần Số})};\n`;
    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
    }
    barChart += `\\path (5,${maxFrequency + 2}) node {\n`;
    barChart += `\\normalsize{\\textbf{Cho mẫu số liệu như biểu đồ sau}}\n`;
    barChart += `};\n`;

    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2+1},${y});\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 1;
        barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequencies[i]})--(${x + 2},${frequencies[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 2;
        barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
    }

    barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
    barChart += `\\end{tikzpicture}\n`;
    barChart += `\\end{center}\n`;

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    if (Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    if (Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
    }
 
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_2hinh_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;
    // Tạo các khoảng chiều cao ngẫu nhiên
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 2) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 10) + 3; // Tạo số ngẫu nhiên từ 6 đến 11
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range1, Q2Range2, Q2Frequency1, Q2Frequency2, Q2PreviousCumulative;
    let Q2Value1, Q2Value2;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2Value1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value1 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range1 = heightRanges[i];
            Q2Frequency1 = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
        if (cumulativeFrequency >= positionQ2 + 1 && !Q2Value2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2Value2 = u_m + ((positionQ2 + 1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range2 = heightRanges[i];
            Q2Frequency2 = frequencies[i];
            break;
        }
    }

    if (Q2Range1 === Q2Range2) {
        Q2 = Q2Value1; // Nếu cả hai giá trị nằm trong cùng một nhóm, sử dụng giá trị tính toán
    } else {
        Q2 = (Q2Value1 + Q2Value2) / 2; // Nếu giá trị nằm trong hai nhóm khác nhau, lấy trung bình của hai giá trị
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
    // Tạo biểu đồ cột đơn
    let barChart = `\\begin{center}\n`;
    barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
    barChart += `\\draw[->] (0,0)--(0,${maxFrequency + 1})node[left]{(\\text{Tần Số})};\n`;
    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
    }
    barChart += `\\path (5,${maxFrequency + 2}) node {\n`;
    barChart += `\\normalsize{\\textbf{Cho mẫu số liệu như biểu đồ sau}}\n`;
    barChart += `};\n`;

    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2+1},${y});\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 1;
        barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequencies[i]})--(${x + 2},${frequencies[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 2;
        barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
    }

    barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
    barChart += `\\end{tikzpicture}\n`;
    barChart += `\\end{center}\n`;

    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)                
    if (Q2Range1 === Q2Range2) {
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong nhóm có khoảng $[${Q2Range1.split(";")[0].replace("[", "")};${Q2Range1.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency1}} \\cdot(${Q2Range1.split(";")[1].replace(")", "")}-${Q2Range1.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;
    } else { 
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ và $x_{{${Math.ceil(positionQ2) + 1}}}$ nằm trong hai nhóm khác nhau.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range1.split(";")[1].replace(")", "")}$$\n`;
    }

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_3hinh_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 1) + start;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 1) + ranges;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng
    const frequencies = [];
    let totalStudents = 0;
    while (totalStudents % 4 !== 3) {
        frequencies.length = 0;
        totalStudents = 0;
        for (let i = 0; i < numRanges; i++) {
            const frequency = Math.floor(Math.random() * 8) + 3; // Tạo số ngẫu nhiên từ 4 đến 16
            frequencies.push(frequency);
            totalStudents += frequency;
        }
    }

    // Giá trị đại diện
    const representativeValues = heightRanges.map(range => {
        const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
        const upperBound = parseInt(range.split(";")[1].replace(")", ""));
        return (lowerBound + upperBound) / 2;
    });

    // Số trung bình của mẫu số liệu ghép nhóm
    const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;

    // Phương sai của mẫu số liệu ghép nhóm
    const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);

    // Độ lệch chuẩn của mẫu số liệu ghép nhóm
    const standardDeviation = Math.sqrt(variance);

    // Tính toán tứ phân vị thứ nhất (Q1)
    const positionQ1 = totalStudents / 4;
    let cumulativeFrequency = 0;
    let Q1, Q3, Q2;
    let Q1Range, Q1Frequency, Q1PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ1 && !Q1) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q1Range = heightRanges[i];
            Q1Frequency = frequencies[i];
            Q1PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán trung vị (Q2)
    const positionQ2 = totalStudents / 2;
    cumulativeFrequency = 0;
    let Q2Range, Q2Frequency, Q2PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ2 && !Q2) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q2Range = heightRanges[i];
            Q2Frequency = frequencies[i];
            Q2PreviousCumulative = previousCumulative;
        }
    }

    // Tính toán tứ phân vị thứ ba (Q3)
    const positionQ3 = 3 * totalStudents / 4;
    cumulativeFrequency = 0;
    let Q3Range, Q3Frequency, Q3PreviousCumulative;

    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        if (cumulativeFrequency >= positionQ3 && !Q3) {
            const previousCumulative = cumulativeFrequency - frequencies[i];
            const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
            const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
            Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
            Q3Range = heightRanges[i];
            Q3Frequency = frequencies[i];
            Q3PreviousCumulative = previousCumulative;
        }
    }

    // Khoảng tứ phân vị (IQR)
    const IQR = Q3 - Q1;

    // Giá trị ngoại lai
    const lowerOutlierBound = Q1 - 1.5 * IQR;
    const upperOutlierBound = Q3 + 1.5 * IQR;

    // Tính toán mốt (Mode)
    const maxFrequency = Math.max(...frequencies);
    const modeIndex = frequencies.indexOf(maxFrequency);
    const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
    const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
    const n_m = frequencies[modeIndex];
    const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
    const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
    const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
    // Tạo biểu đồ cột đơn
    let barChart = `\\begin{center}\n`;
    barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
    barChart += `\\draw[->] (0,0)--(0,${maxFrequency + 1})node[left]{(\\text{Tần Số})};\n`;
    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
    }
    barChart += `\\path (5,${maxFrequency + 2}) node {\n`;
    barChart += `\\normalsize{\\textbf{Cho mẫu số liệu như biểu đồ sau}}\n`;
    barChart += `};\n`;

    for (let y = 1; y <= maxFrequency; y++) {
        barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2+1},${y});\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 1;
        barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequencies[i]})--(${x + 2},${frequencies[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
    }

    for (let i = 0; i < numRanges; i++) {
        const x = 2 * i + 2;
        barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
    }

    barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
    barChart += `\\end{tikzpicture}\n`;
    barChart += `\\end{center}\n`;
    // Tạo kết quả định dạng tương tự bài giải
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau\n`;
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n`;
    result += `\\loigiai{\n`;
    result += `Ta có bảng sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;
    result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

    result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
    result += `\\begin{itemize}\n`;
    cumulativeFrequency = 0;
    for (let i = 0; i < frequencies.length; i++) {
        cumulativeFrequency += frequencies[i];
        result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
    }
    result = result.trim();
    result += `\n\\end{itemize}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}

function thongke_4k_1_2mau_hinh_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;
    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 1
    while (totalStudentsA % 4 !== 1 || totalStudentsB % 4 !== 1) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q1BoundaryUsed = false, Q1GroupA, Q1GroupB;
        let Q3BoundaryUsed = false, Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3)+1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        if (Q1BoundaryUsed) {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
        }

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        if (Q3BoundaryUsed) {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
        }

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");
    // Tìm giá trị tần số lớn nhất
const maxFrequency = Math.max(Math.max(...frequenciesA), Math.max(...frequenciesB)) + 1;

// Tạo biểu đồ cột
let barChart = `\\begin{center}\n`;
barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
barChart += `\\draw[->] (0,0)--(0,${maxFrequency + 1})node[left]{(\\text{Tần Số})};\n`;
for (let y = 1; y <= maxFrequency; y++) {
    barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
}
barChart += `\\path (5,${maxFrequency + 2}) node {\n`;
barChart += `\\normalsize{\\textbf{Hai Mẫu Số Liệu $A$ và $B$}}\n`;
barChart += `};\n`;

for (let y = 1; y <= maxFrequency; y++) {
    barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2 + 3},${y});\n`;
}
barChart += `\\draw[line cap=round,pattern=north east lines] (${numRanges * 2 + 3},${maxFrequency - 1})--(${numRanges * 2 + 3},${maxFrequency})--(${numRanges * 2 + 2},${maxFrequency})--(${numRanges * 2 + 2},${maxFrequency - 1})--(${numRanges * 2 + 3},${maxFrequency - 1}) node[above right]{\\text{Mẫu $ B $}};\n`;
barChart += `\\draw[line cap=round,pattern=dots] (${numRanges * 2 + 3},${maxFrequency + 1})--(${numRanges * 2 + 3},${maxFrequency + 2})--(${numRanges * 2 + 2},${maxFrequency + 2})--(${numRanges * 2 + 2},${maxFrequency + 1})--(${numRanges * 2 + 3},${maxFrequency + 1}) node[above right]{\\text{Mẫu $ A $}};\n`;

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 1;
    barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequenciesA[i]})--(${x + 1},${frequenciesA[i]})node[midway,above]{$ $}--(${x + 1},0)--cycle;\n`;
    barChart += `\\draw[line cap=round,pattern=north east lines] (${x + 1},0)--(${x + 1},${frequenciesB[i]})--(${x + 2},${frequenciesB[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
}

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 2;
    barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
}

barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
barChart += `\\end{tikzpicture}\n`;
barChart += `\\end{center}\n`;


    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau Mẫu A và Mẫu B\n`;
    // Thêm biểu đồ cột
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n\\loigiai{\n`;
    result += `\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n`;
        
    result += `\\end{ex}`;

    return result;
}
function thongke_4k_2_2mau_hinh_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 1) + start;
    const numRanges = Math.floor(Math.random() * 1) + ranges;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B bằng nhau
    while (totalStudentsA % 4 !== 1 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 6) + 6; // Tạo số ngẫu nhiên từ 6 đến 11 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q1BoundaryUsed = false, Q2BoundaryUsed = false, Q3BoundaryUsed = false;
        let Q1GroupA, Q1GroupB, Q2GroupA, Q2GroupB, Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ1) - 1 <= previousCumulative || Math.ceil(positionQ1) > cumulativeFrequency) {
                    Q1 = u_m;
                    Q1BoundaryUsed = true;
                    Q1GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q1GroupB = heightRanges[i];
                } else {
                    Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ2) - 1 <= previousCumulative || Math.ceil(positionQ2) > cumulativeFrequency) {
                    Q2 = u_m;
                    Q2BoundaryUsed = true;
                    Q2GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q2GroupB = heightRanges[i];
                } else {
                    Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                if (Math.ceil(positionQ3) <= previousCumulative || Math.ceil(positionQ3) + 1 > cumulativeFrequency) {
                    Q3 = u_m;
                    Q3BoundaryUsed = true;
                    Q3GroupA = heightRanges[i - 1] || heightRanges[i];
                    Q3GroupB = heightRanges[i];
                } else {
                    Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                }
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
        // Tìm giá trị tần số lớn nhất
        const maxFrequencyH = Math.max(Math.max(...frequenciesA), Math.max(...frequenciesB)) + 1;

// Tạo biểu đồ cột
let barChart = `\\begin{center}\n`;
barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
barChart += `\\draw[->] (0,0)--(0,${maxFrequencyH + 1})node[left]{(\\text{Tần Số})};\n`;
for (let y = 1; y <= maxFrequencyH; y++) {
    barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
}
barChart += `\\path (5,${maxFrequencyH + 2}) node {\n`;
barChart += `\\normalsize{\\textbf{Hai Mẫu Số Liệu $A$ và $B$}}\n`;
barChart += `};\n`;

for (let y = 1; y <= maxFrequencyH; y++) {
    barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2 + 3},${y});\n`;
}
barChart += `\\draw[line cap=round,pattern=north east lines] (${numRanges * 2 + 3},${maxFrequencyH - 1})--(${numRanges * 2 + 3},${maxFrequencyH})--(${numRanges * 2 + 2},${maxFrequencyH})--(${numRanges * 2 + 2},${maxFrequencyH - 1})--(${numRanges * 2 + 3},${maxFrequencyH - 1}) node[above right]{\\text{Mẫu $ B $}};\n`;
barChart += `\\draw[line cap=round,pattern=dots] (${numRanges * 2 + 3},${maxFrequencyH + 1})--(${numRanges * 2 + 3},${maxFrequencyH + 2})--(${numRanges * 2 + 2},${maxFrequencyH + 2})--(${numRanges * 2 + 2},${maxFrequencyH + 1})--(${numRanges * 2 + 3},${maxFrequencyH + 1}) node[above right]{\\text{Mẫu $ A $}};\n`;

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 1;
    barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequenciesA[i]})--(${x + 1},${frequenciesA[i]})node[midway,above]{$ $}--(${x + 1},0)--cycle;\n`;
    barChart += `\\draw[line cap=round,pattern=north east lines] (${x + 1},0)--(${x + 1},${frequenciesB[i]})--(${x + 2},${frequenciesB[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
}

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 2;
    barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
}

barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
barChart += `\\end{tikzpicture}\n`;
barChart += `\\end{center}\n`;


        let result = `\\begin{ex}%[2D4H2-2]\n`;
        result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau (${label})\n`;
        // Thêm biểu đồ cột
        result += barChart;
        // result += `\\begin{center}\n`;
        // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
        // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
        // result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
        // result += `\\hline\n`;
        // result += `\\end{tabular}\n`;
        // result += `\\end{center}\n`;
        result += `\\loigiai{\n`;
        result += `Ta có bảng sau\n`;
        result += `\\begin{center}\n`;
        result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
        result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
        result += `\\hline Giá trị đại diện & ${representativeValues.map(val => val.toFixed(1)).join(' & ')} \\\\\n`;
        result += `\\hline Tần Số & ${frequencies.join(' & ')} \\\\\n`;
        result += `\\hline\n`;
        result += `\\end{tabular}\n`;
        result += `\\end{center}\n`;
        result += `Ta có cỡ mẫu $ n=${totalStudents} $.\\\\\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)} $$. \n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        if (Q1BoundaryUsed) {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}} \\in [${Q1GroupA.split(";")[0].replace("[", "")};${Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ1)}}} \\in [${Q1GroupB.split(";")[0].replace("[", "")};${Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_1=${Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ1) - 1}}}$ và $x_{{${Math.ceil(positionQ1)}}}$ mà $x_{{${Math.ceil(positionQ1) - 1}}}, x_{{${Math.ceil(positionQ1)}}} \\in [${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;
        }

        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        if (Q3BoundaryUsed) {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ và $x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}} \\in [${Q3GroupA.split(";")[0].replace("[", "")};${Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3GroupB.split(";")[0].replace("[", "")};${Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
            result += `$$Q_3=${Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
        } else {
            result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(positionQ3)}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}}$ mà $x_{{${Math.ceil(positionQ3)}}}, x_{{${Math.ceil(positionQ3)+1}}} \\in [${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
            result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
            result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;
        }

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        result += `}\n`;
        result += `\\end{ex}`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");

    return resultA + "\n" + resultB;
}
function thongke_4k_3_2mau_hinh_tuchon(start,ranges,step) {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 120 đến 150
    const startHeight = Math.floor(Math.random() * 1) + start;
    // Xác định số lượng khoảng ngẫu nhiên từ 5, 6 hoặc 7
    const numRanges = Math.floor(Math.random() * 1) + ranges;

    // Tạo các khoảng chiều cao ngẫu nhiên
    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * step;
        const rangeEnd = rangeStart + step;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    // Tạo số học sinh ngẫu nhiên trong mỗi khoảng cho Mẫu A và Mẫu B
    let frequenciesA = [];
    let frequenciesB = [];
    let totalStudentsA = 0;
    let totalStudentsB = 0;

    // Đảm bảo tổng tần số của Mẫu A và Mẫu B là 4k + 3
    while (totalStudentsA % 4 !== 3 || totalStudentsA !== totalStudentsB) {
        frequenciesA.length = 0;
        frequenciesB.length = 0;
        totalStudentsA = 0;
        totalStudentsB = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16 cho Mẫu A
            const frequencyB = Math.floor(Math.random() * 12) + 4; // Tạo số ngẫu nhiên từ 4 đến 16 cho Mẫu B
            frequenciesA.push(frequencyA);
            frequenciesB.push(frequencyB);
            totalStudentsA += frequencyA;
            totalStudentsB += frequencyB;
        }
    }

    // Hàm tính toán thống kê cho một mẫu cụ thể
    function calculateStatistics(frequencies, totalStudents, label) {
        const representativeValues = heightRanges.map(range => {
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

        const positionQ1 = totalStudents / 4;
        const positionQ2 = totalStudents / 2;
        const positionQ3 = 3 * totalStudents / 4;
        let cumulativeFrequency = 0;

        let Q1, Q2, Q3;
        let Q1Range, Q1Frequency, Q1PreviousCumulative;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ1 && !Q1) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q1 = u_m + ((positionQ1 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q1Range = heightRanges[i];
                Q1Frequency = frequencies[i];
                Q1PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q2 = u_m + ((positionQ2 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q2Range = heightRanges[i];
                Q2Frequency = frequencies[i];
                Q2PreviousCumulative = previousCumulative;
            }
        }

        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const u_m = parseInt(heightRanges[i].split(";")[0].replace("[", ""));
                const u_m1 = parseInt(heightRanges[i].split(";")[1].replace(")", ""));
                Q3 = u_m + ((positionQ3 - previousCumulative) / frequencies[i]) * (u_m1 - u_m);
                Q3Range = heightRanges[i];
                Q3Frequency = frequencies[i];
                Q3PreviousCumulative = previousCumulative;
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const u_m_mode = parseInt(heightRanges[modeIndex].split(";")[0].replace("[", ""));
        const u_m1_mode = parseInt(heightRanges[modeIndex].split(";")[1].replace(")", ""));
        const n_m = frequencies[modeIndex];
        const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
        const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
        const mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);

        let result = `\\textbf{${label}}: \\newline\n`;
        result += `Số trung bình của mẫu số liệu ghép nhóm là\n`;
        result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${(mean).toFixed(2)}. $$\n`;
        result += `Phương sai của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${(variance).toFixed(2)}.  $$\n`;
        result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là\n`;
        result += `$$ S\\approx\\sqrt{${(variance).toFixed(2)}}\\approx ${(standardDeviation).toFixed(2)}. $$\n`;

        result += `Gọi $x_1$; $x_2$; \\ldots; $x_{${totalStudents}}$ là mẫu số liệu gốc gồm $${totalStudents}$ giá trị được xếp theo thứ tự không giảm. Ta có \n`;
        result += `\\begin{itemize}\n`;
        cumulativeFrequency = 0;
        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            result += `\\item $x_{${cumulativeFrequency - frequencies[i] + 1}}$, \\ldots, $x_{${cumulativeFrequency}} \\in [${heightRanges[i].split(";")[0].replace("[", "")};${heightRanges[i].split(";")[1].replace(")", "")})$; \n`;
        }
        result = result.trim();
        result += `\n\\end{itemize}\n`;

        // Xác định tứ phân vị thứ nhất (Q1)
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ1)}}}$ nằm trong nhóm có khoảng $[${Q1Range.split(";")[0].replace("[", "")};${Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${(Q1).toFixed(2)}$$\n`;

        // Xác định trung vị (Q2)
        result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${(Q2).toFixed(2)}$$\n`;

        // Xác định tứ phân vị thứ ba (Q3)
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${(Q3).toFixed(2)}$$\n`;

        result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${(Q3).toFixed(2)}-${(Q1).toFixed(2)}\\approx ${(IQR).toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
        result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

        result += `Mốt của mẫu số liệu ghép nhóm là \n`;
        result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${(mode).toFixed(2)}$$\n`;

        return result;
    }

    // Kết quả cho Mẫu A
    const resultA = calculateStatistics(frequenciesA, totalStudentsA, "Mẫu A");

    // Kết quả cho Mẫu B
    const resultB = calculateStatistics(frequenciesB, totalStudentsB, "Mẫu B");
    // Tìm giá trị tần số lớn nhất
    const maxFrequencyH = Math.max(Math.max(...frequenciesA), Math.max(...frequenciesB)) + 1;
    // Tạo biểu đồ cột
let barChart = `\\begin{center}\n`;
barChart += `\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,font=\\footnotesize,scale=0.85,line width=1pt]\n`;
barChart += `\\draw[->] (0,0)--(0,${maxFrequencyH + 1})node[left]{(\\text{Tần Số})};\n`;
for (let y = 1; y <= maxFrequencyH; y++) {
    barChart += `\\draw[shift={(0,${y})}] (0,0)--(-2pt,0) node[left]{\\scriptsize $${y}$};\n`;
}
barChart += `\\path (5,${maxFrequencyH + 2}) node {\n`;
barChart += `\\normalsize{\\textbf{Hai Mẫu Số Liệu $A$ và $B$}}\n`;
barChart += `};\n`;

for (let y = 1; y <= maxFrequencyH; y++) {
    barChart += `\\draw[dashed,thin,line width=0.01pt] (0,${y})--(${numRanges * 2 + 3},${y});\n`;
}
barChart += `\\draw[line cap=round,pattern=north east lines] (${numRanges * 2 + 3},${maxFrequencyH - 1})--(${numRanges * 2 + 3},${maxFrequencyH})--(${numRanges * 2 + 2},${maxFrequencyH})--(${numRanges * 2 + 2},${maxFrequencyH - 1})--(${numRanges * 2 + 3},${maxFrequencyH - 1}) node[above right]{\\text{Mẫu $ B $}};\n`;
barChart += `\\draw[line cap=round,pattern=dots] (${numRanges * 2 + 3},${maxFrequencyH + 1})--(${numRanges * 2 + 3},${maxFrequencyH + 2})--(${numRanges * 2 + 2},${maxFrequencyH + 2})--(${numRanges * 2 + 2},${maxFrequencyH + 1})--(${numRanges * 2 + 3},${maxFrequencyH + 1}) node[above right]{\\text{Mẫu $ A $}};\n`;

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 1;
    barChart += `\\draw[line cap=round,pattern=dots] (${x},0)--(${x},${frequenciesA[i]})--(${x + 1},${frequenciesA[i]})node[midway,above]{$ $}--(${x + 1},0)--cycle;\n`;
    barChart += `\\draw[line cap=round,pattern=north east lines] (${x + 1},0)--(${x + 1},${frequenciesB[i]})--(${x + 2},${frequenciesB[i]})node[midway,above]{$ $}--(${x + 2},0)--cycle;\n`;
}

for (let i = 0; i < numRanges; i++) {
    const x = 2 * i + 2;
    barChart += `\\node [below] at (${x},0){$ ${heightRanges[i]}$};\n`;
}

barChart += `\\draw[->] (0,0)node [below left=-2pt]{$O$}--(${numRanges * 2 + 3},0)node[below]{(\\text{Khoảng})};\n`;
barChart += `\\end{tikzpicture}\n`;
barChart += `\\end{center}\n`;
    // Kết hợp kết quả LaTeX
    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Hãy tính giá trị trung bình, phương sai, độ lệch chuẩn, trung vị, mốt, khoảng biến thiên và giá trị ngoại lai của mẫu số liệu ghép nhóm sau Mẫu A và Mẫu B\n`;
    result += barChart;
    // result += `\\begin{center}\n`;
    // result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    // result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    // result += `\\hline Tần Số Mẫu B & ${frequenciesB.join(' & ')} \\\\\n`;
    // result += `\\hline\n`;
    // result += `\\end{tabular}\n`;
    // result += `\\end{center}\n\\loigiai{\n`;
    result += `\\loigiai{\n`;

    // Gộp lời giải cho cả Mẫu A và Mẫu B
    result += `${resultA}${resultB}`;
    result += `}\n\\end{ex}`;

    return result;
}
function thong_ke_dulieu_don(numMin, numMax, totalFrequency, minFrequency, maxFrequency, numberType) {
    // Hàm để xáo trộn mảng
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Tạo dữ liệu ngẫu nhiên
    let data = [];
    let frequencies = {}; // Để lưu tần số của từng giá trị
    let currentFrequency = 0;
    let previousNum = null;

    while (currentFrequency < totalFrequency) {
        let num;
        do {
            num = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
            if (numberType === 1) { // 1 là số thập phân .5
                num += 0.5;
            }
        } while (num === previousNum);

        let freq = Math.floor(Math.random() * (maxFrequency - minFrequency + 1)) + minFrequency;

        for (let i = 0; i < freq && currentFrequency < totalFrequency; i++) {
            data.push(num);
            currentFrequency++;
        }

        // Cập nhật tần số
        frequencies[num] = (frequencies[num] || 0) + freq;
        previousNum = num;
    }

    // Xáo trộn dữ liệu
    shuffleArray(data);

    // Hàm tính trung bình
    function calculateMean(frequencies) {
        let totalSum = 0;
        let totalCount = 0;

        for (let num in frequencies) {
            totalSum += num * frequencies[num];
            totalCount += frequencies[num];
        }

        return totalSum / totalCount;
    }

    // Hàm tính mốt
    function calculateMode(frequencies) {
        const maxFrequency = Math.max(...Object.values(frequencies));
        return Object.keys(frequencies).filter(key => frequencies[key] === maxFrequency);
    }

    // Hàm tính phương sai
    function calculateVariance(data, mean) {
        const totalVariance = data.reduce((total, value) => total + Math.pow(value - mean, 2), 0);
        return totalVariance / data.length;
    }

    // Hàm tính các tứ phân vị
    function calculateQuartiles(data, n) {
        data.sort((a, b) => a - b);
        let Q1Index, Q2Index, Q3Index;
        let Q1, Q2, Q3;

        if (n % 4 === 0) {
            Q1Index = n / 4 - 1;
            Q3Index = 3 * n / 4 - 1;
            Q1 = (data[Q1Index] + data[Q1Index + 1]) / 2;
            Q2 = (data[n / 2 - 1] + data[n / 2]) / 2;
            Q3 = (data[Q3Index] + data[Q3Index + 1]) / 2;
        } else if (n % 4 === 1) {
            Q1Index = Math.floor(n / 4);
            Q3Index = Math.floor(3 * n / 4);
            Q1 = (data[Q1Index - 1] + data[Q1Index]) / 2;
            Q2 = data[Math.floor(n / 2)];
            Q3 = (data[Q3Index] + data[Q3Index + 1]) / 2;
        } else if (n % 4 === 2) {
            Q1Index = Math.floor(n / 4);
            Q3Index = Math.floor(3 * n / 4);
            Q1 = data[Q1Index];
            Q2 = (data[Math.floor(n / 2)] + data[Math.floor(n / 2) + 1]) / 2;
            Q3 = data[Q3Index];
        } else if (n % 4 === 3) {
            Q1Index = Math.floor(n / 4);
            Q3Index = Math.floor(3 * n / 4);
            Q1 = data[Q1Index];
            Q2 = data[Math.floor(n / 2)];
            Q3 = data[Q3Index + 1];
        }

        return { Q1, Q2, Q3, Q1Index, Q2Index: Math.floor(n / 2), Q3Index };
    }

    // Hàm tìm giá trị ngoại lai
    function findOutliers(data, lowerBound, upperBound) {
        return data.filter(value => value < lowerBound || value > upperBound);
    }

    // Hàm định dạng kết quả
    function formatResult(data, n, mean, mode, variance, standardDeviation, Q1, Q2, Q3, Q1Index, Q2Index, Q3Index, range, IQR, lowerBound, upperBound, outliers) {
        // Xáo trộn dữ liệu trước khi in ra bảng phần đề
        shuffleArray(data);

        let result = `\\begin{ex}\n`;
        result += `Cho các số liệu như sau\n`;
        result += `\\begin{center}\n`;
        result += `\\begin{tabular}{|cccccccccc|}\n\\hline\n`;

        // In ra bảng dữ liệu ngẫu nhiên không sắp xếp
        for (let i = 0; i < data.length; i++) {
            if (i % 10 === 0 && i !== 0) {
                result += `\\\\ \\hline \n`;
            }
            result += `${data[i]} & `;
        }

        // Thêm các ô trống nếu không đủ 10 cột ở hàng cuối
        if (data.length % 10 !== 0) {
            for (let i = 0; i < 10 - (data.length % 10); i++) {
                result += ` & `;
            }
        }

        result += `\\\\ \\hline \n\\hline\n\\end{tabular}\n\\end{center}\n`;
        result += `Tính số trung bình, tứ phân vị, mốt, phương sai, độ lệch chuẩn, khoảng biến thiên, khoảng tứ phân vị và tìm các giá trị bất thường của mẫu số liệu trên.\n`;

        // Tiếp tục phần tính toán và in kết quả theo thứ tự đã sắp xếp
        data.sort((a, b) => a - b);
        result += `\\loigiai{\n`;
        result += `Sắp xếp các số liệu theo thứ tự không giảm, ta được\n`;
        result += `\\begin{center}\n\\begin{tabular}{|cccccccccc|}\n\\hline\n`;

        for (let i = 0; i < data.length; i++) {
            if (i % 10 === 0 && i !== 0) {
                result += `\\\\ \\hline \n`;
            }
            result += `${data[i]} & `;
        }

        // Thêm các ô trống nếu không đủ 10 cột ở hàng cuối
        if (data.length % 10 !== 0) {
            for (let i = 0; i < 10 - (data.length % 10); i++) {
                result += ` & `;
            }
        }

        result += `\\\\ \\hline \n\\hline\n\\end{tabular}\n\\end{center}\n`;

        // Xác định tần số của mốt
        const frequencyMap = frequencies;
        const maxFrequency = Math.max(...Object.values(frequencyMap));
        const modeExplanation = mode.map(m => `${m} (xuất hiện ${frequencyMap[m]} lần)`).join(", ");

        result += `\\begin{itemize}\n`;
        result += `\\item Tính số trung bình: $\\overline{x} = \\dfrac{${Object.keys(frequencies).map(num => `${frequencies[num]} \\times ${num}`).join(' + ')}}{${n}} = ${mean.toFixed(2)}$.\n`;
        result += `\\item Tính mốt: $M = ${mode.join(", ")}$. Giá trị này xuất hiện nhiều nhất là ${maxFrequency} lần: ${modeExplanation}.\n`;
        // result += `\\item Phương sai: $S^2 = ${variance.toFixed(2)}$.\n`;
        // Công thức chi tiết tính phương sai theo tần số
        const varianceExplanation = Object.keys(frequencies).map(num => `${frequencies[num]} \\times (${num} - ${mean.toFixed(2)})^2`).join(' + ');
        result += `\\item Phương sai: $S^2 = \\dfrac{${varianceExplanation}}{${n}} = ${variance.toFixed(2)}$.\n`;
        result += `\\item Độ lệch chuẩn: $S = \\sqrt{S^2} = ${standardDeviation.toFixed(2)}$.\n`;
        result += `\\item Tính tứ phân vị:\n`;
        result += `\\begin{align*}\n`;
        
        if (n % 4 === 0) {
            result += `Q_1 &= \\text{Trung vị của phân nửa dưới: } ${Q1.toFixed(2)}, \\text{vị trí: } x_{${Q1Index + 1}} \\text{ và } x_{${Q1Index + 2}} \\text{ (khi n = ${n})} \\\\ \n`;
            result += `Q_2 &= \\text{Trung vị của toàn bộ dữ liệu: } ${Q2.toFixed(2)}, \\text{vị trí: } x_{${Q2Index + 1}} \\text{ và } x_{${Q2Index + 2}} \\text{ (khi n = ${n})} \\\\ \n`;
            result += `Q_3 &= \\text{Trung vị của phân nửa trên: } ${Q3.toFixed(2)}, \\text{vị trí: } x_{${Q3Index + 1}} \\text{ và } x_{${Q3Index + 2}} \\text{ (khi n = ${n})} \n`;
        } else if (n % 4 === 1) {
            result += `Q_1 &= \\text{Trung vị của phân nửa dưới: } ${Q1.toFixed(2)}, \\text{vị trí: } x_{${Q1Index}} \\text{ (khi n = ${n})} \\\\ \n`;
            result += `Q_2 &= \\text{Trung vị của toàn bộ dữ liệu: } ${Q2.toFixed(2)}, \\text{vị trí: } x_{${Q2Index + 1}} \\text{ (khi n = ${n})} \\\\ \n`;
            result += `Q_3 &= \\text{Trung vị của phân nửa trên: } ${Q3.toFixed(2)}, \\text{vị trí: } x_{${Q3Index + 1}} \\text{ (khi n = ${n})} \n`;
        } else if (n % 4 === 2) {
            result += `Q_1 &= \\text{Trung vị của phân nửa dưới: } ${Q1.toFixed(2)}, \\text{vị trí: } x_{${Q1Index + 1}} \\text{ (khi n = ${n})} \\\\ \n`;
            result += `Q_2 &= \\text{Trung vị của toàn bộ dữ liệu: } ${Q2.toFixed(2)}, \\text{vị trí: } x_{${Q2Index + 1}} \\text{ và } x_{${Q2Index + 2}} \\text{ (khi n = ${n})} \\\\ \n`;
            result += `Q_3 &= \\text{Trung vị của phân nửa trên: } ${Q3.toFixed(2)}, \\text{vị trí: } x_{${Q3Index + 1}} \\text{ (khi n = ${n})} \n`;
        } else if (n % 4 === 3) {
            result += `Q_1 &= \\text{Trung vị của phân nửa dưới: } ${Q1.toFixed(2)}, \\text{vị trí: } x_{${Q1Index + 1}} \\text{ (khi n = ${n})} \\\\ \n`;
            result += `Q_2 &= \\text{Trung vị của toàn bộ dữ liệu: } ${Q2.toFixed(2)}, \\text{vị trí: } x_{${Q2Index + 1}} \\text{ (khi n = ${n})} \\\\ \n`;
            result += `Q_3 &= \\text{Trung vị của phân nửa trên: } ${Q3.toFixed(2)}, \\text{vị trí: } x_{${Q3Index + 1}} \\text{ và } x_{${Q3Index + 2}} \\text{ (khi n = ${n})} \n`;
        }

        result += `\\end{align*}\n`;
        result += `\\item Khoảng biến thiên: $R = ${range}$.\n`;
        result += `\\item Khoảng tứ phân vị: $\\Delta_Q = Q_3 - Q_1 = ${IQR}$.\n`;
        result += `\\item Biên dưới của giá trị ngoại lai: $Q_1 - 1.5 \\times \\Delta_Q = ${lowerBound.toFixed(2)}$.\n`;
        result += `\\item Biên trên của giá trị ngoại lai: $Q_3 + 1.5 \\times \\Delta_Q = ${upperBound.toFixed(2)}$.\n`;
        result += `\\item Các giá trị bất thường: ${outliers.length ? `Có ${outliers.length} giá trị bất thường: ${outliers.join(", ")}` : "không có"}.\n`;
        result += `\\end{itemize}\n`;
        result += `}\n`;
        result += `\\end{ex}\n`;
        result = result.replace(/ \& \\\\ \\hline /g,'\\\\')
        return result;
    }

    // Tính toán các giá trị thống kê
    const n = data.length;
    const mean = calculateMean(frequencies);
    const mode = calculateMode(frequencies);
    const variance = calculateVariance(data, mean);
    const standardDeviation = Math.sqrt(variance);
    const range = data.reduce((a, b) => Math.max(a, b)) - data.reduce((a, b) => Math.min(a, b));
    const { Q1, Q2, Q3, Q1Index, Q2Index, Q3Index } = calculateQuartiles(data, n);
    const IQR = Q3 - Q1;
    const lowerBound = Q1 - 1.5 * IQR;
    const upperBound = Q3 + 1.5 * IQR;
    const outliers = findOutliers(data, lowerBound, upperBound);

    // Định dạng kết quả
    return formatResult(data, n, mean, mode, variance, standardDeviation, Q1, Q2, Q3, Q1Index, Q2Index, Q3Index, range, IQR, lowerBound, upperBound, outliers);
}
