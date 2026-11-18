import test from 'node:test';
import assert from 'node:assert/strict';
import { CLAVE_DEMO, CORREO_ADMIN_DEMO, crearAccesoDemo } from '../frontend/js/servicios/accesoDemo.js';
import { resolverVista, vistasVisibles } from '../frontend/js/servicios/navegacion.js';

const visitante = { nombre: 'Visitante ficticio', correo: 'visitante@example.test', clave: CLAVE_DEMO };

function prepararAcceso() {
  const datos = new Map();
  const almacen = {
    getItem: (clave) => datos.get(clave) ?? null,
    setItem: (clave, valor) => datos.set(clave, valor),
  };
  const abrir = () => crearAccesoDemo(() => almacen);
  return { datos, abrir, acceso: abrir() };
}

test('Acceso demo: registro, inicio y cierre persisten en el mismo almacenamiento', () => {
  const { datos, acceso, abrir } = prepararAcceso();
  acceso.registrar({ ...visitante, nombre: ' Visitante ficticio ', correo: ' VISITANTE@example.test ' });
  assert.equal(acceso.obtenerSesion(), null);
  assert.ok([...datos.values()].every((valor) => !valor.includes(CLAVE_DEMO)));

  abrir().iniciarSesion(visitante);
  assert.deepEqual(abrir().obtenerSesion(), {
    nombre: visitante.nombre, correo: visitante.correo, rol: 'usuario',
  });
  acceso.cerrarSesion();
  assert.equal(abrir().obtenerSesion(), null);
  abrir().iniciarSesion(visitante);
  assert.equal(acceso.obtenerSesion().rol, 'usuario');
});

test('Acceso demo: rechaza entradas inválidas, cuentas duplicadas y el correo reservado', () => {
  const { acceso } = prepararAcceso();
  assert.throws(() => acceso.registrar({ ...visitante, nombre: ' ' }), /nombre ficticio/);
  assert.throws(() => acceso.registrar({ ...visitante, correo: 'invalido' }), /correo de demostración válido/);
  assert.throws(() => acceso.registrar({ ...visitante, clave: 'otra' }), /contraseña pública/);
  assert.throws(() => acceso.registrar({ ...visitante, correo: CORREO_ADMIN_DEMO.toUpperCase() }), /reservado/);
  acceso.registrar(visitante);
  assert.throws(() => acceso.registrar(visitante), /ya está registrado/);
});

test('Acceso demo: rechaza contraseñas incorrectas y cuentas desconocidas', () => {
  const { acceso } = prepararAcceso();
  assert.throws(() => acceso.iniciarSesion(visitante), /correo registrado/);
  acceso.registrar(visitante);
  assert.throws(() => acceso.iniciarSesion({ ...visitante, clave: 'otra' }), /contraseña de demostración/);
  assert.equal(acceso.obtenerSesion(), null);
});

test('Acceso demo: el menú y la ruta administrativa dependen de la sesión', () => {
  const { acceso, abrir } = prepararAcceso();
  const opciones = () => {
    const sesion = abrir().obtenerSesion();
    return { accesoDemo: true, sesion, esAdministrador: sesion?.rol === 'admin' };
  };
  const tienePanel = () => vistasVisibles(opciones()).some(({ id }) => id === 'administracion');
  assert.equal(resolverVista('#registro', opciones()), 'registro');
  assert.equal(tienePanel(), false);
  acceso.registrar({ ...visitante, rol: 'admin' });
  acceso.iniciarSesion(visitante);
  assert.equal(resolverVista('#administracion', opciones()), 'inicio');
  assert.equal(tienePanel(), false);
  acceso.iniciarSesion({ correo: CORREO_ADMIN_DEMO, clave: CLAVE_DEMO });
  assert.equal(resolverVista('#registro', opciones()), 'acceso');
  assert.equal(resolverVista('#administracion', opciones()), 'administracion');
  assert.equal(tienePanel(), true);
  acceso.cerrarSesion();
  assert.equal(resolverVista('#administracion', opciones()), 'inicio');
  assert.equal(tienePanel(), false);
});

test('Acceso demo: los almacenamientos independientes aíslan cuentas y sesiones', () => {
  const primero = prepararAcceso().acceso;
  const segundo = prepararAcceso().acceso;
  primero.registrar(visitante);
  primero.iniciarSesion(visitante);
  assert.equal(segundo.obtenerSesion(), null);
  assert.throws(() => segundo.iniciarSesion(visitante), /correo registrado/);
});

test('Acceso demo: tolera datos ilegibles e informa cuando el almacenamiento está bloqueado', () => {
  const { datos, acceso } = prepararAcceso();
  acceso.registrar(visitante);
  const [clave] = datos.keys();
  datos.set(clave, '{');
  assert.equal(acceso.obtenerSesion(), null);
  const bloqueado = crearAccesoDemo(() => { throw new Error('Acceso denegado'); });
  assert.equal(bloqueado.obtenerSesion(), null);
  assert.throws(() => bloqueado.registrar(visitante), /almacenamiento local/);
});
