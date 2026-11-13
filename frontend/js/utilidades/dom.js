/**
 * Utilidades para construir elementos del DOM sin usar innerHTML con datos del
 * contenido. Todo texto se inserta como nodo de texto, por lo que no se puede
 * inyectar HTML desde los datos.
 */

/**
 * Crea un elemento.
 *  - clase: asigna className
 *  - enClick, enInput, ...: registra el evento correspondiente
 *  - cualquier otra propiedad se asigna como atributo
 */
export function h(etiqueta, propiedades = {}, ...hijos) {
  const elemento = document.createElement(etiqueta);
  for (const [nombre, valor] of Object.entries(propiedades ?? {})) {
    if (valor === null || valor === undefined || valor === false) continue;
    if (nombre === 'clase') {
      elemento.className = valor;
    } else if (nombre.startsWith('en') && typeof valor === 'function') {
      elemento.addEventListener(nombre.slice(2).toLowerCase(), valor);
    } else {
      elemento.setAttribute(nombre, valor === true ? '' : String(valor));
    }
  }
  agregarHijos(elemento, hijos);
  return elemento;
}

function agregarHijos(elemento, hijos) {
  for (const hijo of hijos.flat(Infinity)) {
    if (hijo === null || hijo === undefined || hijo === false) continue;
    elemento.append(hijo instanceof Node ? hijo : document.createTextNode(String(hijo)));
  }
}

/** Primera letra de cada una de las dos primeras palabras: "Tiburón Martillo" -> "TM". */
export function iniciales(texto) {
  return texto
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0].toUpperCase())
    .join('');
}
