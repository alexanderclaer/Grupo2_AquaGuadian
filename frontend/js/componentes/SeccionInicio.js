import { h, iniciales } from '../utilidades/dom.js';
import { icono } from '../utilidades/iconos.js';
import { ORDENES_PUBLICACIONES, OrganizadorLista } from '../servicios/estrategiasOrden.js';
import { abrirDetalleNoticia, abrirFichaAnimal } from './Fichas.js';
import { TarjetaAnimal, TarjetaNoticia } from './Tarjetas.js';

function Hero(animales) {
  return h(
    'section',
    { clase: 'hero', 'aria-labelledby': 'titulo-inicio' },
    h(
      'div',
      { clase: 'hero__contenido' },
      h('span', { clase: 'chip-hero' }, 'Parque Marino Nacional · Colombia'),
      h('h1', { id: 'titulo-inicio' }, h('span', { clase: 'hero__logo' }, icono('olas', 30)), 'AQUAGUARDIAN'),
      h('p', { clase: 'hero__lema' }, 'Guardianes de la vida marina'),
      h('p', { clase: 'hero__texto' }, 'Conoce a los animales del parque, entérate de sus historias y descubre cómo podemos proteger el océano entre todos.'),
      h(
        'div',
        { clase: 'hero__acciones' },
        h('a', { clase: 'boton boton--claro', href: '#animales' }, icono('pez', 18), 'Ver animales'),
        h('a', { clase: 'boton boton--contorno', href: '#noticias-eventos' }, icono('periodico', 18), 'Noticias y eventos'),
      ),
      h(
        'div',
        { clase: 'hero__animales' },
        h('p', { clase: 'hero__animales-titulo' }, `Nuestros ${animales.length} animales`),
        h(
          'ul',
          { clase: 'hero__lista' },
          animales.map((animal) =>
            h('li', {}, h('a', { href: '#animales', clase: 'mini-animal', 'aria-label': `${animal.nombre}, ${animal.especie}` }, h('span', { clase: 'mini-animal__circulo', 'aria-hidden': 'true' }, iniciales(animal.especie)), h('span', { clase: 'mini-animal__nombre' }, animal.nombre))),
          ),
        ),
      ),
    ),
    h('div', { clase: 'franja', 'aria-hidden': 'true' }),
  );
}

function Estadisticas(estadisticas) {
  const datos = [
    ['pez', estadisticas.totalAnimales, 'Especies en el parque', 'fauna marina'],
    ['check', estadisticas.animalesSaludables, 'Animales saludables', 'estado óptimo'],
    ['periodico', estadisticas.totalNoticias, 'Noticias publicadas', 'novedades del parque'],
    ['calendario', estadisticas.eventosProximos, 'Eventos próximos', 'actividades por venir'],
  ];
  return h(
    'section',
    { clase: 'bloque', 'aria-labelledby': 'titulo-numeros' },
    h('h2', { clase: 'bloque__titulo', id: 'titulo-numeros' }, 'El parque en números'),
    h(
      'div',
      { clase: 'estadisticas' },
      datos.map(([nombreIcono, valor, etiqueta, nota]) =>
        h('div', { clase: 'estadistica' }, h('span', { clase: 'icono-caja' }, icono(nombreIcono, 20)), h('p', { clase: 'estadistica__valor' }, String(valor)), h('p', { clase: 'estadistica__etiqueta' }, etiqueta), h('p', { clase: 'estadistica__nota' }, nota)),
      ),
    ),
  );
}

function Secciones() {
  const enlaces = [
    ['pez', 'Nuestros animales', 'Fichas con la historia, el hábitat y el estado de salud de cada habitante.', '#animales'],
    ['periodico', 'Noticias y eventos', 'Rescates, nacimientos y actividades educativas del parque al día.', '#noticias-eventos'],
  ];
  return h(
    'section',
    { clase: 'bloque', 'aria-labelledby': 'titulo-secciones' },
    h('h2', { clase: 'bloque__titulo', id: 'titulo-secciones' }, 'Secciones del parque'),
    h(
      'div',
      { clase: 'rejilla rejilla--dos' },
      enlaces.map(([nombreIcono, titulo, texto, destino]) =>
        h('a', { clase: 'acceso', href: destino }, h('span', { clase: 'icono-caja' }, icono(nombreIcono, 24)), h('span', { clase: 'acceso__cuerpo' }, h('span', { clase: 'tarjeta__titulo' }, titulo), h('span', { clase: 'tarjeta__texto' }, texto), h('span', { clase: 'enlace-accion' }, 'Explorar', icono('flecha', 16)))),
      ),
    ),
  );
}

function VistaPrevia({ id, titulo, enlace, textoEnlace, tarjetas }) {
  return h(
    'section',
    { clase: 'bloque', 'aria-labelledby': id },
    h('div', { clase: 'bloque__cabecera' }, h('h2', { clase: 'bloque__titulo', id }, titulo), h('a', { clase: 'enlace-accion', href: enlace }, textoEnlace, icono('flecha', 16))),
    h('div', { clase: 'rejilla' }, tarjetas),
  );
}

function Mision() {
  return h(
    'section',
    { clase: 'mision', 'aria-labelledby': 'titulo-mision' },
    h('span', { clase: 'icono-caja icono-caja--claro' }, icono('escudo', 24)),
    h(
      'div',
      {},
      h('h2', { id: 'titulo-mision' }, 'Nuestra misión'),
      h('p', {}, 'Rescatar, rehabilitar y proteger la vida marina, y enseñar a la comunidad por qué cuidar el océano es cuidar nuestro futuro.'),
    ),
    h('a', { clase: 'boton boton--amarillo', href: '#noticias-eventos' }, icono('hoja', 18), 'Conoce las actividades'),
  );
}

/** Vista de inicio: presentación del parque con accesos y vistas previas. */
export function crearSeccionInicio(repositorio) {
  const animales = repositorio.obtenerAnimales();
  const ultimasNoticias = new OrganizadorLista(ORDENES_PUBLICACIONES[0]).organizar(repositorio.obtenerNoticias()).slice(0, 3);

  return h(
    'div',
    { clase: 'inicio' },
    Hero(animales),
    h(
      'div',
      { clase: 'contenedor' },
      Estadisticas(repositorio.calcularEstadisticas()),
      Secciones(),
      VistaPrevia({
        id: 'titulo-animales-prev',
        titulo: 'Conoce a algunos habitantes',
        enlace: '#animales',
        textoEnlace: 'Ver todos',
        tarjetas: animales.slice(0, 3).map((animal) => TarjetaAnimal(animal, { alAbrir: abrirFichaAnimal })),
      }),
      VistaPrevia({
        id: 'titulo-noticias-prev',
        titulo: 'Últimas noticias',
        enlace: '#noticias-eventos',
        textoEnlace: 'Ver todas',
        tarjetas: ultimasNoticias.map((noticia) => TarjetaNoticia(noticia, { alAbrir: abrirDetalleNoticia })),
      }),
      Mision(),
    ),
  );
}
