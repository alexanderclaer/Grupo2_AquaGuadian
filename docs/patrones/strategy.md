# Patrón Strategy

**Archivo:** `frontend/js/servicios/estrategiasOrden.js`
**Pruebas:** `tests/strategy.test.js`

## Problema que resuelve
Las listas de animales, noticias y eventos se pueden ordenar de distintas formas (por nombre, por fecha, por edad) y el usuario cambia el criterio mientras usa la página. Con condicionales (`if orden === 'nombre' ...`) en cada vista el código se duplicaría y crecería con cada criterio nuevo.

## Por qué se eligió
Cada criterio de orden es un algoritmo intercambiable con la misma interfaz. Strategy permite elegirlo en tiempo de ejecución desde un selector. Está previsto en la documentación inicial ("búsqueda y ordenamiento por nombre o fecha").

## Cómo se aplica
- `EstrategiaOrden` define la interfaz: `id`, `etiqueta` y `ordenar(lista)`.
- Estrategias concretas: `OrdenAlfabetico`, `OrdenFechaReciente`, `OrdenFechaAntigua` y `OrdenEdadAscendente`.
- `OrganizadorLista` es el **contexto**: guarda la estrategia activa (`establecerEstrategia`) y la aplica con `organizar(lista)`.
- Cada selector "Ordenar por" de la interfaz se llena con las estrategias disponibles de su sección (`ORDENES_ANIMALES`, `ORDENES_PUBLICACIONES`) y, al cambiar, reemplaza la estrategia del contexto.
- Las estrategias devuelven una lista nueva y nunca modifican la original.

## Componentes involucrados
`EstrategiaOrden` y sus subclases · `OrganizadorLista` (contexto) · `SeccionAnimales`, `SeccionNoticiasEventos`, `SeccionInicio` (clientes) · `SelectorOrden` (componente de interfaz).

## Beneficios
- Agregar un criterio nuevo es agregar una clase, sin tocar las vistas.
- Elimina condicionales repetidos.
- Cada algoritmo se prueba por separado.
