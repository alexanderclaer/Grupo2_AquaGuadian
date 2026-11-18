# Alcance de la navegación

| Vista | Implementación |
|---|---|
| Menú y rutas | [MenuPrincipal.js](../frontend/js/componentes/MenuPrincipal.js) y [navegacion.js](../frontend/js/servicios/navegacion.js) |
| Inicio | [SeccionInicio.js](../frontend/js/componentes/SeccionInicio.js) presenta el parque, calcula cifras desde el repositorio y muestra vistas previas |
| Animales | [SeccionAnimales.js](../frontend/js/componentes/SeccionAnimales.js) permite buscar, filtrar, ordenar y abrir fichas |
| Noticias y eventos | [SeccionNoticiasEventos.js](../frontend/js/componentes/SeccionNoticiasEventos.js) permite alternar listas, buscar, ordenar y abrir detalles. Las noticias admiten filtro por categoría |
| Acceso de demostración | [SeccionAcceso.js](../frontend/js/componentes/SeccionAcceso.js) ofrece registro, inicio y cierre de sesión |
| Administración | [PanelAdministrador.js](../frontend/js/componentes/PanelAdministrador.js) permite listar, agregar, editar y eliminar animales, eventos y noticias con el rol simulado `admin` |

El catálogo inicial contiene 6 animales, 6 noticias y 4 eventos de ejemplo. Las rutas desconocidas y el acceso a `#administracion` sin una sesión simulada de rol `admin` llevan a Inicio. Consulta las [credenciales públicas de demostración](../README.md#acceso-de-demostración) y la [gestión del catálogo local](../README.md#gestión-del-catálogo-local). La simulación usa almacenamiento local y carece de seguridad de autenticación.

Consulta el [diagrama de navegación de usuario y administrador](diagramas/Diagrama_Navegacion_Usuario_Administrador.png).
