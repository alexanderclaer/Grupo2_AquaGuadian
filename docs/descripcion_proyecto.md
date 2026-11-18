# AquaGuardian · Descripción del proyecto

Universidad Manuela Beltrán · Plan de Desarrollo de Software

## Necesidad y objetivo

La información sobre especies y hábitats marinos puede resultar dispersa. AquaGuardian busca facilitar su consulta y fomentar el interés por la conservación mediante una experiencia educativa adaptable a escritorio y móvil.

## Alcance de la aplicación

| Componente | Responsabilidad |
|---|---|
| Inicio | Presentación del parque, cifras derivadas de los datos y acceso a las secciones |
| Catálogo de animales | Búsqueda, filtro, ordenamiento y fichas con estado, hábitat e historia |
| Noticias y eventos | Listas con búsqueda y orden, filtro de categorías para noticias y detalles en diálogo |
| Datos y reglas | Modelos validados, repositorio local y estrategias de ordenamiento |
| Panel de referencia | Vista reservada que describe operaciones administrativas pendientes |

## Tecnologías

La web utiliza HTML, CSS y JavaScript con módulos ES y datos locales de ejemplo. Las pruebas se ejecutan con Node.js y `node:test`. El código Java en `src/` conserva un prototipo de consola independiente. Autenticación web, persistencia y backend están fuera del alcance de la aplicación entregada.

## Patrones y recursos

- [Singleton](patrones/singleton.md) centraliza el contenido que comparten las vistas.
- [Factory Method](patrones/factory-method.md) delega la creación de cada tipo de contenido.
- [Strategy](patrones/strategy.md) permite cambiar el criterio de ordenamiento.

Consulta el [alcance de navegación](alcance_navegacion.md), los [diagramas de patrones](diagramas/patrones.md) y el [README](../README.md).
