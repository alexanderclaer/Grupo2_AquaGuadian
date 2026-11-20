/**
 * Animales favoritos de cada cuenta (simulación local).
 * Se guardan en localStorage como { "correo": [idAnimal, ...] }, así cada
 * cuenta del mismo navegador tiene su propia lista.
 */
const CLAVE_ALMACEN = 'aquaguardian.favoritos.v1';

export function crearFavoritos(obtenerAlmacen) {
  function leer() {
    try {
      const valor = JSON.parse(obtenerAlmacen().getItem(CLAVE_ALMACEN));
      return valor !== null && typeof valor === 'object' && !Array.isArray(valor) ? valor : {};
    } catch {
      return {};
    }
  }

  function listar(correo) {
    const lista = Object.hasOwn(leer(), correo) ? leer()[correo] : [];
    return Array.isArray(lista) ? lista.filter(Number.isSafeInteger) : [];
  }

  return {
    listar,
    esFavorito: (correo, idAnimal) => listar(correo).includes(idAnimal),
    /** Marca o desmarca un animal. Devuelve true si quedó como favorito. */
    alternar(correo, idAnimal) {
      if (!Number.isSafeInteger(idAnimal)) throw new Error('Animal no válido.');
      const todos = { ...leer() };
      const actuales = listar(correo);
      const activo = !actuales.includes(idAnimal);
      todos[correo] = activo ? [...actuales, idAnimal] : actuales.filter((id) => id !== idAnimal);
      try {
        obtenerAlmacen().setItem(CLAVE_ALMACEN, JSON.stringify(todos));
      } catch {
        throw new Error('El almacenamiento local no está disponible en este navegador.');
      }
      return activo;
    },
  };
}
