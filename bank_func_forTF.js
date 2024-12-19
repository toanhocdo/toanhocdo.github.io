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
    // Xóa các hệ số 1 và 0 cho bất kỳ biến nào
    expression = expression.replace(/\b1([a-zA-Z])/g, '$1'); // 1x, 1m -> x, m
    expression = expression.replace(/\b0[a-zA-Z]\^?\d*/g, ''); // 0x, 0x^n, 0m -> ''
    
    // Xử lý các dấu ++, --, +-, -+
    expression = expression.replace(/\+\+/g, '+'); // ++ -> +
    expression = expression.replace(/--/g, '+'); // -- -> +
    expression = expression.replace(/\+-/g, '-'); // +- -> -
    expression = expression.replace(/-\+/g, '-'); // -+ -> -
    
    // Xóa các dấu + ở đầu biểu thức nếu có
    expression = expression.replace(/^\+/, '');
    
    return expression;
}
function lamdeppm(expression) {
    // Tách biểu thức thành các dòng riêng biệt
    let lines = expression.split('\n');

    // Duyệt qua từng dòng và áp dụng các thay thế nếu không bắt đầu bằng các từ khóa cần tránh
    lines = lines.map(line => {
        // Kiểm tra nếu dòng bắt đầu với \draw, \patch, hoặc \fill
        if (/^\s*(\\draw|\\patch|\\fill)/.test(line)) {
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

function ham_bac3_dondieu_cb1(d) {
    // Sinh ngẫu nhiên các hệ số a, b, c
    let a = Math.floor(Math.random() * 5) + 1; // a từ 1 đến 5
    let b = Math.floor(Math.random() * 10) + 1; // b từ 1 đến 10
    let c = Math.floor(Math.random() * 21) - 10; // c từ -10 đến 10

    // Tạo biểu thức hàm số
    let equation = `${a !== 1 ? a : ''}x^3 - ${b}x^2 + ${c}`;

    // Tính đạo hàm của hàm số
    let derivative = `${3 * a}x^2 - ${2 * b}x`;

    // Tìm các nghiệm của đạo hàm
    let x1 = 0;
    let numerator = 2 * b;
    let denominator = 3 * a;

    // Hàm tính UCLN (GCD)
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    let gcdValue = gcd(numerator, denominator);
    numerator /= gcdValue;
    denominator /= gcdValue;

    let x2Latex;
    if (denominator === 1) {
        x2Latex = `${numerator}`;
    } else {
        x2Latex = `\\dfrac{${numerator}}{${denominator}}`;
    }

    // Tạo lời giải
    let explanation = `
        $y'=${derivative}$. Giải $y'=0$ ta được $x=0$, $x=${x2Latex}$.
        \\begin{center}
            \\begin{tikzpicture}
                \\tkzTabInit[nocadre=false, lgt=1, espcl=2] 
                {$x$ /0.7,$y'$ /0.7,$y$ /1.7}
                {$-\\infty$,${x1},${x2Latex},$+\\infty$}
                \\tkzTabLine{,+,0,-,0,+}  
                \\tkzTabVar{-/$-\\infty$ ,+/ , -/ , +/$+\\infty$ }  
            \\end{tikzpicture}
        \\end{center}
        \\begin{itemchoice} 
            \\itemch Hàm số không nghịch biến trên $\\mathbb{R}$.
            \\itemch Hàm số đã cho đồng biến trên $\\left(0;${x2Latex}\\right)$.
            \\itemch Hàm số đã cho nghịch biến trên $\\left(${x1};${x2Latex}\\right)$.
            \\itemch Hàm số $g(x)=f(x)+${d}$ đồng biến trên $\\left(-\\infty;0\\right)$.
        \\end{itemchoice}
    `;

    // Tạo các lựa chọn cho câu hỏi
    let choices = [
        { text: "Hàm số không nghịch biến trên $\\mathbb{R}$", isTrue: false },
        { text: `Hàm số đã cho đồng biến trên $\\left(0;${x2Latex}\\right)$`, isTrue: true },
        { text: `Hàm số đã cho nghịch biến trên $\\left(0;${x2Latex}\\right)$`, isTrue: true },
        { text: `Hàm số $g(x)=f(x)+${c}$ đồng biến trên $\\left(-\\infty;0\\right)$`, isTrue: true }
    ];

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-1]
    Cho hàm số $y=f(x)=${equation}$. Các mệnh đề sau đúng hay sai?
    \\choiceTF
    ${choices.map(choice => `{${choice.isTrue ? '\\True ' : ''}${choice.text}}`).join('\n    ')}
    \\loigiai{
      Ta có ${explanation}
    }
\\end{ex}`;
    question = cleanUpOutput(question)
    question = lamdeppm(question)
    return question;
}
function ham_bac4_dondieu_cb1(d) {
    // Sinh ngẫu nhiên các hệ số a, b, c
    let a = Math.floor(Math.random() * 5) + 1; // a từ 1 đến 5
    let b = Math.floor(Math.random() * 5) + 1; // b từ 1 đến 5
    let c = Math.floor(Math.random() * 21) - 10; // c từ -10 đến 10
    let cc=2*d
    // Tạo biểu thức hàm số
    let equation = `${a !== 1 ? a : ''}x^4 - ${b}x^2 ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;

    // Tính đạo hàm của hàm số
    let derivative = `${4 * a}x^3 - ${2 * b}x`;

    // Tìm các nghiệm của đạo hàm
    let numerator = 2 * b;
    let denominator = 2 * a;

    // Hàm tính UCLN (GCD)
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    let gcdValue = gcd(numerator, denominator);
    numerator /= gcdValue;
    denominator /= gcdValue;

    let x1Latex;
    let x2Latex = 0;
    let x3Latex;
    
    if (denominator === 1) {
        x1Latex = `-${numerator}`;
        x3Latex = `${numerator}`;
    } else {
        x1Latex = `-\\dfrac{${numerator}}{${denominator}}`;
        x3Latex = `\\dfrac{${numerator}}{${denominator}}`;
    }

    // Tạo lời giải
    let explanation = `
        Ta có $y'=${derivative}$. Giải $y'=0$ ta được $x=${x1Latex}$, $x=0$, $x=${x3Latex}$.\\
        Bảng biến thiên
        \\begin{center}
            \\begin{tikzpicture}
                \\tkzTabInit[nocadre=false, lgt=1, espcl=2] 
                {$x$ /0.7,$y'$ /0.7,$y$ /1.7}
                {$-\\infty$,${x1Latex},${x2Latex},${x3Latex},$+\\infty$}
                \\tkzTabLine{,-,0,+,0,-,0,+,} 
                \\tkzTabVar{+/$-\\infty$ ,-/ $y(${x1Latex})$, +/ $y(0)$, -/ $y(${x3Latex})$, +/$+\\infty$} 
            \\end{tikzpicture}
        \\end{center}
        \\begin{itemchoice}
            \\itemch Dựa vào bảng biến thiên ta thấy hàm số đạt cực đại tại $x=0$.
            \\itemch Dựa vào bảng biến thiên ta thấy hàm số đạt cực tiểu tại $x=${x1Latex}$
            \\itemch Dựa vào bảng biến thiên ta thấy hàm số có giá trị cực đại và cực tiểu lần lượt là $y(0)$ và $y(${x1Latex})$
            \\itemch Dựa vào bảng biến thiên ta thấy hàm số $g(x)=f(x)+${d}$ có điểm cực đại là $(0;${cc})$
        \\end{itemchoice}
    `;

    // Tạo các lựa chọn cho câu hỏi
    let choices = [
        { text: "Hàm số đã cho đạt cực đại tại $x=0$", isTrue: true },
        { text: `Hàm số đã cho đạt cực tiểu tại $x=${x1Latex}$`, isTrue: true },
        { text: `Hàm số đã cho có giá trị cực đại và cực tiểu lần lượt là $y(0)$ và $y(${x1Latex})$`, isTrue: true },
        { text: `Đồ thị hàm số $g(x)=f(x)+${c}$ có điểm cực đại là $(0;${c})$`, isTrue: false }
    ];

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H2-1]
    Cho hàm số $y=f(x)=${equation}$. Các mệnh đề sau đúng hay sai?
    \\choiceTF
    ${choices.map(choice => `{${choice.isTrue ? '\\True ' : ''}${choice.text}}`).join('\n    ')}
    \\loigiai{
      Ta có ${explanation}
    }
\\end{ex}`;
    question = cleanUpOutput(question)
    return question;
}
// Hàm sinh ra giá trị ngẫu nhiên từ a ± 0.5
function pm(a) {
  return a + (Math.random() - 0.5); 
}

// Hàm so sánh
function compare(a, b) {
  return a > b ? "\\True " : "";
}

function thongkeTF_mau1() {
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

    
    // Lưu giá trị ngẫu nhiên vào một biến
    const pm_mean = pm(mean).toFixed(2);
    const pm_dlc = pm(standardDeviation).toFixed(2);
    const pm_q2 = pm(Q2).toFixed(2);
    const pm_IQR = pm(IQR).toFixed(2);
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
    result += `\\choiceTF\n`;
    result += `{${compare((mean).toFixed(2),pm_mean)} Giá trị trung bình của mẫu lớn hơn $${pm_mean}$}\n`;
    result += `{${compare((standardDeviation).toFixed(2),pm_dlc)} Độ lệch chuẩn của mẫu lớn hơn $${pm_dlc}$}\n`;
    result += `{${compare((Q2).toFixed(2),pm_q2)} Độ lệch chuẩn của mẫu lớn hơn $${pm_q2}$}\n`;
    result += `{${compare((IQR).toFixed(2),pm_IQR)} Khoảng tứ phân vị của mẫu lớn hơn $${pm_q2}$}\n`;
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
   
    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}
function thongkeTF_mau2() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 150 đến 155
    const startHeight = Math.floor(Math.random() * 30) + 120;
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
     // Lưu giá trị ngẫu nhiên vào một biến
    const pm_mean = pm(mean).toFixed(2);
    const pm_dlc = pm(standardDeviation).toFixed(2);
    const pm_q2 = pm(Q2).toFixed(2);
    const pm_IQR = pm(IQR).toFixed(2);
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
    result += `\\choiceTF\n`;
    result += `{${compare((mean).toFixed(2),pm_mean)} Giá trị trung bình của mẫu lớn hơn $${pm_mean}$}\n`;
    result += `{${compare((standardDeviation).toFixed(2),pm_dlc)} Độ lệch chuẩn của mẫu lớn hơn $${pm_dlc}$}\n`;
    result += `{${compare((Q2).toFixed(2),pm_q2)} Độ lệch chuẩn của mẫu lớn hơn $${pm_q2}$}\n`;
    result += `{${compare((IQR).toFixed(2),pm_IQR)} Khoảng tứ phân vị của mẫu lớn hơn $${pm_q2}$}\n`;    
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
function thongkeTF_mau3() {
    // Tạo giá trị đầu tiên của khoảng ngẫu nhiên từ 1 đến 30
    const startHeight = Math.floor(Math.random() * 30) + 1;
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
    
    // Lưu giá trị ngẫu nhiên vào một biến
    const pm_mean = pm(mean).toFixed(2);
    const pm_dlc = pm(standardDeviation).toFixed(2);
    const pm_q2 = pm(Q2).toFixed(2);
    const pm_IQR = pm(IQR).toFixed(2);
    
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
    result += `\\choiceTF\n`;
    result += `{${compare(mean.toFixed(2), pm_mean)} Giá trị trung bình của mẫu lớn hơn $${pm_mean}$}\n`;
    result += `{${compare(standardDeviation.toFixed(2), pm_dlc)} Độ lệch chuẩn của mẫu lớn hơn $${pm_dlc}$}\n`;
    result += `{${compare(Q2.toFixed(2), pm_q2)} Độ lệch chuẩn của mẫu lớn hơn $${pm_q2}$}\n`;
    result += `{${compare(IQR.toFixed(2), pm_IQR)} Khoảng tứ phân vị của mẫu lớn hơn $${pm_IQR}$}\n`;        
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
    result += `$$ \\overline{x}=\\dfrac{${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}`).join('+')}}{${totalStudents}}=\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}}\\approx ${mean.toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2=\\dfrac{1}{${totalStudents}}(${frequencies.map((freq, index) => `${freq}\\cdot${representativeValues[index].toFixed(1)}^2`).join('+')})-\\left(\\dfrac{${frequencies.reduce((acc, freq, index) => acc + freq * representativeValues[index], 0)}}{${totalStudents}} \\right)^2\\approx ${variance.toFixed(2)}.  $$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S\\approx\\sqrt{${variance.toFixed(2)}}\\approx ${standardDeviation.toFixed(2)} $$. \n`;

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
    result += `$$Q_1=${Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{4}-${Q1PreviousCumulative}}{${Q1Frequency}} \\cdot(${Q1Range.split(";")[1].replace(")", "")}-${Q1Range.split(";")[0].replace("[", "")})\\approx ${Q1.toFixed(2)}$$\n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ2)}}}$ nằm trong nhóm có khoảng $[${Q2Range.split(";")[0].replace("[", "")};${Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudents}}{2}-${Q2PreviousCumulative}}{${Q2Frequency}} \\cdot(${Q2Range.split(";")[1].replace(")", "")}-${Q2Range.split(";")[0].replace("[", "")})\\approx ${Q2.toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil(positionQ3)}}}$ nằm trong nhóm có khoảng $[${Q3Range.split(";")[0].replace("[", "")};${Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudents}}{4}-${Q3PreviousCumulative}}{${Q3Frequency}} \\cdot(${Q3Range.split(";")[1].replace(")", "")}-${Q3Range.split(";")[0].replace("[", "")})\\approx ${Q3.toFixed(2)}$$\n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta_Q=Q_3-Q_1 \\approx ${Q3.toFixed(2)}-${Q1.toFixed(2)}\\approx ${IQR.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai thấp hơn ngưỡng dưới là $<${lowerOutlierBound.toFixed(2)}$.\\\\\n`;
    result += `Giá trị ngoại lai cao hơn ngưỡng trên là $>${upperOutlierBound.toFixed(2)}$.\\\\\n`;

    result += `Mốt của mẫu số liệu ghép nhóm là \n`;
    result += `$$ M_0=${u_m_mode}+\\dfrac{${n_m}-${n_m_1}}{(${n_m}-${n_m_1})+(${n_m}-${n_m_1_next})} \\cdot(${u_m1_mode}-${u_m_mode})\\approx ${mode.toFixed(2)}$$\n`;

    result += `}\n`;
    result += `\\end{ex}`;

    return result;
}












function thongkeTF_4k_1() {
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    let frequenciesA = [];
    let frequenciesNgoc = [];
    let totalStudentsA = 0;
    let totalStudentsNgoc = 0;

    while (totalStudentsA % 4 !== 1 || totalStudentsNgoc !== totalStudentsA) {
        frequenciesA.length = 0;
        frequenciesNgoc.length = 0;
        totalStudentsA = 0;
        totalStudentsNgoc = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6;
            const frequencyNgoc = Math.floor(Math.random() * 6) + 6;
            frequenciesA.push(frequencyA);
            frequenciesNgoc.push(frequencyNgoc);
            totalStudentsA += frequencyA;
            totalStudentsNgoc += frequencyNgoc;
        }
    }

    function tinhToanThongKe(frequencies, totalStudents) {
        const representativeValues = heightRanges.map(range => {
            if (!range) return 0;
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

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
                const range = heightRanges[i];
                if (range) {
                    const u_m = parseInt(range.split(";")[0].replace("[", ""));
                    const u_m1 = parseInt(range.split(";")[1].replace(")", ""));
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

        const positionQ2 = totalStudents / 2;
        cumulativeFrequency = 0;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q2BoundaryUsed = false;
        let Q2GroupA, Q2GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const range = heightRanges[i];
                if (range) {
                    const u_m = parseInt(range.split(";")[0].replace("[", ""));
                    const u_m1 = parseInt(range.split(";")[1].replace(")", ""));
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
        }

        const positionQ3 = 3 * totalStudents / 4;
        cumulativeFrequency = 0;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q3BoundaryUsed = false;
        let Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const range = heightRanges[i];
                if (range) {
                    const u_m = parseInt(range.split(";")[0].replace("[", ""));
                    const u_m1 = parseInt(range.split(";")[1].replace(")", ""));
                    if (Math.ceil(positionQ3) - 1 <= previousCumulative || Math.ceil(positionQ3) > cumulativeFrequency) {
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

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const modeRange = heightRanges[modeIndex];
        let mode = 0;
        if (modeRange) {
            const u_m_mode = parseInt(modeRange.split(";")[0].replace("[", ""));
            const u_m1_mode = parseInt(modeRange.split(";")[1].replace(")", ""));
            const n_m = frequencies[modeIndex];
            const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
            const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
            mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
        }

        return {
            mean,
            variance,
            standardDeviation,
            Q1,
            Q1BoundaryUsed,
            Q1Range,
            Q1Frequency,
            Q1PreviousCumulative,
            Q2,
            Q2BoundaryUsed,
            Q2Range,
            Q2Frequency,
            Q2PreviousCumulative,
            Q3,
            Q3BoundaryUsed,
            Q3Range,
            Q3Frequency,
            Q3PreviousCumulative,
            IQR,
            lowerOutlierBound,
            upperOutlierBound,
            mode,
            range: Math.max(...representativeValues) - Math.min(...representativeValues),
            representativeValues
        };
    }

    let statsA, statsNgoc;
    let success = false;

    while (!success) {
        try {
            statsA = tinhToanThongKe(frequenciesA, totalStudentsA);
            statsNgoc = tinhToanThongKe(frequenciesNgoc, totalStudentsNgoc);
            success = true; // Nếu không có lỗi, đặt success thành true để thoát khỏi vòng lặp
        } catch (error) {
            console.error("Error occurred during calculation: ", error);
            // Thực hiện lại quá trình random nếu gặp lỗi
            return null;
        }
    }

    const compare = (a, b) => a > b ? "\\True " : "";

    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Cho bảng số liệu của hai mẫu A và mẫu B như sau. Xét tính đúng sai các khẳng định sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Mẫu B & ${frequenciesNgoc.join(' & ')} \\\\\n`;   
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;              
    result += `\\end{center}\n`;

    result += `\\choiceTFn\n`;
    result += `{ ${compare(statsNgoc.mean, statsA.mean)} $\\overline{x}_{\\text{B}} > \\overline{x}_{\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.standardDeviation, statsA.standardDeviation)} $S_{\\text{B}} > S_{\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.Q2, statsA.Q2)} $Q_{2,\\text{B}} > Q_{2,\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.IQR, statsA.IQR)} $\\Delta Q_{\\text{B}} > \\Delta Q_{\\text{A}} $}\n`;
  
    result += `\\loigiai{\n`;

    result += `\\textbf{Mẫu số liệu của A:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{A}}=\\dfrac{${frequenciesA.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsA}}\\approx ${(statsA.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{A}}=\\dfrac{1}{${totalStudentsA}}(${frequenciesA.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesA.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsA}} \\right)^2\\approx ${(statsA.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{A}}\\approx\\sqrt{${(statsA.variance).toFixed(2)}}\\approx ${(statsA.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{A}}=${statsA.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{A}}=${statsA.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Mẫu số liệu của B:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesNgoc.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{B}}=\\dfrac{${frequenciesNgoc.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsNgoc}}\\approx ${(statsNgoc.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{B}}=\\dfrac{1}{${totalStudentsNgoc}}(${frequenciesNgoc.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesNgoc.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsNgoc}} \\right)^2\\approx ${(statsNgoc.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{B}}\\approx\\sqrt{${(statsNgoc.variance).toFixed(2)}}\\approx ${(statsNgoc.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{B}}=${statsNgoc.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{B}}=${statsNgoc.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Tính toán các tứ phân vị:}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    if (statsA.Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(statsA.Q1PreviousCumulative)}}}$ và $x_{{${Math.ceil(statsA.Q1PreviousCumulative + 1)}}}$ mà $x_{{${Math.ceil(statsA.Q1PreviousCumulative)}}}$ \\in [${statsA.Q1GroupA.split(";")[0].replace("[", "")};${statsA.Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(statsA.Q1PreviousCumulative + 1)}}}$ \\in [${statsA.Q1GroupB.split(";")[0].replace("[", "")};${statsA.Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${statsA.Q1GroupB.split(";")[0].replace("[", "")}$$\n`;                                            
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(statsA.Q1PreviousCumulative)}}}$ và $x_{{${Math.ceil(statsA.Q1PreviousCumulative + 1)}}}$ mà $x_{{${Math.ceil(statsA.Q1PreviousCumulative)}}}, x_{{${Math.ceil(statsA.Q1PreviousCumulative + 1)}}}$ \\in [${statsA.Q1Range.split(";")[0].replace("[", "")};${statsA.Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${statsA.Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudentsA}}{4}-${statsA.Q1PreviousCumulative}}{${statsA.Q1Frequency}} \\cdot(${statsA.Q1Range.split(";")[1].replace(")", "")}-${statsA.Q1Range.split(";")[0].replace("[", "")})\\approx ${(statsA.Q1).toFixed(2)}$$\n`;
    }

    if (statsNgoc.Q1BoundaryUsed) {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(statsNgoc.Q1PreviousCumulative)}}}$ và $x_{{${Math.ceil(statsNgoc.Q1PreviousCumulative + 1)}}}$ mà $x_{{${Math.ceil(statsNgoc.Q1PreviousCumulative)}}}$ \\in [${statsNgoc.Q1GroupA.split(";")[0].replace("[", "")};${statsNgoc.Q1GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(statsNgoc.Q1PreviousCumulative + 1)}}}$ \\in [${statsNgoc.Q1GroupB.split(";")[0].replace("[", "")};${statsNgoc.Q1GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_1=${statsNgoc.Q1GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(statsNgoc.Q1PreviousCumulative)}}}$ và $x_{{${Math.ceil(statsNgoc.Q1PreviousCumulative + 1)}}}$ mà $x_{{${Math.ceil(statsNgoc.Q1PreviousCumulative)}}, x_{{${Math.ceil(statsNgoc.Q1PreviousCumulative + 1)}}}}$ \\in [${statsNgoc.Q1Range.split(";")[0].replace("[", "")};${statsNgoc.Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_1=${statsNgoc.Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudentsNgoc}}{4}-${statsNgoc.Q1PreviousCumulative}}{${statsNgoc.Q1Frequency}} \\cdot(${statsNgoc.Q1Range.split(";")[1].replace(")", "")}-${statsNgoc.Q1Range.split(";")[0].replace("[", "")})\\approx ${(statsNgoc.Q1).toFixed(2)}$$\n`;
    }

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(statsA.Q2PreviousCumulative)}}}$ nằm trong nhóm có khoảng $[${statsA.Q2Range.split(";")[0].replace("[", "")};${statsA.Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${statsA.Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudentsA}}{2}-${statsA.Q2PreviousCumulative}}{${statsA.Q2Frequency}} \\cdot(${statsA.Q2Range.split(";")[1].replace(")", "")}-${statsA.Q2Range.split(";")[0].replace("[", "")})\\approx ${(statsA.Q2).toFixed(2)}$$\n`;

    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(statsNgoc.Q2PreviousCumulative)}}}$ nằm trong nhóm có khoảng $[${statsNgoc.Q2Range.split(";")[0].replace("[", "")};${statsNgoc.Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${statsNgoc.Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudentsNgoc}}{2}-${statsNgoc.Q2PreviousCumulative}}{${statsNgoc.Q2Frequency}} \\cdot(${statsNgoc.Q2Range.split(";")[1].replace(")", "")}-${statsNgoc.Q2Range.split(";")[0].replace("[", "")})\\approx ${(statsNgoc.Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    if (statsA.Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(statsA.Q3PreviousCumulative)}}}$ và $x_{{${Math.ceil(statsA.Q3PreviousCumulative + 1)}}}$ mà $x_{{${Math.ceil(statsA.Q3PreviousCumulative)}}}$ \\in [${statsA.Q3GroupA.split(";")[0].replace("[", "")};${statsA.Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(statsA.Q3PreviousCumulative + 1)}}}$ \\in [${statsA.Q3GroupB.split(";")[0].replace("[", "")};${statsA.Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${statsA.Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(statsA.Q3PreviousCumulative)}}}$ và $x_{{${Math.ceil(statsA.Q3PreviousCumulative + 1)}}}$ mà $x_{{${Math.ceil(statsA.Q3PreviousCumulative)}}}, x_{{${Math.ceil(statsA.Q3PreviousCumulative + 1)}}}$ \\in [${statsA.Q3Range.split(";")[0].replace("[", "")};${statsA.Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${statsA.Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudentsA}}{4}-${statsA.Q3PreviousCumulative}}{${statsA.Q3Frequency}} \\cdot(${statsA.Q3Range.split(";")[1].replace(")", "")}-${statsA.Q3Range.split(";")[0].replace("[", "")})\\approx ${(statsA.Q3).toFixed(2)}$$\n`;
    }

    if (statsNgoc.Q3BoundaryUsed) {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(statsNgoc.Q3PreviousCumulative)}}}$ và $x_{{${Math.ceil(statsNgoc.Q3PreviousCumulative + 1)}}}$ mà $x_{{${Math.ceil(statsNgoc.Q3PreviousCumulative)}}}$ \\in [${statsNgoc.Q3GroupA.split(";")[0].replace("[", "")};${statsNgoc.Q3GroupA.split(";")[1].replace(")", "")})$, $x_{{${Math.ceil(statsNgoc.Q3PreviousCumulative + 1)}}}$ \\in [${statsNgoc.Q3GroupB.split(";")[0].replace("[", "")};${statsNgoc.Q3GroupB.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là biên của nhóm sau:\n`;
        result += `$$Q_3=${statsNgoc.Q3GroupB.split(";")[0].replace("[", "")}$$\n`;
    } else {
        result += `Tứ phân vị thứ ba của mẫu số liệu gốc là trung bình cộng của $x_{{${Math.ceil(statsNgoc.Q3PreviousCumulative)}}}$ và $x_{{${Math.ceil(statsNgoc.Q3PreviousCumulative + 1)}}}$ mà $x_{{${Math.ceil(statsNgoc.Q3PreviousCumulative)}}, x_{{${Math.ceil(statsNgoc.Q3PreviousCumulative + 1)}}}}$ \\in [${statsNgoc.Q3Range.split(";")[0].replace("[", "")};${statsNgoc.Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
        result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
        result += `$$Q_3=${statsNgoc.Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudentsNgoc}}{4}-${statsNgoc.Q3PreviousCumulative}}{${statsNgoc.Q3Frequency}} \\cdot(${statsNgoc.Q3Range.split(";")[1].replace(")", "")}-${statsNgoc.Q3Range.split(";")[0].replace("[", "")})\\approx ${(statsNgoc.Q3).toFixed(2)}$$\n`;
    }

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta Q_{\\text{A}}=Q_{3,\\text{A}}-Q_{1,\\text{A}} \\approx ${(statsA.Q3).toFixed(2)}-${(statsA.Q1).toFixed(2)}\\approx ${(statsA.IQR).toFixed(2)}$.\\\\\n`;
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta Q_{\\text{B}}=Q_{3,\\text{B}}-Q_{1,\\text{B}} \\approx ${(statsNgoc.Q3).toFixed(2)}-${(statsNgoc.Q1).toFixed(2)}\\approx ${(statsNgoc.IQR).toFixed(2)}$.\\\\\n`;

    
    result += `}\n\\end{ex}`;

    return result;
}
function thongkeTF_4k_3() {
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    let frequenciesA = [];
    let frequenciesNgoc = [];
    let totalStudentsA = 0;
    let totalStudentsNgoc = 0;

    while (totalStudentsA % 4 !== 3 || totalStudentsNgoc !== totalStudentsA) {
        frequenciesA.length = 0;
        frequenciesNgoc.length = 0;
        totalStudentsA = 0;
        totalStudentsNgoc = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6;
            const frequencyNgoc = Math.floor(Math.random() * 6) + 6;
            frequenciesA.push(frequencyA);
            frequenciesNgoc.push(frequencyNgoc);
            totalStudentsA += frequencyA;
            totalStudentsNgoc += frequencyNgoc;
        }
    }  

    function tinhToanThongKe(frequencies, totalStudents) {
        const representativeValues = heightRanges.map(range => {
            if (!range) return 0;
            const lowerBound = parseInt(range.split(";")[0].replace("[", ""));
            const upperBound = parseInt(range.split(";")[1].replace(")", ""));
            return (lowerBound + upperBound) / 2;
        });

        const mean = representativeValues.reduce((acc, value, index) => acc + value * frequencies[index], 0) / totalStudents;
        const variance = representativeValues.reduce((acc, value, index) => acc + frequencies[index] * Math.pow(value, 2), 0) / totalStudents - Math.pow(mean, 2);
        const standardDeviation = Math.sqrt(variance);

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
                const range = heightRanges[i];
                if (range) {
                    const u_m = parseInt(range.split(";")[0].replace("[", ""));
                    const u_m1 = parseInt(range.split(";")[1].replace(")", ""));
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

        const positionQ2 = totalStudents / 2;
        cumulativeFrequency = 0;
        let Q2Range, Q2Frequency, Q2PreviousCumulative;
        let Q2BoundaryUsed = false;
        let Q2GroupA, Q2GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ2 && !Q2) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const range = heightRanges[i];
                if (range) {
                    const u_m = parseInt(range.split(";")[0].replace("[", ""));
                    const u_m1 = parseInt(range.split(";")[1].replace(")", ""));
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
        }

        const positionQ3 = 3 * totalStudents / 4;
        cumulativeFrequency = 0;
        let Q3Range, Q3Frequency, Q3PreviousCumulative;
        let Q3BoundaryUsed = false;
        let Q3GroupA, Q3GroupB;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (cumulativeFrequency >= positionQ3 && !Q3) {
                const previousCumulative = cumulativeFrequency - frequencies[i];
                const range = heightRanges[i];
                if (range) {
                    const u_m = parseInt(range.split(";")[0].replace("[", ""));
                    const u_m1 = parseInt(range.split(";")[1].replace(")", ""));
                    if (Math.ceil(positionQ3) - 1 <= previousCumulative || Math.ceil(positionQ3) > cumulativeFrequency) {
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

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const modeRange = heightRanges[modeIndex];
        let mode = 0;
        if (modeRange) {
            const u_m_mode = parseInt(modeRange.split(";")[0].replace("[", ""));
            const u_m1_mode = parseInt(modeRange.split(";")[1].replace(")", ""));
            const n_m = frequencies[modeIndex];
            const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
            const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
            mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
        }

        return {
            mean,
            variance,
            standardDeviation,
            Q1,
            Q1BoundaryUsed,
            Q1Range,
            Q1Frequency,
            Q1PreviousCumulative,
            Q2,
            Q2BoundaryUsed,
            Q2Range,
            Q2Frequency,
            Q2PreviousCumulative,
            Q3,
            Q3BoundaryUsed,
            Q3Range,
            Q3Frequency,
            Q3PreviousCumulative,
            IQR,
            lowerOutlierBound,
            upperOutlierBound,
            mode,
            range: Math.max(...representativeValues) - Math.min(...representativeValues),
            representativeValues
        };
    }

    let statsA, statsNgoc;
    let success = false;

    while (!success) {
        try {
            statsA = tinhToanThongKe(frequenciesA, totalStudentsA);
            statsNgoc = tinhToanThongKe(frequenciesNgoc, totalStudentsNgoc);
            success = true; // Nếu không có lỗi, đặt success thành true để thoát khỏi vòng lặp
        } catch (error) {
            console.error("Error occurred during calculation: ", error);
            // Thực hiện lại quá trình random nếu gặp lỗi
            return null;
        }
    }

    const compare = (a, b) => a > b ? "\\True " : "";

    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Cho bảng số liệu của hai mẫu A và mẫu B như sau. Xét tính đúng sai các khẳng định sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Mẫu B & ${frequenciesNgoc.join(' & ')} \\\\\n`;   
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;              
    result += `\\end{center}\n`;

    result += `\\choiceTFn\n`;
    result += `{ ${compare(statsNgoc.mean, statsA.mean)} $\\overline{x}_{\\text{B}} > \\overline{x}_{\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.standardDeviation, statsA.standardDeviation)} $S_{\\text{B}} > S_{\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.Q2, statsA.Q2)} $Q_{2,\\text{B}} > Q_{2,\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.IQR, statsA.IQR)} $\\Delta Q_{\\text{B}} > \\Delta Q_{\\text{A}} $}\n`;
  
    result += `\\loigiai{\n`;

    result += `\\textbf{Mẫu số liệu của A:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{A}}=\\dfrac{${frequenciesA.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsA}}\\approx ${(statsA.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{A}}=\\dfrac{1}{${totalStudentsA}}(${frequenciesA.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesA.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsA}} \\right)^2\\approx ${(statsA.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{A}}\\approx\\sqrt{${(statsA.variance).toFixed(2)}}\\approx ${(statsA.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{A}}=${statsA.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{A}}=${statsA.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Mẫu số liệu của B:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesNgoc.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{B}}=\\dfrac{${frequenciesNgoc.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsNgoc}}\\approx ${(statsNgoc.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{B}}=\\dfrac{1}{${totalStudentsNgoc}}(${frequenciesNgoc.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesNgoc.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsNgoc}} \\right)^2\\approx ${(statsNgoc.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{B}}\\approx\\sqrt{${(statsNgoc.variance).toFixed(2)}}\\approx ${(statsNgoc.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{B}}=${statsNgoc.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{B}}=${statsNgoc.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Tính toán các tứ phân vị:}\n`;

     // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil((totalStudentsA + 1) / 4)}}}$ nằm trong nhóm có khoảng $[${statsA.Q1Range.split(";")[0].replace("[", "")};${statsA.Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${statsA.Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudentsA}}{4}-${statsA.Q1PreviousCumulative}}{${statsA.Q1Frequency}} \\cdot(${statsA.Q1Range.split(";")[1].replace(")", "")}-${statsA.Q1Range.split(";")[0].replace("[", "")})\\approx ${(statsA.Q1).toFixed(2)}$$\n`;

    result += `Tứ phân vị thứ nhất của mẫu số liệu gốc là $x_{{${Math.ceil((totalStudentsNgoc + 1) / 4)}}}$ nằm trong nhóm có khoảng $[${statsNgoc.Q1Range.split(";")[0].replace("[", "")};${statsNgoc.Q1Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ nhất của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_1=${statsNgoc.Q1Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudentsNgoc}}{4}-${statsNgoc.Q1PreviousCumulative}}{${statsNgoc.Q1Frequency}} \\cdot(${statsNgoc.Q1Range.split(";")[1].replace(")", "")}-${statsNgoc.Q1Range.split(";")[0].replace("[", "")})\\approx ${(statsNgoc.Q1).toFixed(2)}$$\n`;


    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(statsA.Q2PreviousCumulative)}}}$ nằm trong nhóm có khoảng $[${statsA.Q2Range.split(";")[0].replace("[", "")};${statsA.Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${statsA.Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudentsA}}{2}-${statsA.Q2PreviousCumulative}}{${statsA.Q2Frequency}} \\cdot(${statsA.Q2Range.split(";")[1].replace(")", "")}-${statsA.Q2Range.split(";")[0].replace("[", "")})\\approx ${(statsA.Q2).toFixed(2)}$$\n`;

    result += `Trung vị của mẫu số liệu gốc là $x_{{${Math.ceil(statsNgoc.Q2PreviousCumulative)}}}$ nằm trong nhóm có khoảng $[${statsNgoc.Q2Range.split(";")[0].replace("[", "")};${statsNgoc.Q2Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, trung vị của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_2=${statsNgoc.Q2Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{${totalStudentsNgoc}}{2}-${statsNgoc.Q2PreviousCumulative}}{${statsNgoc.Q2Frequency}} \\cdot(${statsNgoc.Q2Range.split(";")[1].replace(")", "")}-${statsNgoc.Q2Range.split(";")[0].replace("[", "")})\\approx ${(statsNgoc.Q2).toFixed(2)}$$\n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil((3 * (totalStudentsA + 1)) / 4)}}}$ nằm trong nhóm có khoảng $[${statsA.Q3Range.split(";")[0].replace("[", "")};${statsA.Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${statsA.Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudentsA}}{4}-${statsA.Q3PreviousCumulative}}{${statsA.Q3Frequency}} \\cdot(${statsA.Q3Range.split(";")[1].replace(")", "")}-${statsA.Q3Range.split(";")[0].replace("[", "")})\\approx ${(statsA.Q3).toFixed(2)}$$\n`;

    result += `Tứ phân vị thứ ba của mẫu số liệu gốc là $x_{{${Math.ceil((3 * (totalStudentsNgoc + 1)) / 4)}}}$ nằm trong nhóm có khoảng $[${statsNgoc.Q3Range.split(";")[0].replace("[", "")};${statsNgoc.Q3Range.split(";")[1].replace(")", "")})$.\\\\\n`;
    result += `Do đó, tứ phân vị thứ ba của mẫu số liệu ghép nhóm là\n`;
    result += `$$Q_3=${statsNgoc.Q3Range.split(";")[0].replace("[", "")}+\\dfrac{\\dfrac{3\\cdot${totalStudentsNgoc}}{4}-${statsNgoc.Q3PreviousCumulative}}{${statsNgoc.Q3Frequency}} \\cdot(${statsNgoc.Q3Range.split(";")[1].replace(")", "")}-${statsNgoc.Q3Range.split(";")[0].replace("[", "")})\\approx ${(statsNgoc.Q3).toFixed(2)}$$\n`;


    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta Q_{\\text{A}}=Q_{3,\\text{A}}-Q_{1,\\text{A}} \\approx ${(statsA.Q3).toFixed(2)}-${(statsA.Q1).toFixed(2)}\\approx ${(statsA.IQR).toFixed(2)}$.\\\\\n`;
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm là $\\Delta Q_{\\text{B}}=Q_{3,\\text{B}}-Q_{1,\\text{B}} \\approx ${(statsNgoc.Q3).toFixed(2)}-${(statsNgoc.Q1).toFixed(2)}\\approx ${(statsNgoc.IQR).toFixed(2)}$.\\\\\n`;

    
    result += `}\n\\end{ex}`;

    return result;
}



function thongkeTF_4k_3A() {
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    let frequenciesA = [];
    let frequenciesNgoc = [];
    let totalStudentsA = 0;
    let totalStudentsNgoc = 0;

    // Ensure different results for frequenciesA and frequenciesNgoc
    while (totalStudentsA % 4 !== 3 || totalStudentsNgoc !== totalStudentsA || JSON.stringify(frequenciesA) === JSON.stringify(frequenciesNgoc)) {
        frequenciesA.length = 0;
        frequenciesNgoc.length = 0;
        totalStudentsA = 0;
        totalStudentsNgoc = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6;
            const frequencyNgoc = Math.floor(Math.random() * 6) + 6;
            frequenciesA.push(frequencyA);
            frequenciesNgoc.push(frequencyNgoc);
            totalStudentsA += frequencyA;
            totalStudentsNgoc += frequencyNgoc;
        }
    }

    function tinhToanThongKe(frequencies, totalStudents) {
        const representativeValues = heightRanges.map(range => {
            if (!range) return 0;
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
        let Q1Range, Q2Range, Q3Range;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (!Q1 && cumulativeFrequency >= positionQ1) {
                Q1Range = heightRanges[i];
                Q1 = representativeValues[i];
            }
            if (!Q2 && cumulativeFrequency >= positionQ2) {
                Q2Range = heightRanges[i];
                Q2 = representativeValues[i];
            }
            if (!Q3 && cumulativeFrequency >= positionQ3) {
                Q3Range = heightRanges[i];
                Q3 = representativeValues[i];
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const modeRange = heightRanges[modeIndex];
        let mode = 0;
        if (modeRange) {
            const u_m_mode = parseInt(modeRange.split(";")[0].replace("[", ""));
            const u_m1_mode = parseInt(modeRange.split(";")[1].replace(")", ""));
            const n_m = frequencies[modeIndex];
            const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
            const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
            mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
        }

        return {
            mean,
            variance,
            standardDeviation,
            Q1,
            Q1Range,
            Q2,
            Q2Range,
            Q3,
            Q3Range,
            IQR,
            lowerOutlierBound,
            upperOutlierBound,
            mode,
            modeRange,
            range: Math.max(...representativeValues) - Math.min(...representativeValues),
            representativeValues
        };
    }

    let statsA, statsNgoc;
    let success = false;

    while (!success) {
        try {
            statsA = tinhToanThongKe(frequenciesA, totalStudentsA);
            statsNgoc = tinhToanThongKe(frequenciesNgoc, totalStudentsNgoc);
            success = true; // Nếu không có lỗi, đặt success thành true để thoát khỏi vòng lặp
        } catch (error) {
            console.error("Error occurred during calculation: ", error);
        }
    }

    const compare = (a, b) => a > b ? "\\True " : "";

    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Cho bảng số liệu của hai mẫu A và mẫu B như sau. Xét tính đúng sai các khẳng định sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Mẫu B & ${frequenciesNgoc.join(' & ')} \\\\\n`;   
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;              
    result += `\\end{center}\n`;

    result += `\\choiceTFn\n`;
    result += `{ ${compare(statsNgoc.mean, statsA.mean)} $\\overline{x}_{\\text{B}} > \\overline{x}_{\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.standardDeviation, statsA.standardDeviation)} $S_{\\text{B}} > S_{\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.Q2, statsA.Q2)} $Q_{2,\\text{B}} > Q_{2,\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.IQR, statsA.IQR)} $\\Delta Q_{\\text{B}} > \\Delta Q_{\\text{A}} $}\n`;
  
    result += `\\loigiai{\n`;

    result += `\\textbf{Mẫu số liệu của A:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{A}}=\\dfrac{${frequenciesA.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsA}}\\approx ${(statsA.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{A}}=\\dfrac{1}{${totalStudentsA}}(${frequenciesA.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesA.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsA}} \\right)^2\\approx ${(statsA.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{A}}\\approx\\sqrt{${(statsA.variance).toFixed(2)}}\\approx ${(statsA.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{A}}=${statsA.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{A}}=${statsA.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Mẫu số liệu của B:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesNgoc.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{B}}=\\dfrac{${frequenciesNgoc.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsNgoc}}\\approx ${(statsNgoc.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{B}}=\\dfrac{1}{${totalStudentsNgoc}}(${frequenciesNgoc.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesNgoc.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsNgoc}} \\right)^2\\approx ${(statsNgoc.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{B}}\\approx\\sqrt{${(statsNgoc.variance).toFixed(2)}}\\approx ${(statsNgoc.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{B}}=${statsNgoc.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{B}}=${statsNgoc.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Tính toán các tứ phân vị:}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_1=${statsA.Q1.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q1Range}) \n`;
    result += `Tứ phân vị thứ nhất của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_1=${statsNgoc.Q1.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q1Range}) \n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_2=${statsA.Q2.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q2Range}) \n`;
    result += `Trung vị của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_2=${statsNgoc.Q2.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q2Range}) \n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_3=${statsA.Q3.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q3Range}) \n`;
    result += `Tứ phân vị thứ ba của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_3=${statsNgoc.Q3.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q3Range}) \n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm A là $\\Delta Q_{\\text{A}}=Q_{3,\\text{A}}-Q_{1,\\text{A}} \\approx ${(statsA.Q3).toFixed(2)}-${(statsA.Q1).toFixed(2)}\\approx ${(statsA.IQR).toFixed(2)}$.\\\\\n`;
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm B là $\\Delta Q_{\\text{B}}=Q_{3,\\text{B}}-Q_{1,\\text{B}} \\approx ${(statsNgoc.Q3).toFixed(2)}-${(statsNgoc.Q1).toFixed(2)}\\approx ${(statsNgoc.IQR).toFixed(2)}$.\\\\\n`;

    result += `}\n\\end{ex}`;

    return result;
}
function thongkeTF_4k_3B() {
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    let frequenciesA = [];
    let frequenciesNgoc = [];
    let totalStudentsA = 0;
    let totalStudentsNgoc = 0;

    // Ensure different results for frequenciesA and frequenciesNgoc
    while (totalStudentsA % 4 !== 3 || totalStudentsNgoc !== totalStudentsA || JSON.stringify(frequenciesA) === JSON.stringify(frequenciesNgoc)) {
        frequenciesA.length = 0;
        frequenciesNgoc.length = 0;
        totalStudentsA = 0;
        totalStudentsNgoc = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6;
            const frequencyNgoc = Math.floor(Math.random() * 6) + 6;
            frequenciesA.push(frequencyA);
            frequenciesNgoc.push(frequencyNgoc);
            totalStudentsA += frequencyA;
            totalStudentsNgoc += frequencyNgoc;
        }
    }

    function tinhToanThongKe(frequencies, totalStudents) {
        const representativeValues = heightRanges.map(range => {
            if (!range) return 0;
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
        let Q1Range, Q2Range, Q3Range;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (!Q1 && cumulativeFrequency >= positionQ1) {
                Q1Range = heightRanges[i];
                Q1 = representativeValues[i];
            }
            if (!Q2 && cumulativeFrequency >= positionQ2) {
                Q2Range = heightRanges[i];
                Q2 = representativeValues[i];
            }
            if (!Q3 && cumulativeFrequency >= positionQ3) {
                Q3Range = heightRanges[i];
                Q3 = representativeValues[i];
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const modeRange = heightRanges[modeIndex];
        let mode = 0;
        if (modeRange) {
            const u_m_mode = parseInt(modeRange.split(";")[0].replace("[", ""));
            const u_m1_mode = parseInt(modeRange.split(";")[1].replace(")", ""));
            const n_m = frequencies[modeIndex];
            const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
            const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
            mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
        }

        return {
            mean,
            variance,
            standardDeviation,
            Q1,
            Q1Range,
            Q2,
            Q2Range,
            Q3,
            Q3Range,
            IQR,
            lowerOutlierBound,
            upperOutlierBound,
            mode,
            modeRange,
            range: Math.max(...representativeValues) - Math.min(...representativeValues),
            representativeValues
        };
    }

    let statsA, statsNgoc;
    let success = false;

    while (!success) {
        try {
            statsA = tinhToanThongKe(frequenciesA, totalStudentsA);
            statsNgoc = tinhToanThongKe(frequenciesNgoc, totalStudentsNgoc);
            success = true; // Nếu không có lỗi, đặt success thành true để thoát khỏi vòng lặp
        } catch (error) {
            console.error("Error occurred during calculation: ", error);
        }
    }

    const compare = (a, b) => a > b ? "\\True " : "";

    const relativeError = (Math.abs(statsNgoc.standardDeviation - statsA.standardDeviation) / statsA.standardDeviation * 100).toFixed(3);

    // Thêm số ngẫu nhiên 0.5 hoặc -0.5 để tạo ra kết quả đúng/sai ngẫu nhiên
    const randomAdjustment = Math.random() < 0.5 ? 0.5 : -0.5;
    const adjustedRelativeError = (parseFloat(relativeError) + randomAdjustment).toFixed(3);

    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Cho bảng số liệu của hai mẫu A và mẫu B như sau. Xét tính đúng sai các khẳng định sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Mẫu B & ${frequenciesNgoc.join(' & ')} \\\\\n`;   
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;              
    result += `\\end{center}\n`;
 
    result += `\\choiceTFn\n`;
    result += `{ ${compare(statsNgoc.mean, statsA.mean)} $\\overline{x}_{\\text{B}} > \\overline{x}_{\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.standardDeviation, statsA.standardDeviation)} $S_{\\text{B}} > S_{\\text{A}} $}\n`;
    result += `{ ${compare(adjustedRelativeError, relativeError)} Sai số tương đối của độ lệch chuẩn nhỏ hơn $${adjustedRelativeError}\\% $}\n`; 
    result += `{ ${compare(statsNgoc.IQR, statsA.IQR)} $\\Delta Q_{\\text{B}} > \\Delta Q_{\\text{A}} $}\n`; 
  
    result += `\\loigiai{\n`;

    result += `\\textbf{Mẫu số liệu của A:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{A}}=\\dfrac{${frequenciesA.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsA}}\\approx ${(statsA.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{A}}=\\dfrac{1}{${totalStudentsA}}(${frequenciesA.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesA.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsA}} \\right)^2\\approx ${(statsA.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{A}}\\approx\\sqrt{${(statsA.variance).toFixed(2)}}\\approx ${(statsA.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{A}}=${statsA.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{A}}=${statsA.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Mẫu số liệu của B:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesNgoc.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{B}}=\\dfrac{${frequenciesNgoc.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsNgoc}}\\approx ${(statsNgoc.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{B}}=\\dfrac{1}{${totalStudentsNgoc}}(${frequenciesNgoc.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesNgoc.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsNgoc}} \\right)^2\\approx ${(statsNgoc.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{B}}\\approx\\sqrt{${(statsNgoc.variance).toFixed(2)}}\\approx ${(statsNgoc.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{B}}=${statsNgoc.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{B}}=${statsNgoc.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Tính toán các tứ phân vị:}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_1=${statsA.Q1.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q1Range}) \n`;
    result += `Tứ phân vị thứ nhất của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_1=${statsNgoc.Q1.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q1Range}) \n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_2=${statsA.Q2.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q2Range}) \n`;
    result += `Trung vị của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_2=${statsNgoc.Q2.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q2Range}) \n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_3=${statsA.Q3.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q3Range}) \n`;
    result += `Tứ phân vị thứ ba của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_3=${statsNgoc.Q3.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q3Range}) \n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm A là $\\Delta Q_{\\text{A}}=Q_{3,\\text{A}}-Q_{1,\\text{A}} \\approx ${(statsA.Q3).toFixed(2)}-${(statsA.Q1).toFixed(2)}\\approx ${(statsA.IQR).toFixed(2)}$.\\\\\n`;
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm B là $\\Delta Q_{\\text{B}}=Q_{3,\\text{B}}-Q_{1,\\text{B}} \\approx ${(statsNgoc.Q3).toFixed(2)}-${(statsNgoc.Q1).toFixed(2)}\\approx ${(statsNgoc.IQR).toFixed(2)}$.\\\\\n`;

    result += `Sai số tương đối của độ lệch chuẩn của mẫu số liệu ghép nhóm so với độ lệch chuẩn của mẫu số liệu gốc là \n`;
    result += `$$ \\dfrac{|S_{\\text{B}} - S_{\\text{A}}|}{S_{\\text{A}}} \\cdot 100\\% = \\dfrac{|${statsNgoc.standardDeviation.toFixed(2)} - ${statsA.standardDeviation.toFixed(2)}|}{${statsA.standardDeviation.toFixed(2)}} \\cdot 100\\% \\approx ${relativeError}\\%$$\n`;

    result += `}\n\\end{ex}`;

    return result;
}
function thongkeTF_4k_2() {
    const startHeight = Math.floor(Math.random() * 30) + 1;
    const numRanges = Math.floor(Math.random() * 3) + 5;

    const heightRanges = [];
    for (let i = 0; i < numRanges; i++) {
        const rangeStart = startHeight + i * 5;
        const rangeEnd = rangeStart + 5;
        heightRanges.push(`[${rangeStart};${rangeEnd})`);
    }

    let frequenciesA = [];
    let frequenciesNgoc = [];
    let totalStudentsA = 0;
    let totalStudentsNgoc = 0;

    // Ensure different results for frequenciesA and frequenciesNgoc
    while (totalStudentsA % 4 !== 2 || totalStudentsNgoc !== totalStudentsA || JSON.stringify(frequenciesA) === JSON.stringify(frequenciesNgoc)) {
        frequenciesA.length = 0; 
        frequenciesNgoc.length = 0;
        totalStudentsA = 0;
        totalStudentsNgoc = 0;

        for (let i = 0; i < numRanges; i++) {
            const frequencyA = Math.floor(Math.random() * 6) + 6;
            const frequencyNgoc = Math.floor(Math.random() * 6) + 6;
            frequenciesA.push(frequencyA);
            frequenciesNgoc.push(frequencyNgoc);
            totalStudentsA += frequencyA;
            totalStudentsNgoc += frequencyNgoc;
        }
    }

    function tinhToanThongKe(frequencies, totalStudents) {
        const representativeValues = heightRanges.map(range => {
            if (!range) return 0;
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
        let Q1Range, Q2Range, Q3Range;

        for (let i = 0; i < frequencies.length; i++) {
            cumulativeFrequency += frequencies[i];
            if (!Q1 && cumulativeFrequency >= positionQ1) {
                Q1Range = heightRanges[i];
                Q1 = representativeValues[i];
            }
            if (!Q2 && cumulativeFrequency >= positionQ2) {
                Q2Range = heightRanges[i];
                Q2 = representativeValues[i];
            }
            if (!Q3 && cumulativeFrequency >= positionQ3) {
                Q3Range = heightRanges[i];
                Q3 = representativeValues[i];
            }
        }

        const IQR = Q3 - Q1;
        const lowerOutlierBound = Q1 - 1.5 * IQR;
        const upperOutlierBound = Q3 + 1.5 * IQR;

        const maxFrequency = Math.max(...frequencies);
        const modeIndex = frequencies.indexOf(maxFrequency);
        const modeRange = heightRanges[modeIndex];
        let mode = 0;
        if (modeRange) {
            const u_m_mode = parseInt(modeRange.split(";")[0].replace("[", ""));
            const u_m1_mode = parseInt(modeRange.split(";")[1].replace(")", ""));
            const n_m = frequencies[modeIndex];
            const n_m_1 = modeIndex > 0 ? frequencies[modeIndex - 1] : 0;
            const n_m_1_next = modeIndex < frequencies.length - 1 ? frequencies[modeIndex + 1] : 0;
            mode = u_m_mode + ((n_m - n_m_1) / ((n_m - n_m_1) + (n_m - n_m_1_next))) * (u_m1_mode - u_m_mode);
        }

        return {
            mean,
            variance,
            standardDeviation,
            Q1,
            Q1Range,
            Q2,
            Q2Range,
            Q3,
            Q3Range,
            IQR,
            lowerOutlierBound,
            upperOutlierBound,
            mode,
            modeRange,
            range: Math.max(...representativeValues) - Math.min(...representativeValues),
            representativeValues
        };
    }

    let statsA, statsNgoc;
    let success = false;

    while (!success) {
        try {
            statsA = tinhToanThongKe(frequenciesA, totalStudentsA);
            statsNgoc = tinhToanThongKe(frequenciesNgoc, totalStudentsNgoc);
            success = true; // Nếu không có lỗi, đặt success thành true để thoát khỏi vòng lặp
        } catch (error) {
            console.error("Error occurred during calculation: ", error);
        }
    }

    const compare = (a, b) => a > b ? "\\True " : "";

    const relativeError = (Math.abs(statsNgoc.standardDeviation - statsA.standardDeviation) / statsA.standardDeviation * 100).toFixed(3);

    // Thêm số ngẫu nhiên 0.5 hoặc -0.5 để tạo ra kết quả đúng/sai ngẫu nhiên
    const randomAdjustment = Math.random() < 0.5 ? 0.5 : -0.5;
    const adjustedRelativeError = (parseFloat(relativeError) + randomAdjustment).toFixed(3);

    let result = `\\begin{ex}%[2D4H2-2]\n`;
    result += `Cho bảng số liệu của hai mẫu A và mẫu B như sau. Xét tính đúng sai các khẳng định sau\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Mẫu A & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline Mẫu B & ${frequenciesNgoc.join(' & ')} \\\\\n`;   
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;              
    result += `\\end{center}\n`;
 
    result += `\\choiceTFn\n`;
    result += `{ ${compare(statsNgoc.mean, statsA.mean)} $\\overline{x}_{\\text{B}} > \\overline{x}_{\\text{A}} $}\n`;
    result += `{ ${compare(statsNgoc.standardDeviation, statsA.standardDeviation)} $S_{\\text{B}} > S_{\\text{A}} $}\n`;
    result += `{ ${compare(adjustedRelativeError, relativeError)} Sai số tương đối của độ lệch chuẩn nhỏ hơn $${adjustedRelativeError}\\% $}\n`; 
    result += `{ ${compare(statsNgoc.IQR, statsA.IQR)} $\\Delta Q_{\\text{B}} > \\Delta Q_{\\text{A}} $}\n`; 
  
    result += `\\loigiai{\n`;

    result += `\\textbf{Mẫu số liệu của A:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesA.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{A}}=\\dfrac{${frequenciesA.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsA}}\\approx ${(statsA.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{A}}=\\dfrac{1}{${totalStudentsA}}(${frequenciesA.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesA.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsA}} \\right)^2\\approx ${(statsA.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{A}}\\approx\\sqrt{${(statsA.variance).toFixed(2)}}\\approx ${(statsA.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{A}}=${statsA.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{A}}=${statsA.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Mẫu số liệu của B:}\n`;
    result += `\\begin{center}\n`;
    result += `\\begin{tabular}{|c|c|c|c|c|c${numRanges > 5 ? '|c'.repeat(numRanges - 5) : ''}|}\n`;
    result += `\\hline Khoảng giá trị & ${heightRanges.map(range => `{${range}}`).join(' & ')} \\\\\n`;
    result += `\\hline Giá trị đại diện & ${heightRanges.map(range => {
        if (!range) return '';
        return (parseInt(range.split(";")[0].replace("[", "")) + 2.5).toFixed(1);
    }).join(' & ')} \\\\\n`;
    result += `\\hline Tần Số & ${frequenciesNgoc.join(' & ')} \\\\\n`;
    result += `\\hline\n`;
    result += `\\end{tabular}\n`;
    result += `\\end{center}\n`;

    result += `Số trung bình của mẫu số liệu ghép nhóm là \n`;
    result += `$$ \\overline{x}_{\\text{B}}=\\dfrac{${frequenciesNgoc.map((freq, index) => `${freq}\\cdot${heightRanges[index].split(";")[0].replace("[", "")}+2.5`).join('+')}}{${totalStudentsNgoc}}\\approx ${(statsNgoc.mean).toFixed(2)}. $$\n`;
    result += `Phương sai của mẫu số liệu ghép nhóm là  \n`;
    result += `$$ S^2_{\\text{B}}=\\dfrac{1}{${totalStudentsNgoc}}(${frequenciesNgoc.map((freq, index) => `${freq}\\cdot(${heightRanges[index].split(";")[0].replace("[", "")}+2.5)^2`).join('+')})-\\left(\\dfrac{${frequenciesNgoc.reduce((acc, freq, index) => acc + freq * (parseInt(heightRanges[index].split(";")[0].replace("[", "")) + 2.5), 0)}}{${totalStudentsNgoc}} \\right)^2\\approx ${(statsNgoc.variance).toFixed(2)}$$\n`;
    result += `Độ lệch chuẩn của mẫu số liệu ghép nhóm là \n`;
    result += `$$ S_{\\text{B}}\\approx\\sqrt{${(statsNgoc.variance).toFixed(2)}}\\approx ${(statsNgoc.standardDeviation).toFixed(2)}$$ \n`;
    result += `Khoảng biến thiên của mẫu số liệu ghép nhóm là $ R_{\\text{B}}=${statsNgoc.range.toFixed(2)}$.\\\\\n`;
    result += `Trung vị của mẫu số liệu ghép nhóm là $ Q_{2,\\text{B}}=${statsNgoc.Q2.toFixed(2)}$.\\\\\n`;

    result += `\\textbf{Tính toán các tứ phân vị:}\n`;

    // Xác định tứ phân vị thứ nhất (Q1)
    result += `Tứ phân vị thứ nhất của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_1=${statsA.Q1.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q1Range}) \n`;
    result += `Tứ phân vị thứ nhất của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_1=${statsNgoc.Q1.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q1Range}) \n`;

    // Xác định trung vị (Q2)
    result += `Trung vị của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_2=${statsA.Q2.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q2Range}) \n`;
    result += `Trung vị của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_2=${statsNgoc.Q2.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q2Range}) \n`;

    // Xác định tứ phân vị thứ ba (Q3)
    result += `Tứ phân vị thứ ba của mẫu số liệu ghép nhóm A là \n`;
    result += `$$Q_3=${statsA.Q3.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsA.Q3Range}) \n`;
    result += `Tứ phân vị thứ ba của mẫu số liệu ghép nhóm B là \n`;
    result += `$$Q_3=${statsNgoc.Q3.toFixed(2)}$$\\text{ (thuộc nhóm } ${statsNgoc.Q3Range}) \n`;

    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm A là $\\Delta Q_{\\text{A}}=Q_{3,\\text{A}}-Q_{1,\\text{A}} \\approx ${(statsA.Q3).toFixed(2)}-${(statsA.Q1).toFixed(2)}\\approx ${(statsA.IQR).toFixed(2)}$.\\\\\n`;
    result += `Vậy khoảng tứ phân vị của mẫu số liệu ghép nhóm B là $\\Delta Q_{\\text{B}}=Q_{3,\\text{B}}-Q_{1,\\text{B}} \\approx ${(statsNgoc.Q3).toFixed(2)}-${(statsNgoc.Q1).toFixed(2)}\\approx ${(statsNgoc.IQR).toFixed(2)}$.\\\\\n`;

    result += `Sai số tương đối của độ lệch chuẩn của mẫu số liệu ghép nhóm so với độ lệch chuẩn của mẫu số liệu gốc là \n`;
    result += `$$ \\dfrac{|S_{\\text{B}} - S_{\\text{A}}|}{S_{\\text{A}}} \\cdot 100\\% = \\dfrac{|${statsNgoc.standardDeviation.toFixed(2)} - ${statsA.standardDeviation.toFixed(2)}|}{${statsA.standardDeviation.toFixed(2)}} \\cdot 100\\% \\approx ${relativeError}\\%$$\n`;

    result += `}\n\\end{ex}`;

    return result;
}



 
