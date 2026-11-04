# AquaGuardian - Descripción del proyecto

Universidad Manuela Beltrán - Plan de Desarrollo de Software

## 1. Descripción general de la solución
AquaGuardian es una plataforma web educativa de conservación marina. Centraliza información confiable sobre especies, hábitats, noticias y eventos, para informar y concientizar a la comunidad sobre la importancia y conservación de la vida marina. Cuenta con registro de usuarios y un rol de administrador que mantiene el contenido.

## 2. Necesidad identificada
- Falta de acceso a información organizada y confiable sobre la vida marina.
- Poca interacción educativa sobre especies y hábitats.
- Necesidad de una experiencia visual e interactiva.
- Promover el interés y la conciencia ambiental.

## 3. Requerimientos
**Funcionales:** registro e inicio de sesión (usuarios y administrador), exploración del parque virtual marino, consulta de especies, consulta de noticias y eventos, información detallada de especies y hábitats.

**No funcionales:** interfaz intuitiva, diseño responsivo, buen rendimiento, seguridad de usuarios y datos, compatibilidad con navegadores modernos, disponibilidad y mantenimiento continuo.

## 4. Módulos o componentes principales y responsabilidades

| Módulo | Responsabilidad |
|---|---|
| Interfaz web (Frontend) | Mostrar la información al usuario (HTML, CSS, JavaScript). |
| Controlador (Backend) | Recibir las peticiones y coordinar los servicios (Java, Spring Boot). |
| Servicio de usuarios | Registro, inicio de sesión y roles (usuario y administrador). |
| Servicio de especies y hábitats | Consulta y detalle de especies y hábitats. |
| Servicio de noticias y eventos | Publicación y consulta de noticias y eventos. |
| Base de datos | Almacenar toda la información (PostgreSQL). |

## 5. Tecnologías y herramientas
- Lenguaje: Java
- Framework: Spring Boot
- Base de datos: PostgreSQL
- Frontend: HTML, CSS, JavaScript
- Control de versiones: Git y GitHub
- IDE: IntelliJ IDEA / VS Code
- Gestión: Jira / Trello

## 6. Patrones de diseño propuestos (para entregas posteriores)
- **Singleton:** servicio de configuración con una única instancia.
- **Factory Method:** creación de contenido (especie, noticia, evento).
- **Strategy:** búsqueda y ordenamiento por nombre o fecha.

## 7. Organización del desarrollo
- Trabajo en equipo con Git y GitHub: cada cambio se registra con un commit.
- Estructura del repositorio: `docs/` (documentación), `src/` (código) y `tests/` (pruebas).
- El desarrollo avanza por módulos: primero usuarios y especies, luego noticias, eventos y el panel de administración.
