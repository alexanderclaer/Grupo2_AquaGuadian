import { ORDENES_ANIMALES, OrganizadorLista } from '../servicios/estrategiasOrden.js';
import { filtrarPorTexto } from '../servicios/busqueda.js';
import { h } from '../utilidades/dom.js';
import { CajaBusqueda, EncabezadoSeccion, EstadoVacio, Pestanas, SelectorOrden } from './Controles.js';
import { abrirFichaAnimal } from './Fichas.js';
import { TarjetaAnimal } from './Tarjetas.js';

const FILTROS_ESTADO = [
  { valor: 'todos', etiqueta: 'Todos' },
  { valor: 'saludable', etiqueta: 'Saludables' },
  { valor: 'en-cuidado', etiqueta: 'En cuidado' },
];

/**
 * Sección de animales (clase "SeccionAnimales" del UML):
 * mostrarAnimales() -> listado con búsqueda, filtro por estado y orden;
 * seleccionarAnimal() -> abre la ficha del animal.
 */
export function crearSeccionAnimales(repositorio) {
  const animales = repositorio.obtenerAnimales();
  const organizador = new OrganizadorLista(ORDENES_ANIMALES[0]);
  const filtros = { texto: '', estado: 'todos' };

  const contador = h('p', { clase: 'contador', 'aria-live': 'polite' });
  const resultados = h('div');

  function actualizar() {
    let lista = filtrarPorTexto(animales, filtros.texto, ['nombre', 'especie', 'zona']);
    if (filtros.estado !== 'todos') lista = lista.filter((animal) => animal.estado === filtros.estado);
    lista = organizador.organizar(lista);

    contador.textContent = `${lista.length} ${lista.length === 1 ? 'animal' : 'animales'}`;
    resultados.replaceChildren(
      lista.length === 0
        ? EstadoVacio('No encontramos animales', 'Prueba con otro nombre o quita los filtros.')
        : h('div', { clase: 'rejilla' }, lista.map((animal) => TarjetaAnimal(animal, { alAbrir: abrirFichaAnimal }))),
    );
  }

  const seccion = h(
    'section',
    { clase: 'pagina', 'aria-labelledby': 'titulo-animales' },
    EncabezadoSeccion({
      etiqueta: 'Explora el parque',
      titulo: 'Nuestros animales',
      descripcion: 'Conoce a los habitantes del parque, su estado de salud y su historia.',
    }),
    h(
      'div',
      { clase: 'herramientas' },
      CajaBusqueda({
        etiqueta: 'Buscar animales',
        marcador: 'Buscar por nombre, especie o zona…',
        alCambiar: (texto) => {
          filtros.texto = texto;
          actualizar();
        },
      }),
      SelectorOrden({
        estrategias: ORDENES_ANIMALES,
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
        etiqueta: 'Filtrar por estado',
        opciones: FILTROS_ESTADO,
        valorInicial: 'todos',
        alCambiar: (estado) => {
          filtros.estado = estado;
          actualizar();
        },
      }),
      contador,
    ),
    resultados,
  );
  seccion.querySelector('h1').id = 'titulo-animales';
  actualizar();
  return seccion;
}
