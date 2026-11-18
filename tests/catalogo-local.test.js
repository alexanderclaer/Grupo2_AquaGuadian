import test from 'node:test';
import assert from 'node:assert/strict';
import { DATOS_INICIALES } from '../frontend/js/servicios/datosIniciales.js';
import { RepositorioContenido } from '../frontend/js/servicios/RepositorioContenido.js';

const casos = [
  ['animal', 'obtenerAnimales', 'idAnimal', 'nombre', 'Tortuga de prueba', 'Tortuga editada'],
  ['evento', 'obtenerEventos', 'idEvento', 'nombre', 'Visita de prueba', 'Visita editada'],
  ['noticia', 'obtenerNoticias', 'idNoticia', 'titulo', 'Noticia de prueba', 'Noticia editada'],
];

function preparar() {
  const datos = new Map();
  const almacen = {
    getItem: (clave) => datos.get(clave) ?? null,
    setItem: (clave, valor) => datos.set(clave, valor),
  };
  function abrir() {
    RepositorioContenido.reiniciarParaPruebas();
    const repositorio = RepositorioContenido.obtenerInstancia();
    repositorio.cargar(DATOS_INICIALES, () => almacen);
    return repositorio;
  }
  return { datos, almacen, abrir, repositorio: abrir() };
}

for (const [tipo, obtener, campoId, campoNombre, nombre, editado] of casos) {
  test(`Catálogo local: crear, editar y eliminar ${tipo} persiste y conserva identificadores`, () => {
    const { repositorio, abrir } = preparar();
    const iniciales = repositorio[obtener]();
    const datos = { ...iniciales[0], [campoNombre]: nombre, imagen: 'representativa.jpg' };
    repositorio.guardarContenido(tipo, datos);
    const creado = repositorio[obtener]().at(-1);
    const id = creado[campoId];
    assert.ok(id > Math.max(...iniciales.map((registro) => registro[campoId])));
    assert.deepEqual(repositorio[obtener]().slice(0, -1), iniciales);

    const recargado = abrir();
    assert.deepEqual(recargado[obtener]().at(-1), creado);
    recargado.guardarContenido(tipo, { [campoNombre]: editado, [campoId]: 999 }, creado);
    const editadoLocal = abrir()[obtener]().at(-1);
    assert.equal(editadoLocal[campoNombre], editado);
    assert.equal(editadoLocal[campoId], id);
    assert.equal(editadoLocal.imagen, 'representativa.jpg');

    const despues = abrir();
    despues.eliminarContenido(tipo, editadoLocal);
    assert.deepEqual(abrir()[obtener](), iniciales);
    despues.guardarContenido(tipo, datos);
    assert.ok(abrir()[obtener]().at(-1)[campoId] > id);
  });
}

test('Catálogo local: valida con los modelos y evita duplicados normalizados', () => {
  const { repositorio, datos } = preparar();
  const [animal] = repositorio.obtenerAnimales();
  const [evento] = repositorio.obtenerEventos();
  assert.throws(() => repositorio.guardarContenido('animal', { ...animal, edad: -1 }), /edad/);
  assert.throws(() => repositorio.guardarContenido('evento', { ...evento, fecha: '2026-02-30' }), /fecha real/);
  assert.throws(() => repositorio.guardarContenido('animal', { ...animal, nombre: ` ${animal.nombre.toUpperCase()} ` }), /Ya existe/);
  assert.throws(() => repositorio.guardarContenido('evento', { ...evento, lugar: '' }), /lugar/);
  assert.equal(datos.size, 0);
});

test('Catálogo local: conserva modificaciones ajenas y rechaza editar o eliminar una versión anterior', () => {
  const { repositorio, abrir } = preparar();
  const [original, otro] = repositorio.obtenerEventos();
  const segundaPestana = abrir();
  segundaPestana.guardarContenido('evento', { nombre: 'Cambiado en otra pestaña' }, original);
  assert.throws(() => repositorio.guardarContenido('evento', { nombre: 'Cambio obsoleto' }, original), /El registro cambió/);
  assert.throws(() => repositorio.eliminarContenido('evento', original), /El registro cambió/);
  repositorio.guardarContenido('evento', { nombre: 'Otro evento actualizado' }, otro);
  assert.deepEqual(abrir().obtenerEventos().slice(0, 2).map(({ nombre }) => nombre),
    ['Cambiado en otra pestaña', 'Otro evento actualizado']);
});

test('Catálogo local: persistir un catálogo vacío evita restaurar registros borrados al recargar', () => {
  const { repositorio, abrir } = preparar();
  for (const evento of repositorio.obtenerEventos()) repositorio.eliminarContenido('evento', evento);
  assert.deepEqual(abrir().obtenerEventos(), []);
  assert.equal(abrir().obtenerAnimales().length, DATOS_INICIALES.animales.length);
});

test('Catálogo local: si el navegador no permite guardar, mantiene el estado anterior', () => {
  const { repositorio, almacen, datos } = preparar();
  const [animal] = repositorio.obtenerAnimales();
  almacen.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.throws(() => repositorio.guardarContenido('animal', { nombre: 'Cambio local' }, animal), /no se aplicaron/);
  assert.equal(repositorio.obtenerAnimales()[0], animal);
  assert.equal(datos.size, 0);
});

test('Catálogo local: los datos ilegibles se conservan y el catálogo de ejemplo sigue disponible', () => {
  const { repositorio, datos, abrir } = preparar();
  const [evento] = repositorio.obtenerEventos();
  repositorio.guardarContenido('evento', { ...evento, nombre: 'Evento de prueba' });
  const [clave] = datos.keys();
  datos.set(clave, '{incompleto');
  const recargado = abrir();
  assert.equal(recargado.obtenerEventos().length, DATOS_INICIALES.eventos.length);
  assert.match(recargado.obtenerErroresCarga()[0], /ilegible/);
  assert.throws(() => recargado.eliminarContenido('evento', evento), /ilegible/);
  assert.equal(datos.get(clave), '{incompleto');
});
