import {
  requerirEnteroNoNegativo,
  requerirOpcion,
  requerirTexto,
} from '../utilidades/validaciones.js';

export const ESTADOS_ANIMAL = Object.freeze(['saludable', 'en-cuidado', 'critico']);

export const ETIQUETAS_ESTADO = Object.freeze({
  saludable: 'Saludable',
  'en-cuidado': 'En cuidado',
  critico: 'Crítico',
});

/**
 * Animal del parque (clase "Animal" del diagrama UML, módulo Gestión de animales).
 * Atributos del UML: idAnimal, nombre, especie, edad, descripcion,
 * situacionActual, imagen. Se agregan estado, nivelConservacion, habitat y zona
 * para poder filtrar y mostrar la ficha completa.
 */
export class Animal {
  constructor(datos) {
    this.idAnimal = requerirEnteroNoNegativo(datos.idAnimal, 'idAnimal');
    this.nombre = requerirTexto(datos.nombre, 'nombre');
    this.especie = requerirTexto(datos.especie, 'especie');
    this.edad = requerirEnteroNoNegativo(datos.edad, 'edad');
    this.descripcion = requerirTexto(datos.descripcion, 'descripcion');
    this.situacionActual = requerirTexto(datos.situacionActual, 'situacionActual');
    this.estado = requerirOpcion(datos.estado, ESTADOS_ANIMAL, 'estado');
    this.nivelConservacion = requerirTexto(datos.nivelConservacion, 'nivelConservacion');
    this.habitat = requerirTexto(datos.habitat, 'habitat');
    this.zona = requerirTexto(datos.zona, 'zona');
    this.historia = requerirTexto(datos.historia, 'historia');
    // Por ahora el proyecto no usa imágenes; el campo queda listo para cuando se integren.
    this.imagen = datos.imagen ?? null;
  }

  /** Nombre que usan las estrategias de ordenamiento. */
  get nombreVisible() {
    return this.nombre;
  }

  /** Método del UML: devuelve la ficha del animal lista para mostrarse. */
  consultarFicha() {
    return {
      nombre: this.nombre,
      especie: this.especie,
      edad: this.edad,
      habitat: this.habitat,
      zona: this.zona,
      estado: ETIQUETAS_ESTADO[this.estado],
      nivelConservacion: this.nivelConservacion,
      situacionActual: this.situacionActual,
      historia: this.historia,
    };
  }

  /** Método del UML: actualiza la situación y el estado (lo usará el administrador). */
  actualizarInformacion({ situacionActual, estado }) {
    if (situacionActual !== undefined) {
      this.situacionActual = requerirTexto(situacionActual, 'situacionActual');
    }
    if (estado !== undefined) {
      this.estado = requerirOpcion(estado, ESTADOS_ANIMAL, 'estado');
    }
  }
}
