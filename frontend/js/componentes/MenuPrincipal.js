import { h } from '../utilidades/dom.js';
import { icono } from '../utilidades/iconos.js';
import { vistasVisibles } from '../servicios/navegacion.js';

/**
 * Menú principal (clase "MenuPrincipal" del UML).
 * mostrarMenu() -> el elemento <header> con los enlaces de las vistas visibles.
 * marcarActiva(id) -> resalta la vista actual.
 */
export function crearMenuPrincipal({ nombreApp, esAdministrador }) {
  const enlaces = new Map();
  const lista = h('ul', { clase: 'menu__lista', id: 'menu-lista' });

  for (const vista of vistasVisibles({ esAdministrador })) {
    const enlace = h('a', {
      clase: 'menu__enlace',
      href: `#${vista.id}`,
      enClick: () => {
        if (enlace.getAttribute('aria-current') === 'page') alternar(true);
      },
    }, icono(vista.icono, 17), vista.etiqueta);
    enlaces.set(vista.id, enlace);
    lista.append(h('li', {}, enlace));
  }

  const boton = h('button', {
    type: 'button',
    clase: 'menu__boton',
    'aria-expanded': 'false',
    'aria-controls': 'menu-lista',
    'aria-label': 'Abrir menú',
    enClick: () => alternar(),
  }, icono('menu', 24));

  const navegacion = h('nav', { 'aria-label': 'Navegación principal' }, lista);
  const cabecera = h(
    'header',
    { clase: 'menu' },
    h(
      'div',
      { clase: 'menu__contenedor' },
      h('a', { clase: 'marca', href: '#inicio', 'aria-label': `${nombreApp}, ir al inicio` }, h('span', { clase: 'marca__icono' }, icono('olas', 22)), nombreApp.toUpperCase()),
      boton,
      navegacion,
    ),
  );

  function alternar(forzarCierre = false) {
    const abierto = forzarCierre ? false : !cabecera.classList.contains('menu--abierto');
    cabecera.classList.toggle('menu--abierto', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  }

  return {
    elemento: cabecera,
    marcarActiva(idVista) {
      enlaces.forEach((enlace, id) => {
        if (id === idVista) enlace.setAttribute('aria-current', 'page');
        else enlace.removeAttribute('aria-current');
      });
      alternar(true);
    },
  };
}
