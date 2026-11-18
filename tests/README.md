# Pruebas del proyecto

Pruebas automatizadas de la lógica del frontend con el ejecutor integrado de Node.js. No requieren instalar dependencias.

```bash
npm test
```

| Archivo | Qué verifica |
|---|---|
| `modelos.test.js` | Validación de `Animal`, `Noticia` y `Evento` |
| `singleton.test.js` | Instancia única, carga de datos, manejo de registros inválidos y estadísticas |
| `factory.test.js` | Que cada creador produzca el tipo correcto y rechace datos inválidos |
| `strategy.test.js` | Estrategias de orden y cambio de estrategia en el contexto |
| `utilidades.test.js` | Búsqueda sin tildes, navegación (incluido el acceso de administrador) y fechas |
| `acceso-demo.test.js` | Registro, inicio y cierre de sesión, roles y aislamiento del almacenamiento |
