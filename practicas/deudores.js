/**
 * Simulamos la existencia de una caja de ahorro para distintas personas.
 *
 * Contexto:
 *    Pepe    - Trabajador, sin mucho dinero pero lleno de deudas para pagar
 *    Juanito - Vendedor de cosas ilegales
 *    Natalia - Comerciante de un local de decoración
 *
 * Consigna:
 *    Por distintos motivos hay distintos actores que necesitan estar al tanto
 *    del movimiento de dinero de algunas personas. A continuación la lista de
 *    personas que necesitan enterarse de los movimientos y su logica.
 *
 *      - AFIP: Necesita estar al tanto de todos los depositos de dinero
 *        de todas las personas porque con eso calcula los impuestos de cada uno.
 *      - Agencia anti corrupción: El gobierno esta intentando atrapar a todos aquellos
 *        con actividades ilícitas por lo cual todos los depositos de mas de 50mil son
 *        considerados sospechosos.
 *      - Tarjeta de Credito: detecto que Natalia tiene muchas deudas y necesita saber
 *        cuando deposita plata para intimarla para que pague.
 *      - Jefe Mafia: Juanito vendio muchas cosas ilegales pero no le esta pagando
 *        a su jefe. El jefe muy enojado quiere saber cuando deposita plata asi lo
 *        "visita" y recupera algo de su plata.
 *
 *
 * Cada uno de estos actores necesitan saber cuando depositan plata. No todos quieren
 * saber lo que hacen todas las personas. La AFIP querra saber sobre todas las personas,
 * pero el Jefe Mafia no le interesa otra persona más allá de Juanito.
 *
 * Notar que en el caso de Juanito tiene que enterarse la AFIP, el jefe mafia y la agencia
 * anti corrupción. Pero en el caso de Natalia esta la AFIP, la agencia anti corrupción y
 * la tarjeta de credito.
 * Cada persona tendrá cantidad distinta y distintos actores que les interesen algunas personas
 * y otras no.
 *
 *
 * Tarea:
 *      Cada uno de estos actores tienen que escribir por consola la información que recibieron,
 *      por ejemplo.
 *
 *          console.log("AFIP: Natalia deposito 750")
 *          console.log("Agencia anti corrupcion: Natalia deposito 750 y es menos de 50mil")
 *
 *          console.log("Agencia anti corrupcion: Juanito deposito 100000, es sospechoso!!!!")
 *
 *      No se pueden agregar "ifs", tal vez alguno, pero deberían ser muy pocos.
 *      Pueden modificar la clase CajaDeAhorro pero con muy poco codigo y SIN ifs.
 *      Pueden crear una clase nueva por cada "interesado" (AFIP, tarjeta de credito, etc)
 *
 *
 * Para pensar:
 * ¿Y si queremos detectar cuando se hace un retiro de plata que no se puede lograr por falta de fondos?
 */
class Auditor {
  constructor(nombre) {
    this.nombre = nombre;
  }
  ingresaDinero(caja, monto) {
    throw new Error('No implementado');
  }
  egresaDinero(caja, monto) {
    throw new Error('No implementado');
  }
}

class IngresoAuditor extends Auditor {
  ingresaDinero(caja, monto) {
    console.log(`${this.nombre}: ${caja.nombre} depositó ${monto}`);
  }
  egresaDinero(caja, monto) {
    // No hago nada
  }
}

class AfipAuditor extends IngresoAuditor {
  constructor() {
    super("AFIP");
  }
}

class JefeMafiaAuditor extends IngresoAuditor {
  constructor() {
    super("Jefe Mafia");
  }
}

class TarjetaAuditor extends IngresoAuditor {
  constructor() {
    super("Tarjeta de credito");
  }
}

class AgenciaAntiCorrupcionAuditor extends Auditor {
  constructor() {
    super("Agencia anti corrupcion");
  }
  ingresaDinero(caja, monto) {
      if (monto < 50000) {
          console.log(`${this.nombre}: ${caja.nombre} depositó ${monto} y es menos de 50 mil`);
          return;
      }
      console.log(`${this.nombre}: ${caja.nombre} depositó ${monto}, es sospechoso!!!!`);
  }
  egresaDinero(caja, monto) {
    // No hago nada
  }
}

class CajaDeAhorro {
  constructor(nombre, plataInicial) {
    this.nombre = nombre;
    this.total = plataInicial;
    this.auditores = [];
  }

  ponerPlata(plata) {
    this.total += plata;
    for (let i = 0; i < this.auditores.length; i++) {
      this.auditores[i].ingresaDinero(this, plata);
    }
  }

  sacarPlata(plata) {
    if (this.total >= plata) {
      this.total -= plata;
      for (let i = 0; i < this.auditores.length; i++) {
        this.auditores[i].egresaDinero(this, plata);
      }
      return plata;
    }
    return 0;
  }

  auditar(auditor) {
    this.auditores.push(auditor);
  }
}

const clientes = {
  pepe: new CajaDeAhorro("Pepe Ventilete", 100),
  juanito: new CajaDeAhorro("Juan Garcalieri", 500),
  natalia: new CajaDeAhorro("Natalia Buenaventura", 250),
};

const afip = new AfipAuditor();
const aac = new AgenciaAntiCorrupcionAuditor();
const jm = new JefeMafiaAuditor();
const tarjeta = new TarjetaAuditor();

// Agrego AFIP y agencia anti corrupcion a todos las cajas
Object.keys(clientes).forEach(function (key, index) {
  clientes[key].auditar(afip);
  clientes[key].auditar(aac);
});
clientes.juanito.auditar(jm);
clientes.natalia.auditar(tarjeta);

// Movimientos de la caja de ahorro
clientes.pepe.ponerPlata(100);
clientes.pepe.ponerPlata(40);
clientes.pepe.sacarPlata(200); // puede sacar
clientes.pepe.ponerPlata(10);
clientes.pepe.ponerPlata(300);
clientes.pepe.sacarPlata(1000); // la operacion falla

clientes.juanito.ponerPlata(100000);
clientes.juanito.ponerPlata(200000);
clientes.juanito.sacarPlata(300500); // puede sacar todo

clientes.natalia.ponerPlata(250);
clientes.natalia.ponerPlata(20);
clientes.natalia.sacarPlata(250);
clientes.natalia.ponerPlata(750);
clientes.natalia.ponerPlata(150);
