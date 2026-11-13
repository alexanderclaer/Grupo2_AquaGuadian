import { ErrorValidacion } from '../utilidades/errores.js';

/**
 * PATRÓN STRATEGY
 *
 * Cada estrategia encapsula UN criterio de ordenamiento detrás de la misma
 * interfaz: { id, etiqueta, ordenar(lista) }. OrganizadorLista (el "Context")
 * usa la estrategia activa sin saber cómo ordena, y se puede cambiar en
 * tiempo de ejecución desde los selectores de la interfaz.
 */
const comparar = (a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' });

export class EstrategiaOrden {
  constructor(id, etiqueta) {
    this.id = id;
    this.etiqueta = etiqueta;
  }

  /** Devuelve una lista NUEVA ordenada; nunca modifica la original. */
  // eslint-disable-next-line no-unused-vars
  ordenar(lista) {
    throw new Error(`${this.constructor.name} debe implementar ordenar().`);
  }
}

export class OrdenAlfabetico extends EstrategiaOrden {
  constructor() {
    super('nombre', 'Nombre (A-Z)');
  }

  ordenar(lista) {
    return [...lista].sort((a, b) => comparar(a.nombreVisible, b.nombreVisible));
  }
}

export class OrdenFechaReciente extends EstrategiaOrden {
  constructor() {
    super('fecha-reciente', 'Más recientes primero');
  }

  ordenar(lista) {
    return [...lista].sort((a, b) => b.fechaOrden.localeCompare(a.fechaOrden));
  }
}

export class OrdenFechaAntigua extends EstrategiaOrden {
  constructor() {
    super('fecha-antigua', 'Más antiguas primero');
  }

  ordenar(lista) {
    return [...lista].sort((a, b) => a.fechaOrden.localeCompare(b.fechaOrden));
  }
}

export class OrdenEdadAscendente extends EstrategiaOrden {
  constructor() {
    super('edad', 'Edad (menor a mayor)');
  }

  ordenar(lista) {
    return [...lista].sort((a, b) => a.edad - b.edad || comparar(a.nombreVisible, b.nombreVisible));
  }
}

/** Context del patrón: aplica la estrategia que esté configurada. */
export class OrganizadorLista {
  #estrategia;

  constructor(estrategia) {
    this.establecerEstrategia(estrategia);
  }

  establecerEstrategia(estrategia) {
    if (!estrategia || typeof estrategia.ordenar !== 'function') {
      throw new ErrorValidacion('La estrategia de orden debe tener un método ordenar().');
    }
    this.#estrategia = estrategia;
  }

  get estrategia() {
    return this.#estrategia;
  }

  organizar(lista) {
    return this.#estrategia.ordenar(lista);
  }
}

// Estrategias disponibles para cada sección (alimentan los selectores de la UI).
export const ORDENES_ANIMALES = Object.freeze([new OrdenAlfabetico(), new OrdenEdadAscendente()]);
export const ORDENES_PUBLICACIONES = Object.freeze([
  new OrdenFechaReciente(),
  new OrdenFechaAntigua(),
  new OrdenAlfabetico(),
]);
