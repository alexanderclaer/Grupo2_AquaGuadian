import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { DATOS_INICIALES } from '../frontend/js/servicios/datosIniciales.js';
import { RepositorioContenido } from '../frontend/js/servicios/RepositorioContenido.js';

beforeEach(() => RepositorioContenido.reiniciarParaPruebas());

test('Singleton: obtenerInstancia devuelve siempre el mismo objeto', () => {
  assert.equal(RepositorioContenido.obtenerInstancia(), RepositorioContenido.obtenerInstancia());
});

test('Singleton: no se puede crear con new', () => {
  assert.throws(() => new RepositorioContenido(), /obtenerInstancia/);
  assert.throws(() => new RepositorioContenido(Symbol('falsa')), /obtenerInstancia/);
});

test('Singleton: el contenido cargado se ve desde cualquier referencia', () => {
  RepositorioContenido.obtenerInstancia().cargar(DATOS_INICIALES);
  assert.equal(RepositorioContenido.obtenerInstancia().obtenerAnimales().length, 6);
});

test('Los datos iniciales del proyecto cargan sin errores', () => {
  const repositorio = RepositorioContenido.obtenerInstancia();
  repositorio.cargar(DATOS_INICIALES);
  assert.deepEqual(repositorio.obtenerErroresCarga(), []);
  assert.equal(repositorio.obtenerNoticias().length, 6);
  assert.equal(repositorio.obtenerEventos().length, 4);
});

test('Los registros inválidos se omiten y se informan, sin romper la carga', () => {
  const repositorio = RepositorioContenido.obtenerInstancia();
  repositorio.cargar({
    animales: [DATOS_INICIALES.animales[0], { nombre: '' }, null],
    noticias: [],
    eventos: [],
  });
  assert.equal(repositorio.obtenerAnimales().length, 1);
  assert.equal(repositorio.obtenerErroresCarga().length, 2);
});

test('cargar rechaza datos nulos', () => {
  assert.throws(() => RepositorioContenido.obtenerInstancia().cargar(null));
});

test('Los métodos obtener devuelven copias: no se puede alterar el repositorio desde fuera', () => {
  const repositorio = RepositorioContenido.obtenerInstancia();
  repositorio.cargar(DATOS_INICIALES);
  repositorio.obtenerAnimales().pop();
  assert.equal(repositorio.obtenerAnimales().length, 6);
});

test('Estadísticas: cuenta los eventos próximos según la fecha recibida', () => {
  const repositorio = RepositorioContenido.obtenerInstancia();
  repositorio.cargar(DATOS_INICIALES);
  assert.equal(repositorio.calcularEstadisticas('2026-11-13').eventosProximos, 3);
  assert.equal(repositorio.calcularEstadisticas('2027-12-31').eventosProximos, 0);
  assert.equal(repositorio.calcularEstadisticas('2026-01-01').animalesSaludables, 4);
});
