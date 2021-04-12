const VIEWPORT_MIN_X = 0;
const VIEWPORT_MAX_X = 400;
const VIEWPORT_MIN_Y = 0;
const VIEWPORT_MAX_Y = 400;

class Objeto {
  constructor(id, posicion, velocidad, color) {
    this._id = id;
    this.posicion = posicion;
    this.velocidad = velocidad;
    this.color = color;
    this.vida = 100;
  }
  sacarVida(vida) {
    this.vida -= vida;
  }
  aplicarColor() {
    fill(this.color);
  }
  colisionBorde() {
    // Detectar collision con el borde
    if (
      this.posicion.x >= VIEWPORT_MAX_X - this.getTamano() ||
      this.posicion.x <= VIEWPORT_MIN_X + this.getTamano()
    ) {
      this.velocidad.x = -this.velocidad.x;
    }
    if (
      this.posicion.y >= VIEWPORT_MAX_Y - this.getTamano() ||
      this.posicion.y <= VIEWPORT_MIN_Y + this.getTamano()
    ) {
      this.velocidad.y = -this.velocidad.y;
    }
  }
  getTamano() {
    throw new Error("No implementado");
  }
  colisionCirculo(otro) {
    throw new Error("No implementado");
  }
  colisionCuadrado(otro) {
    throw new Error("No implementado");
  }
  colisionOtro(otro) {
    throw new Error("No implementado");
  }
  mover() {
    this.posicion.add(this.velocidad);
  }
  rebotar() {
    this.colisionBorde();
  }
  tick() {
    this.mover();
    this.rebotar();
    this.dibujar();
  }

  colisionCirculoCuadrado(circulo, cuadrado) {
    let testX = circulo.posicion.x;
    let testY = circulo.posicion.y;

    // Buscar borde mas cercano
    if (circulo.posicion.x < cuadrado.posicion.x) {
      testX = cuadrado.posicion.x; // borde izquierdo
    } else if (circulo.posicion.x > cuadrado.posicion.x + cuadrado.lado) {
      testX = cuadrado.posicion.x + cuadrado.lado; // borde derecho
    }
    if (circulo.posicion.y < cuadrado.posicion.y) {
      testY = cuadrado.posicion.y; // borde superior
    } else if (circulo.posicion.y > cuadrado.posicion.y + cuadrado.lado) {
      testY = cuadrado.posicion.y + cuadrado.lado; // borde inferior
    }

    // distancia al borde mas cercano
    let distX = circulo.posicion.x - testX;
    let distY = circulo.posicion.y - testY;
    let distancia = sqrt(distX * distX + distY * distY);

    return distancia <= circulo.radio;
  }
}

class Circulo extends Objeto {
  constructor(id, posicion, velocidad, color, diametro) {
    super(id, posicion, velocidad, color);
    this.diametro = diametro;
    this.radio = diametro / 2;
  }
  dibujar() {
    this.aplicarColor();
    circle(this.posicion.x, this.posicion.y, this.diametro);
  }
  getTamano() {
    return this.diametro;
  }
  colisionOtro(otro) {
    return otro.colisionCirculo(this);
  }
  colisionCirculo(otro) {
    return distancia(otro.posicion, this.posicion) <= otro.radio + this.radio;
  }
  colisionCuadrado(otro) {
    return this.colisionCirculoCuadrado(this, otro);
  }
}

class Cuadrado extends Objeto {
  constructor(id, posicion, velocidad, color, lado) {
    super(id, posicion, velocidad, color);
    this.lado = lado;
  }
  dibujar() {
    this.aplicarColor();
    rect(this.posicion.x, this.posicion.y, this.lado, this.lado);
  }
  getTamano() {
    return this.lado;
  }
  colisionOtro(otro) {
    return otro.colisionCuadrado(this);
  }
  colisionCirculo(otro) {
    return this.colisionCirculoCuadrado(otro, this);
  }
  colisionCuadrado(otro) {
    return (
      this.posicion.x + this.lado >= otro.posicion.x &&
      this.posicion.x <= otro.posicion.x + otro.lado &&
      this.posicion.y + this.lado >= otro.posicion.y &&
      this.posicion.y <= otro.posicion.y + otro.lado
    );
  }
}

let entidades = [];

function draw() {
  // borramos toda la pantalla, la pintamos de un color y
  // volvemos a pintar todo lo que queramos
  background(0);

  // Detectar collisiones con otros objetos
  for (let i = 0; i < entidades.length; i++) {
    for (let n = i + 1; n < entidades.length; n++) {
      if (entidades[i].colisionOtro(entidades[n])) {
        // Cambiar direccion
        entidades[i].velocidad.mult(-1);
        entidades[n].velocidad.mult(-1);
        // Hacerle daño
        entidades[i].sacarVida(10);
        entidades[n].sacarVida(10);
        // Borramos los que "murieron"
        if (entidades[i].vida <= 0) {
          entidades.splice(i, 1);
          i--;
        }
        if (entidades[n].vida <= 0) {
          entidades.splice(n, 1);
          n--;
        }
      }
    }
  }

  // procesar movimiento y dibujar
  for (let i = 0; i < entidades.length; i++) {
    entidades[i].tick();
  }
}

function setup() {
  createCanvas(VIEWPORT_MAX_X, VIEWPORT_MAX_Y);

  for (let i = 0; i < 5; i++) {
    let velocidad = 1; //random(2, 5);
    let tamano = random(10, 30);
    entidades.push(
      new Circulo(
        i,
        V(
          random(VIEWPORT_MIN_X + tamano, VIEWPORT_MAX_X - tamano),
          random(VIEWPORT_MIN_Y + tamano, VIEWPORT_MAX_Y - tamano)
        ),
        V(velocidad, velocidad),
        color(random(255), random(255), random(255)),
        tamano * 2 //random(10, 30),
      )
    );
  }

  for (let i = 0; i < 5; i++) {
    let velocidad = 1; //random(2, 5);
    let tamano = 20;
    entidades.push(
      new Cuadrado(
        i,
        V(
          random(VIEWPORT_MIN_X + tamano, VIEWPORT_MAX_X - tamano),
          random(VIEWPORT_MIN_Y + tamano, VIEWPORT_MAX_Y - tamano)
        ),
        V(velocidad, velocidad),
        color(random(255), random(255), random(255)),
        tamano * 2 //random(10, 30),
      )
    );
  }
}
