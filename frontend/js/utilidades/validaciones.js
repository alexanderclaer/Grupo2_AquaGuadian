import { ErrorValidacion } from './errores.js';

/** Exige un texto no vacío y devuelve el texto sin espacios sobrantes. */
export function requerirTexto(valor, campo) {
  if (typeof valor !== 'string' || valor.trim() === '') {
    throw new ErrorValidacion(`El campo "${campo}" es obligatorio.`);
  }
  return valor.trim();
}

/** Exige un entero mayor o igual a cero. */
export function requerirEnteroNoNegativo(valor, campo) {
  if (!Number.isInteger(valor) || valor < 0) {
    throw new ErrorValidacion(`El campo "${campo}" debe ser un entero mayor o igual a 0.`);
  }
  return valor;
}

/** Exige una fecha con formato AAAA-MM-DD que exista en el calendario. */
export function requerirFechaISO(valor, campo) {
  const formatoValido = typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor);
  if (!formatoValido || Number.isNaN(Date.parse(`${valor}T00:00:00Z`))) {
    throw new ErrorValidacion(`El campo "${campo}" debe tener formato AAAA-MM-DD.`);
  }
  const [anio, mes, dia] = valor.split('-').map(Number);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  if (fecha.getUTCMonth() !== mes - 1 || fecha.getUTCDate() !== dia) {
    throw new ErrorValidacion(`El campo "${campo}" no es una fecha real.`);
  }
  return valor;
}

/** Exige que el valor sea uno de los permitidos. */
export function requerirOpcion(valor, opciones, campo) {
  if (!opciones.includes(valor)) {
    throw new ErrorValidacion(`El campo "${campo}" debe ser uno de: ${opciones.join(', ')}.`);
  }
  return valor;
}
