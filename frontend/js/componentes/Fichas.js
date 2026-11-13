import { h } from '../utilidades/dom.js';
import { formatearFecha } from '../utilidades/fechas.js';
import { icono } from '../utilidades/iconos.js';
import { abrirDialogo } from './Dialogo.js';
import { MarcadorAnimal } from './Marcador.js';
import { InsigniaEstado } from './Tarjetas.js';

function Dato(etiqueta, valor) {
  return h('div', { clase: 'dato' }, h('dt', {}, etiqueta), h('dd', {}, valor));
}

/** Ficha completa de un animal (método consultarFicha del UML). */
export function abrirFichaAnimal(animal) {
  const ficha = animal.consultarFicha();
  abrirDialogo((idTitulo) =>
    h(
      'div',
      { clase: 'ficha' },
      MarcadorAnimal(animal),
      h(
        'div',
        { clase: 'ficha__cuerpo' },
        h('div', { clase: 'tarjeta__fila' }, h('h2', { id: idTitulo }, ficha.nombre), InsigniaEstado(animal.estado)),
        h('p', { clase: 'tarjeta__subtitulo' }, ficha.especie),
        h(
          'dl',
          { clase: 'datos' },
          Dato('Edad', `${ficha.edad} ${ficha.edad === 1 ? 'año' : 'años'}`),
          Dato('Zona del parque', ficha.zona),
          Dato('Hábitat', ficha.habitat),
          Dato('Conservación', ficha.nivelConservacion),
        ),
        h('h3', { clase: 'ficha__subtitulo' }, 'Situación actual'),
        h('p', {}, ficha.situacionActual),
        h('h3', { clase: 'ficha__subtitulo' }, 'Su historia'),
        h('p', {}, ficha.historia),
      ),
    ),
  );
}

/** Detalle de una noticia (método consultarNoticia del UML). */
export function abrirDetalleNoticia(noticia) {
  const detalle = noticia.consultarNoticia();
  abrirDialogo((idTitulo) =>
    h(
      'div',
      { clase: 'ficha ficha--texto' },
      h(
        'div',
        { clase: 'ficha__cuerpo' },
        h('span', { clase: 'insignia insignia--categoria' }, detalle.categoria),
        h('h2', { id: idTitulo }, detalle.titulo),
        h('p', { clase: 'tarjeta__meta' }, icono('calendario', 14), formatearFecha(detalle.fechaPublicacion)),
        detalle.parrafos.map((parrafo) => h('p', {}, parrafo)),
      ),
    ),
  );
}

/** Detalle de un evento (método consultarEvento del UML). */
export function abrirDetalleEvento(evento) {
  const detalle = evento.consultarEvento();
  abrirDialogo((idTitulo) =>
    h(
      'div',
      { clase: 'ficha ficha--texto' },
      h(
        'div',
        { clase: 'ficha__cuerpo' },
        h('span', { clase: 'insignia insignia--categoria' }, 'Evento'),
        h('h2', { id: idTitulo }, detalle.nombre),
        h('p', { clase: 'tarjeta__meta' }, icono('calendario', 14), formatearFecha(detalle.fecha)),
        h('p', { clase: 'tarjeta__meta' }, icono('ubicacion', 14), detalle.lugar),
        h('p', {}, detalle.descripcion),
      ),
    ),
  );
}
