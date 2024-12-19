// Hàm tính ước chung lớn nhất (GCD) bằng thuật toán Euclid
function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}
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

function cleanUpOutput2(output) {
    return output
        .replace(/=\s*\+\s*/g, ' = ') // Remove "+ " right after "="
        .replace(/\+\s*-/g, '-') // Change "+ -" to "-"
        .replace(/-\s*-/g, '+') // Change "- -" to "+"
        .replace(/-\s*\+/g, '-') // Change "- +" to "-"
        .replace(/\+\s*\+/g, '+') // Change "+ +" to "+"
        .replace(/\{\s*\+\s*/g, '{') // Remove "+" right after "{"
        .replace(/^\+\s*/g, ''); // Remove leading "+"
}

// Hàm chuyển phân số ra LaTeX và tối giản phân số
function formatFraction(numerator, denominator) {
    const gcdValue = gcd(Math.abs(numerator), Math.abs(denominator));
    let simplifiedNumerator = numerator / gcdValue;
    let simplifiedDenominator = denominator / gcdValue;

    // Nếu mẫu số là âm, đổi dấu cả tử và mẫu để giữ mẫu số luôn dương
    if (simplifiedDenominator < 0) {
        simplifiedNumerator = -simplifiedNumerator;
        simplifiedDenominator = -simplifiedDenominator;
    }

    // Nếu mẫu số là 1 hoặc -1, trả về số nguyên
    if (simplifiedDenominator === 1 || simplifiedDenominator === -1) {
        return simplifiedNumerator.toString();
    }

    return `\\dfrac{${simplifiedNumerator}}{${simplifiedDenominator}}`;
}




function gioihan_day_mu(e) {
    const exercises = [];
    for (let i = 0; i < 1; i++) { 
        // Randomize coefficients and bases
        const a = Math.floor(Math.random() * 20 + 10); // Random từ 10 đến 30
        const b = Math.floor(Math.random() * 4 + 2);  // Random từ 2 đến 6
        const c = Math.floor(Math.random() * 5 + 2); // Random từ 2 đến 11
        const d = Math.floor(Math.random() * 3 + 1);  // Random từ 1 đến 3
        const e = Math.floor(Math.random() * 3 + 1);  // Random từ 1 đến 3

        // Problem statement
        const problem = `Tính   $\\lim \\dfrac{${a} - ${b}.${c}^{n+${d}}}{${c*a} + ${b}.${c}^{n-${e}}}$`;

        // Short answer
        const shortAnswer = `${Math.pow(c, d + e)}`;

        // Solution
        const solution = `
            \\begin{align*}
                &\\text{Đặt } a_n = \\dfrac{${a} - ${b}.${c}^{n+${d}}}{${c}^n + ${b}.${c}^{n-${e}}}.\\\\
                &\\text{Xét giới hạn của tử và mẫu khi } n \\to \\infty:\\\\
                &\\text{Tử: } ${a} - ${b}.${c}^{n+${d}} \\approx -${b}.${c}^{n+${d}}.\\\\
                &\\text{Mẫu: } ${c}^n + ${b}.${c}^{n-${e}} \\approx ${b}.${c}^n.\\\\
                &\\text{Do } n \\to \\infty, \\text{ tỷ số là: } \\dfrac{-${b}.${c}^{n+${d}}}{${c}^n} = ${c}^{d+e}.\\\\
                &\\text{Vậy: } \\lim a_n = ${shortAnswer}.
            \\end{align*}
        `;

        // Generate LaTeX
        exercises.push(`
\\begin{ex}
    ${problem}
    \\shortans{${shortAnswer}}
    \\loigiai{
        ${solution}
    }
\\end{ex}
        `);
    }
    return exercises.join("\n");
}
function gioihan_day_lienhop_can_tu() {
    // Randomize coefficients
    const perfectSquares = [1, 4, 9, 16, 25]; // Số chính phương
    const a = perfectSquares[Math.floor(Math.random() * perfectSquares.length)]; // Lấy ngẫu nhiên từ danh sách
    const b = Math.floor(Math.random() * 10 + 1); // hệ số n (1-10)
    const c = Math.floor(Math.random() * 5 + 1); // hằng số (1-5)
    const d = Math.floor(Math.random() * 5 + 1); // hằng số cộng thêm (1-5)

    // Problem statement
    const problem = `Tính giới hạn của dãy số $A=\\lim \\left(\\sqrt{${a} n^2+${b}n+${c}}-${Math.sqrt(a)} n+${d}\\right)$, kết quả làm tròn một chữ số thập phân (nếu có).`;

    // Short answer
    const shortAnswer = `${(b / (2 * Math.sqrt(a)) + d).toFixed(1)}`;

    // Solution
    const solution = `
        Ta có:
        \\[
        A = \\lim_{n \\to \\infty} \\left(\\sqrt{${a}n^2 + ${b}n + ${c}} - ${Math.sqrt(a)}n + ${d}\\right).
        \\]

        Để khử căn, nhân và chia với biểu thức liên hợp:
        \\[
        A = \\lim_{n \\to \\infty} \\frac{\\left(\\sqrt{${a}n^2 + ${b}n + ${c}} - ${Math.sqrt(a)}n + ${d}\\right)\\left(\\sqrt{${a}n^2 + ${b}n + ${c}} + ${Math.sqrt(a)}n - ${d}\\right)}{\\sqrt{${a}n^2 + ${b}n + ${c}} + ${Math.sqrt(a)}n - ${d}}.
        \\]

        Tử số là:
        \\[
        \\left(\\sqrt{${a}n^2 + ${b}n + ${c}}\\right)^2 - \\left(${Math.sqrt(a)}n\\right)^2 = ${a}n^2 + ${b}n + ${c} - ${a}n^2 = ${b}n + ${c}.
        \\]

        Do đó:
        \\[
        A = \\lim_{n \\to \\infty} \\frac{${b}n + ${c}}{\\sqrt{${a}n^2 + ${b}n + ${c}} + ${Math.sqrt(a)}n - ${d}}.
        \\]

        Chia cả tử và mẫu cho $n$:
        \\[
        A = \\lim_{n \\to \\infty} \\frac{${b} + \\frac{${c}}{n}}{\\sqrt{${a} + \\frac{${b}}{n} + \\frac{${c}}{n^2}} + ${Math.sqrt(a)} - \\frac{${d}}{n}}.
        \\]

        Khi $n \\to \\infty$, các số $\\frac{${b}}{n}$, $\\frac{${c}}{n^2}$, và $\\frac{${d}}{n}$ đều tiến về $0$, nên:
        \\[
        A = \\frac{${b}}{2\\sqrt{${a}}} + ${d}.
        \\]

        Vậy:
        \\[
        A = ${shortAnswer}.
        \\]
    `;

    // Return LaTeX formatted problem
    return `
\\begin{ex}
    ${problem}
    \\shortans{${shortAnswer}}
    \\loigiai{
        ${solution}
    }
\\end{ex}
    `;
}
function gioihan_day_tong_vohan_phanthuc() {
    // Randomize coefficients
    const a = Math.floor(Math.random() * 1 + 1); // hệ số n (1-5)
    const b = Math.floor(Math.random() * 4 + 1); // hằng số b (1-4)
    const c = Math.floor(Math.random() * 4 + 5); // hằng số c (5-8)

    // Ensure that c - b is not zero and positive
    if (c - b === 0) {
        return gioihan_day_tong_vohan_phanthuc(); // Rerun the function to get new c
    }           

    // Calculate the short answer using the correct formula
    const shortAnswerValue = 1 / (a * (c - b) * (a + b));
    const shortAnswer = `${shortAnswerValue.toFixed(2)}`;           

    // Problem statement: list the first two terms, ..., last term
    const firstTerm = `\\dfrac{1}{${a} \\cdot 1 + ${b}}\\left(${a} \\cdot 1 + ${c}\\right)`;
    const secondTerm = `\\dfrac{1}{${a} \\cdot 2 + ${b}}\\left(${a} \\cdot 2 + ${c}\\right)`;
    const lastTerm = `\\dfrac{1}{${a}n + ${b}}\\left(${a}n + ${c}\\right)`;

    const problem = `
        Tính giới hạn 
        \\[
            \\lim_{n \\to \\infty} \\left[ \\dfrac{1}{${a} \\cdot 1 + ${b}}\\cdot \\dfrac{1}{${a} \\cdot 1 + ${c}} + 
            \\dfrac{1}{${a} \\cdot 2 + ${b}}\\cdot \\dfrac{1}{${a} \\cdot 2 + ${c}} + \\ldots + 
            \\dfrac{1}{${a}n + ${b}}\\cdot \\dfrac{1}{${a}n + ${c}} \\right],
        \\]
        kết quả làm tròn một chữ số thập phân.
    `;

    // Solution
    const solution = `
        Ta xét tổng 
        \\[
            S = \\sum_{k=1}^{n} \\dfrac{1}{(${a}k + ${b})(${a}k + ${c})}.
        \\]

        Phân tích phân số:
        \\[
            \\dfrac{1}{(${a}k + ${b})(${a}k + ${c})} = \\dfrac{1}{${a}(c - b)} \\left( \\dfrac{1}{${a}k + ${b}} - \\dfrac{1}{${a}k + ${c}} \\right).
        \\]

        Do đó, tổng $S$ trở thành:
        \\[
            S = \\dfrac{1}{${a}(c - b)} \\sum_{k=1}^{n} \\left( \\dfrac{1}{${a}k + ${b}} - \\dfrac{1}{${a}k + ${c}} \\right).
        \\]

        Xét từng cặp số hạng trong tổng:
        \\[
            S = \\dfrac{1}{${a}(c - b)} \\left( \\dfrac{1}{${a} \\cdot 1 + ${b}} - \\dfrac{1}{${a} \\cdot 1 + ${c}} + 
            \\dfrac{1}{${a} \\cdot 2 + ${b}} - \\dfrac{1}{${a} \\cdot 2 + ${c}} + \\ldots + 
            \\dfrac{1}{${a}n + ${b}} - \\dfrac{1}{${a}n + ${c}} \\right).
        \\]

        Đây là một tổng lồng nhau (telescoping sum), các số hạng trung gian sẽ triệt tiêu nhau, chỉ còn lại:
        \\[
            S = \\dfrac{1}{${a}(c - b)} \\left( \\dfrac{1}{${a} \\cdot 1 + ${b}} - \\dfrac{1}{${a}n + ${c}} \\right).
        \\]

        Khi $n \\to \\infty$, ta có:
        \\[
            \\dfrac{1}{${a}n + ${c}} \\to 0.
        \\]

        Vậy giới hạn của tổng là:
        \\[
            \\lim_{n \\to \\infty} S = \\dfrac{1}{${a}(c - b)} \\cdot \\dfrac{1}{${a} + ${b}} = \\dfrac{1}{${a}(c - b)(${a} + ${b})} = ${shortAnswer}.
        \\]

        Vậy:
        \\[
            \\lim \\left[ \\dfrac{1}{${a} \\cdot 1 + ${b}}\\cdot \\dfrac{1}{${a} \\cdot 1 + ${c}} + 
            \\dfrac{1}{${a} \\cdot 2 + ${b}}\\cdot \\dfrac{1}{${a} \\cdot 2 + ${c}} + \\ldots + 
            \\dfrac{1}{${a}n + ${b}}\\cdot \\dfrac{1}{${a}n + ${c}} \\right] = ${shortAnswer}.
        \\]
    `;

    // Return LaTeX formatted problem
    return `\\begin{ex}${problem}\\shortans{${shortAnswer}}
    \\loigiai{
        ${solution}            
    }
\\end{ex}
    `;
}
function gioihan_hamso_vodinh_hai_tren_hai() {
    // Hàm để sinh số nguyên ngẫu nhiên trong khoảng [min, max]
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Hàm làm đẹp biểu thức
    function formatExpression(expression) {
        return expression
            .replace(/\+ -/g, "- ")          // Thay + - thành -
            .replace(/- \+/g, "- ")          // Thay - + thành -
            .replace(/\b1x/g, "x")           // Bỏ số 1 trước x
            .replace(/-1x/g, "-x")           // Bỏ số -1 trước x
            .replace(/\s+/g, " ")            // Xóa khoảng trắng thừa
            .trim();                         // Xóa khoảng trắng đầu/cuối
    }

    // Giá trị x tiến tới
    const xLimit = getRandomInt(1, 5);

    // Sinh các hệ số ngẫu nhiên cho tử số và mẫu số
    const a = getRandomInt(1, 5); // Hệ số của x^2 trong tử
    const b = getRandomInt(-5, 5); // Hệ số của x trong tử
    const c = -(a * xLimit ** 2 + b * xLimit); // Đảm bảo tử số = 0 tại x = xLimit

    const d = getRandomInt(-3, 5); // Hệ số của x^2 trong mẫu
    const e = getRandomInt(-5, 5); // Hệ số của x trong mẫu
    const f = -(d * xLimit ** 2 + e * xLimit); // Đảm bảo mẫu số = 0 tại x = xLimit

    // Biểu thức tử số và mẫu số
    const numerator = formatExpression(`${a}x^2 ${b >= 0 ? "+" : ""} ${b}x ${c >= 0 ? "+" : ""} ${c}`);
    const denominator = formatExpression(`${d}x^2 ${e >= 0 ? "+" : ""} ${e}x ${f >= 0 ? "+" : ""} ${f}`);

    // Đạo hàm của tử số và mẫu số
    const numeratorDerivative = formatExpression(`${2 * a}x ${b >= 0 ? "+" : ""} ${b}`);
    const denominatorDerivative = formatExpression(`${2 * d}x ${e >= 0 ? "+" : ""} ${e}`);

    // Tính đáp án (giá trị giới hạn)
    const answer = (2 * a * xLimit + b) / (2 * d * xLimit + e);
    const roundedAnswer = Math.round(answer * 10) / 10; // Làm tròn 1 chữ số thập phân

    // Tạo bài toán dưới dạng LaTeX
    const problem = `
\\begin{ex}
    Tính $\\lim\\limits_{x \\to ${xLimit}} \\dfrac{${numerator}}{${denominator}}$, kết quả làm tròn một chữ số thập phân.
    \\shortans{${roundedAnswer}}
    \\loigiai{
        
    }
\\end{ex}
    `;

    return problem;
}
function gioihan_hs_vodinh_can_tru_so_chia_x_to_ko() {
    // Hàm để sinh số nguyên ngẫu nhiên trong khoảng [min, max]
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Sinh hệ số ngẫu nhiên
    const k = getRandomInt(1, 10); // Hệ số trong căn thức

    // Tính kết quả giới hạn
    const numerator = k / 2; // Tử số của phân số kết quả
    const denominator = 1; // Mẫu số của phân số kết quả (đơn giản là 1 trong dạng này)
    
    // Tính \(a, b\) và giá trị \(P\)
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)); // Hàm tìm UCLN
    const gcdValue = gcd(numerator, denominator);
    const a = numerator / gcdValue; // Tử số tối giản
    const b = denominator / gcdValue; // Mẫu số tối giản
    const P = a ** 2 + b ** 2; // Giá trị P = a^2 + b^2

    // Tạo bài toán dưới dạng LaTeX
    const problem = `
\\begin{ex}
    Biết $\\lim\\limits_{x \\to 0} \\dfrac{\\sqrt{${k}x+1}-1}{x}=\\dfrac{a}{b}$, trong đó $a, b$ là các số nguyên dương và phân số $\\dfrac{a}{b}$ tối giản. Tính giá trị biểu thức $P=a^2+b^2$.
    \\shortans{${P}}
    \\loigiai{
     
    }
\\end{ex}
    `;

    return problem;
}
function gioihan_hs_vodinh_can_tru_so_chia_bachai() {
    // Hàm để sinh số nguyên ngẫu nhiên trong khoảng [min, max]
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Hàm tìm ước chung lớn nhất (UCLN) để tối giản phân số
    function gcd(a, b) {
        if (!b) return a;
        return gcd(b, a % b);
    }

    // Hàm làm đẹp biểu thức (nếu cần thiết)
    function formatExpression(expression) {
        return expression
            .replace(/\+ -/g, "- ")          // Thay + - thành -
            .replace(/- \+/g, "- ")          // Thay - + thành -
            .replace(/\b1x/g, "x")          // Bỏ số 1 trước x  
            .replace(/{1x\b/g, "{x") 
            .replace(/\b-1x\b/g, "-x")        // Bỏ số -1 trước x
            .replace(/\s+/g, " ")             // Xóa khoảng trắng thừa
            .replace(/\b(\d+)\s*\\cdot\s*(\d+)\b/g, (_, p1, p2) => (parseInt(p1) * parseInt(p2)).toString()) // Tính các phép nhân cố định
            .trim();                          // Xóa khoảng trắng đầu/cuối
    }

    // Chọn x0 cụ thể
    const x0 = getRandomInt(1, 5); // Bạn có thể thay đổi phạm vi nếu muốn

    // Sinh các hệ số ngẫu nhiên cho tử số
    const a = getRandomInt(1, 5); // Hệ số của x trong căn
    const b = getRandomInt(1, 5); // Hằng số trong tử số (b > 0 để đảm bảo sqrt(b^2) = b)

    // Sinh các hệ số ngẫu nhiên cho mẫu số
    const c = getRandomInt(1, 3); // Hệ số của x^2 trong mẫu
    const d = getRandomInt(1, 3); // Hệ số của x trong mẫu

    // Tính các hằng số để đảm bảo tử số và mẫu số bằng 0 tại x = x0
    // Tử số: sqrt(a * x0 + b^2 - a * x0) - b = sqrt(b^2) - b = 0
    // Mẫu số: c * x0^2 + d * x0 - c * x0^2 - d * x0 = 0

    // Tính giá trị giới hạn sử dụng quy tắc L'Hôpital
    // Đạo hàm tử số tại x = x0: a / (2 * b)        
    // Đạo hàm mẫu số tại x = x0: 2 * c * x0 + d

    // Để làm việc với số nguyên, nhân cả tử số và mẫu số với 2 * b
    const numeratorScaled = a; // a / (2 * b) * 2 * b = a
    const denominatorScaled = 2 * b * (2 * c * x0 + d); // [2 * b] * [2 * c * x0 + d]

    // Tối giản phân số numeratorScaled / denominatorScaled
    const divisor = gcd(numeratorScaled, denominatorScaled);
    const a_final = numeratorScaled / divisor;
    const b_final = denominatorScaled / divisor;

    // Tính P = a_final^2 + b_final^2
    const P = a_final ** 2 + b_final ** 2;

    // Tính toán các hằng số đã nhân với x0 và rút gọn
    const b_squared = b ** 2;
    const a_x0 = a * x0;

    const hs = b_squared - a_x0; // Giá trị số
    const numeratorExprRaw = `\\sqrt{${a}x + ${hs}} - ${b}`; // Rút gọn hs thành số
    const c_x2 = `${c}x^2`;
    const d_x = `${d}x`;
    const c_x0_squared = c * x0 ** 2;
    const d_x0 = d * x0;
    const hss=c_x0_squared+d_x0;
    const denominatorExprValue = c_x0_squared + d_x0;
    const denominatorExprRaw = `${c}x^2 + ${d}x - ${denominatorExprValue}`;
    
    // Tính giá trị của mẫu số sau khi rút gọn
    const denominatorSimplified = (c * x0 ** 2) + (d * x0) - (c * x0 ** 2) - (d * x0); // Luôn bằng 0, nên biểu thức mẫu số lúc ban đầu đã bằng 0

    // Làm đẹp biểu thức 
    const numeratorExpr = formatExpression(numeratorExprRaw);
    const denominatorExpr = formatExpression(denominatorExprRaw);
    // Tạo bài toán dưới dạng LaTeX với các hằng số cụ thể
    const problem = `
\\begin{ex}
    Biết $\\lim\\limits_{x \\to ${x0}} \\dfrac{${numeratorExpr}}{${denominatorExpr}} = \\dfrac{a}{b}$, trong đó $a, b$ là các số nguyên dương và phân số $\\dfrac{a}{b}$ tối giản. Tính giá trị biểu thức $P = a^2 + b^2$.
    \\shortans{${P}}
    \\loigiai{
        
    }
\\end{ex}
    `;
    return problem;
}
function gioihan_ham_xTo_amvocung_mot_chia_mot() {
    // Hàm để sinh số nguyên ngẫu nhiên trong khoảng [min, max]
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Hàm làm gọn biểu thức toán học
    function formatExpression(expression) {
        return expression
            .replace(/\+ 0| - 0/g, "")      // Loại bỏ + 0 hoặc - 0
            .replace(/\b1x\b/g, "x")        // Bỏ số 1 trước x
            .replace(/\+ -/g, "- ")         // Thay + - thành -
            .replace(/- \+/g, "- ")         // Thay - + thành -
            .replace(/\s+/g, " ")           // Xóa khoảng trắng thừa
            .trim();                        // Xóa khoảng trắng đầu/cuối
    }

    // Chọn các hệ số ngẫu nhiên a, b, c, d
    const a = getRandomInt(1, 7); // Hệ số a của tử số
    const b = getRandomInt(-5, 5); // Hệ số b của tử số
    const c = getRandomInt(1, 5); // Hệ số c trong căn
    const d = getRandomInt(-5, 5); // Hệ số d của x trong mẫu 
    const hs1 = c * c; // Bình phương của c 
 
    // Đáp án
    const denominatorConstant = -Math.abs(c) + d; // -|c| + d
    const answer = a / denominatorConstant;

    // Chuẩn bị các chuỗi LaTeX
    const numerator = `${a}x ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}`;
    const denominator = `\\sqrt{${hs1}x^2 ${d >= 0 ? "+ " + d : "- " + Math.abs(d)}} + ${d}x`;

    // Làm gọn các biểu thức
    const formattedNumerator = formatExpression(numerator);
    const formattedDenominator = formatExpression(denominator);

    // Tạo bài toán dưới dạng LaTeX
    const problem = `
\\begin{ex} 
    Giá trị của 
    \\[
    \\lim\\limits_{x \\to -\\infty} \\dfrac{${formattedNumerator}}{${formattedDenominator}}
    \\]
    bằng bao nhiêu? Kết quả làm tròn một chữ số thập phân (nếu có).
    \\shortans{${answer.toFixed(1)}}
    \\loigiai{
        Xét giới hạn:
        \\[
        \\lim\\limits_{x \\to -\\infty} \\dfrac{${formattedNumerator}}{${formattedDenominator}}.
        \\]
        Ta biết khi $x \\to -\\infty$, $\\sqrt{${hs1}x^2} = |${c}||x| = -${Math.abs(c)}x$ (vì $x < 0$). Do đó:
        \\[
        \\sqrt{${hs1}x^2 ${d >= 0 ? "+ " + d : "- " + Math.abs(d)}} \\approx -${Math.abs(c)}x.
        \\]
        Biểu thức trở thành:
        \\[
        \\lim\\limits_{x \\to -\\infty} \\dfrac{${a}x ${b >= 0 ? "+ " + b : "- " + Math.abs(b)}}{-${Math.abs(c)}x + ${d}x}.
        \\]
        Rút gọn, ta được:
        \\[
        \\lim\\limits_{x \\to -\\infty} \\dfrac{${a}}{-|c| + d} = \\dfrac{${a}}{-${Math.abs(c)} + ${d}} = ${answer.toFixed(1)}.
        \\]
    }
\\end{ex}
    `;

    return problem.trim();
}
