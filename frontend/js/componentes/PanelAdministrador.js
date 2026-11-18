import { ETIQUETAS_ESTADO } from '../modelos/Animal.js';
import { h } from '../utilidades/dom.js';
import { formatearFecha } from '../utilidades/fechas.js';
import { EncabezadoSeccion, Pestanas } from './Controles.js';

const SECCIONES = {
  animal: {
    etiqueta: 'Animales',
    singular: 'animal',
    obtener: (repositorio) => repositorio.obtenerAnimales(),
    detalle: ({ especie, estado, zona }) => `${especie} · ${ETIQUETAS_ESTADO[estado]} · ${zona}`,
    campos: [
      ['nombre', 'Nombre'],
      ['especie', 'Especie'],
      ['edad', 'Edad en años', 'number'],
      ['estado', 'Estado de salud', 'select'],
      ['habitat', 'Hábitat'],
      ['zona', 'Zona del parque'],
      ['nivelConservacion', 'Nivel de conservación'],
      ['descripcion', 'Descripción', 'textarea'],
      ['situacionActual', 'Situación actual', 'textarea'],
      ['historia', 'Historia', 'textarea'],
    ],
  },
  evento: {
    etiqueta: 'Eventos',
    singular: 'evento',
    obtener: (repositorio) => repositorio.obtenerEventos(),
    detalle: ({ fecha, lugar }) => `${formatearFecha(fecha)} · ${lugar}`,
    campos: [
      ['nombre', 'Título'],
      ['fecha', 'Fecha', 'date'],
      ['lugar', 'Lugar'],
      ['descripcion', 'Descripción', 'textarea'],
    ],
  },
  noticia: {
    etiqueta: 'Noticias',
    singular: 'noticia',
    obtener: (repositorio) => repositorio.obtenerNoticias(),
    detalle: ({ fechaPublicacion, categoria }) => `${formatearFecha(fechaPublicacion)} · ${categoria}`,
    campos: [
      ['titulo', 'Título'],
      ['fechaPublicacion', 'Fecha de publicación', 'date'],
      ['categoria', 'Categoría'],
      ['resumen', 'Resumen', 'textarea'],
      ['contenido', 'Contenido', 'textarea'],
      ['destacada', 'Marcar como destacada', 'checkbox'],
    ],
  },
};

function Campo([nombre, etiqueta, tipo = 'text'], registro) {
  const valor = registro?.[nombre];
  const atributos = { name: nombre, required: true };
  if (tipo === 'checkbox') {
    return h('label', { clase: 'admin__casilla' },
      h('input', { name: nombre, type: tipo, checked: valor === true }), etiqueta);
  }
  let control;
  if (tipo === 'select') {
    control = h('select', atributos, Object.entries(ETIQUETAS_ESTADO).map(([id, texto]) =>
      h('option', { value: id, selected: id === valor }, texto)));
  } else if (tipo === 'textarea') {
    control = h('textarea', { ...atributos, rows: 3 });
    control.value = valor ?? '';
  } else {
    control = h('input', {
      ...atributos, type: tipo, value: valor,
      min: tipo === 'number' ? 0 : null, step: tipo === 'number' ? 1 : null,
    });
  }
  return h('label', { clase: tipo === 'textarea' ? 'admin__campo admin__ancho' : 'admin__campo' }, etiqueta, control);
}

export function crearPanelAdministrador(repositorio, puedeGestionar) {
  const contenido = h('div', { clase: 'admin__contenido' });
  const aviso = h('p', { clase: 'admin__mensaje', role: 'status' });
  const editor = h('div');
  let tipo = 'animal';

  function operar(accion, recibirError) {
    if (!puedeGestionar()) {
      recibirError('Inicia sesión con la cuenta administrativa de demostración para continuar.');
      return;
    }
    try {
      accion();
    } catch (error) {
      recibirError(error.message);
    }
  }

  function abrirEditor(seccion, registro, origen) {
    const mensaje = h('p', { clase: 'admin__mensaje admin__ancho', role: 'alert' });
    const edicion = h('form', {
      clase: 'admin__formulario', 'aria-labelledby': 'admin-editor-titulo',
      enSubmit: (evento) => {
        evento.preventDefault();
        mensaje.textContent = '';
        const valores = new FormData(edicion);
        const datos = Object.fromEntries(seccion.campos.map(([nombre, , formato]) => {
          if (formato === 'number') return [nombre, edicion.elements[nombre].valueAsNumber];
          if (formato === 'checkbox') return [nombre, valores.has(nombre)];
          return [nombre, valores.get(nombre)];
        }));
        operar(() => {
          repositorio.guardarContenido(tipo, datos, registro);
          mostrarLista(registro ? 'Cambios guardados.' : 'Registro creado.');
          contenido.querySelector('h2').focus();
        }, (error) => { mensaje.textContent = error; });
      },
    },
    h('h3', { id: 'admin-editor-titulo', clase: 'admin__ancho' }, `${registro ? 'Editar' : 'Agregar'} ${seccion.singular}`),
    seccion.campos.map((campo) => Campo(campo, registro)),
    h('div', { clase: 'admin__acciones admin__ancho' },
      h('button', { type: 'submit', clase: 'boton boton--primario' }, 'Guardar'),
      h('button', { type: 'button', clase: 'boton admin__secundario', enClick: () => {
        editor.replaceChildren();
        origen.focus();
      } }, 'Cancelar')),
    mensaje);
    aviso.textContent = '';
    editor.replaceChildren(edicion);
    edicion.querySelector('input').focus();
  }

  function mostrarLista(mensaje = '') {
    const seccion = SECCIONES[tipo];
    const registros = seccion.obtener(repositorio);
    const agregar = h('button', {
      type: 'button', clase: 'boton boton--primario',
      enClick: () => abrirEditor(seccion, null, agregar),
    }, `Agregar ${seccion.singular}`);
    const lista = h('ul', { clase: 'admin__lista' }, registros.map((registro) => {
      const titulo = registro.nombreVisible;
      const editar = h('button', {
        type: 'button', clase: 'boton admin__secundario', 'aria-label': `Editar ${titulo}`,
        enClick: () => abrirEditor(seccion, registro, editar),
      }, 'Editar');
      return h('li', { clase: 'admin__registro' },
        h('div', {}, h('h3', {}, titulo), h('p', {}, seccion.detalle(registro))),
        h('div', { clase: 'admin__acciones' }, editar,
          h('button', {
            type: 'button', clase: 'boton admin__eliminar', 'aria-label': `Eliminar ${titulo}`,
            enClick: () => {
              if (!window.confirm(`¿Eliminar «${titulo}» de este catálogo local?`)) return;
              operar(() => {
                repositorio.eliminarContenido(tipo, registro);
                mostrarLista('Registro eliminado.');
                contenido.querySelector('h2').focus();
              }, (error) => { aviso.textContent = error; });
            },
          }, 'Eliminar')));
    }));

    editor.replaceChildren();
    contenido.replaceChildren(
      h('div', { clase: 'admin__cabecera' },
        h('h2', { tabindex: -1 }, seccion.etiqueta), agregar),
      editor, registros.length ? lista : h('p', { clase: 'aviso' }, 'Esta sección aún no tiene registros.'),
    );
    aviso.textContent = mensaje;
  }

  const panel = h('section', { clase: 'pagina admin' },
    EncabezadoSeccion({
      etiqueta: 'Gestión del catálogo',
      titulo: 'Panel de administración',
      descripcion: 'Agrega, edita o elimina contenido del catálogo de este navegador.',
    }),
    h('p', { clase: 'aviso admin__aviso' },
      'El control de acceso es una simulación sin seguridad real. Los cambios se guardan únicamente en este navegador.'),
    Pestanas({
      etiqueta: 'Contenido para administrar',
      opciones: Object.entries(SECCIONES).map(([valor, { etiqueta }]) => ({ valor, etiqueta })),
      valorInicial: tipo,
      alCambiar: (seleccion) => {
        if (seleccion === tipo) return;
        tipo = seleccion;
        mostrarLista();
      },
    }),
    aviso, contenido);
  mostrarLista();
  return panel;
}
