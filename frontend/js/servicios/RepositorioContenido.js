import { obtenerCreador } from './CreadorContenido.js';
import { ErrorValidacion } from '../utilidades/errores.js';
import { esFechaVigente, hoyISO } from '../utilidades/fechas.js';
import { normalizar } from './busqueda.js';

const TIPOS = Object.freeze({
  animal: { coleccion: 'animales', id: 'idAnimal', identidad: ['nombre', 'especie'] },
  noticia: { coleccion: 'noticias', id: 'idNoticia', identidad: ['titulo', 'fechaPublicacion'] },
  evento: { coleccion: 'eventos', id: 'idEvento', identidad: ['nombre', 'fecha', 'lugar'] },
});
const PREFIJO_ALMACEN = 'aquaguardian.catalogo.v1.';

function siguienteId(lista, campoId) {
  return lista.reduce((maximo, registro) => Math.max(maximo, registro[campoId] + 1), 1);
}

function identidad(registro, campos) {
  return JSON.stringify(campos.map((campo) => normalizar(registro[campo]).replace(/\s+/g, ' ')));
}

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

  #listas = { animal: [], noticia: [], evento: [] };
  #bases = this.#listas;
  #errores = [];
  #obtenerAlmacen;

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
  cargar(datos, obtenerAlmacen) {
    if (datos === null || typeof datos !== 'object') {
      throw new ErrorValidacion('No se recibieron datos para cargar el contenido.');
    }
    this.#errores = [];
    this.#obtenerAlmacen = obtenerAlmacen;
    this.#bases = Object.fromEntries(Object.entries(TIPOS).map(([tipo, { coleccion }]) =>
      [tipo, this.#crearLista(tipo, datos[coleccion])]));
    this.#listas = { ...this.#bases };
    if (obtenerAlmacen) {
      for (const tipo of Object.keys(TIPOS)) {
        try {
          this.#listas[tipo] = this.#leerLocal(tipo, obtenerAlmacen()).registros;
        } catch (error) {
          this.#errores.push(`${tipo}: ${error.message}`);
        }
      }
    }
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
    return [...this.#listas.animal];
  }

  obtenerNoticias() {
    return [...this.#listas.noticia];
  }

  obtenerEventos() {
    return [...this.#listas.evento];
  }

  obtenerErroresCarga() {
    return [...this.#errores];
  }

  #leerLocal(tipo, almacen) {
    const { id } = TIPOS[tipo];
    const clave = PREFIJO_ALMACEN + tipo;
    const texto = almacen.getItem(clave);
    const base = this.#bases[tipo];
    if (texto === null) return { registros: base, proximoId: siguienteId(base, id) };
    try {
      const { registros, proximoId } = JSON.parse(texto);
      const modelos = registros.map((registro) => obtenerCreador(tipo).crear(registro));
      if (!Number.isSafeInteger(proximoId) || proximoId < siguienteId(modelos, id) ||
          new Set(modelos.map((registro) => registro[id])).size !== modelos.length) {
        throw new Error();
      }
      return { registros: modelos, proximoId };
    } catch {
      throw new ErrorValidacion('El contenido local de esta sección es ilegible. Se conservó sin sobrescribir.');
    }
  }

  #editarLocal(tipo, transformar) {
    if (!Object.hasOwn(TIPOS, tipo)) throw new ErrorValidacion('Tipo de contenido desconocido.');
    let almacen;
    let actual;
    try {
      almacen = this.#obtenerAlmacen?.();
      actual = this.#leerLocal(tipo, almacen);
    } catch (error) {
      if (error instanceof ErrorValidacion) throw error;
      throw new ErrorValidacion('El almacenamiento local no está disponible.');
    }
    const siguiente = transformar(actual, TIPOS[tipo]);
    try {
      almacen.setItem(PREFIJO_ALMACEN + tipo, JSON.stringify(siguiente));
    } catch {
      throw new ErrorValidacion('No se pudo guardar en este navegador. Los cambios no se aplicaron.');
    }
    this.#listas[tipo] = siguiente.registros;
  }

  #posicionOriginal(registros, id, original) {
    const indice = registros.findIndex((registro) => registro[id] === original[id]);
    if (indice < 0 || JSON.stringify(registros[indice]) !== JSON.stringify(original)) {
      throw new ErrorValidacion('El registro cambió desde que abriste esta vista. Recarga la página antes de volver a intentarlo.');
    }
    return indice;
  }

  guardarContenido(tipo, datos, original = null) {
    this.#editarLocal(tipo, ({ registros, proximoId }, { id, identidad: campos }) => {
      const indice = original ? this.#posicionOriginal(registros, id, original) : -1;
      if (!original && proximoId >= Number.MAX_SAFE_INTEGER) {
        throw new ErrorValidacion('No hay más identificadores disponibles en esta sección.');
      }
      const registro = obtenerCreador(tipo).crear({ ...original, ...datos, [id]: original ? original[id] : proximoId });
      const clave = identidad(registro, campos);
      if (registros.some((otro, posicion) => posicion !== indice && identidad(otro, campos) === clave)) {
        throw new ErrorValidacion('Ya existe un registro con esos datos de identificación.');
      }
      const lista = [...registros];
      if (original) lista[indice] = registro;
      else lista.push(registro);
      return { registros: lista, proximoId: original ? proximoId : proximoId + 1 };
    });
  }

  eliminarContenido(tipo, original) {
    this.#editarLocal(tipo, ({ registros, proximoId }, { id }) => {
      const indice = this.#posicionOriginal(registros, id, original);
      return { registros: registros.filter((_, posicion) => posicion !== indice), proximoId };
    });
  }

  /** Cifras que se muestran en "El parque en números". */
  calcularEstadisticas(hoy = hoyISO()) {
    return {
      totalAnimales: this.#listas.animal.length,
      animalesSaludables: this.#listas.animal.filter((animal) => animal.estado === 'saludable').length,
      totalNoticias: this.#listas.noticia.length,
      eventosProximos: this.#listas.evento.filter((evento) => esFechaVigente(evento.fecha, hoy)).length,
    };
  }
}
