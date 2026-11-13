import { h } from '../utilidades/dom.js';
import { icono } from '../utilidades/iconos.js';

let contador = 0;

/**
 * Abre una ventana modal con el elemento <dialog> nativo (cierra con Esc y
 * devuelve el foco al elemento anterior). El contenido debe tener un
 * encabezado con id = idTitulo para que lectores de pantalla lo anuncien.
 */
export function abrirDialogo(construirContenido) {
  const idTitulo = `dialogo-titulo-${++contador}`;
  const dialogo = h('dialog', { clase: 'dialogo', 'aria-labelledby': idTitulo });
  const cerrar = h(
    'button',
    { type: 'button', clase: 'dialogo__cerrar', 'aria-label': 'Cerrar', enClick: () => dialogo.close() },
    icono('cerrar', 20),
  );
  dialogo.append(cerrar, construirContenido(idTitulo));
  dialogo.addEventListener('close', () => dialogo.remove());
  dialogo.addEventListener('click', (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
  document.body.append(dialogo);
  dialogo.showModal();
  return dialogo;
}
