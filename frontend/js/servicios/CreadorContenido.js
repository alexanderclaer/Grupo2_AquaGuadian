import { Animal } from '../modelos/Animal.js';
import { Evento } from '../modelos/Evento.js';
import { Noticia } from '../modelos/Noticia.js';
import { ErrorValidacion } from '../utilidades/errores.js';

/**
 * PATRÓN FACTORY METHOD
 *
 * CreadorContenido es el "Creator": define el método plantilla crear(), que
 * valida la entrada común y delega en crearProducto() (el factory method) la
 * decisión de QUÉ objeto concreto se construye. Cada subclase crea un tipo de
 * contenido del refugio.
 */
export class CreadorContenido {
  crear(datos) {
    if (datos === null || typeof datos !== 'object' || Array.isArray(datos)) {
      throw new ErrorValidacion('Los datos del contenido deben ser un objeto.');
    }
    return this.crearProducto(datos);
  }

  /** Factory method: lo implementa cada creador concreto. */
  // eslint-disable-next-line no-unused-vars
  crearProducto(datos) {
    throw new Error(`${this.constructor.name} debe implementar crearProducto().`);
  }
}

export class CreadorAnimal extends CreadorContenido {
  crearProducto(datos) {
    return new Animal(datos);
  }
}

export class CreadorNoticia extends CreadorContenido {
  crearProducto(datos) {
    return new Noticia(datos);
  }
}

export class CreadorEvento extends CreadorContenido {
  crearProducto(datos) {
    return new Evento(datos);
  }
}

const CREADORES = Object.freeze({
  animal: new CreadorAnimal(),
  noticia: new CreadorNoticia(),
  evento: new CreadorEvento(),
});

/** Devuelve el creador adecuado para un tipo de contenido. */
export function obtenerCreador(tipo) {
  if (!Object.hasOwn(CREADORES, tipo)) {
    throw new ErrorValidacion(`Tipo de contenido desconocido: "${tipo}".`);
  }
  return CREADORES[tipo];
}
