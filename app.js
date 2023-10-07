// Obteniendo el canvas y setiando las dimensiones
const canvas = document.getElementById('canvas');
const ratio = 16 / 9;
canvas.width = Math.ceil(ratio * window.innerHeight);
canvas.height = window.innerHeight;

// Obteniendo el contexto 2D
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

// Limpiando la pantalla con un color negro de fondo
ctx.fillStyle = '#000000ff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
