import {
  requerirEnteroNoNegativo,
  requerirFechaISO,
  requerirTexto,
} from '../utilidades/validaciones.js';

/**
 * Evento del refugio (clase "Evento" del UML, módulo Contenido del refugio).
 * Atributos del UML: idEvento, nombre, descripcion, fecha, imagen.
 * Se agrega lugar para indicar dónde se realiza.
 */
export class Evento {
  constructor(datos) {
    this.idEvento = requerirEnteroNoNegativo(datos.idEvento, 'idEvento');
    this.nombre = requerirTexto(datos.nombre, 'nombre');
    this.descripcion = requerirTexto(datos.descripcion, 'descripcion');
    this.fecha = requerirFechaISO(datos.fecha, 'fecha');
    this.lugar = requerirTexto(datos.lugar, 'lugar');
    this.imagen = datos.imagen ?? null;
  }

  get nombreVisible() {
    return this.nombre;
  }

  get fechaOrden() {
    return this.fecha;
  }

  /** Método del UML: devuelve los datos del evento listos para mostrarse. */
  consultarEvento() {
    return {
      nombre: this.nombre,
      descripcion: this.descripcion,
      fecha: this.fecha,
      lugar: this.lugar,
    };
  }
}
