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

// Implementasi sederhana untuk beberapa motif fraktal tambahan
function drawSierpinski() { /* Algoritma Sierpinski Triangle */ }
function drawBurningShip() { /* Algoritma Burning Ship */ }
function drawMultibrot() { /* Algoritma Multibrot */ }
function drawCubicMandelbrot() { /* Algoritma Cubic Mandelbrot */ }
function drawCubicJulia() { /* Algoritma Cubic Julia */ }
function drawDragonCurve() { /* Algoritma Dragon Curve */ }
function drawHilbertCurve() { /* Algoritma Hilbert Curve */ }
function drawKochSnowflake() { /* Algoritma Koch Snowflake */ }

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

