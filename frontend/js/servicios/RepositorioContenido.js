import { obtenerCreador } from './CreadorContenido.js';
import { ErrorValidacion } from '../utilidades/errores.js';
import { esFechaVigente, hoyISO } from '../utilidades/fechas.js';

/**
 * PATRÓN SINGLETON
 *
 * Toda la aplicación debe leer el contenido (animales, noticias y eventos)
 * desde un único lugar para que las secciones nunca muestren datos distintos.
 * El constructor está protegido con una llave privada: la única forma de
 * obtener el repositorio es RepositorioContenido.obtenerInstancia().
 *
 * Usa el patrón Factory Method para convertir los datos crudos en objetos del
 * modelo; los registros inválidos no tumban la aplicación: se omiten y se
 * registran en obtenerErroresCarga().
 */
export class RepositorioContenido {
  static #instancia = null;
  static #llave = Symbol('RepositorioContenido');

  #animales = [];
  #noticias = [];
  #eventos = [];
  #errores = [];

  constructor(llave) {
    if (llave !== RepositorioContenido.#llave) {
      throw new Error('Use RepositorioContenido.obtenerInstancia() para acceder al repositorio.');
    }
  }

  static obtenerInstancia() {
    if (RepositorioContenido.#instancia === null) {
      RepositorioContenido.#instancia = new RepositorioContenido(RepositorioContenido.#llave);
    }
    return RepositorioContenido.#instancia;
  }

  /** Solo para pruebas automatizadas: descarta la instancia actual. */
  static reiniciarParaPruebas() {
    RepositorioContenido.#instancia = null;
  }

  /**
   * Carga el contenido a partir de datos crudos { animales, noticias, eventos }.
   * Los registros inválidos se omiten y quedan en la lista de errores.
   */
  cargar(datos) {
    if (datos === null || typeof datos !== 'object') {
      throw new ErrorValidacion('No se recibieron datos para cargar el contenido.');
    }
    this.#errores = [];
    this.#animales = this.#crearLista('animal', datos.animales);
    this.#noticias = this.#crearLista('noticia', datos.noticias);
    this.#eventos = this.#crearLista('evento', datos.eventos);
  }

  #crearLista(tipo, registros = []) {
    const creador = obtenerCreador(tipo);
    const creados = [];
    registros.forEach((registro, posicion) => {
      try {
        creados.push(creador.crear(registro));
      } catch (error) {
        if (!(error instanceof ErrorValidacion)) throw error;
        this.#errores.push(`${tipo} #${posicion + 1}: ${error.message}`);
      }
    });
    return creados;
  }

  obtenerAnimales() {
    return [...this.#animales];
  }

  obtenerNoticias() {
    return [...this.#noticias];
  }

  obtenerEventos() {
    return [...this.#eventos];
  }

  obtenerErroresCarga() {
    return [...this.#errores];
  }

  /** Cifras que se muestran en "El parque en números". */
  calcularEstadisticas(hoy = hoyISO()) {
    return {
      totalAnimales: this.#animales.length,
      animalesSaludables: this.#animales.filter((animal) => animal.estado === 'saludable').length,
      totalNoticias: this.#noticias.length,
      eventosProximos: this.#eventos.filter((evento) => esFechaVigente(evento.fecha, hoy)).length,
    };
  }
}
