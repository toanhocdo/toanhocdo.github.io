function calculateMeetingProbability(timeRange, waitTime) {
    // Tổng số khả năng (diện tích hình vuông)
    const totalPossibilities = timeRange * timeRange;

    // Diện tích phần giao giữa các đường thẳng và hình vuông
    const intersectionArea = (timeRange - 2 * waitTime) * timeRange + 2 * (waitTime * waitTime);

    // Xác suất gặp nhau
    const probability = intersectionArea / totalPossibilities;

    return {
        probability: Math.round(probability * 10) / 10, // Làm tròn đến hàng phần chục
        intersectionArea: intersectionArea
    };
}

function xs_hai_nguoi_gap_nhau(e) {
  // Lựa chọn giờ bắt đầu ngẫu nhiên từ 7 đến 10
    const startHour = Math.floor(Math.random() * 5) + 7; // 7, 8, 9, hoặc 10
    const endHour = startHour + 1; // Giờ kết thúc là giờ bắt đầu + 1
    const timeRange = 60; // 8 giờ đến 9 giờ
    const waitTime = Math.floor(Math.random() * 26) + 5; // Lựa chọn thời gian chờ ngẫu nhiên trong khoảng 5-30 phút

    const result = calculateMeetingProbability(timeRange, waitTime);

    const totalArea = timeRange * timeRange;
    const shadedArea = totalArea - 2 * (0.5 * (timeRange -  waitTime) * (timeRange - waitTime));

    const latexOutput = `
        \\begin{ex}%[0D0C2-9]
            Hai bạn Việt và Nam hẹn nhau tại thư viện từ $${startHour}$ giờ đến $${endHour}$ giờ. Người đến trước đợi quá $${waitTime}$ phút mà không gặp thì rời đi. Tính xác suất để hai người đi đến nơi hẹn theo quy định mà gặp nhau (kết quả làm tròn đến hàng phần chục).
            \\\\\\shortans{$${result.probability}$}
            \\loigiai{
                \\immini{
                    Gọi $x$ (phút) là thời gian mà bạn Việt đến chờ ở thư viện.\\\\
                    Gọi $y$ (phút) là thời gian mà bạn Nam đến chờ ở thư viện.\\\\
                    Gọi $A$ là biến cố hai người gặp nhau.\\\\
                    Điều kiện $0 \\leq x \\leq 60, 0 \\leq y \\leq 60$.\\\\
                    Suy ra $n(\\Omega) = 60^2 = 3600$ (diện tích hình vuông cạnh $60$).\\\\
                    Điều kiện gặp nhau là
                    \\begin{eqnarray*}
                        &&|x - y| \\leq ${waitTime} \\\\
                        &\\Leftrightarrow &-${waitTime} \\leq x - y \\leq ${waitTime} \\\\
                        &\\Leftrightarrow& \\heva{& y \\leq x + ${waitTime} \\\\ &y \\geq x - ${waitTime}.}\\qquad(*)
                    \\end{eqnarray*}
                }
                {
                    \\begin{tikzpicture}[scale=.65, font=\\footnotesize, line join=round, line cap=round, >=stealth]
                        \\draw[->] (-1,0) -- (7,0) node[below] {$x$};
                        \\draw[->] (0,-1) -- (0,7) node[left] {$y$};
                        \\fill (0,0) circle (1pt) node[below left]{$O$};
                        \\draw (0,0) rectangle (6,6);
                        \\draw[thick,samples=150,smooth,domain=0:${(60 - waitTime) / 10}] plot(\\x,{1*\\x+(${waitTime / 10})});
                        \\draw (2.5,3.75)node[above,rotate=45]{$y=x+${waitTime}$};
                        \\draw (3.5,2)node[below,rotate=45]{$y=x-${waitTime}$};
                        \\draw[thick,samples=150,smooth,domain=${waitTime / 10}:6] plot(\\x,{1*\\x-(${waitTime / 10})});
                        \\fill[draw = none, blue,pattern=dots] (0,0)--(${waitTime / 10},0)--(6,${(60 - waitTime) / 10})--(6,6)--(${(60 - waitTime) / 10},6)--(0,${waitTime / 10})--cycle;
                        \\fill (6,0) circle (1pt) node[below]{$60$};
                        \\fill (0,6) circle (1pt) node[left]{$60$};
                        \\fill (${waitTime / 10},0) circle (1pt) node[below]{${waitTime}};
                        \\fill (0,${waitTime / 10}) circle (1pt) node[left]{${waitTime}};
                        \\fill (6,${(60 - waitTime) / 10}) circle (1pt);
                        \\fill (${(60 - waitTime) / 10},6) circle (1pt);
                    \\end{tikzpicture}
                }\\noindent
                Do điểm $M(x, y)$ thỏa điều kiện $(*)$ thuộc lục giác chấm chấm giới hạn bởi $2$ đường thẳng $y = x + ${waitTime}, y = x - ${waitTime}$ là hình vuông của không gian mẫu.\\\\
                Lục giác có diện tích $S'$ là diện tích phần giao của lục giác và hình vuông.\\\\
                Ta được $S' = 60 \\cdot 60 - 2 \\cdot \\dfrac{1}{2} \\cdot (60 -  ${waitTime}) \\cdot (60 -  ${waitTime}) = ${shadedArea}.\\\\
                Vậy xác suất hai người gặp nhau là $P(A) = \\dfrac{S'}{S} = \\dfrac{${shadedArea}}{3600} \\approx ${result.probability}$.
            }
        \\end{ex}
    `;

    return latexOutput;
}
function tinhdodaicungtheorad(e) {
    // Random đường kính từ 6 đến 12 cm
    let diameter = Math.floor(Math.random() * 7) + 6;

    // Random số đo cung từ 1 đến 10 rad (làm tròn đến 1 chữ số thập phân)
    let angle = (Math.random() * 9 + 1).toFixed(1);

    // Tính bán kính
    let radius = diameter / 2;

    // Tính độ dài cung tròn
    let correctAnswer = (angle * radius).toFixed(2);

    // Tạo các phương án nhiễu (mô phỏng các lỗi học sinh thường mắc)
    let wrongAnswer1 = (angle * diameter).toFixed(2); // Sai do dùng đường kính thay vì bán kính
    let wrongAnswer2 = (correctAnswer * 1.5).toFixed(2); // Sai do nhân quá lên (nhầm lẫn giá trị rad)
    let wrongAnswer3 = (correctAnswer * 0.7).toFixed(2); // Sai do tính thiếu giá trị

    // Đáp án đúng
    let correctAnswerFormatted = `${parseFloat(correctAnswer)}$ cm`;

    // Các đáp án nhiễu
    let answers = [
        `{\\True $${correctAnswerFormatted}}`,
        `{$${parseFloat(wrongAnswer1)}$ cm}`, // Lỗi do dùng đường kính
        `{$${parseFloat(wrongAnswer2)}$ cm}`, // Lỗi do nhân nhầm hằng số
        `{$${parseFloat(wrongAnswer3)}$ cm}`  // Lỗi do tính thiếu
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Trên đường tròn đường kính $${diameter}$ cm, tính độ dài cung tròn có số đo bằng $${angle}$ rad.
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Tính được $\\ell=\\alpha \\cdot R=${angle} \\cdot \\dfrac{${diameter}}{2}=${correctAnswerFormatted}$.
    }
    \\end{ex}
    `;

    return exercise;
} 
function gcd(a, b) {
    // Hàm tính ước chung lớn nhất (Greatest Common Divisor)
    if (!b) return a;
    return gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    // Hàm rút gọn phân số
    let divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
}

function formatFraction(numerator, denominator) {
    // Nếu mẫu số là 1, chỉ trả về tử số
    if (denominator === 1) return `${numerator} \\pi`;
    // Nếu tử số là 1, chỉ trả về π
    if (numerator === 1) return `\\pi`;
    return `\\dfrac{${numerator}}{${denominator}} \\pi`;
}

function tinhdodaicungtheodo(e){
    // Random bán kính từ 5 đến 10
    let radius = Math.floor(Math.random() * 6) + 5;

    // Random số đo cung từ 30 đến 90 độ
    let angle = Math.floor(Math.random() * 61) + 30;

    // Tử số và mẫu số để tính độ dài cung tròn (trước khi chia)
    let numerator = radius * angle;
    let denominator = 180;

    // Rút gọn phân số
    let [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(numerator, denominator);

    // Tạo các phương án sai (giá trị xấp xỉ)
    let wrongAnswer1 = simplifyFraction(simplifiedNumerator * 9, simplifiedDenominator * 10);
    let wrongAnswer2 = simplifyFraction(simplifiedNumerator * 11, simplifiedDenominator * 10);
    let wrongAnswer3 = simplifyFraction(simplifiedNumerator * 8, simplifiedDenominator * 10);

    // Đáp án đúng
    let correctAnswer = formatFraction(simplifiedNumerator, simplifiedDenominator);

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswer}$}`,
        `{$${formatFraction(wrongAnswer1[0], wrongAnswer1[1])}$}`,
        `{$${formatFraction(wrongAnswer2[0], wrongAnswer2[1])}$}`,
        `{$${formatFraction(wrongAnswer3[0], wrongAnswer3[1])}$}`
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Trên đường tròn bán kính $${radius}$, lấy cung có số đo $${angle}^{\\circ}$. Độ dài $\\ell$ của cung tròn bằng
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Ta có $\\ell=${radius} \\cdot \\left(\\dfrac{${angle}^{\\circ}}{180^{\\circ}} \\cdot \\pi\\right) = ${formatFraction(simplifiedNumerator, simplifiedDenominator)}.
    }
    \\end{ex}
    `;

    return exercise;
}
function tinhdodaicungtheokimgio(e) {
    // Random số giờ từ 1 đến 12
    let hour = Math.floor(Math.random() * 12) + 1;

    // Random số phút từ 0 đến 59
    let minutes = Math.floor(Math.random() * 60);

    // Random bán kính kim giờ từ 5 đến 15 cm
    let radius = (Math.random() * 10 + 5).toFixed(2); // Bán kính từ 5 đến 15 cm

    // Tính góc quét dựa trên số giờ và phút
    let angle = (2 * Math.PI * (hour + minutes / 60)) / 12;

    // Tính độ dài cung tròn chính xác
    let correctAnswer = (angle * radius).toFixed(2);

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = (correctAnswer * 0.95).toFixed(2);  // Lỗi nhỏ, lệch nhẹ
    let wrongAnswer2 = (correctAnswer * 1.05).toFixed(2);  // Lỗi lớn hơn chút
    let wrongAnswer3 = (correctAnswer * 0.9).toFixed(2);   // Lỗi lớn hơn nhiều

    // Đáp án đúng
    let correctAnswerFormatted = `${parseFloat(correctAnswer)}$ cm`;

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}}`,  // Đáp án đúng
        `{$${parseFloat(wrongAnswer1)}$ cm}`,    // Lỗi nhỏ
        `{$${parseFloat(wrongAnswer2)}$ cm}`,    // Lỗi lớn hơn chút
        `{$${parseFloat(wrongAnswer3)}$ cm}`     // Lỗi lớn hơn nhiều
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Một đồng hồ treo tường, kim giờ dài $${radius}$ cm. Trong $${hour}$ giờ và $${minutes}$ phút, mũi kim giờ vạch lên cung tròn có độ dài là:
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Trong $${hour}$ giờ và $${minutes}$ phút, mũi kim giờ quét được một góc là $\\dfrac{2 \\pi \\cdot (${hour} + \\dfrac{${minutes}}{60})}{12} \\Rightarrow l=\\alpha \\cdot R = ${correctAnswerFormatted}$.
    }
    \\end{ex}
    `;

    return exercise;
}
function tinhdodaicungtheoquaybanhxe(e) {
    // Random bán kính bánh xe từ 30 đến 70 cm
    let radius = Math.floor(Math.random() * 41) + 30; // Bán kính từ 30 đến 70 cm

    // Random số vòng quay từ 1 đến 10
    let rotations = Math.floor(Math.random() * 10) + 1;

    // Tính quãng đường đi được (chu vi * số vòng quay)
    let correctAnswer = Math.round(2 * radius * rotations);

    // Tạo các phương án sai khác nhau ngay từ đầu
    let wrongAnswer1 = Math.round(radius * rotations);  // Lỗi quên nhân 2 vào chu vi
    let wrongAnswer2 = Math.round(2 * (radius / 2) * rotations);  // Lỗi nhầm bán kính thành đường kính
    let wrongAnswer3 = Math.round(2 * radius * (rotations + 1));  // Lỗi tăng sai số vòng quay

    // Kiểm tra và sửa đổi nếu có phương án trùng lặp
    if (wrongAnswer1 === correctAnswer) {
        wrongAnswer1 = wrongAnswer1 + 5; // Thay đổi 1 chút nếu trùng
    }
    if (wrongAnswer2 === correctAnswer || wrongAnswer2 === wrongAnswer1) {
        wrongAnswer2 = wrongAnswer2 + 10; // Thay đổi 1 chút nếu trùng
    }
    if (wrongAnswer3 === correctAnswer || wrongAnswer3 === wrongAnswer1 || wrongAnswer3 === wrongAnswer2) {
        wrongAnswer3 = wrongAnswer3 + 15; // Thay đổi 1 chút nếu trùng
    }

    // Đáp án đúng
    let correctAnswerFormatted = `${correctAnswer} \\pi$ cm`;

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}}`,  // Đáp án đúng
        `{$${wrongAnswer1} \\pi$ cm}`,  // Lỗi quên nhân 2 vào chu vi
        `{$${wrongAnswer2} \\pi$ cm}`,  // Lỗi nhầm bán kính thành đường kính
        `{$${wrongAnswer3} \\pi$ cm}`   // Lỗi tăng sai số vòng quay
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Bánh xe đạp có bán kính $${radius}$ cm. Một người quay bánh xe $${rotations}$ vòng quanh trục thì quãng đường đi được là:
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Ta có $r=${radius}$ cm suy ra quãng đường $l=2 \\pi r \\cdot ${rotations} = ${correctAnswerFormatted}$ cm.
    }
    \\end{ex}
    `;

    return exercise;
}
        

function tinhthoigianduquay(e) {
    // Random bán kính từ 5 đến 15 m
    let radius = Math.floor(Math.random() * 11) + 5; // Bán kính từ 5 đến 15 m

    // Random tốc độ quay từ 1 đến 5 vòng/phút
    let speed = Math.floor(Math.random() * 5) + 1;

    // Random góc quay từ 90 đến 360 độ
    let angle = Math.floor(Math.random() * 271) + 90; // Góc từ 90 đến 360 độ

    // Tính số vòng quay tương ứng với góc
    let roundsNumerator = angle;
    let roundsDenominator = 360;

    // Rút gọn phân số số vòng quay
    let [simplifiedRoundsNumerator, simplifiedRoundsDenominator] = simplifyFraction(roundsNumerator, roundsDenominator);

    // Tính thời gian cần thiết (phân số)
    let timeNumerator = simplifiedRoundsNumerator;
    let timeDenominator = simplifiedRoundsDenominator * speed;

    // Rút gọn phân số thời gian
    let [simplifiedTimeNumerator, simplifiedTimeDenominator] = simplifyFraction(timeNumerator, timeDenominator);

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = `\\dfrac{${simplifiedTimeNumerator + 1}}{${simplifiedTimeDenominator}}`;  // Thay đổi tử số
    let wrongAnswer2 = `\\dfrac{${simplifiedTimeNumerator}}{${simplifiedTimeDenominator + 1}}`;  // Thay đổi mẫu số
    let wrongAnswer3 = `\\dfrac{${simplifiedTimeNumerator + 2}}{${simplifiedTimeDenominator}}`;  // Thay đổi tử số nhiều hơn

    // Đáp án đúng
    let correctAnswerFormatted = `\\dfrac{${simplifiedTimeNumerator}}{${simplifiedTimeDenominator}}$ phút`;

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}}`,  // Đáp án đúng
        `{$${wrongAnswer1}$ phút}`,               // Phương án sai 1
        `{$${wrongAnswer2}$ phút}`,               // Phương án sai 2
        `{$${wrongAnswer3}$ phút}`                // Phương án sai 3
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Một đu quay ở công viên có bán kính $${radius}$ m. Tốc độ của đu quay là $${speed}$ vòng/phút. Hỏi mất bao lâu để đu quay quay được góc $${angle}^{\\circ}$?
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Tính được: $${angle}^{\\circ} = \\dfrac{${roundsNumerator}}{180} \\pi = \\dfrac{${simplifiedRoundsNumerator}}{${simplifiedRoundsDenominator}} \\cdot 2 \\pi$.
    Vậy đu quay quay được góc $${angle}^{\\circ}$ khi nó quay được $\\dfrac{${simplifiedRoundsNumerator}}{${simplifiedRoundsDenominator}}$ vòng.
    Ta có đu quay quay được $1$ vòng trong $\\dfrac{1}{${speed}}$ phút. Đu quay quay được $\\dfrac{${simplifiedRoundsNumerator}}{${simplifiedRoundsDenominator}}$ vòng trong $\\dfrac{${simplifiedTimeNumerator}}{${simplifiedTimeDenominator}}$ phút.
    }
    \\end{ex}
    `;

    return exercise;
}
function formatFraction(numerator, denominator) {
    if (denominator === 1) {
        return `${numerator}`; // Nếu mẫu số là 1, chỉ trả về tử số
    } else {
        return `\\dfrac{${numerator}}{${denominator}}`; // Trả về phân số nếu mẫu số khác 1
    }
}

function tinhdodaicungkimdongho(e) {
    // Random bán kính từ 5 đến 15 cm (đổi thành số nguyên)
    let radius = Math.floor(Math.random() * 11) + 5; // Bán kính từ 5 đến 15 cm

    // Random số phút từ 10 đến 60 phút
    let minutes = Math.floor(Math.random() * 51) + 10; // Số phút từ 10 đến 60 phút

    // Tính góc quay dựa trên số phút: mỗi 60 phút là 2π, nên mỗi phút là π/30
    let angleNumerator = minutes;   // Tử số của góc quay
    let angleDenominator = 30;      // Mẫu số của π/30

    // Tính độ dài cung tròn: l = R * α (R là bán kính, α là góc quét)
    let lengthNumerator = radius * angleNumerator; // Tử số của độ dài cung
    let lengthDenominator = angleDenominator;      // Mẫu số của độ dài cung

    // Rút gọn phân số
    let [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(lengthNumerator, lengthDenominator);

    // Format kết quả: nếu mẫu số là 1, chỉ hiển thị tử số
    let correctAnswerFormatted = `${formatFraction(simplifiedNumerator, simplifiedDenominator)} \\pi$ cm`;

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = `${formatFraction(simplifiedNumerator, simplifiedDenominator * 2)} \\pi$ cm`;  // Lỗi nhầm mẫu số lớn hơn
    let wrongAnswer2 = `${formatFraction(simplifiedNumerator, simplifiedDenominator / 2)} \\pi$ cm`;  // Lỗi nhầm mẫu số nhỏ hơn
    let wrongAnswer3 = `${formatFraction(simplifiedNumerator, simplifiedDenominator * 4)} \\pi$ cm`;  // Lỗi tăng gấp 4 lần mẫu số

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}}`,  // Đáp án đúng
        `{${wrongAnswer1}}`,                   // Sai phương án 1
        `{${wrongAnswer2}}`,                   // Sai phương án 2
        `{${wrongAnswer3}}`                    // Sai phương án 3
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Một đồng hồ treo tường có kim giờ dài $${radius}$ cm. Trong $${minutes}$ phút, mũi kim giờ vạch lên cung tròn có độ dài bằng bao nhiêu?
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Trong $60$ phút, mũi kim giờ vạch lên $1$ cung có số đo là $\\dfrac{2 \\pi}{12} = \\dfrac{\\pi}{6}$, nên trong $${minutes}$ phút kim giờ vạch lên $1$ cung có số đo là $\\dfrac{${minutes}}{30} \\pi$.\\\\
    Vậy độ dài cung tròn mà mũi kim giờ vạch lên là $l = R \\cdot \\alpha = ${radius} \\times \\dfrac{${minutes}}{30} \\pi = ${formatFraction(simplifiedNumerator, simplifiedDenominator)} \\pi$ cm.
    }
    \\end{ex}
    `;

    return exercise;
}


function tinhovongquaybanhxe(e) {
    // Random đường kính bánh xe từ 40 đến 70 cm
    let diameter = Math.floor(Math.random() * 31) + 40; // Đường kính từ 40 đến 70 cm

    // Random vận tốc từ 10 đến 50 km/h
    let speed = Math.floor(Math.random() * 41) + 10; // Vận tốc từ 10 đến 50 km/h

    // Random thời gian từ 10 đến 60 giây
    let time = Math.floor(Math.random() * 51) + 10; // Thời gian từ 10 đến 60 giây

    // Tính bán kính (r = đường kính / 2)
    let radius = diameter / 2; // cm
    let radiusMeters = radius / 100; // chuyển đổi sang mét

    // Tính tốc độ m/s từ km/h
    let speedMetersPerSecond = (speed * 1000) / 3600;

    // Tính quãng đường đi được trong khoảng thời gian cho trước
    let distance = speedMetersPerSecond * time; // m

    // Tính số vòng quay của bánh xe (x = quãng đường / chu vi bánh xe)
    let circumference = 2 * Math.PI * radiusMeters; // Chu vi bánh xe (m)
    let rotations = distance / circumference;

    // Làm tròn số vòng quay
    let roundedRotations = Math.round(rotations);

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = Math.round(roundedRotations * 0.5); // Lỗi tính thiếu
    let wrongAnswer2 = Math.round(roundedRotations * 2);   // Lỗi tính gấp đôi
    let wrongAnswer3 = Math.round(roundedRotations * 1.25); // Lỗi tính thừa

    // Đáp án đúng
    let correctAnswerFormatted = `${roundedRotations}`;

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}$}`,  // Đáp án đúng
        `{$${wrongAnswer1}$}`,                   // Sai phương án 1
        `{$${wrongAnswer2}$}`,                   // Sai phương án 2
        `{$${wrongAnswer3}$}`                    // Sai phương án 3
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Bánh xe đạp có đường kính $${diameter}$ cm (kể cả lốp). Nếu chạy với vận tốc $${speed}$ km/h thì trong $${time}$ giây, bánh xe quay được số vòng gần bằng với kết quả nào dưới đây?
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Ta có $r=\\dfrac{${diameter}}{2}$ cm = $\\dfrac{${diameter / 100}}{2}$ m ; $${speed}$ km/h = $\\dfrac{${speed * 1000}}{3600}$ m/s.\\\\
    Gọi $l$ là quãng đường đi được trong $${time}$ giây.\\\\
    Gọi $x$ là số vòng bánh xe quay được trong $${time}$ giây.\\\\
    Khi đó $l=2 \\pi \\cdot r \\cdot x$.\\\\
    Mà $l=\\dfrac{${time} \\cdot ${speed * 1000}}{3600}$ m, suy ra $x=\\dfrac{l}{2 \\pi \\cdot r} \\approx ${roundedRotations}$ vòng.
    }
    \\end{ex}
    `;

    return exercise;
}

function gcd(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    let divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
}



function tinhquangduongkimphut(e) {
    // Random chiều dài kim giờ và kim phút
    let hourHandLength = Math.floor(Math.random() * 11) + 5; // Chiều dài kim giờ từ 5 đến 15 cm
    let minuteHandLength = Math.floor(Math.random() * 11) + 5; // Chiều dài kim phút từ 5 đến 15 cm

    // Random số phút từ 10 đến 60 phút
    let minutes = Math.floor(Math.random() * 51) + 10; // Thời gian từ 10 đến 60 phút

    // Tính góc quay của kim phút và kim giờ trong khoảng thời gian đó
    let minuteAngle = (2 * Math.PI) * (minutes / 60); // Góc quay của kim phút
    let hourAngle = (2 * Math.PI / 12) * (minutes / 60); // Góc quay của kim giờ

    // Tính quãng đường mà kim phút và kim giờ đi được
    let minuteDistance = minuteAngle * minuteHandLength; // Quãng đường kim phút
    let hourDistance = hourAngle * hourHandLength;       // Quãng đường kim giờ

    // Tính tổng quãng đường
    let totalDistanceNumerator = Math.round(minuteDistance * 3 + hourDistance * 3); // Tử số (tính cho phân số)
    let totalDistanceDenominator = 3; // Mẫu số của phân số (để có dạng phân số đẹp)

    // Rút gọn phân số
    let [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(totalDistanceNumerator, totalDistanceDenominator);

    // Tạo các phương án sai dựa trên các lỗi học sinh thường gặp
    let wrongAnswer1 = `\\dfrac{${simplifiedNumerator}}{${simplifiedDenominator * 2}} \\pi`;  // Sai mẫu số lớn hơn
    let wrongAnswer2 = `\\dfrac{${simplifiedNumerator}}{${simplifiedDenominator / 2}} \\pi`;  // Sai mẫu số nhỏ hơn
    let wrongAnswer3 = `\\dfrac{${simplifiedNumerator + 5}}{${simplifiedDenominator}} \\pi`;  // Sai tử số tăng

    // Đáp án đúng
    let correctAnswerFormatted = `${formatFraction(simplifiedNumerator, simplifiedDenominator)} \\pi`;

    // Các đáp án sai
    let answers = [
        `{\\True $${correctAnswerFormatted}$}`,  // Đáp án đúng
        `{$${wrongAnswer1}$}`,                   // Sai phương án 1
        `{$${wrongAnswer2}$}`,                   // Sai phương án 2
        `{$${wrongAnswer3}$}`                    // Sai phương án 3
    ];

    // Shuffle các câu trả lời
    answers.sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Kim giờ của đồng hồ dài $${hourHandLength}$ cm, kim phút dài $${minuteHandLength}$ cm. Tổng quãng đường mũi kim phút, kim giờ đi được trong $${minutes}$ phút bằng
    \\choice
    ${answers.join("\n")}
    \\loigiai{
    Trong $${minutes}$ phút, kim phút quay được một góc là $${formatFraction(minutes, 60)} \\cdot 2 \\pi = ${minuteAngle.toFixed(2)}$ rad.\\\\
    Quãng đường kim phút đi được là $S_1 = ${minuteAngle.toFixed(2)} \\cdot ${minuteHandLength} = ${minuteDistance.toFixed(2)} \\pi$ (cm).\\\\
    Trong $${minutes}$ phút, kim giờ quay được một góc là $\\dfrac{1}{12} \\cdot ${formatFraction(minutes, 60)} \\cdot 2 \\pi = ${hourAngle.toFixed(2)}$ rad.\\\\
    Quãng đường kim giờ đi được là $S_2 = ${hourAngle.toFixed(2)} \\cdot ${hourHandLength} = ${hourDistance.toFixed(2)} \\pi$ (cm).\\\\
    Vậy tổng quãng đường cần tìm là $S = S_1 + S_2 = ${correctAnswerFormatted} \\pi$ (cm).
    }
    \\end{ex}
    `;

    return exercise;
}

function TFdoirad2do(e) {
    // Random các giá trị cho góc (rad) từ pi/12 đến 2pi
    let randomValues = [
        {numerator: 1, denominator: 9, degree: 20},
        {numerator: 5, denominator: 4, degree: 225},
        {numerator: 3, denominator: 5, degree: 108},
        {numerator: 7, denominator: 12, degree: 105}
    ];

    // Shuffle thứ tự của các mệnh đề
    randomValues.sort(() => Math.random() - 0.5);

    // Tạo mệnh đề đúng/sai ngẫu nhiên
    let statements = randomValues.map(({numerator, denominator, degree}, index) => {
        // Random True/False cho các mệnh đề
        let isTrue = Math.random() < 0.5;
        let correctDegree = (numerator / denominator) * 180; // Đổi rad sang độ thực tế
        
        // Tạo mệnh đề đúng/sai
        let displayedDegree = isTrue ? Math.round(correctDegree) : Math.round(correctDegree) + (index % 2 === 0 ? 10 : -10); // Tạo nhiễu nếu sai
        return isTrue
            ? `{\\True $\\dfrac{${numerator} \\pi}{${denominator}} rad = ${displayedDegree}^{\\circ}$}`
            : `{$\\dfrac{${numerator} \\pi}{${denominator}} rad = ${displayedDegree}^{\\circ}$}`;
    });

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Đổi số đo của các góc sang độ. Xét tính đúng sai của các mệnh đề sau:
    \\choiceTF
    ${statements.join("\n")}
    \\loigiai{
    Áp dụng công thức đổi rad sang độ $n=\\dfrac{\\alpha \\cdot 180}{\\pi}$.
    \\begin{itemize}
    ${randomValues.map(({numerator, denominator, degree}, index) => {
        let correctDegree = (numerator / denominator) * 180;
        let displayedDegree = degree;
        let correct = Math.round(correctDegree) === displayedDegree ? "Đúng" : "Sai";
        return `\\item ${correct}: $n=\\dfrac{${numerator} \\pi}{${denominator}} \\cdot \\dfrac{180^{\\circ}}{\\pi} = ${correctDegree}^{\\circ}$`;
    }).join("\n")}
    \\end{itemize}
    }
    \\end{ex}
    `;

    return exercise;
}

function TFdoido2rad(e) {
    // Random các giá trị cho góc (độ) và radian đúng/sai
    let randomValues = [
        {degree: 120, radNumerator: 2, radDenominator: 3, isTrue: false},
        {degree: 250, radNumerator: 25, radDenominator: 18, isTrue: true},
        {degree: 135, radNumerator: 3, radDenominator: 4, isTrue: true},
        {degree: 300, radNumerator: 5, radDenominator: 3, isTrue: true}
    ];

    // Shuffle thứ tự của các mệnh đề
    randomValues.sort(() => Math.random() - 0.5);

    // Tạo mệnh đề đúng/sai ngẫu nhiên
    let statements = randomValues.map(({degree, radNumerator, radDenominator, isTrue}) => {
        return isTrue
            ? `{\\True $${degree}^{\\circ} = \\dfrac{${radNumerator} \\pi}{${radDenominator}}$ rad}`
            : `{$${degree}^{\\circ} = \\dfrac{${radNumerator} \\pi}{${radDenominator}}$ rad}`;
    });

    // Tạo LaTeX-like output cho đề bài
    let exercise = `\\begin{ex}
    Đổi số đo của các góc sang rađian. Xét tính đúng sai của các mệnh đề sau:
    \\choiceTF
    ${statements.join("\n")}
    \\loigiai{
    \\begin{itemize}
    ${randomValues.map(({degree, radNumerator, radDenominator, isTrue}) => {
        let correctNumerator = degree;
        let correctDenominator = 180;
        let [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(correctNumerator, correctDenominator);
        let correct = isTrue ? "Đúng" : "Sai";
        return `\\item ${correct}: Ta có $${degree}^{\\circ} = \\dfrac{${degree} \\cdot \\pi}{180} = \\dfrac{${simplifiedNumerator} \\pi}{${simplifiedDenominator}}$ rad`;
    }).join("\n")}
    \\end{itemize}
    }
    \\end{ex}
    `;

    return exercise;
}

function gcd(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    let divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
}

function TFcunggocdtron(e) {
    // Các giá trị ngẫu nhiên cho bán kính và số đo cung tròn (radian)
    let randomValues = [
        {radius: 9, arcLength: "3 \\pi", radian: "\\dfrac{\\pi}{3}", isTrue: true},
        {radius: 30, arcLength: "75", radian: "2.5", isTrue: false},
        {radius: 10, arcLength: "24", radian: "\\dfrac{5}{3}", isTrue: false},
        {radius: 6, arcLength: "3", radian: "\\dfrac{1}{2}", isTrue: true}
    ];

    // Shuffle thứ tự của các mệnh đề
    randomValues.sort(() => Math.random() - 0.5);

    // Tạo mệnh đề đúng/sai ngẫu nhiên
    let statements = randomValues.map(({radius, arcLength, radian, isTrue}) => {
        return isTrue
            ? `{\\True Đường tròn có bán kính bằng $${radius}$ cm thì số đo (radian) của cung có độ dài $${arcLength}$ cm bằng $${radian}$ rad}`
            : `{Đường tròn có bán kính bằng $${radius}$ cm thì số đo (radian) của cung có độ dài $${arcLength}$ cm bằng $${radian}$ rad}`;
    });

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Xét tính đúng sai của các mệnh đề sau:
    \\choiceTF
    ${statements.join("\n")}
    \\loigiai{
    \\begin{itemize}
    ${randomValues.map(({radius, arcLength, radian, isTrue}) => {
        let correct = isTrue ? "Đúng" : "Sai";
        let explanation;
        if (isTrue) {
            explanation = `\\item ${correct}: $\\ell=R \\cdot \\alpha \\Rightarrow \\alpha=\\dfrac{l}{R}=\\dfrac{${arcLength}}{${radius}} = ${radian}$ rad`;
        } else {
            explanation = `\\item ${correct}: Áp dụng công thức $\\ell=R \\cdot \\alpha$ ta có $R=\\dfrac{l}{\\alpha}=\\dfrac{${arcLength}}{${radian}}$, tính ra không khớp với bán kính`;
        }
        return explanation;
    }).join("\n")}
    \\end{itemize}
    }
    \\end{ex}
    `;

    return exercise;
}
 function TFcunggocbanhxe(e){
    // Sinh đường kính ngẫu nhiên từ 500 mm đến 800 mm
    let diameter = Math.floor(Math.random() * (800 - 500 + 1)) + 500;
    
    // Sinh số vòng quay ngẫu nhiên từ 8 đến 15 vòng
    let rounds = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
    
    // Sinh thời gian ngẫu nhiên từ 4 đến 10 giây
    let timeInSeconds = Math.floor(Math.random() * (10 - 4 + 1)) + 4;

    // Tính các thông số
    let roundsPerSecond = rounds / timeInSeconds; // Số vòng quay trong 1 giây
    let angleInDegrees = roundsPerSecond * 360;   // Góc quay (độ) trong 1 giây
    let angleInRadians = roundsPerSecond * 2 * Math.PI; // Góc quay (radian) trong 1 giây
    let roundsPerMinute = roundsPerSecond * 60;   // Số vòng quay trong 1 phút
    let circumferenceInMeters = (diameter / 1000) * Math.PI; // Chu vi bánh xe (mét)
    let distanceInOneMinute = circumferenceInMeters * roundsPerMinute; // Quãng đường trong 1 phút

    // Sinh số vòng sai dựa trên một giá trị lệch nhỏ
    let wrongRoundsPerMinute = Math.floor(roundsPerMinute + Math.random() * 10 - 5); // Lệch nhỏ từ 5 vòng

    // Tạo các phương án đúng
    let correctStatements = [
        `{\\True Góc (theo độ) mà bánh xe quay được trong $1$ giây là $${angleInDegrees.toFixed(0)}^{\\circ}$}`,
        `{\\True Quãng đường mà người đi xe đã đi được trong $1$ phút khoảng ${distanceInOneMinute.toFixed(0)} m}`
    ];

    // Tạo các phương án sai
    let incorrectStatements = [
        `{Góc (theo radian) mà bánh xe quay được trong $1$ giây là $\\dfrac{2 \\pi}{5}$ rad}`,
        `{Trong một phút bánh xe quay được $${wrongRoundsPerMinute}$ vòng}`
    ];

    // Trộn ngẫu nhiên các phương án
    let allStatements = correctStatements.concat(incorrectStatements).sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Một vận động viên đi xe đạp trên đường, bánh xe đạp của vận động viên này quay được $${rounds}$ vòng trong $${timeInSeconds}$ giây. Biết rằng đường kính của bánh xe đạp là $${diameter}$ mm.
    \\choiceTF
    ${allStatements.join("\n")}
    \\loigiai{
    \\begin{itemize}
    \\item Đúng: Trong $1$ giây, bánh xe đạp quay được $\\dfrac{${rounds}}{${timeInSeconds}}$ vòng. Vì một vòng ứng với góc bằng $360^{\\circ}$ nên góc mà bánh xe quay được trong $1$ giây là $$\\dfrac{${rounds}}{${timeInSeconds}} \\cdot 360 = ${angleInDegrees.toFixed(0)}^{\\circ}$$
    \\item Sai: Vì một vòng ứng với góc bằng $2 \\pi$ rad nên góc mà bánh xe quay được trong $1$ giây là $$\\dfrac{${rounds}}{${timeInSeconds}} \\cdot 2 \\pi = ${angleInRadians.toFixed(2)}$$ (rad).
    \\item Sai: Trong $1$ phút, bánh xe quay được $60 \\cdot \\dfrac{${rounds}}{${timeInSeconds}} = ${roundsPerMinute.toFixed(0)}$ vòng, không phải $${wrongRoundsPerMinute}$ vòng.
    \\item Đúng: Chu vi của bánh xe đạp là $C = ${diameter} \\cdot \\pi$ mm, và quãng đường mà người đi xe đạp đã đi được trong $1$ phút là $$S = ${roundsPerMinute.toFixed(0)} \\times ${circumferenceInMeters.toFixed(2)} \\approx ${distanceInOneMinute.toFixed(0)}$$ mét.
    \\end{itemize}
    }
    \\end{ex}
    `;

    return exercise;
}
function TFthucteVeTinh(e) {
    // Sinh bán kính quỹ đạo ngẫu nhiên từ 8000 km đến 10000 km
    let radius = Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000;

    // Sinh thời gian hoàn thành một vòng quỹ đạo ngẫu nhiên từ 1 đến 3 giờ
    let fullOrbitTime = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    // Sinh thời gian ngẫu nhiên để tính toán các trường hợp
    let timeForRandom1 = (Math.random() * 2 + 1).toFixed(2); // Random từ 1 đến 3 giờ
    let timeForRandom2 = (Math.random() * 3 + 1).toFixed(2); // Random từ 1 đến 4 giờ
    let randomTimeForFalseStatement = (Math.random() * (7 - 4) + 4).toFixed(2); // Random từ 4 đến 7 giờ
    let randomTimeForAngle = (Math.random() * (6 - 3) + 3).toFixed(2); // Random từ 3 đến 6 giờ

    // Tính chu vi quỹ đạo
    let circumference = 2 * Math.PI * radius; // Chu vi quỹ đạo (km)

    // Quãng đường vệ tinh di chuyển sau timeForRandom1 giờ
    let distanceAfterTimeForRandom1 = (circumference / fullOrbitTime) * timeForRandom1;

    // Quãng đường vệ tinh di chuyển sau timeForRandom2 giờ
    let distanceAfterTimeForRandom2 = (circumference / fullOrbitTime) * timeForRandom2;

    // Quãng đường ngẫu nhiên sai để tạo nhiễu (240000 km là giá trị cố định)
    let wrongDistance = 240000;

    // Tính số vòng di chuyển sai
    let hoursForWrongDistance = randomTimeForFalseStatement;

    // Tính góc quay sau một thời gian ngẫu nhiên
    let angleAfterRandomTime = (randomTimeForAngle / fullOrbitTime) * 2 * Math.PI;

    // Tạo các phương án đúng
    let correctStatements = [
        `{\\True Quãng đường vệ tinh $X$ chuyển động được sau $${timeForRandom1}$ giờ là $\\approx ${distanceAfterTimeForRandom1.toFixed(2)}$ km}`,
        `{\\True Quãng đường vệ tinh $X$ chuyển động được sau $${timeForRandom2}$ giờ là $\\approx ${distanceAfterTimeForRandom2.toFixed(2)}$ km}`,
        `{\\True Giả sử vệ tinh di chuyển theo chiều dương của đường tròn, sau ${randomTimeForAngle} giờ thì vệ tinh vẽ nên một góc $\\approx ${angleAfterRandomTime.toFixed(2)} rad$}`
    ];

    // Tạo các phương án sai
    let incorrectStatements = [
        `{Sau khoảng ${hoursForWrongDistance} giờ thì $X$ di chuyển được quãng đường ${wrongDistance} km}`
    ];

    // Trộn ngẫu nhiên các phương án
    let allStatements = correctStatements.concat(incorrectStatements).sort(() => Math.random() - 0.5);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Từ một vị trí ban đầu trong không gian, vệ tinh $X$ chuyển động theo quỹ đạo là một đường tròn quanh Trái Đất và luôn cách tâm Trái Đất một khoảng bằng $${radius}$ km. Sau $${fullOrbitTime}$ giờ thì vệ tinh $X$ hoàn thành hết một vòng di chuyển.
    \\choiceTF
    ${allStatements.join("\n")}
    \\loigiai{
    \\begin{itemize}
    \\item Đúng: Một vòng di chuyển của $X$ chính là chu vi đường tròn:
    $$C = 2 \\pi R = 2 \\pi \\cdot ${radius} = ${circumference.toFixed(2)}$$ (km).
    Sau $${timeForRandom1}$ giờ, vệ tinh di chuyển được quãng đường là:
    $$\\dfrac{${timeForRandom1}}{${fullOrbitTime}} \\cdot C = ${distanceAfterTimeForRandom1.toFixed(2)}$$ (km).
    \\item Đúng: Sau $${timeForRandom2}$ giờ, vệ tinh di chuyển được quãng đường là:
    $$\\dfrac{${timeForRandom2}}{${fullOrbitTime}} \\cdot C = ${distanceAfterTimeForRandom2.toFixed(2)}$$ (km).
    \\item Sai: Số giờ để vệ tinh $X$ thực hiện quãng đường $240000$ km là:
    $$\\dfrac{240000}{${radius} \\cdot \\pi} \\approx 8,3$$ (giờ).
    \\item Đúng: Sau ${randomTimeForAngle} giờ thì số vòng tròn mà vệ tinh $X$ di chuyển được là:
    $$\\dfrac{${randomTimeForAngle}}{${fullOrbitTime}} \\cdot 2 \\pi \\approx ${angleAfterRandomTime.toFixed(2)} rad$$.
    \\end{itemize}
    }
    \\end{ex}
    `;

    return exercise;
}
function TLdoiDeg2Rad(e) {
    // Sinh số đo góc ngẫu nhiên trong khoảng từ 30 đến 90 độ và phút ngẫu nhiên từ 0 đến 59
    let degrees = Math.floor(Math.random() * (300 - 5 + 1)) + 5;           
    let minutes = Math.floor(Math.random() * 60);

    // Tính số đo góc bằng độ
    let decimalDegree = degrees + minutes / 60;

    // Tính số đo góc bằng radian
    let radians = (decimalDegree * Math.PI) / 180;

    // Làm tròn kết quả đến hàng phần chục
    let roundedRadians = radians.toFixed(1);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Đổi số đo của góc $${degrees}^{\\circ} ${minutes}'$ sang đơn vị radian với độ chính xác đến hàng phần chục.
    \\shortans{$${roundedRadians}$}
    \\loigiai{
    Áp dụng công thức $\\alpha=\\dfrac{a \\cdot \\pi}{180}$ với $\\alpha$ tính bằng radian, $a$ tính bằng độ.\\\\
    Trước tiên ta đổi $${degrees}^{\\circ} ${minutes}'=\\left(${degrees}+\\dfrac{${minutes}}{60}\\right)^0$.\\\\
    Áp dụng công thức, ta được $\\alpha=\\dfrac{\\left(${degrees}+\\dfrac{${minutes}}{60}\\right) \\cdot \\pi}{180}=\\dfrac{${(decimalDegree * Math.PI).toFixed(0)} \\pi}{180} \\approx ${radians.toFixed(9)} \\approx ${roundedRadians}$.
    }
    \\end{ex}
    `;

    return exercise;
}
function TLdoiRad2Deg(e) {
    // Sinh giá trị radian ngẫu nhiên từ 0.1 đến 5 rad
    let radians = (Math.random() * (5 - 0.1) + 0.1).toFixed(1);

    // Chuyển đổi từ radian sang độ và làm tròn đến độ
    let degrees = (radians * 180 / Math.PI).toFixed(0); // Làm tròn đến phần nguyên

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Đổi số đo của góc $${radians}$ radian sang đơn vị độ và làm tròn đến phần độ.
    \\shortans{$${degrees}$}
    \\loigiai{
    Áp dụng công thức $a=\\dfrac{\\alpha \\cdot 180}{\\pi}$ với $\\alpha$ tính bằng radian, $a$ tính bằng độ.\\\\
    Ta có $${radians}$ rad = $\\dfrac{${radians} \\cdot 180}{\\pi} \\approx ${degrees}^{\\circ}$.
    }
    \\end{ex}
    `;

    return exercise;
}
function TLtinhdobanhxequay(e) {
   let totalRounds = Math.floor(Math.random() * 15) + 7; // Sinh số từ 1 đến 5
    let totalTime = Math.floor(Math.random() * 10) + 5;   // Sinh số từ 5 đến 10
    let timeForRotation = Math.floor(Math.random() * 8) + 1; // Sinh số từ 1 đến 4
        

    // Tính số vòng quay trong thời gian ngẫu nhiên
    let roundsInGivenTime = (totalRounds * timeForRotation) / totalTime;

    // Tính góc quay (theo độ)
    let angleInDegrees = (roundsInGivenTime * 360).toFixed(0); // Một vòng là 360 độ

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Bánh xe đạp của người đi xe đạp quay được $${totalRounds}$ vòng trong $${totalTime}$ giây. Hỏi trong $${timeForRotation}$ giây, bánh xe quay được $1$ góc bao nhiêu (tính theo độ)?
    \\shortans{$${angleInDegrees}$}
    \\loigiai{
    Trong $${timeForRotation}$ giây bánh xe đạp quay được $\\dfrac{${totalRounds} \\cdot ${timeForRotation}}{${totalTime}}=\\dfrac{${(totalRounds * timeForRotation).toFixed(0)}}{${totalTime}}$ vòng, tức là quay được góc:
    $$\\dfrac{${(totalRounds * timeForRotation).toFixed(0)}}{${totalTime}} \\cdot 360 = ${angleInDegrees}^{\\circ}$$
    }
    \\end{ex}
    `;

    return exercise;
}
function TLtinhgocbanhrangxequay(e) {
    // Sinh số răng của bánh xe ngẫu nhiên từ 50 đến 100 răng
    let totalTeeth = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    // Sinh số răng di chuyển ngẫu nhiên từ 5 đến 20 răng
    let movedTeeth = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

    // Tính số đo góc bánh xe đã quay được (theo độ)
    let angle = (movedTeeth * 360) / totalTeeth;

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Một bánh xe có $${totalTeeth}$ răng. Số đo góc mà bánh xe đã quay được khi di chuyển $${movedTeeth}$ răng là 
    \\shortans{$${angle.toFixed(0)}$}
    \\loigiai{
    Ta có $${totalTeeth}$ răng có chiều dài là $2 \\pi R$ nên $${movedTeeth}$ răng có chiều dài $l=\\dfrac{${movedTeeth} \\cdot 2 \\pi R}{${totalTeeth}}=\\dfrac{${(movedTeeth * 2).toFixed(0)} \\pi}{${totalTeeth}} R$.\\\\
    Theo công thức $l=R \\alpha \\Leftrightarrow \\alpha=\\dfrac{l}{R}=\\dfrac{\\dfrac{${(movedTeeth * 2).toFixed(0)}}{${totalTeeth}} \\pi R}{R}=\\dfrac{${(movedTeeth * 2).toFixed(0)}}{${totalTeeth}} \\pi$. Từ đó ta có $a=\\dfrac{180 \\alpha}{\\pi}=\\dfrac{180 \\cdot \\dfrac{${(movedTeeth * 2).toFixed(0)}}{${totalTeeth}}}{\\pi} = ${angle.toFixed(0)}^{\\circ}$.\\\\
    Cách khác: $${totalTeeth}$ răng tương ứng với $360^{\\circ}$ nên $${movedTeeth}$ răng tương ứng với $\\dfrac{${movedTeeth} \\cdot 360}{${totalTeeth}}=${angle.toFixed(0)}^{\\circ}$.
    }
    \\end{ex}
    `;

    return exercise;
} 
function TLthuctechayxedi(e) {
    // Sinh số vòng quay trong 20 giây ngẫu nhiên từ 50 đến 100 vòng
    let totalRoundsIn20Seconds = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    // Sinh thời gian ngẫu nhiên cho tính toán trong khoảng từ 1 đến 5 phút
    let timeInMinutes = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

    // Bán kính bánh xe cố định, 6.5 cm
    let radiusInCm = 6.5;

    // Tính số vòng quay trong khoảng thời gian ngẫu nhiên
    let totalRoundsInTime = (timeInMinutes * 60 / 20) * totalRoundsIn20Seconds;

    // Tính chu vi của bánh xe (cm)
    let circumferenceInCm = 2 * Math.PI * radiusInCm;

    // Tính tổng quãng đường xe đã đi được (cm)
    let totalDistanceInCm = totalRoundsInTime * circumferenceInCm;

    // Chuyển đổi từ cm sang km
    let totalDistanceInKm = (totalDistanceInCm / 100000).toFixed(1);

    // Tạo LaTeX-like output cho đề bài
    let exercise = `
    \\begin{ex}
    Trong $20$ giây bánh xe của xe gắn máy quay được $${totalRoundsIn20Seconds}$ vòng. Quãng đường xe gắn máy đã đi được bao nhiêu km trong vòng $${timeInMinutes}$ phút, biết rằng bán kính bánh xe gắn máy bằng $6{,}5$ cm. Kết quả làm tròn đến phần mười.
    \\shortans{$${totalDistanceInKm}$}
    \\loigiai{
    Trong $${timeInMinutes}$ phút, xe đi được $\\dfrac{${timeInMinutes} \\cdot 60}{20} \\cdot ${totalRoundsIn20Seconds} = ${totalRoundsInTime.toFixed(0)}$ vòng.\\\\
    Độ dài $1$ vòng bằng chu vi bánh xe là $2 \\pi R = 2 \\cdot 3{,}1416 \\cdot 6{,}5 = ${circumferenceInCm.toFixed(4)}$ cm.\\\\
    Vậy quãng đường xe đi được là $${totalRoundsInTime.toFixed(0)} \\times ${circumferenceInCm.toFixed(4)} = ${totalDistanceInCm.toFixed(3)}$ cm $\\approx ${totalDistanceInKm}$ km.
    }
    \\end{ex}
    `;

    return exercise;
}

