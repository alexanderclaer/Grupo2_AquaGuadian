import { CLAVE_DEMO, CORREO_ADMIN_DEMO } from '../servicios/accesoDemo.js';
import { h } from '../utilidades/dom.js';

function Campo(etiqueta, nombre, tipo, atributos = {}) {
  return h('label', { clase: 'acceso__campo' }, etiqueta, h('input', {
    name: nombre, type: tipo, required: true, autocomplete: 'off', ...atributos,
  }));
}

export function crearSeccionAcceso({ acceso, sesion, registro, alCambiarSesion }) {
  const mensaje = h('p', { clase: 'acceso__mensaje', role: 'status' });
  const titulo = sesion ? 'Mi cuenta' : registro ? 'Registrarse' : 'Iniciar sesión';
  const aviso = h('p', { clase: 'aviso', id: 'aviso-acceso' },
    'Simulación local sin seguridad de autenticación. Usa un nombre y correo ficticios. ',
    'Introduce únicamente la contraseña pública de demostración ', h('code', {}, CLAVE_DEMO), '.');

  function ejecutar(accion) {
    mensaje.textContent = '';
    try {
      accion();
    } catch (error) {
      mensaje.textContent = error.message;
    }
  }

  const formulario = sesion
    ? h('div', { clase: 'acceso__formulario' },
        h('p', {}, sesion.nombre),
        h('p', {}, sesion.correo),
        h('p', {}, 'Rol de demostración: ', h('strong', {}, sesion.rol)),
        h('button', { type: 'button', clase: 'boton boton--primario', enClick: () => ejecutar(() => {
          acceso.cerrarSesion();
          alCambiarSesion('inicio');
        }) }, 'Cerrar sesión'))
    : h('form', {
        clase: 'acceso__formulario',
        'aria-describedby': 'aviso-acceso',
        enSubmit: (evento) => {
          evento.preventDefault();
          const campos = Object.fromEntries(new FormData(evento.currentTarget));
          evento.currentTarget.elements.clave.value = '';
          ejecutar(() => {
            if (registro) {
              acceso.registrar(campos);
              alCambiarSesion('acceso', 'Cuenta de demostración creada. Ya puedes iniciar sesión.');
            } else {
              acceso.iniciarSesion(campos);
              alCambiarSesion('acceso');
            }
          });
        },
      },
      registro && Campo('Nombre ficticio', 'nombre', 'text', { maxlength: 80 }),
      Campo('Correo de demostración', 'correo', 'email', { maxlength: 254, placeholder: 'visitante@example.test' }),
      Campo('Contraseña de demostración', 'clave', 'password', { autocomplete: 'new-password' }),
      h('button', { type: 'submit', clase: 'boton boton--primario' }, titulo),
      h('a', { href: registro ? '#acceso' : '#registro' }, registro ? 'Ya tengo una cuenta' : 'Crear una cuenta de demostración'),
      !registro && h('p', {}, 'Correo del administrador de demostración: ', h('code', {}, CORREO_ADMIN_DEMO), '.'));

  const elemento = h('section', { clase: 'pagina pagina-acceso' },
    h('div', { clase: 'acceso__tarjeta' },
      h('h1', {}, titulo), aviso, formulario, mensaje));
  return { elemento, mostrarMensaje: (texto) => { mensaje.textContent = texto; } };
}
