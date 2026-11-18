import { ORDENES_PUBLICACIONES, OrganizadorLista } from '../servicios/estrategiasOrden.js';
import { filtrarPorTexto } from '../servicios/busqueda.js';
import { h } from '../utilidades/dom.js';
import { hoyISO } from '../utilidades/fechas.js';
import { CajaBusqueda, EncabezadoSeccion, EstadoVacio, Pestanas, SelectorOrden } from './Controles.js';
import { abrirDetalleEvento, abrirDetalleNoticia } from './Fichas.js';
import { TarjetaEvento, TarjetaNoticia } from './Tarjetas.js';

const [ORDEN_RECIENTES, ORDEN_ANTIGUAS] = ORDENES_PUBLICACIONES;

function panelNoticias(repositorio) {
  const noticias = repositorio.obtenerNoticias();
  const categorias = [...new Set(noticias.map((noticia) => noticia.categoria))].sort((a, b) => a.localeCompare(b, 'es'));
  const organizador = new OrganizadorLista(ORDEN_RECIENTES);
  const filtros = { texto: '', categoria: null };
  const resultados = h('div');
  const contador = h('p', { clase: 'contador', 'aria-live': 'polite' });

  function actualizar() {
    let lista = filtrarPorTexto(noticias, filtros.texto, ['titulo', 'resumen', 'categoria']);
    if (filtros.categoria !== null) lista = lista.filter((noticia) => noticia.categoria === filtros.categoria);
    lista = organizador.organizar(lista);
    contador.textContent = `${lista.length} ${lista.length === 1 ? 'noticia' : 'noticias'}`;
    resultados.replaceChildren(
      lista.length === 0
        ? EstadoVacio('No encontramos noticias', 'Prueba con otra palabra o elige otra categoría.')
        : h('div', { clase: 'rejilla' }, lista.map((noticia) => TarjetaNoticia(noticia, { alAbrir: abrirDetalleNoticia }))),
    );
  }

  const panel = h(
    'div',
    {},
    h(
      'div',
      { clase: 'herramientas' },
      CajaBusqueda({
        etiqueta: 'Buscar noticias',
        marcador: 'Buscar por título o categoría…',
        alCambiar: (texto) => {
          filtros.texto = texto;
          actualizar();
        },
      }),
      SelectorOrden({
        estrategias: ORDENES_PUBLICACIONES,
        alCambiar: (estrategia) => {
          organizador.establecerEstrategia(estrategia);
          actualizar();
        },
      }),
    ),
    h(
      'div',
      { clase: 'herramientas herramientas--fila' },
      Pestanas({
        etiqueta: 'Filtrar por categoría',
        opciones: [{ valor: null, etiqueta: 'Todas las categorías' }, ...categorias.map((c) => ({ valor: c, etiqueta: c }))],
        valorInicial: null,
        alCambiar: (categoria) => {
          filtros.categoria = categoria;
          actualizar();
        },
      }),
      contador,
    ),
    resultados,
  );
  actualizar();
  return panel;
}

function panelEventos(repositorio) {
  const eventos = repositorio.obtenerEventos();
  const hoy = hoyISO();
  // Para eventos conviene ver primero los más cercanos en el tiempo.
  const organizador = new OrganizadorLista(ORDEN_ANTIGUAS);
  const filtros = { texto: '' };
  const resultados = h('div');
  const contador = h('p', { clase: 'contador', 'aria-live': 'polite' });

  function actualizar() {
    const lista = organizador.organizar(filtrarPorTexto(eventos, filtros.texto, ['nombre', 'descripcion', 'lugar']));
    contador.textContent = `${lista.length} ${lista.length === 1 ? 'evento' : 'eventos'}`;
    resultados.replaceChildren(
      lista.length === 0
        ? EstadoVacio('No encontramos eventos', 'Prueba con otra palabra.')
        : h('div', { clase: 'lista-eventos' }, lista.map((evento) => TarjetaEvento(evento, { alAbrir: abrirDetalleEvento, hoy }))),
    );
  }

  const panel = h(
    'div',
    {},
    h(
      'div',
      { clase: 'herramientas' },
      CajaBusqueda({
        etiqueta: 'Buscar eventos',
        marcador: 'Buscar por nombre o lugar…',
        alCambiar: (texto) => {
          filtros.texto = texto;
          actualizar();
        },
      }),
      SelectorOrden({
        estrategias: ORDENES_PUBLICACIONES,
        inicial: ORDEN_ANTIGUAS,
        alCambiar: (estrategia) => {
          organizador.establecerEstrategia(estrategia);
          actualizar();
        },
      }),
    ),
    h('div', { clase: 'herramientas herramientas--fila' }, contador),
    resultados,
  );
  actualizar();
  return panel;
}

/**
 * Sección de noticias y eventos (clase "SeccionNoticiasEventos" del UML):
 * mostrarNoticias() / mostrarEventos() -> dos paneles alternables;
 * seleccionarNoticia() / seleccionarEvento() -> abren el detalle.
 */
export function crearSeccionNoticiasEventos(repositorio) {
  const contenedor = h('div');
  const paneles = { noticias: panelNoticias(repositorio), eventos: panelEventos(repositorio) };
  const mostrar = (cual) => contenedor.replaceChildren(paneles[cual]);

  const seccion = h(
    'section',
    { clase: 'pagina', 'aria-labelledby': 'titulo-noticias' },
    EncabezadoSeccion({
      etiqueta: 'Actualidad marina',
      titulo: 'Noticias y eventos',
      descripcion: 'Entérate de lo que pasa en el parque y de las actividades para cuidar el océano.',
    }),
    h(
      'div',
      { clase: 'conmutador' },
      Pestanas({
        etiqueta: 'Tipo de contenido',
        opciones: [
          { valor: 'noticias', etiqueta: 'Noticias' },
          { valor: 'eventos', etiqueta: 'Eventos' },
        ],
        valorInicial: 'noticias',
        alCambiar: mostrar,
      }),
    ),
    contenedor,
  );
  seccion.querySelector('h1').id = 'titulo-noticias';
  mostrar('noticias');
  return seccion;
}
