class Entero {
    constructor(valor) {
        this.valor = valor
    }

    suma(numero) {
    }

    multiplicar(numero) {
    }

    toString() {
        return this.valor.toString()
    }
}

class Fracciones {
    constructor(numerador, denominador) {
        this.numerador = numerador
        this.denominador = denominador
    }

    suma(numero) {
    }

    multiplicar(numero) {
    }

    toString() {
        return this.numerador + "/" + this.denominador
    }
}

let cinco = new Entero(5)
let once = new Entero(11)


function log(msg, numero) {
    console.log(msg.padEnd(35, " ") + numero)
}

log("Resultado 5 + 11       =    16: ", cinco.suma(once))
log("Resultado 5 * 11       =    55: ", cinco.multiplicar(once))
log("Resultado 5 + 1/5      =  26/5: ", cinco.suma(new Fracciones(1, 5)))
log("Resultado 5 * 3/2      =  15/2: ", cinco.multiplicar(new Fracciones(3,2)))

log("Resultado de 2/4 + 1/4 = 12/16: ", (new Fracciones(2,4)).suma(new Fracciones(1,4)))
log("Resultado de 2/4 + 1/4 =  2/16: ", (new Fracciones(2,4)).multiplicar(new Fracciones(1,4)) )
log("Resultado de 2/4 + 1   =   6/4: ", (new Fracciones(2,4)).suma(new Entero(1)))
log("Resultado de 2/4 * 5   =  10/4: ", (new Fracciones(2,4)).multiplicar(new Entero(5)))
log("Resultado de 1 + 2/4   =  10/4: ", (new Entero(5)).multiplicar(new Fracciones(2,4)))






