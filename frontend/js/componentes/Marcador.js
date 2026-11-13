import { h, iniciales } from '../utilidades/dom.js';
import { icono } from '../utilidades/iconos.js';

/**
 * Marcador de posición para reemplazar las imágenes mientras el proyecto no
 * las usa. Muestra un bloque de color con las iniciales o un ícono.
 */
export function MarcadorAnimal(animal) {
  return h(
    'div',
    { clase: `marcador marcador--${animal.estado}`, 'aria-hidden': 'true' },
    h('span', { clase: 'marcador__iniciales' }, iniciales(animal.especie)),
    h('span', { clase: 'marcador__zona' }, icono('ubicacion', 14), animal.zona),
  );
}

export function MarcadorNoticia(noticia) {
  return h(
    'div',
    { clase: 'marcador marcador--noticia', 'aria-hidden': 'true' },
    icono('periodico', 30),
    h('span', { clase: 'marcador__zona' }, noticia.categoria),
  );
}
