# Alcance implementado: navegación principal

Según el diagrama UML, la navegación principal incluye:

| Clase del UML | Implementación |
|---|---|
| `MenuPrincipal` | `frontend/js/componentes/MenuPrincipal.js` y `frontend/js/servicios/navegacion.js` |
| `SeccionAnimales` | `frontend/js/componentes/SeccionAnimales.js` (listado, búsqueda, filtro, orden y ficha) |
| `SeccionNoticiasEventos` | `frontend/js/componentes/SeccionNoticiasEventos.js` (noticias y eventos con búsqueda, filtro y orden) |
| `PanelAdministrador` | `frontend/js/componentes/PanelAdministrador.js` (estructura reservada; el enlace permanece oculto) |

## Evolución
- **Primera versión de la navegación (prototipo):** menú y vistas con contenido pendiente de integrar.
- **Segunda entrega:** las vistas muestran contenido real de ejemplo (6 animales, 6 noticias y 4 eventos), con búsqueda, filtros y ordenamiento, y usan los patrones Singleton, Factory Method y Strategy.

## Pendiente
Registro e inicio de sesión (módulo "Acceso al sistema"), operaciones de crear/editar/eliminar del administrador y conexión con el backend. La variable `esAdministrador` de `frontend/js/config.js` es solo una condición temporal de interfaz, no un mecanismo de seguridad.
