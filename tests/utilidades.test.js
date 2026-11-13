import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DATOS_INICIALES } from '../frontend/js/servicios/datosIniciales.js';
import { Animal } from '../frontend/js/modelos/Animal.js';
import { filtrarPorTexto, normalizar } from '../frontend/js/servicios/busqueda.js';
import { resolverVista, vistasVisibles } from '../frontend/js/servicios/navegacion.js';
import { esFechaVigente, formatearFecha, hoyISO } from '../frontend/js/utilidades/fechas.js';

const animales = DATOS_INICIALES.animales.map((d) => new Animal(d));

test('Búsqueda ignora tildes y mayúsculas', () => {
  assert.equal(normalizar('  Tiburón '), 'tiburon');
  assert.equal(filtrarPorTexto(animales, 'TIBURON', ['especie']).length, 1);
  assert.equal(filtrarPorTexto(animales, 'delfin', ['especie'])[0].nombre, 'Flipper');
});

test('Búsqueda vacía devuelve todo y sin coincidencias devuelve vacío', () => {
  assert.equal(filtrarPorTexto(animales, '', ['nombre']).length, 6);
  assert.equal(filtrarPorTexto(animales, 'zzz', ['nombre']).length, 0);
});

test('Navegación: vistas válidas, desconocidas y acceso de administrador', () => {
  assert.equal(resolverVista('#animales'), 'animales');
  assert.equal(resolverVista('#noticias-eventos'), 'noticias-eventos');
  assert.equal(resolverVista(''), 'inicio');
  assert.equal(resolverVista('#no-existe'), 'inicio');
  assert.equal(resolverVista('#administracion'), 'inicio');
  assert.equal(resolverVista('#administracion', { esAdministrador: true }), 'administracion');
});

test('Navegación: el menú solo muestra Administración al administrador', () => {
  assert.equal(vistasVisibles().length, 3);
  assert.equal(vistasVisibles({ esAdministrador: true }).length, 4);
});

test('Fechas: formato en español y comparación de vigencia', () => {
  assert.equal(formatearFecha('2026-03-01'), '1 de marzo de 2026');
  assert.equal(hoyISO(new Date(2026, 10, 13)), '2026-11-13');
  assert.equal(esFechaVigente('2026-11-13', '2026-11-13'), true);
  assert.equal(esFechaVigente('2026-11-12', '2026-11-13'), false);
});
