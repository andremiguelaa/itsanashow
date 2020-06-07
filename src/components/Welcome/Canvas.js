import React, { useEffect, useRef } from 'react';
import classes from './Welcome.module.scss';

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    return new Vector(this.x * n, this.y * n);
  }

  multTo(n) {
    this.x *= n;
    this.y *= n;
  }

  div(n) {
    return new Vector(this.x / n, this.y / n);
  }

  divTo(n) {
    this.x /= n;
    this.y /= n;
  }

  setAngle(angle) {
    var length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  setLength(length) {
    var angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getLengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  distanceTo(v) {
    return this.sub(v).getLength();
  }

  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }

  manhattanDistanceTo(v) {
    return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  rotate(angle) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
  }
}

const config = {
  text: 'welcome',
  widthToSpikeLengthRatio: 0.034,
};

const colorConfig = {
  particleOpacity: 0.2,
  baseHue: 237,
  hueRange: 9,
  hueSpeed: 0.04,
  colorSaturation: 100,
};

class Planet {
  constructor(x, y, g) {
    this.pos = new Vector(x, y);
    this.g = g;
  }

  draw() {
    ctx.fillStyle = 'transparent';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 8, 0, Math.PI * 2);
    ctx.fill();
  }
}

// A line that is part of forming the text
class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, spikeLength);
  }

  move(force) {
    if (force) {
      this.vel.addTo(force);
    }
    if (this.vel.getLength() > spikeLength) {
      this.vel.setLength(spikeLength);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    let p2 = this.pos.add(this.vel);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}

let ctx;
let w, h;
let hue;
let particles;
let spikeLength;
let planets;
let A;
let B;
let a;
let b;
let tick;

const setup = (canvas) => {
  tick = 0;
  planets = [];
  let len = Math.round(Math.random() * 3 + 3);
  for (let i = 0; i < len; i++) {
    let p = new Planet(50 + i * 100, 340, i ? 1000 : 4000);
    planets.push(p);
  }
  ctx = canvas.getContext('2d');
  window.addEventListener('resize', reset);
  canvas.addEventListener('mousemove', mousemove);
  reset(canvas);
};

const reset = (canvas) => {
  hue = colorConfig.baseHue;
  w = canvas.width = window.innerWidth;
  h = canvas.height = document.documentElement.clientHeight;
  spikeLength = w * config.widthToSpikeLengthRatio;
  A = w / 2.2;
  B = h / 2.2;
  a = Math.round(Math.random() + 2);
  b = Math.round(Math.random() + 2);
  drawText();
};

const mousemove = (event) => {
  let x = event.clientX;
  let y = event.clientY;
  planets[0].pos.x = x;
  planets[0].pos.y = y;
};

const draw = (now) => {
  clear();
  requestAnimationFrame(draw);
  updateParticles();
  updatePlanets();
  tick = now / 50;
};

const clear = () => {
  ctx.clearRect(0, 0, w, h);
};

const drawText = () => {
  ctx.save();
  let fontSize = w * 0.2;
  ctx.font = 'bold ' + fontSize + 'px Montserrat, Helvetica, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.strokeText(config.text, w / 2, h / 2);
  ctx.restore();
  let imageData = ctx.getImageData(0, 0, w, h);

  particles = [];

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let i = (x + w * y) * 4;
      let average =
        (imageData.data[i] +
          imageData.data[i + 1] +
          imageData.data[i + 2] +
          imageData.data[i + 3]) /
        4;
      if (average > 200) {
        let particle = new Particle(x, y);
        particles.push(particle);
      }
    }
  }
  clear();
};

const updatePlanets = () => {
  let len = planets.length;
  for (let i = 1; i < len; i++) {
    let angle = ((Math.PI * 2) / (len - 1)) * i;
    let x = A * Math.sin((a * tick) / 100 + angle) + w / 2;
    let y = B * Math.sin((b * tick) / 100 + angle) + h / 2;
    let p = planets[i];
    p.pos.x = x;
    p.pos.y = y;
    p.draw();
  }
};

const updateParticles = () => {
  hue += colorConfig.hueSpeed;
  let h = Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;
  ctx.strokeStyle = `hsla(${h}, ${colorConfig.colorSaturation}%, 50%, ${colorConfig.particleOpacity})`;
  particles.forEach((p) => {
    planets.forEach((planet) => {
      let d = p.pos.sub(planet.pos);
      let length = d.getLength();
      let g = planet.g / length;
      if (g > 40) {
        g = 40;
      }
      d.setLength(g);
      p.move(d);
    });
    p.draw();
  });
};

const Canvas = () => {
  const canvas = useRef(null);
  useEffect(() => {
    setup(canvas.current);
    draw(1);
  }, []);
  return (
    <div className={classes.canvasWrapper}>
      <canvas ref={canvas} className={classes.canvas}></canvas>
    </div>
  );
};

export default Canvas;
