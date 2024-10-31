// Element DOM baru
const sizeSlider = document.getElementById('sizeSlider');
const repeatInput = document.getElementById('repeatInput');
const randomizeButton = document.getElementById('randomizeButton');

// Variabel untuk ukuran dan jumlah pengulangan
let size = parseInt(sizeSlider.value);
let repeatCount = parseInt(repeatInput.value);

// Fungsi menggambar motif fractal yang diperluas
function drawFractalMotif(type, color, size, repeatCount) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    switch(type) {
        case 'motif1':
            drawMotif1(size, repeatCount);
            break;
        case 'motif2':
            drawMotif2(size, repeatCount);
            break;
        case 'motif3':
            drawMotif3(size, repeatCount);
            break;
        default:
            drawMotif1(size, repeatCount);
    }
}

// Motif 1: Fractal berbentuk lingkaran dengan ukuran dan pengulangan
function drawMotif1(size, repeatCount) {
    for (let i = 0; i < repeatCount; i++) {
        ctx.beginPath();
        ctx.arc(250, 250, size + i * 15, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Motif 2: Spiral dengan ukuran dan pengulangan
function drawMotif2(size, repeatCount) {
    let x = 250, y = 250;
    let angle = 0;
    for (let i = 0; i < repeatCount * 10; i++) {
        ctx.beginPath();
        let radius = size * i / 10;
        let xNew = x + radius * Math.cos(angle);
        let yNew = y + radius * Math.sin(angle);
        ctx.lineTo(xNew, yNew);
        ctx.stroke();
        angle += 0.2;
    }
}

// Motif 3: Pola grid persegi dengan ukuran dan pengulangan
function drawMotif3(size, repeatCount) {
    const spacing = size * 1.5;
    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            ctx.beginPath();
            ctx.rect(x, y, size, size);
            ctx.stroke();
        }
    }
}

// Event listener untuk slider dan input pengulangan
sizeSlider.addEventListener('input', (e) => {
    size = parseInt(e.target.value);
    drawFractalMotif(motifSelect.value, color, size, repeatCount);
});

repeatInput.addEventListener('input', (e) => {
    repeatCount = parseInt(e.target.value);
    drawFractalMotif(motifSelect.value, color, size, repeatCount);
});

// Event untuk tombol randomisasi motif
randomizeButton.addEventListener('click', () => {
    const randomSize = Math.floor(Math.random() * 40) + 10;
    const randomRepeat = Math.floor(Math.random() * 15) + 5;
    sizeSlider.value = randomSize;
    repeatInput.value = randomRepeat;
    size = randomSize;
    repeatCount = randomRepeat;
    drawFractalMotif(motifSelect.value, color, size, repeatCount);
});

// Update gambar awal
drawFractalMotif(motifSelect.value, color, size, repeatCount);

