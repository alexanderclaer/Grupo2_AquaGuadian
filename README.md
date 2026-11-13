# AquaGuardian — Grupo 2

## Descripción
AquaGuardian es una plataforma web educativa de conservación marina. Centraliza información sobre los animales de un parque marino, sus noticias y sus eventos para informar y concientizar sobre la importancia de cuidar la vida marina.

## Objetivo
Concientizar e informar sobre la importancia y conservación de la vida marina, facilitando el acceso a información organizada y confiable.

## Problema que busca resolver
La información sobre especies y hábitats marinos está dispersa. AquaGuardian la centraliza para facilitar el aprendizaje y promover la conciencia ambiental.

## Alcance
- **Incluido hasta ahora:** página principal con navegación, sección de animales, sección de noticias y eventos, y la estructura reservada del panel de administración.
- **Fuera del alcance de esta entrega:** registro e inicio de sesión, operaciones del administrador (crear, editar, eliminar), base de datos y backend. Están planificados para las siguientes entregas.

## Funcionalidades implementadas
**Primera entrega (consola, Java)**
- Idea principal de la pagina. Registro de usuarios y consulta de especies. todo sin funcionalidades unicamente visual.

**Segunda entrega (página web, `frontend/`)**
- Página de **inicio**: presentación del parque, "El parque en números" (calculado desde los datos), accesos a las secciones, vistas previas de animales y noticias, y misión.
- Sección **Animales**: listado, búsqueda por nombre/especie/zona, filtro por estado de salud, ordenamiento (nombre o edad) y ficha detallada de cada animal.
- Sección **Noticias y eventos**: pestañas Noticias / Eventos, búsqueda, filtro por categoría, ordenamiento por fecha o título y ventana de detalle. Los eventos se marcan como "Próximo" o "Finalizado".
- **Menú principal** responsivo con acceso al panel de administración oculto (solo para el rol administrador).
- Validaciones de datos y manejo de errores: los registros inválidos se omiten y se informan sin romper la página.
- Accesibilidad básica: navegación con teclado, enlace "saltar al contenido", etiquetas ARIA y ventanas modales nativas.
- Por ahora el diseño **no usa imágenes**: se emplean marcadores de color con iniciales.

## Tecnologías utilizadas
- HTML, CSS y JavaScript (módulos ES, sin dependencias externas) para la interfaz
- Java para la primera versión de consola (`src/`)
- Node.js (solo para ejecutar las pruebas automatizadas)
- Git y GitHub
- Previstas para próximas entregas: Spring Boot, PostgreSQL

## Estructura actual del proyecto
```
Grupo2_AquaGuardian/
├── README.md
├── package.json
├── .gitignore
├── src/                          # Primera entrega: aplicación de consola en Java
│   ├── Main.java
│   ├── Usuario.java · ServicioUsuarios.java
│   └── Especie.java · ServicioEspecies.java
├── frontend/                     # Segunda entrega: página web
│   ├── index.html
│   ├── css/styles.css
│   └── js/
│       ├── main.js               # Punto de entrada y navegación
│       ├── config.js
│       ├── modelos/              # Animal, Noticia, Evento (según el UML)
│       ├── servicios/            # Patrones, repositorio, búsqueda, datos, navegación
│       ├── componentes/          # Menú, secciones, tarjetas, fichas, controles
│       └── utilidades/           # DOM, íconos, fechas, validaciones, errores
├── tests/                        # Pruebas automatizadas (npm test)
└── docs/
    ├── descripcion_proyecto.md
    ├── alcance_navegacion.md
    ├── patrones/                 # singleton.md · factory-method.md · strategy.md
    └── diagramas/                # Casos de uso, arquitectura, clases UML y patrones
```

## Patrones y decisiones de construcción
Se implementaron los tres patrones previstos en la documentación inicial (falta el segundo patron Favtory Method, que se implementara cuando se construyan las funciones de administrador y estas esten conectados a la base de datos). Están en el código y tienen pruebas automatizadas; cada uno tiene su documento con el problema, la justificación, los componentes y los beneficios.

| Patrón | Dónde está | Qué resuelve |
|---|---|---|
| **Singleton** | `frontend/js/servicios/RepositorioContenido.js` | Una única fuente de datos compartida por todas las vistas. [Detalle](docs/patrones/singleton.md) |
| **Factory Method** | `frontend/js/servicios/CreadorContenido.js` | Crear animales, noticias y eventos sin condicionales por tipo y con validación centralizada. [Detalle](docs/patrones/factory-method.md) |
| **Strategy** | `frontend/js/servicios/estrategiasOrden.js` | Cambiar el criterio de ordenamiento en tiempo de ejecución. [Detalle](docs/patrones/strategy.md) |

Diagramas de los patrones: [docs/diagramas/patrones.md](docs/diagramas/patrones.md).

**Otras decisiones**
- Los modelos `Animal`, `Noticia` y `Evento` siguen los atributos y métodos del diagrama de clases UML.
- Separación de responsabilidades: modelos (datos y validación), servicios (lógica y patrones), componentes (interfaz) y utilidades (reutilizables).
- La interfaz se construye con `createElement` y nodos de texto, no con `innerHTML` sobre los datos, para evitar inyección de HTML.
- Los datos son de ejemplo (`datosIniciales.js`); más adelante vendrán del backend.

## Instrucciones de ejecución
```bash
git clone https://github.com/alexanderclaer/Grupo2_AquaGuadian.git
cd Grupo2_AquaGuadian
```

**Página web.** Los módulos de JavaScript requieren un servidor local (no funcionan con doble clic):
- En VS Code: Se instala la extensión **Live Server**, abre `frontend/index.html` y pulsa "Go Live"; o bien
- con Node.js: `qnpx serve frontend` y abre la dirección que muestre.

**Pruebas automatizadas** (Node.js 18 o superior):
```bash
npm test
```

**Primera versión en Java (consola):**
```bash
javac src/*.java && java -cp src Main
```

## Integrantes del equipo
- Alexander Molina
- David Saavedra
- Juan Cortes

## Estado actual del proyecto
Segunda entrega: la página principal funciona con contenido de ejemplo, aplica dos patrones de diseño y cuenta con 29 pruebas automatizadas. El código de la primera entrega en Java se conserva y basandonos en que era un boceto, prácticamente una ejemplo, no está integrado con la página web.

## Próximos avances
- Registro e inicio de sesión y roles (módulo "Acceso al sistema").
- Panel de administración con crear, editar y eliminar animales, noticias y eventos.
- Backend con Spring Boot y base de datos PostgreSQL; reemplazar los datos de ejemplo por una API REST.
- Recursos educativos e imágenes.
