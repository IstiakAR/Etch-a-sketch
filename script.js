document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const randomEveryBtn = document.querySelector('.Random');
  const rainbowBtn = document.getElementById('rainbow');
  const random = document.getElementById('random');
  const clear = document.querySelector('.clear');
  let resizeText = document.getElementById('resizeText');
  let resizeSlider = document.getElementById('resizeSlider');
  let currentColor = document.getElementById('colorPicker').value;

  let size = 10;
  let isDrawing = false;
  let isRainbow = false;
  let rainbowIndex = 0;
  const rainbowArr = ['#ff0000', '#ff7f00', '#ffff00',
    '#FFFFC5', '#FFC0CB', '#964B00', '#98FF98', '#00ff00',
    '#00ffff', '#0D98BA', '#0000ff', '#4b0082', '#FF00FF', '#9400d3'];



  function createCells(newsize) {
    grid.innerHTML = '';
    grid.style.setProperty('--cell-size', `calc(100% / ${newsize})`);
    for (let i = 0; i < newsize * newsize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      grid.appendChild(cell);
    }
    setupDraw();
  }

  function resizeGrid() {
    size = parseInt(resizeText.value);
    if (size > 100) {
      size = 100;
    }
    if (size < 1) {
      size = 1;
    }
    createCells(size);
  }

  function setupDraw() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('mousedown', startDrawing);
      cell.addEventListener('mouseover', draw);
      cell.addEventListener('mouseup', stopDrawing);
    });
    grid.addEventListener('mouseleave', stopDrawing);
  }

  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  function draw(e) {
    if (!isDrawing) return;
    if (isRainbow) {
      e.target.style.backgroundColor = rainbow();
    } else {
      e.target.style.backgroundColor = currentColor;
    }
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function changeColor() {
    currentColor = document.getElementById('colorPicker').value;
    isRainbow = false;
  }

  function clearGrid() {
    grid.innerHTML = '';
    createCells(size);
  }

  function randomGen() {
    return Math.floor(Math.random() * 256);
  }

  function rainbow() {
    const color = rainbowArr[rainbowIndex];
    rainbowIndex = (rainbowIndex + 1) % rainbowArr.length;
    return color;
  }

  function randomColor() {
    isRainbow = false;
    const randomHex = () => {
      let hex = randomGen().toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    currentColor = `#${randomHex()}${randomHex()}${randomHex()}`;
    return currentColor;
  }

  function randomEvery() {
    isRainbow = false;
    currentColor = randomColor();
    colorPicker.value = currentColor;
    size = Math.floor(Math.random() * 100) + 1;
    resizeText.value = size;
    resizeSlider.value = size;
    rainbowBtn.classList.remove('rainbow-active');
    createCells(size);
  }

  document.getElementById('colorPicker').addEventListener('input', changeColor);
  clear.addEventListener('click', clearGrid);

  randomEveryBtn.addEventListener('click', randomEvery);
  random.addEventListener('click', () => {
    currentColor = randomColor();
    colorPicker.value = currentColor;
    rainbowBtn.classList.remove('rainbow-active');
  });
  rainbowBtn.addEventListener('click', () => {
    isRainbow = !isRainbow;
    if (isRainbow) {
      rainbowBtn.classList.add('rainbow-active');
    } else {
      rainbowBtn.classList.remove('rainbow-active');
    }
  });

  resizeSlider.addEventListener('input', () => {
    resizeText.value = resizeSlider.value;
    resizeGrid();
  });
  resizeText.addEventListener('input', () => {
    resizeSlider.value = resizeText.value;
    resizeGrid();
  });
  createCells(size);

});
