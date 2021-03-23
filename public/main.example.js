let circulo;

function setup() {
    createCanvas(400, 400)

    circulo = {x: 100, y: 100}
}


function draw() {
    // borramos toda la pantalla, la pintamos de un color y
    // volvemos a pintar todo lo que queramos
    background(220)

    //dibujar
    fill(100,0,0) // esto rellena con color todas las figuras que vienen
    circle(circulo.x, circulo.y, 15)
}