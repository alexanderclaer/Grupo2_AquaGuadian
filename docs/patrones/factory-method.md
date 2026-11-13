# Patrón Factory Method

**Archivo:** `frontend/js/servicios/CreadorContenido.js`
**Pruebas:** `tests/factory.test.js`

## Problema que resuelve
El refugio maneja tres tipos de contenido (animal, noticia y evento) que se crean a partir de datos crudos. Sin el patrón, el código que carga los datos tendría una cadena de `if/else` por tipo y habría que modificarla cada vez que se agregue un tipo nuevo.

## Por qué se eligió
Cada tipo de contenido tiene reglas propias de validación, pero el proceso de creación es el mismo. Factory Method permite que el repositorio pida "un creador de noticias" sin conocer los detalles de cómo se construye una `Noticia`. Es uno de los patrones definidos en el diagrama de arquitectura del proyecto.

## Cómo se aplica
- `CreadorContenido` es el creador abstracto. Su método `crear(datos)` valida que la entrada sea un objeto y llama al **factory method** `crearProducto(datos)`.
- `CreadorAnimal`, `CreadorNoticia` y `CreadorEvento` implementan `crearProducto()` y devuelven `Animal`, `Noticia` o `Evento`.
- `obtenerCreador(tipo)` entrega el creador adecuado; un tipo desconocido lanza `ErrorValidacion`.
- Los modelos validan sus campos al construirse, de modo que no pueden existir objetos incompletos.

## Componentes involucrados
`CreadorContenido` (Creator) · `CreadorAnimal`, `CreadorNoticia`, `CreadorEvento` (Concrete Creators) · `Animal`, `Noticia`, `Evento` (Products) · `RepositorioContenido` (cliente).

## Beneficios
- Agregar un tipo nuevo de contenido (por ejemplo, "hábitat") solo requiere un modelo y un creador nuevos.
- La validación queda centralizada y reutilizada.
- El código cliente no depende de las clases concretas.
