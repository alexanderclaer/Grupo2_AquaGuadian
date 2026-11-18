# Pruebas finales de AquaGuardian

Validaciones del **18 de noviembre de 2026**, en Windows con Node.js v24.21.0. La revisión de navegador se ejecutó en Microsoft Edge headless con un servidor HTTP temporal que sirvió la carpeta `frontend`.

## Resultados del acceso de demostración

| Validación | Resultado |
|---|---|
| `npm test` | 35 aprobadas: 29 del catálogo inicial y 6 del acceso simulado. |
| `node --check` | 34 archivos JavaScript comprobados sin errores. |
| Acceso simulado | Registro, inicio y cierre de sesión, persistencia al recargar y acceso a Administración según el rol. |

## Resultados del catálogo inicial

| Validación | Ejecución | Resultado |
|---|---|---|
| Suite automatizada | `npm test` (invocado como `npm.cmd test` en PowerShell) | 29 aprobadas, 0 fallidas. |
| Sintaxis | `node --check` sobre los archivos JavaScript de `frontend` y `tests` | 31 archivos comprobados sin errores. |
| Factory Method | Comprobar con Node los tipos `constructor`, `toString` y `__proto__` | Los 3 devolvieron `ErrorValidacion`. |
| Navegación y diseño adaptable | Abrir Inicio, Animales y Noticias y eventos a 1440, 800, 390 y 320 px en Edge | Las tres vistas cargaron sin desbordamiento horizontal. El menú móvil se cerró al seleccionar una vista, incluida la activa. «Saltar al contenido» conservó la ruta y trasladó el foco. |
| Acceso público | Visitar `#administracion` y un hash inexistente | Ambas rutas volvieron a Inicio. El menú público no mostró Administración. |
| Animales | Cargar el catálogo, ordenar por edad, filtrar «En cuidado», buscar «Marina» y abrir la ficha | Cargaron 6 tarjetas. Luna apareció primero por edad. El filtro dejó 2 resultados y la búsqueda dejó 1. La ficha abrió con la fotografía y su texto alternativo. |
| Noticias | Ordenar por fecha antigua, filtrar «Rescate», buscar «Marina» y abrir la publicación | La noticia sobre Simba apareció primero en el orden ascendente. El filtro dejó 2 resultados y la búsqueda dejó 1. El detalle abrió. |
| Eventos | Cambiar a Eventos, buscar «Sala educativa» y abrir el detalle | Cargaron 4 eventos. La búsqueda dejó 1 y el detalle abrió. |
| Recursos y consola | Decodificar las seis fotos, pedir el favicon y simular una imagen ausente | Las 6 fotos cargaron. El favicon devolvió HTTP 200 con tipo SVG. El marcador se mostró ante el 404 inducido y no hubo otros errores HTTP ni errores de consola en los recorridos probados. |
| Créditos | Inspeccionar los pies de foto y abrir las páginas de origen y de licencias | Los 6 créditos mostraron el punto medio y expusieron 10 destinos distintos. Se resolvieron las 6 fichas de origen de Wikimedia Commons y los 4 destinos de Creative Commons. |
| Comprobaciones adicionales en Edge | Probar los dos botones de Inicio, cerrar la ficha con Escape y ordenar eventos por fecha reciente | Los botones abrieron sus vistas. Escape cerró la ficha y devolvió el foco al botón. Día Mundial de los Océanos apareció primero. |

## Reproducción

Ejecutar `npm test` desde la raíz. Servir el frontend según las [instrucciones de instalación y ejecución](../README.md#instalación-y-ejecución). Comprobar las rutas `#inicio`, `#animales` y `#noticias-eventos`, y seguir los pasos para probar el [acceso simulado](../README.md#acceso-de-demostración). Para reproducir el respaldo de imágenes, bloquear la solicitud de una foto local y volver a cargar la vista.

## Alcance de la validación

La revisión de escritorio y móvil se hizo por tamaños de ventana en Edge. Las pruebas se centran en la aplicación web.
