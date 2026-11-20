/**
 * Vistas del menú principal (clase "MenuPrincipal" del UML).
 * La vista "administracion" está reservada al rol administrador.
 */
export const VISTAS = Object.freeze([
  { id: 'inicio', etiqueta: 'Inicio', icono: 'olas' },
  { id: 'animales', etiqueta: 'Animales', icono: 'pez' },
  { id: 'noticias-eventos', etiqueta: 'Noticias y eventos', icono: 'periodico' },
  { id: 'administracion', etiqueta: 'Administración', icono: 'escudo', soloAdministrador: true },
]);

export const VISTA_INICIAL = 'inicio';
const VISTA_ACCESO = { id: 'acceso', etiqueta: 'Iniciar sesión', icono: 'escudo' };

/**
 * Decide qué vista mostrar a partir del hash de la URL (por ejemplo "#animales").
 * Si el hash no existe, o la vista es de administrador y el usuario no lo es,
 * vuelve al inicio.
 */
export function resolverVista(hash, { esAdministrador = false, accesoDemo = false, sesion = null } = {}) {
  const id = String(hash ?? '').replace(/^#/, '');
  if (accesoDemo && id === 'acceso') return id;
  if (accesoDemo && id === 'registro') return sesion ? 'acceso' : id;
  const vista = VISTAS.find((candidata) => candidata.id === id);
  if (!vista) return VISTA_INICIAL;
  if (vista.soloAdministrador && !esAdministrador) return VISTA_INICIAL;
  return vista.id;
}

/** Vistas que aparecen en el menú según el rol. */
export function vistasVisibles({ esAdministrador = false, accesoDemo = false, sesion = null } = {}) {
  const vistas = VISTAS.filter((vista) => !vista.soloAdministrador || esAdministrador);
  if (accesoDemo) vistas.push(sesion ? { ...VISTA_ACCESO, etiqueta: 'Mi cuenta' } : VISTA_ACCESO);
  return vistas;
}

/** Texto del saludo del menú: "Hola, Ana". Vacío si no hay sesión. */
export function textoSaludo(sesion) {
  if (!sesion) return '';
  if (sesion.rol === 'admin') return 'Hola, administrador';
  const primerNombre = String(sesion.nombre ?? '').trim().split(/\s+/)[0];
  return primerNombre ? `Hola, ${primerNombre}` : 'Hola';
}
