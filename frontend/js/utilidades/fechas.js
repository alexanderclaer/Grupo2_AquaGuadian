/** Fecha de hoy en formato AAAA-MM-DD (hora local). */
export function hoyISO(ahora = new Date()) {
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  return `${ahora.getFullYear()}-${mes}-${dia}`;
}

/** Convierte "2026-03-01" en "1 de marzo de 2026". */
export function formatearFecha(iso) {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Devuelve [día, mes abreviado] para mostrar en la insignia de un evento. */
export function partesFecha(iso) {
  const fecha = new Date(`${iso}T00:00:00Z`);
  const dia = new Intl.DateTimeFormat('es-CO', { day: 'numeric', timeZone: 'UTC' }).format(fecha);
  const mes = new Intl.DateTimeFormat('es-CO', { month: 'short', timeZone: 'UTC' })
    .format(fecha)
    .replace('.', '');
  return [dia, mes];
}

/** Indica si la fecha es hoy o posterior. Las fechas ISO se comparan como texto. */
export function esFechaVigente(iso, hoy = hoyISO()) {
  return iso >= hoy;
}
