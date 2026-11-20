import { ETIQUETAS_ESTADO } from '../modelos/Animal.js';
import { h } from '../utilidades/dom.js';
import { esFechaVigente, formatearFecha, partesFecha } from '../utilidades/fechas.js';
import { icono } from '../utilidades/iconos.js';
import { MarcadorAnimal, MarcadorEvento, MarcadorNoticia } from './Marcador.js';

export function InsigniaEstado(estado) {
  return h('span', { clase: `insignia insignia--${estado}` }, ETIQUETAS_ESTADO[estado]);
}

/**
 * Botón de corazón para marcar un animal como favorito.
 * favorito = { activo, alternar() }: alternar() devuelve el nuevo estado.
 */
function BotonFavorito(animal, favorito) {
  const boton = h('button', {
    type: 'button',
    clase: 'favorito',
    'aria-pressed': String(favorito.activo),
    'aria-label': `Favorito: ${animal.nombre}`,
    title: 'Marcar como favorito',
    enClick: () => boton.setAttribute('aria-pressed', String(favorito.alternar())),
  }, icono('corazon', 18));
  return boton;
}

/**
 * Tarjeta de un animal. alAbrir(animal) se llama al hacer clic.
 * Si se recibe "favorito" (solo con sesión iniciada), se muestra el corazón.
 */
export function TarjetaAnimal(animal, { alAbrir, favorito = null }) {
  const verFicha = h(
    'button',
    { type: 'button', clase: 'enlace-accion', enClick: () => alAbrir(animal), 'aria-label': `Ver ficha de ${animal.nombre}` },
    'Ver ficha',
    icono('flecha', 16),
  );
  return h(
    'article',
    { clase: 'tarjeta' },
    MarcadorAnimal(animal),
    h(
      'div',
      { clase: 'tarjeta__cuerpo' },
      h('div', { clase: 'tarjeta__fila' }, h('h3', { clase: 'tarjeta__titulo' }, animal.nombre), InsigniaEstado(animal.estado)),
      h('p', { clase: 'tarjeta__subtitulo' }, `${animal.especie} · ${animal.edad} ${animal.edad === 1 ? 'año' : 'años'}`),
      h('p', { clase: 'tarjeta__texto' }, animal.descripcion),
      favorito
        ? h('div', { clase: 'tarjeta__acciones' }, verFicha, BotonFavorito(animal, favorito))
        : verFicha,
    ),
  );
}

/** Tarjeta de una noticia. */
export function TarjetaNoticia(noticia, { alAbrir }) {
  return h(
    'article',
    { clase: `tarjeta${noticia.destacada ? ' tarjeta--destacada' : ''}` },
    MarcadorNoticia(noticia),
    h(
      'div',
      { clase: 'tarjeta__cuerpo' },
      h('span', { clase: 'insignia insignia--categoria' }, noticia.categoria),
      h('h3', { clase: 'tarjeta__titulo' }, noticia.titulo),
      h('p', { clase: 'tarjeta__texto' }, noticia.resumen),
      h('p', { clase: 'tarjeta__meta' }, icono('calendario', 14), formatearFecha(noticia.fechaPublicacion)),
      h(
        'button',
        { type: 'button', clase: 'enlace-accion', enClick: () => alAbrir(noticia), 'aria-label': `Leer: ${noticia.titulo}` },
        'Leer noticia',
        icono('flecha', 16),
      ),
    ),
  );
}

/** Tarjeta de un evento, con la fecha en una insignia a la izquierda. */
export function TarjetaEvento(evento, { alAbrir, hoy }) {
  const [dia, mes] = partesFecha(evento.fecha);
  const vigente = esFechaVigente(evento.fecha, hoy);
  return h(
    'article',
    { clase: `evento${vigente ? '' : ' evento--pasado'}` },
    MarcadorEvento(evento),
    h('div', { clase: 'evento__fecha', 'aria-hidden': 'true' }, h('span', { clase: 'evento__dia' }, dia), h('span', { clase: 'evento__mes' }, mes)),
    h(
      'div',
      { clase: 'evento__cuerpo' },
      h('span', { clase: `insignia ${vigente ? 'insignia--proximo' : 'insignia--finalizado'}` }, vigente ? 'Próximo' : 'Finalizado'),
      h('h3', { clase: 'tarjeta__titulo' }, evento.nombre),
      h('p', { clase: 'tarjeta__texto' }, evento.descripcion),
      h('p', { clase: 'tarjeta__meta' }, icono('ubicacion', 14), `${formatearFecha(evento.fecha)} · ${evento.lugar}`),
      h(
        'button',
        { type: 'button', clase: 'enlace-accion', enClick: () => alAbrir(evento), 'aria-label': `Ver detalle de ${evento.nombre}` },
        'Ver detalle',
        icono('flecha', 16),
      ),
    ),
  );
}
