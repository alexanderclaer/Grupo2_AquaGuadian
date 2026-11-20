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
export function crearSeccionAnimales(repositorio, { sesion = null, favoritos = null } = {}) {
  const animales = repositorio.obtenerAnimales();
  const conFavoritos = Boolean(sesion && favoritos);
  const opcionesEstado = conFavoritos
    ? [...FILTROS_ESTADO, { valor: 'favoritos', etiqueta: 'Mis favoritos' }]
    : FILTROS_ESTADO;
  const organizador = new OrganizadorLista(ORDENES_ANIMALES[0]);
  const filtros = { texto: '', estado: 'todos' };

  const contador = h('p', { clase: 'contador', 'aria-live': 'polite' });
  const resultados = h('div', { tabindex: -1 });
  const mensaje = h('p', { clase: 'aviso aviso--error', role: 'alert', hidden: true });

  function favoritoDe(animal) {
    return {
      activo: favoritos.esFavorito(sesion.correo, animal.idAnimal),
      alternar: () => {
        mensaje.hidden = true;
        try {
          const activo = favoritos.alternar(sesion.correo, animal.idAnimal);
          // En "Mis favoritos", al quitar un animal debe desaparecer de la lista.
          if (filtros.estado === 'favoritos') {
            actualizar();
            resultados.focus();
          }
          return activo;
        } catch (error) {
          mensaje.textContent = error.message;
          mensaje.hidden = false;
          return favoritos.esFavorito(sesion.correo, animal.idAnimal);
        }
      },
    };
  }

  function actualizar() {
    let lista = filtrarPorTexto(animales, filtros.texto, ['nombre', 'especie', 'zona']);
    if (filtros.estado === 'favoritos') {
      lista = lista.filter((animal) => favoritos.esFavorito(sesion.correo, animal.idAnimal));
    } else if (filtros.estado !== 'todos') {
      lista = lista.filter((animal) => animal.estado === filtros.estado);
    }
    lista = organizador.organizar(lista);

    contador.textContent = `${lista.length} ${lista.length === 1 ? 'animal' : 'animales'}`;
    resultados.replaceChildren(
      lista.length === 0
        ? (filtros.estado === 'favoritos' && !filtros.texto
          ? EstadoVacio('Aún no tienes favoritos', 'Toca el corazón de un animal para guardarlo aquí.')
          : EstadoVacio('No encontramos animales', 'Prueba con otro nombre o quita los filtros.'))
        : h('div', { clase: 'rejilla' }, lista.map((animal) => TarjetaAnimal(animal, {
          alAbrir: abrirFichaAnimal,
          favorito: conFavoritos ? favoritoDe(animal) : null,
        }))),
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
        opciones: opcionesEstado,
        valorInicial: 'todos',
        alCambiar: (estado) => {
          filtros.estado = estado;
          actualizar();
        },
      }),
      contador,
    ),
    mensaje,
    resultados,
  );
  seccion.querySelector('h1').id = 'titulo-animales';
  actualizar();
  return seccion;
}
