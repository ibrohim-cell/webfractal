const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
const motifSelect = document.getElementById('motif');
const colorSchemeSelect = document.getElementById('colorScheme');
const maxIterationsInput = document.getElementById('maxIterations');
const generateButton = document.getElementById('generateButton');
const saveButton = document.getElementById('saveButton');

let maxIterations = parseInt(maxIterationsInput.value);
let colorScheme = colorSchemeSelect.value;
let zoomLevel = 1;
let offsetX = 0;
let offsetY = 0;

function getColor(iter) {
    const ratio = iter / maxIterations;
    const colorSchemes = {
        rainbow: `hsl(${ratio * 360}, 100%, 50%)`,
        blue: `hsl(240, ${ratio * 100}%, 50%)`,
        greyscale: `rgb(${ratio * 255}, ${ratio * 255}, ${ratio * 255})`,
        sunset: `rgb(${255 * ratio}, ${100 * (1 - ratio)}, ${100 * (1 - ratio)})`,
        ocean: `rgb(0, ${100 + ratio * 155}, ${ratio * 255})`,
        forest: `rgb(0, ${155 + ratio * 100}, ${50 * (1 - ratio)})`,
        fire: `rgb(${255 * ratio}, ${ratio * 200}, 0)`,
        earth: `rgb(${155 * ratio}, ${100 + 100 * ratio}, 50)`,
        pastel: `rgb(${200 + 55 * ratio}, ${200 + 55 * ratio}, ${255 - 50 * ratio})`,
        electric: `rgb(${ratio * 255}, 0, ${255 - ratio * 255})`
    };
    return colorSchemes[colorScheme] || colorSchemes.rainbow;
}

function drawFractal() {
    const width = canvas.width;
    const height = canvas.height;
    const selectedMotif = motifSelect.value;
    ctx.clearRect(0, 0, width, height);

    if (selectedMotif === 'mandelbrot') drawMandelbrot();
    else if (selectedMotif === 'julia') drawJulia();
    else if (selectedMotif === 'sierpinski') drawSierpinski();
    else if (selectedMotif === 'burningShip') drawBurningShip();
    else if (selectedMotif === 'multibrot') drawMultibrot();
    else if (selectedMotif === 'cubicMandelbrot') drawCubicMandelbrot();
    else if (selectedMotif === 'cubicJulia') drawCubicJulia();
    else if (selectedMotif === 'dragonCurve') drawDragonCurve();
    else if (selectedMotif === 'hilbertCurve') drawHilbertCurve();
    else if (selectedMotif === 'kochSnowflake') drawKochSnowflake();
}

function drawMandelbrot() {
    const width = canvas.width;
    const height = canvas.height;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let real = (x - width / 2) / (width / 4) * zoomLevel + offsetX;
            let imaginary = (y - height / 2) / (height / 4) * zoomLevel + offsetY;
            let iter = 0;
            let zr = 0, zi = 0;

            while (zr * zr + zi * zi < 4 && iter < maxIterations) {
                let tmp = zr * zr - zi * zi + real;
                zi = 2 * zr * zi + imaginary;
                zr = tmp;
                iter++;
            }
            ctx.fillStyle = getColor(iter);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function drawJulia() {
    const width = canvas.width;
    const height = canvas.height;
    const cRe = -0.7;
    const cIm = 0.27015;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zr = (x - width / 2) / (width / 4) * zoomLevel + offsetX;
            let zi = (y - height / 2) / (height / 4) * zoomLevel + offsetY;
            let iter = 0;

            while (zr * zr + zi * zi < 4 && iter < maxIterations) {
                let tmp = zr * zr - zi * zi + cRe;
                zi = 2 * zr * zi + cIm;
                zr = tmp;
                iter++;
            }
            ctx.fillStyle = getColor(iter);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function drawSierpinski() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = 'black';

    function drawTriangle(x1, y1, x2, y2, x3, y3, depth) {
        if (depth === 0) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fill();
        } else {
            const midX1 = (x1 + x2) / 2;
            const midY1 = (y1 + y2) / 2;
            const midX2 = (x2 + x3) / 2;
            const midY2 = (y2 + y3) / 2;
            const midX3 = (x1 + x3) / 2;
            const midY3 = (y1 + y3) / 2;

            drawTriangle(x1, y1, midX1, midY1, midX3, midY3, depth - 1);
            drawTriangle(midX1, midY1, x2, y2, midX2, midY2, depth - 1);
            drawTriangle(midX3, midY3, midX2, midY2, x3, y3, depth - 1);
        }
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.8;
    const x1 = centerX - size / 2;
    const y1 = centerY + size * Math.sqrt(3) / 6;
    const x2 = centerX + size / 2;
    const y2 = centerY + size * Math.sqrt(3) / 6;
    const x3 = centerX;
    const y3 = centerY - size * Math.sqrt(3) / 3;

    drawTriangle(x1, y1, x2, y2, x3, y3, maxIterations);
}

function drawBurningShip() {
    const width = canvas.width;
    const height = canvas.height;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let real = (x - width / 2) / (width / 4) * zoomLevel + offsetX;
            let imaginary = (y - height / 2) / (height / 4) * zoomLevel + offsetY;
            let iter = 0;
            let zr = 0, zi = 0;

            while (zr * zr + zi * zi < 4 && iter < maxIterations) {
                let tmp = zr * zr - zi * zi + real;
                zi = 2 * Math.abs(zr) * Math.abs(zi) + imaginary;
                zr = tmp;
                iter++;
            }
            ctx.fillStyle = getColor(iter);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function drawMultibrot() {
    const width = canvas.width;
    const height = canvas.height;
    const exponent = 3; // Nilai eksponen dapat diubah untuk variasi
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let real = (x - width / 2) / (width / 4) * zoomLevel + offsetX;
            let imaginary = (y - height / 2) / (height / 4) * zoomLevel + offsetY;
            let iter = 0;
            let zr = real, zi = imaginary;

            while (zr * zr + zi * zi < 4 && iter < maxIterations) {
                const r = Math.pow(zr * zr + zi * zi, exponent / 2);
                const theta = Math.atan2(zi, zr) * exponent;
                zr = r * Math.cos(theta) + real;
                zi = r * Math.sin(theta) + imaginary;
                iter++;
            }
            ctx.fillStyle = getColor(iter);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function drawCubicMandelbrot() {
    const width = canvas.width;
    const height = canvas.height;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let real = (x - width / 2) / (width / 4) * zoomLevel + offsetX;
            let imaginary = (y - height / 2) / (height / 4) * zoomLevel + offsetY;
            let iter = 0;
            let zr = 0, zi = 0;

            while (zr * zr + zi * zi < 4 && iter < maxIterations) {
                let tmp = zr * zr * zr - 3 * zr * zi * zi + real;
                zi = 3 * zr * zr * zi - zi * zi * zi + imaginary;
                zr = tmp;
                iter++;
            }
            ctx.fillStyle = getColor(iter);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function drawCubicJulia() {
    const width = canvas.width;
    const height = canvas.height;
    const cRe = -0.7;
    const cIm = 0.27015;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zr = (x - width / 2) / (width / 4) * zoomLevel + offsetX;
            let zi = (y - height / 2) / (height / 4) * zoomLevel + offsetY;
            let iter = 0;

            while (zr * zr + zi * zi < 4 && iter < maxIterations) {
                let tmp = zr * zr * zr - 3 * zr * zi * zi + cRe;
                zi = 3 * zr * zr * zi - zi * zi * zi + cIm;
                zr = tmp;
                iter++;
            }
            ctx.fillStyle = getColor(iter);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function drawDragonCurve() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.strokeStyle = getColor(0); // Gunakan warna dari getColor

    function drawCurve(x1, y1, x2, y2, depth) {
        if (depth === 0) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        } else {
            const midX = (x1 + x2) / 2 + (y2 - y1) / 2;
            const midY = (y1 + y2) / 2 - (x2 - x1) / 2;

            drawCurve(x1, y1, midX, midY, depth - 1);
            drawCurve(x2, y2, midX, midY, depth - 1);
        }
    }

    const startX = width * 0.3;
    const startY = height * 0.4;
    const endX = width * 0.7;
    const endY = height * 0.4;

    drawCurve(startX, startY, endX, endY, maxIterations);
}

function drawHilbertCurve() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.strokeStyle = getColor(0); // Gunakan warna dari getColor

    function drawCurve(x, y, size, depth, direction) {
        if (depth === 0) {
            return;
        }
        switch (direction) {
            case 0: // Right
                drawCurve(x, y, size / 2, depth - 1, 1);
                ctx.lineTo(x + size / 2, y);
                drawCurve(x + size / 2, y, size / 2, depth - 1, 0);
                ctx.lineTo(x + size, y + size / 2);
                drawCurve(x + size / 2, y + size / 2, size / 2, depth - 1, 0);
                ctx.lineTo(x + size / 2, y + size);
                drawCurve(x, y + size / 2, size / 2, depth - 1, 3);
                break;
            case 1: // Down
                drawCurve(x, y, size / 2, depth - 1, 0);
                ctx.lineTo(x + size / 2, y);
                drawCurve(x + size / 2, y, size / 2, depth - 1, 1);
                ctx.lineTo(x + size, y + size / 2);
                drawCurve(x + size / 2, y + size / 2, size / 2, depth - 1, 1);
                ctx.lineTo(x + size / 2, y + size);
                drawCurve(x, y + size / 2, size / 2, depth - 1, 2);
                break;
            case 2: // Left
                drawCurve(x, y, size / 2, depth - 1, 3);
                ctx.lineTo(x + size / 2, y + size);
                drawCurve(x + size / 2, y + size / 2, size / 2, depth - 1, 2);
                ctx.lineTo(x + size, y + size / 2);
                drawCurve(x + size / 2, y, size / 2, depth - 1, 2);
                ctx.lineTo(x + size / 2, y);
                drawCurve(x, y + size / 2, size / 2, depth - 1, 1);
                break;
            case 3: // Up
                drawCurve(x, y, size / 2, depth - 1, 2);
                ctx.lineTo(x + size / 2, y + size);
                drawCurve(x + size / 2, y + size / 2, size / 2, depth - 1, 3);
                ctx.lineTo(x + size, y + size / 2);
                drawCurve(x + size / 2, y, size / 2, depth - 1, 3);
                ctx.lineTo(x + size / 2, y);
                drawCurve(x, y + size / 2, size / 2, depth - 1, 0);
                break;
        }
    }

    const size = Math.min(width, height) * 0.8;
    const startX = (width - size) / 2;
    const startY = (height - size) / 2;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    drawCurve(startX, startY, size, maxIterations, 0);
    ctx.stroke();
}

function drawKochSnowflake() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.strokeStyle = getColor(0); // Gunakan warna dari getColor

    function drawSide(x1, y1, x2, y2, depth) {
        if (depth === 0) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        } else {
            const dx = (x2 - x1) / 3;
            const dy = (y2 - y1) / 3;
            const x3 = x1 + dx;
            const y3 = y1 + dy;
            const x4 = x2 - dx;
            const y4 = y2 - dy;
            const x5 = x3 + dx * Math.cos(-Math.PI / 3) - dy * Math.sin(-Math.PI / 3);
            const y5 = y3 + dx * Math.sin(-Math.PI / 3) + dy * Math.cos(-Math.PI / 3);

            drawSide(x1, y1, x3, y3, depth - 1);
            drawSide(x3, y3, x5, y5, depth - 1);
            drawSide(x5, y5, x4, y4, depth - 1);
            drawSide(x4, y4, x2, y2, depth - 1);
        }
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.8;
    const x1 = centerX - size / 2;
    const y1 = centerY + size * Math.sqrt(3) / 6;
    const x2 = centerX + size / 2;
    const y2 = centerY + size * Math.sqrt(3) / 6;
    const x3 = centerX;
    const y3 = centerY - size * Math.sqrt(3) / 3;

    drawSide(x1, y1, x2, y2, maxIterations);
    drawSide(x2, y2, x3, y3, maxIterations);
    drawSide(x3, y3, x1, y1, maxIterations);
}

generateButton.addEventListener('click', () => {
    maxIterations = parseInt(maxIterationsInput.value);
    colorScheme = colorSchemeSelect.value;
    drawFractal();
});

saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'fractal.png';
    link.href = canvas.toDataURL();
    link.click();
});
        
