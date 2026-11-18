# Patrón Singleton

**Archivo:** `frontend/js/servicios/RepositorioContenido.js`
**Pruebas:** `tests/singleton.test.js`

## Problema que resuelve
Las vistas de Inicio, Animales y Noticias y eventos necesitan los mismos datos. Si cada vista creara su propio almacén de contenido, podrían mostrar cifras distintas (por ejemplo, 6 animales en una vista y 5 en otra) y se duplicaría la carga de datos.

## Por qué se eligió
Hay un único conjunto de contenido del parque y debe existir una única fuente de verdad. En la documentación inicial se había propuesto un "servicio de configuración con una única instancia"; en esta entrega se aplicó el mismo patrón al repositorio de contenido porque es donde la unicidad aporta más valor.

## Cómo se aplica
- La clase `RepositorioContenido` guarda la instancia en un campo estático privado (`#instancia`).
- El constructor exige una llave privada (`Symbol`), por lo que `new RepositorioContenido()` lanza un error.
- La única forma de obtenerlo es `RepositorioContenido.obtenerInstancia()`.
- Los métodos `obtenerAnimales()`, `obtenerNoticias()` y `obtenerEventos()` devuelven **copias superficiales de las listas**. Agregar o retirar elementos de una lista devuelta no altera la colección interna.
- Si un registro es inválido, se omite y queda registrado en `obtenerErroresCarga()` (manejo de errores).

## Componentes involucrados
`RepositorioContenido` (Singleton) · `datosIniciales.js` (datos) · `SeccionInicio`, `SeccionAnimales`, `SeccionNoticiasEventos` (clientes) · `main.js` (carga inicial).

## Beneficios
- Una sola fuente de datos coherente en toda la aplicación.
- Las vistas comparten la misma interfaz de consulta del repositorio.
- Se puede probar de forma aislada (`reiniciarParaPruebas()`).
