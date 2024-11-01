const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
const motifSelect = document.getElementById('motif');
const colorSchemeSelect = document.getElementById('colorScheme');
const maxIterationsInput = document.getElementById('maxIterations');
const generateButton = document.getElementById('generateButton');
const saveButton = document.getElementById('saveButton');

// Variabel untuk interaksi
let maxIterations = parseInt(maxIterationsInput.value);
let colorScheme = colorSchemeSelect.value;
let zoomLevel = 1;
let offsetX = 0;
let offsetY = 0;

// Fungsi untuk warna
function getColor(iter) {
    const ratio = iter / maxIterations;
    switch(colorScheme) {
        case 'rainbow':
            return `hsl(${ratio * 360}, 100%, 50%)`;
        case 'blue':
            return `hsl(240, ${ratio * 100}%, 50%)`;
        case 'greyscale':
            return `rgb(${ratio * 255}, ${ratio * 255}, ${ratio * 255})`;
        default:
            return `hsl(${ratio * 360}, 100%, 50%)`;
    }
}

// Algoritma Mandelbrot
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

// Algoritma Julia
function drawJulia() {
    const width = canvas.width;
    const height = canvas.height;
    const cRe = -0.7; // konstanta real Julia
    const cIm = 0.27015; // konstanta imajiner Julia

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

// Sierpinski Triangle (Contoh)
function drawSierpinski() {
    // Implementasi Sierpinski triangle sederhana
}

// Event untuk mengenerate fraktal berdasarkan pilihan
generateButton.addEventListener('click', () => {
    maxIterations = parseInt(maxIterationsInput.value);
    colorScheme = colorSchemeSelect.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const selectedMotif = motifSelect.value;
    if (selectedMotif === 'mandelbrot') drawMandelbrot();
    else if (selectedMotif === 'julia') drawJulia();
    else if (selectedMotif === 'sierpinski') drawSierpinski();
});

// Zoom Interaktif dengan Mouse
canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    zoomLevel *= event.deltaY < 0 ? 1.1 : 0.9;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMandelbrot();
});

// Simpan Gambar sebagai PNG
saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'fractal.png';
    link.href = canvas.toDataURL();
    link.click();
});
