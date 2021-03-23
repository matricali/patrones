function V(x, y) {
    return {x, y}
}

function vectorDireccion(from, target) {
    if (from.x === target.x && from.y === target.y) {
        return V(0,0)
    }
    const newx = target.x - from.x
    const newy = target.y - from.y
    const norm = longitud(V(newx, newy))

    return V(newx/norm, newy/norm)
}

function distancia(from, target) {
    if (from.x === target.x && from.y === target.y) {
        return V(0,0)
    }
    const newx = target.x - from.x
    const newy = target.y - from.y
    return longitud(V(newx, newy))
}

function longitud(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
}