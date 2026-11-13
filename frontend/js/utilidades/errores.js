/**
 * Error lanzado cuando los datos de un animal, noticia o evento no son válidos.
 * Permite distinguir los errores de validación de cualquier otro error del programa.
 */
export class ErrorValidacion extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = 'ErrorValidacion';
  }
}
