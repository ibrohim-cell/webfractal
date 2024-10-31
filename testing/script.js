const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawFractal(x, y, size, level) {
  if (level === 0) {
    ctx.fillRect(x, y, size, size);
    return;
  }

  const newSize = size / 3;
  drawFractal(x, y, newSize, level - 1); // Kiri atas
  drawFractal(x + newSize * 2, y, newSize, level - 1); // Kanan atas
  drawFractal(x, y + newSize * 2, newSize, level - 1); // Kiri bawah
  drawFractal(x + newSize * 2, y + newSize * 2, newSize, level - 1); // Kanan bawah
}

ctx.fillStyle = 'blue'; // Warna batik
drawFractal(0, 0, canvas.width, 4); // Mulai menggambar fraktal