const canvas = document.getElementById('batikCanvas');
const ctx = canvas.getContext('2d');
const motifSelect = document.getElementById('motif');
const colorPicker = document.getElementById('colorPicker');

// Set warna default
let color = colorPicker.value;

// Fungsi untuk menggambar motif fractal
function drawFractalMotif(type, color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    switch(type) {
        case 'motif1':
            drawMotif1();
            break;
        case 'motif2':
            drawMotif2();
            break;
        case 'motif3':
            drawMotif3();
            break;
        default:
            drawMotif1();
    }
}

// Motif 1 - Fractal Pattern
function drawMotif1() {
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(250, 250, 20 + i * 15, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Motif 2 - Spiral
function drawMotif2() {
    let x = 250, y = 250;
    let angle = 0;
    for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        let radius = 2 * i;
        let xNew = x + radius * Math.cos(angle);
        let yNew = y + radius * Math.sin(angle);
        ctx.lineTo(xNew, yNew);
        ctx.stroke();
        angle += 0.2;
    }
}

// Motif 3 - Grid of Squares
function drawMotif3() {
    for (let x = 50; x < 500; x += 50) {
        for (let y = 50; y < 500; y += 50) {
            ctx.beginPath();
            ctx.rect(x, y, 30, 30);
            ctx.stroke();
        }
    }
}

// Event listeners untuk motif dan warna
motifSelect.addEventListener('change', (e) => {
    drawFractalMotif(e.target.value, color);
});

colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
    drawFractalMotif(motifSelect.value, color);
});

// Inisialisasi gambar awal
drawFractalMotif(motifSelect.value, color);
