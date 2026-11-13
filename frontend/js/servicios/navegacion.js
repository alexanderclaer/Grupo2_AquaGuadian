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

/**
 * Decide qué vista mostrar a partir del hash de la URL (por ejemplo "#animales").
 * Si el hash no existe, o la vista es de administrador y el usuario no lo es,
 * vuelve al inicio.
 */
export function resolverVista(hash, { esAdministrador = false } = {}) {
  const id = String(hash ?? '').replace(/^#/, '');
  const vista = VISTAS.find((candidata) => candidata.id === id);
  if (!vista) return VISTA_INICIAL;
  if (vista.soloAdministrador && !esAdministrador) return VISTA_INICIAL;
  return vista.id;
}

/** Vistas que aparecen en el menú según el rol. */
export function vistasVisibles({ esAdministrador = false } = {}) {
  return VISTAS.filter((vista) => !vista.soloAdministrador || esAdministrador);
}
