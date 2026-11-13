/** Quita tildes y pasa a minúsculas para comparar textos sin distinguir acentos. */
export function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Filtra una lista por texto. Un elemento coincide si el texto aparece en
 * alguno de los campos indicados. Con texto vacío devuelve la lista completa.
 */
export function filtrarPorTexto(lista, texto, campos) {
  const consulta = normalizar(texto);
  if (consulta === '') return [...lista];
  return lista.filter((elemento) =>
    campos.some((campo) => normalizar(elemento[campo]).includes(consulta)),
  );
}
