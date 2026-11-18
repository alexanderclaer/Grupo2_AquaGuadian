# AquaGuardian · Grupo 2

AquaGuardian es una aplicación web educativa sobre conservación marina. Presenta los animales, las noticias y los eventos de un parque marino de ejemplo para la entrega universitaria del 18 de noviembre de 2026.

## Problema y objetivo

La información sobre especies y hábitats marinos puede estar dispersa y ser difícil de explorar. AquaGuardian reúne fichas de especies y publicaciones en una interfaz de consulta que facilita el aprendizaje y fomenta el cuidado de la vida marina.

## Funcionalidades implementadas

- **Inicio** con presentación del parque, estadísticas calculadas desde el repositorio y accesos a animales y publicaciones.
- **Animales** con búsqueda por nombre, especie o zona, filtro por estado y orden por nombre o edad. Las fichas muestran hábitat, conservación, situación actual e historia.
- **Noticias y eventos** en pestañas. Las noticias se pueden buscar por título, resumen o categoría y filtrar por categoría. Los eventos se pueden buscar por nombre, descripción o lugar y muestran si están próximos o finalizados. Ambas listas se pueden ordenar por nombre o fecha y abrir en detalle.
- **Interfaz adaptable** con menú móvil, enlace para saltar al contenido y diálogos nativos. Las fotos locales representan especies, incluyen texto alternativo cuando aportan información y muestran su autor, fuente y licencia. Los marcadores visuales cubren imágenes ausentes o fallidas.

## Tecnologías y arquitectura

HTML, CSS y JavaScript con módulos ES conforman la aplicación web estática. Node.js 18 o superior ejecuta las pruebas con `node:test`. El prototipo de consola en Java se conserva como aplicación independiente.

| Ruta | Responsabilidad |
|---|---|
| [frontend/index.html](frontend/index.html) y [frontend/css](frontend/css/) | Estructura y presentación |
| [frontend/assets](frontend/assets/) | Favicon y fotografías locales |
| [frontend/js/main.js](frontend/js/main.js) | Carga inicial y navegación por hash |
| [frontend/js/componentes](frontend/js/componentes/) | Menú, vistas, controles, tarjetas y diálogos |
| [frontend/js/modelos](frontend/js/modelos/) | Modelos y validación de animales, noticias y eventos |
| [frontend/js/servicios](frontend/js/servicios/) | Datos de ejemplo, repositorio, creación, ordenamiento, búsqueda y rutas |
| [frontend/js/utilidades](frontend/js/utilidades/) | DOM, iconos, fechas y validaciones compartidas |
| [src](src/) | Prototipo Java de consola |
| [tests](tests/) y [docs](docs/) | Pruebas, documentación y diagramas |

### Patrones de diseño

| Patrón | Implementación | Propósito |
|---|---|---|
| Singleton | [RepositorioContenido.js](frontend/js/servicios/RepositorioContenido.js) | `obtenerInstancia()` entrega el repositorio que comparte el frontend. [Detalle](docs/patrones/singleton.md) |
| Factory Method | [CreadorContenido.js](frontend/js/servicios/CreadorContenido.js) | El repositorio selecciona un creador por tipo. `crear()` valida la entrada y delega en `crearProducto()` para construir el modelo correspondiente. [Detalle](docs/patrones/factory-method.md) |
| Strategy | [estrategiasOrden.js](frontend/js/servicios/estrategiasOrden.js) | `OrganizadorLista` aplica el criterio seleccionado en tiempo de ejecución y devuelve una lista ordenada sin alterar la original. [Detalle](docs/patrones/strategy.md) |

Los modelos validan sus campos, el repositorio informa los registros inválidos que omite y las vistas construyen el DOM con elementos y nodos de texto. Los componentes de búsqueda, orden y diálogo se reutilizan y los algoritmos se prueban de forma aislada.

## Ejecución

Desde la raíz del proyecto, ejecuta uno de estos comandos y abre la dirección local que indique el servidor.

```bash
npm start
# Equivalente:
npx serve frontend
```

En la primera ejecución, `npx` puede necesitar acceso a Internet para descargar `serve`. También puedes servir la carpeta `frontend` con un servidor estático disponible. Los módulos necesitan una URL HTTP para cargar correctamente.

Para ejecutar por separado el prototipo de consola con un JDK:

```bash
javac -encoding UTF-8 src/*.java
java -cp src Main
```

## Pruebas

```bash
npm test
```

La suite contiene 29 pruebas sobre modelos, patrones, búsqueda, navegación y fechas. Consulta los [resultados de validación](docs/pruebas-finales.md) y el [guion para la presentación](docs/guion-presentacion.md).

## Limitaciones

- El contenido es de ejemplo y reside en [datosIniciales.js](frontend/js/servicios/datosIniciales.js). La web funciona con datos locales en memoria, sin backend ni persistencia.
- La consulta pública carece de registro, autenticación y gestión de contenido. El panel de administración es una vista de referencia fuera de la navegación pública. El indicador de configuración solo controla la presentación.
- El prototipo Java registra un usuario en memoria y consulta especies desde consola de forma independiente a la web.

## Integrantes

Alexander Molina, David Saavedra y Juan Cortes.
