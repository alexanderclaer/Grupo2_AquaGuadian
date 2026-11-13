import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Animal } from '../frontend/js/modelos/Animal.js';
import { Noticia } from '../frontend/js/modelos/Noticia.js';
import { DATOS_INICIALES } from '../frontend/js/servicios/datosIniciales.js';
import {
  OrdenAlfabetico,
  OrdenEdadAscendente,
  OrdenFechaAntigua,
  OrdenFechaReciente,
  OrganizadorLista,
} from '../frontend/js/servicios/estrategiasOrden.js';
import { ErrorValidacion } from '../frontend/js/utilidades/errores.js';

const animales = DATOS_INICIALES.animales.map((d) => new Animal(d));
const noticias = DATOS_INICIALES.noticias.map((d) => new Noticia(d));

test('Strategy: orden alfabético por nombre', () => {
  const nombres = new OrdenAlfabetico().ordenar(animales).map((a) => a.nombre);
  assert.deepEqual(nombres, ['Flipper', 'Luna', 'Marina', 'Pepper', 'Simba', 'Thunder']);
});

test('Strategy: orden por edad de menor a mayor', () => {
  const edades = new OrdenEdadAscendente().ordenar(animales).map((a) => a.edad);
  assert.deepEqual(edades, [2, 5, 8, 10, 12, 35]);
});

test('Strategy: fecha reciente y antigua son opuestas', () => {
  const recientes = new OrdenFechaReciente().ordenar(noticias).map((n) => n.idNoticia);
  const antiguas = new OrdenFechaAntigua().ordenar(noticias).map((n) => n.idNoticia);
  assert.deepEqual(recientes, [...antiguas].reverse());
  assert.equal(recientes[0], 6);
});

test('Strategy: las estrategias no modifican la lista original', () => {
  const copia = [...animales];
  new OrdenEdadAscendente().ordenar(animales);
  assert.deepEqual(animales, copia);
});

test('Strategy: el contexto permite cambiar de estrategia en ejecución', () => {
  const organizador = new OrganizadorLista(new OrdenAlfabetico());
  assert.equal(organizador.organizar(animales)[0].nombre, 'Flipper');
  organizador.establecerEstrategia(new OrdenEdadAscendente());
  assert.equal(organizador.organizar(animales)[0].nombre, 'Luna');
});

test('Strategy: el contexto rechaza objetos que no son estrategias', () => {
  assert.throws(() => new OrganizadorLista({}), ErrorValidacion);
  assert.throws(() => new OrganizadorLista(null), ErrorValidacion);
});
