# AquaGuardian · Grupo 2

AquaGuardian es una aplicación web educativa sobre conservación marina. Presenta los animales, las noticias y los eventos de un parque marino de ejemplo para la entrega universitaria del 18 de noviembre de 2026.

## Problema y objetivo

La información sobre especies y hábitats marinos puede estar dispersa y ser difícil de explorar. AquaGuardian reúne fichas de especies y publicaciones en una interfaz de consulta que facilita el aprendizaje y fomenta el cuidado de la vida marina.

## Funcionalidades implementadas

- **Inicio** con presentación del parque, estadísticas calculadas desde el repositorio y accesos a animales y publicaciones.
- **Animales** con búsqueda por nombre, especie o zona, filtro por estado y orden por nombre o edad. Las fichas muestran hábitat, conservación, situación actual e historia.
- **Noticias y eventos** en pestañas. Las noticias se pueden buscar por título, resumen o categoría y filtrar por categoría. Los eventos se pueden buscar por nombre, descripción o lugar y muestran si están próximos o finalizados. Ambas listas se pueden ordenar por nombre o fecha y abrir en detalle.
- **Interfaz adaptable** con menú móvil, enlace para saltar al contenido y diálogos nativos. Las fotos locales representan especies, incluyen texto alternativo cuando aportan información y muestran su autor, fuente y licencia. Los marcadores visuales cubren imágenes ausentes o fallidas.
- **Acceso de demostración** con registro, inicio y cierre de sesión.

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

## Instalación y ejecución

Necesitas Node.js 18 o superior y npm. Cuando la rama de entrega esté publicada, puedes clonar el proyecto así.

```bash
git clone --branch entrega-final https://github.com/alexanderclaer/Grupo2_AquaGuadian.git
cd Grupo2_AquaGuadian
```

Si ya tienes una copia del proyecto, ejecuta uno de estos comandos desde su raíz y abre la dirección local que indique el servidor.

```bash
npm start
# Equivalente:
npx serve frontend
```

El proyecto no requiere `npm install`. En la primera ejecución, `npx` puede necesitar acceso a Internet para descargar `serve`. También puedes servir la carpeta `frontend` con un servidor estático disponible. Los módulos necesitan una URL HTTP para cargar correctamente.

Para ejecutar por separado el prototipo de consola con un JDK:

```bash
javac -encoding UTF-8 src/*.java
java -cp src Main
```

## Pruebas

```bash
npm test
```

La suite contiene 35 pruebas sobre los modelos, los patrones, las vistas y el acceso de demostración. Consulta los [resultados de validación](docs/pruebas-finales.md) y el [guion para la presentación](docs/guion-presentacion.md).

## Acceso de demostración

Abre **Iniciar sesión** en el menú. Para probar el rol `usuario`, elige **Crear una cuenta de demostración**, usa un nombre ficticio y un correo como `visitante@example.test`, y escribe la contraseña pública `oceano-demo`. Después inicia sesión con esos datos.

Para probar el rol `admin`, inicia sesión con `admin@aquaguardian.test` y la misma contraseña pública `oceano-demo`. Esta cuenta está disponible desde el inicio. El menú muestra **Administración** con esa sesión. En **Mi cuenta**, selecciona **Cerrar sesión** para regresar a la navegación pública.

Usa únicamente datos ficticios. La simulación guarda los nombres, los correos y el identificador de la sesión en `localStorage` del navegador para el origen actual. La contraseña pública se comprueba en el código y el formulario no guarda la contraseña introducida. La sesión persiste al recargar y se comparte entre pestañas del mismo origen y perfil. Puedes borrar las cuentas y la sesión eliminando los datos locales de ese sitio.

## Limitaciones

- El frontend funciona sin backend ni base de datos. El acceso es una simulación sin seguridad de autenticación. Los datos se pueden editar con las herramientas del navegador y quedan aislados por origen y perfil.
- El prototipo Java registra un usuario en memoria y consulta especies desde consola de forma independiente a la web.

## Integrantes

Alexander Molina, David Saavedra y Juan Cortes.
