// Hàm tìm ước chung lớn nhất (GCD)
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}



// Hàm sinh nguyên hàm dưới dạng LaTeX
function nguyenham_phanthuc_mot_mot(a, b, c, d) {
    if (c === 0) {
        throw new Error("Hệ số c không được bằng 0, vì cx + d phải có dạng hợp lệ.");
    }

    // Hệ số trước ln|cx + d|
    const A = simplifyFraction(a, c);

    // Phần hằng số của nguyên hàm
    const constantPartNumerator = b * c - a * d;
    const constantPartDenominator = c;
    const constantPart = simplifyFraction(constantPartNumerator, constantPartDenominator);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = `\\frac{${A.num}}{${A.den}} x + \\frac{${constantPart.num}}{${constantPart.den}} \\ln|${c}x + ${d}|`;

    integral += " + C"; // Thêm hằng số tích phân

    return integral;
}

// Hàm sinh đề bài
function nguyenham_phan_thuc_mot_mot() {
    // Sinh ngẫu nhiên a, b, c, d trong khoảng 1-7
    const a = Math.floor(Math.random() * 7) + 1;
    const b = Math.floor(Math.random() * 7) + 1;
    const c = Math.floor(Math.random() * 7) + 1; // từ 1 đến 7, c ≠ 0
    const d = Math.floor(Math.random() * 7) + 1;

    // Tính nguyên hàm
    const integral = nguyenham_phanthuc_mot_mot(a, b, c, d);

    // Tính m và n từ nguyên hàm
    const m_fraction = simplifyFraction(a, c); // m = a/c
    const n_fraction = simplifyFraction(b * c - a * d, c); // n = (b*c -a*d)/c

    const m = m_fraction.den !== 1 ? `${m_fraction.num}/${m_fraction.den}` : `${m_fraction.num}`;
    const n = n_fraction.den !== 1 ? `${n_fraction.num}/${n_fraction.den}` : `${n_fraction.num}`;

    const m_plus_n_value = (a / c + (b * c - a * d) / c).toFixed(1);

    // Tạo đề bài dưới dạng LaTeX
    const problem = `\\begin{ex}
Biết hàm số $f(x)=\\dfrac{${a}x + ${b}}{${c}x + ${d}}$ có họ nguyên hàm $F(x)=mx + n\\ln\\left|${c}x + ${d}\\right| + C$. Tính giá trị $m + n$, làm tròn đến hàng phần mười.
\\shortans[oly]{$${m_plus_n_value}$}
\\loigiai{
Ta có
\\[
\\int\\limits \\dfrac{${a}x + ${b}}{${c}x + ${d}} \\, \\mathrm{d}x = ${integral}
\\]
So với dạng $F(x)=mx + n\\ln\\left|${c}x + ${d}\\right| + C$, ta có:
\\[
m = \\dfrac{${m_fraction.num}}{${m_fraction.den}}, \\quad n = \\dfrac{${n_fraction.num}}{${n_fraction.den}}
\\]
Vậy:
\\[
m + n = ${m_plus_n_value}
\\]
}
\\end{ex}
`;

    return problem;
};


// Hàm rút gọn phân số
function simplifyFraction(numerator, denominator) {
    if (denominator === 0) {
        throw new Error("Mẫu số không được bằng 0.");
    }

    // Đảm bảo mẫu số luôn dương
    if (denominator < 0) {
        numerator = -numerator;
        denominator = -denominator;
    }

    const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return {
        num: numerator / commonDivisor,
        den: denominator / commonDivisor
    };
}

// Hàm cộng ba phân số và rút gọn kết quả
function addFractions(frac1, frac2, frac3) {
    const numerator = frac1.num * frac2.den * frac3.den +
                      frac2.num * frac1.den * frac3.den +
                      frac3.num * frac1.den * frac2.den;
    const denominator = frac1.den * frac2.den * frac3.den;
    return simplifyFraction(numerator, denominator);
}

// Hàm sinh nguyên hàm dưới dạng LaTeX cho phân thức tử bậc 2 mẫu bậc 1
function computeIndefiniteIntegral(a, b, c, d, e) {
    if (d === 0) {
        throw new Error("Hệ số d không được bằng 0, vì denominator dx + e phải có dạng hợp lệ.");
    }

    // Tính các hằng số m, n, p theo công thức đã nêu và rút gọn
    const m_fraction = simplifyFraction(a, 2 * d); // m = a / (2d)
    const n_fraction = simplifyFraction(b * d - a * e, d * d); // n = (b d - a e) / d^2
    const p_fraction = simplifyFraction(c * d - b * e, d * d); // p = (c d - b e) / d^2

    // Tính m + n + p dưới dạng phân số đã rút gọn
    const m_plus_n_plus_p_fraction = addFractions(m_fraction, n_fraction, p_fraction);
    const m_plus_n_plus_p_decimal = (m_fraction.num / m_fraction.den + n_fraction.num / n_fraction.den + p_fraction.num / p_fraction.den).toFixed(1);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm m * x^2
    if (m_fraction.num !== 0) {
        if (m_fraction.den !== 1) {
            integral += `\\frac{${m_fraction.num}}{${m_fraction.den}} x^2`;
        } else {
            integral += `${m_fraction.num} x^2`;
        }
    }

    // Thêm n * x
    if (n_fraction.num !== 0) {
        if (n_fraction.num > 0) {
            integral += ` + `;
        } else {
            integral += ` - `;
        }
        const abs_n_num = Math.abs(n_fraction.num);
        const abs_n_den = n_fraction.den;
        if (abs_n_den !== 1) {
            integral += `\\frac{${abs_n_num}}{${abs_n_den}} x`;
        } else {
            integral += `${abs_n_num} x`;
        }
    }

    // Thêm p * ln|dx + e|
    if (p_fraction.num !== 0) {
        if (p_fraction.num > 0) {
            integral += ` + `;
        } else {
            integral += ` - `;
        }
        const abs_p_num = Math.abs(p_fraction.num);
        const abs_p_den = p_fraction.den;
        if (abs_p_den !== 1) {
            integral += `\\frac{${abs_p_num}}{${abs_p_den}} \\ln\\left|${d}x + ${e}\\right|`;
        } else {
            integral += `${abs_p_num} \\ln\\left|${d}x + ${e}\\right|`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        m_fraction,
        n_fraction,
        p_fraction,
        m_plus_n_plus_p_fraction,
        m_plus_n_plus_p_decimal
    };
}

// Hàm sinh đề bài
function nguyenham_phan_thuc_hai_mot() {
    // Sinh ngẫu nhiên a, b, c, d, e trong khoảng 1-7
    const a = Math.floor(Math.random() * 7) + 1;
    const b = Math.floor(Math.random() * 7) + 1;
    const c = Math.floor(Math.random() * 7) + 1;
    const d = Math.floor(Math.random() * 7) + 1; // đảm bảo d ≠ 0
    const e = Math.floor(Math.random() * 7) + 1;

    // Tính nguyên hàm và các hằng số
    const { integral, m_fraction, n_fraction, p_fraction, m_plus_n_plus_p_fraction, m_plus_n_plus_p_decimal } = computeIndefiniteIntegral(a, b, c, d, e);

    // Tạo đề bài dưới dạng LaTeX
    const problem = `
\\begin{ex}
Biết hàm số $f(x)=\\dfrac{${a}x^2 + ${b}x + ${c}}{${d}x + ${e}}$ có họ nguyên hàm $F(x)=mx^2 + nx + p\\ln\\left|${d}x + ${e}\\right| + C$. Tính giá trị $m + n + p$, làm tròn đến hàng phần mười.
\\shortans[oly]{$${m_plus_n_plus_p_decimal}$}
\\loigiai{
Ta có:
\\[
\\int\\limits \\dfrac{${a}x^2 + ${b}x + ${c}}{${d}x + ${e}} \\, dx = ${integral}
\\]
So với dạng $F(x)=mx^2 + nx + p\\ln\\left|${d}x + ${e}\\right| + C$, ta có:
\\[
m = \\dfrac{${m_fraction.num}}{${m_fraction.den}}, \\quad n = \\dfrac{${n_fraction.num}}{${n_fraction.den}}, \\quad p = \\dfrac{${p_fraction.num}}{${p_fraction.den}}
\\]
Vậy:
\\[
m + n + p = \\dfrac{${m_plus_n_plus_p_fraction.num}}{${m_plus_n_plus_p_fraction.den}} \\approx ${m_plus_n_plus_p_decimal}
\\]
}
\\end{ex}
`;

    return problem;
}

// Hàm cộng hai phân số và rút gọn kết quả
function addFractions(frac1, frac2) {
    const numerator = frac1.num * frac2.den + frac2.num * frac1.den;
    const denominator = frac1.den * frac2.den;
    return simplifyFraction(numerator, denominator);
}

// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = 1/[(a x + b)(c x + d)]
function computeIndefiniteIntegral(a, b, c, d) {
    if (a * d === b * c) {
        throw new Error("Hệ số phải thỏa mãn a*d ≠ b*c để phân tích thành phân số đơn giản.");
    }

    // Phân tích thành phân số đơn giản: 1/[(a x + b)(c x + d)] = m/(a x + b) + n/(c x + d)
    // Tìm m và n
    // 1 = m(c x + d) + n(a x + b)
    // => 1 = (m c + n a) x + (m d + n b)
    // Từ đó ta có hệ phương trình:
    // m c + n a = 0
    // m d + n b = 1

    // Giải hệ phương trình để tìm m và n
    // Từ phương trình đầu tiên: m = - (n a) / c
    // Thay vào phương trình thứ hai:
    // - (n a) / c * d + n b = 1
    // n (b - (a d)/c) = 1
    // n = 1 / (b - (a d)/c) = c / (b c - a d)

    const denominatorFraction = b * c - a * d;
    const m_numerator = -a;
    const m_denominator = denominatorFraction;
    const n_numerator = c;
    const n_denominator = denominatorFraction;

    const m_fraction = simplifyFraction(m_numerator, m_denominator);
    const n_fraction = simplifyFraction(n_numerator, n_denominator);

    // Tính m + n dưới dạng phân số đã rút gọn
    const m_plus_n_fraction = addFractions(m_fraction, n_fraction);
    const m_plus_n_decimal = (m_plus_n_fraction.num / m_plus_n_fraction.den).toFixed(1);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm m * ln|a x + b|
    if (m_fraction.num !== 0) {
        if (m_fraction.den !== 1) {
            integral += `\\frac{${m_fraction.num}}{${m_fraction.den}} \\ln|${a}x + ${b}|`;
        } else {
            integral += `${m_fraction.num} \\ln|${a}x + ${b}|`;
        }
    }

    // Thêm n * ln|c x + d|
    if (n_fraction.num !== 0) {
        if (n_fraction.num > 0) {
            integral += ` + `;
        } else {
            integral += ` - `;
        }
        const abs_n_num = Math.abs(n_fraction.num);
        if (n_fraction.den !== 1) {
            integral += `\\frac{${abs_n_num}}{${n_fraction.den}} \\ln|${c}x + ${d}|`;
        } else {
            integral += `${abs_n_num} \\ln|${c}x + ${d}|`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        m_fraction,
        n_fraction,
        m_plus_n_fraction,
        m_plus_n_decimal
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_phan_thuc_mau_bac2_2nghiem() {
    // Sinh ngẫu nhiên a, b, c, d trong khoảng 1-10, đảm bảo a*d ≠ b*c
    let a, b, c, d;
    do {
        a = Math.floor(Math.random() * 3) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        c = Math.floor(Math.random() * 3) + 1;
        d = Math.floor(Math.random() * 10) + 1;
    } while (a * d === b * c);

    // Tính nguyên hàm và các hằng số
    const { integral, m_fraction, n_fraction, m_plus_n_fraction, m_plus_n_decimal } = computeIndefiniteIntegral(a, b, c, d);

    // Tạo đề bài dưới dạng LaTeX
    const problem = `\\begin{ex}
Biết hàm số $f(x)=\\dfrac{1}{(${a}x + ${b}} \\cdot \\dfrac{1}{${c}x + ${d}}$ có nguyên hàm $F(x)=m\\ln|${a}x + ${b}| + n\\ln|${c}x + ${d}| + C$. Tính giá trị $m + n$, làm tròn đến hàng phần mười.
\\shortans[oly]{$${m_plus_n_decimal}$}
\\loigiai{
Ta có:
\\[
\\int \\dfrac{1}{${a}x + ${b}} \\cdot \\dfrac{1}{${c}x + ${d}} \\, dx = ${integral}
\\]
Đặt:
\\[
\\dfrac{1}{${a}x + ${b}} \\cdot \\dfrac{1}{${c}x + ${d}} = \\dfrac{m}{${a}x + ${b}} + \\dfrac{n}{${c}x + ${d}}
\\]
Giải hệ phương trình:
\\[
\\begin{cases}
m c + n a = 0 \\\\
m d + n b = 1
\\end{cases}
\\]
Từ phương trình đầu tiên:
\\[
m = -\\dfrac{n a}{c}
\\]
Thay vào phương trình thứ hai:
\\[
-\\dfrac{n a}{c} d + n b = 1 \\\\
n \\left( b - \\dfrac{a d}{c} \\right) = 1 \\\\
n = \\dfrac{c}{b c - a d}
\\]
Vậy:
\\[
m = -\\dfrac{a}{b c - a d}, \\quad n = \\dfrac{c}{b c - a d}
\\]
Tính tổng $m + n$:
\\[
m + n = -\\dfrac{a}{b c - a d} + \\dfrac{c}{b c - a d} = \\dfrac{c - a}{b c - a d} \\approx ${m_plus_n_decimal}
\\] 
}
\\end{ex}
`;

    return problem;
}

ư
// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = (a x + b)/[(c x + d)(e x + f)]
function computeIndefiniteIntegralA(a, b, c, d, e, f) {
    // Tính Δ = c * f - e * d để đảm bảo hệ phương trình có nghiệm duy nhất
    const delta = c * f - e * d;
    if (delta === 0) {
        throw new Error("Hệ số phải thỏa mãn c*f - e*d ≠ 0 để phân tích thành phân số đơn giản.");
    }

    // Giải hệ phương trình để tìm m và n:
    // a x + b = m (e x + f) + n (c x + d)
    // Từ đó:
    // m * e + n * c = a
    // m * f + n * d = b

    // Sử dụng Cramer's Rule để tìm m và n
    const m_numerator = (a * f - e * b);
    const n_numerator = (c * b - a * d);

    const m_fraction = simplifyFraction(m_numerator, delta);
    const n_fraction = simplifyFraction(n_numerator, delta);

    // Tính m + n dưới dạng phân số đã rút gọn
    const m_plus_n_fraction = addFractions(m_fraction, n_fraction);
    const m_plus_n_decimal = (m_plus_n_fraction.num / m_plus_n_fraction.den).toFixed(1);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm m * ln|c x + d|
    if (m_fraction.num !== 0) {
        if (m_fraction.den !== 1) {
            integral += `\\frac{${m_fraction.num}}{${m_fraction.den}} \\ln|${c}x + ${d}|`;
        } else {
            integral += `${m_fraction.num} \\ln|${c}x + ${d}|`;
        }
    }

    // Thêm n * ln|e x + f|
    if (n_fraction.num !== 0) {
        if (n_fraction.num > 0) {
            integral += ` + `;
        } else {
            integral += ` - `;
        }
        const abs_n_num = Math.abs(n_fraction.num);
        if (n_fraction.den !== 1) {
            integral += `\\frac{${abs_n_num}}{${n_fraction.den}} \\ln|${e}x + ${f}|`;
        } else {
            integral += `${abs_n_num} \\ln|${e}x + ${f}|`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        m_fraction,
        n_fraction,
        m_plus_n_fraction,
        m_plus_n_decimal
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_phan_thuc_tu_bac_nhat_mau_bac_hai_2nghiem() {
    // Sinh ngẫu nhiên a, b, c, d, e, f trong khoảng 1-10, đảm bảo c*f - e*d ≠ 0
    let a, b, c, d, e, f;
    let delta;
    do {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        c = Math.floor(Math.random() * 10) + 1;
        d = Math.floor(Math.random() * 10) + 1;
        e = Math.floor(Math.random() * 10) + 1;
        f = Math.floor(Math.random() * 10) + 1;
        delta = c * f - e * d;
    } while (delta === 0);

    // Tính nguyên hàm và các hằng số
    const { integral, m_fraction, n_fraction, m_plus_n_fraction, m_plus_n_decimal } = computeIndefiniteIntegralA(a, b, c, d, e, f);

    // Tạo đề bài dưới dạng LaTeX
    const problem = `\\begin{ex}
Biết hàm số $f(x)=\\dfrac{${a}x + ${b}}{(${c}x + ${d})(${e}x + ${f})}$ có nguyên hàm $F(x)=m\\ln|${c}x + ${d}| + n\\ln|${e}x + ${f}| + C$. Tính giá trị $m + n$, làm tròn đến hàng phần mười.
\\shortans[oly]{$${m_plus_n_decimal}$}
\\loigiai{
Ta có:
\\[
\\int \\dfrac{${a}x + ${b}}{(${c}x + ${d})(${e}x + ${f})} \\, dx = ${integral}
\\]
Đặt:
\\[
\\dfrac{${a}x + ${b}}{(${c}x + ${d})(${e}x + ${f})} = \\dfrac{m}{${c}x + ${d}} + \\dfrac{n}{${e}x + ${f}}
\\]
Giải hệ phương trình:
\\[
\\begin{cases}
m \\cdot ${e} + n \\cdot ${c} = ${a} \\\\
m \\cdot ${f} + n \\cdot ${d} = ${b}
\\end{cases}
\\]

Sử dụng Cramer's Rule:
\\[
m = \\dfrac{${m_fraction.num}}{${m_fraction.den}}
\\]
\\[
n =  \\dfrac{${n_fraction.num}}{${n_fraction.den}}
\\]
Vậy:
\\[
m + n = \\dfrac{${m_plus_n_fraction.num}}{${m_plus_n_fraction.den}} \\approx ${m_plus_n_decimal}
\\]
}
\\end{ex}
`;

    return problem;
}

// Hàm cộng hai phân số và rút gọn kết quả
function addFractions(frac1, frac2) {
    const numerator = frac1.num * frac2.den + frac2.num * frac1.den;
    const denominator = frac1.den * frac2.den;
    return simplifyFraction(numerator, denominator);
}

// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = (a x^2 + b x + c)/[(x + e)(x + f)]
function computeIndefiniteIntegralB(a, b, c, e, f) {
    // Tính hệ số để đảm bảo phân tích thành phân số đơn giản có nghiệm duy nhất
    // Đặt:
    // (a x^2 + b x + c) = (m x + n) (x + e) + p (x + f)
    // Tuy nhiên, cách chính xác là sử dụng phân tích thành phân số đơn giản
    // Giả sử:
    // \frac{a x^2 + b x + c}{(x + e)(x + f)} = m x + n + \frac{p}{x + e} + \frac{q}{x + f}
    // Nhưng theo định dạng yêu cầu của đề bài, ta cần nguyên hàm dạng m x + n ln|x + e| + p ln|x + f| + C
    // Do đó, cần biểu diễn f(x) dưới dạng: A + \frac{B}{x + e} + \frac{C}{x + f}
    // Tính A, B, C bằng phân tích thành phân số đơn giản

    // Thực hiện phân tích thành phân số đơn giản:
    // \frac{a x^2 + b x + c}{(x + e)(x + f)} = A + \frac{B}{x + e} + \frac{C}{x + f}
    // Nhân cả hai vế với (x + e)(x + f):
    // a x^2 + b x + c = A (x + e)(x + f) + B (x + f) + C (x + e)
    // Mở rộng:
    // a x^2 + b x + c = A x^2 + A (e + f) x + A e f + B x + B f + C x + C e
    // So sánh hệ số:
    // Hệ số x^2: a = A
    // Hệ số x: b = A (e + f) + B + C
    // Hằng số: c = A e f + B f + C e

    // Từ hệ phương trình trên:
    // A = a
    // B + C = b - A (e + f) = b - a (e + f)
    // B f + C e = c - A e f = c - a e f

    // Giải hệ phương trình để tìm B và C
    // B + C = k (k = b - a (e + f))
    // B f + C e = m (m = c - a e f)

    const k = b - a * (e + f);
    const m = c - a * e * f;

    // Giải hệ:
    // B + C = k
    // B f + C e = m
    // Sử dụng Cramer's rule hoặc phương pháp thế:
    // Từ B = k - C
    // Thay vào phương trình thứ hai:
    // (k - C) f + C e = m
    // k f - C f + C e = m
    // C (e - f) = m - k f
    // C = (m - k f) / (e - f)
    // B = k - C = k - (m - k f)/(e - f) = [k (e - f) - (m - k f)] / (e - f) = (k e - k f - m + k f) / (e - f) = (k e - m) / (e - f)

    if (e === f) {
        throw new Error("e và f không được bằng nhau để phân tích thành phân số đơn giản.");
    }

    const C_numerator = m - k * f;
    const C_denominator = e - f;
    const C_fraction = simplifyFraction(C_numerator, C_denominator);

    const B_numerator = k * e - m;
    const B_denominator = e - f;
    const B_fraction = simplifyFraction(B_numerator, B_denominator);

    // Tính m, n, p theo định dạng nguyên hàm:
    // F(x) = A x + B ln|x + e| + C ln|x + f| + C
    // Ở đây, A = a, B = B_fraction, C = C_fraction
    const A = a;
    const B = B_fraction;
    const C = C_fraction;

    // Tính m + n + p = A + B + C
    // Vì A là hằng số nhân với x, nhưng theo định dạng của đề bài, m tương ứng với A, n với B, p với C
    // Vậy m + n + p = A + B + C

    // Để tính được m + n + p dưới dạng phân số đã rút gọn:
    const A_fraction = { num: A, den: 1 };
    const m_plus_n = addFractions(A_fraction, B);
    const m_plus_n_plus_p = addFractions(m_plus_n, C);
    const m_plus_n_plus_p_decimal = (m_plus_n_plus_p.num / m_plus_n_plus_p.den).toFixed(0);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm A x
    if (A !== 0) {
        if (A !== 1) {
            integral += `${A} x`;
        } else {
            integral += `x`;
        }
    }

    // Thêm B ln|x + e|
    if (B.num !== 0) {
        if (B.num > 0 && A !== 0) {
            integral += ` + `;
        } else if (B.num < 0) {
            integral += ` - `;
        }
        const abs_B_num = Math.abs(B.num);
        if (B.den !== 1) {
            integral += `\\frac{${abs_B_num}}{${B.den}} \\ln|x + ${e}|`;
        } else {
            integral += `${abs_B_num} \\ln|x + ${e}|`;
        }
    }

    // Thêm C ln|x + f|
    if (C.num !== 0) {
        if (C.num > 0 && (A !== 0 || B.num !== 0)) {
            integral += ` + `;
        } else if (C.num < 0) {
            integral += ` - `;
        }
        const abs_C_num = Math.abs(C.num);
        if (C.den !== 1) {
            integral += `\\frac{${abs_C_num}}{${C.den}} \\ln|x + ${f}|`;
        } else {
            integral += `${abs_C_num} \\ln|x + ${f}|`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        m: A,
        n_fraction: B,
        p_fraction: C,
        m_plus_n_plus_p_fraction: m_plus_n_plus_p,
        m_plus_n_plus_p_decimal
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_phan_thuc_tu_mau_bac_hai() {
    // Sinh ngẫu nhiên a, b, c, e, f trong khoảng 1-10, đảm bảo (x + e) và (x + f) là hai nhân tử khác nhau
    let a, b, c, e, f;
    let unique;
    do {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        c = Math.floor(Math.random() * 10) + 1;
        e = Math.floor(Math.random() * 10) + 1;
        f = Math.floor(Math.random() * 10) + 1;
        unique = (e !== f);
    } while (!unique);

    // Tính nguyên hàm và các hằng số
    let result;
    try {
        result = computeIndefiniteIntegralB(a, b, c, e, f);
    } catch (error) {
        // Nếu xảy ra lỗi (ví dụ e = f), sinh lại hệ số
        return nguyenham_phan_thuc_tu_mau_bac_hai();
    }

    const { integral, m, n_fraction, p_fraction, m_plus_n_plus_p_fraction, m_plus_n_plus_p_decimal } = result;

    // Tạo đề bài dưới dạng LaTeX
    const problem = `\\begin{ex}
Biết hàm số $f(x)=\\dfrac{${a}x^2 + ${b}x + ${c}}{(x + ${e})(x + ${f})}$ có nguyên hàm $F(x)=mx + n\\ln|x + ${e}| + p\\ln|x + ${f}| + C$. Tính giá trị $m + n + p$, làm tròn đến phần nguyên.
\\shortans[oly]{$${m_plus_n_plus_p_decimal}$}
\\loigiai{
Ta có:
\\[
\\int \\dfrac{${a}x^2 + ${b}x + ${c}}{(x + ${e})(x + ${f})} \\, \\mathrm{d}x = ${integral}
\\]
Đặt:
\\[
\\dfrac{${a}x^2 + ${b}x + ${c}}{(x + ${e})(x + ${f})} = mx + \\dfrac{n}{x + ${e}} + \\dfrac{p}{x + ${f}}
\\]
Sau khi giải hệ phương trình, ta tìm được:
\\[
m = ${m}, \\quad n = \\dfrac{${n_fraction.num}}{${n_fraction.den}}, \\quad p = \\dfrac{${p_fraction.num}}{${p_fraction.den}}
\\]
Tính tổng $m + n + p$:
\\[
m + n + p = \\dfrac{${m_plus_n_plus_p_fraction.num}}{${m_plus_n_plus_p_fraction.den}} \\approx ${m_plus_n_plus_p_decimal}
\\]
}
\\end{ex}
`;

    return problem;
}

// Hàm tìm ước chung lớn nhất (GCD) sử dụng thuật toán Euclid
function gcd(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
}

// Hàm rút gọn phân số
function simplifyFraction(numerator, denominator) {
    if (denominator === 0) {
        throw new Error("Mẫu số không được bằng 0.");
    }

    // Đảm bảo mẫu số luôn dương
    if (denominator < 0) {
        numerator = -numerator;
        denominator = -denominator;
    }

    const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return {
        num: numerator / commonDivisor,
        den: denominator / commonDivisor
    };
}

// Hàm giải hệ phương trình 2 ẩn bằng Cramer's Rule
function solveSystem(a1, b1, c1, a2, b2, c2) {
    const delta = a1 * b2 - a2 * b1;
    if (delta === 0) {
        throw new Error("Hệ phương trình vô nghiệm hoặc vô số nghiệm.");
    }
    const deltaA = c1 * b2 - c2 * b1;
    const deltaB = a1 * c2 - a2 * c1;
    return {
        A: simplifyFraction(deltaA, delta),
        B: simplifyFraction(deltaB, delta)
    };
}

// Hàm cộng hai phân số và rút gọn kết quả
function addFractions(frac1, frac2) {
    const numerator = frac1.num * frac2.den + frac2.num * frac1.den;
    const denominator = frac1.den * frac2.den;
    return simplifyFraction(numerator, denominator);
}

// Hàm tính bình phương của một phân số
function squareFraction(frac) {
    return simplifyFraction(frac.num * frac.num, frac.den * frac.den);
}

// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = (a x + b)/[(x + c)(x + d)(x + e)]
function computeIndefiniteIntegralC(a, b, c, d, e) {
    // Giải hệ phương trình như đã mô tả trước đó

    // Tính các hệ số cho phương trình
    const equation1_A = e - c;
    const equation1_B = e - d;
    const equation1_C = a;

    const equation2_A = d * e - c * d; // de - cd
    const equation2_B = c * e - c * d; // ce - cd
    const equation2_C = b;

    // Giải hệ phương trình 2 ẩn (A và B)
    const { A: A_fraction, B: B_fraction } = solveSystem(
        equation1_A, equation1_B, equation1_C,
        equation2_A, equation2_B, equation2_C
    );

    // Từ C = -A - B
    const C_numerator = -A_fraction.num * B_fraction.den - B_fraction.num * A_fraction.den;
    const C_denominator = A_fraction.den * B_fraction.den;
    const C_fraction = simplifyFraction(C_numerator, C_denominator);

    // Tính m^2 + n^2 + p^2
    const m_square = squareFraction(A_fraction);
    const n_square = squareFraction(B_fraction);
    const p_square = squareFraction(C_fraction);

    // Tính tổng m^2 + n^2 + p^2
    const m2_plus_n2 = addFractions(m_square, n_square);
    const m2_plus_n2_plus_p2 = addFractions(m2_plus_n2, p_square);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm A ln|x + c|
    if (A_fraction.num !== 0) {
        if (A_fraction.den !== 1) {
            integral += `\\frac{${A_fraction.num}}{${A_fraction.den}} \\ln|x + ${c}|`;
        } else {
            integral += `${A_fraction.num} \\ln|x + ${c}|`;
        }
    }

    // Thêm B ln|x + d|
    if (B_fraction.num !== 0) {
        if (B_fraction.num > 0 && A_fraction.num !== 0) {
            integral += ` + `;
        } else if (B_fraction.num < 0) {
            integral += ` - `;
        }
        const absB_num = Math.abs(B_fraction.num);
        if (B_fraction.den !== 1) {
            integral += `\\frac{${absB_num}}{${B_fraction.den}} \\ln|x + ${d}|`;
        } else {
            integral += `${absB_num} \\ln|x + ${d}|`;
        }
    }

    // Thêm C ln|x + e|
    if (C_fraction.num !== 0) {
        if (C_fraction.num > 0 && (A_fraction.num !== 0 || B_fraction.num !== 0)) {
            integral += ` + `;
        } else if (C_fraction.num < 0) {
            integral += ` - `;
        }
        const absC_num = Math.abs(C_fraction.num);
        if (C_fraction.den !== 1) {
            integral += `\\frac{${absC_num}}{${C_fraction.den}} \\ln|x + ${e}|`;
        } else {
            integral += `${absC_num} \\ln|x + ${e}|`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        m_fraction: A_fraction,
        n_fraction: B_fraction,
        p_fraction: C_fraction,
        sum_of_squares_fraction: m2_plus_n2_plus_p2
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_phan_thuc_tu_bac_nhat_mau_3nghiem() {
    // Sinh ngẫu nhiên a, b, c, d, e trong khoảng 1-10, đảm bảo c, d, e đều khác nhau
    let a, b, c, d, e;
    do {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        c = Math.floor(Math.random() * 10) + 1;
        d = Math.floor(Math.random() * 10) + 1;
        e = Math.floor(Math.random() * 10) + 1;
    } while (c === d || c === e || d === e); // Đảm bảo c, d, e khác nhau

    // Tính nguyên hàm và các hằng số
    let result;
    try {
        result = computeIndefiniteIntegralC(a, b, c, d, e);
    } catch (error) {
        // Nếu xảy ra lỗi, sinh lại hệ số
        return nguyenham_phan_thuc_tu_bac_nhat_mau_3nghiem();
    }

    const { integral, m_fraction, n_fraction, p_fraction, sum_of_squares_fraction } = result;

    // Tạo đề bài dưới dạng LaTeX
    const problem = `
\\begin{ex}
Biết hàm số $f(x)=\\dfrac{${a}x + ${b}}{(x + ${c})(x + ${d})(x + ${e})}$ có nguyên hàm $F(x)=m\\ln|x + ${c}| + n\\ln|x + ${d}| + p\\ln|x + ${e}| + C$. Tính giá trị $m^2 + n^2 + p^2$, làm tròn đến hàng phần mười.
\\shortans[oly]{${(sum_of_squares_fraction.num/sum_of_squares_fraction.den).toFixed(1)}}
\\loigiai{
Ta có:
\\[
\\int \\dfrac{${a}x + ${b}}{(x + ${c})(x + ${d})(x + ${e})} \\, dx = ${integral}
\\]
Đặt:
\\[
\\dfrac{${a}x + ${b}}{(x + ${c})(x + ${d})(x + ${e})} = \\dfrac{A}{x + ${c}} + \\dfrac{B}{x + ${d}} + \\dfrac{C}{x + ${e}}
\\]
Giải hệ phương trình:
\\[
\\begin{cases}
A + B + C = 0 \\\\
A(${d} + ${e}) + B(${c} + ${e}) + C(${c} + ${d}) = ${a} \\\\
A \\cdot ${d} \\cdot ${e} + B \\cdot ${c} \\cdot ${e} + C \\cdot ${c} \\cdot ${d} = ${b}
\\end{cases}
\\]
Giải hệ phương trình trên, ta tìm được:
\\[
m = \\dfrac{${m_fraction.num}}{${m_fraction.den}}, \\quad n = \\dfrac{${n_fraction.num}}{${n_fraction.den}}, \\quad p = \\dfrac{${p_fraction.num}}{${p_fraction.den}}
\\]
Tính tổng $m^2 + n^2 + p^2$:
\\[
m^2 + n^2 + p^2 = \\dfrac{${sum_of_squares_fraction.num}}{${sum_of_squares_fraction.den}}=${(sum_of_squares_fraction.num/sum_of_squares_fraction.den).toFixed(1)}
\\]
}
\\end{ex}
`;

    return problem;
}

// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = (a x + b)/[(c x + d)^2]
function computeIndefiniteIntegralD(a, b, c, d) {
    // Từ phương pháp phân tích thành phân số đơn giản:
    // (a x + b)/(c x + d)^2 = m/(c x + d) + n/(c x + d)^2

    // Nhân cả hai vế với (c x + d)^2:
    // a x + b = m (c x + d) + n

    // Giải hệ phương trình:
    // Hệ phương trình là:
    // m * c = a  (hệ số của x)
    // m * d + n = b  (hằng số)

    // Từ hệ phương trình trên:
    // m = a / c
    // n = b - m * d = b - (a / c) * d = (b c - a d)/c

    // Tính m và n dưới dạng phân số
    const m_fraction = simplifyFraction(a, c);
    const n_fraction = simplifyFraction(b * c - a * d, c);

    // Tính m + n dưới dạng phân số đã rút gọn
    const m_plus_n_fraction = addFractions(m_fraction, n_fraction);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm m * ln|c x + d|
    if (m_fraction.num !== 0) {
        if (m_fraction.den !== 1) {
            integral += `\\frac{${m_fraction.num}}{${m_fraction.den}} \\ln|${c}x + ${d}|`;
        } else {
            integral += `${m_fraction.num} \\ln|${c}x + ${d}|`;
        }
    }

    // Thêm n/(c x + d)
    if (n_fraction.num !== 0) {
        if (n_fraction.num > 0 && m_fraction.num !== 0) {
            integral += ` + `;
        } else if (n_fraction.num < 0 && m_fraction.num !== 0) {
            integral += ` - `;
        } else if (n_fraction.num < 0) {
            integral += `-`;
        }
        const absN_num = Math.abs(n_fraction.num);
        if (n_fraction.den !== 1) {
            integral += `\\frac{${absN_num}}{${n_fraction.den}} \\cdot \\frac{1}{${c}x + ${d}}`;
        } else {
            integral += `${absN_num} \\cdot \\frac{1}{${c}x + ${d}}`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        m_fraction,
        n_fraction,
        m_plus_n_fraction
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_phan_thuc_tu_bac_nhat_mau_bachai_nghiemkep() {
    // Sinh ngẫu nhiên a, b, c, d trong khoảng 1-10
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 10) + 1;
    const d = Math.floor(Math.random() * 10) + 1;

    // Tính nguyên hàm và các hằng số
    const { integral, m_fraction, n_fraction, m_plus_n_fraction } = computeIndefiniteIntegralD(a, b, c, d);

    // Tạo đề bài dưới dạng LaTeX
    const problem = `\\begin{ex}
Biết hàm số $f(x)=\\dfrac{${a}x + ${b}}{(${c}x + ${d})^2}$ có nguyên hàm $F(x)=m\\ln|${c}x + ${d}| + \\dfrac{n}{${c}x + ${d}} + C$. Tính giá trị $m + n$, làm tròn đến hàng đơn vị.
\\shortans{$${(m_plus_n_fraction.num/m_plus_n_fraction.den).toFixed(0)}$}
\\loigiai{
Ta có:
\\[
\\int \\dfrac{${a}x + ${b}}{(${c}x + ${d})^2} \\, \\mathrm{d}x = ${integral}
\\]
So với dạng $F(x)=m\\ln|${c}x + ${d}| + \\dfrac{n}{${c}x + ${d}} + C$, ta có:
\\[
m = \\dfrac{${m_fraction.num}}{${m_fraction.den}}, \\quad n = \\dfrac{${n_fraction.num}}{${n_fraction.den}}
\\]
Vậy:
\\[
m + n = \\dfrac{${m_plus_n_fraction.num}}{${m_plus_n_fraction.den}} \\approx ${(m_plus_n_fraction.num/m_plus_n_fraction.den).toFixed(0)}
\\]
}
\\end{ex}
`;

    return problem;
} 

// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = (ax+b)/[(x+c)(x+d)^2]
function computeIndefiniteIntegralCase2(a, b, c, d) {
    // Tính m
    const numerator_m = b - a * c;
    const denominator_m = (d - c) ** 2;
    const m_fraction = simplifyFraction(numerator_m, denominator_m);

    // Tính n
    const n_fraction = {
        num: -m_fraction.num,
        den: m_fraction.den
    };

    // Tính p
    const numerator_p = a * d - b;
    const denominator_p = d - c;
    const p_fraction = simplifyFraction(numerator_p, denominator_p);

    // Tính m + n + p
    const m_plus_n_plus_p_fraction = {
        num: p_fraction.num,
        den: p_fraction.den
    };

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm m * ln|x + c|
    if (m_fraction.num !== 0) {
        if (m_fraction.den !== 1) {
            integral += `\\frac{${m_fraction.num}}{${m_fraction.den}} \\ln|x + ${c}|`;
        } else {
            integral += `${m_fraction.num} \\ln|x + ${c}|`;
        }
    }

    // Thêm n * ln|x + d|
    if (n_fraction.num !== 0) {
        if (n_fraction.num > 0 && m_fraction.num !== 0) {
            integral += ` + `;
        } else if (n_fraction.num < 0 && m_fraction.num !== 0) {
            integral += ` - `;
        } else if (n_fraction.num < 0) {
            integral += `-`;
        }
        const absN_num = Math.abs(n_fraction.num);
        if (n_fraction.den !== 1) {
            integral += `\\frac{${absN_num}}{${n_fraction.den}} \\ln|x + ${d}|`;
        } else {
            integral += `${absN_num} \\ln|x + ${d}|`;
        }
    }

    // Thêm p/(x + d)
    if (p_fraction.num !== 0) {
        if (p_fraction.num > 0 && (m_fraction.num !== 0 || n_fraction.num !== 0)) {
            integral += ` + `;
        } else if (p_fraction.num < 0 && (m_fraction.num !== 0 || n_fraction.num !== 0)) {
            integral += ` - `;
        } else if (p_fraction.num < 0) {
            integral += `-`;
        }
        const absP_num = Math.abs(p_fraction.num);
        if (p_fraction.den !== 1) {
            integral += `\\frac{${absP_num}}{${p_fraction.den}} \\cdot \\frac{1}{x + ${d}}`;
        } else {
            integral += `${absP_num} \\cdot \\frac{1}{x + ${d}}`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        m_fraction,
        n_fraction,
        p_fraction,
        m_plus_n_plus_p_fraction
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_phan_thuc_tu_bac_nhat_case_2() {
    // Sinh ngẫu nhiên a, b, c, d trong khoảng 1-10, đảm bảo c ≠ d
    let a, b, c, d;
    do {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        c = Math.floor(Math.random() * 10) + 1;
        d = Math.floor(Math.random() * 10) + 1;
    } while (c === d); // Đảm bảo c ≠ d để tránh chia cho 0

    // Tính nguyên hàm và các hằng số
    let result;
    try {
        result = computeIndefiniteIntegralCase2(a, b, c, d);
    } catch (error) {
        // Nếu xảy ra lỗi, sinh lại hệ số
        return nguyenham_phan_thuc_tu_bac_nhat_case_2();
    }

    const { integral, m_fraction, n_fraction, p_fraction, m_plus_n_plus_p_fraction } = result;

    // Tạo đề bài dưới dạng LaTeX
    const problem = `
\\begin{ex}
Biết hàm số $f(x)=\\dfrac{${a}x + ${b}}{(x + ${c})(x + ${d})^2}$ có nguyên hàm $F(x)=m\\ln|x + ${c}| + n\\ln|x + ${d}| + \\dfrac{p}{x + ${d}} + C$. Tính giá trị $m + n + p$, làm tròn đến hàng phần mười.
\\shortans{$${(m_plus_n_plus_p_fraction.num/m_plus_n_plus_p_fraction.den).toFixed(1)}}$}
\\loigiai{
Ta có:
\\[
\\int \\dfrac{${a}x + ${b}}{(x + ${c})(x + ${d})^2} \\, dx = ${integral}
\\]
So với dạng $F(x)=m\\ln|x + ${c}| + n\\ln|x + ${d}| + \\dfrac{p}{x + ${d}} + C$, ta có:
\\[
m = \\dfrac{${m_fraction.num}}{${m_fraction.den}}, \\quad n = \\dfrac{${n_fraction.num}}{${n_fraction.den}}, \\quad p = \\dfrac{${p_fraction.num}}{${p_fraction.den}}
\\]
Vậy:
\\[
m + n + p = \\dfrac{${m_plus_n_plus_p_fraction.num}}{${m_plus_n_plus_p_fraction.den}} \\approx ${(m_plus_n_plus_p_fraction.num/m_plus_n_plus_p_fraction.den).toFixed(1)}
\\]
}
\\end{ex}
`;

    return problem;
}

// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = sin(ax)cos(bx)
function computeIndefiniteIntegralSinAxCosBx(a, b) {
    // Tính hệ số trước cos((a+b)x) và cos((a-b)x)
    const coeff1 = simplifyFraction(-1, 2 * (a + b));
    const coeff2 = simplifyFraction(-1, 2 * (a - b));

    // Tính tổng các hệ số m + n
    // Trong trường hợp này, m = coeff1 và n = coeff2
    const m_plus_n_fraction = addFractions(coeff1, coeff2);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm m * cos((a + b)x)
    if (coeff1.num !== 0) {
        if (coeff1.den !== 1) {
            integral += `\\frac{${coeff1.num}}{${coeff1.den}} \\cos(${a + b}x)`;
        } else {
            integral += `${coeff1.num} \\cos(${a + b}x)`;
        }
    }

    // Thêm n * cos((a - b)x)
    if (coeff2.num !== 0) {
        if (coeff2.num > 0 && coeff1.num !== 0) {
            integral += ` + `;
        } else if (coeff2.num < 0 && coeff1.num !== 0) {
            integral += ` - `;
        } else if (coeff2.num < 0) {
            integral += `-`;
        }
        const absCoeff2_num = Math.abs(coeff2.num);
        if (coeff2.den !== 1) {
            integral += `\\frac{${absCoeff2_num}}{${coeff2.den}} \\cos(${a - b}x)`;
        } else {
            integral += `${absCoeff2_num} \\cos(${a - b}x)`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        coeff1,
        coeff2,
        m_plus_n_fraction
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_sin_ax_cos_bx() {
    // Sinh ngẫu nhiên a, b trong khoảng 1-10, a và b khác nhau để đa dạng đề bài
    let a, b;
    do {
        a = Math.floor(Math.random() * 10) + 5;
        b = Math.floor(Math.random() * 4) + 1;
    } while (a === b || (a + b) === 0 || (a - b) === 0); // Đảm bảo a ≠ b và tránh chia cho 0

    // Tính nguyên hàm và các hằng số
    let result;
    try {
        result = computeIndefiniteIntegralSinAxCosBx(a, b);
    } catch (error) {
        // Nếu xảy ra lỗi, sinh lại hệ số
        return nguyenham_sin_ax_cos_bx();
    }

    const { integral, coeff1, coeff2, m_plus_n_fraction } = result;

    // Tạo đề bài dưới dạng LaTeX
    const problem = `
\\begin{ex}
Biết hàm số $f(x)=\\sin(${a}x)\\cos(${b}x)$ có nguyên hàm $F(x)=m\\cos(${a + b}x) + n\\cos(${a - b}x) + C$. Tính giá trị $m + n$, làm tròn đến hàng phần mười.
\\shortans{$${(m_plus_n_fraction.num/m_plus_n_fraction.den).toFixed(1)}$}
\\loigiai{
Ta có:
\\[
\\int\\limits \\sin(${a}x)\\cos(${b}x) \\, \\mathrm{d}x = ${integral}
\\]
Vậy ta có:
\\[
m = \\dfrac{${coeff1.num}}{${coeff1.den}}, \\quad n = \\dfrac{${coeff2.num}}{${coeff2.den}}
\\]
Tính tổng $m + n$:
\\[
m + n = \\dfrac{${coeff1.num}}{${coeff1.den}} + \\dfrac{${coeff2.num}}{${coeff2.den}} = \\frac{${m_plus_n_fraction.num}}{${m_plus_n_fraction.den}} \\approx ${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }
\\]
}
\\end{ex}
`;

    return problem;
}

// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = sin(ax)sin(bx)
function computeIndefiniteIntegralSinAxSinBx(a, b) {
    // Sử dụng công thức: sin(A)sin(B) = [cos(A-B) - cos(A+B)] / 2
    const coeff1 = simplifyFraction(1, 2 * (a - b));
    const coeff2 = simplifyFraction(-1, 2 * (a + b));

    // Tính tổng các hệ số m + n
    const m_plus_n_fraction = {
        num: coeff1.num + coeff2.num,
        den: coeff1.den
    };
    // Rút gọn phân số nếu cần
    const gcd_sum = gcd(Math.abs(m_plus_n_fraction.num), Math.abs(m_plus_n_fraction.den));
    m_plus_n_fraction.num /= gcd_sum;
    m_plus_n_fraction.den /= gcd_sum;

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm m * sin((a - b)x)
    if (coeff1.num !== 0) {
        if (coeff1.num > 0 && coeff2.num < 0) {
            integral += `\\frac{${coeff1.num}}{${coeff1.den}} \\sin(${a - b}x)`;
        } else {
            integral += `${coeff1.num > 0 ? "" : "-"}\\frac{${Math.abs(coeff1.num)}}{${coeff1.den}} \\sin(${a - b}x)`;
        }
    }

    // Thêm n * sin((a + b)x)
    if (coeff2.num !== 0) {
        if (coeff2.num > 0 && coeff1.num !== 0) {
            integral += ` - \\frac{${Math.abs(coeff2.num)}}{${coeff2.den}} \\sin(${a + b}x)`;
        } else if (coeff2.num < 0 && coeff1.num !== 0) {
            integral += ` + \\frac{${Math.abs(coeff2.num)}}{${coeff2.den}} \\sin(${a + b}x)`;
        } else if (coeff2.num < 0) {
            integral += `- \\frac{${Math.abs(coeff2.num)}}{${coeff2.den}} \\sin(${a + b}x)`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        coeff1,
        coeff2,
        m_plus_n_fraction
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_sin_ax_sin_bx() {
    // Sinh ngẫu nhiên a, b trong khoảng 1-10, a và b khác nhau để đa dạng đề bài
    let a, b;
    do {
        a = Math.floor(Math.random() * 10) + 5;
        b = Math.floor(Math.random() * 1) + 1;
    } while (a === b); // Đảm bảo a ≠ b để đa dạng đề bài

    // Tính nguyên hàm và các hằng số
    let result;
    try {
        result = computeIndefiniteIntegralSinAxSinBx(a, b);
    } catch (error) {
        // Nếu xảy ra lỗi, sinh lại hệ số
        return nguyenham_sin_ax_sin_bx();
    }

    const { integral, coeff1, coeff2, m_plus_n_fraction } = result;

    // Tạo đề bài dưới dạng LaTeX
    const problem = `
\\begin{ex}
Biết hàm số $f(x)=\\sin(${a}x)\\sin(${b}x)$ có nguyên hàm $F(x)=m\\sin(${a - b}x) + n\\sin(${a + b}x) + C$. Tính giá trị $m + n$, làm tròn đến hàng phần mười.
\\shortans{$${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }$}
\\loigiai{
Ta có:
\\[
\\sin(${a}x)\\sin(${b}x) = \\frac{\\cos((${a} - ${b})x) - \\cos((${a} + ${b})x)}{2}
\\]
Vậy:
\\[
\\int \\sin(${a}x)\\sin(${b}x) \\, dx = \\frac{1}{2(${a} - ${b})} \\sin((${a} - ${b})x) - \\frac{1}{2(${a} + ${b})} \\sin((${a} + ${b})x) + C
\\]
So với dạng $F(x)=m\\sin(${a - b}x) + n\\sin(${a + b}x) + C$, ta có:
\\[
m = \\frac{1}{2(${a} - ${b})}, \\quad n = -\\frac{1}{2(${a} + ${b})}
\\]
Tính tổng $m + n$:
\\[
m + n = \\frac{1}{2(${a} - ${b})} - \\frac{1}{2(${a} + ${b})} = \\frac{1}{2}\\left(\\frac{1}{${a} - ${b}} - \\frac{1}{${a} + ${b}}\\right) = \\frac{${m_plus_n_fraction.num}}{${m_plus_n_fraction.den}} \\approx ${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }
\\]
}
\\end{ex}
`;

    return problem;
}


// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = cos(ax)cos(bx)
function computeIndefiniteIntegralCosAxCosBx(a, b) {
    // Sử dụng công thức: cos(A)cos(B) = [cos(A-B) + cos(A+B)] / 2
    const coeff1 = simplifyFraction(1, 2 * (a - b));
    const coeff2 = simplifyFraction(1, 2 * (a + b));

    // Tính tổng các hệ số m + n
    const m_plus_n_fraction = {
        num: coeff1.num + coeff2.num,
        den: coeff1.den
    };
    // Rút gọn phân số nếu cần
    const gcd_sum = gcd(Math.abs(m_plus_n_fraction.num), Math.abs(m_plus_n_fraction.den));
    m_plus_n_fraction.num /= gcd_sum;
    m_plus_n_fraction.den /= gcd_sum;

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = "";

    // Thêm m * sin((a - b)x)
    if (coeff1.num !== 0) {
        if (coeff1.num > 0 && coeff2.num > 0) {
            integral += `\\frac{${coeff1.num}}{${coeff1.den}} \\sin(${a - b}x)`;
        } else {
            integral += `${coeff1.num > 0 ? "" : "-"}\\frac{${Math.abs(coeff1.num)}}{${coeff1.den}} \\sin(${a - b}x)`;
        }
    }

    // Thêm n * sin((a + b)x)
    if (coeff2.num !== 0) {
        if (coeff2.num > 0 && coeff1.num !== 0) {
            integral += ` + \\frac{${coeff2.num}}{${coeff2.den}} \\sin(${a + b}x)`;
        } else if (coeff2.num < 0 && coeff1.num !== 0) {
            integral += ` - \\frac{${Math.abs(coeff2.num)}}{${coeff2.den}} \\sin(${a + b}x)`;
        } else if (coeff2.num < 0) {
            integral += `- \\frac{${Math.abs(coeff2.num)}}{${coeff2.den}} \\sin(${a + b}x)`;
        }
    }

    integral += " + C"; // Thêm hằng số tích phân

    return {
        integral,
        coeff1,
        coeff2,
        m_plus_n_fraction
    };
}

// Hàm sinh đề bài và lời giải
function nguyenham_cos_ax_cos_bx() {
    // Sinh ngẫu nhiên a, b trong khoảng 1-10, a và b khác nhau để đa dạng đề bài
    let a, b;
    do {
        a = Math.floor(Math.random() * 10) + 5;
        b = Math.floor(Math.random() * 4) + 1;
    } while (a === b); // Đảm bảo a ≠ b để đa dạng đề bài

    // Tính nguyên hàm và các hằng số
    let result;
    try {
        result = computeIndefiniteIntegralCosAxCosBx(a, b);
    } catch (error) {
        // Nếu xảy ra lỗi, sinh lại hệ số
        return nguyenham_cos_ax_cos_bx();
    }

    const { integral, coeff1, coeff2, m_plus_n_fraction } = result;

    // Tạo đề bài dưới dạng LaTeX
    const problem = `
\\begin{ex}
Biết hàm số $f(x)=\\cos(${a}x)\\cos(${b}x)$ có nguyên hàm $F(x)=m\\sin(${a - b}x) + n\\sin(${a + b}x) + C$. Tính giá trị $m + n$, làm tròn đến hàng phần mười.
\\shortans{$${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }$}
\\loigiai{
Ta có:
\\[
\\cos(${a}x)\\cos(${b}x) = \\dfrac{\\cos((${a} - ${b})x) + \\cos((${a} + ${b})x)}{2}
\\]
Vậy:
\\[
\\int\\limits \\cos(${a}x)\\cos(${b}x) \\, dx = \\dfrac{1}{2(${a} - ${b})} \\sin((${a} - ${b})x) + \\dfrac{1}{2(${a} + ${b})} \\sin((${a} + ${b})x) + C
\\]
So với dạng $F(x)=m\\sin(${a - b}x) + n\\sin(${a + b}x) + C$, ta có:
\\[
m = \\dfrac{1}{2(${a} - ${b})}, \\quad n = \\dfrac{1}{2(${a} + ${b})}
\\]
Tính tổng $m + n$:
\\[
m + n = \\dfrac{1}{2(${a} - ${b})} + \\dfrac{1}{2(${a} + ${b})} = \\dfrac{1}{2}\\left(\\dfrac{1}{${a} - ${b}} + \\dfrac{1}{${a} + ${b}}\\right) = \\frac{${m_plus_n_fraction.num}}{${m_plus_n_fraction.den}} \\approx ${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }
\\]
}
\\end{ex}
`;

    return problem;
}


// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = sin^2(ax)
function computeIndefiniteIntegralSin2Ax(a) {
    // Sử dụng công thức: sin^2(ax) = (1 - cos(2ax)) / 2
    const coeff_m = simplifyFraction(1, 2); // m = 1/2
    const coeff_n = simplifyFraction(-1, 4 * a); // n = -1/(4a)

    // Tính tổng m + n
    const m_plus_n_num = coeff_m.num * coeff_n.den + coeff_n.num * coeff_m.den;
    const m_plus_n_den = coeff_m.den * coeff_n.den;
    const m_plus_n_fraction = simplifyFraction(m_plus_n_num, m_plus_n_den);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = `${coeff_m.num}/${coeff_m.den} x `;
    if (coeff_n.num < 0) {
        integral += `- ${Math.abs(coeff_n.num)}/${coeff_n.den} \\sin(2${a}x) `;
    } else {
        integral += `+ ${coeff_n.num}/${coeff_n.den} \\sin(2${a}x) `;
    }
    integral += "+ C";

    return {
        integral,
        coeff_m,
        coeff_n,
        m_plus_n_fraction
    };
}

// Hàm sinh nguyên hàm dưới dạng LaTeX cho f(x) = cos^2(ax)
function computeIndefiniteIntegralCos2Ax(a) {
    // Sử dụng công thức: cos^2(ax) = (1 + cos(2ax)) / 2
    const coeff_m = simplifyFraction(1, 2); // m = 1/2
    const coeff_n = simplifyFraction(1, 4 * a); // n = 1/(4a)

    // Tính tổng m + n
    const m_plus_n_num = coeff_m.num * coeff_n.den + coeff_n.num * coeff_m.den;
    const m_plus_n_den = coeff_m.den * coeff_n.den;
    const m_plus_n_fraction = simplifyFraction(m_plus_n_num, m_plus_n_den);

    // Tạo biểu thức nguyên hàm dưới dạng LaTeX
    let integral = `${coeff_m.num}/${coeff_m.den} x `;
    if (coeff_n.num < 0) {
        integral += `- ${Math.abs(coeff_n.num)}/${coeff_n.den} \\sin(2${a}x) `;
    } else {
        integral += `+ ${coeff_n.num}/${coeff_n.den} \\sin(2${a}x) `;
    }
    integral += "+ C";

    return {
        integral,
        coeff_m,
        coeff_n,
        m_plus_n_fraction
    };
}

// Hàm sinh đề bài và lời giải cho ∫ sin^2(ax) dx
function nguyenham_sinax_mu2() {
    // Sinh ngẫu nhiên a trong khoảng 1-10
    const a = Math.floor(Math.random() * 10) + 1;

    // Tính nguyên hàm và các hằng số
    let result;
    try {
        result = computeIndefiniteIntegralSin2Ax(a);
    } catch (error) {
        // Nếu xảy ra lỗi, sinh lại hệ số
        return nguyenham_sinax_mu2();
    }

    const { integral, coeff_m, coeff_n, m_plus_n_fraction } = result;

    // Tạo đề bài dưới dạng LaTeX
    const problem = `
\\begin{ex}
Biết hàm số $f(x)=\\sin^2(${a}x)$ có nguyên hàm $F(x)=m x + n \\sin(${2*a}x) + C$. Tính giá trị $m + n$, làm tròn đến hàng phần mười.
\\shortans{$${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }$}
\\loigiai{
Ta có:
\\[
\\sin^2(${a}x) = \\frac{1 - \\cos(${2*a}x)}{2}
\\]
Vậy:
\\[
\\int \\sin^2(${a}x) \\, dx = \\frac{1}{2} \\int 1 \\, dx - \\frac{1}{2} \\int \\cos(${2*a}x) \\, dx = \\frac{1}{2} x - \\frac{\\sin(${2*a}x)}{${4*a}} + C
\\]
So với dạng $F(x)=m x + n \\sin(${2*a}x) + C$, ta có:
\\[
m = \\frac{1}{2}, \\quad n = -\\frac{1}{${4*a}}
\\]
Vậy:
\\[
m + n = \\frac{1}{2} - \\frac{1}{${4*a}} = \\frac{${m_plus_n_fraction.num}}{${m_plus_n_fraction.den}} \\approx ${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }
\\]
}
\\end{ex}
`;

    return problem;
}

// Hàm sinh đề bài và lời giải cho ∫ cos^2(ax) dx
function nguyenham_cos_ax_mu2() {
    // Sinh ngẫu nhiên a trong khoảng 1-10
    const a = Math.floor(Math.random() * 10) + 1;

    // Tính nguyên hàm và các hằng số
    let result;
    try {
        result = computeIndefiniteIntegralCos2Ax(a);
    } catch (error) {
        // Nếu xảy ra lỗi, sinh lại hệ số
        return nguyenham_cos_ax_mu2();
    }

    const { integral, coeff_m, coeff_n, m_plus_n_fraction } = result;

    // Tạo đề bài dưới dạng LaTeX
    const problem = `
\\begin{ex}
Biết hàm số $f(x)=\\cos^2(${a}x)$ có nguyên hàm $F(x)=m x + n \\sin(${2*a}x) + C$. Tính giá trị $m + n$, làm tròn đến hàng phần mười.
\\shortans{$${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }$}
\\loigiai{
Ta có:
\\[
\\cos^2(${a}x) = \\frac{1 + \\cos(${2*a}x)}{2}
\\]
Vậy:
\\[
\\int \\cos^2(${a}x) \\, dx = \\frac{1}{2} \\int 1 \\, dx + \\frac{1}{2} \\int \\cos(${2*a}x) \\, dx = \\frac{1}{2} x + \\frac{\\sin(${2*a}x)}{${4*a}} + C
\\]
So với dạng $F(x)=m x + n \\sin(${2*a}x) + C$, ta có:
\\[
m = \\frac{1}{2}, \\quad n = \\frac{1}{${4*a}}
\\]
Vậy:
\\[
m + n = \\frac{1}{2} + \\frac{1}{${4*a}} = \\frac{${m_plus_n_fraction.num}}{${m_plus_n_fraction.den}} \\approx ${ (result.m_plus_n_fraction.num / result.m_plus_n_fraction.den).toFixed(1) }
\\]
}
\\end{ex}
`;

    return problem;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function nguyenham_tich_bachai_nhan_mu() {
    let a, b, c, d;
    do {
      a = getRandomInt(2, 15);
      b = getRandomInt(2, 15);
      c = getRandomInt(2, 15);
      d = getRandomInt(1, 5); // Avoid d=0
    } while (d === 0);
  
    const m = a / d;
    const n = b / d - 2 * a / (d * d);
    const p = c / d - b / (d * d) + 2 * a / (d * d * d);
    const m_plus_n_plus_p = m + n + p;
  
    const problem = `
  \\begin{ex}
  Cho hàm số $f(x) = (${a}x^2 + ${b}x + ${c}$)e^{${d}x}$. Tìm nguyên hàm $F(x)$ của $f(x)$ có dạng $F(x) = (mx^2 + nx + p$)e^{${d}x} + C$. Tính giá trị $m + n + p$, làm tròn đến hàng phần mười.
  \\shortans{$${m_plus_n_plus_p.toFixed(1)}$}
  \\loigiai{
   Sử dụng tích phân từng phần:
  \\begin{itemize}
      \\item $u = ${a}x^2 + ${b}x + ${c}$, $du = (${2*a}x + ${b})dx$
      \\item $dv = e^{${d}x}dx$, $v = \\frac{1}{${d}}e^{${d}x}$
  \\end{itemize}
  $\\int (${a}x^2 + ${b}x + ${c})e^{${d}x} dx = (\\frac{${a}}{${d}}x^2 + \\frac{${b}}{${d}}x + \\frac{${c}}{${d}})e^{${d}x} - \\int \\frac{1}{${d}}e^{${d}x}(${2*a}x + ${b})dx$
  Tiếp tục tích phân từng phần:
  \\begin{itemize}
      \\item $u = ${2*a}x + ${b}$, $du = ${2*a}dx$
      \\item $dv = e^{${d}x}dx$, $v = \\frac{1}{${d}}e^{${d}x}$
  \\end{itemize}
  $\\int \\frac{1}{${d}}e^{${d}x}(${2*a}x + ${b})dx = (\\frac{${2*a}}{${d}^2}x + \\frac{${b}}{${d}^2})e^{${d}x} - \\int \\frac{${2*a}}{${d}^2}e^{${d}x}dx = (\\frac{${2*a}}{${d}^2}x + \\frac{${b}}{${d}^2})e^{${d}x} - \\frac{${2*a}}{${d}^3}e^{${d}x}$
  Kết hợp lại:
  $F(x) = (\\frac{${a}}{${d}}x^2 + (\\frac{${b}}{${d}} - \\frac{${2*a}}{${d}^2})x + (\\frac{${c}}{${d}} - \\frac{${b}}{${d}^2} + \\frac{${2*a}}{${d}^3}))e^{${d}x} + C$
  Vậy $m = \\frac{${a}}{${d}}$, $n = \\frac{${b}}{${d}} - \\frac{${2*a}}{${d}^2}$, $p = \\frac{${c}}{${d}} - \\frac{${b}}{${d}^2} + \\frac{${2*a}}{${d}^3}$.
  $m + n + p = ${m_plus_n_plus_p.toFixed(1)}$
  }
  \\end{ex}
  `;
    return problem;
  }


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nguyenham_tich_bachai_nhan_mu_nguoc() {
    let a, b, c, d;
    do {
        a = getRandomInt(1, 5);
        b = getRandomInt(1, 5);
        c = getRandomInt(1, 5);
        d = getRandomInt(1, 5); // Avoid d=0
    } while (d === 0);

    const m = d * a;
    const n = 2 * a + d * b;
    const p = b + d * c;
    const m_plus_n_plus_p = m + n + p;

    const problem = `
\\begin{ex}
Cho hàm số $F(x) = (${a}x^2 + ${b}x + ${c}$)\\mathrm{e}^{${d}x}$.  Biết $f(x) = F'(x)$ và $f(x) = (mx^2 + nx + p)\\mathrm{e}^{${d}x}$. Tính giá trị $m + n + p$, làm tròn đến hàng đơn vị.
\\shortans{$${m_plus_n_plus_p.toFixed(0)}$}
\\loigiai{
Tính đạo hàm của $F(x)$:
$f(x) = F'(x) = \\frac{d}{dx} [(${a}x^2 + ${b}x + ${c})\\mathrm{e}^{${d}x}] = (2${a}x + ${b})\\mathrm{e}^{${d}x} + (${a}x^2 + ${b}x + ${c})(${d}\\mathrm{e}^{${d}x}) = [${d}${a}x^2 + (2${a} + ${d}${b})x + (${b} + ${d}${c})]\\mathrm{e}^{${d}x}$
So sánh với $f(x) = (mx^2 + nx + p)e^{${d}x}$, ta có:
$m = ${d}${a}$, $n = 2${a} + ${d}${b}$, $p = ${b} + ${d}${c}$
Vậy $m + n + p = ${d}${a} + 2${a} + ${d}${b} + ${b} + ${d}${c} = ${m_plus_n_plus_p.toFixed(0)}$
}
\\end{ex}
`;
    return problem;
}
