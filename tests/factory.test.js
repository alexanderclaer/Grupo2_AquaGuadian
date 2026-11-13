import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Animal } from '../frontend/js/modelos/Animal.js';
import { Evento } from '../frontend/js/modelos/Evento.js';
import { Noticia } from '../frontend/js/modelos/Noticia.js';
import {
  CreadorAnimal,
  CreadorContenido,
  obtenerCreador,
} from '../frontend/js/servicios/CreadorContenido.js';
import { DATOS_INICIALES } from '../frontend/js/servicios/datosIniciales.js';
import { ErrorValidacion } from '../frontend/js/utilidades/errores.js';

test('Factory Method: cada creador produce el tipo de contenido que le corresponde', () => {
  assert.ok(obtenerCreador('animal').crear(DATOS_INICIALES.animales[0]) instanceof Animal);
  assert.ok(obtenerCreador('noticia').crear(DATOS_INICIALES.noticias[0]) instanceof Noticia);
  assert.ok(obtenerCreador('evento').crear(DATOS_INICIALES.eventos[0]) instanceof Evento);
});

test('Factory Method: tipo desconocido lanza ErrorValidacion', () => {
  assert.throws(() => obtenerCreador('delfin'), ErrorValidacion);
});

test('Factory Method: crear() valida que los datos sean un objeto', () => {
  const creador = new CreadorAnimal();
  assert.throws(() => creador.crear(null), ErrorValidacion);
  assert.throws(() => creador.crear('texto'), ErrorValidacion);
  assert.throws(() => creador.crear([]), ErrorValidacion);
});

test('Factory Method: el creador abstracto exige implementar crearProducto()', () => {
  assert.throws(() => new CreadorContenido().crear({}), /crearProducto/);
});

test('Factory Method: los errores de validación del modelo suben al llamador', () => {
  assert.throws(() => obtenerCreador('animal').crear({ nombre: 'Sin datos' }), ErrorValidacion);
});
