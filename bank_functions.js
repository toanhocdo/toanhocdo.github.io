// Hàm tính ước chung lớn nhất (GCD) bằng thuật toán Euclid
function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}
// Hàm xử lý dấu + -, - - và - +
function cleanUpOutput(output) {
    return output.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
}
function lamdeppm(expression) {
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
//HH OXYZ
function tinh_vecto_AB(OAx, OAy, OAz, OBx, OBy, OBz) {
    // Define vectors
    const vectorOA = [OAx, OAy, OAz];
    const vectorOB = [OBx, OBy, OBz];

    // Calculate vector AB
    const vectorAB = [
        OBx - OAx,
        OBy - OAy,
        OBz - OAz
    ];

    // Helper function to format vectors properly
    function formatVectorComponent(value, component) {
        if (value < 0) {
            return `${value}\\vec{${component}}`;
        } else {
            return `+ ${value}\\vec{${component}}`;
        }
    }

  

    // Create the problem statement
    const problemStatement = `
        Cho $ \\overrightarrow{OA} = ${formatVectorComponent(OAx, 'i')} ${formatVectorComponent(OAy, 'j')} ${formatVectorComponent(OAz, 'k')} $, 
        $ \\overrightarrow{OB} = ${formatVectorComponent(OBx, 'i')} ${formatVectorComponent(OBy, 'j')} ${formatVectorComponent(OBz, 'k')} $. 
        Tìm vecto $\\overrightarrow{AB}$.`;

    // Create the answer statement
    const answerStatement = `
        (${vectorAB[0]}; ${vectorAB[1]}; ${vectorAB[2]})
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${answerStatement.trim()}$}
    \\loigiai{
        Ta có $ \\overrightarrow{AB} = (${OBx} - ${OAx})\\vec{i} + (${OBy} - ${OAy})\\vec{j} + (${OBz} - ${OAz})\\vec{k} = ${formatVectorComponent(vectorAB[0], 'i')} ${formatVectorComponent(vectorAB[1], 'j')} ${formatVectorComponent(vectorAB[2], 'k')}$.
    }
\\end{ex}
    `;

    // Clean up the LaTeX output
    latexOutput = cleanUpOutput(latexOutput);
    
    return latexOutput;
}
function tinh_trongtam(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    
    // Calculate the centroid G
    const Gx = formatFraction(Ax + Bx + Cx, 3);
    const Gy = formatFraction(Ay + By + Cy, 3);
    const Gz = formatFraction(Az + Bz + Cz, 3);

    // Helper function to clean up the final output
    function cleanUpOutput(output) {
        return output.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
    }

    // Create the problem statement
    const problemStatement = `
        Cho $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. 
        Khi đó tọa độ trọng tâm $G$ của tam giác $ABC$ là gì?
    `;

    // Create the answer statement
    const answerStatement = `
        Tọa độ trọng tâm $G$ của tam giác $ABC$ là \\(G\\left(${Gx}; ${Gy}; ${Gz}\\right)\\).
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()},
    \\shortans{$G\\left(${Gx}; ${Gy}; ${Gz}\\right)$}
    \\loigiai{
        Ta có tọa độ trọng tâm $G$ của tam giác $ABC$ được tính bằng trung bình cộng tọa độ các đỉnh: \\\\
        $G\\left(\\dfrac{${Ax} + ${Bx} + ${Cx}}{3}; \\dfrac{${Ay} + ${By} + ${Cy}}{3}; \\dfrac{${Az} + ${Bz} + ${Cz}}{3}\\right) = G\\left(${Gx}; ${Gy}; ${Gz}\\right)$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = cleanUpOutput(latexOutput);
    
    return latexOutput;
}
function tinh_trongtam_tudien(Ox, Oy, Oz, Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Calculate the centroid G
    const Gx = formatFraction(Ox + Ax + Bx + Cx, 4);
    const Gy = formatFraction(Oy + Ay + By + Cy, 4);
    const Gz = formatFraction(Oz + Az + Bz + Cz, 4);
    // Create the problem statement
    const problemStatement = `
        Cho $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. 
        Khi đó tọa độ trọng tâm $G$ của tứ diện $OABC$ là gì?
    `;

    // Create the answer statement
    const answerStatement = `
        Tọa độ trọng tâm $G$ của tứ diện $OABC$ là \\(G\\left(${Gx}; ${Gy}; ${Gz}\\right)\\).
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()},
    \\shortans{$G\\left(${Gx}; ${Gy}; ${Gz}\\right)$}
    \\loigiai{
        Ta có tọa độ trọng tâm $G$ của tứ diện $OABC$ được tính bằng trung bình cộng tọa độ các đỉnh: \\\\
        $G\\left(\\dfrac{${Ox} + ${Ax} + ${Bx} + ${Cx}}{4}; \\dfrac{${Oy} + ${Ay} + ${By} + ${Cy}}{4}; \\dfrac{${Oz} + ${Az} + ${Bz} + ${Cz}}{4}\\right) = G\\left(${Gx}; ${Gy}; ${Gz}\\right)$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = cleanUpOutput(latexOutput);
    
    return latexOutput;
}
function tinh_toado_D(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Calculate vector BC
    const BCx = Cx - Bx;
    const BCy = Cy - By;
    const BCz = Cz - Bz;

    // Calculate the coordinates of point D
    const Dx = Ax + BCx;
    const Dy = Ay + BCy;
    const Dz = Az + BCz;
    // Create the problem statement
    const problemStatement = `
        Cho $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. 
        Tìm tọa độ điểm $D$ sao cho $ABCD$ là hình bình hành.
    `;

    // Create the answer statement
    const answerStatement = `
        Tọa độ điểm $D$ là $D(${Dx}; ${Dy}; ${Dz})$.
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()},
    \\shortans{$D(${Dx}; ${Dy}; ${Dz})$}
    \\loigiai{
        Ta có $\overrightarrow{BC} = (${Cx} - ${Bx})\\vec{i} + (${Cy} - ${By})\\vec{j} + (${Cz} - ${Bz})\\vec{k} = (${BCx}\\vec{i} + ${BCy}\\vec{j} + ${BCz}\\vec{k})$. \\\\
        Điểm $D$ có tọa độ $D$ sao cho $\overrightarrow{AD} = \overrightarrow{BC}$ là: \\\\
        $D(${Ax} + ${BCx}; ${Ay} + ${BCy}; ${Az} + ${BCz}) = D(${Dx}; ${Dy}; ${Dz})$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = cleanUpOutput(latexOutput);
    
    return latexOutput;
}
function phan_tich_vector(dx, dy, dz, ax, ay, az, bx, by, bz, cx, cy, cz) {
    // Solve the system of equations using matrix algebra
    const A = [
        [ax, bx, cx],
        [ay, by, cy],
        [az, bz, cz]
    ];
    const D = [dx, dy, dz];

    // Solve the linear system
    const coefficients = math.lusolve(A, D);
    const [x, y, z] = coefficients.map(coef => coef[0]);

    // Helper function to format fractions for LaTeX
    function formatFraction(value) {
        const fraction = math.fraction(value);
        if (fraction.d === 1) {
            return `${fraction.n}`;
        } else {
            return `\\dfrac{${fraction.n}}{${fraction.d}}`;
        }
    }

    // Create the problem statement
    const problemStatement = `
        Phân tích $\\vec{d}=(${dx}; ${dy}; ${dz})$ theo các vecto $\\vec{a}=(${ax}; ${ay}; ${az}), \\vec{b}=(${bx}; ${by}; ${bz}), \\vec{c}=(${cx}; ${cy}; ${cz})$.
    `;

    // Create the answer statement
    const answerStatement = `
        $\\vec{d} = ${formatFraction(x)} \\vec{a} + ${formatFraction(y)} \\vec{b} + ${formatFraction(z)} \\vec{c}$.
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{${answerStatement.trim()}}
    \\loigiai{
        Ta có hệ phương trình: \\\\
        \\heva{
        &${ax}x + ${bx}y + ${cx}z = ${dx} \\\\
        &${ay}x + ${by}y + ${cy}z = ${dy} \\\\
        &${az}x + ${bz}y + ${cz}z = ${dz}}\\\\
        Giải hệ phương trình này ta được: \\\\
        $x = ${formatFraction(x)}, y = ${formatFraction(y)}, z = ${formatFraction(z)}$\\\\
        Vậy $\\vec{d} = ${formatFraction(x)} \\vec{a} + ${formatFraction(y)} \\vec{b} + ${formatFraction(z)} \\vec{c}$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = latexOutput.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
    
    return latexOutput;
}
function tinh_xy_ABCthanghang(Ax, Ay, Az, Bx, By, Bz, Cx_expr, Cy_expr, Cz) {
    // Parse expressions for Cx and Cy
    const Cx = math.parse(`x + ${Cx_expr}`).compile();
    const Cy = math.parse(`y + ${Cy_expr}`).compile();

    // Calculate vector AB
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;

    // Ensure the points are collinear by solving for k
    const k = (Cz - Bz) / ABz;

    // Evaluate Cx and Cy using k
    const x = Cx.evaluate({ x: k });
    const y = Cy.evaluate({ y: k });

    // Calculate the sum of x + y
    const sum = x + y;

    // Create the problem statement
    const problemStatement = `
        Cho ba điểm $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(x + ${Cx_expr}; y + ${Cy_expr}; ${Cz})$ thẳng hàng. Tổng $x + y$ bằng bao nhiêu?
    `;

    // Create the answer statement
    const answerStatement = `
        Tổng $x + y$ bằng $${sum}$.
    `;

    // Format the output in the required LaTeX format
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${sum}$}
    \\loigiai{
        Ta có vector $\\overrightarrow{AB} = (${ABx}; ${ABy}; ${ABz})$ và vector $\\overrightarrow{BC} = (x + ${Cx_expr} - ${Bx}; y + ${Cy_expr} - ${By}; ${Cz} - ${Bz})$.\\\\
        Để các điểm thẳng hàng, tồn tại $k$ sao cho $\\overrightarrow{BC} = k \\cdot \\overrightarrow{AB}$.\\\\
        Từ đó, $k = \\dfrac{${Cz} - ${Bz}}{${ABz}} = ${k}$.\\\\
        Tọa độ $x$ và $y$ của điểm $C$ là $x = k \\cdot ${ABx} + ${Bx} = ${x}$ và $y = k \\cdot ${ABy} + ${By} = ${y}$.\\\\
        Vậy tổng $x + y$ bằng $${sum}$.
    }
\\end{ex}
    `;
    
    // Clean up the LaTeX output
    latexOutput = latexOutput.replace(/\+\s*-/g, '-').replace(/-\s*-/g, '+').replace(/-\s*\+/g, '-');
    
    return latexOutput;
}
function tinh_M_cachdeu_AB(Ax, Ay, Az, Bx, By, Bz) {
    // Tính toán khoảng cách bình phương từ A và B tới trục hoành
    const dA2 = Math.abs(Ay * Ay + Az * Az);
    const dB2 = Math.abs(By * By + Bz * Bz);

    // Rút gọn phương trình
    const a = 2 * (Bx - Ax);
    const b = Ax * Ax + dA2 - Bx * Bx - dB2;

    // Tọa độ Mx
    const Mx = b / a;

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$. Biết $M$ thuộc trục hoành và cách đều $A$ và $B$. Khi đó tọa độ điểm $M$.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ điểm $M$ là $(${formatFraction(b, a)}; 0; 0)$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${answerStatement.trim()}$}
    \\loigiai{
        Ta có khoảng cách từ $M$ đến $A$ và $B$ là bằng nhau, nghĩa là $AM = MB$.\\\\
        Giải phương trình $(Mx - ${Ax})^2 + ${Math.abs(Ay)}^2 + ${Math.abs(Az)}^2 = (Mx - ${Bx})^2 + ${Math.abs(By)}^2 + ${Math.abs(Bz)}^2$, ta có:\\\\
        $2Mx(${Bx} - ${Ax}) = ${Ax * Ax} + ${dA2} - ${Bx * Bx} - ${dB2}$\\\\
        Tọa độ điểm $M$ là $(${formatFraction(b, a)}; 0; 0)$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính toán tọa độ điểm B
function tinh_toa_do_B(Ax, Ay, Az, Cx, Cy, Cz, Bx_prime, By_prime, Bz_prime, Dx_prime, Dy_prime, Dz_prime) {
    // Tính vector AD'
    const AD_prime_x = Dx_prime - Ax;
    const AD_prime_y = Dy_prime - Ay;
    const AD_prime_z = Dz_prime - Az;

    // Tính vector B'C
    const B_prime_C_x = Cx - Bx_prime;
    const B_prime_C_y = Cy - By_prime;
    const B_prime_C_z = Cz - Bz_prime;

    // Tọa độ điểm B là A + vector AD'
    const Bx = Ax + AD_prime_x;
    const By = Ay + AD_prime_y;
    const Bz = Az + AD_prime_z;

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho hình hộp $A B C D \\cdot A' B' C' D'$ biết $A(${Ax}; ${Ay}; ${Az})$, $C(${Cx}; ${Cy}; ${Cz})$, $B'(${Bx_prime}; ${By_prime}; ${Bz_prime})$, $D'(${Dx_prime}; ${Dy_prime}; ${Dz_prime})$. Khi đó tọa độ điểm $B$.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ điểm $B$ là $(${Bx}; ${By}; ${Bz})$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${answerStatement.trim()}$}
    \\loigiai{
        Ta có vector $\\overrightarrow{AD'} = (${AD_prime_x}; ${AD_prime_y}; ${AD_prime_z})$.\\\\
        Tọa độ điểm $B$ là $A + \\overrightarrow{AD'} = (${Ax} + ${AD_prime_x}; ${Ay} + ${AD_prime_y}; ${Az} + ${AD_prime_z}) = (${Bx}; ${By}; ${Bz})$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính toán tọa độ điểm B
function tinh_B_trongHHCN(Ax, Ay, Az, Cx, Cy, Cz, Bx_prime, By_prime, Bz_prime, Dx_prime, Dy_prime, Dz_prime) {
    // Tính trung điểm I của A và C
    const Ix = (Ax + Cx) / 2;
    const Iy = (Ay + Cy) / 2;
    const Iz = (Az + Cz) / 2;

    // Tính trung điểm J của B' và D'
    const Jx = (Bx_prime + Dx_prime) / 2;
    const Jy = (By_prime + Dy_prime) / 2;
    const Jz = (Bz_prime + Dz_prime) / 2;

    // Tính vector JI
    const JI_x = Ix - Jx;
    const JI_y = Iy - Jy;
    const JI_z = Iz - Jz;

    // Tọa độ điểm B
    const Bx = Bx_prime + JI_x;
    const By = By_prime + JI_y;
    const Bz = Bz_prime + JI_z;

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho hình hộp $ABCD.A'B'C'D'$ biết $A(${Ax}; ${Ay}; ${Az})$, $C(${Cx}; ${Cy}; ${Cz})$, $B'(${Bx_prime}; ${By_prime}; ${Bz_prime})$, $D'(${Dx_prime}; ${Dy_prime}; ${Dz_prime})$. Khi đó tọa độ điểm $B$.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ điểm $B$ là $(${formatFraction(Bx, 1)}; ${formatFraction(By, 1)}; ${formatFraction(Bz, 1)})$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${answerStatement.trim()}$}
\\loigiai{
Ta có trung điểm $I$ của $A$ và $C$ là $I(${formatFraction(Ix, 1)}; ${formatFraction(Iy, 1)}; ${formatFraction(Iz, 1)})$ và trung điểm $J$ của $B'$ và $D'$ là $J(${formatFraction(Jx, 1)}; ${formatFraction(Jy, 1)}; ${formatFraction(Jz, 1)})$.\\\\
Vector $\\overrightarrow{JI} = (${formatFraction(JI_x, 1)}; ${formatFraction(JI_y, 1)}; ${formatFraction(JI_z, 1)})$.\\\\
Tọa độ điểm $B = B' + \\overrightarrow{JI} = (${Bx_prime} + ${formatFraction(JI_x, 1)}; ${By_prime} + ${formatFraction(JI_y, 1)}; ${Bz_prime} + ${formatFraction(JI_z, 1)}) = (${formatFraction(Bx, 1)}; ${formatFraction(By, 1)}; ${formatFraction(Bz, 1)})$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinh_m_vec_ab_vuong(ax, az, bx, by, bz) {
    // Tính tích vô hướng của hai vector
    // ax * bx + ay * by + az * bz = 0
    // Giải phương trình
    const numerator = ax * bx + az * bz;
    const denominator = -by;
    const m = formatFraction(numerator, denominator);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho hai vector $\\vec{a} = (${ax}; m; ${az})$, $\\vec{b} = (${bx}; ${by}; ${bz})$. Để $\\vec{a} \\perp \\vec{b}$ thì giá trị của $m$ bằng bao nhiêu?
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${m}$}
\\loigiai{
Để hai vector vuông góc, tích vô hướng của chúng phải bằng $0$.\\\\
$\\vec{a} \\cdot \\vec{b} = ${ax} \\cdot ${bx} + m \\cdot ${by} + ${az} \\cdot ${bz} = 0$\\\\
$${ax} \\cdot ${bx} + m \\cdot ${by} + ${az} \\cdot ${bz} = 0$\\\\
$${ax * bx} + m \\cdot (${by}) + ${az * bz} = 0$\\\\
$${numerator} + m \\cdot (${by}) = 0$\\\\
$m = \\dfrac{${numerator}}{${denominator}} = ${m}$\\\\
Vậy giá trị của $m$ là $${m}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm chuyển đổi góc từ độ sang radian
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
// Hàm tính giá trị cosine đặc biệt cho các góc đặc biệt
function specialCosine(degrees) {
    switch(degrees) {
        case 30:
            return 0.5;
        case 45:
            return Math.sqrt(2) / 2;
        case 60:
            return Math.sqrt(3) / 2;
        case 90:
            return 0;
        case 120:
            return -0.5;
        case 135:
            return -Math.sqrt(2) / 2;
        case 150:
            return -Math.sqrt(3) / 2;
        case 180:
            return -1;
        default:
            return Math.cos(degreesToRadians(degrees));
    }
}

// Hàm tính giá trị cosine đặc biệt cho các góc đặc biệt trong định dạng LaTeX
function specialCosineLatex(degrees) {
    switch(degrees) {
        case 30:
            return `\\dfrac{3}{2}`;
        case 45:
            return `\\dfrac{\\sqrt{2}}{2}`;
        case 60:
            return `\\dfrac{1}{2}`;
        case 90:
            return `0`;
        case 120:
            return `-\\dfrac{1}{2}`;
        case 135:
            return `-\\dfrac{\\sqrt{2}}{2}`;
        case 150:
            return `-\\dfrac{\\sqrt{3}}{2}`;
        case 180:
            return `-1`;
        default:
            return Math.cos(degreesToRadians(degrees)).toString();
    }
}
// Hàm tính độ dài của vector |a - b| và làm tròn kết quả đến hai chữ số thập phân
function tinh_do_dai_a_tru_b(a_magnitude, b_magnitude, angle_degrees) {
    // Sử dụng giá trị cosine đặc biệt cho các góc đặc biệt
    const cosTheta = specialCosine(angle_degrees);
    const cosThetaLatex = specialCosineLatex(angle_degrees);

    // Tính toán độ dài của vector a - b
    const magnitude_a_minus_b = Math.sqrt(
        Math.pow(a_magnitude, 2) + Math.pow(b_magnitude, 2) - 2 * a_magnitude * b_magnitude * cosTheta
    );

    // Làm tròn kết quả đến hai chữ số thập phân
    const roundedMagnitude = magnitude_a_minus_b.toFixed(2);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho $\\widehat(\\vec{a}, \\vec{b}) = ${angle_degrees}^{\\circ}$ và $|\\vec{a}| = ${a_magnitude}; |\\vec{b}| = ${b_magnitude}$. Khi đó $|\\vec{a} - \\vec{b}|$ có giá trị bằng bao nhiêu? (Làm tròn $2$ chữ số thập phân)
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Giá trị của $|\\vec{a} - \\vec{b}|$ là $${roundedMagnitude}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${roundedMagnitude}$}
    \\loigiai{
        Sử dụng định lý cosine để tính độ dài của vector $\\vec{a} - \\vec{b}$:\\\\
        $|\\vec{a} - \\vec{b}| = \\sqrt{|\\vec{a}|^2 + |\\vec{b}|^2 - 2|\\vec{a}||\\vec{b}|\\cos(\\theta)}$\\\\
        $|\\vec{a} - \\vec{b}| = \\sqrt{${a_magnitude}^2 + ${b_magnitude}^2 - 2 \\cdot ${a_magnitude} \\cdot ${b_magnitude} \\cdot ${cosThetaLatex}}$\\\\
        $|\\vec{a} - \\vec{b}| = \\sqrt{${Math.pow(a_magnitude, 2)} + ${Math.pow(b_magnitude, 2)} - 2 \\cdot ${a_magnitude} \\cdot ${b_magnitude} \\cdot ${cosThetaLatex}}$\\\\
        $|\\vec{a} - \\vec{b}| = ${roundedMagnitude}$\\\\
        Vậy giá trị của $|\\vec{a} - \\vec{b}|$ là $${roundedMagnitude}$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinh_vecB_bang_k_vecA(ax, ay, az, scaleFactor) {
    // Tính toán các thành phần của vector b
    const bx = scaleFactor * ax;
    const by = scaleFactor * ay;
    const bz = scaleFactor * az;

    // Tính tổng ba tọa độ của vector b
    const sumOfCoordinates = bx + by + bz;

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho $\\vec{a} = (${ax}; ${ay}; ${az})$. Biết hai vector $\\vec{a}$ và $\\vec{b}$ cùng hướng và $|\\vec{b}| = ${scaleFactor}|\\vec{a}|$. Khi đó tọa độ vector $\\vec{b}$ là gì và tổng các tọa độ của nó bằng bao nhiêu?
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ vector $\\vec{b}$ là $(${bx}; ${by}; ${bz})$ và tổng các tọa độ là $${sumOfCoordinates}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${sumOfCoordinates}$}
    \\loigiai{
        Ta có $\\vec{b} = k\\vec{a}$ với $k = ${scaleFactor}$.\\\\
        $\\vec{b} = ${scaleFactor} \\cdot (${ax}; ${ay}; ${az}) = (${bx}; ${by}; ${bz})$.\\\\
        Vậy tọa độ vectơ $\\vec{b}$ là $(${bx}; ${by}; ${bz})$.\\\\
        Tổng các tọa độ của vectơ $\\vec{b}$ là $${bx} + ${by} + ${bz} = ${sumOfCoordinates}$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinh_vecB_cungphuong_vecA(ax, ay, az, scaleFactor) {
    // Tính toán các thành phần của vector b khi k > 0
    const bx1 = scaleFactor * ax;
    const by1 = scaleFactor * ay;
    const bz1 = scaleFactor * az;

    // Tính toán các thành phần của vector b khi k < 0
    const bx2 = -scaleFactor * ax;
    const by2 = -scaleFactor * ay;
    const bz2 = -scaleFactor * az;

    // Tính tổng bình phương của các tọa độ của vector b trong cả hai trường hợp
    const sumOfSquares1 = bx1 * bx1 + by1 * by1 + bz1 * bz1;
    const sumOfSquares2 = bx2 * bx2 + by2 * by2 + bz2 * bz2;
    const kq = sumOfSquares1 +sumOfSquares2
    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho $\\vec{a} = (${ax}; ${ay}; ${az})$. Biết hai vector $\\vec{a}$ và $\\vec{b}$ cùng phương và $|\\vec{b}| = ${scaleFactor}|\\vec{a}|$. Khi đó tổng bình phương các tọa độ của vector $\\vec{b}$ bằng bao nhiêu?
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Trong trường hợp $k > 0$: tổng bình phương các tọa độ của vector $\\vec{b}$ là $${sumOfSquares1}$.\\
        Trong trường hợp $k < 0$: tổng bình phương các tọa độ của vector $\\vec{b}$ là $${sumOfSquares2}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${kq}$}
    \\loigiai{
        Ta có $\\vec{b} = k\\vec{a}$ với $k = \\pm ${scaleFactor}$.\\\\
        Trong trường hợp $k > 0$:\\\\
        $\\vec{b} = ${scaleFactor} \\cdot (${ax}; ${ay}; ${az}) = (${bx1}; ${by1}; ${bz1})$.\\\\
        Tổng bình phương các tọa độ của vector $\\vec{b}$ là $${bx1}^2 + ${by1}^2 + ${bz1}^2 = ${sumOfSquares1}$.\\\\
        Trong trường hợp $k < 0$:\\\\
        $\\vec{b} = -${scaleFactor} \\cdot (${ax}; ${ay}; ${az}) = (${bx2}; ${by2}; ${bz2})$.\\\\
        Tổng bình phương các tọa độ của vector $\\vec{b}$ là $${bx2}^2 + ${by2}^2 + ${bz2}^2 = ${sumOfSquares2}$.\\\\
        Suy ra tổng bình phương các tọa độ của vector $\\vec{b}$ trong từng trường hợp là:\\\\
        \\begin{itemize}
            \\item Trường hợp $k > 0$: $${sumOfSquares1}$
            \\item Trường hợp $k < 0$: $${sumOfSquares2}$
        \\end{itemize}
        Vậy tổng bình phương các tọa độ của vector $\\vec{b}=${kq}$. 
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
 // Hàm tính giá trị m để tam giác vuông tại N
 function tim_m_tamgiacvuong(Mx, My, Mz, Nx, Ny, Nz, Px,a, Pz) {
    // Tính các vector NM và NP
    const NMx = Mx - Nx;
    const NMy = My - Ny;
    const NMz = Mz - Nz;
    const NPx = Px - Nx;
    const NPz = Pz - Nz;
    const Nya = a-Ny;

    // Biểu thức của Py - Ny
    const NPy_expr = `m + ${Nya}`;

    // Tính tích vô hướng của NM và NP
    const dotProduct_expr = `${NMx} * ${NPx} + ${NMy} * (${NPy_expr}) + ${NMz} * ${NPz}`;
    
    // Chuyển vế để tìm m
    const leftSideSimplified = math.simplify(`${NMx} * ${NPx} + ${NMz} * ${NPz}`).toString();
    const rightSideSimplified = math.simplify(`-${NMy}`).toString();
    
    // Giải phương trình cho m
    let mValue = math.evaluate(`${leftSideSimplified} / ${rightSideSimplified} + ${Nya}`);
    // Giải phương trình cho m
    //let mValue = math.evaluate(`${leftSideSimplified} / ${rightSideSimplified} + ${Ny} - ${a}`);
    mValue = parseFloat(mValue.toFixed(2)); // Làm tròn đến 2 chữ số thập phân
    if (mValue % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        mValue = Math.round(mValue);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho ba điểm $M(${Mx}; ${My}; ${Mz})$, $N(${Nx}; ${Ny}; ${Nz})$ và $P(${Px}; m+${a}; ${Pz})$. 
        Tìm $m$ để tam giác $MNP$ vuông tại $N$, làm tròn $2$ chữ số thập phân (nếu có).
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Giá trị của $m$ để tam giác $MNP$ vuông tại $N$ là $${mValue}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${mValue}$}
\\loigiai{
    Ta có vector $\\overrightarrow{NM} = (${NMx}; ${NMy}; ${NMz})$ và $\\overrightarrow{NP} = (${NPx}; m + ${a}- ${Ny}; ${NPz})$.\\\\
    Tích vô hướng của $\\overrightarrow{NM}$ và $\\overrightarrow{NP}$ là:
    \\[
        (${NMx})(${NPx}) + (${NMy})(m + ${Nya}) + (${NMz})(${NPz}) = 0
    \\]
    Giải phương trình này, ta được:
    \\[
        m = \\dfrac{${leftSideSimplified}}{${rightSideSimplified}} + ${Nya}
    \\]
    Vậy giá trị của $m$ để tam giác $MNP$ vuông tại $N$ là $${mValue}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tim_M_trenOX_tgvuong(Ax, Ay, Az, Bx, By, Bz) {
    // Tính các tọa độ của vector AB
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;

    // Biểu thức của tọa độ Mx
    const AMx_expr = `Mx - ${Ax}`;
    const AMy = -Ay;
    const AMz = -Az;

    // Tích vô hướng của vector AM và AB
    const dotProduct_expr = `${AMx_expr} * ${ABx} + ${AMy} * ${ABy} + ${AMz} * ${ABz}`;

    // Chuyển đổi biểu thức thành phương trình đại số
    const equation = math.parse(dotProduct_expr);
    const solvedEquation = math.simplify(equation).toString();
    
    // Tách vế trái và vế phải
    const parts = solvedEquation.split('=');
    const leftSide = parts[0].trim();
    const rightSide = parts.length > 1 ? parts[1].trim() : '0';

    // Chuyển vế để tìm Mx
    const leftSideSimplified = math.simplify(`${ABx}`);
    const rightSideSimplified = math.simplify(`-${ABy} * ${AMy} - ${ABz} * ${AMz}`);
    let MxValue = math.evaluate(`${rightSideSimplified} / ${leftSideSimplified} + ${Ax}`);
    MxValue = parseFloat(MxValue.toFixed(1)); // Làm tròn đến 1 chữ số thập phân
    if (MxValue % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        MxValue = Math.round(MxValue);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Tìm hoành độ của điểm $M$ trên $Ox$ sao cho tam giác $ABM$ vuông tại $A$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$ làm tròn một chữu số thập phân (nếu có).
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${MxValue}$}
    \\loigiai{
        Ta có vector $\\overrightarrow{AB} = (${ABx}; ${ABy}; ${ABz})$ và $\\overrightarrow{AM} = (Mx - ${Ax}; -${Ay}; -${Az})$.\\\\
        Tích vô hướng của $\\overrightarrow{AM}$ và $\\overrightarrow{AB}$ là:
        \\[
            (Mx - ${Ax})(${ABx}) + (-${Ay})(${ABy}) + (-${Az})(${ABz}) = 0
        \\]
        Giải phương trình này, ta được:
        \\[
            Mx = \\frac{${rightSideSimplified}}{${leftSideSimplified}} + ${Ax} = ${MxValue}
        \\]
        Vậy tọa độ điểm $M$ trên $Ox$ sao cho tam giác $ABM$ vuông tại $A$ là $(${MxValue}; 0; 0)$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinhDienTichTamGiac(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính các tọa độ của vector AB và AC
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    const ACx = Cx - Ax;
    const ACy = Cy - Ay;
    const ACz = Cz - Az;

    // Tính tích có hướng của vector AB và AC
    const crossProductX = ABy * ACz - ABz * ACy;
    const crossProductY = ABz * ACx - ABx * ACz;
    const crossProductZ = ABx * ACy - ABy * ACx;

    // Tính độ dài của tích có hướng
    const crossProductLength = Math.sqrt(
        crossProductX * crossProductX + 
        crossProductY * crossProductY + 
        crossProductZ * crossProductZ
    );

    // Tính diện tích tam giác
    const area = (crossProductLength / 2).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (area % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        area = Math.round(area);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. Tính diện tích tam giác $ABC$, làm tròn một chữu số thập phân (nếu có).
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Diện tích tam giác $ABC$ là $${area}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${area}$}
    \\loigiai{
        Ta có các vector $\\overrightarrow{AB} = (${ABx}; ${ABy}; ${ABz})$ và $\\overrightarrow{AC} = (${ACx}; ${ACy}; ${ACz})$.\\\\
        Tích có hướng của $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ là:
        \\[
            [\\overrightarrow{AB},\\overrightarrow{AC}] = (${crossProductX}; ${crossProductY}; ${crossProductZ})
        \\]
        Độ dài của tích có hướng là:
        \\[
            |[\\overrightarrow{AB},\\overrightarrow{AC}]| = \\sqrt{${crossProductX}^2 + ${crossProductY}^2 + ${crossProductZ}^2} = ${crossProductLength}
        \\]
        Diện tích tam giác $ABC$ là:
        \\[
            \\dfrac{1}{2} |[\\overrightarrow{AB},\\overrightarrow{AC}]| = ${area}
        \\]
        Vậy diện tích tam giác $ABC$ là $${area}$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính đường cao AH từ đỉnh A đến cạnh BC
function tinhDuongCaoAH(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính các tọa độ của vector AB và AC
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    const ACx = Cx - Ax;
    const ACy = Cy - Ay;
    const ACz = Cz - Az;

    // Tính tích có hướng của vector AB và AC
    const crossProductX = ABy * ACz - ABz * ACy;
    const crossProductY = ABz * ACx - ABx * ACz;
    const crossProductZ = ABx * ACy - ABy * ACx;
    // Tính độ dài của tích có hướng
    const crossProductLength = Math.sqrt(
        crossProductX * crossProductX + 
        crossProductY * crossProductY + 
        crossProductZ * crossProductZ
    );
    // Tính độ dài cạnh BC
    const BCx = Cx - Bx;
    const BCy = Cy - By;
    const BCz = Cz - Bz;
    const BC_length = Math.sqrt(BCx * BCx + BCy * BCy + BCz * BCz).toFixed(3);;
    if (BC_length % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        BC_length = Math.round(BC_length);
    }

    // Tính diện tích tam giác
    const area = (crossProductLength / 2).toFixed(3); // Làm tròn đến 1 chữ số thập phân
    if (area % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        area = Math.round(area);
    }

    // Tính đường cao AH
    let AH = (2 * area / BC_length).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (AH % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        AH = Math.round(AH);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. Tính đường cao $AH$.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Đường cao $AH$ là $${AH}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${AH}$}
\\loigiai{
    Ta có các vector $\\overrightarrow{AB} = (${Bx - Ax}; ${By - Ay}; ${Bz - Az})$ và $\\overrightarrow{AC} = (${Cx - Ax}; ${Cy - Ay}; ${Cz - Az})$.\\\\
    Tích có hướng của $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ là:
    \\[
        [\\overrightarrow{AB},\\overrightarrow{AC}] = (${ABx * ACy - ABy * ACx}; ${ABz * ACx - ABx * ACz}; ${ABx * ACz - ABz * ACx})
    \\]
    Độ dài của tích có hướng là:
    \\[
        |[\\overrightarrow{AB},\\overrightarrow{AC}]| = \\sqrt{(${ABx * ACy - ABy * ACx})^2 + (${ABz * ACx - ABx * ACz})^2 + (${ABx * ACz - ABz * ACx})^2} = ${crossProductLength}
    \\]
    Diện tích tam giác $ABC$ là:
    \\[
        \\dfrac{1}{2} |[\\overrightarrow{AB},\\overrightarrow{AC}]| = ${area}
    \\]
    Độ dài cạnh $BC$ là:
    \\[
        BC = \\sqrt{(${BCx})^2 + (${BCy})^2 + (${BCz})^2} = ${BC_length}
    \\]
    Đường cao $AH$ từ đỉnh $A$ xuống cạnh $BC$ là:
    \\[
        AH = \\dfrac{2 \\times ${area}}{BC} = ${AH}
    \\]
    Vậy đường cao $AH$ là $${AH}$.
}
\\end{ex}
    `;
    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinhDienTichHBH(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính các tọa độ của vector AB và AC
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    const ACx = Cx - Ax;
    const ACy = Cy - Ay;
    const ACz = Cz - Az;

    // Tính tích có hướng của vector AB và AC
    const crossProductX = ABy * ACz - ABz * ACy;
    const crossProductY = ABz * ACx - ABx * ACz;
    const crossProductZ = ABx * ACy - ABy * ACx;

    // Tính độ dài của tích có hướng
    const crossProductLength = Math.sqrt(
        crossProductX * crossProductX + 
        crossProductY * crossProductY + 
        crossProductZ * crossProductZ
    );

    // Tính diện tích tam giác
    const area = (crossProductLength / 2).toFixed(3); // Làm tròn đến 1 chữ số thập phân
    if (area % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        area = Math.round(area);
    }
    const areahbh = (crossProductLength).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (areahbh % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        areahbh = Math.round(areahbh);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho hình bình hành $ABCD$ biết $\\triangle ABC$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. Tính diện tích hình bình hành $ABCD$, làm tròn một chữ số thập phân (nếu có).
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Diện tích tam giác $ABC$ là $${area}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${area}$}
    \\loigiai{
        Ta có các vector $\\overrightarrow{AB} = (${ABx}; ${ABy}; ${ABz})$ và $\\overrightarrow{AC} = (${ACx}; ${ACy}; ${ACz})$.\\\\
        Tích có hướng của $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ là:
        \\[
            [\\overrightarrow{AB},\\overrightarrow{AC}] = (${crossProductX}; ${crossProductY}; ${crossProductZ})
        \\]
        Độ dài của tích có hướng là:
        \\[
            |[\\overrightarrow{AB},\\overrightarrow{AC}]| = \\sqrt{${crossProductX}^2 + ${crossProductY}^2 + ${crossProductZ}^2} = ${crossProductLength}
        \\]
        Diện tích tam giác $ABC$ là:
        \\[
            \\dfrac{1}{2} |[\\overrightarrow{AB},\\overrightarrow{AC}]| = ${area}
        \\]
        Ta được diện tích tam giác $ABC$ là $${area}$.\\\\
        Vậy diện tích hình bình hành $ABCD$ là $S_{ABCD}=2S_{ABC}=${areahbh}$.
    }
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function tinhTheTichTuDien(Ox, Oy, Oz, Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tạo các vector từ gốc tọa độ đến các điểm
    const vectorOA = [Ax - Ox, Ay - Oy, Az - Oz];
    const vectorOB = [Bx - Ox, By - Oy, Bz - Oz];
    const vectorOC = [Cx - Ox, Cy - Oy, Cz - Oz];

    // Tính tích chéo của vector OB và OC
    const crossProductX = vectorOB[1] * vectorOC[2] - vectorOB[2] * vectorOC[1];
    const crossProductY = vectorOB[2] * vectorOC[0] - vectorOB[0] * vectorOC[2];
    const crossProductZ = vectorOB[0] * vectorOC[1] - vectorOB[1] * vectorOC[0];

    // Tính tích vô hướng của vector OA và tích chéo
    const dotProduct = vectorOA[0] * crossProductX + vectorOA[1] * crossProductY + vectorOA[2] * crossProductZ;

    // Tính thể tích của tứ diện
    const volume = Math.abs(dotProduct) / 6;

    // Làm tròn thể tích đến 1 chữ số thập phân
    let roundedVolume = parseFloat(volume.toFixed(1));

    // Nếu là số nguyên, bỏ phần thập phân
    if (roundedVolume % 1 === 0) {
        roundedVolume = Math.round(roundedVolume);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tứ diện $O.ABC$ biết $O(${Ox}, ${Oy}, ${Oz})$, $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. 
        Tính thể tích của tứ diện $O.ABC$, làm tròn đến một chữ số thập phân (nếu có).
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Thể tích của tứ diện $O.ABC$ là $${roundedVolume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${roundedVolume}$}
    \\loigiai{
        Ta có các vector $\\overrightarrow{OA} = (${vectorOA[0]}, ${vectorOA[1]}, ${vectorOA[2]})$, $\\overrightarrow{OB} = (${vectorOB[0]}, ${vectorOB[1]}, ${vectorOB[2]})$ và $\\overrightarrow{OC} = (${vectorOC[0]}, ${vectorOC[1]}, ${vectorOC[2]}).\\\\
        Tích có hướng của $\\overrightarrow{OB}$ và $\\overrightarrow{OC}$ là:
        \\[
            \\overrightarrow{OB} \\times \\overrightarrow{OC} = (${crossProductX}, ${crossProductY}, ${crossProductZ})
        \\]
        Tích vô hướng của $\\overrightarrow{OA}$ và tích có hướng là:
        \\[
            \\overrightarrow{OA} \\cdot (\\overrightarrow{OB} \\times \\overrightarrow{OC}) = ${dotProduct}
        \\]
        Thể tích của tứ diện $O.ABC$ là:
        \\[
            V = \\dfrac{1}{6} \\left| \\overrightarrow{OA} \\cdot (\\overrightarrow{OB} \\times \\overrightarrow{OC}) \\right| = ${volume.toFixed(3)}
        \\]
        Làm tròn đến một chữ số thập phân, ta được:
        \\[
            V = ${roundedVolume}
        \\]
    }
\\end{ex}
    `;

    return latexOutput;
}
function tinhDuongCaoTuDien(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz, Dx, Dy, Dz) {
    const vectorAB = [Bx - Ax, By - Ay, Bz - Az];
    const vectorAC = [Cx - Ax, Cy - Ay, Cz - Az];
    const vectorAD = [Dx - Ax, Dy - Ay, Dz - Az];
    const vectorBC = [Cx - Bx, Cy - By, Cz - Bz];
    const vectorBD = [Dx - Bx, Dy - By, Dz - Bz];

    // Tính tích có hướng của vector BC và BD
    const crossProduct = math.cross(vectorBC, vectorBD);
    const crossProductLength = Math.sqrt(
        crossProduct[0] * crossProduct[0] +
        crossProduct[1] * crossProduct[1] +
        crossProduct[2] * crossProduct[2]
    );

    // Tính tích hỗn tạp [AB, AC, AD]
    const dotProduct = math.dot(vectorAB, math.cross(vectorAC, vectorAD));
    const volume = (Math.abs(dotProduct) / 6).toFixed(2);;

    // Tính diện tích tam giác BCD
    const areaBCD = (crossProductLength / 2).toFixed(2);;

    // Tính đường cao từ đỉnh A đến mặt phẳng BCD
    const height = (6 * volume / crossProductLength).toFixed(1);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tứ diện $ABCD$ với các tọa độ $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$, $D(${Dx}, ${Dy}, ${Dz})$. 
        Tính độ dài đường cao từ đỉnh $A$ đến mặt phẳng $BCD$, làm tròn đến một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Đường cao từ đỉnh $A$ đến mặt phẳng $BCD$ là $${height}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{${height}}
    \\loigiai{
        Ta có các vector $\\overrightarrow{AB} = (${Bx - Ax}, ${By - Ay}, ${Bz - Az})$, $\\overrightarrow{AC} = (${Cx - Ax}, ${Cy - Ay}, ${Cz - Az})$ và $\\overrightarrow{AD} = (${Dx - Ax}, ${Dy - Ay}, ${Dz - Az})$.\\\\
        Vector $\\overrightarrow{BC} = (${Cx - Bx}, ${Cy - By}, ${Cz - Bz})$ và $\\overrightarrow{BD} = (${Dx - Bx}, ${Dy - By}, ${Dz - Bz})$.\\\\
        Tích có hướng của $\\overrightarrow{BC}$ và $\\overrightarrow{BD}$ là:
        \\[
            [\\overrightarrow{BC},\\overrightarrow{BD}] = (${crossProduct[0]}, ${crossProduct[1]}, ${crossProduct[2]})
        \\]
        Độ dài của tích có hướng là:
        \\[
            |[\\overrightarrow{BC},\\overrightarrow{BD}]| = \\sqrt{${Math.pow(crossProduct[0], 2)} + ${Math.pow(crossProduct[1], 2)} + ${Math.pow(crossProduct[2], 2)}} = ${crossProductLength}
        \\]
        Tích hỗn tạp $[\\overrightarrow{AB}, \\overrightarrow{AC}]\\overrightarrow{AD}$ là:
        \\[
            [\\overrightarrow{BC},\\overrightarrow{BD}]\\overrightarrow{BA} = ${dotProduct}
        \\]
        Thể tích của tứ diện $ABCD$ là:
        \\[
            V = \\dfrac{1}{6} |[\\overrightarrow{BC},\\overrightarrow{BD}]\\overrightarrow{BA}| = ${volume}
        \\]
        Diện tích tam giác $BCD$ là:
        \\[
            S_{BCD} = \\dfrac{1}{2} |[\\overrightarrow{BC}, \\overrightarrow{BD}]| = ${areaBCD}
        \\]
        Đường cao từ đỉnh $A$ đến mặt phẳng $BCD$ là:
        \\[
            h = \\dfrac{3V_{ABCD}}{S_{BCD}} = ${height}
        \\]
    }
\\end{ex}
    `;

    return latexOutput;
}
function tim_m_3vecto_dphang(a1, a2, a3, b1, b2, b3, thamso, c2, c3) {
    // Tính hệ số của m
    const coefficient = -(a2 * (-b3) - a3 * b2);

    // Tính các hằng số còn lại
    const constantTerm = a1 * (b2 * c3 - b3 * c2) + a2 * (b1 * c3) - a3 * (b1 * c2);

    // Giải phương trình bậc nhất để tìm m
    const m_goc = (-constantTerm / coefficient);
    const m = (m_goc-thamso).toFixed(1);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Tìm $m$ để ba vector $\\vec{a} = (${a1}, ${a2}, ${a3})$, $\\vec{b} = (${b1}, ${b2}, ${b3})$, $\\vec{c} = (m+${thamso}, ${c2}, ${c3})$ đồng phẳng.
    `;
    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${m}$}
    \\loigiai{
    }
\\end{ex}
    `;

    return latexOutput;
}
function tim_m_4_diem_dphang(xA, yA, zA, xB, yB, zB, xC, yC, zC, thamso, yD, zD) {
    // Tạo các vector AB, AC
    const AB = [xB - xA, yB - yA, zB - zA];
    const AC = [xC - xA, yC - yA, zC - zA];
    
    // Tính tích có hướng của AB và AC
    const crossProduct = [
        AB[1] * AC[2] - AB[2] * AC[1],
        AB[2] * AC[0] - AB[0] * AC[2],
        AB[0] * AC[1] - AB[1] * AC[0]
    ];
    
    // Tính giá trị vô hướng với vector AD
    const VP = (yD - yA) * crossProduct[1] + (zD - zA) * crossProduct[2]; 
    
    // Giải phương trình bậc nhất để tìm m
    const m_goc = (-VP / crossProduct[0]) + xA;
    const m = (m_goc - thamso).toFixed(1);
    if (m % 1 === 0) {
        m = Math.round(m);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Tìm $m$ để bốn điểm $A(${xA},${yA},${zA})$, $B(${xB}, ${yB}, ${zB})$, $C(${xC}, ${yC}, ${zC})$, $D(m + ${thamso}, ${yD}, ${zD})$ đồng phẳng, làm tròn một chữ số thập phân.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${m}$}
    \\loigiai{
    }
\\end{ex}
    `;

    return latexOutput;
}
function timTrucTam(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tạo các vector AB, AC
    const AB = [Bx - Ax, By - Ay, Bz - Az];
    const AC = [Cx - Ax, Cy - Ay, Cz - Az];
    const BC = [Cx - Bx, Cy - By, Cz - Bz];

    // Tính tích có hướng của AB và AC để tìm vector pháp tuyến của mặt phẳng chứa tam giác ABC
    const normalABC = [
        AB[1] * AC[2] - AB[2] * AC[1],
        AB[2] * AC[0] - AB[0] * AC[2],
        AB[0] * AC[1] - AB[1] * AC[0]
    ];

    // Phương trình mặt phẳng ABC: normalABC[0] * x + normalABC[1] * y + normalABC[2] * z = dABC
    const dABC = normalABC[0] * Ax + normalABC[1] * Ay + normalABC[2] * Az;

    // Tính vector pháp tuyến của mặt phẳng qua A vuông góc với BC
    const normalA = BC;

    // Phương trình mặt phẳng qua A vuông góc với BC: normalA[0] * x + normalA[1] * y + normalA[2] * z = dA
    const dA = normalA[0] * Ax + normalA[1] * Ay + normalA[2] * Az;

    // Tính vector pháp tuyến của mặt phẳng qua B vuông góc với AC
    const normalB = AC;

    // Phương trình mặt phẳng qua B vuông góc với AC: normalB[0] * x + normalB[1] * y + normalB[2] * z = dB
    const dB = normalB[0] * Bx + normalB[1] * By + normalB[2] * Bz;

    // Giải hệ phương trình để tìm tọa độ trực tâm H
    const A = [
        [normalABC[0], normalABC[1], normalABC[2]],
        [normalA[0], normalA[1], normalA[2]],
        [normalB[0], normalB[1], normalB[2]]
    ];
    const B = [dABC, dA, dB];

    // Sử dụng phương pháp Gauss để giải hệ phương trình tuyến tính
    const H = gaussJordanElimination(A, B);
    let sum_H=(H[0]+H[1]+H[2]).toFixed(1);
    if (sum_H % 1 === 0) {
        sum_H = Math.round(sum_H);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tìm tổng các toạ độ của trực tâm $H$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tính vector pháp tuyến của mặt phẳng chứa tam giác $\\triangle ABC$:
        \\[
            \\overrightarrow{n_{ABC}} = \\overrightarrow{AB} \\times \\overrightarrow{AC} = (${normalABC[0]}, ${normalABC[1]}, ${normalABC[2]})
        \\]
        Phương trình mặt phẳng $ABC$ là:
        \\[
            ${normalABC[0]}x + ${normalABC[1]}y + ${normalABC[2]}z = ${dABC}.
        \\]
        Phương trình mặt phẳng qua $A$ vuông góc với $BC$ là:
        \\[
            ${normalA[0]}x + ${normalA[1]}y + ${normalA[2]}z = ${dA}.
        \\]
        Phương trình mặt phẳng qua $B$ vuông góc với $AC$ là:
        \\[
            ${normalB[0]}x + ${normalB[1]}y + ${normalB[2]}z = ${dB}.
        \\]
        Giải hệ phương trình ta được tọa độ trực tâm $H$ là:
        \\[
            H(${H[0].toFixed(2)}, ${H[1].toFixed(2)}, ${H[2].toFixed(2)})
        \\]
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
    ${problemStatement.trim()}
    \\shortans{$${sum_H}$}
    \\loigiai{
        ${answerStatement.trim()}
    }
\\end{ex}
    `;

    return latexOutput;
}

function gaussJordanElimination(A, B) {
    const n = A.length;
    const augmentedMatrix = A.map((row, i) => [...row, B[i]]);

    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmentedMatrix[k][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
                maxRow = k;
            }
        }

        [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];

        for (let k = i + 1; k < n; k++) {
            const c = -augmentedMatrix[k][i] / augmentedMatrix[i][i];
            for (let j = i; j < n + 1; j++) {
                if (i === j) {
                    augmentedMatrix[k][j] = 0;
                } else {
                    augmentedMatrix[k][j] += c * augmentedMatrix[i][j];
                }
            }
        }
    }

    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        x[i] = augmentedMatrix[i][n] / augmentedMatrix[i][i];
        for (let k = i - 1; k >= 0; k--) {
            augmentedMatrix[k][n] -= augmentedMatrix[k][i] * x[i];
        }
    }

    return x;
}
// Hàm tính chân đường cao từ đỉnh A đến cạnh BC
function tinhChanDuongCao(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính vector BC
    const BCx = Cx - Bx;
    const BCy = Cy - By;
    const BCz = Cz - Bz;

    // Tọa độ điểm H theo phương trình parametric
    const t = ((Ax - Bx) * BCx + (Ay - By) * BCy + (Az - Bz) * BCz) / (BCx * BCx + BCy * BCy + BCz * BCz);

    const Hx = Bx + t * BCx;
    const Hy = By + t * BCy;
    const Hz = Bz + t * BCz;

    // Tính tổng các tọa độ của điểm H
    const totalH = (Hx + Hy + Hz).toFixed(1);

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}; ${Ay}; ${Az})$, $B(${Bx}; ${By}; ${Bz})$, $C(${Cx}; ${Cy}; ${Cz})$. 
        Tính tổng các toạ độ của chân đường cao từ đỉnh $A$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Chân đường cao từ đỉnh $A$ là $H(${Hx.toFixed(1)}; ${Hy.toFixed(1)}; ${Hz.toFixed(1)})$. Tổng các tọa độ của điểm H là $${totalH}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${totalH}$}
\\loigiai{
    Ta có vector $\\overrightarrow{BC} = (${BCx}; ${BCy}; ${BCz})$.\\\\
    Gọi $H(x; y; z)$ là chân đường cao từ $A$ kẻ đến $BC$, ta có: \\\\
    $\\overrightarrow{AH} = (x - ${Ax}; y - ${Ay}; z - ${Az})$.\\\\
    Cách này dùng công thức tính nhanh.\\\\
    Tọa độ $H$ thỏa mãn:
    \\[
        t = \\dfrac{(${Ax} - ${Bx}) \\cdot ${BCx} + (${Ay} - ${By}) \\cdot ${BCy} + (${Az} - ${Bz}) \\cdot ${BCz}}{${BCx}^2 + ${BCy}^2 + ${BCz}^2}
    \\]
    Từ đó tọa độ của $H$ là:
    \\[
        H(${Hx.toFixed(1)}; ${Hy.toFixed(1)}; ${Hz.toFixed(1)})
    \\]
    Tổng các tọa độ của điểm $H$ là:
    \\[
        ${Hx.toFixed(2)} + ${Hy.toFixed(2)} + ${Hz.toFixed(2)} = ${totalH}
    \\]
    Vậy chân đường cao từ đỉnh $A$ là $H(${Hx.toFixed(2)}; ${Hy.toFixed(2)}; ${Hz.toFixed(2)})$ và tổng các tọa độ là $${totalH}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính tổng các tọa độ của tâm đường tròn ngoại tiếp tam giác ABC
function tinhTamDuongTronNgoaiTiep(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tạo các vector AB, AC
    const AB = [Bx - Ax, By - Ay, Bz - Az];
    const AC = [Cx - Ax, Cy - Ay, Cz - Az];
    const BC = [Cx - Bx, Cy - By, Cz - Bz];

    // Tính trung điểm của các cạnh AB và AC
    const midAB = [(Ax + Bx) / 2, (Ay + By) / 2, (Az + Bz) / 2];
    const midAC = [(Ax + Cx) / 2, (Ay + Cy) / 2, (Az + Cz) / 2];

    // Tính vector pháp tuyến của mặt phẳng chứa tam giác ABC
    const normalABC = [
        AB[1] * AC[2] - AB[2] * AC[1],
        AB[2] * AC[0] - AB[0] * AC[2],
        AB[0] * AC[1] - AB[1] * AC[0]
    ];

    // Phương trình mặt phẳng ABC: normalABC[0] * x + normalABC[1] * y + normalABC[2] * z = dABC
    const dABC = normalABC[0] * Ax + normalABC[1] * Ay + normalABC[2] * Az;

    // Tính vector pháp tuyến của mặt phẳng vuông góc với AB tại trung điểm của AB
    const normalA = BC;

    // Phương trình mặt phẳng qua trung điểm AB vuông góc với BC: normalA[0] * x + normalA[1] * y + normalA[2] * z = dA
    const dA = normalA[0] * midAB[0] + normalA[1] * midAB[1] + normalA[2] * midAB[2];

    // Tính vector pháp tuyến của mặt phẳng vuông góc với AC tại trung điểm của AC
    const normalB = AB;

    // Phương trình mặt phẳng qua trung điểm AC vuông góc với AB: normalB[0] * x + normalB[1] * y + normalB[2] * z = dB
    const dB = normalB[0] * midAC[0] + normalB[1] * midAC[1] + normalB[2] * midAC[2];

    // Giải hệ phương trình để tìm tọa độ tâm đường tròn ngoại tiếp
    const A = [
        [normalABC[0], normalABC[1], normalABC[2]],
        [normalA[0], normalA[1], normalA[2]],
        [normalB[0], normalB[1], normalB[2]]
    ];
    const B = [dABC, dA, dB];

    // Sử dụng phương pháp Gauss để giải hệ phương trình tuyến tính
    const O = gaussJordanElimination(A, B);

    if (!O) {
        throw new Error("Error solving the system of equations: Matrix is singular or no solution found");
    }

    let sum_O = (O[0] + O[1] + O[2]).toFixed(1);
    if (sum_O % 1 === 0) {
        sum_O = Math.round(sum_O);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tính tổng các toạ độ của tâm đường tròn ngoại tiếp tam giác $ABC$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tính trung điểm của các cạnh $AB$ và $AC$: \\\\
        Trung điểm của $AB$: $M_{AB}(${midAB[0]}, ${midAB[1]}, ${midAB[2]})$ \\\\
        Trung điểm của $AC$: $M_{AC}(${midAC[0]}, ${midAC[1]}, ${midAC[2]})$ \\\\
        Tính vector pháp tuyến của mặt phẳng chứa tam giác $\\triangle ABC$: \\\\
        \\[
            \\overrightarrow{n_{ABC}} = \\overrightarrow{AB} \\times \\overrightarrow{AC} = (${normalABC[0]}, ${normalABC[1]}, ${normalABC[2]})
        \\] \\\\
        Phương trình mặt phẳng $ABC$ là: \\\\
        \\[
            ${normalABC[0]}x + ${normalABC[1]}y + ${normalABC[2]}z = ${dABC}
        \\] \\\\
        Phương trình mặt phẳng qua trung điểm $AB$ vuông góc với $BC$ là: \\\\
        \\[
            ${normalA[0]}x + ${normalA[1]}y + ${normalA[2]}z = ${dA}
        \\] \\\\
        Phương trình mặt phẳng qua trung điểm $AC$ vuông góc với $AB$ là: \\\\
        \\[
            ${normalB[0]}x + ${normalB[1]}y + ${normalB[2]}z = ${dB}
        \\] \\\\
        Giải hệ phương trình ta được tọa độ tâm đường tròn ngoại tiếp tam giác $ABC$ là: \\\\
        \\[
            O(${O[0].toFixed(2)}, ${O[1].toFixed(2)}, ${O[2].toFixed(2)})
        \\] \\\\
        Tổng các toạ độ của tâm đường tròn ngoại tiếp tam giác $ABC$ là $${sum_O}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_O}$}
\\loigiai{
    ${answerStatement.trim()}
}
\\end{ex}
    `;

    return latexOutput;
}
// Hàm tính chân đường phân giác trong đỉnh A
function tinhChanDuongPhanGiac(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính độ dài các cạnh AB, AC
    const AB = Math.sqrt((Bx - Ax) ** 2 + (By - Ay) ** 2 + (Bz - Az) ** 2);
    const AC = Math.sqrt((Cx - Ax) ** 2 + (Cy - Ay) ** 2 + (Cz - Az) ** 2);

    // Tính tọa độ chân đường phân giác
    const Px = (AC * Bx + AB * Cx) / (AB + AC);
    const Py = (AC * By + AB * Cy) / (AB + AC);
    const Pz = (AC * Bz + AB * Cz) / (AB + AC);

    // Tính tổng tọa độ của chân đường phân giác
    let sum_P = (Px + Py + Pz).toFixed(1);
    if (sum_P % 1 === 0) {
        sum_P = Math.round(sum_P);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tìm tổng các toạ độ của chân đường phân giác trong đỉnh $A$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ chân đường phân giác trong đỉnh $A$ là $P(${Px.toFixed(1)}, ${Py.toFixed(1)}, ${Pz.toFixed(1)}).$ Tổng các toạ độ là $${sum_P}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_P}$}
\\loigiai{
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính chân đường phân giác ngoài từ đỉnh A
function tinhChanDuongPhanGiacNgoai(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính độ dài các cạnh AB, AC
    const AB = Math.sqrt((Bx - Ax) ** 2 + (By - Ay) ** 2 + (Bz - Az) ** 2);
    const AC = Math.sqrt((Cx - Ax) ** 2 + (Cy - Ay) ** 2 + (Cz - Az) ** 2);

    // Tính tọa độ chân đường phân giác ngoài
    const Px = (-AC * Bx + AB * Cx) / (AB - AC);
    const Py = (-AC * By + AB * Cy) / (AB - AC);
    const Pz = (-AC * Bz + AB * Cz) / (AB - AC);

    // Tính tổng tọa độ của chân đường phân giác
    let sum_P = (Px + Py + Pz).toFixed(1);
    if (sum_P % 1 === 0) {
        sum_P = Math.round(sum_P);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tìm tổng các toạ độ của chân đường phân giác ngoài từ đỉnh $A$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ chân đường phân giác ngoài từ đỉnh $A$ là $P(${Px.toFixed(1)}, ${Py.toFixed(1)}, ${Pz.toFixed(1)}).$ Tổng các toạ độ là $${sum_P}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_P}$}
\\loigiai{
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
// Hàm tính tâm đường tròn nội tiếp tam giác ABC
function tinhTamDuongTronNoiTiep(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) {
    // Tính độ dài các cạnh AB, AC, BC
    const AB = Math.sqrt((Bx - Ax) ** 2 + (By - Ay) ** 2 + (Bz - Az) ** 2);
    const AC = Math.sqrt((Cx - Ax) ** 2 + (Cy - Ay) ** 2 + (Cz - Az) ** 2);
    const BC = Math.sqrt((Cx - Bx) ** 2 + (Cy - By) ** 2 + (Cz - Bz) ** 2);

    // Tính tọa độ tâm đường tròn nội tiếp
    const Ix = (BC * Ax + AC * Bx + AB * Cx) / (AB + AC + BC);
    const Iy = (BC * Ay + AC * By + AB * Cy) / (AB + AC + BC);
    const Iz = (BC * Az + AC * Bz + AB * Cz) / (AB + AC + BC);

    // Tính tổng tọa độ của tâm đường tròn nội tiếp
    let sum_I = (Ix + Iy + Iz).toFixed(1);
    if (sum_I % 1 === 0) {
        sum_I = Math.round(sum_I);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho tam giác $\\triangle ABC$ biết $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. Tính tổng các toạ độ của tâm đường tròn nội tiếp tam giác $ABC$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ tâm đường tròn nội tiếp tam giác $ABC$ là $I(${Ix.toFixed(1)}, ${Iy.toFixed(1)}, ${Iz.toFixed(1)}).$ Tổng các toạ độ là $${sum_I}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_I}$}
\\loigiai{
    Ta có độ dài các cạnh $AB$, $AC$, $BC$ lần lượt là:
    \\[
        AB = \\sqrt{(${Bx} - ${Ax})^2 + (${By} - ${Ay})^2 + (${Bz} - ${Az})^2} = ${AB.toFixed(2)}
    \\]
    \\[
        AC = \\sqrt{(${Cx} - ${Ax})^2 + (${Cy} - ${Ay})^2 + (${Cz} - ${Az})^2} = ${AC.toFixed(2)}
    \\]
    \\[
        BC = \\sqrt{(${Cx} - ${Bx})^2 + (${Cy} - ${By})^2 + (${Cz} - ${Bz})^2} = ${BC.toFixed(2)}
    \\]
    Tọa độ tâm đường tròn nội tiếp tam giác $ABC$ là:
    \\[
        I(${Ix.toFixed(2)}, ${Iy.toFixed(2)}, ${Iz.toFixed(2)})
    \\]
    Vậy tổng các toạ độ của tâm đường tròn nội tiếp tam giác $ABC$ là $${sum_I}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
///NHÓM MIN MAX
// Hàm tính tọa độ điểm M sao cho k * AM^2 + BM^2 + MC^2 đạt giá trị nhỏ nhất
function Tim_M_min(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz, k) {
    // Tạo các biến cần thiết
    const A = [
        [2 * (1 + k + 1), 0, 0],
        [0, 2 * (1 + k + 1), 0],
        [0, 0, 2 * (1 + k + 1)]
    ];
    const B = [
        -2 * (Ax + k * Bx + Cx),
        -2 * (Ay + k * By + Cy),
        -2 * (Az + k * Bz + Cz)
    ];

    // Giải hệ phương trình bằng phương pháp Gauss
    const M = gaussJordanElimination(A, B);

    const Mx = M[0];
    const My = M[1];
    const Mz = M[2];

    // Tính tổng các tọa độ của điểm M
    let sum_M = (Mx + My + Mz).toFixed(1);
    if (sum_M % 1 === 0) {
        sum_M = Math.round(sum_M);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Cho các điểm $A(${Ax}, ${Ay}, ${Az})$, $B(${Bx}, ${By}, ${Bz})$, $C(${Cx}, ${Cy}, ${Cz})$. 
        Tìm tọa độ điểm $M$ sao cho $${k}AM^2 + BM^2 + MC^2$ đạt giá trị nhỏ nhất. Tính tổng các tọa độ của $M$, làm tròn một chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Tọa độ điểm $M$ sao cho $k \\cdot AM^2 + BM^2 + MC^2$ đạt giá trị nhỏ nhất là $M(${Mx.toFixed(1)}, ${My.toFixed(1)}, ${Mz.toFixed(1)}).$ 
        Tổng các tọa độ là $${sum_M}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sum_M}$}
\\loigiai{
    Tọa độ điểm $M$ sao cho $k \\cdot AM^2 + BM^2 + MC^2$ đạt giá trị nhỏ nhất là $M(${Mx.toFixed(1)}, ${My.toFixed(1)}, ${Mz.toFixed(1)}).$ 
    Tổng các tọa độ là $${sum_M}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}


///PTMP
// Hàm tính diện tích tam giác ABC
function mp_diem_vtpt(Ax, Ay, Az, nx, ny, nz) {
    // Phương trình mặt phẳng (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với các trục tọa độ
    const Mx = nx !== 0 ? -D / nx : NaN;
    const My = 0;
    const Mz = 0;
    const Nx = 0;
    const Ny = ny !== 0 ? -D / ny : NaN;
    const Nz = 0;
    const Px = 0;
    const Py = 0;
    const Pz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị có hợp lệ không
    if (isNaN(Mx) || isNaN(Ny) || isNaN(Pz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính độ dài các cạnh MN, NP, PM
    const MN = Math.sqrt(Mx ** 2 + Ny ** 2 + 0 ** 2);
    const NP = Math.sqrt(Ny ** 2 + Pz ** 2 + 0 ** 2);
    const PM = Math.sqrt(Pz ** 2 + Mx ** 2 + 0 ** 2);

    // Tính diện tích tam giác bằng công thức Heron
    const p = (MN + NP + PM) / 2;
    let area = Math.sqrt(p * (p - MN) * (p - NP) * (p - PM));
    area = area.toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (area % 1 === 0) { // Nếu là số nguyên, bỏ phần thập phân
        area = Math.round(area);
    }

    // Tạo nội dung câu hỏi
    const problemStatement = `
        Lập phương trình mặt phẳng $(P)$ biết qua $A(${Ax}; ${Ay}; ${Az})$ và có $\\vec{n}=(${nx}; ${ny}; ${nz})$. 
        Biết $(P)$ cắt $3$ trục tọa độ tại $3$ điểm $M$, $N$, $P$, diện tích tam giác $MNP$ bằng bao nhiêu? 
        Làm tròn $1$ chữ số thập phân.
    `;

    // Tạo nội dung đáp án
    const answerStatement = `
        Diện tích tam giác $MNP$ là $${area}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${area}$}
\\loigiai{
    Phương trình mặt phẳng $(P)$ dạng: $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của $(P)$ với các trục tọa độ là: \\\\
    $M = \\left( \\dfrac{-${D}}{${nx}}, 0, 0 \\right)$, $N = \\left( 0, \\dfrac{-${D}}{${ny}}, 0 \\right)$, $P = \\left( 0, 0, \\dfrac{-${D}}{${nz}} \\right)$.\\\\
    Độ dài các cạnh của tam giác: \\\\
    $MN = \\sqrt{\\left(\\dfrac{-${D}}{${nx}}\\right)^2 + \\left(\\dfrac{-${D}}{${ny}}\\right)^2} = ${MN.toFixed(2)}$,\\\\
    $NP = \\sqrt{\\left(\\dfrac{-${D}}{${ny}}\\right)^2 + \\left(\\dfrac{-${D}}{${nz}}\\right)^2} = ${NP.toFixed(2)}$,\\\\
    $PM = \\sqrt{\\left(\\dfrac{-${D}}{${nz}}\\right)^2 + \\left(\\dfrac{-${D}}{${nx}}\\right)^2} = ${PM.toFixed(2)}$.\\\\
    Diện tích tam giác $MNP$ được tính theo công thức Heron: \\\\
    $S = \\sqrt{p(p - MN)(p - NP)(p - PM)} = ${area}$.\\\\
    Vậy diện tích tam giác $MNP$ là $${area}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_quadiem_songsong(Ax, Ay, Az, nx, ny, nz, axis) {
    // Phương trình mặt phẳng (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);
    const tudo = nx * Ax + ny * Az
    // Tính tọa độ giao điểm với trục Ox, Oy, Oz dựa trên giá trị của tham số axis
    let coordinate;
    if (axis === 1) { // Giao điểm với trục Ox
        coordinate = nx !== 0 ? (-D / nx).toFixed(1) : NaN;
    } else if (axis === 2) { // Giao điểm với trục Oy
        coordinate = ny !== 0 ? (-D / ny).toFixed(1) : NaN;
    } else if (axis === 3) { // Giao điểm với trục Oz
        coordinate = nz !== 0 ? (-D / nz).toFixed(1) : NaN;
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }
    if (coordinate % 1 === 0) {
        coordinate = Math.round(coordinate);
    }
    // Kiểm tra xem giá trị tính toán có hợp lệ hay không
    if (isNaN(coordinate)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng $(P)$ biết qua $A(${Ax}; ${Ay}; ${Az})$ và song song mặt phẳng $(P)\colon ${nx}x+${ny}+${nz}+${tudo}=0$. Biết $(P)$ cắt trục ${axisLabel} tại điểm có giá trị bằng bao nhiêu? (Làm tròn 1 chữ số thập phân).`;
    const answerStatement = `
        Giá trị giao điểm của mặt phẳng $(P)$ với trục ${axisLabel} là $${coordinate}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${coordinate}$}
\\loigiai{
    Phương trình mặt phẳng $(P)$ dạng $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng $(P)$ với trục $${axisLabel}$ là $${coordinate}$.\\\\
    Giá trị giao điểm là $${coordinate}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_quaA_vuonggocmn(Ax, Ay, Az, Mx, My, Mz, Nx, Ny, Nz, axis) {
    // Tính vector pháp tuyến bằng tích có hướng của vector MN
    const nx = Mx - Nx;
    const ny = My - Ny;
    const nz = Mz - Nz;

    // Phương trình mặt phẳng (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz dựa trên giá trị của tham số axis
    let coordinate;
    if (axis === 1) { // Giao điểm với trục Ox
        coordinate = nx !== 0 ? (-D / nx).toFixed(1) : NaN;
    } else if (axis === 2) { // Giao điểm với trục Oy
        coordinate = ny !== 0 ? (-D / ny).toFixed(1) : NaN;
    } else if (axis === 3) { // Giao điểm với trục Oz
        coordinate = nz !== 0 ? (-D / nz).toFixed(1) : NaN;
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }
    if (coordinate % 1 === 0) {
        coordinate = Math.round(coordinate);
    }
    // Kiểm tra xem giá trị tính toán có hợp lệ hay không
    if (isNaN(coordinate)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng $(P)$ biết qua $A(${Ax}; ${Ay}; ${Az})$ và vuông góc với đoạn thẳng $MN$ với $M(${Mx}; ${My}; ${Mz})$ và $N(${Nx}; ${Ny}; ${Nz})$. Biết $(P)$ cắt trục ${axisLabel} tại điểm có giá trị bằng bao nhiêu? (Làm tròn 1 chữ số thập phân).`;
    const answerStatement = `
        Giá trị giao điểm của mặt phẳng $(P)$ với trục ${axisLabel} là $${coordinate}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${coordinate}$}
\\loigiai{
    Phương trình mặt phẳng $(P)$ dạng $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng $(P)$ với trục ${axisLabel} là $${coordinate}$.\\\\
    Giá trị giao điểm là $${coordinate}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_trungtruc(Ax, Ay, Az, Bx, By, Bz, axis) {
    // Tính trung điểm của đoạn thẳng AB
    const Mx = (Ax + Bx) / 2;
    const My = (Ay + By) / 2;
    const Mz = (Az + Bz) / 2;

    // Vector pháp tuyến của trung trực là vector AB
    const nx = Bx - Ax;
    const ny = By - Ay;
    const nz = Bz - Az;

    // Phương trình mặt phẳng trung trực (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Mx + ny * My + nz * Mz);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz dựa trên giá trị của tham số axis
    let coordinate;
    if (axis === 1) { // Giao điểm với trục Ox
        coordinate = nx !== 0 ? (-D / nx).toFixed(1) : NaN;
    } else if (axis === 2) { // Giao điểm với trục Oy
        coordinate = ny !== 0 ? (-D / ny).toFixed(1) : NaN;
    } else if (axis === 3) { // Giao điểm với trục Oz
        coordinate = nz !== 0 ? (-D / nz).toFixed(1) : NaN;
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }
    if (coordinate % 1 === 0) {
        coordinate = Math.round(coordinate);
    }
    // Kiểm tra xem giá trị tính toán có hợp lệ hay không
    if (isNaN(coordinate)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng trung trực của đoạn thẳng $AB$ với $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$. Biết trung trực cắt trục ${axisLabel} tại điểm có giá trị bằng bao nhiêu? (Làm tròn 1 chữ số thập phân).`;
    const answerStatement = `
        Giá trị giao điểm của trung trực với trục ${axisLabel} là $${coordinate}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${coordinate}$}
\\loigiai{
    Phương trình mặt phẳng trung trực của đoạn thẳng $AB$ với $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của trung trực với trục ${axisLabel} là $${coordinate}$.\\\\
    Giá trị giao điểm là $${coordinate}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_vuonggoc_AB_taiA(Ax, Ay, Az, Bx, By, Bz, axis) {
    // Vector pháp tuyến của mặt phẳng là vector AB
    const nx = Bx - Ax;
    const ny = By - Ay;
    const nz = Bz - Az;

    // Phương trình mặt phẳng vuông góc với AB tại A: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz dựa trên giá trị của tham số axis
    let coordinate;
    if (axis === 1) { // Giao điểm với trục Ox
        coordinate = nx !== 0 ? (-D / nx).toFixed(1) : NaN;
    } else if (axis === 2) { // Giao điểm với trục Oy
        coordinate = ny !== 0 ? (-D / ny).toFixed(1) : NaN;
    } else if (axis === 3) { // Giao điểm với trục Oz
        coordinate = nz !== 0 ? (-D / nz).toFixed(1) : NaN;
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }
    if (coordinate % 1 === 0) {
        coordinate = Math.round(coordinate);
    }
    // Kiểm tra xem giá trị tính toán có hợp lệ hay không
    if (isNaN(coordinate)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng vuông góc với đoạn thẳng $AB$ tại $A(${Ax}; ${Ay}; ${Az})$ với $B(${Bx}; ${By}; ${Bz})$. Biết mặt phẳng này cắt trục ${axisLabel} tại điểm có giá trị bằng bao nhiêu? (Làm tròn 1 chữ số thập phân).`;
    const answerStatement = `
        Giá trị giao điểm của mặt phẳng vuông góc với đoạn thẳng $AB$ tại điểm $A$ với trục ${axisLabel} là $${coordinate}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${coordinate}$}
\\loigiai{
    Phương trình mặt phẳng vuông góc với đoạn thẳng $AB$ tại điểm $A(${Ax}; ${Ay}; ${Az})$ với $B(${Bx}; ${By}; ${Bz})$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với trục ${axisLabel} là $${coordinate}$.\\\\
    Giá trị giao điểm là $${coordinate}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
///Nhóm dùng tích có hướng
function mp_quaMNP(Mx, My, Mz, Nx, Ny, Nz, Px, Py, Pz) {
    // Vector MN và MP
    const MNx = Nx - Mx;
    const MNy = Ny - My;
    const MNz = Nz - Mz;
    
    const MPx = Px - Mx;
    const MPy = Py - My;
    const MPz = Pz - Mz;

    // Vector pháp tuyến của mặt phẳng (tích có hướng của MN và MP)
    const nx = MNy * MPz - MNz * MPy;
    const ny = MNz * MPx - MNx * MPz;
    const nz = MNx * MPy - MNy * MPx;

    // Phương trình mặt phẳng (P): nx * x + ny * y + nz * z + D = 0
    const D = -(nx * Mx + ny * My + nz * Mz);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz
    const Ax = nx !== 0 ? -D / nx : NaN;
    const Ay = 0;
    const Az = 0;

    const Bx = 0;
    const By = ny !== 0 ? -D / ny : NaN;
    const Bz = 0;

    const Cx = 0;
    const Cy = 0;
    const Cz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Ax) || isNaN(By) || isNaN(Cz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính thể tích tứ diện OABC
    let volume = Math.abs(Ax * By * Cz / 6).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (volume % 1 === 0) {
        volume = Math.round(volume);
    }
    // Tạo nội dung câu hỏi và đáp án
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua ba điểm $M(${Mx}; ${My}; ${Mz})$, $N(${Nx}; ${Ny}; ${Nz})$ và $P(${Px}; ${Py}; ${Pz})$. Biết mặt phẳng này cắt các trục tọa độ tại ba điểm $A$, $B$, $C$. Tính thể tích tứ diện $OABC$ bằng bao nhiêu? 
        Làm tròn $1$ chữ số thập phân.
    `;
    const answerStatement = `
        Thể tích tứ diện $OABC$ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng đi qua ba điểm $M(${Mx}; ${My}; ${Mz})$, $N(${Nx}; ${Ny}; ${Nz})$ và $P(${Px}; ${Py}; ${Pz})$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với các trục tọa độ là:\\\\
    $A(${Ax.toFixed(2)}; 0; 0)$, $B(0; ${By.toFixed(2)}; 0)$, $C(0; 0; ${Cz.toFixed(2)})$.\\\\
    Thể tích tứ diện $OABC$ được tính theo công thức:\\\\
    $V = \\dfrac{1}{6} |x_A \cdot y_B \cdot z_C| = ${volume}$.\\\\
    Vậy thể tích tứ diện $OABC$ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_vuonggoc_2mp(Mx, My, Mz, nx1, ny1, nz1, nx2, ny2, nz2) {
    // Tính vector pháp tuyến của mặt phẳng mới (tích có hướng của vector pháp tuyến của (P) và (Q))
    const nx = ny1 * nz2 - nz1 * ny2;
    const ny = nz1 * nx2 - nx1 * nz2;
    const nz = nx1 * ny2 - ny1 * nx2;

    // Phương trình mặt phẳng (P) dạng: nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Mx + ny * My + nz * Mz);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz
    const Ax = nx !== 0 ? -D / nx : NaN;
    const Ay = 0;
    const Az = 0;

    const Bx = 0;
    const By = ny !== 0 ? -D / ny : NaN;
    const Bz = 0;

    const Cx = 0;
    const Cy = 0;
    const Cz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Ax) || isNaN(By) || isNaN(Cz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính thể tích tứ diện OABC
    let volume = Math.abs(Ax * By * Cz / 6).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (volume % 1 === 0) {
        volume = Math.round(volume);
    }

    // Tạo nội dung câu hỏi và đáp án
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua điểm $M(${Mx}; ${My}; ${Mz})$ và vuông góc với hai mặt phẳng $(P)\colon ${nx1}x + ${ny1}y + ${nz1}z = 0$ và $(Q)\colon ${nx2}x + ${ny2}y + ${nz2}z + 1 = 0$. Biết mặt phẳng này cắt các trục tọa độ tại ba điểm $A$, $B$, $C$. Tính thể tích tứ diện $OABC$ bằng bao nhiêu? Làm tròn $1$ chữ số thập phân.
    `;
    const answerStatement = `
        Thể tích tứ diện $OABC$ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng đi qua điểm $M(${Mx}; ${My}; ${Mz})$ và vuông góc với hai mặt phẳng $(P): ${nx1}x + ${ny1}y + ${nz1}z +${nx}= 0$ và $(Q): ${nx2}x + ${ny2}y + ${nz2}z + +${nz} = 0$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với các trục tọa độ là:\\\\
    $A(${Ax.toFixed(2)}; 0; 0)$, $B(0; ${By.toFixed(2)}; 0)$, $C(0; 0; ${Cz.toFixed(2)})$.\\\\
    Thể tích tứ diện $OABC$ được tính theo công thức:\\\\
    $V = \\dfrac{1}{6} |x_A \cdot y_B \cdot z_C| = ${volume}$.\\\\
    Vậy thể tích tứ diện $OABC$ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_qua_2_diem_song_song(Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz, Dx, Dy, Dz) {
    // Vector AB
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    
    // Vector CD
    const CDx = Dx - Cx;
    const CDy = Dy - Cy;
    const CDz = Dz - Cz;
    
    // Tính vector pháp tuyến của mặt phẳng (tích có hướng của vector AB và vector CD)
    const nx = ABy * CDz - ABz * CDy;
    const ny = ABz * CDx - ABx * CDz;
    const nz = ABx * CDy - ABy * CDx;

    // Phương trình mặt phẳng (P): nx*x + ny*y + nz*z + D = 0
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz
    const Mx = nx !== 0 ? -D / nx : NaN;
    const My = 0;
    const Mz = 0;

    const Nx = 0;
    const Ny = ny !== 0 ? -D / ny : NaN;
    const Nz = 0;

    const Px = 0;
    const Py = 0;
    const Pz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Mx) || isNaN(Ny) || isNaN(Pz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính thể tích tứ diện O.MNP
    let volume = Math.abs(Mx * Ny * Pz / 6).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (volume % 1 === 0) {
        volume = Math.round(volume);
    }

    // Tạo nội dung câu hỏi và đáp án
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua hai điểm $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ và song song với đường thẳng đi qua hai điểm $C(${Cx}; ${Cy}; ${Cz})$ và $D(${Dx}; ${Dy}; ${Dz})$. Biết mặt phẳng này cắt các trục tọa độ tại ba điểm $M$, $N$, $P$. Tính thể tích tứ diện $O.MNP$ bằng bao nhiêu? Làm tròn $1$ chữ số thập phân.
    `;
    const answerStatement = `
        Thể tích tứ diện $O.MNP$ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng đi qua hai điểm $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ và song song với đường thẳng đi qua hai điểm $C(${Cx}; ${Cy}; ${Cz})$ và $D(${Dx}; ${Dy}; ${Dz})$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với các trục tọa độ là:\\\\
    $M(${Mx.toFixed(2)}; 0; 0)$, $N(0; ${Ny.toFixed(2)}; 0)$, $P(0; 0; ${Pz.toFixed(2)})$.\\\\
    Thể tích tứ diện $O.MNP$ được tính theo công thức:\\\\
    $V = \\dfrac{1}{6} |x_M \cdot y_N \cdot z_P| = ${volume}$.\\\\
    Vậy thể tích tứ diện $O.MNP$ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_qua_2_diem_vuonggoc_mp(Ax, Ay, Az, Bx, By, Bz, px, py, pz, Dp) {
    // Vector AB
    const ABx = Bx - Ax;
    const ABy = By - Ay;
    const ABz = Bz - Az;
    
    // Vector pháp tuyến của mặt phẳng P
    const nx = px;
    const ny = py;
    const nz = pz;

    // Phương trình mặt phẳng mới (P'): nx*x + ny*y + nz*z + D = 0
    // Mặt phẳng mới (P') đi qua điểm A và vuông góc với mặt phẳng P
    const D = -(nx * Ax + ny * Ay + nz * Az);

    // Tính tọa độ giao điểm với trục Ox, Oy, Oz
    const Mx = nx !== 0 ? -D / nx : NaN;
    const My = 0;
    const Mz = 0;

    const Nx = 0;
    const Ny = ny !== 0 ? -D / ny : NaN;
    const Nz = 0;

    const Px = 0;
    const Py = 0;
    const Pz = nz !== 0 ? -D / nz : NaN;

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Mx) || isNaN(Ny) || isNaN(Pz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính tọa độ trọng tâm G của tam giác MNP
    const Gx = (Mx + Nx + Px) / 3;
    const Gy = (My + Ny + Py) / 3;
    const Gz = (Mz + Nz + Pz) / 3;

    // Tính tổng tọa độ của trọng tâm G
    let sumG = (Gx + Gy + Gz).toFixed(1); // Làm tròn đến 1 chữ số thập phân
    if (sumG % 1 === 0) {
        sumG = Math.round(sumG);
    }

    // Tạo nội dung câu hỏi và đáp án
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua hai điểm $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ và vuông góc với mặt phẳng $(P)\\colon ${px}x + ${py}y + ${pz}z + ${Dp} = 0$. Biết mặt phẳng này cắt các trục tọa độ tại ba điểm $M$, $N$, $P$. Tính tổng tọa độ của trọng tâm của tam giác $MNP$, (làm tròn $1$ chữ số thập phân.)
    `;
    const answerStatement = `
        Tổng tọa độ của trọng tâm của tam giác $MNP$ là $${sumG}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${sumG}$}
\\loigiai{
    Phương trình mặt phẳng đi qua hai điểm $A(${Ax}; ${Ay}; ${Az})$ và $B(${Bx}; ${By}; ${Bz})$ và vuông góc với mặt phẳng $(P)\\colon ${px}x + ${py}y + ${pz}z + ${Dp} = 0$ là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với các trục tọa độ là:\\\\
    $M(${Mx.toFixed(2)}; 0; 0)$, $N(0; ${Ny.toFixed(2)}; 0)$, $P(0; 0; ${Pz.toFixed(2)})$.\\\\
    Tọa độ trọng tâm $G$ của tam giác $MNP$ là:\\\\
    $G\\left(\\dfrac{${Mx.toFixed(2)}}{3}; \\dfrac{${Ny.toFixed(2)}}{3}; \\dfrac{${Pz.toFixed(2)}}{3}\\right)$.\\\\
    Tổng tọa độ của trọng tâm $G$ là $${sumG}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_quaM_chua_truc(Mx, My, Mz, axis) {
    let nx = 0, ny = 0, nz = 0;
    if (axis === 1) { // Chứa trục Ox
        ny = 1; // Phương trình y = 0
        nz = 1; // Phương trình z = 0
    } else if (axis === 2) { // Chứa trục Oy
        nx = 1; // Phương trình x = 0
        nz = 1; // Phương trình z = 0
    } else if (axis === 3) { // Chứa trục Oz
        nx = 1; // Phương trình x = 0
        ny = 1; // Phương trình y = 0
    } else {
        return "Tham số trục không hợp lệ, vui lòng nhập 1 (Ox), 2 (Oy) hoặc 3 (Oz).";
    }

    // Phương trình mặt phẳng chứa trục và đi qua điểm M
    const D = -(nx * Mx + ny * My + nz * Mz);

    // Tính tọa độ giao điểm với hai trục còn lại
    let Qx, Qy, Qz, Py, Pz;
    if (axis === 1) { // Chứa trục Ox
        Qx = 0;
        Qy = ny !== 0 ? -D / ny : NaN;
        Qz = 0;

        Py = 0;
        Pz = nz !== 0 ? -D / nz : NaN;
    } else if (axis === 2) { // Chứa trục Oy
        Qx = nx !== 0 ? -D / nx : NaN;
        Qy = 0;
        Qz = 0;

        Py = 0;
        Pz = nz !== 0 ? -D / nz : NaN;
    } else if (axis === 3) { // Chứa trục Oz
        Qx = nx !== 0 ? -D / nx : NaN;
        Qy = 0;
        Qz = 0;

        Py = ny !== 0 ? -D / ny : NaN;
        Pz = 0;
    }

    // Kiểm tra xem các giá trị tính toán có hợp lệ hay không
    if (isNaN(Qx) || isNaN(Qy) || isNaN(Qz) || isNaN(Py) || isNaN(Pz)) {
        return "Các giá trị tính toán không hợp lệ, vui lòng kiểm tra lại.";
    }

    // Tính độ dài đoạn thẳng kết nối các điểm giao với hai trục còn lại
    let distance;
    if (axis === 1) {
        distance = Math.sqrt(Qy ** 2 + Pz ** 2);
    } else if (axis === 2) {
        distance = Math.sqrt(Qx ** 2 + Pz ** 2);
    } else if (axis === 3) {
        distance = Math.sqrt(Qx ** 2 + Py ** 2);
    }

    distance = distance.toFixed(1);
    if (distance % 1 === 0) {
        distance = Math.round(distance);
    }

    // Tạo nội dung câu hỏi và đáp án
    const axisLabel = axis === 1 ? "Ox" : axis === 2 ? "Oy" : "Oz";
    const problemStatement = `
        Lập phương trình mặt phẳng đi qua điểm $M(${Mx}; ${My}; ${Mz})$ và chứa trục ${axisLabel}. Biết mặt phẳng này cắt các trục còn lại tại các điểm $P$ và $Q$. Tính độ dài đoạn thẳng kết nối các điểm $P$ và $Q$, (làm tròn $1$ chữ số thập phân).
    `;
    const answerStatement = `
        Độ dài đoạn thẳng $PQ$ là $${distance}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${distance}$}
\\loigiai{
    Phương trình mặt phẳng đi qua điểm $M(${Mx}; ${My}; ${Mz})$ và chứa trục ${axisLabel} là:\\\\
    $${nx}x + ${ny}y + ${nz}z + ${D} = 0$.\\\\
    Giao điểm của mặt phẳng này với trục ${axis === 1 ? "Oy" : axis === 2 ? "Ox" : "Ox"} là:\\\\
    ${axis === 1 ? `$P(0; ${Qy.toFixed(1)}; 0)$` : axis === 2 ? `$P(${Qx.toFixed(1)}; 0; 0)$` : `$P(${Qx.toFixed(1)}; 0; 0)$`}\\\\
    Giao điểm của mặt phẳng này với trục ${axis === 1 ? "Oz" : axis === 2 ? "Oz" : "Oy"} là:\\\\
    ${axis === 1 ? `$Q(0; 0; ${Pz.toFixed(1)})$` : axis === 2 ? `$Q(0; 0; ${Pz.toFixed(1)})$` : `$Q(0; ${Py.toFixed(1)}; 0)$`}\\\\
    Độ dài đoạn thẳng $PQ$ được tính theo công thức:\\\\
    $PQ = \\sqrt{(${axis === 1 ? Qy.toFixed(1) : Qx.toFixed(1)} - 0)^2 + (0 - ${axis === 1 ? Pz.toFixed(1) : Py.toFixed(1)})^2} = ${distance}$.\\\\
    Vậy độ dài đoạn thẳng $PQ$ là $${distance}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function findPlaneEquation(Qa, Qb, Qc, Ax, Ay, Az, distance) {
    // Tính khoảng cách từ điểm A đến mặt phẳng mới
    const denominator = Math.sqrt(Qa ** 2 + Qb ** 2 + Qc ** 2);
    const D_base = -(Qa * Ax + Qb * Ay + Qc * Az);
    
    // Tính D cho hai mặt phẳng song song với khoảng cách cho trước
    const D1 = D_base - (distance * denominator);
    const D2 = D_base + (distance * denominator);

    // Các phương trình mặt phẳng
    const P1 = { a: Qa, b: Qb, c: Qc, d: D1 };
    const P2 = { a: Qa, b: Qb, c: Qc, d: D2 };

    return { P1, P2 };
}

function calculateVolumeBetweenPlanes(P1, P2) {
    // Tính tọa độ giao điểm với các trục cho P1
    const A1x = P1.a !== 0 ? -P1.d / P1.a : 0;
    const B1y = P1.b !== 0 ? -P1.d / P1.b : 0;
    const C1z = P1.c !== 0 ? -P1.d / P1.c : 0;

    // Tính tọa độ giao điểm với các trục cho P2
    const A2x = P2.a !== 0 ? -P2.d / P2.a : 0;
    const B2y = P2.b !== 0 ? -P2.d / P2.b : 0;
    const C2z = P2.c !== 0 ? -P2.d / P2.c : 0;

    // Tính diện tích đáy của hai chóp
    const baseArea1 = Math.abs(A1x * B1y * C1z);
    const baseArea2 = Math.abs(A2x * B2y * C2z);

    // Tính khoảng cách giữa hai mặt phẳng (chiều cao của lăng trụ)
    const distance = Math.abs(P1.d - P2.d) / Math.sqrt(P1.a ** 2 + P1.b ** 2 + P1.c ** 2);

    let volume;
    if (P1.d * P2.d > 0) {
        // Tính thể tích của chóp cụt nếu hai mặt phẳng nằm cùng một phía
        volume = (1 / 6) * Math.abs(baseArea1 - baseArea2) * distance;
    } else {
        // Tính thể tích của hai chóp cộng lại nếu hai mặt phẳng nằm khác phía
        volume = (1 / 6) * (baseArea1 + baseArea2) * distance;
    }

    volume = Math.round(volume);
    
    return volume;
}

// Tạo nội dung câu hỏi và đáp án
function mp_songsongP_cachA(Qa, Qb, Qc, Ax, Ay, Az, distance) {
    const planes = findPlaneEquation(Qa, Qb, Qc, Ax, Ay, Az, distance);
    const volume = calculateVolumeBetweenPlanes(planes.P1, planes.P2);
    const D_base = Qa * Ax + Qb * Ay + Qc * Az;
    const problemStatement = `
        Mặt phẳng song song với mặt phẳng $(Q)\colon ${Qa}x ${Qb < 0 ? '' : '+'} ${Qb}y ${Qc < 0 ? '' : '+'} ${Qc}z+${D_base}=0$ và cách điểm $A(${Ax}, ${Ay}, ${Az})$ một khoảng bằng $${distance}$. Tính thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ, (làm tròn số đến phần nguyên).
    `;
    const answerStatement = `
        Thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng $P1$ song song với mặt phẳng $Q$ và cách điểm $A$ một khoảng bằng ${distance} là:\\\\
    $${planes.P1.a}x ${planes.P1.b < 0 ? '' : '+'} ${planes.P1.b}y ${planes.P1.c < 0 ? '' : '+'} ${planes.P1.c}z + ${planes.P1.d.toFixed(2)} = 0$.\\\\
    Phương trình mặt phẳng $P2$ song song với mặt phẳng $Q$ và cách điểm $A$ một khoảng bằng ${distance} là:\\\\
    $${planes.P2.a}x ${planes.P2.b < 0 ? '' : '+'} ${planes.P2.b}y ${planes.P2.c < 0 ? '' : '+'} ${planes.P2.c}z + ${planes.P2.d.toFixed(2)} = 0$.\\\\
    Thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = cleanUpOutput(latexOutput);

    return latexOutput;
}
function mp_songsongQ_cachQ(Qa, Qb, Qc, Qd, distance) {
    // Tính khoảng cách từ điểm gốc O(0, 0, 0) đến mặt phẳng Q
    const Ax = 0, Ay = 0, Az = 0; // Điểm gốc O
    const denominator = Math.sqrt(Qa ** 2 + Qb ** 2 + Qc ** 2);
    const D_base = -(Qa * Ax + Qb * Ay + Qc * Az + Qd);

    // Tính D cho hai mặt phẳng song song với khoảng cách cho trước
    const D1 = D_base - (distance * denominator);
    const D2 = D_base + (distance * denominator);

    // Các phương trình mặt phẳng
    const P1 = { a: Qa, b: Qb, c: Qc, d: D1 };
    const P2 = { a: Qa, b: Qb, c: Qc, d: D2 };

    // Tính tọa độ giao điểm với các trục cho P1
    const A1x = P1.a !== 0 ? -P1.d / P1.a : 0;
    const B1y = P1.b !== 0 ? -P1.d / P1.b : 0;
    const C1z = P1.c !== 0 ? -P1.d / P1.c : 0;

    // Tính tọa độ giao điểm với các trục cho P2
    const A2x = P2.a !== 0 ? -P2.d / P2.a : 0;
    const B2y = P2.b !== 0 ? -P2.d / P2.b : 0;
    const C2z = P2.c !== 0 ? -P2.d / P2.c : 0;

    // Tính diện tích đáy của hai chóp
    const baseArea1 = Math.abs(A1x * B1y * C1z);
    const baseArea2 = Math.abs(A2x * B2y * C2z);

    // Tính khoảng cách giữa hai mặt phẳng (chiều cao của lăng trụ)
    const distanceBetweenPlanes = Math.abs(P1.d - P2.d) / Math.sqrt(P1.a ** 2 + P1.b ** 2 + P1.c ** 2);

    let volume;
    if (P1.d * P2.d > 0) {
        // Tính thể tích của chóp cụt nếu hai mặt phẳng nằm cùng một phía
        volume = (1 / 6) * Math.abs(baseArea1 - baseArea2) * distanceBetweenPlanes;
    } else {
        // Tính thể tích của hai chóp cộng lại nếu hai mặt phẳng nằm khác phía
        volume = (1 / 6) * (baseArea1 + baseArea2) * distanceBetweenPlanes;
    }

    volume = Math.round(volume);

    const problemStatement = `
        Lập phương trình mặt phẳng song song với mặt phẳng $(Q)\colon ${Qa}x ${Qb < 0 ? '' : '+'} ${Qb}y ${Qc < 0 ? '' : '+'} ${Qc}z + ${Qd} = 0$ và cách mặt phẳng $(Q)$ một khoảng bằng $${distance}$. 
        Tính thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ, (làm tròn đến phần nguyên).
    `;
    const answerStatement = `
        Thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ là $${volume}$.
    `;

    // Định dạng đầu ra LaTeX
    let latexOutput = `
\\begin{ex}
${problemStatement.trim()}
\\shortans{$${volume}$}
\\loigiai{
    Phương trình mặt phẳng $P1$ song song với mặt phẳng $Q$ và cách mặt phẳng $(Q)$ một khoảng bằng $${distance}$ là:\\\\
    $${P1.a}x ${P1.b < 0 ? '' : '+'} ${P1.b}y ${P1.c < 0 ? '' : '+'} ${P1.c}z + ${P1.d.toFixed(2)} = 0$.\\\\
    Phương trình mặt phẳng $P2$ song song với mặt phẳng $Q$ và cách mặt phẳng $Q$ một khoảng bằng ${distance} là:\\\\
    $${P2.a}x ${P2.b < 0 ? '' : '+'} ${P2.b}y ${P2.c < 0 ? '' : '+'} ${P2.c}z + ${P2.d.toFixed(2)} = 0$.\\\\
    Thể tích giới hạn bởi hai mặt phẳng và các trục tọa độ là $${volume}$.
}
\\end{ex}
    `;

    // Làm sạch đầu ra LaTeX
    latexOutput = latexOutput.replace(/^\s+|\s+$/gm, '');

    return latexOutput;
}
function tim_m_hs_ng_trenR(g) {
    // Sinh ngẫu nhiên các hệ số a, b, c, d, e
    let aValues = [-1, -2, -3];
    let a = aValues[Math.floor(Math.random() * aValues.length)]; // a là -1, -2 hoặc -3
    let b = Math.floor(Math.random() * 11) - 5; // b từ -5 đến 5
    // Sinh ngẫu nhiên c từ -5 đến 5, bỏ qua giá trị 0
    let c;
    do {c = Math.floor(Math.random() * 11) - 5;} while (c === 0);
    let d = Math.floor(Math.random() * 21) - 10; // d từ -10 đến 10
    let e = Math.floor(Math.random() * 10) + 30; // e từ 20 đến 30
   
 
   // Tạo biểu thức hàm số
   let equation = `${a}x^3 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x^2 ${(c < 0 ? '-' : '+')} (m ${c < 0 ? '-' : '+'} ${Math.abs(c)})x ${d < 0 ? '-' : '+'} ${Math.abs(d)}`;

    // Tính đạo hàm của hàm số
    let derivative = `${3 * a}x^2 ${2 * b < 0 ? '-' : '+'} ${Math.abs(2 * b)}x + m ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;

    // Tính delta của đạo hàm
    let delta = (2 * b) ** 2;
  // Giải phương trình delta để tìm m
    let mm = ((4*b**2)/(12 * a)-c).toFixed(2);
    if (mm % 1 === 0) {
        mm = Math.round(mm);
    }
    // Giải phương trình delta để tìm m
    let mUpper = Math.floor((4*b**2)/(12 * a)-c);
     // Tính điều kiện để hàm số nghịch biến
    let condition = `$\\begin{aligned}
    &\\Delta = b^2 - 4ac\\leq 0 \\\\
    \\Leftrightarrow &${delta} - 4(${3 * a})(m + ${c}) \\leq 0 \\\\
    \\Leftrightarrow &${delta} + ${-12 * a}m ${-12 * a * c < 0 ? '-' : '+'} ${Math.abs(12 * a * c)} \\leq 0 \\\\
    \\Leftrightarrow &${-12 * a}m \\leq -${delta} ${-12 * a * c < 0 ? '+' : '-'} ${Math.abs(12 * a * c)} \\\\
    \\Leftrightarrow &m\\leq ${mm}.
    \\end{aligned}$`;   // Tìm các giá trị nguyên của m trong đoạn [-e+10, e+10] thoả điều kiện
    let lowerBound = -e+g ;
    let upperBound = e;
    let count = 0;
    let validMs = [];
  
    for (let m = lowerBound; m <= upperBound; m++) {
        if (m <= mUpper) {
            count++;
            validMs.push(m);
        }
    }
    // Tạo lời giải
    let explanation = `Tập xác định $\\mathbb{R}$.\\\\
        $y'=${derivative}$.\\\\
        Hàm số nghịch biến trên $(-\\infty; +\\infty)$ khi và chỉ khi $\\Delta \\leq 0$.\\\\
        ${condition}.\\\\
        Số giá trị nguyên của $m$ trong đoạn $[${lowerBound}, ${upperBound}]$ thoả điều kiện là $${count}$.   `;

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1V1-3]
    Cho hàm số $y=${equation}$ với $m$ là tham số. Có bao nhiêu giá trị nguyên của $m$ trong đoạn $[${lowerBound}, ${upperBound}]$ để hàm số nghịch biến trên $(-\\infty; +\\infty)$?
    \\shortans{$${count}$}
    \\loigiai{
        ${explanation}
    }
\\end{ex}`;
  question = question.replace('leq --','leq ')
  question = cleanUpOutput(question)
    return question;
}
function tim_m_hs_db_trenR(g){
    // Sinh ngẫu nhiên các hệ số a, b, c, d, e
    let aValues = [1, 2, 3];
    let a = aValues[Math.floor(Math.random() * aValues.length)]; // a là 1, 2 hoặc 3
    let b = Math.floor(Math.random() * 11) - 5; // b từ -5 đến 5
    // Sinh ngẫu nhiên c từ -5 đến 5, bỏ qua giá trị 0
    let c;
    do {
        c = Math.floor(Math.random() * 11) - 5;
    } while (c === 0);
    let d = Math.floor(Math.random() * 21) - 10; // d từ -10 đến 10
    let e = Math.floor(Math.random() * 10) + 30; // e từ 30 đến 39

    // Tạo biểu thức hàm số
    let equation = `${a}x^3 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x^2 ${(c < 0 ? '-' : '+')} (m ${c < 0 ? '-' : '+'} ${Math.abs(c)})x ${d < 0 ? '-' : '+'} ${Math.abs(d)}`;

    // Tính đạo hàm của hàm số
    let derivative = `${3 * a}x^2 ${2 * b < 0 ? '-' : '+'} ${Math.abs(2 * b)}x + m ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;

    // Tính delta của đạo hàm
    let delta = (2 * b) ** 2;

    // Giải phương trình delta để tìm m
    let mm = ((4 * b ** 2) / (12 * a) - c).toFixed(2);
    if (mm % 1 === 0) {
        mm = Math.round(mm);
    }
    let mUpper = Math.ceil((4 * b ** 2) / (12 * a) - c);

    // Tính điều kiện để hàm số nghịch biến
    let condition = `\\begin{aligned}
    &\\Delta = b^2 - 4ac \\leq 0 \\\\
    \\Leftrightarrow &${delta} - 4(${3 * a})(m + ${c}) \\leq 0 \\\\
    \\Leftrightarrow &${delta} + ${-12 * a}m ${-12 * a * c < 0 ? '-' : '+'} ${Math.abs(12 * a * c)} \\leq 0 \\\\
    \\Leftrightarrow &${-12 * a}m \\leq -${delta} ${-12 * a * c < 0 ? '+' : '-'} ${Math.abs(12 * a * c)} \\\\
    \\Leftrightarrow &m \\geq ${mm}
    \\end{aligned}`;

    // Tìm các giá trị nguyên của m trong đoạn [-e + g, e] thoả điều kiện
    let lowerBound = -e + g;
    let upperBound = e;
    let count = 0;
    let validMs = [];

    for (let m = lowerBound; m <= upperBound; m++) {
        if (m >= mUpper) {
            count++;
            validMs.push(m);
        }
    }



    // Tạo lời giải
    let explanation = `Tập xác định $\\mathbb{R}$.\\\\
        $y'=${derivative}$.\\\\
        Hàm số đồng biến trên $(-\\infty; +\\infty)$ khi và chỉ khi $\\Delta \\leq 0$.\\\\
        ${condition}.\\\\
        Số giá trị nguyên của $m$ trong đoạn $[${lowerBound}, ${upperBound}]$ thoả điều kiện là $${count}$.`;

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1V1-3]
    Cho hàm số $y=${equation}$ với $m$ là tham số. Có bao nhiêu giá trị nguyên của $m$ trong đoạn [${lowerBound}, ${upperBound}] để hàm số đồng biến trên $(-\\infty; +\\infty)$?
    \\shortans{${count}}
    \\loigiai{
        ${explanation}
    }
\\end{ex}`;

    question = question.replace('geq --', 'leq ');
    question = question.replace('leq --','leq ')
    question = cleanUpOutput(question)
    return question;
}

function tim_mn_hsbac3_nhan_A_lam_cuctri(a, b, c, e, f) {
    // Tạo biểu thức hàm số
    let equation = `${a}x^3 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x^2 ${c < 0 ? '-' : '+'} ${Math.abs(c)}mx + n`;

    // Tính đạo hàm của hàm số
    let derivative = `${3 * a}x^2 ${2 * b < 0 ? '-' : '+'} ${Math.abs(2 * b)}x + ${c < 0 ? '-' : '+'} ${Math.abs(c)}m`;

    // Hệ phương trình với điểm cực tiểu A(e, f)
    // 1. \(a e^3 + b e^2 + c e m + n = f\)
    // 2. \(3 a e^2 + 2 b e + c m = 0\)

    // Hệ số của hệ phương trình
    let A = [
        [c * e, 1],
        [c, 0]
    ];
    let B = [
        [f - (a * e ** 3 + b * e ** 2)],
        [- (3 * a * e ** 2 + 2 * b * e)]
    ];

    // Định thức của ma trận A
    let detA = A[0][0] * A[1][1] - A[0][1] * A[1][0];

    // Định thức của ma trận A với cột đầu tiên được thay bởi B
    let detA1 = B[0][0] * A[1][1] - B[1][0] * A[0][1];

    // Định thức của ma trận A với cột thứ hai được thay bởi B
    let detA2 = A[0][0] * B[1][0] - A[1][0] * B[0][0];

    // Giá trị của m và n
    let mValue = detA1 / detA;
    let nValue = detA2 / detA;

    // Tính m + n
    let mPlusN = (mValue + nValue).toFixed(1);
    if (mPlusN % 1 === 0) {
        mPlusN = Math.round(mPlusN);
    }

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1V1-3]
    Đồ thị hàm số $y=${equation}$ có điểm cực tiểu $A(${e};${f})$. Khi đó $m+n$ bằng bao nhiêu? (làm tròn một chữ số thập phân nếu có).
    \\shortans{$${mPlusN}$}
    \\loigiai{
        $y'=${derivative}$.\\\\
        Ta có hệ phương trình\\\\
       $\\heva{&${a * e ** 3} + ${b * e ** 2} + ${c * e}m + n = ${f} \\\\
        &${3 * a}.(${e})^2 + ${2 * b}.(${e}) + ${c}m = 0}\\Rightarrow \\heva{&m=${mValue} \\ &n=${nValue}.}$\\\\
        Vậy $m+n = ${mPlusN}$.
    }
\\end{ex}`;
    question = cleanUpOutput(question)
    return question;
}
function tim_abcd_biet_hs_co_2cutri(xa, ya, xb, yb) {
    // Thiết lập hệ phương trình
    // Đạo hàm y' = 3ax^2 + 2bx + c
    // Tại điểm cực trị, đạo hàm y' = 0

    // y'(xa) = 0 => 3a * xa^2 + 2b * xa + c = 0
    // y'(xb) = 0 => 3a * xb^2 + 2b * xb + c = 0
    // y(xa) = ya => a * xa^3 + b * xa^2 + c * xa + d = ya
    // y(xb) = yb => a * xb^3 + b * xb^2 + c * xb + d = yb

    let A = [
        [3 * xa ** 2, 2 * xa, 1, 0],
        [3 * xb ** 2, 2 * xb, 1, 0],
        [xa ** 3, xa ** 2, xa, 1],
        [xb ** 3, xb ** 2, xb, 1]
    ];
    let B = [0, 0, ya, yb];

    // Phương pháp Gauss để giải hệ phương trình
    function gaussianElimination(A, B) {
        let n = B.length;

        for (let i = 0; i < n; i++) {
            // Tìm giá trị lớn nhất trong cột hiện tại
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
                    maxRow = k;
                }
            }

            // Hoán đổi hàng tối đa với hàng hiện tại (hàng i)
            [A[i], A[maxRow]] = [A[maxRow], A[i]];
            [B[i], B[maxRow]] = [B[maxRow], B[i]];

            // Khử
            for (let k = i + 1; k < n; k++) {
                let factor = A[k][i] / A[i][i];
                B[k] -= factor * B[i];
                for (let j = i; j < n; j++) {
                    A[k][j] -= factor * A[i][j];
                }
            }
        }

        // Giải ngược
        let x = new Array(n);
        for (let i = n - 1; i >= 0; i--) {
            x[i] = B[i] / A[i][i];
            for (let k = i - 1; k >= 0; k--) {
                B[k] -= A[k][i] * x[i];
            }
        }
        return x;
    }

    let [a, b, c, d] = gaussianElimination(A, B);

    // Làm tròn các hệ số và tổng
    a = a.toFixed(2);
    b = b.toFixed(2);
    c = c.toFixed(2);
    d = d.toFixed(2);
    let mPlusN = (parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d)).toFixed(1);
    if (mPlusN %1===0){
      mPlusN=Math.round(mPlusN)
    }

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1V1-3]
    Biết hàm số $y=ax^3+bx^2+cx+d$ có hai điểm cực trị là $A(${xa};${ya})$ và $B(${xb};${yb})$. Khi đó $a+b+c+d$ bằng bao nhiêu? (làm tròn một chữ số thập phân).
    \\shortans{$${mPlusN}$}
    \\loigiai{
        $\\begin{aligned}
        &y' = 3ax^2 + 2bx + c\\\\
        &y'(${xa}) = 0 \\Rightarrow 3a(${xa})^2 + 2b(${xa}) + c = 0\\\\
        &y'(${xb}) = 0 \\Rightarrow 3a(${xb})^2 + 2b(${xb}) + c = 0\\\\
        &y(${xa}) = ${ya} \\Rightarrow a(${xa})^3 + b(${xa})^2 + c(${xa}) + d = ${ya}\\\\
        &y(${xb}) = ${yb} \\Rightarrow a(${xb})^3 + b(${xb})^2 + c(${xb}) + d = ${yb}\\\\
        &a = ${a}, b = ${b}, c = ${c}, d = ${d}.      
        \\end{aligned}$\\\\
        Vậy $a+b+c+d = ${mPlusN}$.
    }
\\end{ex}`;
    question = cleanUpOutput(question)
    return question;
}

function ham_phuc_thuc_ngb_tren_ab(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng -10, 10
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
             
    let c = getRandomInt(10, 20+e);
    let d = getRandomInt(2, 4);  // d khác 0
    let a = getRandomInt(-5, -1);
    let b = getRandomInt(1, 5);
    let alpha = getRandomInt(1, 5);
    let beta = getRandomInt(7, 16);

    // Tính các giá trị để kiểm tra điều kiện
    let sqrt_cd = Math.sqrt(c * d);
    let neg_bd = -b * d;
    let neg_ad = -a * d;

    // Tìm các giá trị của m thoả mãn điều kiện
    let mValues = [];

    for (let m = Math.ceil(alpha); m <= Math.floor(beta); m++) {
        if (m * m - c * d < 0 && (m < neg_ad || m > neg_bd)) {
            mValues.push(m);
        }
    }

    // Số phần tử của tập S
    let count = mValues.length;

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-3]
    Cho hàm số $y=\\dfrac{mx+${c}}{${d}x+m}$, $m$ là tham số thực. Gọi $S$ là tập hợp các số giá trị nguyên của $m$ trên đoạn $[${alpha};${beta}]$ để hàm số nghịch biến trên khoảng $(${a};${b})$. Tìm số phần tử của $S$.
    \\shortans{$${count}$}
    \\loigiai{
        $y'=\\dfrac{m^2-${c}${d}}{(${d}x+m)^2}$.\\\\
        Hàm số nghịch biến trên khoảng $(${a};${b})$ khi và chỉ khi\\\\
        \\[
        \\heva{
            &m^2-${c}${d}< 0\\\\
            &-\\dfrac{m}{${d}}\\notin (${a};${b})
        }\\Leftrightarrow \\heva{
            &-\\sqrt{${c}${d}}< m < \\sqrt{${c}${d}}\\\\
            &\\text{và } m \\notin (${Math.min(neg_ad, neg_bd)};${Math.max(neg_ad, neg_bd)})
        }
        \\]
        Vậy số phần tử của tập $S$ là $${count}$.
    }
\\end{ex}`;

    return question;
}
function ham_phuc_thuc_db_tren_ab(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng -10, 10
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let c = getRandomInt(1, 10+e);
    let d = getRandomInt(2, 4);  // d khác 0
    let a = getRandomInt(-5, -1);
    let b = getRandomInt(1, 5);
    let alpha = getRandomInt(1, 5);
    let beta = getRandomInt(7, 16);

    // Tính các giá trị để kiểm tra điều kiện
    let sqrt_cd = Math.sqrt(c * d);
    let neg_bd = -b * d;
    let neg_ad = -a * d;

    // Tìm các giá trị của m thoả mãn điều kiện
    let mValues = [];

    for (let m = Math.ceil(alpha); m <= Math.floor(beta); m++) {
        if (m * m - c * d > 0 && (m < neg_ad || m > neg_bd)) {
            mValues.push(m);
        }
    }

    // Số phần tử của tập S
    let count = mValues.length;

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-3]
    Cho hàm số $y=\\dfrac{mx+${c}}{${d}x+m}$, $m$ là tham số thực. Gọi $S$ là tập hợp các số giá trị nguyên của $m$ trên đoạn $[${alpha};${beta}]$ để hàm số đồng biến trên khoảng $(${a};${b})$. Tìm số phần tử của $S$.
    \\shortans{$${count}$}
    \\loigiai{
        $y'=\\dfrac{m^2-${c}${d}}{(${d}x+m)^2}$.\\\\
        Hàm số đồng biến trên khoảng $(${a};${b})$ khi và chỉ khi\\\\
        \\[
        \\heva{
            &m^2-${c}${d}> 0\\\\
            &-\\dfrac{m}{${d}}\\notin (${a};${b})
        }\\Leftrightarrow \\heva{
            &m < -\\sqrt{${c}${d}} \\text{ hoặc } m > \\sqrt{${c}${d}}\\\\
            &\\text{và } m \\notin (${Math.min(neg_ad, neg_bd)};${Math.max(neg_ad, neg_bd)})
        }
        \\]
        Vậy số phần tử của tập $S$ là $${count}$.
    }
\\end{ex}`;

    return question;
}
function ham_phuc_thuc_db_tren_tap_xac_dinh(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng -10, 10
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let c = getRandomInt(1, 10+e);
    let d = getRandomInt(2, 4);  // d khác 0
    let alpha = getRandomInt(1, 5);
    let beta = getRandomInt(7, 16);

    // Tính các giá trị để kiểm tra điều kiện
    let sqrt_cd = Math.sqrt(c * d);

    // Tìm các giá trị của m thoả mãn điều kiện
    let mValues = [];

    for (let m = Math.ceil(alpha); m <= Math.floor(beta); m++) {
        if (m * m - c * d > 0) {
            mValues.push(m);
        }
    }

    // Số phần tử của tập S
    let count = mValues.length;

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-3]
    Cho hàm số $y=\\dfrac{mx+${c}}{${d}x+m}$, $m$ là tham số thực. Có bao nhiêu số giá trị nguyên của $m$ trên đoạn $[${alpha};${beta}]$ để hàm số đồng biến trên tập xác định của nó?
    \\shortans{$${count}$}
    \\loigiai{
        $y'=\\dfrac{m^2-${c}${d}}{(${d}x+m)^2}$.\\\\
        Hàm số đồng biến trên tập xác định của nó khi và chỉ khi\\\\
        \\[
        \\heva{
            &m^2-${c}${d}> 0
        }\\Leftrightarrow \\heva{
            &m < -\\sqrt{${c}${d}} \\text{ hoặc } m > \\sqrt{${c}${d}}
        }
        \\]
        Vậy số phần tử của tập $S$ là $${count}$.
    }
\\end{ex}`;

    return question;
}
function ham_phuc_thuc_ngb_tren_tap_xac_dinh(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng -10, 10
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let c = getRandomInt(5, 10 + e);
    let d = getRandomInt(2, 4);  // d khác 0
    let alpha = getRandomInt(1, 5);
    let beta = getRandomInt(7, 16);

    // Tính các giá trị để kiểm tra điều kiện
    let sqrt_cd = Math.sqrt(c * d);

    // Tìm các giá trị của m thoả mãn điều kiện
    let mValues = [];

    for (let m = Math.ceil(alpha); m <= Math.floor(beta); m++) {
        if (m * m - c * d < 0) {
            mValues.push(m);
        }
    }

    // Số phần tử của tập S
    let count = mValues.length;

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-3]
    Cho hàm số $y=\\dfrac{mx+${c}}{${d}x+m}$, $m$ là tham số thực. Có bao nhiêu số giá trị nguyên của $m$ trên đoạn $[${alpha};${beta}]$ để hàm số nghịch biến trên tập xác định của nó?
    \\shortans{$${count}$}
    \\loigiai{
        $y'=\\dfrac{m^2-${c}${d}}{(${d}x+m)^2}$.\\\\
        Hàm số nghịch biến trên tập xác định của nó khi và chỉ khi\\\\
        \\[
        \\heva{
            &m^2-${c}${d}< 0
        }\\Leftrightarrow \\heva{
            &-\\sqrt{${c}${d}} < m < \\sqrt{${c}${d}}
        }
        \\]
        Vậy số phần tử của tập $S$ là $${count}$.
    }
\\end{ex}`;

    return question;
}
function ham_phuc_thuc_nb_tren_tap_xac_dinh(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng -10, 10
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let c = getRandomInt(10, 20 + e);
    let d = getRandomInt(2, 4);  // d khác 0
    let alpha = getRandomInt(-5, 1);
    let beta = getRandomInt(2, 10);

    // Tính các giá trị để kiểm tra điều kiện
    let cd = c * d;

    // Tìm các giá trị của m thoả mãn điều kiện
    let mValues = [];

    for (let m = Math.ceil(alpha); m <= Math.floor(beta); m++) {
        if (m * (m + e) - cd < 0) {
            mValues.push(m);
        }
    }

    // Số phần tử của tập S
    let count = mValues.length;

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-3]
    Cho hàm số $y=\\dfrac{(m+${e})x+${c}}{${d}x+m}$, $m$ là tham số thực. Có bao nhiêu số giá trị nguyên của $m$ trên đoạn $[${alpha};${beta}]$ để hàm số nghịch biến trên tập xác định của nó?
    \\shortans{$${count}$}
    \\loigiai{
        $y'=\\dfrac{m(m+e)-${c}${d}}{(${d}x+m)^2}$.\\\\
        Hàm số nghịch biến trên tập xác định của nó khi và chỉ khi\\\\
        \\[
        \\heva{
            &m(m+${e})-${c}.${d}< 0
        }\\Leftrightarrow \\heva{
            &m^2 + ${e}m - ${cd} < 0
        }
        \\]
        Vậy số phần tử của tập $S$ là $${count}$.
    }
\\end{ex}`;

    return question;
}
function ham_phuc_thuc_db_tren_tkxd(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng -10, 10
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let c = getRandomInt(10, 20 + e);
    let d = getRandomInt(2, 4);  // d khác 0
    let alpha = getRandomInt(-5, 1);
    let beta = getRandomInt(2, 10);

    // Tính các giá trị để kiểm tra điều kiện
    let cd = c * d;

    // Tìm các giá trị của m thoả mãn điều kiện
    let mValues = [];

    for (let m = Math.ceil(alpha); m <= Math.floor(beta); m++) {
        if (m * (m + e) - cd > 0) {
            mValues.push(m);
        }
    }

    // Số phần tử của tập S
    let count = mValues.length;

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-3]
    Cho hàm số $y=\\dfrac{(m+${e})x+${c}}{${d}x+m}$, $m$ là tham số thực. Có bao nhiêu số giá trị nguyên của $m$ trên đoạn $[${alpha};${beta}]$ để hàm số đồng biến trên tập xác định của nó?
    \\shortans{$${count}$}
    \\loigiai{
        $y'=\\dfrac{m(m+${e})-${c}${d}}{(${d}x+m)^2}$.\\\\
        Hàm số đồng biến trên tập xác định của nó khi và chỉ khi\\\\
        \\[
        \\heva{
            &m(m+${e})-${c}${d}> 0
        }\\Leftrightarrow \\heva{
            &m^2 + ${e}m - ${cd} > 0
        }
        \\]
        Vậy số phần tử của tập $S$ là $${count}$.
    }
\\end{ex}`;

    return question;
}
function hsb3_find_area(e) {
    // Hệ số của hàm số
    let a = Math.floor(Math.random() * 6) + 1;
    let b = Math.floor(Math.random() * 10) -5;
    let c = Math.floor(Math.random() * 6) + e;

    // Tính đạo hàm của hàm số: y' = 3ax^2 + 2bx
    // Giải phương trình y' = 0 để tìm các điểm cực trị
    let delta = b ** 2 - 4 * a * 0; // delta của phương trình bậc 2: 3ax^2 + 2bx = 0

    if (delta < 0) {
        return "Phương trình không có nghiệm thực";
    }

    let x1 = 0; // Nghiệm thứ nhất
    let x2 = -2 * b / ( 3 * a); // Nghiệm thứ hai

    // Tính tọa độ các điểm cực trị
    let y1 = a * x1 ** 3 + b * x1 ** 2 + c;
    let y2 = a * x2 ** 3 + b * x2 ** 2 + c;

    // Làm tròn các giá trị đến 1 chữ số thập phân
    x1 = x1.toFixed(2);
    y1 = y1.toFixed(2);
    x2 = x2.toFixed(2);
    y2 = y2.toFixed(2);

    // Tính diện tích tam giác vuông OAB
    let area = (0.5 * Math.abs(x1 * y2 - x2 * y1)).toFixed(1);
    if (area %1===0){
        area=Math.round(area)
    }
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-1]
    Gọi $A$, $B$ là hai điểm cực trị của đồ thị hàm số $y=${a}x^3${b < 0 ? '' : '+'}${b}x^2${c < 0 ? '' : '+'}${c}$. Tính diện tích $S$ của tam giác $OAB$ với $O$ là gốc tọa độ, (làm tròn một chữ số thập phân).
    \\shortans{$${area}$}
    \\loigiai{
        Ta có $y'=${3 * a}x^2${2 * b < 0 ? '' : '+'}${2 * b}x$ và $y'=0 \\Leftrightarrow x=${x1}$ hoặc $x=${x2}$.\\\\
        Do đó hai điểm cực trị của đồ thị hàm số là $A(${x1};${y1}), B(${x2};${y2})$.\\\\
        Diện tích tam giác $OAB$ là $S_{\\triangle OAB}=\\dfrac{1}{2} |x_1 y_2 - x_2 y_1|=${area}$.
    }
\\end{ex}`;

    return question;
}
function hsb3_find_area2(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = getRandomInt(1, 5); // a từ 1 đến 5
    let b = getRandomInt(-10, 10); // b từ -10 đến 10
    let c = getRandomInt(-5, -1); // c từ -5 đến -1
    let d = getRandomInt(-10, 10+e); // d từ -10 đến 10

    // Tính delta để giải phương trình bậc hai y' = 3ax^2 + 2bx + c = 0
    let delta = 4 * b * b - 4 * 3 * a * c;

    if (delta < 0) {
        return "Phương trình không có nghiệm thực";
    }

    // Tìm các nghiệm của phương trình y' = 0
    let x1 = (-2 * b + Math.sqrt(delta)) / (2 * 3 * a);
    let x2 = (-2 * b - Math.sqrt(delta)) / (2 * 3 * a);

    // Tính tọa độ các điểm cực trị
    let y1 = a * x1 ** 3 + b * x1 ** 2 + c * x1 + d;
    let y2 = a * x2 ** 3 + b * x2 ** 2 + c * x2 + d;

    // Làm tròn các giá trị đến 1 chữ số thập phân
    x1 = parseFloat(x1.toFixed(2));
    y1 = parseFloat(y1.toFixed(2));
    x2 = parseFloat(x2.toFixed(2));
    y2 = parseFloat(y2.toFixed(2));

    // Tính diện tích tam giác OAB sử dụng tích có hướng
    let area = (0.5 * Math.abs(x1 * y2 - x2 * y1)).toFixed(1);
  if (area %1===0){area=Math.round(area)}

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}%[2D1H1-1]
    Gọi $A$, $B$ là hai điểm cực trị của đồ thị hàm số $y=${a}x^3${b < 0 ? '' : '+'}${b}x^2${c < 0 ? '' : '+'}${c}x${d < 0 ? '' : '+'}${d}$. Tính diện tích $S$ của tam giác $OAB$ với $O$ là gốc tọa độ, (làm tròn một chữ số thập phân).
    \\shortans{$${area}$}
    \\loigiai{
        Ta có $y'=${3 * a}x^2${2 * b < 0 ? '' : '+'}${2 * b}x${c < 0 ? '' : '+'}${c}$ và $y'=0 \\Leftrightarrow x=${x1}$ hoặc $x=${x2}$.\\\\
        Do đó hai điểm cực trị của đồ thị hàm số là $A(${x1};${y1}), B(${x2};${y2})$.\\\\
        Diện tích tam giác $OAB$ là $S_{\\triangle OAB}=\\dfrac{1}{2} |x_1 y_2 - x_2 y_1|=${area}$.
    }
\\end{ex}`;

    return question;
}
function hsb3_dt_qua2_cuctri_dep(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = getRandomInt(1, 5); // a từ 1 đến 5
    let b;do { b = getRandomInt(-10, 10);} while (b === 0);
    let c = getRandomInt(0, 0); // c từ -5 đến -1
    let d = getRandomInt(-10, 10 + e); // d từ -10 đến 10 

    // Tính delta để giải phương trình bậc hai y' = 3ax^2 + 2bx + c = 0
    let delta = 4 * b * b - 4 * 3 * a * c;

    if (delta < 0) {
        return "Phương trình không có nghiệm thực";
    }

    // Tìm các nghiệm của phương trình y' = 0
    let x1 = (-2 * b + Math.sqrt(delta)) / (2 * 3 * a);
    let x2 = (-2 * b - Math.sqrt(delta)) / (2 * 3 * a);

    // Tính tọa độ các điểm cực trị
    let y1 = a * x1 ** 3 + b * x1 ** 2 + c * x1 + d;
    let y2 = a * x2 ** 3 + b * x2 ** 2 + c * x2 + d;

    // Làm tròn các giá trị đến 1 chữ số thập phân
    x1 = parseFloat(x1.toFixed(2));
    y1 = parseFloat(y1.toFixed(2));
    x2 = parseFloat(x2.toFixed(2));
    y2 = parseFloat(y2.toFixed(2));

    // Tính các hệ số của đường thẳng y = ax + b
    let slope = (y2 - y1) / (x2 - x1);
    let intercept = y1 - slope * x1;

    // Làm tròn hệ số của phương trình đường thẳng
    slope = parseFloat(slope.toFixed(3));
    intercept = parseFloat(intercept.toFixed(3));

    // Tính tổng a + b
    let sum_ab = (slope + intercept).toFixed(1);
  if(sum_ab %1===0){
    sum_ab=Math.round(sum_ab)
  }
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Phương trình đường thẳng đi qua hai điểm cực trị của đồ thị hàm số $y=${a}x^3${b < 0 ? '' : '+'}${b}x^2${c < 0 ? '' : '+'}${c}x${d < 0 ? '' : '+'}${d}$ có dạng $y=ax+b$. Tính $a+b$ làm tròn một chữ số thập phân
    \\shortans{$${sum_ab}$}
    \\loigiai{
    }
\\end{ex}`;
    question = question.replace('+0x','')
    return question;
}
function hsb3_dt_qua2_cuctri_xau(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = getRandomInt(1, 5); // a từ 1 đến 5
    let b = getRandomInt(-10, 10); // b từ -10 đến 10
    let c = getRandomInt(-5, -1); // c từ -5 đến -1
    let d = getRandomInt(-10, 10 + e); // d từ -10 đến 10 

    // Tính delta để giải phương trình bậc hai y' = 3ax^2 + 2bx + c = 0
    let delta = 4 * b * b - 4 * 3 * a * c;

    if (delta < 0) {
        return "Phương trình không có nghiệm thực";
    }

    // Tìm các nghiệm của phương trình y' = 0
    let x1 = (-2 * b + Math.sqrt(delta)) / (2 * 3 * a);
    let x2 = (-2 * b - Math.sqrt(delta)) / (2 * 3 * a);

    // Tính tọa độ các điểm cực trị
    let y1 = a * x1 ** 3 + b * x1 ** 2 + c * x1 + d;
    let y2 = a * x2 ** 3 + b * x2 ** 2 + c * x2 + d;

    // Làm tròn các giá trị đến 1 chữ số thập phân
    x1 = parseFloat(x1.toFixed(2));
    y1 = parseFloat(y1.toFixed(2));
    x2 = parseFloat(x2.toFixed(2));
    y2 = parseFloat(y2.toFixed(2));

    // Tính các hệ số của đường thẳng y = ax + b
    let slope = (y2 - y1) / (x2 - x1);
    let intercept = y1 - slope * x1;

    // Làm tròn hệ số của phương trình đường thẳng
    slope = parseFloat(slope.toFixed(3));
    intercept = parseFloat(intercept.toFixed(3));

    // Tính tổng a + b
    let sum_ab = (slope + intercept).toFixed(1);
  if(sum_ab %1===0){
    sum_ab=Math.round(sum_ab)
  }
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Phương trình đường thẳng đi qua hai điểm cực trị của đồ thị hàm số $y=${a}x^3${b < 0 ? '' : '+'}${b}x^2${c < 0 ? '' : '+'}${c}x${d < 0 ? '' : '+'}${d}$ có dạng $y=ax+b$. Tính $a+b$ làm tròn một chữ số thập phân
    \\shortans{$${sum_ab}$}
    \\loigiai{
    }
\\end{ex}`;

    return question;
}
function min_max_phan_thuc_cb(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a, b, c, d, alpha, beta, derivative_sign, critical_point;

    do {
       // Tạo các hệ số ngẫu nhiên và đảm bảo a và c khác 0
       a = getRandomInt(-10, 10);
       while (a === 0) {
           a = getRandomInt(-10, 10);
       }
       
       b = getRandomInt(-10, 10);
       while (b === 0) {
        b = getRandomInt(-10, 10);
    }
       c = getRandomInt(-10, 10);
       while (c === 0) {
           c = getRandomInt(-10, 10);
       }
        d = getRandomInt(-10, 10+e);
        while (d === 0) {
            d = getRandomInt(-10, 10);
        }
        // Tạo giá trị ngẫu nhiên cho alpha và beta
        alpha = getRandomInt(-10, 10);
        beta = getRandomInt(-10, 10);

        // Đảm bảo alpha < beta
        if (alpha > beta) {
            let temp = alpha;
            alpha = beta;
            beta = temp;
        }

        // Tính giá trị đạo hàm của hàm số f(x) = (ax + b) / (cx + d)
        derivative_sign = a * d - b * c;

        // Tính điểm tới hạn -d/c
        critical_point = -d / c;
    } while (derivative_sign === 0 || (critical_point >= alpha && critical_point <= beta)); // Đảm bảo a * d - b * c khác 0 và -d/c không thuộc [alpha, beta]

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, d, x) {
        return (a * x + b) / (c * x + d);
    }

    let f_alpha = f(a, b, c, d, alpha);
    let f_beta = f(a, b, c, d, beta);

    // Tìm giá trị lớn nhất và nhỏ nhất trên đoạn [alpha, beta]
    let M = Math.max(f_alpha, f_beta);
    let m = Math.min(f_alpha, f_beta);

    // Tính tổng M + e * m
    let sum = (M + e * m).toFixed(1);
    if (sum %1===0){sum=Math.round(sum)}
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Gọi $M$, $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x)=\\dfrac{${a}x${b < 0 ? '' : '+'}${b}}{${c}x${d < 0 ? '' : '+'}${d}}$ trên đoạn $\\left[${alpha},${beta}\\right]$. Tính $M+${e}\\cdot m$, làm tròn một chữ số thập phân.
    \\shortans{$${sum}$}
    \\loigiai{
        Đạo hàm của hàm số $f(x)$ là $f'(x)=\\dfrac{${a * d - b * c}}{(${c}x${d < 0 ? '' : '+'}${d})^2}$.\\\\
        Vì $a \\cdot d - b \\cdot c ${derivative_sign > 0 ? '>' : '<'} 0$ nên hàm số ${derivative_sign > 0 ? 'đồng biến' : 'nghịch biến'} trên đoạn $[${alpha}, ${beta}]$.\\\\
        Do đó, $M = f(${f_alpha > f_beta ? alpha : beta}) = ${Math.max(f_alpha, f_beta).toFixed(2)}$ và $m = f(${f_alpha < f_beta ? alpha : beta}) = ${Math.min(f_alpha, f_beta).toFixed(2)}$.\\\\
        Tổng $M + ${e}\\cdot m = ${sum}$.
    }
\\end{ex}`;
    question = lamdeppm(question)
    return question;
}
function min_max_hambac3_cb(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a, b, c, alpha, beta, critical_points;

    do {
        // Tạo các hệ số ngẫu nhiên và đảm bảo a khác 0
        a = getRandomInt(-5, 5);
        while (a === 0) {
            a = getRandomInt(-10, 10);
        }

        b = getRandomInt(-10, 10);
        while (b === 0) {
            b = getRandomInt(-10, 10);
        }
        c = getRandomInt(-10, 10);
        while (c === 0) {
            c = getRandomInt(-10, 10);
        }

        // Tạo giá trị ngẫu nhiên cho alpha và beta
        alpha = getRandomInt(-5, 0);
        beta = getRandomInt(1, 5);
  
        // Đảm bảo alpha < beta
        if (alpha > beta) {
            let temp = alpha;
            alpha = beta;
            beta = temp;
        }

        // Tính đạo hàm của hàm số y = ax^3 + bx^2 + c
        // y' = 3ax^2 + 2bx
        // Tìm các nghiệm của phương trình y' = 0
        let delta = b * b - 3 * a * 0;
        let x1 = null, x2 = null;
        if (delta >= 0) {
            x1 = (-b + Math.sqrt(delta)) / (3 * a);
            x2 = (-b - Math.sqrt(delta)) / (3 * a);
        }

        critical_points = [x1, x2].filter(point => point !== null && point >= alpha && point <= beta);
    } while (critical_points.length === 0 && b * b - 3 * a * 0 < 0); // Đảm bảo có nghiệm trong đoạn [alpha, beta] hoặc đạo hàm không có nghiệm thực

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, x) {
        return a * x ** 3 + b * x ** 2 + c;
    }

    let f_alpha = f(a, b, c, alpha);
    let f_beta = f(a, b, c, beta);
    let values = [f_alpha, f_beta];

    critical_points.forEach(point => {
        values.push(f(a, b, c, point));
    });

    // Tìm giá trị lớn nhất và nhỏ nhất trên đoạn [alpha, beta]
    let M = Math.max(...values);
    let m = Math.min(...values);

    // Tính tổng M + e * m
    let sum = (M + e * m).toFixed(1);
    if (sum %1===0){sum=Math.round(sum)}
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Gọi $M$, $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x)=${a}x^3${b < 0 ? '' : '+'}${b}x^2${c < 0 ? '' : '+'}${c}$ trên đoạn $\\left[${alpha};${beta}\\right]$. Tính $M+${e}m$, làm tròn một chữ số thập phân.
    \\shortans{$${sum}$}
    \\loigiai{
       
    }
\\end{ex}`;
    question = lamdeppm(question)
    return question;
}
function min_max_hambac3_cb_xau(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a, b, c, d, alpha, beta, critical_points;

    do {
        // Tạo các hệ số ngẫu nhiên và đảm bảo a khác 0
        a = getRandomInt(-5, 5);
        while (a === 0) {
            a = getRandomInt(-5, 5);
        }

        b = getRandomInt(-10, 10);
        while (b === 0) {
            b = getRandomInt(-10, 10);
        }

        c = getRandomInt(-10, 10);
        while (c === 0) {
            c = getRandomInt(-10, 10);
        }

        d = getRandomInt(-10, 10);

        // Tạo giá trị ngẫu nhiên cho alpha và beta
        alpha = getRandomInt(-5, 0);
        beta = getRandomInt(1, 5);

        // Đảm bảo alpha < beta
        if (alpha > beta) {
            let temp = alpha;
            alpha = beta;
            beta = temp;
        }

        // Tính đạo hàm của hàm số y = ax^3 + bx^2 + cx + d
        // y' = 3ax^2 + 2bx + c
        // Tìm các nghiệm của phương trình y' = 0
        let delta = b * b - 3 * a * c;
        let x1 = null, x2 = null;
        if (delta >= 0) {
            x1 = (-b + Math.sqrt(delta)) / (3 * a);
            x2 = (-b - Math.sqrt(delta)) / (3 * a);
        }

        critical_points = [x1, x2].filter(point => point !== null && point >= alpha && point <= beta);
    } while (critical_points.length === 0); // Đảm bảo có nghiệm trong đoạn [alpha, beta]

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, d, x) {
        return a * x ** 3 + b * x ** 2 + c * x + d;
    }

    let f_alpha = f(a, b, c, d, alpha);
    let f_beta = f(a, b, c, d, beta);
    let values = [f_alpha, f_beta];

    critical_points.forEach(point => {
        values.push(f(a, b, c, d, point));
    });

    // Tìm giá trị lớn nhất và nhỏ nhất trên đoạn [alpha, beta]
    let M = Math.max(...values);
    let m = Math.min(...values);

    // Tính tổng M + e * m
    let sum = (M + e * m).toFixed(1);
    if (sum % 1 === 0) {
        sum = Math.round(sum);
    }

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Gọi $M$, $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x)=${a}x^3${b < 0 ? '' : '+'}${b}x^2${c < 0 ? '' : '+'}${c}x${d < 0 ? '' : '+'}${d}$ trên đoạn $\\left[${alpha};${beta}\\right]$. Tính $M+${e}m$, làm tròn một chữ số thập phân.
    \\shortans{$${sum}$}
    \\loigiai{
       
    }
\\end{ex}`;
    question = lamdeppm(question)
    return question;
}


 



function tich_vohuong3D(a, b, c, d, e, f) {
    let result = 0;
    let expression = "";

    function processTerm(term1, term2) {
        if (typeof term1 === 'number' && typeof term2 === 'number') {
            return term1 * term2;
        } else if (typeof term1 === 'number' && typeof term2 === 'string') {
            return `${term1}${term2}`;
        } else if (typeof term1 === 'string' && typeof term2 === 'number') {
            return `${term2}${term1}`;
        } else {
            return `${term1}${term2}`;
        }
    }

    // Tính toán các phần tử
    const term1 = processTerm(a, d);
    const term2 = processTerm(b, e);
    const term3 = processTerm(c, f);

    // Tính toán kết quả số và xây dựng biểu thức chữ cái
    if (typeof term1 === 'number') {
        result += term1;
    } else {
        expression += term1 + " + ";
    }

    if (typeof term2 === 'number') {
        result += term2;
    } else {
        expression += term2 + " + ";
    }

    if (typeof term3 === 'number') {
        result += term3;
    } else {
        expression += term3 + " + ";
    }

    // Loại bỏ dấu " + " cuối cùng nếu có
    if (expression.endsWith(" + ")) {
        expression = expression.slice(0, -3);
    }

    // Trả về kết quả
    if (expression.length > 0) {
        return result + (result !== 0 ? " + " : "") + expression;
    } else {
        return result;
    }
}
function executeFunction(fnName, params) {
    if (typeof window[fnName] === 'function') {
        return window[fnName](...params);
    } else {
        return `Hàm ${fnName} không tồn tại`;
    }
}
function min_max_phanthuc_2tren1_cb(factor) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a, b, c, d, e_coeff, alpha, beta, critical_points, pole;

    do {
        // Tạo các hệ số ngẫu nhiên và đảm bảo a và d khác 0
        a = getRandomInt(-5, 5);
        while (a === 0) {
            a = getRandomInt(-5, 5);
        }

        b = getRandomInt(-10, 10);
        c = getRandomInt(-10, 10);

        d = getRandomInt(-5, 5);
        while (d === 0) {
            d = getRandomInt(-5, 5);
        }

        e_coeff = getRandomInt(-10, 10);

        // Tạo giá trị ngẫu nhiên cho alpha và beta
        alpha = getRandomInt(-5, 0);
        beta = getRandomInt(1, 5 + factor);

        // Đảm bảo alpha < beta
        if (alpha > beta) {
            let temp = alpha;
            alpha = beta;
            beta = temp;
        }

        // Tính cực trị của hàm số
        let A = a * d;
        let B = 2 * a * e_coeff ;
        let C = b * e_coeff - c * d;

        let delta = B * B - 4 * A * C;
        let x1 = null, x2 = null;
        if (delta >= 0) {
            x1 = (-B + Math.sqrt(delta)) / (2 * A);
            x2 = (-B - Math.sqrt(delta)) / (2 * A);
        }

        critical_points = [x1, x2].filter(point => point !== null && point >= alpha && point <= beta);

        // Tính vị trí phân kỳ (cực tiểu) của hàm số
        pole = -e_coeff / d;

    } while (critical_points.length === 0 || (pole >= alpha && pole <= beta)); // Đảm bảo có nghiệm trong đoạn [alpha, beta] và -e/d không thuộc đoạn [alpha, beta]

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, d, e_coeff, x) {
        return (a * x ** 2 + b * x + c) / (d * x + e_coeff);
    }

    let f_alpha = f(a, b, c, d, e_coeff, alpha);
    let f_beta = f(a, b, c, d, e_coeff, beta);
    let values = [f_alpha, f_beta];

    critical_points.forEach(point => {
        values.push(f(a, b, c, d, e_coeff, point));
    });

    // Tìm giá trị lớn nhất và nhỏ nhất trên đoạn [alpha, beta]
    let M = Math.max(...values);
    let m = Math.min(...values);

    // Tính tổng M + factor * m
    let sum = (M + factor * m).toFixed(0);
    if (sum % 1 === 0) {
        sum = Math.round(sum);
    }

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Gọi $M$, $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x)=\\dfrac{${a}x^2${b < 0 ? '' : '+'}${b}x${c < 0 ? '' : '+'}${c}}{${d}x${e_coeff < 0 ? '' : '+'}${e_coeff}}$ trên đoạn $\\left[${alpha};${beta}\\right]$. Tính $M+${factor}m$, làm tròn đến phần nguyên.
    \\shortans{$${sum}$}
    \\loigiai{
    }
\\end{ex}`;
    question = lamdeppm(question)
    return question;
}
function min_max_hambac4_cb(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a, b, c, alpha, beta, critical_points;

    do {
        // Tạo các hệ số ngẫu nhiên và đảm bảo a khác 0
        a = getRandomInt(-5, 5);
        while (a === 0) {
            a = getRandomInt(-5, 5);
        }

        b = getRandomInt(-10, 10);
        while (b === 0) {
            b = getRandomInt(-10, 10);
        }

        c = getRandomInt(-10, 10);

        // Tạo giá trị ngẫu nhiên cho alpha và beta
        alpha = getRandomInt(-5, 0);
        beta = getRandomInt(1, 5 + e);

        // Đảm bảo alpha < beta
        if (alpha > beta) {
            let temp = alpha;
            alpha = beta;
            beta = temp;
        }

        // Tính đạo hàm của hàm số y = ax^4 + bx^2 + c
        // y' = 4ax^3 + 2bx
        // Tìm các nghiệm của phương trình y' = 0
        // 4ax^3 + 2bx = 0
        // x(4ax^2 + 2b) = 0
        // x = 0 hoặc 4ax^2 + 2b = 0
        // 4ax^2 + 2b = 0
        // x^2 = -b / (2a)
        // x = ±sqrt(-b / (2a))
        critical_points = [];

        if (a != 0) {
            let discriminant = -b / (2 * a);
            if (discriminant >= 0) {
                let x1 = Math.sqrt(discriminant);
                let x2 = -Math.sqrt(discriminant);
                critical_points.push(x1, x2);
            }
        }

        // Lọc các nghiệm nằm trong đoạn [alpha, beta]
        critical_points = critical_points.filter(point => point >= alpha && point <= beta);
    } while (critical_points.length === 0); // Đảm bảo có nghiệm trong đoạn [alpha, beta]

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, x) {
        return a * x ** 4 + b * x ** 2 + c;
    }

    let f_alpha = f(a, b, c, alpha);
    let f_beta = f(a, b, c, beta);
    let values = [f_alpha, f_beta];

    critical_points.forEach(point => {
        values.push(f(a, b, c, point));
    });

    // Tìm giá trị lớn nhất và nhỏ nhất trên đoạn [alpha, beta]
    let M = Math.max(...values);
    let m = Math.min(...values);

    // Tính tổng M + e * m
    let sum = (M + e * m).toFixed(0);
    if (sum % 1 === 0) {
        sum = Math.round(sum);
    }

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Gọi $M$, $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x)= ${a}x^4${b < 0 ? '' : '+'}${b}x^2${c < 0 ? '' : '+'}${c}$ trên đoạn $\\left[${alpha};${beta}\\right]$. Tính $M+${e}m$, làm tròn một chữ số thập phân.
    \\shortans{$${sum}$}
    \\loigiai{
        
    }
\\end{ex}`;
    question = lamdeppm(question)
    return question;
}

function min_max_sqrt_cb(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a, b, c, x_critical, value_at_critical;

    do {
        // Tạo các hệ số ngẫu nhiên và đảm bảo a khác 0
        a = getRandomInt(1, 5);  // Để đảm bảo a > 0
        b = getRandomInt(-10, 10);
        while (b === 0) {
            b = getRandomInt(-10, 10);
        }
        c = getRandomInt(-5, 5 + e);
        while (c === 0) {
            c = getRandomInt(-5, 5 + e);
        }

        // Tìm nghiệm duy nhất x = b / (2a)
        x_critical = b / (2 * a);

        // Đảm bảo nghiệm x_critical làm cho biểu thức dưới căn không âm
        value_at_critical = -a * x_critical ** 2 + b * x_critical + a * c ** 2 - b * c;

    } while (value_at_critical < 0); // Đảm bảo giá trị tại x_critical không âm

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, x) {
        let value = -a * x ** 2 + b * x + a * c ** 2 - b * c;
        return Math.sqrt(value);
    }

    // Tính giá trị của hàm số tại điểm cực trị
    let f_critical = f(a, b, c, x_critical);
    let values = [f_critical];

    // Tìm giá trị lớn nhất và nhỏ nhất trên tập xác định
    let M = Math.max(...values);
    let m = Math.min(...values);

    // Tính tổng M + e * m + e
    let sum = (M + e * m + e).toFixed(1);
    if (sum % 1 === 0) {
        sum = Math.round(sum);
    }

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Gọi $M$, $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x)= \\sqrt{-${a}x^2${b < 0 ? '' : '+'}${b}x${a * c ** 2 - b * c < 0 ? '' : '+'}${a * c ** 2 - b * c}}$ trên tập xác định của nó. Tính $M+${e}m+${e}$, làm tròn một chữ số thập phân.
    \\shortans{$${sum}$}
    \\loigiai{
        
    }
\\end{ex}`;
    question = lamdeppm(question)
    question=question.replace("+0}","")
    return question;
}
function min_max_sqrt_sqrt(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định và đảm bảo các số dương
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a, b, c, d, alpha, beta;

    do {
        // Tạo các hệ số ngẫu nhiên và đảm bảo chúng là các số dương
        a = getRandomInt(1, 10);  
        b = getRandomInt(1, 10);
        c = getRandomInt(1, 10);
        d = getRandomInt(1, 10+e);

        // Xác định tập xác định của hàm số: a - bx >= 0 và c + dx >= 0
        // => alpha = -c/d và beta = a/b
        alpha = -c / d;
        beta = a / b;

    } while (alpha >= beta); // Đảm bảo khoảng xác định hợp lệ

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, d, x) {
        return Math.sqrt(a - b * x) + Math.sqrt(c + d * x);
    }

    // Tìm đạo hàm của hàm số y = sqrt(a - bx) + sqrt(c + dx)
    // y' = -b / (2sqrt(a - bx)) + d / (2sqrt(c + dx))
    let critical_points = [];

    // Tìm nghiệm của phương trình y' = 0
    // -b / (2sqrt(a - bx)) + d / (2sqrt(c + dx)) = 0
    // => b / sqrt(a - bx) = d / sqrt(c + dx)
    // => b^2 * (c + dx) = d^2 * (a - bx)
    // => b^2 * c + b^2 * dx = d^2 * a - d^2 * bx
    // => x = (d^2 * a - b^2 * c) / (b^2 * d + d^2 * b)

    let x_critical = (d * d * a - b * b * c) / (b * b * d + d * d * b);
    if (x_critical >= alpha && x_critical <= beta) {
        critical_points.push(x_critical);
    }

    // Tính giá trị của hàm số tại các điểm biên và các điểm cực trị
    let f_alpha = f(a, b, c, d, alpha);
    let f_beta = f(a, b, c, d, beta);
    let values = [f_alpha, f_beta];

    critical_points.forEach(point => {
        let value = f(a, b, c, d, point);
        if (!isNaN(value)) {
            values.push(value);
        }
    });

    // Tìm giá trị lớn nhất và nhỏ nhất trên tập xác định
    let M = Math.max(...values);
    let m = Math.min(...values);

    // Tính tổng M + e * m + e
    let sum = (M**2 - e * m**2).toFixed(1);
    if (sum % 1 === 0) {
        sum = Math.round(sum);
    }

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Gọi $M$, $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x)= \\sqrt{${a}-${b}x}+\\sqrt{${c}+${d}x}$ trên tập xác định của nó. Tính $M^2-${e}m^2$, làm tròn một chữ số thập phân.
    \\shortans{$${sum}$}
    \\loigiai{
       
    }
\\end{ex}`;
return question;
}
function min_max_x_sqrt(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định và đảm bảo a là số dương
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a, alpha, beta;

    // Tạo hệ số ngẫu nhiên a và đảm bảo nó là số dương
    a = getRandomInt(1, 10 + e);

    // Xác định tập xác định của hàm số: a - x^2 >= 0
    // => -sqrt(a) <= x <= sqrt(a)
    alpha = -Math.sqrt(a);
    beta = Math.sqrt(a);

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, x) {
        return x * Math.sqrt(a - x ** 2);
    }

    // Tìm đạo hàm của hàm số y = x sqrt(a - x^2)
    // y' = sqrt(a - x^2) + x * (-x / sqrt(a - x^2))
    // y' = sqrt(a - x^2) - x^2 / sqrt(a - x^2)
    // y' = (a - x^2 - x^2) / sqrt(a - x^2)
    // y' = (a - 2x^2) / sqrt(a - x^2)
    let critical_points = [];

    // Tìm nghiệm của phương trình y' = 0
    // (a - 2x^2) / sqrt(a - x^2) = 0
    // => a - 2x^2 = 0
    // => x^2 = a / 2
    // => x = sqrt(a / 2) hoặc x = -sqrt(a / 2)

    let x_critical1 = Math.sqrt(a / 2);
    let x_critical2 = -Math.sqrt(a / 2);

    if (x_critical1 >= alpha && x_critical1 <= beta) {
        critical_points.push(x_critical1);
    }
    if (x_critical2 >= alpha && x_critical2 <= beta) {
        critical_points.push(x_critical2);
    }

    // Tính giá trị của hàm số tại các điểm biên và các điểm cực trị
    let f_alpha = f(a, alpha);
    let f_beta = f(a, beta);
    let values = [];

    if (!isNaN(f_alpha) && isFinite(f_alpha)) {
        values.push(f_alpha);
    }

    if (!isNaN(f_beta) && isFinite(f_beta)) {
        values.push(f_beta);
    }

    critical_points.forEach(point => {
        let value = f(a, point);
        if (!isNaN(value) && isFinite(value)) {
            values.push(value);
        }
    });

    // Tìm giá trị lớn nhất và nhỏ nhất trên tập xác định
    let M = Math.max(...values);
    let m = Math.min(...values);

    // Tính tổng M^2 + e * m^2
    let sum = (M ** 2 + e * m ** 2).toFixed(1);
    if (sum % 1 === 0) {
        sum = Math.round(sum);
    }

    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Gọi $M$, $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $f(x)= x \\sqrt{${a}-x^2}$ trên tập xác định của nó. Tính $M^2+${e}m^2$, làm tròn một chữ số thập phân.
    \\shortans{$${sum}$}
    \\loigiai{
        
    }
\\end{ex}`;
    question=lamdeppm(question)
    return question;
}
function min_max_tim_m_bangK(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định và đảm bảo alpha < beta
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = getRandomInt(-5, 5);
    while (a === 0) {
        a = getRandomInt(-10, 10);
    }
    
    let b = getRandomInt(-10, 10);
    while (b === 0) {
        b = getRandomInt(-10, 10);
    }
    let c = getRandomInt(-10, 10 + e);
    let alpha = getRandomInt(-6, 0);
    let beta = getRandomInt(1, 5);
    let d = getRandomInt(10, 100);

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, m, x) {
        return a * x ** 3 + b * x + m + c;
    }

    // Tìm đạo hàm của hàm số y = ax^3 + bx + m + c
    // y' = 3ax^2 + b
    function derivative(a, b, x) {
        return 3 * a * x ** 2 + b;
    }

    // Tìm các điểm tới hạn
    let critical_points = [];

    // Tìm nghiệm của phương trình y' = 0
    // 3ax^2 + b = 0
    // => x^2 = -b / (3a)
    // => x = sqrt(-b / (3a)) hoặc x = -sqrt(-b / (3a))
    if (a !== 0) {
        let discriminant = -b / (3 * a);
        if (discriminant >= 0) {
            let x_critical1 = Math.sqrt(discriminant);
            let x_critical2 = -Math.sqrt(discriminant);

            if (x_critical1 >= alpha && x_critical1 <= beta) {
                critical_points.push(x_critical1);
            }
            if (x_critical2 >= alpha && x_critical2 <= beta) {
                critical_points.push(x_critical2);
            }
        }
    }

    // Tính giá trị của hàm số tại các điểm biên và các điểm cực trị
    let f_alpha = f(a, b, c, 0, alpha);  // Tạm thời cho m = 0 để tính
    let f_beta = f(a, b, c, 0, beta);    // Tạm thời cho m = 0 để tính

    let values = [{ x: alpha, value: f_alpha }, { x: beta, value: f_beta }];

    critical_points.forEach(point => {
        let value = f(a, b, c, 0, point);  // Tạm thời cho m = 0 để tính
        values.push({ x: point, value: value });
    });

    // Tìm điểm x mà tại đó hàm số đạt giá trị lớn nhất
    let max_value = Math.max(...values.map(item => item.value));
    let max_point = values.find(item => item.value === max_value).x;

    // Tính giá trị của m để hàm số đạt giá trị lớn nhất d tại điểm max_point
    let m = (d - (a * max_point ** 3 + b * max_point + c)).toFixed(1);
    if (m%1===0){m=Math.round(m)}
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Cho hàm số $f(x) = ${a}x^3+${b}x+m+${c}$ trên đoạn $[${alpha}; ${beta}]$. Biết rằng giá trị lớn nhất của hàm số trên đoạn này bằng $${d}$. Tính $m$, làm tròn một chữ số thập phân.
    \\shortans{$${m}$}
    \\loigiai{

    }
\\end{ex}`;
    question = lamdeppm(question)
    return question;
}

function min_max_ax_sqrt(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định và đảm bảo các số dương
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = getRandomInt(1, 10);
    let b = getRandomInt(1, 10);
    let c = getRandomInt(1, 10);
    let alpha = getRandomInt(-10, 0);
    let beta = b / c;
    let d = getRandomInt(-10, 10+e);
    let beta_latex;
    if (c === 1) {
        beta_latex = `${b}`;
    } else {
        let divisor = gcd(b, c);
        if (divisor === 1) {
            beta_latex = `\\dfrac{${b}}{${c}}`;
        } else {
            beta_latex = `\\dfrac{${b / divisor}}{${c / divisor}}`;
        }
    }
    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, m, x) {
        return a * x + Math.sqrt(b - c * x) + m;
    }

    // Tìm đạo hàm của hàm số y = ax + sqrt(b - cx)
    // y' = a - (c / (2 * sqrt(b - cx)))
    function derivative(a, b, c, x) {
        return a - (c / (2 * Math.sqrt(b - c * x)));
    }

    // Tìm các điểm tới hạn
    let critical_points = [];

    // Tìm nghiệm của phương trình y' = 0
    // a - (c / (2 * sqrt(b - cx))) = 0
    // => 2a * sqrt(b - cx) = c
    // => 4a^2 * (b - cx) = c^2
    // => 4a^2b - 4a^2cx = c^2
    // => x = (4a^2b - c^2) / (4a^2c)
    let numerator = 4 * a ** 2 * b - c ** 2;
    let denominator = 4 * a ** 2 * c;
    let x_critical = numerator / denominator;

    if (x_critical >= alpha && x_critical <= beta) {
        critical_points.push(x_critical);
    }

    // Tính giá trị của hàm số tại các điểm biên và các điểm cực trị
    let f_alpha = f(a, b, c, 0, alpha);  // Tạm thời cho m = 0 để tính
    let f_beta = f(a, b, c, 0, beta);    // Tạm thời cho m = 0 để tính

    let values = [{ x: alpha, value: f_alpha }, { x: beta, value: f_beta }];

    critical_points.forEach(point => {
        let value = f(a, b, c, 0, point);  // Tạm thời cho m = 0 để tính
        values.push({ x: point, value: value });
    });

    // Tìm điểm x mà tại đó hàm số đạt giá trị lớn nhất
    let max_value = Math.max(...values.map(item => item.value));
    let max_point = values.find(item => item.value === max_value).x;

    // Tính giá trị của m để hàm số đạt giá trị lớn nhất d tại điểm max_point
    let m = (d - (a * max_point + Math.sqrt(b - c * max_point))).toFixed(1);
  if (m%1===0){m=Math.round(m)}
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Cho hàm số $f(x) = ${a}x + \\sqrt{${b} - ${c}x} + m$ trên đoạn $[${alpha}; ${beta_latex}]$. Biết rằng giá trị lớn nhất của hàm số trên đoạn này bằng $${d}$. Tính $m$, làm tròn một chữ số thập phân.
    \\shortans{$${m}$}
    \\loigiai{

    }
\\end{ex}`;
    question = lamdeppm(question)
    return question;
}
function min_max_phan_thuc_bacnhat(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định và đảm bảo các số dương
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = getRandomInt(1, 10);
    let b = getRandomInt(1, 10);
    let c = getRandomInt(1, 3);
    let d = getRandomInt(1, 3);
    let alpha = getRandomInt(0, 2);
    let beta = getRandomInt(3, 4);
    let max_value = getRandomInt(1, 10 + e);
     
    // Đảm bảo rằng đoạn [alpha, beta] không chứa -d/c
    while (alpha <= -d / c && -d / c <= beta) {
        alpha = getRandomInt(1, 5);
        beta = getRandomInt(6, 10);
    }

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, b, c, d, m, x) {
        return (a * x + b + m) / (c * x + d);
    }

    // Tìm đạo hàm của hàm số y = (ax + b + m) / (cx + d)
    // y' = (ad - c(b + m)) / (cx + d)^2
    function derivative(a, b, c, d, m) {
        return (a * d - c * (b + m));
    }

    // Tính giá trị đạo hàm tại một điểm để xác định xu hướng tăng giảm
    let derivative_value = derivative(a, b, c, d, 0);

    // Tìm các giá trị m thoả mãn điều kiện
    let m_values = [];

    // Nếu đạo hàm dương, giá trị lớn nhất nằm tại beta
    if (derivative_value > 0) {
        let m = max_value * (c * beta + d) - (a * beta + b);
        m_values.push(m);
    }
    // Nếu đạo hàm âm, giá trị lớn nhất nằm tại alpha
    else if (derivative_value < 0) {
        let m = max_value * (c * alpha + d) - (a * alpha + b);
        m_values.push(m);
    }
    // Nếu đạo hàm bằng 0, xét cả hai điểm biên
    else {
        let m1 = max_value * (c * alpha + d) - (a * alpha + b);
        let m2 = max_value * (c * beta + d) - (a * beta + b);
        m_values.push(m1);
        m_values.push(m2);
    }

    // Tính tổng các phần tử của S
    let sum_m = (m_values.reduce((acc, val) => acc + val, 0)).toFixed(1);
    if (sum_m%1===0){sum_m=Math.round(sum_m)}
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Cho hàm số $f(x)=\\dfrac{${a}x+${b}+m}{${c}x+${d}}$ trên đoạn $[${alpha}; ${beta}]$. Biết rằng giá trị lớn nhất của hàm số trên đoạn này bằng $${max_value}$. Tính tổng các giá trị của $m$ thoả mãn, làm tròn một chữ số thập phân (nếu có).
    \\shortans{$${sum_m}$}
    \\loigiai{
        
    }
\\end{ex}`;
    question=lamdeppm(question)
    return question;
}

function min_max_phan_thuc_bacnhat_duong(e) {
    // Hàm số ngẫu nhiên với các hệ số trong khoảng nhất định và đảm bảo các số dương
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let a = getRandomInt(2, 10);
    let c = getRandomInt(1, 3);
    let d = getRandomInt(1, 3);
    let alpha = getRandomInt(1, 5);
    let beta = getRandomInt(6, 10);
    let max_value = getRandomInt(-1, -10 + e);

    // Đảm bảo rằng đoạn [alpha, beta] không chứa -d/c
    while (alpha <= -d / c && -d / c <= beta) {
        alpha = getRandomInt(1, 5);
        beta = getRandomInt(6, 10);
    }

    // Tìm giá trị của hàm số tại một điểm x
    function f(a, c, d, m, x) {
        return (a * x - m ** 2 - d) / (c * x + d);
    }

    // Tìm các giá trị m thoả mãn điều kiện giá trị lớn nhất tại beta
    let m_squared = -(max_value * (c * beta + d) - a * beta + d);

    // Kiểm tra tính hợp lý của m_squared 
    let sum_m_squared;
    if (m_squared >= 0) {
        sum_m_squared = 2 * m_squared;
        if (sum_m_squared%1===0){sum_m_squared=Math.round(sum_m_squared)}
    } else {
        sum_m_squared = 'vô nghiệm';
    }
                   
    // Tạo chuỗi LaTeX cho phần câu hỏi
    let question = `\\begin{ex}
    Cho hàm số $f(x) = \\dfrac{${a}x-m^2-${d}}{${c}x+${d}}$ trên đoạn $[${alpha}; ${beta}]$. Biết rằng giá trị lớn nhất của hàm số trên đoạn này bằng $${max_value}$. Tính tổng bình phương các giá trị của $m$ thoả mãn, làm tròn đến phần nguyên.
    \\shortans{$${sum_m_squared}$}
    \\loigiai{
        
    }
\\end{ex}`;
    question=lamdeppm(question)
    return question;
}

function solveMaxExport(a, b, coefficients) {
    // Định nghĩa hàm S(t) từ các hệ số
    function S(t) {
        return coefficients.reduce((acc, coef, index) => acc + coef * Math.pow(t, coefficients.length - 1 - index), 0);
    }

    // Định nghĩa đạo hàm của S(t) từ các hệ số
    function S_prime(t) {
        return coefficients.slice(0, -1).reduce((acc, coef, index) => acc + coef * (coefficients.length - 1 - index) * Math.pow(t, coefficients.length - 2 - index), 0);
    }

    // Giải phương trình bậc hai để tìm các điểm tới hạn
    function solveQuadratic(a, b, c) {
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return [];
        } else if (discriminant === 0) {
            return [-b / (2 * a)];
        } else {
            return [
                (-b + Math.sqrt(discriminant)) / (2 * a),
                (-b - Math.sqrt(discriminant)) / (2 * a)
            ];
        }
    }

    // Hệ số của phương trình bậc hai từ đạo hàm của S(t)
    const a1 = coefficients[0] * 3;
    const b1 = coefficients[1] * 2;
    const c1 = coefficients[2];

    const criticalPoints = solveQuadratic(a1, b1, c1).filter(x => x >= a && x <= b);

    // Thêm các điểm biên của đoạn [a, b]
    criticalPoints.push(a);
    criticalPoints.push(b);

    // Tính giá trị của S tại các điểm
    let maxPoint = criticalPoints[0];
    let maxValue = S(maxPoint);

    for (let i = 1; i < criticalPoints.length; i++) {
        const value = S(criticalPoints[i]);
        if (value > maxValue) {
            maxValue = value;
            maxPoint = criticalPoints[i];
        }
    }

    return {
        maxPoint: maxPoint,
        maxValue: maxValue
    };
}

function thuc_te_xk_gao(e) {
    // Tạo các hệ số gần giống với bộ hệ số đã cho
    const coefficients = [
        (2 / 6 + (Math.random() * 0.2 - 0.1)).toFixed(1),  // hệ số bậc 3 gần 2/5
        (-63 + (Math.random() * 10 - 5)).toFixed(0),  // hệ số bậc 2 gần -63
        (3240 + (Math.random() * 200 - 100)).toFixed(0),  // hệ số bậc 1 gần 3240
        (-3100 + e + (Math.random() * 200 - 100)).toFixed(0)  // hằng số tự do gần -3100
    ];

    const a = 1;
    const b = 60;

    let result = solveMaxExport(a, b, coefficients.map(Number));

    // Đảm bảo nghiệm của đạo hàm nằm trong khoảng [a, b]
    while (result.maxPoint < a || result.maxPoint > b) {
        result = solveMaxExport(a, b, coefficients.map(Number));
    }
    const kq = Math.ceil(result.maxPoint);

    // Định nghĩa hàm S(t) từ các hệ số (sao chép từ solveMaxExport)
    function S(t) {
        return coefficients.reduce((acc, coef, index) => acc + coef * Math.pow(t, coefficients.length - 1 - index), 0);
    }

    // Tạo đề bài và lời giải trong một chuỗi LaTeX duy nhất
    let question = `
\\begin{ex}
    Đợt xuất khẩu gạo của tỉnh A thường kéo dài $2$ tháng ($60$ ngày). Người ta nhận thấy số lượng gạo xuất khẩu tính theo ngày thứ $t$ được xác định bởi công thức 
    $$S(t) = ${coefficients[0]}t^3 ${coefficients[1] >= 0 ? '+' : ''} ${coefficients[1]}t^2 ${coefficients[2] >= 0 ? '+' : ''} ${coefficients[2]}t ${coefficients[3] >= 0 ? '+' : ''} ${coefficients[3]} \\text{ (tấn), với } 1 \\leq t \\leq 60.$$ 
    Hỏi trong $60$ ngày đó thì ngày thứ mấy có số lượng gạo xuất khẩu cao nhất?
\\shortans{$${kq}$}
\\loigiai{
    Xét hàm số $S(t) = ${coefficients[0]}t^3 ${coefficients[1] >= 0 ? '+' : ''} ${coefficients[1]}t^2 ${coefficients[2] >= 0 ? '+' : ''} ${coefficients[2]}t ${coefficients[3] >= 0 ? '+' : ''} ${coefficients[3]}$ liên tục trên đoạn $[1;60]$.\\\\
    Ta có $S'(t)=${(coefficients[0] * 3).toFixed(2)}t^2 ${coefficients[1] * 2 >= 0 ? '+' : ''} ${(coefficients[1] * 2).toFixed(2)}t ${coefficients[2] >= 0 ? '+' : ''} ${coefficients[2]}$. Khi đó
    $$S'(t)=0 \\Leftrightarrow ${(coefficients[0] * 3).toFixed(2)}t^2 ${coefficients[1] * 2 >= 0 ? '+' : ''} ${(coefficients[1] * 2).toFixed(2)}t ${coefficients[2] >= 0 ? '+' : ''} ${coefficients[2]}=0$$
    Giải phương trình này ta được các điểm tới hạn là $t=${result.maxPoint.toFixed(2)}$.\\\\
    Lại có $S(1)=${S(1).toFixed(2)}$, $S(${result.maxPoint.toFixed(2)})=${result.maxValue.toFixed(2)}$, $S(60)=${S(60).toFixed(2)}$.\\\\
    Vậy ngày thứ ${result.maxPoint.toFixed(2)} tỉnh A có số lượng gạo xuất khẩu cao nhất với giá trị ${result.maxValue.toFixed(2)} đơn vị.
}
\\end{ex}`;
    question = lamdeppm(question);
    return question;
}
function solveMaxEconomic(a, b, coefficients) {
    function S(t) {
        return coefficients.reduce((acc, coef, index) => acc + coef * Math.pow(t, coefficients.length - 1 - index), 0);
    }

    function S_prime(t) {
        return coefficients.slice(0, -1).reduce((acc, coef, index) => acc + coef * (coefficients.length - 1 - index) * Math.pow(t, coefficients.length - 2 - index), 0);
    }

    function solveQuadratic(a, b, c) {
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return [];
        } else if (discriminant === 0) {
            return [-b / (2 * a)];
        } else {
            return [
                (-b + Math.sqrt(discriminant)) / (2 * a),
                (-b - Math.sqrt(discriminant)) / (2 * a)
            ];
        }
    }

    const a1 = coefficients[0] * 3;
    const b1 = coefficients[1] * 2;
    const c1 = coefficients[2];

    const criticalPoints = solveQuadratic(a1, b1, c1).filter(x => x >= a && x <= b);

    criticalPoints.push(a);
    criticalPoints.push(b);

    let maxPoint = criticalPoints[0];
    let maxValue = S(maxPoint);

    for (let i = 1; i < criticalPoints.length; i++) {
        const value = S(criticalPoints[i]);
        if (value > maxValue) {
            maxValue = value;
            maxPoint = criticalPoints[i];
        }
    }

    return {
        maxPoint: maxPoint,
        maxValue: maxValue
    };
}
function thuc_te_chiphi_van_chuyen(e) {
    
   function RandomDecimal(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}
function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let m = RandomDecimal(0.1, 0.2);
let n = RandomInt(-7, -4);   
let p = RandomInt(40, 60);                     
let q = RandomInt(-250, 400+e);
                                    
    const coefficients = [m, n, p, q];                                                    
    const a = 1;
    const b = 12;

    let result = solveMaxEconomic(a, b, coefficients);

    while (result.maxPoint < a || result.maxPoint > b) {
        result = solveMaxEconomic(a, b, coefficients);
    }
    const kq = Math.ceil(result.maxPoint);

    function S(t) {
        return coefficients.reduce((acc, coef, index) => acc + coef * Math.pow(t, coefficients.length - 1 - index), 0);
    }
       
    let question = `
\\begin{ex}
    Một công ty muốn tối ưu hóa chi phí vận chuyển hàng tháng. Chi phí vận chuyển hàng tháng $T(t)$ (triệu đồng) được xác định bởi công thức 
    $$T(t) = ${m}t^3${n}t^2+${p}t+${q}$$
    với $1 \\leq t \\leq 12$. Hỏi trong $12$ tháng đó thì tháng nào công ty có chi phí vận chuyển cao nhất?
\\shortans{$${kq}$}
\\loigiai{                                
   
}
\\end{ex}`;
question=question.replace('+-','-')
    return question;
}
function thuc_te_thue_can_ho(e) {
    // Tạo các thông số ngẫu nhiên cho bài toán
    const initialUnits = 50+e + Math.floor(Math.random() * 15 - 5); // Số căn hộ ban đầu (45 đến 55)
    const initialRent = Math.round((2000000 + Math.floor(Math.random() * 500000 - 250000)) / 10000) * 10000; // Giá thuê ban đầu (1,750,000 đến 2,250,000 đồng, làm tròn đến phần chục nghìn)
    const rentIncrease = Math.round((100000 + Math.floor(Math.random() * 20000 - 10000)) / 10000) * 10000;  
    const unitsVacantPerIncrease = 2 + Math.floor(Math.random() * 3 - 1); // Số căn hộ bị bỏ trống mỗi lần tăng giá (1 đến 3)

    // Tạo hệ số cho bài toán
    const a = -unitsVacantPerIncrease; // Hệ số của x^2
    const b = initialUnits - unitsVacantPerIncrease; // Hệ số của x
    const c = initialRent * initialUnits / 100000; // Hằng số (đơn vị trăm ngàn đồng)

    // Đạo hàm của hàm số thu nhập
    const vertexX = -b / (2 * a); // x tại đỉnh của parabol
    const maxIncome = a * vertexX * vertexX + b * vertexX + c; // Thu nhập tối đa
    const optimalRent = (initialRent + vertexX * rentIncrease).toFixed(0); // Giá thuê tối ưu

    // Tạo đề bài và lời giải trong một chuỗi LaTeX duy nhất
    let question = `
\\begin{ex}
    Một công ty bất động sản có $${initialUnits}$ căn hộ cho thuê. Biết rằng nếu cho thuê mỗi căn hộ với giá $${initialRent.toLocaleString()}$ đồng thì mỗi tháng mọi căn hộ đều có người thuê và cứ tăng thêm giá cho thuê mỗi căn hộ $${rentIncrease.toLocaleString()} $ đồng một tháng thì sẽ có $ ${unitsVacantPerIncrease} $ căn hộ bị bỏ trống. Hỏi muốn thu nhập cao nhất thì công ty đó cho thuê mỗi căn hộ với giá bao nhiêu một tháng?
\\shortans{$${optimalRent}$}
\\loigiai{
    Giả sử giá thuê mỗi căn hộ là ${initialRent / 1000000} triệu + $x$ trăm ngàn đồng (đơn vị đồng) ($x$ dương). Khi đó, số căn hộ bị bỏ trống là $${unitsVacantPerIncrease}x$. Do đó, tổng số tiền (đơn vị trăm ngàn đồng) cho thuê nhà là
    $$S = (${initialUnits} - ${unitsVacantPerIncrease}x)(${initialRent / 1000000} + x) = ${a}x^2 + ${b}x + ${c.toFixed(2)} = ${a}(x + ${(-b / (2 * a)).toFixed(2)})^2 + ${(maxIncome).toFixed(2)}.$$
    Dấu bằng xảy ra khi $x = ${vertexX.toFixed(2)}$ trăm ngàn đồng.\\\\
    Vậy để thu nhập cao nhất thì giá thuê mỗi căn hộ là ${optimalRent.toLocaleString()} đồng.
}
\\end{ex}`;
    return question;
}



///XÁC SUẤT CÓ ĐK
function xs_duong_tinh(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(diseaseRate, sensitivity, specificity) {
        const P_B = diseaseRate;
        const P_B_prime = 1 - P_B;
        const P_T_given_B = sensitivity;
        const P_T_given_B_prime = 1 - specificity;

        const P_T = (P_T_given_B * P_B) + (P_T_given_B_prime * P_B_prime);
        const P_B_given_T = (P_T_given_B * P_B) / P_T;

        return P_B_given_T.toFixed(4);
    }
  
    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const diseaseRate = parseFloat(generateRandomPercentage(0.01, 0.001));
    const sensitivity = parseFloat(generateRandomPercentage(0.99, 0.01));
    const specificity = parseFloat(generateRandomPercentage(0.95, 0.01));

    // Tính xác suất một người mắc bệnh nếu họ có kết quả xét nghiệm dương tính
    const P_B_given_T = calculateProbability(diseaseRate, sensitivity, specificity);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một bệnh có tỉ lệ $${(diseaseRate * 100).toFixed(2)}\\%$ trong dân số. Xét nghiệm bệnh có độ nhạy (tỉ lệ dương tính thật) là $${(sensitivity * 100).toFixed(2)}\\%$ và độ đặc hiệu (tỉ lệ âm tính thật) là $${(specificity * 100).toFixed(2)}\\%$. Tính xác suất một người mắc bệnh nếu họ có kết quả xét nghiệm dương tính là bao nhiêu $\\%$, làm tròn một chữ số thập phân. 
\\shortans{$${(P_B_given_T * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $B$ là sự kiện người đó mắc bệnh.
    \\item $T$ là sự kiện xét nghiệm dương tính.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỉ lệ mắc bệnh trong dân số: $P(B) = ${diseaseRate}$.
    \\item Độ nhạy của xét nghiệm (tỉ lệ dương tính thật): $P(T|B) = ${sensitivity}$.
    \\item Độ đặc hiệu của xét nghiệm (tỉ lệ âm tính thật): $P(T'|B') = ${specificity}$.
\\end{itemize}\\\\
\\textbf{Bước 1: Tính xác suất xét nghiệm dương tính $P(T)$}\\\\
Xét nghiệm dương tính có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Người mắc bệnh và xét nghiệm dương tính.
    \\item Người không mắc bệnh nhưng xét nghiệm dương tính giả.
\\end{enumerate}
Ta tính xác suất xét nghiệm dương tính bằng cách dùng định lý xác suất toàn phần:
\\[
P(T) = P(T|B)P(B) + P(T|B')P(B')
\\]
Ở đây:
\\begin{itemize}
    \\item $P(B') = 1 - P(B) = ${(1 - diseaseRate).toFixed(4)}$
    \\item $P(T|B) = ${sensitivity}$
    \\item $P(T|B') = 1 - P(T'|B') = 1 - ${specificity} = ${(1 - specificity).toFixed(4)}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(T) = ${sensitivity} \\times ${diseaseRate} + ${(1 - specificity).toFixed(4)} \\times ${(1 - diseaseRate).toFixed(4)}
\\]
\\[
P(T) = ${(sensitivity * diseaseRate).toFixed(4)} + ${((1 - specificity) * (1 - diseaseRate)).toFixed(4)}
\\]
\\[
P(T) = ${((sensitivity * diseaseRate) + ((1 - specificity) * (1 - diseaseRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(B|T) = \\dfrac{P(T|B) \\cdot P(B)}{P(T)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(B|T) = \\frac{${sensitivity} \\times ${diseaseRate}}{${((sensitivity * diseaseRate) + ((1 - specificity) * (1 - diseaseRate))).toFixed(4)}}
\\]
\\[
P(B|T) = \\frac{${(sensitivity * diseaseRate).toFixed(4)}}{${((sensitivity * diseaseRate) + ((1 - specificity) * (1 - diseaseRate))).toFixed(4)}}
\\]
\\[
P(B|T) \\approx ${P_B_given_T}
\\]
\\textbf{Kết luận}\\\\
Xác suất một người mắc bệnh nếu họ có kết quả xét nghiệm dương tính là khoảng $${(P_B_given_T * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỉ lệ mắc bệnh trong dân số là rất thấp $${(diseaseRate * 100).toFixed(2)}\\%$, vì vậy ngay cả khi xét nghiệm dương tính, khả năng người đó thực sự mắc bệnh chỉ khoảng $${(P_B_given_T * 100).toFixed(2)}\\%$. Độ nhạy và độ đặc hiệu của xét nghiệm cao, nhưng do tỉ lệ mắc bệnh trong dân số thấp, nên kết quả dương tính giả cũng ảnh hưởng đáng kể đến xác suất cuối cùng.
}
\\end{ex}
    `;

    return question;
}

function xs_sanpham_AB_hong(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(machineARate, machineBRate, defectiveRateA, defectiveRateB) {
        const P_A = machineARate;
        const P_B = machineBRate;
        const P_D_given_A = defectiveRateA;
        const P_D_given_B = defectiveRateB;

        const P_D = (P_D_given_A * P_A) + (P_D_given_B * P_B);
        const P_A_given_D = (P_D_given_A * P_A) / P_D;

        return P_A_given_D.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const machineARate = parseFloat(generateRandomPercentage(0.60, 0.05));
    const machineBRate = 1 - machineARate;
    const defectiveRateA = parseFloat(generateRandomPercentage(0.01, 0.005));
    const defectiveRateB = parseFloat(generateRandomPercentage(0.02, 0.005));

    // Tính xác suất sản phẩm hỏng được sản xuất bởi máy A
    const P_A_given_D = calculateProbability(machineARate, machineBRate, defectiveRateA, defectiveRateB);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một nhà máy có hai máy sản xuất, máy A và máy B. Máy A sản xuất $${(machineARate * 100).toFixed(2)}\\%$ sản phẩm, máy B sản xuất $${(machineBRate * 100).toFixed(2)}\\%$. Máy A có $${(defectiveRateA * 100).toFixed(2)}\\%$ sản phẩm hỏng, máy B có $${(defectiveRateB * 100).toFixed(2)}\\%$ sản phẩm hỏng. Nếu một sản phẩm được chọn ngẫu nhiên là hỏng, tính xác suất sản phẩm đó được sản xuất bởi máy A là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_A_given_D * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $A$ là sự kiện sản phẩm được sản xuất bởi máy A.
    \\item $B$ là sự kiện sản phẩm được sản xuất bởi máy B.
    \\item $D$ là sự kiện sản phẩm bị hỏng.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỉ lệ sản phẩm do máy A sản xuất: $P(A) = ${machineARate}$.
    \\item Tỉ lệ sản phẩm do máy B sản xuất: $P(B) = ${machineBRate}$.
    \\item Tỉ lệ sản phẩm hỏng do máy A sản xuất: $P(D|A) = ${defectiveRateA}$.
    \\item Tỉ lệ sản phẩm hỏng do máy B sản xuất: $P(D|B) = ${defectiveRateB}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất sản phẩm bị hỏng $P(D)$}\\\\
Sản phẩm bị hỏng có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Sản phẩm do máy A sản xuất và bị hỏng.
    \\item Sản phẩm do máy B sản xuất và bị hỏng.
\\end{enumerate}
Ta tính xác suất sản phẩm bị hỏng bằng cách dùng định lý xác suất toàn phần:
\\[
P(D) = P(D|A)P(A) + P(D|B)P(B)
\\]
Ở đây
\\begin{itemize}
    \\item $P(A) = ${machineARate}$
    \\item $P(B) = ${machineBRate}$
    \\item $P(D|A) = ${defectiveRateA}$
    \\item $P(D|B) = ${defectiveRateB}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(D) = ${defectiveRateA} \\times ${machineARate} + ${defectiveRateB} \\times ${machineBRate}
\\]
\\[
P(D) = ${(defectiveRateA * machineARate).toFixed(4)} + ${(defectiveRateB * machineBRate).toFixed(4)}
\\]
\\[
P(D) = ${((defectiveRateA * machineARate) + (defectiveRateB * machineBRate)).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(A|D) = \\dfrac{P(D|A) \\cdot P(A)}{P(D)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(A|D) = \\frac{${defectiveRateA} \\times ${machineARate}}{${((defectiveRateA * machineARate) + (defectiveRateB * machineBRate)).toFixed(4)}}
\\]
\\[
P(A|D) = \\frac{${(defectiveRateA * machineARate).toFixed(4)}}{${((defectiveRateA * machineARate) + (defectiveRateB * machineBRate)).toFixed(4)}}
\\]
\\[
P(A|D) \\approx ${P_A_given_D}
\\]
\\textbf{Kết luận}\\\\
Xác suất sản phẩm bị hỏng được sản xuất bởi máy A là khoảng $${(P_A_given_D * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỉ lệ sản phẩm do máy A và máy B sản xuất là khác nhau, nhưng cả hai đều có tỉ lệ sản phẩm hỏng nhất định. Do đó, khi một sản phẩm được chọn ngẫu nhiên là hỏng, khả năng sản phẩm đó được sản xuất bởi máy A là khoảng $${(P_A_given_D * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_hocsinh_traloi_dung(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(studyRate, correctGivenStudy, correctGivenNoStudy) {
        const P_S = studyRate;
        const P_NS = 1 - P_S;
        const P_C_given_S = correctGivenStudy;
        const P_C_given_NS = correctGivenNoStudy;

        const P_C = (P_C_given_S * P_S) + (P_C_given_NS * P_NS);
        const P_S_given_C = (P_C_given_S * P_S) / P_C;

        return P_S_given_C.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const studyRate = parseFloat(generateRandomPercentage(0.60, 0.05));
    const correctGivenStudy = parseFloat(generateRandomPercentage(0.70, 0.05));
    const correctGivenNoStudy = parseFloat(generateRandomPercentage(0.20, 0.05));

    // Tính xác suất học sinh học bài nếu họ trả lời đúng một câu hỏi
    const P_S_given_C = calculateProbability(studyRate, correctGivenStudy, correctGivenNoStudy);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Trong một kỳ thi trắc nghiệm, xác suất để một học sinh trả lời đúng một câu hỏi là $${(correctGivenStudy * 100).toFixed(2)}\\%$ nếu học sinh đó học bài và $${(correctGivenNoStudy * 100).toFixed(2)}\\%$ nếu học sinh đó không học bài. Xác suất học sinh học bài là $${(studyRate * 100).toFixed(2)}\\%$. Nếu một học sinh trả lời đúng một câu hỏi, tính xác suất học sinh đó đã học bài là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_S_given_C * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $S$ là sự kiện học sinh học bài.
    \\item $NS$ là sự kiện học sinh không học bài.
    \\item $C$ là sự kiện học sinh trả lời đúng một câu hỏi.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất học sinh học bài: $P(S) = ${studyRate}$.
    \\item Xác suất học sinh không học bài: $P(NS) = ${(1 - studyRate).toFixed(4)}$.
    \\item Xác suất trả lời đúng nếu học sinh học bài: $P(C|S) = ${correctGivenStudy}$.
    \\item Xác suất trả lời đúng nếu học sinh không học bài: $P(C|NS) = ${correctGivenNoStudy}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất học sinh trả lời đúng $P(C)$}\\\\
Học sinh trả lời đúng có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Học sinh học bài và trả lời đúng.
    \\item Học sinh không học bài nhưng trả lời đúng.
\\end{enumerate}
Ta tính xác suất học sinh trả lời đúng bằng cách dùng định lý xác suất toàn phần:
\\[
P(C) = P(C|S)P(S) + P(C|NS)P(NS)
\\]
Ở đây
\\begin{itemize}
    \\item $P(S) = ${studyRate}$
    \\item $P(NS) = ${(1 - studyRate).toFixed(4)}$
    \\item $P(C|S) = ${correctGivenStudy}$
    \\item $P(C|NS) = ${correctGivenNoStudy}$
\\end{itemize}
Thay các giá trị vào, ta có
\\[
P(C) = ${correctGivenStudy} \\times ${studyRate} + ${correctGivenNoStudy} \\times ${(1 - studyRate).toFixed(4)}
\\]
\\[
P(C) = ${(correctGivenStudy * studyRate).toFixed(4)} + ${(correctGivenNoStudy * (1 - studyRate)).toFixed(4)}
\\]
\\[
P(C) = ${((correctGivenStudy * studyRate) + (correctGivenNoStudy * (1 - studyRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(S|C) = \\dfrac{P(C|S) \\cdot P(S)}{P(C)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(S|C) = \\dfrac{${correctGivenStudy} \\times ${studyRate}}{${((correctGivenStudy * studyRate) + (correctGivenNoStudy * (1 - studyRate))).toFixed(4)}}
\\]
\\[
P(S|C) = \\dfrac{${(correctGivenStudy * studyRate).toFixed(4)}}{${((correctGivenStudy * studyRate) + (correctGivenNoStudy * (1 - studyRate))).toFixed(4)}}
\\]
\\[
P(S|C) \\approx ${P_S_given_C}
\\]
\\textbf{Kết luận}\\\\
Xác suất học sinh đã học bài nếu họ trả lời đúng một câu hỏi là khoảng $${(P_S_given_C * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỉ lệ học sinh học bài là $${(studyRate * 100).toFixed(2)}\\%$, nhưng khả năng trả lời đúng câu hỏi khi không học bài vẫn có một tỉ lệ nhất định là $${(correctGivenNoStudy * 100).toFixed(2)}\\%$. Do đó, khi một học sinh trả lời đúng một câu hỏi, khả năng học sinh đó đã học bài là khoảng $${(P_S_given_C * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_hoc_sinh_diem_cao(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(attendanceRate, highGradeGivenAttendance, highGradeGivenNoAttendance) {
        const P_A = attendanceRate;
        const P_N = 1 - P_A;
        const P_H_given_A = highGradeGivenAttendance;
        const P_H_given_N = highGradeGivenNoAttendance;

        const P_H = (P_H_given_A * P_A) + (P_H_given_N * P_N);
        const P_A_given_H = (P_H_given_A * P_A) / P_H;

        return P_A_given_H.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const attendanceRate = parseFloat(generateRandomPercentage(0.80, 0.05));
    const highGradeGivenAttendance = parseFloat(generateRandomPercentage(0.90, 0.05));
    const highGradeGivenNoAttendance = parseFloat(generateRandomPercentage(0.40, 0.05));

    // Tính xác suất học sinh thường xuyên đi học nếu họ đạt điểm cao
    const P_A_given_H = calculateProbability(attendanceRate, highGradeGivenAttendance, highGradeGivenNoAttendance);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một trường học có $${(attendanceRate * 100).toFixed(2)}\\%$ học sinh thường xuyên đi học. Nếu một học sinh thường xuyên đi học, xác suất đạt điểm cao là $${(highGradeGivenAttendance * 100).toFixed(2)}\\%$. Nếu học sinh không thường xuyên đi học, xác suất đạt điểm cao là $${(highGradeGivenNoAttendance * 100).toFixed(2)}\\%$. Tính xác suất một học sinh đạt điểm cao là học sinh thường xuyên đi học là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_A_given_H * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $A$ là sự kiện học sinh thường xuyên đi học.
    \\item $N$ là sự kiện học sinh không thường xuyên đi học.
    \\item $H$ là sự kiện học sinh đạt điểm cao.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất học sinh thường xuyên đi học: $P(A) = ${attendanceRate}$.
    \\item Xác suất học sinh không thường xuyên đi học: $P(N) = ${1 - attendanceRate}$.
    \\item Xác suất đạt điểm cao nếu học sinh thường xuyên đi học: $P(H|A) = ${highGradeGivenAttendance}$.
    \\item Xác suất đạt điểm cao nếu học sinh không thường xuyên đi học: $P(H|N) = ${highGradeGivenNoAttendance}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất học sinh đạt điểm cao $P(H)$}\\\\
Học sinh đạt điểm cao có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Học sinh thường xuyên đi học và đạt điểm cao.
    \\item Học sinh không thường xuyên đi học và đạt điểm cao.
\\end{enumerate}
Ta tính xác suất học sinh đạt điểm cao bằng cách dùng định lý xác suất toàn phần:
\\[
P(H) = P(H|A)P(A) + P(H|N)P(N)
\\]
Ở đây
\\begin{itemize}
    \\item $P(A) = ${attendanceRate}$
    \\item $P(N) = ${1 - attendanceRate}$
    \\item $P(H|A) = ${highGradeGivenAttendance}$
    \\item $P(H|N) = ${highGradeGivenNoAttendance}$
\\end{itemize}
Thay các giá trị vào, ta có
\\[
P(H) = ${highGradeGivenAttendance} \\times ${attendanceRate} + ${highGradeGivenNoAttendance} \\times ${1 - attendanceRate}
\\]
\\[
P(H) = ${(highGradeGivenAttendance * attendanceRate).toFixed(4)} + ${(highGradeGivenNoAttendance * (1 - attendanceRate)).toFixed(4)}
\\]
\\[
P(H) = ${((highGradeGivenAttendance * attendanceRate) + (highGradeGivenNoAttendance * (1 - attendanceRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes ta được
\\[
P(A|H) = \\dfrac{P(H|A) \\cdot P(A)}{P(H)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(A|H) = \\dfrac{${highGradeGivenAttendance} \\times ${attendanceRate}}{${((highGradeGivenAttendance * attendanceRate) + (highGradeGivenNoAttendance * (1 - attendanceRate))).toFixed(4)}}
\\]
\\[
P(A|H) = \\dfrac{${(highGradeGivenAttendance * attendanceRate).toFixed(4)}}{${((highGradeGivenAttendance * attendanceRate) + (highGradeGivenNoAttendance * (1 - attendanceRate))).toFixed(4)}}
\\]
\\[
P(A|H) \\approx ${P_A_given_H}
\\]
\\textbf{Kết luận}\\\\
Xác suất một học sinh đạt điểm cao là học sinh thường xuyên đi học là khoảng $${(P_A_given_H * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỉ lệ học sinh thường xuyên đi học là $${(attendanceRate * 100).toFixed(2)}\\%$, nhưng khả năng đạt điểm cao khi không thường xuyên đi học vẫn có một tỉ lệ nhất định là $${(highGradeGivenNoAttendance * 100).toFixed(2)}\\%$. Do đó, khi một học sinh đạt điểm cao, khả năng học sinh đó thường xuyên đi học là khoảng $${(P_A_given_H * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;
    return question;
}
function xs_click_quangcao(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(clickThroughRate, purchaseGivenClick, purchaseGivenNoClick) {
        const P_C = clickThroughRate;
        const P_NC = 1 - P_C;
        const P_P_given_C = purchaseGivenClick;
        const P_P_given_NC = purchaseGivenNoClick;

        const P_P = (P_P_given_C * P_C) + (P_P_given_NC * P_NC);
        const P_C_given_P = (P_P_given_C * P_C) / P_P;

        return P_C_given_P.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const clickThroughRate = parseFloat(generateRandomPercentage(0.02, 0.01));
    const purchaseGivenClick = parseFloat(generateRandomPercentage(0.30, 0.05));
    const purchaseGivenNoClick = parseFloat(generateRandomPercentage(0.01, 0.005));

    // Tính xác suất một người mua sản phẩm đã nhấp chuột vào quảng cáo
    const P_C_given_P = calculateProbability(clickThroughRate, purchaseGivenClick, purchaseGivenNoClick);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một chiến dịch quảng cáo trực tuyến có tỷ lệ nhấp chuột (CTR) là $${(clickThroughRate * 100).toFixed(2)}\\%$. Nếu người dùng nhấp chuột vào quảng cáo, xác suất họ mua sản phẩm là $${(purchaseGivenClick * 100).toFixed(2)}\\%$. Nếu người dùng không nhấp chuột vào quảng cáo, xác suất họ mua sản phẩm là $${(purchaseGivenNoClick * 100).toFixed(2)}\\%$. Tính xác suất một người mua sản phẩm đã nhấp chuột vào quảng cáo là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_C_given_P * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $C$ là sự kiện người dùng nhấp chuột vào quảng cáo.
    \\item $N$ là sự kiện người dùng không nhấp chuột vào quảng cáo.
    \\item $P$ là sự kiện người dùng mua sản phẩm.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ nhấp chuột vào quảng cáo: $P(C) = ${clickThroughRate}$.
    \\item Tỷ lệ không nhấp chuột vào quảng cáo: $P(N) = ${1 - clickThroughRate}$.
    \\item Xác suất mua sản phẩm nếu nhấp chuột vào quảng cáo: $P(P|C) = ${purchaseGivenClick}$.
    \\item Xác suất mua sản phẩm nếu không nhấp chuột vào quảng cáo: $P(P|N) = ${purchaseGivenNoClick}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất mua sản phẩm $P(P)$}\\\\
Người dùng mua sản phẩm có thể xảy ra theo hai cách
\\begin{enumerate}
    \\item Người dùng nhấp chuột vào quảng cáo và mua sản phẩm.
    \\item Người dùng không nhấp chuột vào quảng cáo nhưng mua sản phẩm.
\\end{enumerate}
Ta tính xác suất người dùng mua sản phẩm bằng cách dùng định lý xác suất toàn phần:
\\[
P(P) = P(P|C)P(C) + P(P|N)P(N)
\\]
Ở đây
\\begin{itemize}
    \\item $P(C) = ${clickThroughRate}$
    \\item $P(N) = ${1 - clickThroughRate}$
    \\item $P(P|C) = ${purchaseGivenClick}$
    \\item $P(P|N) = ${purchaseGivenNoClick}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(P) = ${purchaseGivenClick} \\times ${clickThroughRate} + ${purchaseGivenNoClick} \\times ${1 - clickThroughRate}
\\]
\\[
P(P) = ${(purchaseGivenClick * clickThroughRate).toFixed(4)} + ${(purchaseGivenNoClick * (1 - clickThroughRate)).toFixed(4)}
\\]
\\[
P(P) = ${((purchaseGivenClick * clickThroughRate) + (purchaseGivenNoClick * (1 - clickThroughRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(C|P) = \\dfrac{P(P|C) \\cdot P(C)}{P(P)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(C|P) = \\dfrac{${purchaseGivenClick} \\times ${clickThroughRate}}{${((purchaseGivenClick * clickThroughRate) + (purchaseGivenNoClick * (1 - clickThroughRate))).toFixed(4)}}
\\]
\\[
P(C|P) = \\dfrac{${(purchaseGivenClick * clickThroughRate).toFixed(4)}}{${((purchaseGivenClick * clickThroughRate) + (purchaseGivenNoClick * (1 - clickThroughRate))).toFixed(4)}}
\\]
\\[
P(C|P) \\approx ${P_C_given_P}
\\]
\\textbf{Kết luận}\\\\
Xác suất một người mua sản phẩm đã nhấp chuột vào quảng cáo là khoảng $${(P_C_given_P * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ nhấp chuột vào quảng cáo là $${(clickThroughRate * 100).toFixed(2)}\\%$, nhưng khả năng mua sản phẩm khi không nhấp chuột vào quảng cáo vẫn có một tỉ lệ nhất định là $${(purchaseGivenNoClick * 100).toFixed(2)}\\%$. Do đó, khi một người mua sản phẩm, khả năng người đó đã nhấp chuột vào quảng cáo là khoảng $${(P_C_given_P * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_khao_sat_thi_truong(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(likeRate, buyGivenLike, buyGivenDislike) {
        const P_L = likeRate;
        const P_D = 1 - P_L;
        const P_B_given_L = buyGivenLike;
        const P_B_given_D = buyGivenDislike;

        const P_B = (P_B_given_L * P_L) + (P_B_given_D * P_D);
        const P_L_given_B = (P_B_given_L * P_L) / P_B;

        return P_L_given_B.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const likeRate = parseFloat(generateRandomPercentage(0.60, 0.05));
    const buyGivenLike = parseFloat(generateRandomPercentage(0.75, 0.05));
    const buyGivenDislike = parseFloat(generateRandomPercentage(0.10, 0.05));

    // Tính xác suất một khách hàng mua sản phẩm là khách hàng thích sản phẩm
    const P_L_given_B = calculateProbability(likeRate, buyGivenLike, buyGivenDislike);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty khảo sát thị trường để đánh giá sản phẩm mới. Kết quả cho thấy $${(likeRate * 100).toFixed(2)}\\%$ khách hàng thích sản phẩm. Trong số những khách hàng thích sản phẩm, $${(buyGivenLike * 100).toFixed(2)}\\%$ sẽ mua sản phẩm. Trong số những khách hàng không thích sản phẩm, chỉ $${(buyGivenDislike * 100).toFixed(2)}\\%$ sẽ mua sản phẩm. Tính xác suất một khách hàng mua sản phẩm là khách hàng thích sản phẩm là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_L_given_B * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $L$ là sự kiện khách hàng thích sản phẩm.
    \\item $D$ là sự kiện khách hàng không thích sản phẩm.
    \\item $B$ là sự kiện khách hàng mua sản phẩm.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ khách hàng thích sản phẩm: $P(L) = ${likeRate}$.
    \\item Tỷ lệ khách hàng không thích sản phẩm: $P(D) = ${1 - likeRate}$.
    \\item Xác suất mua sản phẩm nếu thích sản phẩm: $P(B|L) = ${buyGivenLike}$.
    \\item Xác suất mua sản phẩm nếu không thích sản phẩm: $P(B|D) = ${buyGivenDislike}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất mua sản phẩm $P(B)$}\\\\
Khách hàng mua sản phẩm có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Khách hàng thích sản phẩm và mua sản phẩm.
    \\item Khách hàng không thích sản phẩm nhưng mua sản phẩm.
\\end{enumerate}
Ta tính xác suất khách hàng mua sản phẩm bằng cách dùng định lý xác suất toàn phần:
\\[
P(B) = P(B|L)P(L) + P(B|D)P(D)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(L) = ${likeRate}$
    \\item $P(D) = ${1 - likeRate}$
    \\item $P(B|L) = ${buyGivenLike}$
    \\item $P(B|D) = ${buyGivenDislike}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(B) = ${buyGivenLike} \\times ${likeRate} + ${buyGivenDislike} \\times ${1 - likeRate}
\\]
\\[
P(B) = ${(buyGivenLike * likeRate).toFixed(4)} + ${(buyGivenDislike * (1 - likeRate)).toFixed(4)}
\\]
\\[
P(B) = ${((buyGivenLike * likeRate) + (buyGivenDislike * (1 - likeRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(L|B) = \\dfrac{P(B|L) \\cdot P(L)}{P(B)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(L|B) = \\dfrac{${buyGivenLike} \\times ${likeRate}}{${((buyGivenLike * likeRate) + (buyGivenDislike * (1 - likeRate))).toFixed(4)}}
\\]
\\[
P(L|B) = \\dfrac{${(buyGivenLike * likeRate).toFixed(4)}}{${((buyGivenLike * likeRate) + (buyGivenDislike * (1 - likeRate))).toFixed(4)}}
\\]
\\[
P(L|B) \\approx ${P_L_given_B}
\\]
\\textbf{Kết luận}\\\\
Xác suất một khách hàng mua sản phẩm là khách hàng thích sản phẩm là khoảng $${(P_L_given_B * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ khách hàng thích sản phẩm là $${(likeRate * 100).toFixed(2)}\\%$, nhưng khả năng mua sản phẩm khi không thích sản phẩm vẫn có một tỉ lệ nhất định là $${(buyGivenDislike * 100).toFixed(2)}\\%$. Do đó, khi một khách hàng mua sản phẩm, khả năng khách hàng đó thích sản phẩm là khoảng $${(P_L_given_B * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_hocsinh_lam_btvn(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(homeworkRate, highGradeGivenHomework, highGradeGivenNoHomework) {
        const P_H = homeworkRate;
        const P_NH = 1 - P_H;
        const P_G_given_H = highGradeGivenHomework;
        const P_G_given_NH = highGradeGivenNoHomework;

        const P_G = (P_G_given_H * P_H) + (P_G_given_NH * P_NH);
        const P_H_given_G = (P_G_given_H * P_H) / P_G;

        return P_H_given_G.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const homeworkRate = parseFloat(generateRandomPercentage(0.70, 0.05));
    const highGradeGivenHomework = parseFloat(generateRandomPercentage(0.80, 0.05));
    const highGradeGivenNoHomework = parseFloat(generateRandomPercentage(0.30, 0.05));

    // Tính xác suất học sinh đạt điểm cao đã làm bài tập về nhà
    const P_H_given_G = calculateProbability(homeworkRate, highGradeGivenHomework, highGradeGivenNoHomework);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một giáo viên toán phát hiện rằng $${(homeworkRate * 100).toFixed(2)}\\%$ học sinh trong lớp đã làm bài tập về nhà. Nếu học sinh đã làm bài tập về nhà, xác suất đạt điểm cao trong bài thi là $${(highGradeGivenHomework * 100).toFixed(2)}\\%$. Nếu học sinh không làm bài tập về nhà, xác suất đạt điểm cao trong bài thi là $${(highGradeGivenNoHomework * 100).toFixed(2)}\\%$. Tính xác suất một học sinh đạt điểm cao đã làm bài tập về nhà là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_H_given_G * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $H$ là sự kiện học sinh đã làm bài tập về nhà.
    \\item $NH$ là sự kiện học sinh không làm bài tập về nhà.
    \\item $G$ là sự kiện học sinh đạt điểm cao.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất học sinh đã làm bài tập về nhà: $P(H) = ${homeworkRate}$.
    \\item Xác suất học sinh không làm bài tập về nhà: $P(NH) = ${1 - homeworkRate}$.
    \\item Xác suất đạt điểm cao nếu học sinh đã làm bài tập về nhà: $P(G|H) = ${highGradeGivenHomework}$.
    \\item Xác suất đạt điểm cao nếu học sinh không làm bài tập về nhà: $P(G|NH) = ${highGradeGivenNoHomework}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất đạt điểm cao $P(G)$}\\\\
Học sinh đạt điểm cao có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Học sinh đã làm bài tập về nhà và đạt điểm cao.
    \\item Học sinh không làm bài tập về nhà nhưng đạt điểm cao.
\\end{enumerate}
Ta tính xác suất học sinh đạt điểm cao bằng cách dùng định lý xác suất toàn phần:
\\[
P(G) = P(G|H)P(H) + P(G|NH)P(NH)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(H) = ${homeworkRate}$
    \\item $P(NH) = ${1 - homeworkRate}$
    \\item $P(G|H) = ${highGradeGivenHomework}$
    \\item $P(G|NH) = ${highGradeGivenNoHomework}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(G) = ${highGradeGivenHomework} \\times ${homeworkRate} + ${highGradeGivenNoHomework} \\times ${1 - homeworkRate}
\\]
\\[
P(G) = ${(highGradeGivenHomework * homeworkRate).toFixed(4)} + ${(highGradeGivenNoHomework * (1 - homeworkRate)).toFixed(4)}
\\]
\\[
P(G) = ${((highGradeGivenHomework * homeworkRate) + (highGradeGivenNoHomework * (1 - homeworkRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(H|G) = \\dfrac{P(G|H) \\cdot P(H)}{P(G)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(H|G) = \\dfrac{${highGradeGivenHomework} \\times ${homeworkRate}}{${((highGradeGivenHomework * homeworkRate) + (highGradeGivenNoHomework * (1 - homeworkRate))).toFixed(4)}}
\\]
\\[
P(H|G) = \\dfrac{${(highGradeGivenHomework * homeworkRate).toFixed(4)}}{${((highGradeGivenHomework * homeworkRate) + (highGradeGivenNoHomework * (1 - homeworkRate))).toFixed(4)}}
\\]
\\[
P(H|G) \\approx ${P_H_given_G}
\\]
\\textbf{Kết luận}\\\\
Xác suất một học sinh đạt điểm cao đã làm bài tập về nhà là khoảng $${(P_H_given_G * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ học sinh đã làm bài tập về nhà là $${(homeworkRate * 100).toFixed(2)}\\%$, nhưng khả năng đạt điểm cao khi không làm bài tập về nhà vẫn có một tỉ lệ nhất định là $${(highGradeGivenNoHomework * 100).toFixed(2)}\\%$. Do đó, khi một học sinh đạt điểm cao, khả năng học sinh đó đã làm bài tập về nhà là khoảng $${(P_H_given_G * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_bi_benh(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(diseaseRate, sensitivity, specificity) {
        const P_D = diseaseRate;
        const P_ND = 1 - P_D;
        const P_T_given_D = sensitivity;
        const P_T_given_ND = 1 - specificity;

        const P_T = (P_T_given_D * P_D) + (P_T_given_ND * P_ND);
        const P_D_given_T = (P_T_given_D * P_D) / P_T;

        return P_D_given_T.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const diseaseRate = parseFloat(generateRandomPercentage(0.05, 0.01));
    const sensitivity = parseFloat(generateRandomPercentage(0.90, 0.05));
    const specificity = parseFloat(generateRandomPercentage(0.95, 0.05));

    // Tính xác suất một bệnh nhân có kết quả xét nghiệm dương tính mắc bệnh A
    const P_D_given_T = calculateProbability(diseaseRate, sensitivity, specificity);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một bệnh viện phát hiện rằng $${(diseaseRate * 100).toFixed(2)}\\%$ bệnh nhân mắc một loại bệnh A. Xét nghiệm cho bệnh A có độ nhạy là $${(sensitivity * 100).toFixed(2)}\\%$ (xác suất dương tính thật) và độ đặc hiệu là $${(specificity * 100).toFixed(2)}\\%$ (xác suất âm tính thật). Tính xác suất một bệnh nhân có kết quả xét nghiệm dương tính mắc bệnh A là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_D_given_T * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $D$ là sự kiện bệnh nhân mắc bệnh A.
    \\item $ND$ là sự kiện bệnh nhân không mắc bệnh A.
    \\item $T$ là sự kiện xét nghiệm dương tính.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất bệnh nhân mắc bệnh A: $P(D) = ${diseaseRate}$.
    \\item Xác suất bệnh nhân không mắc bệnh A: $P(ND) = ${1 - diseaseRate}$.
    \\item Xác suất xét nghiệm dương tính nếu mắc bệnh: $P(T|D) = ${sensitivity}$.
    \\item Xác suất xét nghiệm dương tính nếu không mắc bệnh: $P(T|ND) = ${1 - specificity}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất xét nghiệm dương tính $P(T)$}\\\\
Xét nghiệm dương tính có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Bệnh nhân mắc bệnh và xét nghiệm dương tính.
    \\item Bệnh nhân không mắc bệnh nhưng xét nghiệm dương tính giả.
\\end{enumerate}
Ta tính xác suất xét nghiệm dương tính bằng cách dùng định lý xác suất toàn phần:
\\[
P(T) = P(T|D)P(D) + P(T|ND)P(ND)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(D) = ${diseaseRate}$
    \\item $P(ND) = ${1 - diseaseRate}$
    \\item $P(T|D) = ${sensitivity}$
    \\item $P(T|ND) = ${1 - specificity}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(T) = ${sensitivity} \\times ${diseaseRate} + ${(1 - specificity).toFixed(4)} \\times ${(1 - diseaseRate).toFixed(4)}
\\]
\\[
P(T) = ${(sensitivity * diseaseRate).toFixed(4)} + ${((1 - specificity) * (1 - diseaseRate)).toFixed(4)}
\\]
\\[
P(T) = ${((sensitivity * diseaseRate) + ((1 - specificity) * (1 - diseaseRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(D|T) = \\dfrac{P(T|D) \\cdot P(D)}{P(T)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(D|T) = \\dfrac{${sensitivity} \\times ${diseaseRate}}{${((sensitivity * diseaseRate) + ((1 - specificity) * (1 - diseaseRate))).toFixed(4)}}
\\]
\\[
P(D|T) = \\dfrac{${(sensitivity * diseaseRate).toFixed(4)}}{${((sensitivity * diseaseRate) + ((1 - specificity) * (1 - diseaseRate))).toFixed(4)}}
\\]
\\[
P(D|T) \\approx ${P_D_given_T}
\\]
\\textbf{Kết luận}\\\\
Xác suất một bệnh nhân có kết quả xét nghiệm dương tính mắc bệnh A là khoảng $${(P_D_given_T * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ bệnh nhân mắc bệnh A là $${(diseaseRate * 100).toFixed(2)}\\%$, nhưng khả năng xét nghiệm dương tính giả vẫn có một tỉ lệ nhất định là $${((1 - specificity) * 100).toFixed(2)}\\%$. Do đó, khi một bệnh nhân có kết quả xét nghiệm dương tính, khả năng họ thực sự mắc bệnh A là khoảng $${(P_D_given_T * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;
    return question;
}
function xs_trung_bau_cu(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(winRateA, policyGivenA, policyGivenB) {
        const P_A = winRateA;
        const P_B = 1 - P_A;
        const P_X_given_A = policyGivenA;
        const P_X_given_B = policyGivenB;

        const P_X = (P_X_given_A * P_A) + (P_X_given_B * P_B);
        return P_X.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const winRateA = parseFloat(generateRandomPercentage(0.60, 0.05));
    const policyGivenA = parseFloat(generateRandomPercentage(0.80, 0.05));
    const policyGivenB = parseFloat(generateRandomPercentage(0.30, 0.05));

    // Tính xác suất chính sách X được thực hiện
    const P_X = calculateProbability(winRateA, policyGivenA, policyGivenB);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Trong một cuộc bầu cử, có hai ứng cử viên: A và B. Ứng cử viên A có $${(winRateA * 100).toFixed(2)}\\%$ cơ hội thắng cử. Nếu A thắng cử, xác suất họ thực hiện chính sách X là $${(policyGivenA * 100).toFixed(2)}\\%$. Nếu B thắng cử, xác suất họ thực hiện chính sách X là $${(policyGivenB * 100).toFixed(2)}\\%$. Tính xác suất chính sách X được thực hiện là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_X * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $A$ là sự kiện ứng cử viên A thắng cử.
    \\item $B$ là sự kiện ứng cử viên B thắng cử.
    \\item $X$ là sự kiện chính sách X được thực hiện.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất ứng cử viên A thắng cử: $P(A) = ${winRateA}$.
    \\item Xác suất ứng cử viên B thắng cử: $P(B) = ${1 - winRateA}$.
    \\item Xác suất thực hiện chính sách X nếu A thắng: $P(X|A) = ${policyGivenA}$.
    \\item Xác suất thực hiện chính sách X nếu B thắng: $P(X|B) = ${policyGivenB}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất chính sách X được thực hiện $P(X)$}\\\\
Chính sách X được thực hiện có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Ứng cử viên A thắng cử và thực hiện chính sách X.
    \\item Ứng cử viên B thắng cử và thực hiện chính sách X.
\\end{enumerate}
Ta tính xác suất chính sách X được thực hiện bằng cách dùng định lý xác suất toàn phần:
\\[
P(X) = P(X|A)P(A) + P(X|B)P(B)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(A) = ${winRateA}$
    \\item $P(B) = ${1 - winRateA}$
    \\item $P(X|A) = ${policyGivenA}$
    \\item $P(X|B) = ${policyGivenB}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(X) = ${policyGivenA} \\times ${winRateA} + ${policyGivenB} \\times ${1 - winRateA}
\\]
\\[
P(X) = ${(policyGivenA * winRateA).toFixed(4)} + ${(policyGivenB * (1 - winRateA)).toFixed(4)}
\\]
\\[
P(X) = ${((policyGivenA * winRateA) + (policyGivenB * (1 - winRateA))).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất chính sách X được thực hiện là khoảng $${(P_X * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Ứng cử viên A có $${(winRateA * 100).toFixed(2)}\\%$ cơ hội thắng cử và xác suất họ thực hiện chính sách X là $${(policyGivenA * 100).toFixed(2)}\\%$. Ứng cử viên B có $${((1 - winRateA) * 100).toFixed(2)}\\%$ cơ hội thắng cử và xác suất họ thực hiện chính sách X là $${(policyGivenB * 100).toFixed(2)}\\%$. Do đó, khi tính toán, xác suất chính sách X được thực hiện là khoảng $${(P_X * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_nhanvien_hoanthanh_tot(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(experiencedRate, onTimeGivenExperienced, onTimeGivenInexperienced) {
        const P_E = experiencedRate;
        const P_IE = 1 - P_E;
        const P_OT_given_E = onTimeGivenExperienced;
        const P_OT_given_IE = onTimeGivenInexperienced;

        const P_OT = (P_OT_given_E * P_E) + (P_OT_given_IE * P_IE);
        const P_E_given_OT = (P_OT_given_E * P_E) / P_OT;

        return P_E_given_OT.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const experiencedRate = parseFloat(generateRandomPercentage(0.70, 0.05));
    const onTimeGivenExperienced = parseFloat(generateRandomPercentage(0.90, 0.05));
    const onTimeGivenInexperienced = parseFloat(generateRandomPercentage(0.50, 0.05));

    // Tính xác suất một nhân viên hoàn thành công việc đúng hạn là nhân viên có kinh nghiệm
    const P_E_given_OT = calculateProbability(experiencedRate, onTimeGivenExperienced, onTimeGivenInexperienced);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty có $${(experiencedRate * 100).toFixed(2)}\\%$ nhân viên là người có kinh nghiệm. Trong số nhân viên có kinh nghiệm, $${(onTimeGivenExperienced * 100).toFixed(2)}\\%$ hoàn thành công việc đúng hạn. Trong số nhân viên không có kinh nghiệm, chỉ $${(onTimeGivenInexperienced * 100).toFixed(2)}\\%$ hoàn thành công việc đúng hạn. Tính xác suất một nhân viên hoàn thành công việc đúng hạn là nhân viên có kinh nghiệm là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_E_given_OT * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $E$ là sự kiện nhân viên có kinh nghiệm.
    \\item $IE$ là sự kiện nhân viên không có kinh nghiệm.
    \\item $OT$ là sự kiện nhân viên hoàn thành công việc đúng hạn.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất nhân viên có kinh nghiệm: $P(E) = ${experiencedRate}$.
    \\item Xác suất nhân viên không có kinh nghiệm: $P(IE) = ${1 - experiencedRate}$.
    \\item Xác suất hoàn thành công việc đúng hạn nếu có kinh nghiệm: $P(OT|E) = ${onTimeGivenExperienced}$.
    \\item Xác suất hoàn thành công việc đúng hạn nếu không có kinh nghiệm: $P(OT|IE) = ${onTimeGivenInexperienced}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất hoàn thành công việc đúng hạn $P(OT)$}\\\\
Nhân viên hoàn thành công việc đúng hạn có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Nhân viên có kinh nghiệm và hoàn thành công việc đúng hạn.
    \\item Nhân viên không có kinh nghiệm nhưng hoàn thành công việc đúng hạn.
\\end{enumerate}
Ta tính xác suất nhân viên hoàn thành công việc đúng hạn bằng cách dùng định lý xác suất toàn phần:
\\[
P(OT) = P(OT|E)P(E) + P(OT|IE)P(IE)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(E) = ${experiencedRate}$
    \\item $P(IE) = ${1 - experiencedRate}$
    \\item $P(OT|E) = ${onTimeGivenExperienced}$
    \\item $P(OT|IE) = ${onTimeGivenInexperienced}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(OT) = ${onTimeGivenExperienced} \\times ${experiencedRate} + ${onTimeGivenInexperienced} \\times ${1 - experiencedRate}
\\]
\\[
P(OT) = ${(onTimeGivenExperienced * experiencedRate).toFixed(4)} + ${(onTimeGivenInexperienced * (1 - experiencedRate)).toFixed(4)}
\\]
\\[
P(OT) = ${((onTimeGivenExperienced * experiencedRate) + (onTimeGivenInexperienced * (1 - experiencedRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(E|OT) = \\dfrac{P(OT|E) \\cdot P(E)}{P(OT)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(E|OT) = \\dfrac{${onTimeGivenExperienced} \\times ${experiencedRate}}{${((onTimeGivenExperienced * experiencedRate) + (onTimeGivenInexperienced * (1 - experiencedRate))).toFixed(4)}}
\\]
\\[
P(E|OT) = \\dfrac{${(onTimeGivenExperienced * experiencedRate).toFixed(4)}}{${((onTimeGivenExperienced * experiencedRate) + (onTimeGivenInexperienced * (1 - experiencedRate))).toFixed(4)}}
\\]
\\[
P(E|OT) \\approx ${P_E_given_OT}
\\]
\\textbf{Kết luận}\\\\
Xác suất một nhân viên hoàn thành công việc đúng hạn là nhân viên có kinh nghiệm là khoảng $${(P_E_given_OT * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ nhân viên có kinh nghiệm là $${(experiencedRate * 100).toFixed(2)}\\%$, nhưng khả năng hoàn thành công việc đúng hạn khi không có kinh nghiệm vẫn có một tỉ lệ nhất định là $${(onTimeGivenInexperienced * 100).toFixed(2)}\\%$. Do đó, khi một nhân viên hoàn thành công việc đúng hạn, khả năng nhân viên đó có kinh nghiệm là khoảng $${(P_E_given_OT * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_tiem_thuoc_khoibenh(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(treatmentRate, successGivenTreatment, successGivenNoTreatment) {
        const P_T = treatmentRate;
        const P_NT = 1 - P_T;
        const P_S_given_T = successGivenTreatment;
        const P_S_given_NT = successGivenNoTreatment;

        const P_S = (P_S_given_T * P_T) + (P_S_given_NT * P_NT);
        const P_T_given_S = (P_S_given_T * P_T) / P_S;

        return P_T_given_S.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const treatmentRate = parseFloat(generateRandomPercentage(0.60, 0.05));
    const successGivenTreatment = parseFloat(generateRandomPercentage(0.85, 0.05));
    const successGivenNoTreatment = parseFloat(generateRandomPercentage(0.10, 0.05));

    // Tính xác suất một bệnh nhân khỏi bệnh là bệnh nhân được tiêm thuốc
    const P_T_given_S = calculateProbability(treatmentRate, successGivenTreatment, successGivenNoTreatment);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một loại thuốc mới có tỷ lệ thành công là $${(successGivenTreatment * 100).toFixed(2)}\\%$ đối với bệnh nhân mắc bệnh X. Trong một thử nghiệm lâm sàng, $${(treatmentRate * 100).toFixed(2)}\\%$ bệnh nhân được tiêm thuốc này. Tính xác suất một bệnh nhân khỏi bệnh là bệnh nhân được tiêm thuốc là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_T_given_S * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $T$ là sự kiện bệnh nhân được tiêm thuốc.
    \\item $NT$ là sự kiện bệnh nhân không được tiêm thuốc.
    \\item $S$ là sự kiện bệnh nhân khỏi bệnh.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất bệnh nhân được tiêm thuốc: $P(T) = ${treatmentRate}$.
    \\item Xác suất bệnh nhân không được tiêm thuốc: $P(NT) = ${1 - treatmentRate}$.
    \\item Xác suất khỏi bệnh nếu được tiêm thuốc: $P(S|T) = ${successGivenTreatment}$.
    \\item Xác suất khỏi bệnh nếu không được tiêm thuốc: $P(S|NT) = ${successGivenNoTreatment}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất khỏi bệnh $P(S)$}\\\\
Bệnh nhân khỏi bệnh có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Bệnh nhân được tiêm thuốc và khỏi bệnh.
    \\item Bệnh nhân không được tiêm thuốc nhưng vẫn khỏi bệnh.
\\end{enumerate}
Ta tính xác suất bệnh nhân khỏi bệnh bằng cách dùng định lý xác suất toàn phần:
\\[
P(S) = P(S|T)P(T) + P(S|NT)P(NT)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(T) = ${treatmentRate}$
    \\item $P(NT) = ${1 - treatmentRate}$
    \\item $P(S|T) = ${successGivenTreatment}$
    \\item $P(S|NT) = ${successGivenNoTreatment}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(S) = ${successGivenTreatment} \\times ${treatmentRate} + ${successGivenNoTreatment} \\times ${1 - treatmentRate}
\\]
\\[
P(S) = ${(successGivenTreatment * treatmentRate).toFixed(4)} + ${(successGivenNoTreatment * (1 - treatmentRate)).toFixed(4)}
\\]
\\[
P(S) = ${((successGivenTreatment * treatmentRate) + (successGivenNoTreatment * (1 - treatmentRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(T|S) = \\dfrac{P(S|T) \\cdot P(T)}{P(S)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(T|S) = \\dfrac{${successGivenTreatment} \\times ${treatmentRate}}{${((successGivenTreatment * treatmentRate) + (successGivenNoTreatment * (1 - treatmentRate))).toFixed(4)}}
\\]
\\[
P(T|S) = \\dfrac{${(successGivenTreatment * treatmentRate).toFixed(4)}}{${((successGivenTreatment * treatmentRate) + (successGivenNoTreatment * (1 - treatmentRate))).toFixed(4)}}
\\]
\\[
P(T|S) \\approx ${P_T_given_S}
\\]
\\textbf{Kết luận}\\\\
Xác suất một bệnh nhân khỏi bệnh là bệnh nhân được tiêm thuốc là khoảng $${(P_T_given_S * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ bệnh nhân được tiêm thuốc là $${(treatmentRate * 100).toFixed(2)}\\%$, nhưng khả năng khỏi bệnh khi không được tiêm thuốc vẫn có một tỉ lệ nhất định là $${(successGivenNoTreatment * 100).toFixed(2)}\\%$. Do đó, khi một bệnh nhân khỏi bệnh, khả năng bệnh nhân đó đã được tiêm thuốc là khoảng $${(P_T_given_S * 100).toFixed(1)}\\%$.\\\\
}
\\end{ex}
    `;

    return question;
}
function xs_thang_tro_choi(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(winRate, continueGivenWin, continueGivenLose) {
        const P_W = winRate;
        const P_L = 1 - P_W;
        const P_C_given_W = continueGivenWin;
        const P_C_given_L = continueGivenLose;

        const P_C = (P_C_given_W * P_W) + (P_C_given_L * P_L);
        const P_W_given_C = (P_C_given_W * P_W) / P_C;

        return P_W_given_C.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const winRate = parseFloat(generateRandomPercentage(0.40, 0.05));
    const continueGivenWin = parseFloat(generateRandomPercentage(0.60, 0.05));
    const continueGivenLose = parseFloat(generateRandomPercentage(0.30, 0.05));

    // Tính xác suất một người chơi tiếp tục trò chơi là họ đã thắng trò chơi
    const P_W_given_C = calculateProbability(winRate, continueGivenWin, continueGivenLose);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một trò chơi có $${(winRate * 100).toFixed(2)}\\%$ khả năng thắng. Nếu một người chơi thắng, xác suất họ chơi tiếp là $${(continueGivenWin * 100).toFixed(2)}\\%$. Nếu họ thua, xác suất họ chơi tiếp là $${(continueGivenLose * 100).toFixed(2)}\\%$. Tính xác suất một người chơi tiếp tục trò chơi là họ đã thắng trò chơi là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_W_given_C * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $W$ là sự kiện người chơi thắng trò chơi.
    \\item $L$ là sự kiện người chơi thua trò chơi.
    \\item $C$ là sự kiện người chơi tiếp tục trò chơi.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất người chơi thắng trò chơi: $P(W) = ${winRate}$.
    \\item Xác suất người chơi thua trò chơi: $P(L) = ${1 - winRate}$.
    \\item Xác suất tiếp tục chơi nếu thắng: $P(C|W) = ${continueGivenWin}$.
    \\item Xác suất tiếp tục chơi nếu thua: $P(C|L) = ${continueGivenLose}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất tiếp tục chơi $P(C)$}\\\\
Người chơi tiếp tục chơi có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Người chơi thắng trò chơi và tiếp tục chơi.
    \\item Người chơi thua trò chơi nhưng tiếp tục chơi.
\\end{enumerate}
Ta tính xác suất người chơi tiếp tục chơi bằng cách dùng định lý xác suất toàn phần:
\\[
P(C) = P(C|W)P(W) + P(C|L)P(L)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(W) = ${winRate}$
    \\item $P(L) = ${1 - winRate}$
    \\item $P(C|W) = ${continueGivenWin}$
    \\item $P(C|L) = ${continueGivenLose}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(C) = ${continueGivenWin} \\times ${winRate} + ${continueGivenLose} \\times ${1 - winRate}
\\]
\\[
P(C) = ${(continueGivenWin * winRate).toFixed(4)} + ${(continueGivenLose * (1 - winRate)).toFixed(4)}
\\]
\\[
P(C) = ${((continueGivenWin * winRate) + (continueGivenLose * (1 - winRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(W|C) = \\dfrac{P(C|W) \\cdot P(W)}{P(C)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(W|C) = \\frac{${continueGivenWin} \\times ${winRate}}{${((continueGivenWin * winRate) + (continueGivenLose * (1 - winRate))).toFixed(4)}}
\\]
\\[
P(W|C) = \\frac{${(continueGivenWin * winRate).toFixed(4)}}{${((continueGivenWin * winRate) + (continueGivenLose * (1 - winRate))).toFixed(4)}}
\\]
\\[
P(W|C) \\approx ${P_W_given_C}
\\]
\\textbf{Kết luận}\\\\
Xác suất một người chơi tiếp tục trò chơi là họ đã thắng trò chơi là khoảng $${(P_W_given_C * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ thắng trò chơi là $${(winRate * 100).toFixed(2)}\\%$, nhưng khả năng tiếp tục chơi khi thua vẫn có một tỉ lệ nhất định là $${(continueGivenLose * 100).toFixed(2)}\\%$. Do đó, khi một người chơi tiếp tục trò chơi, khả năng họ đã thắng trò chơi là khoảng $${(P_W_given_C * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_mua_ngap_duong(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(rainRate, floodGivenRain, floodGivenNoRain) {
        const P_R = rainRate;
        const P_NR = 1 - P_R;
        const P_F_given_R = floodGivenRain;
        const P_F_given_NR = floodGivenNoRain;

        const P_F = (P_F_given_R * P_R) + (P_F_given_NR * P_NR);
        return P_F.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const rainRate = parseFloat(generateRandomPercentage(0.40, 0.05));
    const floodGivenRain = parseFloat(generateRandomPercentage(0.70, 0.05));
    const floodGivenNoRain = parseFloat(generateRandomPercentage(0.10, 0.05));

    // Tính xác suất đường bị ngập ngày mai
    const P_F = calculateProbability(rainRate, floodGivenRain, floodGivenNoRain);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Dự báo thời tiết dự đoán có $${(rainRate * 100).toFixed(2)}\\%$ khả năng mưa ngày mai. Nếu trời mưa, xác suất đường bị ngập là $${(floodGivenRain * 100).toFixed(2)}\\%$. Nếu không mưa, xác suất đường bị ngập là $${(floodGivenNoRain * 100).toFixed(2)}\\%$. Tính xác suất đường bị ngập ngày mai là bao nhiêu $\\%$, làm tròn một chữ số thập phân.\\\\
\\shortans{$${(P_F * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $R$ là sự kiện trời mưa.
    \\item $NR$ là sự kiện trời không mưa.
    \\item $F$ là sự kiện đường bị ngập.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất trời mưa: $P(R) = ${rainRate}$.
    \\item Xác suất trời không mưa: $P(NR) = ${1 - rainRate}$.
    \\item Xác suất đường bị ngập nếu trời mưa: $P(F|R) = ${floodGivenRain}$.
    \\item Xác suất đường bị ngập nếu trời không mưa: $P(F|NR) = ${floodGivenNoRain}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất đường bị ngập $P(F)$}\\\\
Đường bị ngập có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Trời mưa và đường bị ngập.
    \\item Trời không mưa nhưng đường vẫn bị ngập.
\\end{enumerate}
Ta tính xác suất đường bị ngập bằng cách dùng định lý xác suất toàn phần:
\\[
P(F) = P(F|R)P(R) + P(F|NR)P(NR)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(R) = ${rainRate}$
    \\item $P(NR) = ${1 - rainRate}$
    \\item $P(F|R) = ${floodGivenRain}$
    \\item $P(F|NR) = ${floodGivenNoRain}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(F) = ${floodGivenRain} \\times ${rainRate} + ${floodGivenNoRain} \\times ${1 - rainRate}
\\]
\\[
P(F) = ${(floodGivenRain * rainRate).toFixed(4)} + ${(floodGivenNoRain * (1 - rainRate)).toFixed(4)}
\\]
\\[
P(F) = ${((floodGivenRain * rainRate) + (floodGivenNoRain * (1 - rainRate))).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất đường bị ngập ngày mai là khoảng $${(P_F * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ trời mưa là $${(rainRate * 100).toFixed(2)}\\%$, nhưng khả năng đường bị ngập khi không mưa vẫn có một tỉ lệ nhất định là $${(floodGivenNoRain * 100).toFixed(2)}\\%$. Do đó, khi tính toán, xác suất đường bị ngập ngày mai là khoảng $${(P_F * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_chi_boi_thuong_bao_hiem(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(highRiskRate, claimGivenHighRisk, claimGivenLowRisk) {
        const P_HR = highRiskRate;
        const P_LR = 1 - P_HR;
        const P_C_given_HR = claimGivenHighRisk;
        const P_C_given_LR = claimGivenLowRisk;

        const P_C = (P_C_given_HR * P_HR) + (P_C_given_LR * P_LR);
        const P_HR_given_C = (P_C_given_HR * P_HR) / P_C;

        return P_HR_given_C.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const highRiskRate = parseFloat(generateRandomPercentage(0.10, 0.02));
    const claimGivenHighRisk = parseFloat(generateRandomPercentage(0.20, 0.05));
    const claimGivenLowRisk = parseFloat(generateRandomPercentage(0.05, 0.02));

    // Tính xác suất một khách hàng nộp đơn yêu cầu bồi thường là khách hàng có nguy cơ cao
    const P_HR_given_C = calculateProbability(highRiskRate, claimGivenHighRisk, claimGivenLowRisk);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty bảo hiểm ước tính rằng $${(highRiskRate * 100).toFixed(2)}\\%$ khách hàng của họ có nguy cơ cao xảy ra tai nạn. Trong số khách hàng có nguy cơ cao, $${(claimGivenHighRisk * 100).toFixed(2)}\\%$ sẽ nộp đơn yêu cầu bồi thường. Trong số khách hàng có nguy cơ thấp, chỉ $${(claimGivenLowRisk * 100).toFixed(2)}\\%$ sẽ nộp đơn yêu cầu bồi thường. Tính xác suất một khách hàng nộp đơn yêu cầu bồi thường là khách hàng có nguy cơ cao là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_HR_given_C * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $HR$ là sự kiện khách hàng có nguy cơ cao.
    \\item $LR$ là sự kiện khách hàng có nguy cơ thấp.
    \\item $C$ là sự kiện khách hàng nộp đơn yêu cầu bồi thường.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất khách hàng có nguy cơ cao: $P(HR) = ${highRiskRate}$.
    \\item Xác suất khách hàng có nguy cơ thấp: $P(LR) = ${1 - highRiskRate}$.
    \\item Xác suất nộp đơn yêu cầu bồi thường nếu có nguy cơ cao: $P(C|HR) = ${claimGivenHighRisk}$.
    \\item Xác suất nộp đơn yêu cầu bồi thường nếu có nguy cơ thấp: $P(C|LR) = ${claimGivenLowRisk}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất nộp đơn yêu cầu bồi thường $P(C)$}\\\\
Khách hàng nộp đơn yêu cầu bồi thường có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Khách hàng có nguy cơ cao và nộp đơn yêu cầu bồi thường.
    \\item Khách hàng có nguy cơ thấp nhưng vẫn nộp đơn yêu cầu bồi thường.
\\end{enumerate}
Ta tính xác suất khách hàng nộp đơn yêu cầu bồi thường bằng cách dùng định lý xác suất toàn phần:
\\[
P(C) = P(C|HR)P(HR) + P(C|LR)P(LR)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(HR) = ${highRiskRate}$
    \\item $P(LR) = ${1 - highRiskRate}$
    \\item $P(C|HR) = ${claimGivenHighRisk}$
    \\item $P(C|LR) = ${claimGivenLowRisk}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(C) = ${claimGivenHighRisk} \\times ${highRiskRate} + ${claimGivenLowRisk} \\times ${1 - highRiskRate}
\\]
\\[
P(C) = ${(claimGivenHighRisk * highRiskRate).toFixed(4)} + ${(claimGivenLowRisk * (1 - highRiskRate)).toFixed(4)}
\\]
\\[
P(C) = ${((claimGivenHighRisk * highRiskRate) + (claimGivenLowRisk * (1 - highRiskRate))).toFixed(4)}
\\]

\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(HR|C) = \\dfrac{P(C|HR) \\cdot P(HR)}{P(C)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(HR|C) = \\dfrac{${claimGivenHighRisk} \\times ${highRiskRate}}{${((claimGivenHighRisk * highRiskRate) + (claimGivenLowRisk * (1 - highRiskRate))).toFixed(4)}}
\\]
\\[
P(HR|C) = \\dfrac{${(claimGivenHighRisk * highRiskRate).toFixed(4)}}{${((claimGivenHighRisk * highRiskRate) + (claimGivenLowRisk * (1 - highRiskRate))).toFixed(4)}}
\\]
\\[
P(HR|C) \\approx ${P_HR_given_C}
\\]
\\textbf{Kết luận}\\\\
Xác suất một khách hàng nộp đơn yêu cầu bồi thường là khách hàng có nguy cơ cao là khoảng $${(P_HR_given_C * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ khách hàng có nguy cơ cao là $${(highRiskRate * 100).toFixed(2)}\\%$, nhưng khả năng nộp đơn yêu cầu bồi thường khi có nguy cơ thấp vẫn có một tỉ lệ nhất định là $${(claimGivenLowRisk * 100).toFixed(2)}\\%$. Do đó, khi một khách hàng nộp đơn yêu cầu bồi thường, khả năng khách hàng đó có nguy cơ cao là khoảng $${(P_HR_given_C * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_thang_chung_khoan(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(stockSuccessRate, bondSuccessRate, stockSelectionRate, bondSelectionRate) {
        const P_S = stockSelectionRate;
        const P_B = bondSelectionRate;
        const P_Success_given_S = stockSuccessRate;
        const P_Success_given_B = bondSuccessRate;

        const P_Success = (P_Success_given_S * P_S) + (P_Success_given_B * P_B);
        const P_S_given_Success = (P_Success_given_S * P_S) / P_Success;

        return P_S_given_Success.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const stockSuccessRate = parseFloat(generateRandomPercentage(0.70, 0.05));
    const bondSuccessRate = parseFloat(generateRandomPercentage(0.30, 0.05));
    const stockSelectionRate = parseFloat(generateRandomPercentage(0.60, 0.05));
    const bondSelectionRate = 1 - stockSelectionRate;

    // Tính xác suất nhà đầu tư thành công khi biết họ đã chọn cổ phiếu
    const P_S_given_Success = calculateProbability(stockSuccessRate, bondSuccessRate, stockSelectionRate, bondSelectionRate);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một nhà đầu tư có $${(stockSuccessRate * 100).toFixed(2)}\\%$ cơ hội thành công khi đầu tư vào cổ phiếu và $${(bondSuccessRate * 100).toFixed(2)}\\%$ cơ hội thành công khi đầu tư vào trái phiếu. Xác suất nhà đầu tư chọn cổ phiếu là $${(stockSelectionRate * 100).toFixed(2)}\\%$ và chọn trái phiếu là $${(bondSelectionRate * 100).toFixed(2)}\\%$. Tính xác suất nhà đầu tư thành công khi biết họ đã chọn cổ phiếu là bao nhiêu $\\%$, làm tròn một chữ số thập phân.
\\shortans{$${(P_S_given_Success * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $S$ là sự kiện nhà đầu tư chọn cổ phiếu.
    \\item $B$ là sự kiện nhà đầu tư chọn trái phiếu.
    \\item $Success$ là sự kiện nhà đầu tư thành công.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất nhà đầu tư chọn cổ phiếu: $P(S) = ${stockSelectionRate}$.
    \\item Xác suất nhà đầu tư chọn trái phiếu: $P(B) = ${bondSelectionRate}$.
    \\item Xác suất thành công nếu chọn cổ phiếu: $P(Success|S) = ${stockSuccessRate}$.
    \\item Xác suất thành công nếu chọn trái phiếu: $P(Success|B) = ${bondSuccessRate}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất thành công $P(Success)$}\\\\
Nhà đầu tư thành công có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Nhà đầu tư chọn cổ phiếu và thành công.
    \\item Nhà đầu tư chọn trái phiếu và thành công.
\\end{enumerate}
Ta tính xác suất nhà đầu tư thành công bằng cách dùng định lý xác suất toàn phần:
\\[
P(Success) = P(Success|S)P(S) + P(Success|B)P(B)
\\]

Ở đây:
\\begin{itemize}
    \\item $P(S) = ${stockSelectionRate}$
    \\item $P(B) = ${bondSelectionRate}$
    \\item $P(Success|S) = ${stockSuccessRate}$
    \\item $P(Success|B) = ${bondSuccessRate}$
\\end{itemize}

Thay các giá trị vào, ta có:
\\[
P(Success) = ${stockSuccessRate} \\times ${stockSelectionRate} + ${bondSuccessRate} \\times ${bondSelectionRate}
\\]
\\[
P(Success) = ${(stockSuccessRate * stockSelectionRate).toFixed(4)} + ${(bondSuccessRate * bondSelectionRate).toFixed(4)}
\\]
\\[
P(Success) = ${((stockSuccessRate * stockSelectionRate) + (bondSuccessRate * bondSelectionRate)).toFixed(4)}
\\]

\\textbf{Bước 2: Áp dụng định lý Bayes}

Định lý Bayes cho ta:
\\[
P(S|Success) = \\dfrac{P(Success|S) \\cdot P(S)}{P(Success)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(S|Success) = \\frac{${stockSuccessRate} \\times ${stockSelectionRate}}{${((stockSuccessRate * stockSelectionRate) + (bondSuccessRate * bondSelectionRate)).toFixed(4)}}
\\]
\\[
P(S|Success) = \\frac{${(stockSuccessRate * stockSelectionRate).toFixed(4)}}{${((stockSuccessRate * stockSelectionRate) + (bondSuccessRate * bondSelectionRate)).toFixed(4)}}
\\]
\\[
P(S|Success) \\approx ${P_S_given_Success}
\\]
\\textbf{Kết luận}\\\\
Xác suất nhà đầu tư thành công khi biết họ đã chọn cổ phiếu là khoảng $${(P_S_given_Success * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ nhà đầu tư chọn cổ phiếu là $${(stockSelectionRate * 100).toFixed(2)}\\%$, nhưng khả năng thành công khi chọn trái phiếu vẫn có một tỉ lệ nhất định là $${(bondSuccessRate * 100).toFixed(2)}\\%$. Do đó, khi một nhà đầu tư thành công, khả năng họ đã chọn cổ phiếu là khoảng $${(P_S_given_Success * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_chon_keo(e) {
    // Hàm tạo số ngẫu nhiên trong khoảng nhất định
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Hàm tính xác suất viên kẹo thứ hai là kẹo dâu nếu viên kẹo đầu tiên là kẹo cam
    function calculateProbability(totalStrawberry, totalOrange) {
        const totalCandies = totalStrawberry + totalOrange;
        const P_S = totalStrawberry / totalCandies;
        return P_S.toFixed(4);
    }

    // Tổng số kẹo dâu và kẹo cam ngẫu nhiên trong khoảng 1 đến 10
    const totalStrawberry = generateRandomNumber(5, 20);
    const totalOrange = generateRandomNumber(5, 20);

    // Tính xác suất
    const P_S2 = calculateProbability(totalStrawberry, totalOrange);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một hộp có $${totalStrawberry}$ viên kẹo dâu và $${totalOrange}$ viên kẹo cam. Một viên kẹo được chọn ngẫu nhiên và được trả lại hộp, sau đó một viên kẹo khác được chọn. Tính xác suất viên kẹo thứ hai là kẹo dâu nếu viên kẹo đầu tiên là kẹo cam.\\
\\shortans{$${(P_S2 * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $O_1$ là sự kiện viên kẹo đầu tiên là kẹo cam.
    \\item $S_2$ là sự kiện viên kẹo thứ hai là kẹo dâu.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Số viên kẹo dâu: $${totalStrawberry}$.
    \\item Số viên kẹo cam: $${totalOrange}$.
    \\item Tổng số kẹo: $${totalStrawberry + totalOrange}$.
    \\item Xác suất chọn kẹo dâu: $P(S_2) = \\dfrac{${totalStrawberry}}{${totalStrawberry + totalOrange}} = ${(totalStrawberry / (totalStrawberry + totalOrange)).toFixed(4)}$.
\\end{itemize}
\\textbf{Kết luận}
Xác suất viên kẹo thứ hai là kẹo dâu nếu viên kẹo đầu tiên là kẹo cam là khoảng $${(P_S2 * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_chon_keo_no_return(e) {
    // Hàm tạo số ngẫu nhiên trong khoảng nhất định
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Hàm tính xác suất viên kẹo thứ hai là kẹo dâu nếu viên kẹo đầu tiên là kẹo cam
    function calculateProbability(totalStrawberry, totalOrange) {
        const totalCandies = totalStrawberry + totalOrange;
        const P_O1 = totalOrange / totalCandies;
        const P_S2_given_O1 = totalStrawberry / (totalCandies - 1);

        return P_S2_given_O1.toFixed(4);
    }

    // Tổng số kẹo dâu và kẹo cam ngẫu nhiên trong khoảng 1 đến 10
    const totalStrawberry = generateRandomNumber(5, 20);
    const totalOrange = generateRandomNumber(5, 20);

    // Tính xác suất
    const P_S2_given_O1 = calculateProbability(totalStrawberry, totalOrange);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một hộp có $${totalStrawberry}$ viên kẹo dâu và $${totalOrange}$ viên kẹo cam. Một viên kẹo được chọn ngẫu nhiên và không được trả lại hộp, sau đó một viên kẹo khác được chọn. Tính xác suất viên kẹo thứ hai là kẹo dâu nếu viên kẹo đầu tiên là kẹo cam.\\
\\shortans{$${(P_S2_given_O1 * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $O_1$ là sự kiện viên kẹo đầu tiên là kẹo cam.
    \\item $S_2$ là sự kiện viên kẹo thứ hai là kẹo dâu.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Số viên kẹo dâu: $${totalStrawberry}$.
    \\item Số viên kẹo cam: $${totalOrange}$.
    \\item Tổng số kẹo ban đầu: $${totalStrawberry + totalOrange}$.
    \\item Xác suất chọn kẹo cam lần đầu: $P(O_1) = \\dfrac{${totalOrange}}{${totalStrawberry + totalOrange}} = ${(totalOrange / (totalStrawberry + totalOrange)).toFixed(4)}$.
    \\item Xác suất chọn kẹo dâu lần hai sau khi chọn kẹo cam lần đầu: $P(S_2|O_1) = \\dfrac{${totalStrawberry}}{${totalStrawberry + totalOrange - 1}} = ${(totalStrawberry / (totalStrawberry + totalOrange - 1)).toFixed(4)}$.
\\end{itemize}
\\textbf{Kết luận}\\\\
Xác suất viên kẹo thứ hai là kẹo dâu nếu viên kẹo đầu tiên là kẹo cam là khoảng $${(P_S2_given_O1 * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_thi_qua_mon(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(passRate, passGivenStudy, passGivenNoStudy, studyRate) {
        const P_S = studyRate;
        const P_NS = 1 - P_S;
        const P_P_given_S = passGivenStudy;
        const P_P_given_NS = passGivenNoStudy;

        const P_P = (P_P_given_S * P_S) + (P_P_given_NS * P_NS);
        const P_S_given_P = (P_P_given_S * P_S) / P_P;

        return P_S_given_P.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const studyRate = parseFloat(generateRandomPercentage(0.30, 0.10)); // Xác suất học chăm chỉ
    const passGivenStudy = parseFloat(generateRandomPercentage(0.80, 0.05));
    const passGivenNoStudy = parseFloat(generateRandomPercentage(0.10, 0.02));
    const passRate = 0.20; // Tỷ lệ đậu chung

    // Tính xác suất một sinh viên đậu là họ đã học chăm chỉ
    const P_S_given_P = calculateProbability(passRate, passGivenStudy, passGivenNoStudy, studyRate);
    
    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một trường đại học có tỷ lệ đậu là $${(passRate * 100).toFixed(2)}\\%$. Nếu một sinh viên học chăm chỉ, xác suất đậu là $${(passGivenStudy * 100).toFixed(2)}\\%$. Nếu không học chăm chỉ, xác suất đậu là $${(passGivenNoStudy * 100).toFixed(2)}\\%$. Tính xác suất một sinh viên đậu là họ đã học chăm chỉ.
\\shortans{$${(P_S_given_P * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $S$ là sự kiện sinh viên học chăm chỉ.
    \\item $NS$ là sự kiện sinh viên không học chăm chỉ.
    \\item $P$ là sự kiện sinh viên đậu.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất học chăm chỉ: $P(S) = ${studyRate}$.
    \\item Xác suất không học chăm chỉ: $P(NS) = ${1 - studyRate}$.
    \\item Xác suất đậu nếu học chăm chỉ: $P(P|S) = ${passGivenStudy}$.
    \\item Xác suất đậu nếu không học chăm chỉ: $P(P|NS) = ${passGivenNoStudy}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất đậu $P(P)$}\\\\
Sinh viên đậu có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Sinh viên học chăm chỉ và đậu.
    \\item Sinh viên không học chăm chỉ nhưng vẫn đậu.
\\end{enumerate}
Ta tính xác suất sinh viên đậu bằng cách dùng định lý xác suất toàn phần:
\\[
P(P) = P(P|S)P(S) + P(P|NS)P(NS)
\\]

Ở đây:
\\begin{itemize}
    \\item $P(S) = ${studyRate}$
    \\item $P(NS) = ${1 - studyRate}$
    \\item $P(P|S) = ${passGivenStudy}$
    \\item $P(P|NS) = ${passGivenNoStudy}$
\\end{itemize}

Thay các giá trị vào, ta có:
\\[
P(P) = ${passGivenStudy} \\times ${studyRate} + ${passGivenNoStudy} \\times ${1 - studyRate}
\\]
\\[
P(P) = ${(passGivenStudy * studyRate).toFixed(4)} + ${(passGivenNoStudy * (1 - studyRate)).toFixed(4)}
\\]
\\[
P(P) = ${((passGivenStudy * studyRate) + (passGivenNoStudy * (1 - studyRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}

Định lý Bayes cho ta:
\\[
P(S|P) = \\dfrac{P(P|S) \\cdot P(S)}{P(P)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(S|P) = \\frac{${passGivenStudy} \\times ${studyRate}}{${((passGivenStudy * studyRate) + (passGivenNoStudy * (1 - studyRate))).toFixed(4)}}
\\]
\\[
P(S|P) = \\frac{${(passGivenStudy * studyRate).toFixed(4)}}{${((passGivenStudy * studyRate) + (passGivenNoStudy * (1 - studyRate))).toFixed(4)}}
\\]
\\[
P(S|P) \\approx ${P_S_given_P}
\\]

\\textbf{Kết luận}\\\\
Xác suất một sinh viên đậu là họ đã học chăm chỉ là khoảng $${(P_S_given_P * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ sinh viên học chăm chỉ là $${(studyRate * 100).toFixed(2)}\\%$, nhưng khả năng đậu khi không học chăm chỉ vẫn có một tỉ lệ nhất định là $${(passGivenNoStudy * 100).toFixed(2)}\\%$. Do đó, khi một sinh viên đậu, khả năng họ đã học chăm chỉ là khoảng $${(P_S_given_P * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_trung_thuong_khuyen_mai(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(promotionRate, winGivenParticipation, participateGivenNoWin) {
        const P_P = promotionRate;
        const P_W_given_P = winGivenParticipation;
        const P_NW = 1 - P_W_given_P;
        const P_P_again_given_NW = participateGivenNoWin;

        const P_P_total = (P_W_given_P * P_P) + (P_P_again_given_NW * P_NW);
        const P_W_given_P_total = (P_W_given_P * P_P) / P_P_total;

        return P_W_given_P_total.toFixed(4);
    }

    // Xác suất ngẫu nhiên trong khoảng nhất định
    const promotionRate = parseFloat(generateRandomPercentage(0.01, 0.005));
    const winGivenParticipation = parseFloat(generateRandomPercentage(0.50, 0.05));
    const participateGivenNoWin = parseFloat(generateRandomPercentage(0.10, 0.02));

    // Tính xác suất
    const P_W_given_P_total = calculateProbability(promotionRate, winGivenParticipation, participateGivenNoWin);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một chương trình khuyến mãi có $${(promotionRate * 100).toFixed(2)}\\%$ cơ hội trúng thưởng. Nếu một người tham gia, xác suất họ trúng thưởng là $${(winGivenParticipation * 100).toFixed(2)}\\%$. Nếu họ không trúng thưởng, xác suất họ tham gia lần nữa là $${(participateGivenNoWin * 100).toFixed(2)}\\%$. Tính xác suất một người trúng thưởng khi biết họ đã tham gia.
\\shortans{$${(P_W_given_P_total * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $P$ là sự kiện người tham gia chương trình khuyến mãi.
    \\item $W$ là sự kiện người trúng thưởng.
    \\item $NW$ là sự kiện người không trúng thưởng.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất tham gia chương trình: $P(P) = ${promotionRate}$.
    \\item Xác suất trúng thưởng nếu tham gia: $P(W|P) = ${winGivenParticipation}$.
    \\item Xác suất không trúng thưởng nếu tham gia: $P(NW|P) = ${1 - winGivenParticipation}$.
    \\item Xác suất tham gia lần nữa nếu không trúng thưởng: $P(P|NW) = ${participateGivenNoWin}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất tổng tham gia $P(P_{total})$}\\\\
Người tham gia có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Người tham gia và trúng thưởng.
    \\item Người không trúng thưởng và tham gia lần nữa.
\\end{enumerate}
Ta tính xác suất tổng tham gia bằng cách dùng định lý xác suất toàn phần:
\\[
P(P_{total}) = P(W|P)P(P) + P(P|NW)P(NW|P)
\\]
Ở đây
\\begin{itemize}
    \\item $P(P) = ${promotionRate}$
    \\item $P(W|P) = ${winGivenParticipation}$
    \\item $P(NW|P) = ${1 - winGivenParticipation}$
    \\item $P(P|NW) = ${participateGivenNoWin}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(P_{total}) = ${winGivenParticipation} \\times ${promotionRate} + ${participateGivenNoWin} \\times ${(1 - winGivenParticipation).toFixed(4)}
\\]
\\[
P(P_{total}) = ${(winGivenParticipation * promotionRate).toFixed(4)} + ${(participateGivenNoWin * (1 - winGivenParticipation)).toFixed(4)}
\\]
\\[
P(P_{total}) = ${((winGivenParticipation * promotionRate) + (participateGivenNoWin * (1 - winGivenParticipation))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(W|P_{total}) = \\dfrac{P(W|P) \\cdot P(P)}{P(P_{total})}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(W|P_{total}) = \\frac{${winGivenParticipation} \\times ${promotionRate}}{${((winGivenParticipation * promotionRate) + (participateGivenNoWin * (1 - winGivenParticipation))).toFixed(4)}}
\\]
\\[
P(W|P_{total}) = \\frac{${(winGivenParticipation * promotionRate).toFixed(4)}}{${((winGivenParticipation * promotionRate) + (participateGivenNoWin * (1 - winGivenParticipation))).toFixed(4)}}
\\]
\\[
P(W|P_{total}) \\approx ${P_W_given_P_total}
\\]

\\textbf{Kết luận}\\\\
Xác suất một người trúng thưởng khi biết họ đã tham gia là khoảng $${(P_W_given_P_total * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ tham gia chương trình khuyến mãi là $${(promotionRate * 100).toFixed(2)}\\%$, nhưng khả năng trúng thưởng khi tham gia lần nữa vẫn có một tỉ lệ nhất định là $${(participateGivenNoWin * 100).toFixed(2)}\\%$. Do đó, khi một người tham gia chương trình khuyến mãi, khả năng họ trúng thưởng là khoảng $${(P_W_given_P_total * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_khoi_benh(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tạo số nguyên ngẫu nhiên trong khoảng nhất định
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(highRiskRate, lowRiskRate, successGivenHighRisk, successGivenLowRisk) {
        const P_HR = highRiskRate;
        const P_LR = lowRiskRate;
        const P_S_given_HR = successGivenHighRisk;
        const P_S_given_LR = successGivenLowRisk;

        const P_S = (P_S_given_HR * P_HR) + (P_S_given_LR * P_LR);
        const P_HR_given_S = (P_S_given_HR * P_HR) / P_S;

        return P_HR_given_S.toFixed(4);
    }

    // Tạo các giá trị ngẫu nhiên
    const totalPatients = generateRandomNumber(900, 2000);
    const highRiskRate = parseFloat(generateRandomPercentage(0.25, 0.05)); // Tỷ lệ bệnh nhân thuộc nhóm nguy cơ cao
    const lowRiskRate = 1 - highRiskRate; // Tỷ lệ bệnh nhân thuộc nhóm nguy cơ thấp
    const successGivenHighRisk = parseFloat(generateRandomPercentage(0.85, 0.05)); // Tỷ lệ thành công trong nhóm nguy cơ cao
    const successGivenLowRisk = parseFloat(generateRandomPercentage(0.60, 0.05)); // Tỷ lệ thành công trong nhóm nguy cơ thấp

    // Tính xác suất một bệnh nhân được chữa khỏi là bệnh nhân thuộc nhóm nguy cơ cao
    const P_HR_given_S = calculateProbability(highRiskRate, lowRiskRate, successGivenHighRisk, successGivenLowRisk);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một loại thuốc mới được thử nghiệm trên $${totalPatients}$ bệnh nhân. Trong số đó, $${(highRiskRate * 100).toFixed(2)}\\%$ bệnh nhân thuộc nhóm nguy cơ cao và $${(lowRiskRate * 100).toFixed(2)}\\%$ thuộc nhóm nguy cơ thấp. Nhóm nguy cơ cao có tỷ lệ thành công là $${(successGivenHighRisk * 100).toFixed(2)}\\%$ và nhóm nguy cơ thấp có tỷ lệ thành công là $${(successGivenLowRisk * 100).toFixed(2)}\\%$. Tính xác suất một bệnh nhân được chữa khỏi là bệnh nhân thuộc nhóm nguy cơ cao.
\\shortans{$${(P_HR_given_S * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $HR$ là sự kiện bệnh nhân thuộc nhóm nguy cơ cao.
    \\item $LR$ là sự kiện bệnh nhân thuộc nhóm nguy cơ thấp.
    \\item $S$ là sự kiện bệnh nhân được chữa khỏi.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ bệnh nhân thuộc nhóm nguy cơ cao: $P(HR) = ${highRiskRate}$.
    \\item Tỷ lệ bệnh nhân thuộc nhóm nguy cơ thấp: $P(LR) = ${lowRiskRate}$.
    \\item Xác suất chữa khỏi nếu thuộc nhóm nguy cơ cao: $P(S|HR) = ${successGivenHighRisk}$.
    \\item Xác suất chữa khỏi nếu thuộc nhóm nguy cơ thấp: $P(S|LR) = ${successGivenLowRisk}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất chữa khỏi $P(S)$}\\\\
Bệnh nhân được chữa khỏi có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Bệnh nhân thuộc nhóm nguy cơ cao và được chữa khỏi.
    \\item Bệnh nhân thuộc nhóm nguy cơ thấp và được chữa khỏi.
\\end{enumerate}
Ta tính xác suất bệnh nhân được chữa khỏi bằng cách dùng định lý xác suất toàn phần:
\\[
P(S) = P(S|HR)P(HR) + P(S|LR)P(LR)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(HR) = ${highRiskRate}$
    \\item $P(LR) = ${lowRiskRate}$
    \\item $P(S|HR) = ${successGivenHighRisk}$
    \\item $P(S|LR) = ${successGivenLowRisk}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(S) = ${successGivenHighRisk} \\times ${highRiskRate} + ${successGivenLowRisk} \\times ${lowRiskRate}
\\]
\\[
P(S) = ${(successGivenHighRisk * highRiskRate).toFixed(4)} + ${(successGivenLowRisk * lowRiskRate).toFixed(4)}
\\]
\\[
P(S) = ${((successGivenHighRisk * highRiskRate) + (successGivenLowRisk * lowRiskRate)).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(HR|S) = \\dfrac{P(S|HR) \\cdot P(HR)}{P(S)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(HR|S) = \\frac{${successGivenHighRisk} \\times ${highRiskRate}}{${((successGivenHighRisk * highRiskRate) + (successGivenLowRisk * lowRiskRate)).toFixed(4)}}
\\]
\\[
P(HR|S) = \\frac{${(successGivenHighRisk * highRiskRate).toFixed(4)}}{${((successGivenHighRisk * highRiskRate) + (successGivenLowRisk * lowRiskRate)).toFixed(4)}}
\\]
\\[
P(HR|S) \\approx ${P_HR_given_S}
\\]
\\textbf{Kết luận}\\\\
Xác suất một bệnh nhân được chữa khỏi là bệnh nhân thuộc nhóm nguy cơ cao là khoảng $${(P_HR_given_S * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ bệnh nhân thuộc nhóm nguy cơ cao là $${(highRiskRate * 100).toFixed(2)}\\%$, nhưng khả năng chữa khỏi khi thuộc nhóm nguy cơ thấp vẫn có một tỉ lệ nhất định là $${(successGivenLowRisk * 100).toFixed(2)}\\%$. Do đó, khi một bệnh nhân được chữa khỏi, khả năng họ thuộc nhóm nguy cơ cao là khoảng $${(P_HR_given_S * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_tham_du_hoithao(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tạo số nguyên ngẫu nhiên trong khoảng nhất định
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(attendanceRate, purchaseGivenAttend, purchaseGivenNoAttend) {
        const P_A = attendanceRate;
        const P_NA = 1 - P_A;
        const P_P_given_A = purchaseGivenAttend;
        const P_P_given_NA = purchaseGivenNoAttend;

        const P_P = (P_P_given_A * P_A) + (P_P_given_NA * P_NA);
        const P_A_given_P = (P_P_given_A * P_A) / P_P;

        return P_A_given_P.toFixed(4);
    }

    // Tạo các giá trị ngẫu nhiên
    const totalInvited = generateRandomNumber(900, 1500); // Số khách mời ngẫu nhiên trong khoảng từ 900 đến 1100
    const totalAttended = generateRandomNumber(400, 1000); // Số khách tham dự ngẫu nhiên trong khoảng từ 180 đến 220
    const attendanceRate = totalAttended / totalInvited; // Tỷ lệ tham dự
    const purchaseGivenAttend = parseFloat(generateRandomPercentage(0.40, 0.05)); // Tỷ lệ mua sản phẩm nếu tham dự
    const purchaseGivenNoAttend = parseFloat(generateRandomPercentage(0.10, 0.05)); // Tỷ lệ mua sản phẩm nếu không tham dự

    // Tính xác suất một khách hàng mua sản phẩm đã tham dự hội thảo
    const P_A_given_P = calculateProbability(attendanceRate, purchaseGivenAttend, purchaseGivenNoAttend);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty tổ chức hội thảo và mời $${totalInvited}$ khách hàng. Trong số đó, $${totalAttended}$ khách hàng tham dự. Nếu khách hàng tham dự, xác suất họ mua sản phẩm là $${(purchaseGivenAttend * 100).toFixed(2)}\\%$. Nếu không tham dự, xác suất họ mua sản phẩm là $${(purchaseGivenNoAttend * 100).toFixed(2)}\\%$. Tính xác suất một khách hàng mua sản phẩm đã tham dự hội thảo.
\\shortans{$${(P_A_given_P * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $A$ là sự kiện khách hàng tham dự hội thảo.
    \\item $NA$ là sự kiện khách hàng không tham dự hội thảo.
    \\item $P$ là sự kiện khách hàng mua sản phẩm.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ khách hàng tham dự: $P(A) = ${attendanceRate}$.
    \\item Tỷ lệ khách hàng không tham dự: $P(NA) = ${1 - attendanceRate}$.
    \\item Xác suất mua sản phẩm nếu tham dự: $P(P|A) = ${purchaseGivenAttend}$.
    \\item Xác suất mua sản phẩm nếu không tham dự: $P(P|NA) = ${purchaseGivenNoAttend}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất mua sản phẩm $P(P)$}\\\\
Khách hàng mua sản phẩm có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Khách hàng tham dự hội thảo và mua sản phẩm.
    \\item Khách hàng không tham dự hội thảo nhưng vẫn mua sản phẩm.
\\end{enumerate}
Ta tính xác suất khách hàng mua sản phẩm bằng cách dùng định lý xác suất toàn phần:
\\[
P(P) = P(P|A)P(A) + P(P|NA)P(NA)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(A) = ${attendanceRate}$
    \\item $P(NA) = ${1 - attendanceRate}$
    \\item $P(P|A) = ${purchaseGivenAttend}$
    \\item $P(P|NA) = ${purchaseGivenNoAttend}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(P) = ${purchaseGivenAttend} \\times ${attendanceRate} + ${purchaseGivenNoAttend} \\times ${1 - attendanceRate}
\\]
\\[
P(P) = ${(purchaseGivenAttend * attendanceRate).toFixed(4)} + ${(purchaseGivenNoAttend * (1 - attendanceRate)).toFixed(4)}
\\]
\\[
P(P) = ${((purchaseGivenAttend * attendanceRate) + (purchaseGivenNoAttend * (1 - attendanceRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(A|P) = \\dfrac{P(P|A) \\cdot P(A)}{P(P)}
\\]
Thay các giá trị đã biết vào, ta có:
\\[
P(A|P) = \\frac{${purchaseGivenAttend} \\times ${attendanceRate}}{${((purchaseGivenAttend * attendanceRate) + (purchaseGivenNoAttend * (1 - attendanceRate))).toFixed(4)}}
\\]
\\[
P(A|P) = \\frac{${(purchaseGivenAttend * attendanceRate).toFixed(4)}}{${((purchaseGivenAttend * attendanceRate) + (purchaseGivenNoAttend * (1 - attendanceRate))).toFixed(4)}}
\\]
\\[
P(A|P) \\approx ${P_A_given_P}
\\]
\\textbf{Kết luận}\\\\
Xác suất một khách hàng mua sản phẩm đã tham dự hội thảo là khoảng $${(P_A_given_P * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ khách hàng tham dự hội thảo là $${(attendanceRate * 100).toFixed(2)}\\%$, nhưng khả năng mua sản phẩm khi không tham dự vẫn có một tỉ lệ nhất định là $${(purchaseGivenNoAttend * 100).toFixed(2)}\\%$. Do đó, khi một khách hàng mua sản phẩm, khả năng họ đã tham dự hội thảo là khoảng $${(P_A_given_P * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;
    return question;
}
function xs_khach_hang_quay_lai(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(satisfactionRate, returnGivenSatisfied, returnGivenDissatisfied) {
        const P_S = satisfactionRate;
        const P_DS = 1 - P_S;
        const P_R_given_S = returnGivenSatisfied;
        const P_R_given_DS = returnGivenDissatisfied;

        const P_R = (P_R_given_S * P_S) + (P_R_given_DS * P_DS);
        const P_S_given_R = (P_R_given_S * P_S) / P_R;

        return P_S_given_R.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const satisfactionRate = parseFloat(generateRandomPercentage(0.70, 0.05)); // Tỷ lệ khách hàng hài lòng
    const returnGivenSatisfied = parseFloat(generateRandomPercentage(0.90, 0.05)); // Tỷ lệ quay lại nếu hài lòng
    const returnGivenDissatisfied = parseFloat(generateRandomPercentage(0.20, 0.05)); // Tỷ lệ quay lại nếu không hài lòng

    // Tính xác suất một khách hàng quay lại là họ hài lòng với dịch vụ
    const P_S_given_R = calculateProbability(satisfactionRate, returnGivenSatisfied, returnGivenDissatisfied);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty thực hiện khảo sát và phát hiện rằng $${(satisfactionRate * 100).toFixed(2)}\\%$ khách hàng hài lòng với dịch vụ của họ. Trong số những khách hàng hài lòng, $${(returnGivenSatisfied * 100).toFixed(2)}\\%$ sẽ quay lại sử dụng dịch vụ. Trong số những khách hàng không hài lòng, chỉ $${(returnGivenDissatisfied * 100).toFixed(2)}\\%$ sẽ quay lại. Tính xác suất một khách hàng quay lại là họ hài lòng với dịch vụ.
\\shortans{$${(P_S_given_R * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $S$ là sự kiện khách hàng hài lòng với dịch vụ.
    \\item $DS$ là sự kiện khách hàng không hài lòng với dịch vụ.
    \\item $R$ là sự kiện khách hàng quay lại sử dụng dịch vụ.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ khách hàng hài lòng: $P(S) = ${satisfactionRate}$.
    \\item Tỷ lệ khách hàng không hài lòng: $P(DS) = ${1 - satisfactionRate}$.
    \\item Xác suất quay lại nếu hài lòng: $P(R|S) = ${returnGivenSatisfied}$.
    \\item Xác suất quay lại nếu không hài lòng: $P(R|DS) = ${returnGivenDissatisfied}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất quay lại $P(R)$}\\\\
Khách hàng quay lại có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Khách hàng hài lòng với dịch vụ và quay lại.
    \\item Khách hàng không hài lòng với dịch vụ nhưng vẫn quay lại.
\\end{enumerate}

Ta tính xác suất khách hàng quay lại bằng cách dùng định lý xác suất toàn phần:
\\[
P(R) = P(R|S)P(S) + P(R|DS)P(DS)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(S) = ${satisfactionRate}$
    \\item $P(DS) = ${1 - satisfactionRate}$
    \\item $P(R|S) = ${returnGivenSatisfied}$
    \\item $P(R|DS) = ${returnGivenDissatisfied}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(R) = ${returnGivenSatisfied} \\times ${satisfactionRate} + ${returnGivenDissatisfied} \\times ${1 - satisfactionRate}
\\]
\\[
P(R) = ${(returnGivenSatisfied * satisfactionRate).toFixed(4)} + ${(returnGivenDissatisfied * (1 - satisfactionRate)).toFixed(4)}
\\]
\\[
P(R) = ${((returnGivenSatisfied * satisfactionRate) + (returnGivenDissatisfied * (1 - satisfactionRate))).toFixed(4)}
\\]

\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(S|R) = \\dfrac{P(R|S) \\cdot P(S)}{P(R)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(S|R) = \\frac{${returnGivenSatisfied} \\times ${satisfactionRate}}{${((returnGivenSatisfied * satisfactionRate) + (returnGivenDissatisfied * (1 - satisfactionRate))).toFixed(4)}}
\\]
\\[
P(S|R) = \\frac{${(returnGivenSatisfied * satisfactionRate).toFixed(4)}}{${((returnGivenSatisfied * satisfactionRate) + (returnGivenDissatisfied * (1 - satisfactionRate))).toFixed(4)}}
\\]
\\[
P(S|R) \\approx ${P_S_given_R}
\\]

\\textbf{Kết luận}\\\\
Xác suất một khách hàng quay lại là họ hài lòng với dịch vụ là khoảng $${(P_S_given_R * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ khách hàng hài lòng với dịch vụ là $${(satisfactionRate * 100).toFixed(2)}\\%$, nhưng khả năng quay lại khi không hài lòng vẫn có một tỉ lệ nhất định là $${(returnGivenDissatisfied * 100).toFixed(2)}\\%$. Do đó, khi một khách hàng quay lại, khả năng họ hài lòng với dịch vụ là khoảng $${(P_S_given_R * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_khao_sat_mua_sanpham(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(interestRate, buyGivenInterest, buyGivenNoInterest) {
        const P_I = interestRate;
        const P_NI = 1 - P_I;
        const P_B_given_I = buyGivenInterest;
        const P_B_given_NI = buyGivenNoInterest;

        const P_B = (P_B_given_I * P_I) + (P_B_given_NI * P_NI);
        const P_I_given_B = (P_B_given_I * P_I) / P_B;

        return P_I_given_B.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const interestRate = parseFloat(generateRandomPercentage(0.30, 0.05)); // Tỷ lệ khách hàng quan tâm
    const buyGivenInterest = parseFloat(generateRandomPercentage(0.60, 0.05)); // Tỷ lệ mua sản phẩm nếu quan tâm
    const buyGivenNoInterest = parseFloat(generateRandomPercentage(0.20, 0.05)); // Tỷ lệ mua sản phẩm nếu không quan tâm

    // Tính xác suất một khách hàng mua sản phẩm mới là họ quan tâm đến sản phẩm
    const P_I_given_B = calculateProbability(interestRate, buyGivenInterest, buyGivenNoInterest);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty thực hiện khảo sát thị trường và phát hiện rằng $${(interestRate * 100).toFixed(2)}\\%$ khách hàng quan tâm đến sản phẩm mới. Trong số những khách hàng quan tâm, $${(buyGivenInterest * 100).toFixed(2)}\\%$ sẽ mua sản phẩm. Trong số những khách hàng không quan tâm, chỉ $${(buyGivenNoInterest * 100).toFixed(2)}\\%$ sẽ mua sản phẩm. Tính xác suất một khách hàng mua sản phẩm mới là họ quan tâm đến sản phẩm.
\\shortans{$${(P_I_given_B * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $I$ là sự kiện khách hàng quan tâm đến sản phẩm.
    \\item $NI$ là sự kiện khách hàng không quan tâm đến sản phẩm.
    \\item $B$ là sự kiện khách hàng mua sản phẩm.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ khách hàng quan tâm: $P(I) = ${interestRate}$.
    \\item Tỷ lệ khách hàng không quan tâm: $P(NI) = ${1 - interestRate}$.
    \\item Xác suất mua sản phẩm nếu quan tâm: $P(B|I) = ${buyGivenInterest}$.
    \\item Xác suất mua sản phẩm nếu không quan tâm: $P(B|NI) = ${buyGivenNoInterest}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất mua sản phẩm $P(B)$}\\\\
Khách hàng mua sản phẩm có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Khách hàng quan tâm đến sản phẩm và mua sản phẩm.
    \\item Khách hàng không quan tâm đến sản phẩm nhưng vẫn mua sản phẩm.
\\end{enumerate}

Ta tính xác suất khách hàng mua sản phẩm bằng cách dùng định lý xác suất toàn phần:
\\[
P(B) = P(B|I)P(I) + P(B|NI)P(NI)
\\]

Ở đây:
\\begin{itemize}
    \\item $P(I) = ${interestRate}$
    \\item $P(NI) = ${1 - interestRate}$
    \\item $P(B|I) = ${buyGivenInterest}$
    \\item $P(B|NI) = ${buyGivenNoInterest}$
\\end{itemize}

Thay các giá trị vào, ta có:
\\[
P(B) = ${buyGivenInterest} \\times ${interestRate} + ${buyGivenNoInterest} \\times ${1 - interestRate}
\\]
\\[
P(B) = ${(buyGivenInterest * interestRate).toFixed(4)} + ${(buyGivenNoInterest * (1 - interestRate)).toFixed(4)}
\\]
\\[
P(B) = ${((buyGivenInterest * interestRate) + (buyGivenNoInterest * (1 - interestRate))).toFixed(4)}
\\]

\\textbf{Bước 2: Áp dụng định lý Bayes}

Định lý Bayes cho ta:
\\[
P(I|B) = \\dfrac{P(B|I) \\cdot P(I)}{P(B)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(I|B) = \\frac{${buyGivenInterest} \\times ${interestRate}}{${((buyGivenInterest * interestRate) + (buyGivenNoInterest * (1 - interestRate))).toFixed(4)}}
\\]
\\[
P(I|B) = \\frac{${(buyGivenInterest * interestRate).toFixed(4)}}{${((buyGivenInterest * interestRate) + (buyGivenNoInterest * (1 - interestRate))).toFixed(4)}}
\\]
\\[
P(I|B) \\approx ${P_I_given_B}
\\]

\\textbf{Kết luận}\\\\
Xác suất một khách hàng mua sản phẩm mới là họ quan tâm đến sản phẩm là khoảng $${(P_I_given_B * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ khách hàng quan tâm đến sản phẩm mới là $${(interestRate * 100).toFixed(2)}\\%$, nhưng khả năng mua sản phẩm khi không quan tâm vẫn có một tỉ lệ nhất định là $${(buyGivenNoInterest * 100).toFixed(2)}\\%$. Do đó, khi một khách hàng mua sản phẩm, khả năng họ quan tâm đến sản phẩm là khoảng $${(P_I_given_B * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_baohanh_san_pham(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(defectRate, warrantyGivenDefect, warrantyGivenNoDefect) {
        const P_D = defectRate;
        const P_ND = 1 - P_D;
        const P_W_given_D = warrantyGivenDefect;
        const P_W_given_ND = warrantyGivenNoDefect;

        const P_W = (P_W_given_D * P_D) + (P_W_given_ND * P_ND);
        const P_D_given_W = (P_W_given_D * P_D) / P_W;

        return P_D_given_W.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const defectRate = parseFloat(generateRandomPercentage(0.03, 0.01)); // Tỷ lệ lỗi sản phẩm
    const warrantyGivenDefect = parseFloat(generateRandomPercentage(0.90, 0.05)); // Xác suất yêu cầu bảo hành nếu sản phẩm bị lỗi
    const warrantyGivenNoDefect = parseFloat(generateRandomPercentage(0.01, 0.005)); // Xác suất yêu cầu bảo hành nếu sản phẩm không bị lỗi

    // Tính xác suất sản phẩm bị lỗi khi khách hàng yêu cầu bảo hành
    const P_D_given_W = calculateProbability(defectRate, warrantyGivenDefect, warrantyGivenNoDefect);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty sản xuất điện thoại di động có tỷ lệ lỗi sản phẩm là $${(defectRate * 100).toFixed(2)}\\%$. Khách hàng có thể yêu cầu bảo hành nếu sản phẩm bị lỗi. Xác suất khách hàng yêu cầu bảo hành khi sản phẩm bị lỗi là $${(warrantyGivenDefect * 100).toFixed(2)}\\%$. Nếu sản phẩm không bị lỗi, xác suất khách hàng yêu cầu bảo hành là $${(warrantyGivenNoDefect * 100).toFixed(2)}\\%$. Tính xác suất sản phẩm bị lỗi khi khách hàng yêu cầu bảo hành.
\\shortans{$${(P_D_given_W * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $D$ là sự kiện sản phẩm bị lỗi.
    \\item $ND$ là sự kiện sản phẩm không bị lỗi.
    \\item $W$ là sự kiện khách hàng yêu cầu bảo hành.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ sản phẩm bị lỗi: $P(D) = ${defectRate}$.
    \\item Tỷ lệ sản phẩm không bị lỗi: $P(ND) = ${1 - defectRate}$.
    \\item Xác suất yêu cầu bảo hành nếu sản phẩm bị lỗi: $P(W|D) = ${warrantyGivenDefect}$.
    \\item Xác suất yêu cầu bảo hành nếu sản phẩm không bị lỗi: $P(W|ND) = ${warrantyGivenNoDefect}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất yêu cầu bảo hành $P(W)$}\\\\
Khách hàng yêu cầu bảo hành có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Sản phẩm bị lỗi và khách hàng yêu cầu bảo hành.
    \\item Sản phẩm không bị lỗi nhưng khách hàng vẫn yêu cầu bảo hành.
\\end{enumerate}

Ta tính xác suất khách hàng yêu cầu bảo hành bằng cách dùng định lý xác suất toàn phần:
\\[
P(W) = P(W|D)P(D) + P(W|ND)P(ND)
\\]
Ở đây:
\\begin{itemize}
    \\item $P(D) = ${defectRate}$
    \\item $P(ND) = ${1 - defectRate}$
    \\item $P(W|D) = ${warrantyGivenDefect}$
    \\item $P(W|ND) = ${warrantyGivenNoDefect}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(W) = ${warrantyGivenDefect} \\times ${defectRate} + ${warrantyGivenNoDefect} \\times ${1 - defectRate}
\\]
\\[
P(W) = ${(warrantyGivenDefect * defectRate).toFixed(4)} + ${(warrantyGivenNoDefect * (1 - defectRate)).toFixed(4)}
\\]
\\[
P(W) = ${((warrantyGivenDefect * defectRate) + (warrantyGivenNoDefect * (1 - defectRate))).toFixed(4)}
\\]

\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(D|W) = \\dfrac{P(W|D) \\cdot P(D)}{P(W)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(D|W) = \\frac{${warrantyGivenDefect} \\times ${defectRate}}{${((warrantyGivenDefect * defectRate) + (warrantyGivenNoDefect * (1 - defectRate))).toFixed(4)}}
\\]
\\[
P(D|W) = \\frac{${(warrantyGivenDefect * defectRate).toFixed(4)}}{${((warrantyGivenDefect * defectRate) + (warrantyGivenNoDefect * (1 - defectRate))).toFixed(4)}}
\\]
\\[
P(D|W) \\approx ${P_D_given_W}
\\]
\\textbf{Kết luận}\\\\
Xác suất sản phẩm bị lỗi khi khách hàng yêu cầu bảo hành là khoảng $${(P_D_given_W * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ sản phẩm bị lỗi là $${(defectRate * 100).toFixed(2)}\\%$, nhưng khả năng yêu cầu bảo hành khi sản phẩm không bị lỗi vẫn có một tỉ lệ nhất định là $${(warrantyGivenNoDefect * 100).toFixed(2)}\\%$. Do đó, khi một khách hàng yêu cầu bảo hành, khả năng sản phẩm bị lỗi là khoảng $${(P_D_given_W * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_mua_sp_huuco_voco(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(organicRate, satisfiedGivenOrganic, satisfiedGivenNonOrganic) {
        const P_O = organicRate;
        const P_NO = 1 - P_O;
        const P_S_given_O = satisfiedGivenOrganic;
        const P_S_given_NO = satisfiedGivenNonOrganic;

        const P_S = (P_S_given_O * P_O) + (P_S_given_NO * P_NO);
        const P_O_given_S = (P_S_given_O * P_O) / P_S;

        return P_O_given_S.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const organicRate = parseFloat(generateRandomPercentage(0.60, 0.05)); // Tỷ lệ khách hàng mua thực phẩm hữu cơ
    const satisfiedGivenOrganic = parseFloat(generateRandomPercentage(0.70, 0.05)); // Tỷ lệ hài lòng nếu mua thực phẩm hữu cơ
    const satisfiedGivenNonOrganic = parseFloat(generateRandomPercentage(0.50, 0.05)); // Tỷ lệ hài lòng nếu mua thực phẩm không hữu cơ

    // Tính xác suất một khách hàng hài lòng với sản phẩm đã mua thực phẩm hữu cơ
    const P_O_given_S = calculateProbability(organicRate, satisfiedGivenOrganic, satisfiedGivenNonOrganic);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một cửa hàng có $${(organicRate * 100).toFixed(2)}\\%$ khách hàng mua thực phẩm hữu cơ và $${((1 - organicRate) * 100).toFixed(2)}\\%$ khách hàng mua thực phẩm không hữu cơ. Trong số những khách hàng mua thực phẩm hữu cơ, $${(satisfiedGivenOrganic * 100).toFixed(2)}\\%$ hài lòng với sản phẩm. Trong số những khách hàng mua thực phẩm không hữu cơ, $${(satisfiedGivenNonOrganic * 100).toFixed(2)}\\%$ hài lòng với sản phẩm. Tính xác suất một khách hàng hài lòng với sản phẩm đã mua thực phẩm hữu cơ.
\\shortans{$${(P_O_given_S * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $O$ là sự kiện khách hàng mua thực phẩm hữu cơ.
    \\item $NO$ là sự kiện khách hàng mua thực phẩm không hữu cơ.
    \\item $S$ là sự kiện khách hàng hài lòng với sản phẩm.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ khách hàng mua thực phẩm hữu cơ: $P(O) = ${organicRate}$.
    \\item Tỷ lệ khách hàng mua thực phẩm không hữu cơ: $P(NO) = ${1 - organicRate}$.
    \\item Xác suất hài lòng nếu mua thực phẩm hữu cơ: $P(S|O) = ${satisfiedGivenOrganic}$.
    \\item Xác suất hài lòng nếu mua thực phẩm không hữu cơ: $P(S|NO) = ${satisfiedGivenNonOrganic}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất hài lòng $P(S)$}\\\\
Khách hàng hài lòng có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Khách hàng mua thực phẩm hữu cơ và hài lòng.
    \\item Khách hàng mua thực phẩm không hữu cơ nhưng vẫn hài lòng.
\\end{enumerate}

Ta tính xác suất khách hàng hài lòng bằng cách dùng định lý xác suất toàn phần:
\\[
P(S) = P(S|O)P(O) + P(S|NO)P(NO)
\\]

Ở đây:
\\begin{itemize}
    \\item $P(O) = ${organicRate}$
    \\item $P(NO) = ${1 - organicRate}$
    \\item $P(S|O) = ${satisfiedGivenOrganic}$
    \\item $P(S|NO) = ${satisfiedGivenNonOrganic}$
\\end{itemize}

Thay các giá trị vào, ta có:
\\[
P(S) = ${satisfiedGivenOrganic} \\times ${organicRate} + ${satisfiedGivenNonOrganic} \\times ${1 - organicRate}
\\]
\\[
P(S) = ${(satisfiedGivenOrganic * organicRate).toFixed(4)} + ${(satisfiedGivenNonOrganic * (1 - organicRate)).toFixed(4)}
\\]
\\[
P(S) = ${((satisfiedGivenOrganic * organicRate) + (satisfiedGivenNonOrganic * (1 - organicRate))).toFixed(4)}
\\]

\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(O|S) = \\dfrac{P(S|O) \\cdot P(O)}{P(S)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(O|S) = \\frac{${satisfiedGivenOrganic} \\times ${organicRate}}{${((satisfiedGivenOrganic * organicRate) + (satisfiedGivenNonOrganic * (1 - organicRate))).toFixed(4)}}
\\]
\\[
P(O|S) = \\frac{${(satisfiedGivenOrganic * organicRate).toFixed(4)}}{${((satisfiedGivenOrganic * organicRate) + (satisfiedGivenNonOrganic * (1 - organicRate))).toFixed(4)}}
\\]
\\[
P(O|S) \\approx ${P_O_given_S}
\\]
\\textbf{Kết luận}\\\\
Xác suất một khách hàng hài lòng với sản phẩm đã mua thực phẩm hữu cơ là khoảng $${(P_O_given_S * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ khách hàng mua thực phẩm hữu cơ là $${(organicRate * 100).toFixed(2)}\\%$, nhưng khả năng hài lòng khi mua thực phẩm không hữu cơ vẫn có một tỉ lệ nhất định là $${(satisfiedGivenNonOrganic * 100).toFixed(2)}\\%$. Do đó, khi một khách hàng hài lòng với sản phẩm, khả năng họ đã mua thực phẩm hữu cơ là khoảng $${(P_O_given_S * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}
function xs_hs_tb_gioi_quamon(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất theo định lý Bayes
    function calculateProbability(goodRate, passGivenGood, passGivenAverage) {
        const P_G = goodRate;
        const P_A = 1 - P_G;
        const P_P_given_G = passGivenGood;
        const P_P_given_A = passGivenAverage;

        const P_P = (P_P_given_G * P_G) + (P_P_given_A * P_A);
        const P_G_given_P = (P_P_given_G * P_G) / P_P;

        return P_G_given_P.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên
    const goodRate = parseFloat(generateRandomPercentage(0.30, 0.05)); // Tỷ lệ học sinh học khá giỏi
    const passGivenGood = parseFloat(generateRandomPercentage(0.90, 0.05)); // Tỷ lệ vượt qua kỳ thi nếu học sinh khá giỏi
    const passGivenAverage = parseFloat(generateRandomPercentage(0.50, 0.05)); // Tỷ lệ vượt qua kỳ thi nếu học sinh trung bình, yếu

    // Tính xác suất một học sinh vượt qua kỳ thi là học sinh khá giỏi
    const P_G_given_P = calculateProbability(goodRate, passGivenGood, passGivenAverage);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một lớp học có $${(goodRate * 100).toFixed(2)}\\%$ học sinh học khá giỏi và $${((1 - goodRate) * 100).toFixed(2)}\\%$ học sinh trung bình, yếu. Trong số học sinh học khá giỏi, $${(passGivenGood * 100).toFixed(2)}\\%$ sẽ vượt qua kỳ thi. Trong số học sinh trung bình, yếu, chỉ $${(passGivenAverage * 100).toFixed(2)}\\%$ sẽ vượt qua kỳ thi. Tính xác suất một học sinh vượt qua kỳ thi là học sinh khá giỏi.
\\shortans{$${(P_G_given_P * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $G$ là sự kiện học sinh học khá giỏi.
    \\item $A$ là sự kiện học sinh trung bình, yếu.
    \\item $P$ là sự kiện học sinh vượt qua kỳ thi.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Tỷ lệ học sinh học khá giỏi: $P(G) = ${goodRate}$.
    \\item Tỷ lệ học sinh trung bình, yếu: $P(A) = ${1 - goodRate}$.
    \\item Xác suất vượt qua kỳ thi nếu học sinh học khá giỏi: $P(P|G) = ${passGivenGood}$.
    \\item Xác suất vượt qua kỳ thi nếu học sinh trung bình, yếu: $P(P|A) = ${passGivenAverage}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất vượt qua kỳ thi $P(P)$}\\\\
Học sinh vượt qua kỳ thi có thể xảy ra theo hai cách:
\\begin{enumerate}
    \\item Học sinh học khá giỏi và vượt qua kỳ thi.
    \\item Học sinh trung bình, yếu và vượt qua kỳ thi.
\\end{enumerate}
Ta tính xác suất học sinh vượt qua kỳ thi bằng cách dùng định lý xác suất toàn phần:
\\[
P(P) = P(P|G)P(G) + P(P|A)P(A)
\\]
Ở đây
\\begin{itemize}
    \\item $P(G) = ${goodRate}$
    \\item $P(A) = ${1 - goodRate}$
    \\item $P(P|G) = ${passGivenGood}$
    \\item $P(P|A) = ${passGivenAverage}$
\\end{itemize}

Thay các giá trị vào, ta có:
\\[
P(P) = ${passGivenGood} \\times ${goodRate} + ${passGivenAverage} \\times ${1 - goodRate}
\\]
\\[
P(P) = ${(passGivenGood * goodRate).toFixed(4)} + ${(passGivenAverage * (1 - goodRate)).toFixed(4)}
\\]
\\[
P(P) = ${((passGivenGood * goodRate) + (passGivenAverage * (1 - goodRate))).toFixed(4)}
\\]
\\textbf{Bước 2: Áp dụng định lý Bayes}\\\\
Định lý Bayes cho ta:
\\[
P(G|P) = \\dfrac{P(P|G) \\cdot P(G)}{P(P)}
\\]

Thay các giá trị đã biết vào, ta có:
\\[
P(G|P) = \\frac{${passGivenGood} \\times ${goodRate}}{${((passGivenGood * goodRate) + (passGivenAverage * (1 - goodRate))).toFixed(4)}}
\\]
\\[
P(G|P) = \\frac{${(passGivenGood * goodRate).toFixed(4)}}{${((passGivenGood * goodRate) + (passGivenAverage * (1 - goodRate))).toFixed(4)}}
\\]
\\[
P(G|P) \\approx ${P_G_given_P}
\\]
\\textbf{Kết luận}\\\\
Xác suất một học sinh vượt qua kỳ thi là học sinh khá giỏi là khoảng $${(P_G_given_P * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Tỷ lệ học sinh học khá giỏi là $${(goodRate * 100).toFixed(2)}\\%$, nhưng khả năng vượt qua kỳ thi khi học sinh trung bình, yếu vẫn có một tỉ lệ nhất định là $${(passGivenAverage * 100).toFixed(2)}\\%$. Do đó, khi một học sinh vượt qua kỳ thi, khả năng họ học khá giỏi là khoảng $${(P_G_given_P * 100).toFixed(1)}\\%$.
}
\\end{ex}
    `;

    return question;
}

function xs_chon_nhan_vien_tot(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất ứng viên ngẫu nhiên có kỹ năng tốt
    function calculateProbability(applicantARate, applicantBRate, applicantCRate, goodSkillsA, goodSkillsB, goodSkillsC) {
        const P_A = applicantARate;
        const P_B = applicantBRate;
        const P_C = applicantCRate;
        const P_G_given_A = goodSkillsA;
        const P_G_given_B = goodSkillsB;
        const P_G_given_C = goodSkillsC;

        const P_G = (P_G_given_A * P_A) + (P_G_given_B * P_B) + (P_G_given_C * P_C);

        return P_G.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const applicantARate = parseFloat(generateRandomPercentage(0.30, 0.05)); // Xác suất trúng tuyển của ứng viên A
    const applicantBRate = parseFloat(generateRandomPercentage(0.50, 0.05)); // Xác suất trúng tuyển của ứng viên B
    const applicantCRate = parseFloat(generateRandomPercentage(0.20, 0.05)); // Xác suất trúng tuyển của ứng viên C
    const goodSkillsA = parseFloat(generateRandomPercentage(0.80, 0.05)); // Xác suất ứng viên A có kỹ năng tốt
    const goodSkillsB = parseFloat(generateRandomPercentage(0.60, 0.05)); // Xác suất ứng viên B có kỹ năng tốt
    const goodSkillsC = parseFloat(generateRandomPercentage(0.40, 0.05)); // Xác suất ứng viên C có kỹ năng tốt

    // Tính xác suất một ứng viên ngẫu nhiên có kỹ năng tốt
    const P_G = calculateProbability(applicantARate, applicantBRate, applicantCRate, goodSkillsA, goodSkillsB, goodSkillsC);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty có ba loại ứng viên là $A$, $B$, và $C$. Xác suất trúng tuyển của mỗi loại ứng viên lần lượt là $${(applicantARate * 100).toFixed(2)}\\%$, $${(applicantBRate * 100).toFixed(2)}\\%$ và $${(applicantCRate * 100).toFixed(2)}\\%$. Xác suất ứng viên A có kỹ năng tốt là $${(goodSkillsA * 100).toFixed(2)}\\%$, ứng viên B là $${(goodSkillsB * 100).toFixed(2)}\\%$ và ứng viên C là $${(goodSkillsC * 100).toFixed(2)}\\%$. Tính xác suất một ứng viên ngẫu nhiên có kỹ năng tốt.
\\shortans{$${(P_G * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $A$ là sự kiện ứng viên loại A.
    \\item $B$ là sự kiện ứng viên loại B.
    \\item $C$ là sự kiện ứng viên loại C.
    \\item $G$ là sự kiện ứng viên có kỹ năng tốt.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất trúng tuyển của ứng viên loại A: $P(A) = ${applicantARate}$.
    \\item Xác suất trúng tuyển của ứng viên loại B: $P(B) = ${applicantBRate}$.
    \\item Xác suất trúng tuyển của ứng viên loại C: $P(C) = ${applicantCRate}$.
    \\item Xác suất ứng viên A có kỹ năng tốt: $P(G|A) = ${goodSkillsA}$.
    \\item Xác suất ứng viên B có kỹ năng tốt: $P(G|B) = ${goodSkillsB}$.
    \\item Xác suất ứng viên C có kỹ năng tốt: $P(G|C) = ${goodSkillsC}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất ứng viên có kỹ năng tốt $P(G)$}\\\\
Ứng viên có kỹ năng tốt có thể xảy ra theo ba cách:
\\begin{enumerate}
    \\item Ứng viên loại A có kỹ năng tốt.
    \\item Ứng viên loại B có kỹ năng tốt.
    \\item Ứng viên loại C có kỹ năng tốt.
\\end{enumerate}
Ta tính xác suất ứng viên có kỹ năng tốt bằng cách dùng định lý xác suất toàn phần:
\\[
P(G) = P(G|A)P(A) + P(G|B)P(B) + P(G|C)P(C)
\\]
Ở đây
\\begin{itemize}
    \\item $P(A) = ${applicantARate}$
    \\item $P(B) = ${applicantBRate}$
    \\item $P(C) = ${applicantCRate}$
    \\item $P(G|A) = ${goodSkillsA}$
    \\item $P(G|B) = ${goodSkillsB}$
    \\item $P(G|C) = ${goodSkillsC}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(G) = ${goodSkillsA} \\times ${applicantARate} + ${goodSkillsB} \\times ${applicantBRate} + ${goodSkillsC} \\times ${applicantCRate}
\\]
\\[
P(G) = ${(goodSkillsA * applicantARate).toFixed(4)} + ${(goodSkillsB * applicantBRate).toFixed(4)} + ${(goodSkillsC * applicantCRate).toFixed(4)}
\\]
\\[
P(G) = ${((goodSkillsA * applicantARate) + (goodSkillsB * applicantBRate) + (goodSkillsC * applicantCRate)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một ứng viên ngẫu nhiên có kỹ năng tốt là khoảng $${(P_G * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất trúng tuyển của mỗi loại ứng viên là khác nhau, và xác suất mỗi ứng viên có kỹ năng tốt cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một ứng viên ngẫu nhiên có kỹ năng tốt.
}
\\end{ex}
    `;

    return question;
}
function xs_nguoi_bi_benh(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất phát hiện bệnh
    function calculateProbability(lightRate, severeRate, healthyRate, detectLight, detectSevere, detectHealthy) {
        const P_L = lightRate;
        const P_S = severeRate;
        const P_H = healthyRate;
        const P_D_given_L = detectLight;
        const P_D_given_S = detectSevere;
        const P_D_given_H = detectHealthy;

        const P_D = (P_D_given_L * P_L) + (P_D_given_S * P_S) + (P_D_given_H * P_H);

        return P_D.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const lightRate = parseFloat(generateRandomPercentage(0.10, 0.05)); // Xác suất bệnh nhân mắc bệnh nhẹ
    const severeRate = parseFloat(generateRandomPercentage(0.20, 0.05)); // Xác suất bệnh nhân mắc bệnh nặng
    const healthyRate = 1 - (lightRate + severeRate); // Xác suất bệnh nhân không mắc bệnh
    const detectLight = parseFloat(generateRandomPercentage(0.90, 0.05)); // Xác suất phát hiện bệnh khi mắc bệnh nhẹ
    const detectSevere = parseFloat(generateRandomPercentage(0.95, 0.05)); // Xác suất phát hiện bệnh khi mắc bệnh nặng
    const detectHealthy = parseFloat(generateRandomPercentage(0.05, 0.02)); // Xác suất phát hiện bệnh khi không mắc bệnh

    // Tính xác suất một bệnh nhân được phát hiện mắc bệnh
    const P_D = calculateProbability(lightRate, severeRate, healthyRate, detectLight, detectSevere, detectHealthy);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một bệnh viện có ba loại bệnh nhân: mắc bệnh nhẹ (L), mắc bệnh nặng (S), và không mắc bệnh (H). Xác suất mỗi loại bệnh nhân lần lượt là $${(lightRate * 100).toFixed(2)}\\%$, $${(severeRate * 100).toFixed(2)}\\%$ và $${(healthyRate * 100).toFixed(2)}\\%$. Xác suất phát hiện bệnh khi mắc bệnh nhẹ là $${(detectLight * 100).toFixed(2)}\\%$, khi mắc bệnh nặng là $${(detectSevere * 100).toFixed(2)}\\%$, và khi không mắc bệnh là $${(detectHealthy * 100).toFixed(2)}\\%$. Tính xác suất một bệnh nhân được phát hiện mắc bệnh.
\\shortans{$${(P_D * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $L$ là sự kiện bệnh nhân mắc bệnh nhẹ.
    \\item $S$ là sự kiện bệnh nhân mắc bệnh nặng.
    \\item $H$ là sự kiện bệnh nhân không mắc bệnh.
    \\item $D$ là sự kiện bệnh nhân được phát hiện mắc bệnh.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất bệnh nhân mắc bệnh nhẹ: $P(L) = ${lightRate}$.
    \\item Xác suất bệnh nhân mắc bệnh nặng: $P(S) = ${severeRate}$.
    \\item Xác suất bệnh nhân không mắc bệnh: $P(H) = ${healthyRate}$.
    \\item Xác suất phát hiện bệnh khi mắc bệnh nhẹ: $P(D|L) = ${detectLight}$.
    \\item Xác suất phát hiện bệnh khi mắc bệnh nặng: $P(D|S) = ${detectSevere}$.
    \\item Xác suất phát hiện bệnh khi không mắc bệnh: $P(D|H) = ${detectHealthy}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất phát hiện bệnh $P(D)$}\\\\
Bệnh nhân được phát hiện mắc bệnh có thể xảy ra theo ba cách:
\\begin{enumerate}
    \\item Bệnh nhân mắc bệnh nhẹ và được phát hiện mắc bệnh.
    \\item Bệnh nhân mắc bệnh nặng và được phát hiện mắc bệnh.
    \\item Bệnh nhân không mắc bệnh nhưng vẫn bị phát hiện mắc bệnh.
\\end{enumerate}
Ta tính xác suất bệnh nhân được phát hiện mắc bệnh bằng cách dùng định lý xác suất toàn phần:
\\[
P(D) = P(D|L)P(L) + P(D|S)P(S) + P(D|H)P(H)
\\]
Ở đây
\\begin{itemize}
    \\item $P(L) = ${lightRate}$
    \\item $P(S) = ${severeRate}$
    \\item $P(H) = ${healthyRate}$
    \\item $P(D|L) = ${detectLight}$
    \\item $P(D|S) = ${detectSevere}$
    \\item $P(D|H) = ${detectHealthy}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(D) = ${detectLight} \\times ${lightRate} + ${detectSevere} \\times ${severeRate} + ${detectHealthy} \\times ${healthyRate}
\\]
\\[
P(D) = ${(detectLight * lightRate).toFixed(4)} + ${(detectSevere * severeRate).toFixed(4)} + ${(detectHealthy * healthyRate).toFixed(4)}
\\]
\\[
P(D) = ${((detectLight * lightRate) + (detectSevere * severeRate) + (detectHealthy * healthyRate)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một bệnh nhân được phát hiện mắc bệnh là khoảng $${(P_D * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất bệnh nhân thuộc mỗi loại là khác nhau, và xác suất phát hiện bệnh khi mắc các loại bệnh hoặc không mắc bệnh cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một bệnh nhân được phát hiện mắc bệnh.
}
\\end{ex}
    `;

    return question;
}
function xs_sp_chat_luong(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất sản phẩm ngẫu nhiên đạt chất lượng
    function calculateProbability(rateX, rateY, rateZ, qualityX, qualityY, qualityZ) {
        const P_X = rateX;
        const P_Y = rateY;
        const P_Z = rateZ;
        const P_Q_given_X = qualityX;
        const P_Q_given_Y = qualityY;
        const P_Q_given_Z = qualityZ;

        const P_Q = (P_Q_given_X * P_X) + (P_Q_given_Y * P_Y) + (P_Q_given_Z * P_Z);

        return P_Q.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const rateX = parseFloat(generateRandomPercentage(0.40, 0.05)); // Xác suất sản phẩm X
    const rateY = parseFloat(generateRandomPercentage(0.35, 0.05)); // Xác suất sản phẩm Y
    const rateZ = 1 - (rateX + rateY); // Xác suất sản phẩm Z
    const qualityX = parseFloat(generateRandomPercentage(0.90, 0.05)); // Xác suất sản phẩm X đạt chất lượng
    const qualityY = parseFloat(generateRandomPercentage(0.85, 0.05)); // Xác suất sản phẩm Y đạt chất lượng
    const qualityZ = parseFloat(generateRandomPercentage(0.70, 0.05)); // Xác suất sản phẩm Z đạt chất lượng

    // Tính xác suất một sản phẩm ngẫu nhiên đạt chất lượng
    const P_Q = calculateProbability(rateX, rateY, rateZ, qualityX, qualityY, qualityZ);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty sản xuất ba loại sản phẩm: X, Y và Z. Xác suất một sản phẩm X là $${(rateX * 100).toFixed(2)}\\%$, sản phẩm Y là $${(rateY * 100).toFixed(2)}\\%$ và sản phẩm Z là $${(rateZ * 100).toFixed(2)}\\%$. Xác suất một sản phẩm đạt chất lượng khi là sản phẩm X là $${(qualityX * 100).toFixed(2)}\\%$, khi là sản phẩm Y là $${(qualityY * 100).toFixed(2)}\\%$ và khi là sản phẩm Z là $${(qualityZ * 100).toFixed(2)}\\%$. Tính xác suất một sản phẩm ngẫu nhiên đạt chất lượng.
\\shortans{$${(P_Q * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi:
\\begin{itemize}
    \\item $X$ là sự kiện sản phẩm loại X.
    \\item $Y$ là sự kiện sản phẩm loại Y.
    \\item $Z$ là sự kiện sản phẩm loại Z.
    \\item $Q$ là sự kiện sản phẩm đạt chất lượng.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất sản phẩm loại X: $P(X) = ${rateX}$.
    \\item Xác suất sản phẩm loại Y: $P(Y) = ${rateY}$.
    \\item Xác suất sản phẩm loại Z: $P(Z) = ${rateZ}$.
    \\item Xác suất sản phẩm loại X đạt chất lượng: $P(Q|X) = ${qualityX}$.
    \\item Xác suất sản phẩm loại Y đạt chất lượng: $P(Q|Y) = ${qualityY}$.
    \\item Xác suất sản phẩm loại Z đạt chất lượng: $P(Q|Z) = ${qualityZ}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất sản phẩm đạt chất lượng $P(Q)$}\\\\
Sản phẩm đạt chất lượng có thể xảy ra theo ba cách:
\\begin{enumerate}
    \\item Sản phẩm loại X đạt chất lượng.
    \\item Sản phẩm loại Y đạt chất lượng.
    \\item Sản phẩm loại Z đạt chất lượng.
\\end{enumerate}
Ta tính xác suất sản phẩm đạt chất lượng bằng cách dùng định lý xác suất toàn phần:
\\[
P(Q) = P(Q|X)P(X) + P(Q|Y)P(Y) + P(Q|Z)P(Z)
\\]
Ở đây
\\begin{itemize}
    \\item $P(X) = ${rateX}$
    \\item $P(Y) = ${rateY}$
    \\item $P(Z) = ${rateZ}$
    \\item $P(Q|X) = ${qualityX}$
    \\item $P(Q|Y) = ${qualityY}$
    \\item $P(Q|Z) = ${qualityZ}$
\\end{itemize}

Thay các giá trị vào, ta có:
\\[
P(Q) = ${qualityX} \\times ${rateX} + ${qualityY} \\times ${rateY} + ${qualityZ} \\times ${rateZ}
\\]
\\[
P(Q) = ${(qualityX * rateX).toFixed(4)} + ${(qualityY * rateY).toFixed(4)} + ${(qualityZ * rateZ).toFixed(4)}
\\]
\\[
P(Q) = ${((qualityX * rateX) + (qualityY * rateY) + (qualityZ * rateZ)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một sản phẩm ngẫu nhiên đạt chất lượng là khoảng $${(P_Q * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất mỗi loại sản phẩm khác nhau, và xác suất mỗi loại sản phẩm đạt chất lượng cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một sản phẩm ngẫu nhiên đạt chất lượng.
}
\\end{ex}
    `;

    return question;
}
function xs_danh_gia_phim(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất khán giả ngẫu nhiên đánh giá cao bộ phim
    function calculateProbability(rateC, rateA, rateS, ratingC, ratingA, ratingS) {
        const P_C = rateC;
        const P_A = rateA;
        const P_S = rateS;
        const P_R_given_C = ratingC;
        const P_R_given_A = ratingA;
        const P_R_given_S = ratingS;

        const P_R = (P_R_given_C * P_C) + (P_R_given_A * P_A) + (P_R_given_S * P_S);

        return P_R.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const rateC = parseFloat(generateRandomPercentage(0.30, 0.05)); // Xác suất khán giả là trẻ em
    const rateA = parseFloat(generateRandomPercentage(0.50, 0.05)); // Xác suất khán giả là người lớn
    const rateS = 1 - (rateC + rateA); // Xác suất khán giả là người già
    const ratingC = parseFloat(generateRandomPercentage(0.70, 0.05)); // Xác suất trẻ em đánh giá cao bộ phim
    const ratingA = parseFloat(generateRandomPercentage(0.80, 0.05)); // Xác suất người lớn đánh giá cao bộ phim
    const ratingS = parseFloat(generateRandomPercentage(0.60, 0.05)); // Xác suất người già đánh giá cao bộ phim

    // Tính xác suất một khán giả ngẫu nhiên đánh giá cao bộ phim
    const P_R = calculateProbability(rateC, rateA, rateS, ratingC, ratingA, ratingS);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một rạp chiếu phim phân loại khán giả thành ba nhóm: trẻ em (C), người lớn (A) và người già (S). Xác suất mỗi nhóm khán giả lần lượt là $${(rateC * 100).toFixed(2)}\\%$, $${(rateA * 100).toFixed(2)}\\%$ và $${(rateS * 100).toFixed(2)}\\%$. Xác suất khán giả đánh giá cao bộ phim khi họ là trẻ em là $${(ratingC * 100).toFixed(2)}\\%$, khi là người lớn là $${(ratingA * 100).toFixed(2)}\\%$ và khi là người già là $${(ratingS * 100).toFixed(2)}\\%$. Tính xác suất một khán giả ngẫu nhiên đánh giá cao bộ phim.
\\shortans{$${(P_R * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $C$ là sự kiện khán giả là trẻ em.
    \\item $A$ là sự kiện khán giả là người lớn.
    \\item $S$ là sự kiện khán giả là người già.
    \\item $R$ là sự kiện khán giả đánh giá cao bộ phim.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất khán giả là trẻ em: $P(C) = ${rateC}$.
    \\item Xác suất khán giả là người lớn: $P(A) = ${rateA}$.
    \\item Xác suất khán giả là người già: $P(S) = ${rateS}$.
    \\item Xác suất trẻ em đánh giá cao bộ phim: $P(R|C) = ${ratingC}$.
    \\item Xác suất người lớn đánh giá cao bộ phim: $P(R|A) = ${ratingA}$.
    \\item Xác suất người già đánh giá cao bộ phim: $P(R|S) = ${ratingS}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất khán giả đánh giá cao bộ phim $P(R)$}\\\\
Khán giả đánh giá cao bộ phim có thể xảy ra theo ba cách:
\\begin{enumerate}
    \\item Trẻ em đánh giá cao bộ phim.
    \\item Người lớn đánh giá cao bộ phim.
    \\item Người già đánh giá cao bộ phim.
\\end{enumerate}
Ta tính xác suất khán giả đánh giá cao bộ phim bằng cách dùng định lý xác suất toàn phần:
\\[
P(R) = P(R|C)P(C) + P(R|A)P(A) + P(R|S)P(S)
\\]
Ở đây
\\begin{itemize}
    \\item $P(C) = ${rateC}$
    \\item $P(A) = ${rateA}$
    \\item $P(S) = ${rateS}$
    \\item $P(R|C) = ${ratingC}$
    \\item $P(R|A) = ${ratingA}$
    \\item $P(R|S) = ${ratingS}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(R) = ${ratingC} \\times ${rateC} + ${ratingA} \\times ${rateA} + ${ratingS} \\times ${rateS}
\\]
\\[
P(R) = ${(ratingC * rateC).toFixed(4)} + ${(ratingA * rateA).toFixed(4)} + ${(ratingS * rateS).toFixed(4)}
\\]
\\[
P(R) = ${((ratingC * rateC) + (ratingA * rateA) + (ratingS * rateS)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một khán giả ngẫu nhiên đánh giá cao bộ phim là khoảng $${(P_R * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất mỗi nhóm khán giả khác nhau, và xác suất mỗi nhóm khán giả đánh giá cao bộ phim cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một khán giả ngẫu nhiên đánh giá cao bộ phim.
}
\\end{ex}
    `;

    return question;
}
function xs_kinh_doanh_thanhcong(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất dự án ngẫu nhiên thành công
    function calculateProbability(rateL, rateM, rateS, successL, successM, successS) {
        const P_L = rateL;
        const P_M = rateM;
        const P_S = rateS;
        const P_S_given_L = successL;
        const P_S_given_M = successM;
        const P_S_given_S = successS;

        const P_Success = (P_S_given_L * P_L) + (P_S_given_M * P_M) + (P_S_given_S * P_S);

        return P_Success.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const rateL = parseFloat(generateRandomPercentage(0.30, 0.05)); // Xác suất dự án lớn
    const rateM = parseFloat(generateRandomPercentage(0.40, 0.05)); // Xác suất dự án vừa
    const rateS = 1 - (rateL + rateM); // Xác suất dự án nhỏ
    const successL = parseFloat(generateRandomPercentage(0.80, 0.05)); // Xác suất dự án lớn thành công
    const successM = parseFloat(generateRandomPercentage(0.60, 0.05)); // Xác suất dự án vừa thành công
    const successS = parseFloat(generateRandomPercentage(0.50, 0.05)); // Xác suất dự án nhỏ thành công

    // Tính xác suất một dự án ngẫu nhiên thành công
    const P_Success = calculateProbability(rateL, rateM, rateS, successL, successM, successS);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một doanh nghiệp có ba loại dự án: dự án lớn (L), dự án vừa (M), và dự án nhỏ (S). Xác suất mỗi loại dự án lần lượt là $${(rateL * 100).toFixed(2)}\\%$, $${(rateM * 100).toFixed(2)}\\%$ và $${(rateS * 100).toFixed(2)}\\%$. Xác suất một dự án thành công khi là dự án lớn là $${(successL * 100).toFixed(2)}\\%$, khi là dự án vừa là $${(successM * 100).toFixed(2)}\\%$ và khi là dự án nhỏ là $${(successS * 100).toFixed(2)}\\%$. Tính xác suất một dự án ngẫu nhiên thành công.
\\shortans{$${(P_Success * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $L$ là sự kiện dự án lớn.
    \\item $M$ là sự kiện dự án vừa.
    \\item $S$ là sự kiện dự án nhỏ.
    \\item $S$ là sự kiện dự án thành công.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất dự án lớn: $P(L) = ${rateL}$.
    \\item Xác suất dự án vừa: $P(M) = ${rateM}$.
    \\item Xác suất dự án nhỏ: $P(S) = ${rateS}$.
    \\item Xác suất dự án lớn thành công: $P(S|L) = ${successL}$.
    \\item Xác suất dự án vừa thành công: $P(S|M) = ${successM}$.
    \\item Xác suất dự án nhỏ thành công: $P(S|S) = ${successS}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất dự án thành công $P(S)$}\\\\
Dự án thành công có thể xảy ra theo ba cách:
\\begin{enumerate}
    \\item Dự án lớn thành công.
    \\item Dự án vừa thành công.
    \\item Dự án nhỏ thành công.
\\end{enumerate}
Ta tính xác suất dự án thành công bằng cách dùng định lý xác suất toàn phần:
\\[
P(S) = P(S|L)P(L) + P(S|M)P(M) + P(S|S)P(S)
\\]
Ở đây
\\begin{itemize}
    \\item $P(L) = ${rateL}$
    \\item $P(M) = ${rateM}$
    \\item $P(S) = ${rateS}$
    \\item $P(S|L) = ${successL}$
    \\item $P(S|M) = ${successM}$
    \\item $P(S|S) = ${successS}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(S) = ${successL} \\times ${rateL} + ${successM} \\times ${rateM} + ${successS} \\times ${rateS}
\\]
\\[
P(S) = ${(successL * rateL).toFixed(4)} + ${(successM * rateM).toFixed(4)} + ${(successS * rateS).toFixed(4)}
\\]
\\[
P(S) = ${((successL * rateL) + (successM * rateM) + (successS * rateS)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một dự án ngẫu nhiên thành công là khoảng $${(P_Success * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất mỗi loại dự án khác nhau, và xác suất mỗi loại dự án thành công cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một dự án ngẫu nhiên thành công.
}
\\end{ex}
    `;

    return question;
}
function xs_khach_hang_hai_long(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất khách hàng ngẫu nhiên hài lòng
    function calculateProbability(rateN, rateR, rateV, satisfactionN, satisfactionR, satisfactionV) {
        const P_N = rateN;
        const P_R = rateR;
        const P_V = rateV;
        const P_S_given_N = satisfactionN;
        const P_S_given_R = satisfactionR;
        const P_S_given_V = satisfactionV;

        const P_S = (P_S_given_N * P_N) + (P_S_given_R * P_R) + (P_S_given_V * P_V);

        return P_S.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const rateN = parseFloat(generateRandomPercentage(0.40, 0.05)); // Xác suất khách hàng mới
    const rateR = parseFloat(generateRandomPercentage(0.40, 0.05)); // Xác suất khách hàng thường xuyên
    const rateV = 1 - (rateN + rateR); // Xác suất khách hàng VIP
    const satisfactionN = parseFloat(generateRandomPercentage(0.60, 0.05)); // Xác suất khách hàng mới hài lòng
    const satisfactionR = parseFloat(generateRandomPercentage(0.80, 0.05)); // Xác suất khách hàng thường xuyên hài lòng
    const satisfactionV = parseFloat(generateRandomPercentage(0.90, 0.05)); // Xác suất khách hàng VIP hài lòng

    // Tính xác suất một khách hàng ngẫu nhiên hài lòng
    const P_S = calculateProbability(rateN, rateR, rateV, satisfactionN, satisfactionR, satisfactionV);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một cửa hàng có ba loại khách hàng: khách hàng mới (N), khách hàng thường xuyên (R), và khách hàng VIP (V). Xác suất mỗi loại khách hàng lần lượt là $${(rateN * 100).toFixed(2)}\\%$, $${(rateR * 100).toFixed(2)}\\%$ và $${(rateV * 100).toFixed(2)}\\%$. Xác suất khách hàng hài lòng khi họ là khách hàng mới là $${(satisfactionN * 100).toFixed(2)}\\%$, khi là khách hàng thường xuyên là $${(satisfactionR * 100).toFixed(2)}\\%$ và khi là khách hàng VIP là $${(satisfactionV * 100).toFixed(2)}\\%$. Tính xác suất một khách hàng ngẫu nhiên hài lòng.
\\shortans{$${(P_S * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $N$ là sự kiện khách hàng mới.
    \\item $R$ là sự kiện khách hàng thường xuyên.
    \\item $V$ là sự kiện khách hàng VIP.
    \\item $S$ là sự kiện khách hàng hài lòng.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất khách hàng mới: $P(N) = ${rateN}$.
    \\item Xác suất khách hàng thường xuyên: $P(R) = ${rateR}$.
    \\item Xác suất khách hàng VIP: $P(V) = ${rateV}$.
    \\item Xác suất khách hàng mới hài lòng: $P(S|N) = ${satisfactionN}$.
    \\item Xác suất khách hàng thường xuyên hài lòng: $P(S|R) = ${satisfactionR}$.
    \\item Xác suất khách hàng VIP hài lòng: $P(S|V) = ${satisfactionV}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất khách hàng hài lòng $P(S)$}\\\\
Khách hàng hài lòng có thể xảy ra theo ba cách:
\\begin{enumerate}
    \\item Khách hàng mới hài lòng.
    \\item Khách hàng thường xuyên hài lòng.
    \\item Khách hàng VIP hài lòng.
\\end{enumerate}
Ta tính xác suất khách hàng hài lòng bằng cách dùng định lý xác suất toàn phần:
\\[
P(S) = P(S|N)P(N) + P(S|R)P(R) + P(S|V)P(V)
\\]
Ở đây
\\begin{itemize}
    \\item $P(N) = ${rateN}$
    \\item $P(R) = ${rateR}$
    \\item $P(V) = ${rateV}$
    \\item $P(S|N) = ${satisfactionN}$
    \\item $P(S|R) = ${satisfactionR}$
    \\item $P(S|V) = ${satisfactionV}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(S) = ${satisfactionN} \\times ${rateN} + ${satisfactionR} \\times ${rateR} + ${satisfactionV} \\times ${rateV}
\\]
\\[
P(S) = ${(satisfactionN * rateN).toFixed(4)} + ${(satisfactionR * rateR).toFixed(4)} + ${(satisfactionV * rateV).toFixed(4)}
\\]
\\[
P(S) = ${((satisfactionN * rateN) + (satisfactionR * rateR) + (satisfactionV * rateV)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một khách hàng ngẫu nhiên hài lòng là khoảng $${(P_S * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất mỗi loại khách hàng khác nhau, và xác suất mỗi loại khách hàng hài lòng cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một khách hàng ngẫu nhiên hài lòng.
}
\\end{ex}
    `;

    return question;
}
function xs_du_an_thanh_cong(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất dự án ngẫu nhiên thành công
    function calculateProbability(rateL, rateM, rateS, rateXS, successL, successM, successS, successXS) {
        const P_L = rateL;
        const P_M = rateM;
        const P_S = rateS;
        const P_XS = rateXS;
        const P_Success_given_L = successL;
        const P_Success_given_M = successM;
        const P_Success_given_S = successS;
        const P_Success_given_XS = successXS;

        const P_Success = (P_Success_given_L * P_L) + (P_Success_given_M * P_M) + (P_Success_given_S * P_S) + (P_Success_given_XS * P_XS);

        return P_Success.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const rateL = parseFloat(generateRandomPercentage(0.10, 0.05)); // Xác suất dự án lớn
    const rateM = parseFloat(generateRandomPercentage(0.30, 0.05)); // Xác suất dự án vừa
    const rateS = parseFloat(generateRandomPercentage(0.40, 0.05)); // Xác suất dự án nhỏ
    const rateXS = 1 - (rateL + rateM + rateS); // Xác suất dự án rất nhỏ
    const successL = parseFloat(generateRandomPercentage(0.90, 0.05)); // Xác suất dự án lớn thành công
    const successM = parseFloat(generateRandomPercentage(0.70, 0.05)); // Xác suất dự án vừa thành công
    const successS = parseFloat(generateRandomPercentage(0.50, 0.05)); // Xác suất dự án nhỏ thành công
    const successXS = parseFloat(generateRandomPercentage(0.20, 0.05)); // Xác suất dự án rất nhỏ thành công

    // Tính xác suất một dự án ngẫu nhiên thành công
    const P_Success = calculateProbability(rateL, rateM, rateS, rateXS, successL, successM, successS, successXS);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một công ty có bốn loại dự án: dự án lớn (L), dự án vừa (M), dự án nhỏ (S), và dự án rất nhỏ (XS). Xác suất mỗi loại dự án lần lượt là $${(rateL * 100).toFixed(2)}\\%$, $${(rateM * 100).toFixed(2)}\\%$, $${(rateS * 100).toFixed(2)}\\%$ và $${(rateXS * 100).toFixed(2)}\\%$. Xác suất thành công khi là dự án lớn là $${(successL * 100).toFixed(2)}\\%$, khi là dự án vừa là $${(successM * 100).toFixed(2)}\\%$, khi là dự án nhỏ là $${(successS * 100).toFixed(2)}\\%$ và khi là dự án rất nhỏ là $${(successXS * 100).toFixed(2)}\\%$. Tính xác suất một dự án ngẫu nhiên thành công.
\\shortans{$${(P_Success * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $L$ là sự kiện dự án lớn.
    \\item $M$ là sự kiện dự án vừa.
    \\item $S$ là sự kiện dự án nhỏ.
    \\item $XS$ là sự kiện dự án rất nhỏ.
    \\item $Success$ là sự kiện dự án thành công.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất dự án lớn: $P(L) = ${rateL}$.
    \\item Xác suất dự án vừa: $P(M) = ${rateM}$.
    \\item Xác suất dự án nhỏ: $P(S) = ${rateS}$.
    \\item Xác suất dự án rất nhỏ: $P(XS) = ${rateXS}$.
    \\item Xác suất dự án lớn thành công: $P(Success|L) = ${successL}$.
    \\item Xác suất dự án vừa thành công: $P(Success|M) = ${successM}$.
    \\item Xác suất dự án nhỏ thành công: $P(Success|S) = ${successS}$.
    \\item Xác suất dự án rất nhỏ thành công: $P(Success|XS) = ${successXS}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất dự án thành công $P(Success)$}\\\\
Dự án thành công có thể xảy ra theo bốn cách:
\\begin{enumerate}
    \\item Dự án lớn thành công.
    \\item Dự án vừa thành công.
    \\item Dự án nhỏ thành công.
    \\item Dự án rất nhỏ thành công.
\\end{enumerate}
Ta tính xác suất dự án thành công bằng cách dùng định lý xác suất toàn phần:
\\[
P(Success) = P(Success|L)P(L) + P(Success|M)P(M) + P(Success|S)P(S) + P(Success|XS)P(XS)
\\]
Ở đây
\\begin{itemize}
    \\item $P(L) = ${rateL}$
    \\item $P(M) = ${rateM}$
    \\item $P(S) = ${rateS}$
    \\item $P(XS) = ${rateXS}$
    \\item $P(Success|L) = ${successL}$
    \\item $P(Success|M) = ${successM}$
    \\item $P(Success|S) = ${successS}$
    \\item $P(Success|XS) = ${successXS}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(Success) = ${successL} \\times ${rateL} + ${successM} \\times ${rateM} + ${successS} \\times ${rateS} + ${successXS} \\times ${rateXS}
\\]
\\[
P(Success) = ${(successL * rateL).toFixed(4)} + ${(successM * rateM).toFixed(4)} + ${(successS * rateS).toFixed(4)} + ${(successXS * rateXS).toFixed(4)}
\\]
\\[
P(Success) = ${((successL * rateL) + (successM * rateM) + (successS * rateS) + (successXS * rateXS)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một dự án ngẫu nhiên thành công là khoảng $${(P_Success * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất mỗi loại dự án khác nhau, và xác suất mỗi loại dự án thành công cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một dự án ngẫu nhiên thành công.
}
\\end{ex}
    `;

    return question;
}
function xs_trung_thuong(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất vé ngẫu nhiên trúng thưởng
    function calculateProbability(rateA, rateB, rateC, winA, winB, winC) {
        const P_A = rateA;
        const P_B = rateB;
        const P_C = rateC;
        const P_W_given_A = winA;
        const P_W_given_B = winB;
        const P_W_given_C = winC;

        const P_Win = (P_W_given_A * P_A) + (P_W_given_B * P_B) + (P_W_given_C * P_C);

        return P_Win.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const rateA = parseFloat(generateRandomPercentage(0.50, 0.05)); // Xác suất vé loại A
    const rateB = parseFloat(generateRandomPercentage(0.30, 0.05)); // Xác suất vé loại B
    const rateC = 1 - (rateA + rateB); // Xác suất vé loại C
    const winA = parseFloat(generateRandomPercentage(0.10, 0.05)); // Xác suất vé loại A trúng thưởng
    const winB = parseFloat(generateRandomPercentage(0.20, 0.05)); // Xác suất vé loại B trúng thưởng
    const winC = parseFloat(generateRandomPercentage(0.30, 0.05)); // Xác suất vé loại C trúng thưởng

    // Tính xác suất một vé ngẫu nhiên trúng thưởng
    const P_Win = calculateProbability(rateA, rateB, rateC, winA, winB, winC);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một chương trình khuyến mãi có ba loại vé: vé loại A, vé loại B, và vé loại C. Xác suất mỗi loại vé lần lượt là $${(rateA * 100).toFixed(2)}\\%$, $${(rateB * 100).toFixed(2)}\\%$ và $${(rateC * 100).toFixed(2)}\\%$. Xác suất trúng thưởng khi là vé loại A là $${(winA * 100).toFixed(2)}\\%$, khi là vé loại B là $${(winB * 100).toFixed(2)}\\%$ và khi là vé loại C là $${(winC * 100).toFixed(2)}\\%$. Tính xác suất một vé ngẫu nhiên trúng thưởng.
\\shortans{$${(P_Win * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $A$ là sự kiện vé loại A.
    \\item $B$ là sự kiện vé loại B.
    \\item $C$ là sự kiện vé loại C.
    \\item $W$ là sự kiện vé trúng thưởng.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất vé loại A: $P(A) = ${rateA}$.
    \\item Xác suất vé loại B: $P(B) = ${rateB}$.
    \\item Xác suất vé loại C: $P(C) = ${rateC}$.
    \\item Xác suất vé loại A trúng thưởng: $P(W|A) = ${winA}$.
    \\item Xác suất vé loại B trúng thưởng: $P(W|B) = ${winB}$.
    \\item Xác suất vé loại C trúng thưởng: $P(W|C) = ${winC}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất vé trúng thưởng $P(W)$}\\\\
Vé trúng thưởng có thể xảy ra theo ba cách:
\\begin{enumerate}
    \\item Vé loại A trúng thưởng.
    \\item Vé loại B trúng thưởng.
    \\item Vé loại C trúng thưởng.
\\end{enumerate}
Ta tính xác suất vé trúng thưởng bằng cách dùng định lý xác suất toàn phần:
\\[
P(W) = P(W|A)P(A) + P(W|B)P(B) + P(W|C)P(C)
\\]
Ở đây
\\begin{itemize}
    \\item $P(A) = ${rateA}$
    \\item $P(B) = ${rateB}$
    \\item $P(C) = ${rateC}$
    \\item $P(W|A) = ${winA}$
    \\item $P(W|B) = ${winB}$
    \\item $P(W|C) = ${winC}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(W) = ${winA} \\times ${rateA} + ${winB} \\times ${rateB} + ${winC} \\times ${rateC}
\\]
\\[
P(W) = ${(winA * rateA).toFixed(4)} + ${(winB * rateB).toFixed(4)} + ${(winC * rateC).toFixed(4)}
\\]
\\[
P(W) = ${((winA * rateA) + (winB * rateB) + (winC * rateC)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một vé ngẫu nhiên trúng thưởng là khoảng $${(P_Win * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất mỗi loại vé khác nhau, và xác suất mỗi loại vé trúng thưởng cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một vé ngẫu nhiên trúng thưởng.
}
\\end{ex}
    `;

    return question;
}
function xs_thinghiem_thanhcong(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất thí nghiệm ngẫu nhiên thành công
    function calculateProbability(rateL1, rateL2, rateL3, successL1, successL2, successL3) {
        const P_L1 = rateL1;
        const P_L2 = rateL2;
        const P_L3 = rateL3;
        const P_S_given_L1 = successL1;
        const P_S_given_L2 = successL2;
        const P_S_given_L3 = successL3;

        const P_Success = (P_S_given_L1 * P_L1) + (P_S_given_L2 * P_L2) + (P_S_given_L3 * P_L3);

        return P_Success.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const rateL1 = parseFloat(generateRandomPercentage(0.40, 0.05)); // Xác suất thí nghiệm loại 1
    const rateL2 = parseFloat(generateRandomPercentage(0.40, 0.05)); // Xác suất thí nghiệm loại 2
    const rateL3 = 1 - (rateL1 + rateL2); // Xác suất thí nghiệm loại 3
    const successL1 = parseFloat(generateRandomPercentage(0.70, 0.05)); // Xác suất thí nghiệm loại 1 thành công
    const successL2 = parseFloat(generateRandomPercentage(0.50, 0.05)); // Xác suất thí nghiệm loại 2 thành công
    const successL3 = parseFloat(generateRandomPercentage(0.60, 0.05)); // Xác suất thí nghiệm loại 3 thành công

    // Tính xác suất một thí nghiệm ngẫu nhiên thành công
    const P_Success = calculateProbability(rateL1, rateL2, rateL3, successL1, successL2, successL3);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một phòng thí nghiệm thực hiện ba loại thí nghiệm: thí nghiệm loại 1 (L1), thí nghiệm loại 2 (L2), và thí nghiệm loại 3 (L3). Xác suất mỗi loại thí nghiệm lần lượt là $${(rateL1 * 100).toFixed(2)}\\%$, $${(rateL2 * 100).toFixed(2)}\\%$ và $${(rateL3 * 100).toFixed(2)}\\%$. Xác suất thí nghiệm thành công khi là loại 1 là $${(successL1 * 100).toFixed(2)}\\%$, khi là loại 2 là $${(successL2 * 100).toFixed(2)}\\%$ và khi là loại 3 là $${(successL3 * 100).toFixed(2)}\\%$. Tính xác suất một thí nghiệm ngẫu nhiên thành công.
\\shortans{$${(P_Success * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $L1$ là sự kiện thí nghiệm loại 1.
    \\item $L2$ là sự kiện thí nghiệm loại 2.
    \\item $L3$ là sự kiện thí nghiệm loại 3.
    \\item $S$ là sự kiện thí nghiệm thành công.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất thí nghiệm loại 1: $P(L1) = ${rateL1}$.
    \\item Xác suất thí nghiệm loại 2: $P(L2) = ${rateL2}$.
    \\item Xác suất thí nghiệm loại 3: $P(L3) = ${rateL3}$.
    \\item Xác suất thí nghiệm loại 1 thành công: $P(S|L1) = ${successL1}$.
    \\item Xác suất thí nghiệm loại 2 thành công: $P(S|L2) = ${successL2}$.
    \\item Xác suất thí nghiệm loại 3 thành công: $P(S|L3) = ${successL3}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất thí nghiệm thành công $P(S)$}\\\\
Thí nghiệm thành công có thể xảy ra theo ba cách:
\\begin{enumerate}
    \\item Thí nghiệm loại 1 thành công.
    \\item Thí nghiệm loại 2 thành công.
    \\item Thí nghiệm loại 3 thành công.
\\end{enumerate}
Ta tính xác suất thí nghiệm thành công bằng cách dùng định lý xác suất toàn phần:
\\[
P(S) = P(S|L1)P(L1) + P(S|L2)P(L2) + P(S|L3)P(L3)
\\]
Ở đây
\\begin{itemize}
    \\item $P(L1) = ${rateL1}$
    \\item $P(L2) = ${rateL2}$
    \\item $P(L3) = ${rateL3}$
    \\item $P(S|L1) = ${successL1}$
    \\item $P(S|L2) = ${successL2}$
    \\item $P(S|L3) = ${successL3}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(S) = ${successL1} \\times ${rateL1} + ${successL2} \\times ${rateL2} + ${successL3} \\times ${rateL3}
\\]
\\[
P(S) = ${(successL1 * rateL1).toFixed(4)} + ${(successL2 * rateL2).toFixed(4)} + ${(successL3 * rateL3).toFixed(4)}
\\]
\\[
P(S) = ${((successL1 * rateL1) + (successL2 * rateL2) + (successL3 * rateL3)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một thí nghiệm ngẫu nhiên thành công là khoảng $${(P_Success * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất mỗi loại thí nghiệm khác nhau, và xác suất mỗi loại thí nghiệm thành công cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một thí nghiệm ngẫu nhiên thành công.
}
\\end{ex}
    `;

    return question;
}
function xs_mua_sp(e) {
    // Hàm tạo phần trăm ngẫu nhiên trong khoảng nhất định
    function generateRandomPercentage(base, range) {
        return (base + (Math.random() * range * 2 - range)).toFixed(4);
    }

    // Hàm tính xác suất khách hàng ngẫu nhiên mua sản phẩm
    function calculateProbability(rateN, rateR, rateF, rateV, purchaseN, purchaseR, purchaseF, purchaseV) {
        const P_N = rateN;
        const P_R = rateR;
        const P_F = rateF;
        const P_V = rateV;
        const P_P_given_N = purchaseN;
        const P_P_given_R = purchaseR;
        const P_P_given_F = purchaseF;
        const P_P_given_V = purchaseV;

        const P_Purchase = (P_P_given_N * P_N) + (P_P_given_R * P_R) + (P_P_given_F * P_F) + (P_P_given_V * P_V);

        return P_Purchase.toFixed(4);
    }

    // Tạo các tỷ lệ phần trăm ngẫu nhiên trong lân cận
    const rateN = parseFloat(generateRandomPercentage(0.30, 0.05)); // Xác suất khách hàng mới
    const rateR = parseFloat(generateRandomPercentage(0.30, 0.05)); // Xác suất khách hàng quay lại
    const rateF = parseFloat(generateRandomPercentage(0.20, 0.05)); // Xác suất khách hàng thường xuyên
    const rateV = 1 - (rateN + rateR + rateF); // Xác suất khách hàng VIP
    const purchaseN = parseFloat(generateRandomPercentage(0.50, 0.05)); // Xác suất khách hàng mới mua sản phẩm
    const purchaseR = parseFloat(generateRandomPercentage(0.60, 0.05)); // Xác suất khách hàng quay lại mua sản phẩm
    const purchaseF = parseFloat(generateRandomPercentage(0.80, 0.05)); // Xác suất khách hàng thường xuyên mua sản phẩm
    const purchaseV = parseFloat(generateRandomPercentage(0.90, 0.05)); // Xác suất khách hàng VIP mua sản phẩm

    // Tính xác suất một khách hàng ngẫu nhiên mua sản phẩm
    const P_Purchase = calculateProbability(rateN, rateR, rateF, rateV, purchaseN, purchaseR, purchaseF, purchaseV);

    // Tạo bài toán và lời giải theo cấu trúc LaTeX
    let question = `
\\begin{ex}
Một cửa hàng có bốn loại khách hàng: khách hàng mới (N), khách hàng quay lại (R), khách hàng thường xuyên (F), và khách hàng VIP (V). Xác suất mỗi loại khách hàng lần lượt là $${(rateN * 100).toFixed(2)}\\%$, $${(rateR * 100).toFixed(2)}\\%$, $${(rateF * 100).toFixed(2)}\\%$ và $${(rateV * 100).toFixed(2)}\\%$. Xác suất mua sản phẩm khi là khách hàng mới là $${(purchaseN * 100).toFixed(2)}\\%$, khi là khách hàng quay lại là $${(purchaseR * 100).toFixed(2)}\\%$, khi là khách hàng thường xuyên là $${(purchaseF * 100).toFixed(2)}\\%$ và khi là khách hàng VIP là $${(purchaseV * 100).toFixed(2)}\\%$. Tính xác suất một khách hàng ngẫu nhiên mua sản phẩm.
\\shortans{$${(P_Purchase * 100).toFixed(1)}\\%$}
\\loigiai{
Gọi
\\begin{itemize}
    \\item $N$ là sự kiện khách hàng mới.
    \\item $R$ là sự kiện khách hàng quay lại.
    \\item $F$ là sự kiện khách hàng thường xuyên.
    \\item $V$ là sự kiện khách hàng VIP.
    \\item $P$ là sự kiện khách hàng mua sản phẩm.
\\end{itemize}
Chúng ta có các thông tin sau:
\\begin{itemize}
    \\item Xác suất khách hàng mới: $P(N) = ${rateN}$.
    \\item Xác suất khách hàng quay lại: $P(R) = ${rateR}$.
    \\item Xác suất khách hàng thường xuyên: $P(F) = ${rateF}$.
    \\item Xác suất khách hàng VIP: $P(V) = ${rateV}$.
    \\item Xác suất khách hàng mới mua sản phẩm: $P(P|N) = ${purchaseN}$.
    \\item Xác suất khách hàng quay lại mua sản phẩm: $P(P|R) = ${purchaseR}$.
    \\item Xác suất khách hàng thường xuyên mua sản phẩm: $P(P|F) = ${purchaseF}$.
    \\item Xác suất khách hàng VIP mua sản phẩm: $P(P|V) = ${purchaseV}$.
\\end{itemize}
\\textbf{Bước 1: Tính xác suất khách hàng mua sản phẩm $P(P)$}\\\\
Khách hàng mua sản phẩm có thể xảy ra theo bốn cách:
\\begin{enumerate}
    \\item Khách hàng mới mua sản phẩm.
    \\item Khách hàng quay lại mua sản phẩm.
    \\item Khách hàng thường xuyên mua sản phẩm.
    \\item Khách hàng VIP mua sản phẩm.
\\end{enumerate}
Ta tính xác suất khách hàng mua sản phẩm bằng cách dùng định lý xác suất toàn phần:
\\[
P(P) = P(P|N)P(N) + P(P|R)P(R) + P(P|F)P(F) + P(P|V)P(V)
\\]
Ở đây
\\begin{itemize}
    \\item $P(N) = ${rateN}$
    \\item $P(R) = ${rateR}$
    \\item $P(F) = ${rateF}$
    \\item $P(V) = ${rateV}$
    \\item $P(P|N) = ${purchaseN}$
    \\item $P(P|R) = ${purchaseR}$
    \\item $P(P|F) = ${purchaseF}$
    \\item $P(P|V) = ${purchaseV}$
\\end{itemize}
Thay các giá trị vào, ta có:
\\[
P(P) = ${purchaseN} \\times ${rateN} + ${purchaseR} \\times ${rateR} + ${purchaseF} \\times ${rateF} + ${purchaseV} \\times ${rateV}
\\]
\\[
P(P) = ${(purchaseN * rateN).toFixed(4)} + ${(purchaseR * rateR).toFixed(4)} + ${(purchaseF * rateF).toFixed(4)} + ${(purchaseV * rateV).toFixed(4)}
\\]
\\[
P(P) = ${((purchaseN * rateN) + (purchaseR * rateR) + (purchaseF * rateF) + (purchaseV * rateV)).toFixed(4)}
\\]
\\textbf{Kết luận}\\\\
Xác suất một khách hàng ngẫu nhiên mua sản phẩm là khoảng $${(P_Purchase * 100).toFixed(1)}\\%$.\\\\
\\textbf{Diễn giải}\\\\
Xác suất mỗi loại khách hàng khác nhau, và xác suất mỗi loại khách hàng mua sản phẩm cũng khác nhau. Sử dụng định lý xác suất toàn phần, chúng ta có thể tính được xác suất tổng thể một khách hàng ngẫu nhiên mua sản phẩm.
}
\\end{ex}
    `;

    return question;
}

function min_R_thung_hinhtru_biet_V(e) {
  function solve() {
    const min = 1000;
    const max = 2000;
    const step = 100;
    const pi = Math.PI;

    // Tạo giá trị ngẫu nhiên trong khoảng từ 1000 đến 2000 với bước là 100
    const range = Math.floor((max - min) / step) + 1;
    const volume = min + Math.floor(Math.random() * range) * step;

    // Tính bán kính tối ưu
    const optimalRadius = Math.cbrt(volume / (2 * pi));
    const optimalRadiusRounded = optimalRadius.toFixed(2);

    const debai = `
\\begin{ex}
Một nhà máy sản xuất cần thiết kế một thùng dạng hình trụ có nắp đậy với dung tích $${volume}$ cm$^3$. Tính bán kính của nắp đậy để nhà sản xuất tiết kiệm nguyên vật liệu nhất, kết quả làm tròn đến hàng phần trăm.
\\shortans{$${optimalRadiusRounded}$}
\\loigiai{
Gọi $r$, $(r>0)$ là bán kính đáy của thùng.\\\\
Khi đó $V=\\pi r^2h \\Rightarrow h=\\dfrac{V}{\\pi r^2}$. \\\\
Diện tích toàn phần của thùng là\\\\
$S(r)=2\\pi rh+2\\pi r^2=2\\pi r\\dfrac{V}{\\pi r^2}+2\\pi r^2=\\dfrac{2V}{r}+2\\pi r^2$\\\\
Bài toán quy về tìm GTNN của hàm số: $S(r)=\\dfrac{2V}{r}+2\\pi r^2$, $(r>0)$.\\\\
$S'(r)=-\\dfrac{2V}{r^2}+4\\pi r$.\\\\
$S'(r)=0 \\Leftrightarrow 4\\pi r=\\dfrac{2V}{r^2} \\Leftrightarrow r=\\sqrt[3]{\\dfrac{V}{2\\pi}}$ $\\Leftrightarrow r=\\sqrt[3]{\\dfrac{${volume}}{2\\pi}}=\\sqrt[3]{\\dfrac{${volume / 2}}{\\pi}}$. \\\\
Bảng biến thiên của hàm số $S(r)=\\dfrac{2V}{r}+2\\pi r^2(r>0)$
\\begin{center}
\\begin{tikzpicture}
\\tkzTabInit[nocadre=false,lgt=1.2,espcl=3.5,deltacl=.6]
{$r$/1.2,$S'(r)$/0.6,$S(r)$/2.0}
{$0$,$\\sqrt[3]{\\dfrac{${volume / 2}}{\\pi}}$,$+\\infty$}
\\tkzTabLine{,-,0,+,}
\\tkzTabVar{+/$ $,-/$ $,+/$ $}
\\end{tikzpicture}
\\end{center}
Từ bảng biến thiên suy ra $S(r)$ đạt giá trị nhỏ nhất khi $r=\\sqrt[3]{\\dfrac{${volume / 2}}{\\pi}}\\approx ${optimalRadiusRounded}$ cm.
}
\\end{ex}
    `;

    return debai;
  }

  // Gọi hàm chính để giải
  return solve();
}
function tim_h_thung_hinhtru_biet_V(e) {
  function solve() {
    const min = 1000;
    const max = 2000;
    const step = 100;
    const pi = Math.PI;

    // Tạo giá trị ngẫu nhiên trong khoảng từ 1000 đến 2000 với bước là 100
    const range = Math.floor((max - min) / step) + 1;
    const volume = min + Math.floor(Math.random() * range) * step;

    // Tính bán kính tối ưu
    const optimalRadius = Math.cbrt(volume / (2 * pi));
    const optimalRadiusRounded = optimalRadius.toFixed(2);

    // Tính chiều cao tương ứng
    const height = volume / (pi * Math.pow(optimalRadius, 2));
    const heightRounded = height.toFixed(1);

    const debai = `
\\begin{ex}
Một nhà máy sản xuất cần thiết kế một thùng dạng hình trụ có nắp đậy với dung tích $${volume}$ cm$^3$. Tính chiều cao của thùng để nhà sản xuất tiết kiệm nguyên vật liệu nhất, kết quả làm tròn đến hàng phần chục.
\\shortans{$${heightRounded}$}
\\loigiai{
Gọi $r$, $(r>0)$ là bán kính đáy của thùng.\\\\
Khi đó $V=\\pi r^2h \\Rightarrow h=\\dfrac{V}{\\pi r^2}$. \\\\
Diện tích toàn phần của thùng là\\\\
$S(r)=2\\pi rh+2\\pi r^2=2\\pi r\\dfrac{V}{\\pi r^2}+2\\pi r^2=\\dfrac{2V}{r}+2\\pi r^2$\\\\
Bài toán quy về tìm GTNN của hàm số: $S(r)=\\dfrac{2V}{r}+2\\pi r^2$, $(r>0)$.\\\\
$S'(r)=-\\dfrac{2V}{r^2}+4\\pi r$.\\\\
$S'(r)=0 \\Leftrightarrow 4\\pi r=\\d\dfrac{2V}{r^2} \\Leftrightarrow r=\\sqrt[3]{\\dfrac{V}{2\\pi}}$ $\\Leftrightarrow r=\\sqrt[3]{\\dfrac{${volume}}{2\\pi}}=\\sqrt[3]{\\dfrac{${volume / 2}}{\\pi}}$. \\\\
Chiều cao tương ứng là: $h=\\dfrac{${volume}}{\\pi r^2}=\\dfrac{${volume}}{\\pi \\left(\\sqrt[3]{\\dfrac{${volume}}{2\\pi}}\\right)^2}=\\dfrac{${volume}}{\\pi \\left(\\dfrac{${volume}}{2\\pi}\\right)^{2/3}} \\approx ${heightRounded}$.\\\\
Bảng biến thiên của hàm số $S(r)=\\dfrac{2V}{r}+2\\pi r^2(r>0)$
\\begin{center}
\\begin{tikzpicture}
\\tkzTabInit[nocadre=false,lgt=1.2,espcl=3.5,deltacl=.6]
{$r$/1.2,$S'(r)$/0.6,$S(r)$/2.0}
{$0$,$\\sqrt[3]{\\dfrac{${volume / 2}}{\\pi}}$,$+\\infty$}
\\tkzTabLine{,-,0,+,}
\\tkzTabVar{+/$ $,-/$ $,+/$ $}
\\end{tikzpicture}
\\end{center}
Từ bảng biến thiên suy ra $S(r)$ đạt giá trị nhỏ nhất khi $r=\\sqrt[3]{\\dfrac{${volume / 2}}{\\pi}}\\approx ${optimalRadiusRounded}$ cm và $h \\approx ${heightRounded} cm.
}
\\end{ex}
    `;

    return debai;
  }

  // Gọi hàm chính để giải
  return solve();
}
function min_S_xq_biet_V(e) {
  function solve() {
    const min = 1;
    const max = 10;
    const step = 1;
    const pi = Math.PI;

    // Tạo giá trị ngẫu nhiên trong khoảng từ 1 đến 10 với bước là 1
    const range = Math.floor((max - min) / step) + 1;
    const volume = min + Math.floor(Math.random() * range) * step;

    // Tính bán kính tối ưu r0 dựa trên thể tích ngẫu nhiên
    const optimalRadius = Math.pow((3 * volume) / (pi * Math.sqrt(2)), 1 / 3);

    // Tính chiều cao tương ứng
    const height = (3 * volume) / (pi * Math.pow(optimalRadius, 2));

    // Tính diện tích xung quanh nhỏ nhất
    const minSurfaceArea = pi * optimalRadius * Math.sqrt(optimalRadius * optimalRadius + height * height);
    const minSurfaceAreaRounded = minSurfaceArea.toFixed(1);

    const debai = `
\\begin{ex}
\\immini{
  Khi sản xuất cái phễu hình nón (không có nắp) bằng nhôm, các nhà thiết kế luôn đạt mục tiêu sao cho chi phí nguyên liệu là phễu ít nhất, tức là diện tích xung quanh của hình nón nhỏ nhất. Hỏi nếu muốn sản xuất một cái phễu có thể tích $${volume}$ dm$^3$ thì diện tích xung quanh của cái phễu, kết quả làm tròn đến hàng phần mười.
}
{ \\begin{tikzpicture}[line join=round, line cap=round, >=stealth, scale=0.9, font=\\footnotesize]
% Khởi tạo các điểm
\\coordinate (A) at (0,0);
\\coordinate (B) at (4,0);
\\coordinate (M) at (2,0);
\\coordinate (C) at (2,-3);
\\coordinate (D) at (2,-1.5);
\\coordinate (E) at (3,-1.5);
\\coordinate (F) at (2.7,0);
% Vẽ các cung tròn
\\draw (0,0) arc (180:360:2 and 0.4);
\\draw (4,0) arc (0:180:2 and 0.4);
% Vẽ các đoạn thẳng
\\draw (A) -- (B);
\\draw (A) -- (C);
\\draw (B) -- (C);
% Vẽ đoạn thẳng đứt nét
\\draw[dashed] (M) -- (C);
% Ghi nhãn các điểm
\\node at (D) [right] {$h$};
\\node at (E) [right] {$l$};
\\node at (F) [xshift=0.1cm,yshift=0.15cm] {$r$};
\\end{tikzpicture}
}
\\shortans{${minSurfaceAreaRounded}}
\\loigiai{
Gọi $r$ là bán kính đáy, $l$ là đường sinh và $h$ là chiều cao hình nón, ta có $l=\\sqrt{r^2+h^2}$.\\\\
Từ công thức thể tích khối nón $V=\\dfrac{1}{3}\\pi r^2h$, ta suy ra $h=\\dfrac{3V}{\\pi r^2}$.\\\\
Diện tích xung quanh của mặt nón $S=\\pi r l=\\pi r \\sqrt{r^2+h^2}=\\pi r\\sqrt{r^2+\\dfrac{9V^2}{\\pi^2r^4}}=\\pi\\sqrt{r^4+\\dfrac{9V^2}{\\pi^2r^2}}$.\\\\
Xét hàm số $f(r)=r^4+\\dfrac{9V^2}{\\pi^2r^2}$ xác định trên $(0;+\\infty)$.\\\\
Đạo hàm $f'(r)=4r^3-\\dfrac{18V^2}{\\pi^2r^3}$.\\\\
\\allowdisplaybreaks{
\\begin{eqnarray*}
f'(r)=0\\Leftrightarrow &4\\pi^2r^6=18V^2\\\\
\\Leftrightarrow & r^6=\\dfrac{18V^2}{4\\pi^2}\\\\
\\Leftrightarrow & r=r_0=\\sqrt[6]{\\dfrac{18\\times ${volume^2}}{4\\pi^2}}.
\\end{eqnarray*}}
Ta có bảng biến thiên
\\begin{center}
\\begin{tikzpicture}[>=stealth]
\\tkzTabInit[nocadre=false,lgt=1.2,espcl=2.5,deltacl=0.6]
{$r$ /0.6,$f’(r)$ /0.6,$f(r)$ /2}
{$0$,$r_0$,$+\\infty$}
\\tkzTabLine{d,-,0,+,} 
\\tkzTabVar{D+/,-/$f(r_0)$,+/$+\\infty$,}
\\end{tikzpicture}
\\end{center}
Dựa vào bảng biến thiên, hàm số $f(r)$ đạt giá trị nhỏ nhất là $f(r_0)$. Do đó $ S=\\pi\\sqrt{f(r)} $ đạt giá trị nhỏ nhất khi $ r=r_0 $.\\\\
Vậy diện tích xung quanh nhỏ nhất bằng $\\pi \\sqrt{r_0^4+\\dfrac{9\\times ${volume^2}}{\\pi^2 r_0^2}}\\approx ${minSurfaceAreaRounded}$ dm$^2$.
}
\\end{ex}
    `;
    return debai;
  }

  // Gọi hàm chính để giải
  return solve();
}
function min_h_chop_ngoai_tiep_cau(r) {
  function solve() {
    const min = 1;
    const max = 20;
    const step = 1;
    const pi = Math.PI;

    // Tạo giá trị ngẫu nhiên trong khoảng từ 1 đến 20 với bước là 1
    const range = Math.floor((max - min) / step) + 1;
    const radius = min + Math.floor(Math.random() * range) * step;        
    // Tính chiều cao tối ưu
    const optimalHeight = 4 * radius;
    const optimalHeightRounded = optimalHeight.toFixed(0);

    const debai = `
\\begin{ex}
Trong tất cả các khối chóp tam giác đều ngoại tiếp mặt cầu $(S)$ tâm $O$, bán kính $r = ${radius}$. Tính chiều cao $h$ của khối chóp khi diện tích toàn phần của khối chóp nhỏ nhất.
\\shortans{${optimalHeightRounded}}
\\loigiai{
Kí hiệu cạnh đáy của hình chóp là $a$, chiều cao là $h$, thể tích khối chóp là $V$, diện tích toàn phần là $S_{\\mathrm{tp}}$ thì $r=\\dfrac{3 V}{S_{\\mathrm{tp}}}$, tức là $S_{\\mathrm{tp}}=\\dfrac{3 V}{r}$.\\\\
Vậy $S_{\\mathrm{tp}}$ nhỏ nhất khi và chỉ khi $V$ nhỏ nhất.\\\\
Mặt khác, cũng từ hệ thức $S_{\\mathrm{tp}}=\\dfrac{3 V}{r}$, ta có hệ thức liên hệ giữa $a, h$ và $r$ là\\\\
$$r=\\dfrac{a h}{a+\\sqrt{a^{2}+12 h^{2}}}
\,\,\\left(V=\\dfrac{1}{3} \\cdot \\dfrac{a^{2} \\sqrt{3}}{4} \\cdot h=\\dfrac{\\sqrt{3}}{12} a^{2} \\cdot h\\right).$$\\\\
Gọi $M$ là trung điểm của $BC$ và đặt $\\widehat{SMH}=\\varphi$ (đó là góc giữa $mp(SBC)$ và $mp(ABC)$, cũng là góc giữa mặt bên và mặt đáy của hình chóp). \\\\
Khi ấy $h=\\dfrac{a \\sqrt{3}}{6} \\tan \\varphi$.\\\\
Thay vào, ta có $a=\\dfrac{6 r(\\cos \\varphi+1)}{\\sqrt{3} \\sin \\varphi}$, từ đó thay vào, ta có $h=\\dfrac{r(\\cos \\varphi+1)}{\\cos \\varphi}$\\\\
Suy ra $a^{2}=12 r^{2} \\dfrac{1+\\cos \\varphi}{1-\\cos \\varphi}$.\\\\
Nên $$\\\\
\\begin{aligned}
V &=\\dfrac{\\sqrt{3}}{12} \\cdot 12 r^{2} \\cdot \\dfrac{1+\\cos \\varphi}{1-\\cos \\varphi} \\cdot r \\cdot \\dfrac{1+\\cos \\varphi}{\\cos \\varphi} \\\\
&=\\sqrt{3} \\cdot r^{3} \\dfrac{(1+\\cos \\varphi)^{2}}{\\cos \\varphi(1-\\cos \\varphi)}=\\sqrt{3} \\cdot r^{3} \\dfrac{(1+t)^{2}}{t(1-t)}.
\\end{aligned}
$$\\\\
Với $0<t<1$, $f(t)=\\dfrac{(1+t)^{2}}{t(1-t)}$ có bảng biến thiên như sau:
\\begin{center}
\\begin{tikzpicture}[>=stealth]
\\tkzTabInit[nocadre=false,lgt=1.5,espcl=2,deltacl=0.5]
{$t$/.7 ,$f'(t)$/.7,$f(t)$/2} {$0$ ,$\\frac{1}{3}$ , $1$}
\\tkzTabLine{ , +, 0, -}
\\tkzTabVar{D+/ , +/$ \\infty$ , -/$ \\infty$}
\\end{tikzpicture}
\\end{center}
Vậy $f(t)$ đạt giá trị nhỏ nhất khi và chỉ khi $t=\\dfrac{1}{3}$, tức là $\\cos \\varphi=\\dfrac{1}{3}$. \\\\
Khi đó $h=4 r$, $\\tan \\varphi=2 \\sqrt{2}$, từ đó $a=2 r \\sqrt{6}$.\\\\
Vậy khi $a=2 r \\sqrt{6}$, $h=4 r\\approx ${optimalHeightRounded} thì diện tích toàn phần của hình chóp đạt giá trị nhỏ nhất.
}
\\end{ex}
    `;

    return debai;
  }

  // Gọi hàm chính để giải
  return solve();
}
function min_V_chop_ngoai_tiep_cau(r) {
  function solve() {
    const min = 1;
    const max = 9;
    const step = 0.5;        
    const pi = Math.PI;     
    // Tạo giá trị ngẫu nhiên trong khoảng từ 1 đến 20 với bước là 1
    const range = Math.floor((max - min) / step) + 1;
    const radius = min + Math.floor(Math.random() * range) * step;

    // Tính chiều cao tối ưu
    const optimalHeight = 4 * radius;
    const optimalHeightRounded = optimalHeight.toFixed(0);

    // Tính thể tích khối chóp
    const volume = (Math.sqrt(3) / 12) * Math.pow(2 * radius * Math.sqrt(6), 2) * optimalHeight;
    const volumeRounded = volume.toFixed(0);

    const debai = `
\\begin{ex}
Trong tất cả các khối chóp tam giác đều ngoại tiếp mặt cầu $(S)$ tâm $O$, bán kính $r = ${radius}$. Tính thể tích $V$ của khối chóp khi diện tích toàn phần của khối chóp nhỏ nhất, kết quả làm tròn đến phần nguyên.                       
\\shortans{$${volumeRounded}$}
\\loigiai{
Kí hiệu cạnh đáy của hình chóp là $a$, chiều cao là $h$, thể tích khối chóp là $V$, diện tích toàn phần là $S_{\\mathrm{tp}}$ thì $r=\\dfrac{3 V}{S_{\\mathrm{tp}}}$, tức là $S_{\\mathrm{tp}}=\\dfrac{3 V}{r}$.\\\\
Vậy $S_{\\mathrm{tp}}$ nhỏ nhất khi và chỉ khi $V$ nhỏ nhất.\\\\
Mặt khác, cũng từ hệ thức $S_{\\mathrm{tp}}=\\dfrac{3 V}{r}$, ta có hệ thức liên hệ giữa $a, h$ và $r$ là\\\\
$$r=\\dfrac{a h}{a+\\sqrt{a^{2}+12 h^{2}}}
\,\,\\left(V=\\dfrac{1}{3} \\cdot \\dfrac{a^{2} \\sqrt{3}}{4} \\cdot h=\\dfrac{\\sqrt{3}}{12} a^{2} \\cdot h\\right).$$\\\\
Gọi $M$ là trung điểm của $BC$ và đặt $\\widehat{SMH}=\\varphi$ (đó là góc giữa $mp(SBC)$ và $mp(ABC)$, cũng là góc giữa mặt bên và mặt đáy của hình chóp). \\\\
Khi ấy $h=\\dfrac{a \\sqrt{3}}{6} \\tan \\varphi$.\\\\
Thay vào, ta có $a=\\dfrac{6 r(\\cos \\varphi+1)}{\\sqrt{3} \\sin \\varphi}$, từ đó thay vào, ta có $h=\\dfrac{r(\\cos \\varphi+1)}{\\cos \\varphi}$\\\\
Suy ra $a^{2}=12 r^{2} \\dfrac{1+\\cos \\varphi}{1-\\cos \\varphi}$.\\\\
Nên $$\\\\
\\begin{aligned}
V &=\\dfrac{\\sqrt{3}}{12} \\cdot 12 r^{2} \\cdot \\dfrac{1+\\cos \\varphi}{1-\\cos \\varphi} \\cdot r \\cdot \\dfrac{1+\\cos \\varphi}{\\cos \\varphi} \\\\
&=\\sqrt{3} \\cdot r^{3} \\dfrac{(1+\\cos \\varphi)^{2}}{\\cos \\varphi(1-\\cos \\varphi)}=\\sqrt{3} \\cdot r^{3} \\dfrac{(1+t)^{2}}{t(1-t)}.
\\end{aligned}
$$\\\\
Với $0<t<1$, $f(t)=\\dfrac{(1+t)^{2}}{t(1-t)}$ có bảng biến thiên như sau:
\\begin{center}
\\begin{tikzpicture}[>=stealth]
\\tkzTabInit[nocadre=false,lgt=1.5,espcl=2,deltacl=0.5]
{$t$/.7 ,$f'(t)$/.7,$f(t)$/2} {$0$ ,$\\frac{1}{3}$ , $1$}
\\tkzTabLine{ , +, 0, -}
\\tkzTabVar{D-/ , +/$ \\infty$ , -/$ \\infty$}
\\end{tikzpicture}                  
\\end{center}
Vậy $f(t)$ đạt giá trị nhỏ nhất khi và chỉ khi $t=\\dfrac{1}{3}$, tức là $\\cos \\varphi=\\dfrac{1}{3}$. \\\\
Khi đó $h=4 r$, $\\tan \\varphi=2 \\sqrt{2}$, từ đó $a=2 r \\sqrt{6}$.\\\\
Vậy khi $a=2 r \\sqrt{6}$, $h=4 r= ${optimalHeightRounded}$ thì diện tích toàn phần của hình chóp đạt giá trị nhỏ nhất.\\\\
Thể tích khối chóp là $$V = \\dfrac{\\sqrt{3}}{12} \\cdot a^2 \\cdot h \\approx ${volumeRounded}.$$
}
\\end{ex}
    `;

    return debai;
  }

  // Gọi hàm chính để giải
  return solve();
}
 
          


