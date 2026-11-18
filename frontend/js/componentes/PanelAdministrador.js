import { h } from '../utilidades/dom.js';
import { icono } from '../utilidades/iconos.js';
import { EncabezadoSeccion } from './Controles.js';

/**
 * Panel de administración (clase "PanelAdministrador" del UML).
 * Estructura reservada: el menú solo lo muestra al rol administrador y las
 * operaciones de crear/editar/eliminar se implementarán en una entrega posterior.
 */
export function crearPanelAdministrador() {
  const opciones = [
    ['Gestionar animales', 'Crear, editar y eliminar fichas de animales.', 'pez'],
    ['Gestionar noticias', 'Publicar, editar y eliminar noticias.', 'periodico'],
    ['Gestionar eventos', 'Publicar, editar y eliminar eventos.', 'calendario'],
  ];
  return h(
    'section',
    { clase: 'pagina' },
    EncabezadoSeccion({
      etiqueta: 'Vista de referencia',
      titulo: 'Panel de administración',
      descripcion: 'La gestión de contenido está pendiente. Las tarjetas describen las operaciones previstas.',
    }),
    h(
      'div',
      { clase: 'rejilla' },
      opciones.map(([titulo, texto, nombreIcono]) =>
        h('article', { clase: 'tarjeta tarjeta--simple' }, h('div', { clase: 'icono-caja' }, icono(nombreIcono, 24)), h('h3', { clase: 'tarjeta__titulo' }, titulo), h('p', { clase: 'tarjeta__texto' }, texto)),
      ),
    ),
  );
}
