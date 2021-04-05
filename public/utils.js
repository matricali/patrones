/**
 * Crea un objeto vector con posición (x, y)
 * 
 * @param Integer x Posición en X
 * @param Integer y Posición en Y
 * @returns Vector
 */
function V(x, y) {
    return createVector(x, y)
}

/**
 * Nos da el vector dirección normalizado entre dos puntos
 * @param   Vector from
 * @param   Vector target
 * @returns Vector
 */
function vectorDireccion(from, target) {
    if (from.x === target.x && from.y === target.y) {
        return V(0,0)
    }
    const newx = target.x - from.x
    const newy = target.y - from.y
    const norm = longitud(V(newx, newy))

    return V(newx/norm, newy/norm)
}

/**
 * Distancia en pixels entre dos puntos
 * 
 * @param   Vector from 
 * @param   Vector target 
 * @returns Integer
 */
function distancia(from, target) {
    if (from.x === target.x && from.y === target.y) {
        return V(0,0)
    }
    const newx = target.x - from.x
    const newy = target.y - from.y
    return longitud(V(newx, newy))
}

/**
 * Nos da la distancia al origen de un punto
 * 
 * @param   Vector vector 
 * @returns Integer
 */
function longitud(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
}

/**
 * Filtra la lista dejando los elemento para los cuales la
 * funcion fn da verdadero. Te modifica la lista original a
 * diferencia de [].filter
 * 
 * Ejemplo para quedarse con los pares:
 *     > filtrarLista([1,2,3,4], n => n%2 == 0)
 * 
 * @param Array lista 
 * @param function fn 
 */
function filtrarLista(lista, fn) {
    for(let i = 0; i < lista.length; i++) {
        if (!fn(lista[i])) {
            lista.splice(i, 1);
            i--;
        }
    }
    return lista
}

/**
 * 
 * @param   Cuerpo cuerpo1 
 * @param   Cuerpo cuerpo2 
 * @returns Velocidad
 */
function velocidadColision(cuerpo1, cuerpo2) {
    // direccion de la colisión
    let direccionColision = vectorDireccion(cuerpo1, cuerpo2)

    // velocidades relativas en cada eje
    let velocidadRelativa = {x: cuerpo1.vx - cuerpo2.vx, y: cuerpo1.vy - cuerpo2.vy}
    
    // velocidad de la colisión en la dirección real (sin descomponer en cada eje)
    let velocidad = velocidadRelativa.x * direccionColision.x + velocidadRelativa.y * direccionColision.y

    return {
        vx: velocidad * direccionColision.x,
        vy: velocidad * direccionColision.y,
    }
}

/**
 * Le pasamos dos cuerpos que tienen Posición y Velocidad, calcula
 * la velocidad relativa de una colisión y actualiza los cuerpos con
 * la velocidad resultante de la colisión
 * 
 * @param Cuerpo cuerpo1 
 * @param Cuerpo cuerpo2 
 */
function actualizarVelocidadesRelativasEnColisión(cuerpo1, cuerpo2) {
    // velocidad resultante en el 
    let velocidad = velocidadColision(cuerpo1, cuerpo2)

    // resto 
    cuerpo1.vx = cuerpo1.vx - velocidad.vx
    cuerpo1.vy = cuerpo1.vy - velocidad.vy

    cuerpo2.vx = cuerpo2.vx + velocidad.vx
    cuerpo2.vy = cuerpo2.vy + velocidad.vy
}


var Mensajes = {
    x: 250,
    y: 20,
    mensajes: [],
    agregar: function(mensaje, tiempo) {
        let t = tiempo || 160
        this.mensajes.push({texto: mensaje, tiempo: t})
    },
    mostrar: function() {
        filtrarLista(this.mensajes, m => m.tiempo > 0)
        if (!this.mensajes.length)
            return;

        push()
        textSize(8)
        fill(150, 0, 0)
        let y = this.y
        for(let i in this.mensajes) {
            this.mensajes[i].tiempo -= 1
            text(this.mensajes[i].texto, this.x, y)
            y += 10
        }
        pop()
    }
}