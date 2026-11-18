# Guion de presentación de AquaGuardian

Duración prevista de **9 minutos**. Abrir la URL local del frontend y tener listos el editor y la terminal con `npm test`.

| Tiempo | Bloque | Qué decir y mostrar |
|---|---|---|
| 0:00–0:50 | Problema | «La información sobre vida marina puede estar dispersa. Buscamos que un visitante pueda encontrar una especie, conocer su estado y consultar noticias y actividades del parque desde el mismo sitio». |
| 0:50–1:40 | Solución | Mostrar Inicio, la fotografía de tortuga, las cifras calculadas y los accesos. Explicar que los datos son de ejemplo y que las fotografías corresponden a la especie. Señalar un crédito. |
| 1:40–3:05 | Animales | Abrir Animales, filtrar por **En cuidado**, buscar **Marina** y abrir la ficha. Mostrar hábitat y situación actual. Cerrar con Escape. Limpiar búsqueda y filtro, ordenar por edad y señalar que Luna aparece primero. |
| 3:05–4:20 | Noticias y eventos | Filtrar Noticias por **Rescate**, buscar **Marina** y abrir el detalle. Pasar a Eventos, buscar **Sala educativa**, abrir el taller y mostrar fecha, lugar y estado. Cambiar el ancho de la ventana y usar el menú móvil. |
| 4:20–6:45 | Patrones | Dedicar unos 45 segundos a cada patrón. En [RepositorioContenido.js](../frontend/js/servicios/RepositorioContenido.js), mostrar cómo `obtenerInstancia()` utiliza el campo estático y cómo [main.js](../frontend/js/main.js) entrega el repositorio a las vistas. En [CreadorContenido.js](../frontend/js/servicios/CreadorContenido.js), seguir `crear()` → `crearProducto()` → `new Animal(datos)` y relacionarlo con la carga de registros. En [estrategiasOrden.js](../frontend/js/servicios/estrategiasOrden.js), mostrar cómo `OrganizadorLista` cambia de estrategia al elegir una opción en la pantalla. |
| 6:45–7:30 | Buenas prácticas | Mostrar la separación entre modelos, servicios y componentes. Explicar la validación de los modelos, la omisión de registros inválidos y la inserción de datos como texto. Mencionar el respaldo de imágenes y el foco del diálogo. |
| 7:30–8:00 | Pruebas | Presentar la salida de `npm test`. Mencionar las pruebas de patrones, acceso simulado y persistencia del catálogo. |
| 8:00–9:00 | Administración y cierre | Iniciar sesión con la [cuenta administrativa de demostración](../README.md#acceso-de-demostración), abrir Administración y editar el lugar de un evento. Mostrar el cambio en Eventos y recargar. Cerrar sesión y aclarar que el catálogo modificado queda en el navegador y que el acceso carece de seguridad de autenticación. |
