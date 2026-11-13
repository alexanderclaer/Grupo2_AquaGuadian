import {
  requerirEnteroNoNegativo,
  requerirFechaISO,
  requerirTexto,
} from '../utilidades/validaciones.js';

/**
 * Noticia del refugio (clase "Noticia" del UML, módulo Contenido del refugio).
 * Atributos del UML: idNoticia, titulo, contenido, fechaPublicacion, imagen.
 * Se agregan categoria, resumen y destacada para organizar la vista.
 */
export class Noticia {
  constructor(datos) {
    this.idNoticia = requerirEnteroNoNegativo(datos.idNoticia, 'idNoticia');
    this.titulo = requerirTexto(datos.titulo, 'titulo');
    this.categoria = requerirTexto(datos.categoria, 'categoria');
    this.resumen = requerirTexto(datos.resumen, 'resumen');
    this.contenido = requerirTexto(datos.contenido, 'contenido');
    this.fechaPublicacion = requerirFechaISO(datos.fechaPublicacion, 'fechaPublicacion');
    this.destacada = datos.destacada === true;
    this.imagen = datos.imagen ?? null;
  }

  get nombreVisible() {
    return this.titulo;
  }

  get fechaOrden() {
    return this.fechaPublicacion;
  }

  /** Método del UML: devuelve el contenido dividido en párrafos. */
  consultarNoticia() {
    return {
      titulo: this.titulo,
      categoria: this.categoria,
      fechaPublicacion: this.fechaPublicacion,
      parrafos: this.contenido.split(/\n{2,}/).map((parrafo) => parrafo.trim()),
    };
  }
}
