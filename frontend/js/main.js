import { crearMenuPrincipal } from './componentes/MenuPrincipal.js';
import { crearPanelAdministrador } from './componentes/PanelAdministrador.js';
import { crearSeccionAcceso } from './componentes/SeccionAcceso.js';
import { crearSeccionAnimales } from './componentes/SeccionAnimales.js';
import { crearSeccionInicio } from './componentes/SeccionInicio.js';
import { crearSeccionNoticiasEventos } from './componentes/SeccionNoticiasEventos.js';
import { CONFIG } from './config.js';
import { crearAccesoDemo } from './servicios/accesoDemo.js';
import { DATOS_INICIALES } from './servicios/datosIniciales.js';
import { resolverVista } from './servicios/navegacion.js';
import { RepositorioContenido } from './servicios/RepositorioContenido.js';
import { h } from './utilidades/dom.js';

const contenedor = document.getElementById('contenido');
const zonaMenu = document.getElementById('zona-menu');

// El salto al contenido no debe cambiar la ruta reservada para las vistas.
document.querySelector('.saltar').addEventListener('click', (evento) => {
  evento.preventDefault();
  contenedor.focus();
  contenedor.scrollIntoView();
});

function mostrarError(mensaje) {
  contenedor.replaceChildren(
    h('div', { clase: 'pagina' }, h('p', { clase: 'aviso aviso--error', role: 'alert' }, mensaje)),
  );
}

function iniciar() {
  const repositorio = RepositorioContenido.obtenerInstancia();
  try {
    repositorio.cargar(DATOS_INICIALES, () => window.localStorage);
  } catch (error) {
    console.error(error);
    mostrarError('No pudimos cargar el contenido del parque. Intenta recargar la página.');
    return;
  }

  // Los registros inválidos se omiten; se informan en consola para el equipo.
  repositorio.obtenerErroresCarga().forEach((detalle) => console.warn(`[contenido omitido] ${detalle}`));

  const acceso = crearAccesoDemo(() => window.localStorage);
  let menu;
  let sesionMostrada;

  function cambiarVista(id, mensaje) {
    history.replaceState(null, '', `#${id}`);
    mostrarVista(mensaje);
  }

  const vistas = {
    inicio: () => crearSeccionInicio(repositorio),
    animales: () => crearSeccionAnimales(repositorio),
    'noticias-eventos': () => crearSeccionNoticiasEventos(repositorio),
    administracion: () => crearPanelAdministrador(repositorio, () => acceso.obtenerSesion()?.rol === 'admin'),
  };

  function mostrarVista(mensaje) {
    const sesion = acceso.obtenerSesion();
    const opciones = { accesoDemo: true, sesion, esAdministrador: sesion?.rol === 'admin' };
    if (!menu || sesionMostrada?.rol !== sesion?.rol) {
      menu = crearMenuPrincipal({ ...CONFIG, ...opciones });
      zonaMenu.replaceChildren(menu.elemento);
    }
    sesionMostrada = sesion;
    const id = resolverVista(window.location.hash, opciones);
    // Si la URL pedía algo no permitido, corregimos el hash sin recargar.
    if (window.location.hash !== `#${id}` && window.location.hash !== '') {
      history.replaceState(null, '', `#${id}`);
    }
    if (id === 'acceso' || id === 'registro') {
      const vista = crearSeccionAcceso({ acceso, sesion, registro: id === 'registro', alCambiarSesion: cambiarVista });
      contenedor.replaceChildren(vista.elemento);
      if (mensaje) vista.mostrarMensaje(mensaje);
    } else {
      contenedor.replaceChildren(vistas[id]());
    }
    menu.marcarActiva(id === 'registro' ? 'acceso' : id);
    document.title = `${CONFIG.nombreApp} · ${document.querySelector('h1')?.textContent ?? ''}`.trim();
    window.scrollTo({ top: 0 });
    contenedor.focus({ preventScroll: true });
  }

  window.addEventListener('hashchange', () => mostrarVista());
  window.addEventListener('storage', (evento) => {
    if (acceso.esCambioDeSesion(evento) && acceso.obtenerSesion()?.correo !== sesionMostrada?.correo) {
      mostrarVista();
    }
  });
  mostrarVista();
}

iniciar();
