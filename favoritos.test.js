import test from 'node:test';
import assert from 'node:assert/strict';
import { crearFavoritos } from '../frontend/js/servicios/favoritos.js';
import { textoSaludo } from '../frontend/js/servicios/navegacion.js';

function prepararFavoritos() {
  const datos = new Map();
  const almacen = {
    getItem: (clave) => datos.get(clave) ?? null,
    setItem: (clave, valor) => datos.set(clave, valor),
  };
  const abrir = () => crearFavoritos(() => almacen);
  return { datos, abrir, favoritos: abrir() };
}

test('Favoritos: una cuenta nueva no tiene animales favoritos', () => {
  const { favoritos } = prepararFavoritos();
  assert.deepEqual(favoritos.listar('ana@example.test'), []);
  assert.equal(favoritos.esFavorito('ana@example.test', 1), false);
});

test('Favoritos: alternar marca y desmarca un animal', () => {
  const { favoritos } = prepararFavoritos();
  assert.equal(favoritos.alternar('ana@example.test', 2), true);
  assert.equal(favoritos.esFavorito('ana@example.test', 2), true);
  assert.equal(favoritos.alternar('ana@example.test', 2), false);
  assert.deepEqual(favoritos.listar('ana@example.test'), []);
});

test('Favoritos: cada cuenta tiene su propia lista y se conserva al recargar', () => {
  const { favoritos, abrir } = prepararFavoritos();
  favoritos.alternar('ana@example.test', 1);
  favoritos.alternar('luis@example.test', 3);
  assert.deepEqual(abrir().listar('ana@example.test'), [1]);
  assert.deepEqual(abrir().listar('luis@example.test'), [3]);
});

test('Favoritos: rechaza ids inválidos, ignora datos ilegibles y avisa si el almacenamiento falla', () => {
  const { datos, favoritos } = prepararFavoritos();
  assert.throws(() => favoritos.alternar('ana@example.test', 'uno'), /no válido/);
  favoritos.alternar('ana@example.test', 1);
  const [clave] = datos.keys();
  datos.set(clave, JSON.stringify({ 'ana@example.test': [1, 'x', null, 4] }));
  assert.deepEqual(favoritos.listar('ana@example.test'), [1, 4]);
  datos.set(clave, '{');
  assert.deepEqual(favoritos.listar('ana@example.test'), []);
  const bloqueado = crearFavoritos(() => { throw new Error('Acceso denegado'); });
  assert.deepEqual(bloqueado.listar('ana@example.test'), []);
  assert.throws(() => bloqueado.alternar('ana@example.test', 1), /almacenamiento local/);
});

test('Saludo del menú: usa el primer nombre, "administrador" para el admin y nada sin sesión', () => {
  assert.equal(textoSaludo(null), '');
  assert.equal(textoSaludo({ nombre: ' Ana María Pérez ', correo: 'a@example.test', rol: 'usuario' }), 'Hola, Ana');
  assert.equal(textoSaludo({ nombre: 'Administración de demostración', correo: 'admin@aquaguardian.test', rol: 'admin' }), 'Hola, administrador');
});
