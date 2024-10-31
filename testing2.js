const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const motifSelect = document.getElementById('motif');
const colorInput = document.getElementById('color');
const generateButton = document.getElementById('generate');

generateButton.addEventListener('click', () => {
  const motif = motifSelect.value;
  const color = colorInput.value;
  drawFractal(motif, color);
});

function drawFractal(motif, color) {
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.createImageData(width, height);

  if (motif === 'mandelbrot') {
    drawMandelbrot(imageData, color);
  } else if (motif === 'julia') {
    drawJulia(imageData, color); 
  }

  ctx.putImageData(imageData, 0, 0);
}

function drawMandelbrot(imageData, color) {
  // Implementasi algoritma Mandelbrot 
  // ... (kode untuk menggambar fraktal Mandelbrot)
  // Gunakan color untuk mewarnai fraktal
}

function drawJulia(imageData, color) {
  // Implementasi algoritma Julia 
  // ... (kode untuk menggambar fraktal Julia)
  // Gunakan color untuk mewarnai fraktal
}