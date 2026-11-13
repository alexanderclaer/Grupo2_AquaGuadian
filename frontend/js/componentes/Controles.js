import { h } from '../utilidades/dom.js';
import { icono } from '../utilidades/iconos.js';

let contador = 0;
const nuevoId = (prefijo) => `${prefijo}-${++contador}`;

/** Caja de búsqueda. Llama a alCambiar(texto) cada vez que el usuario escribe. */
export function CajaBusqueda({ etiqueta, marcador, alCambiar }) {
  const id = nuevoId('buscar');
  const campo = h('input', {
    id,
    type: 'search',
    clase: 'busqueda__campo',
    placeholder: marcador,
    autocomplete: 'off',
    enInput: (evento) => alCambiar(evento.target.value),
  });
  return h(
    'div',
    { clase: 'busqueda' },
    h('label', { clase: 'visualmente-oculto', for: id }, etiqueta),
    icono('buscar', 18),
    campo,
  );
}

/** Grupo de botones tipo pestaña. opciones: [{ valor, etiqueta }] */
export function Pestanas({ etiqueta, opciones, valorInicial, alCambiar }) {
  const grupo = h('div', { clase: 'pestanas', role: 'group', 'aria-label': etiqueta });
  const botones = opciones.map((opcion) =>
    h(
      'button',
      {
        type: 'button',
        clase: 'pestana',
        'aria-pressed': String(opcion.valor === valorInicial),
        enClick: () => {
          botones.forEach((boton, posicion) =>
            boton.setAttribute('aria-pressed', String(opciones[posicion].valor === opcion.valor)),
          );
          alCambiar(opcion.valor);
        },
      },
      opcion.etiqueta,
    ),
  );
  grupo.append(...botones);
  return grupo;
}

/** Selector de ordenamiento. Recibe las estrategias disponibles. */
export function SelectorOrden({ estrategias, inicial = estrategias[0], alCambiar }) {
  const id = nuevoId('orden');
  const selector = h(
    'select',
    {
      id,
      clase: 'selector__campo',
      enChange: (evento) => alCambiar(estrategias.find((e) => e.id === evento.target.value)),
    },
    estrategias.map((estrategia) =>
      h('option', { value: estrategia.id, selected: estrategia === inicial }, estrategia.etiqueta),
    ),
  );
  return h('div', { clase: 'selector' }, h('label', { for: id }, 'Ordenar por'), selector);
}

/** Mensaje cuando no hay resultados. */
export function EstadoVacio(titulo, detalle) {
  return h(
    'div',
    { clase: 'vacio', role: 'status' },
    icono('buscar', 28),
    h('p', { clase: 'vacio__titulo' }, titulo),
    h('p', { clase: 'vacio__detalle' }, detalle),
  );
}

/** Encabezado de página con título, descripción y etiqueta superior. */
export function EncabezadoSeccion({ etiqueta, titulo, descripcion }) {
  return h(
    'header',
    { clase: 'encabezado-seccion' },
    h('p', { clase: 'etiqueta' }, etiqueta),
    h('h1', {}, titulo),
    h('p', { clase: 'encabezado-seccion__texto' }, descripcion),
  );
}
