function posX(percentage, rotate) {
  return Math.sin(Math.PI * (2 * percentage + 1 + rotate));
}

function posY(percentage, rotate) {
  return Math.cos(Math.PI * (2 * percentage + 1 + rotate));
}

function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rndFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function line(_opt) {
  const opt = {
    strokeWidth: 1,
    invert: false,
    ..._opt,
  };

  const element = $(document.createElementNS("http://www.w3.org/2000/svg", "line"))
    .attr({ x1: opt.x1, y1: opt.y1, x2: opt.x2, y2: opt.y2 }).css({
      strokeWidth: opt.strokeWidth * 0.03,
    }).appendTo(svg);

  if (opt.invert) {
    element.addClass('invert').css({
      strokeWidth: opt.strokeWidth * 0.03 + 0.03,
    });
  }

  $(document.createElementNS("http://www.w3.org/2000/svg", "line"))
    .attr({ x1: opt.x1, y1: opt.y1, x2: opt.x2, y2: opt.y2 }).css({
      strokeWidth: Math.max(opt.strokeWidth * 0.03 - 0.01, 0.01),
    }).appendTo(svg2);
}

function circle(_opt) {
  const opt = {
    cx: 0,
    cy: 0,
    strokeWidth: 1,
    invert: false,
    ..._opt,
  };

  const element = $(document.createElementNS("http://www.w3.org/2000/svg", "circle"))
    .attr({
      r: opt.r,
      cx: opt.cx,
      cy: opt.cy,
    }).css({
      strokeWidth: opt.strokeWidth * 0.03,
    }).appendTo(svg);

  if (opt.invert) {
    element.addClass('invert').css({
      strokeWidth: opt.strokeWidth * 0.03 + 0.03,
    });
  }

  $(document.createElementNS("http://www.w3.org/2000/svg", "circle"))
    .attr({
      r: opt.r,
      cx: opt.cx,
      cy: opt.cy,
    }).css({
      strokeWidth: Math.max(opt.strokeWidth * 0.03 - 0.01, 0.01),
    }).appendTo(svg2);
}

function star(_opt) {
  const opt = {
    jmp: 1,
    rotate: 0,
    cx: 0,
    cy: 0,
    strokeWidth: 1,
    ..._opt,
  };

  for (let i = 0; i < opt.n; i++) {
    const next = (i + opt.jmp) % opt.n;
    line({
      x1: posX(i / opt.n, opt.rotate) * opt.r + opt.cx,
      y1: posY(i / opt.n, opt.rotate) * opt.r + opt.cy,
      x2: posX(next / opt.n, opt.rotate) * opt.r + opt.cx,
      y2: posY(next / opt.n, opt.rotate) * opt.r + opt.cy,
      strokeWidth: opt.strokeWidth,
      invert: opt.invert,
    });
  }
}

function place(_opt) {
  const opt = {
    rotate: 0,
    cx: 0,
    cy: 0,
    shapeOpt: {},
    ..._opt,
  };

  for (let i = 0; i < opt.n; i++) {
    opt.shapeOpt.cx = posX(i / opt.n, opt.rotate) * opt.r + opt.cx;
    opt.shapeOpt.cy = posY(i / opt.n, opt.rotate) * opt.r + opt.cy;
    opt.shape({ ...opt.shapeOpt });
  }
}

function randomCircle(_opt = {}) {
  const r = rndFloat(0.5, 1);
  const strokeWidth = rndFloat(0.2, 1.5);

  circle({
    r,
    cx: 0,
    cy: 0,
    strokeWidth,
    invert: true,
    ..._opt,
  });

  circle({
    r,
    cx: 0,
    cy: 0,
    strokeWidth,
    ..._opt,
  });
}

function randomStar() {
  const n = rndInt(2, 8);
  const r = rndFloat(0.5, 1);
  const jmp = rndInt(1, Math.floor(n / 2));
  const rotate = rndInt(0, 3) / n / 2;
  const strokeWidth = rndFloat(0.2, 1.5);

  star({
    n,
    r,
    jmp,
    rotate,
    strokeWidth,
    invert: true,
  });

  star({
    n,
    r,
    jmp,
    rotate,
    strokeWidth,
  });
}

function randomDots() {
  const n = rndInt(1, 6);
  const r = rndFloat(0.5, 1);
  const shapeR = rndFloat(0.1, 0.5);
  const rotate = rndInt(0, 3) / n / 2;

  place({
    n,
    r,
    shape: randomCircle,
    shapeOpt: {
      r: shapeR,
      invert: true,
    },
    rotate,
  });

  place({
    n,
    r,
    shape: randomCircle,
    shapeOpt: {
      r: shapeR,
    },
    rotate,
  });
}

function newShape() {
  svg.empty();
  svg2.empty();

  randomDots();
  randomCircle();
  randomCircle();
  randomStar();
  randomCircle();
  randomStar();
}

const svg = $('svg #svg-mask g');
const svg2 = $('svg g#svg-outline');

newShape();
window.addEventListener('click', newShape);