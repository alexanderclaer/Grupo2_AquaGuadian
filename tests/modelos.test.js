import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Animal } from '../frontend/js/modelos/Animal.js';
import { Evento } from '../frontend/js/modelos/Evento.js';
import { Noticia } from '../frontend/js/modelos/Noticia.js';
import { ErrorValidacion } from '../frontend/js/utilidades/errores.js';
import { DATOS_INICIALES } from '../frontend/js/servicios/datosIniciales.js';

const animalValido = () => ({ ...DATOS_INICIALES.animales[0] });

test('Animal válido expone su ficha', () => {
  const animal = new Animal(animalValido());
  assert.equal(animal.consultarFicha().nombre, 'Flipper');
  assert.equal(animal.consultarFicha().estado, 'Saludable');
  assert.equal(animal.imagen, null);
});

test('Animal rechaza nombre vacío, edad negativa y estado desconocido', () => {
  assert.throws(() => new Animal({ ...animalValido(), nombre: '  ' }), ErrorValidacion);
  assert.throws(() => new Animal({ ...animalValido(), edad: -1 }), ErrorValidacion);
  assert.throws(() => new Animal({ ...animalValido(), estado: 'volando' }), ErrorValidacion);
});

test('Animal.actualizarInformacion valida y actualiza', () => {
  const animal = new Animal(animalValido());
  animal.actualizarInformacion({ estado: 'en-cuidado', situacionActual: 'En revisión' });
  assert.equal(animal.estado, 'en-cuidado');
  assert.throws(() => animal.actualizarInformacion({ estado: 'x' }), ErrorValidacion);
});

test('Noticia divide el contenido en párrafos', () => {
  const noticia = new Noticia(DATOS_INICIALES.noticias[0]);
  assert.equal(noticia.consultarNoticia().parrafos.length, 3);
});

test('Noticia y Evento rechazan fechas inválidas', () => {
  assert.throws(() => new Noticia({ ...DATOS_INICIALES.noticias[0], fechaPublicacion: '01/03/2026' }), ErrorValidacion);
  assert.throws(() => new Evento({ ...DATOS_INICIALES.eventos[0], fecha: '2026-02-31' }), ErrorValidacion);
});
