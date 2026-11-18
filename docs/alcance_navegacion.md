# Alcance de la navegación

| Vista | Implementación |
|---|---|
| Menú y rutas | [MenuPrincipal.js](../frontend/js/componentes/MenuPrincipal.js) y [navegacion.js](../frontend/js/servicios/navegacion.js) |
| Inicio | [SeccionInicio.js](../frontend/js/componentes/SeccionInicio.js) presenta el parque, calcula cifras desde el repositorio y muestra vistas previas |
| Animales | [SeccionAnimales.js](../frontend/js/componentes/SeccionAnimales.js) permite buscar, filtrar, ordenar y abrir fichas |
| Noticias y eventos | [SeccionNoticiasEventos.js](../frontend/js/componentes/SeccionNoticiasEventos.js) permite alternar listas, buscar, ordenar y abrir detalles. Las noticias admiten filtro por categoría |
| Administración | [PanelAdministrador.js](../frontend/js/componentes/PanelAdministrador.js) conserva una vista de referencia fuera de la navegación pública |

El catálogo contiene 6 animales, 6 noticias y 4 eventos de ejemplo. Las rutas desconocidas y el acceso público a `#administracion` llevan a Inicio. La opción `esAdministrador` en [config.js](../frontend/js/config.js) es un indicador de interfaz. La autenticación, el control de acceso real y la gestión persistente están fuera del alcance de la web.

Consulta el [diagrama de navegación de usuario y administrador](diagramas/Diagrama_Navegacion_Usuario_Administrador.png).
