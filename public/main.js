const VIEWPORT_MIN_X = 0;
const VIEWPORT_MAX_X = 400;
const VIEWPORT_MIN_Y = 0;
const VIEWPORT_MAX_Y = 400;

class Circulo {
  constructor(id, posicion, velocidad, diametro, color) {
    this._id = id;
    this.posicion = posicion;
    this.velocidad = velocidad;
    this.diametro = diametro;
    this.radio = diametro / 2;
    this.color = color;
  }

  mover() {
    this.posicion.x = this.posicion.x - this.velocidad.x;
    this.posicion.y = this.posicion.y - this.velocidad.y;
    this.rebotar();
  }

  rebotar() {
    // Detectar collisiones con otros objetos
    for (let i = 0; i < circulos.length; i++) {
      if (this._id == circulos[i]._id) {
        continue;
      }
      if (this.detectarColision(circulos[i])) {
        this.velocidad.x = -this.velocidad.x;
        this.velocidad.y = -this.velocidad.y;
        circulos[i].velocidad.x = -circulos[i].velocidad.x;
        circulos[i].velocidad.y = -circulos[i].velocidad.y;
      }
    }
    // Detectar collision con el borde
    if (
      this.posicion.x >= VIEWPORT_MAX_X - this.radio ||
      this.posicion.x <= VIEWPORT_MIN_X + this.radio
    ) {
      this.velocidad.x = -this.velocidad.x;
    }
    if (
      this.posicion.y >= VIEWPORT_MAX_Y - this.radio ||
      this.posicion.y <= VIEWPORT_MIN_Y + this.radio
    ) {
      this.velocidad.y = -this.velocidad.y;
    }
  }

  detectarColision(otro) {
    return distancia(otro.posicion, this.posicion) <= otro.radio + this.radio;
  }

  dibujar() {
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.posicion.x / 1
    );
    circle(this.posicion.x, this.posicion.y, this.diametro);
  }
}

let circulos = [];

function draw() {
  // borramos toda la pantalla, la pintamos de un color y
  // volvemos a pintar todo lo que queramos
  background(0);

  //dibujar
  for (let i = 0; i < circulos.length; i++) {
    circulos[i].mover();
    circulos[i].dibujar();
  }
}

function setup() {
  createCanvas(VIEWPORT_MAX_X, VIEWPORT_MAX_Y);

  for (let i = 0; i < 5; i++) {
    let velocidad = random(2, 5);
    let tamano = 20;
    circulos.push(
      new Circulo(
        i,
        V(
          random(VIEWPORT_MIN_X + tamano, VIEWPORT_MAX_X - tamano),
          random(VIEWPORT_MIN_Y + tamano, VIEWPORT_MAX_Y - tamano)
        ),
        V(velocidad, velocidad),
        tamano * 2, //random(10, 30),
        color(random(255), random(255), random(255))
      )
    );
  }
}
