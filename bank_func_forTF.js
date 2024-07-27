// Hàm xử lý dấu + -, - - và - +
function cleanUpOutput(output) {
    return output.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
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
            \\itemch Hàm số đã cho đồng biến trên $(0;${x2Latex})$.
            \\itemch Hàm số đã cho nghịch biến trên $(${x1};${x2Latex})$.
            \\itemch Hàm số $g(x)=f(x)+${d}$ đồng biến trên $(-\\infty;0)$.
        \\end{itemchoice}
    `;

    // Tạo các lựa chọn cho câu hỏi
    let choices = [
        { text: "Hàm số không nghịch biến trên $\\mathbb{R}$", isTrue: false },
        { text: `Hàm số đã cho đồng biến trên $(0;${x2Latex})$`, isTrue: true },
        { text: `Hàm số đã cho nghịch biến trên $(0;${x2Latex})$`, isTrue: true },
        { text: `Hàm số $g(x)=f(x)+${c}$ đồng biến trên $(-\\infty;0)$`, isTrue: true }
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
