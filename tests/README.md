AquaGuardian
-Integrantes del equipo:
    -Brayan Molina
    -David Saavedra
    -Camilo Cortes

-Descripción y objetivo:
* **Proyecto:** Plataforma web interactiva AquaGuardian.
* **Objetivo:** Desarrollar una plataforma web que permita educar y crear conciencia sobre la vida marina, ofreciendo información de especies, noticias y eventos, además de un espacio de registro seguro y escalable para los usuarios.

-Problema que busca resolver:
La propuesta aborda las siguientes necesidades identificadas en nuestro entorno digital y educativo:
* **Falta de acceso** a información organizada, centralizada y confiable sobre los ecosistemas marinos.
* **Poca interacción educativa** dinámica sobre las diferentes especies y sus hábitats.
* **Ausencia de experiencias visuales e interactivas** que motiven a la comunidad a participar activamente en la conservación marina.

-Tecnologías seleccionadas:
El sistema está construido bajo una arquitectura cliente-servidor utilizando tecnologías modernas, seguras y escalables:

* **Backend / Controlador:** Java con el framework Spring Boot.
* **Frontend / Interfaz Web:** HTML5, CSS3 y JavaScript.
* **Base de Datos:** PostgreSQL.
* **Herramientas de Entorno e IDE:** IntelliJ IDEA / Visual Studio Code.
* **Control de Versiones:** Git y GitHub.



-Instrucciones iniciales para ejecutar o revisar el proyecto:
#### 1. Configurar la Base de Datos
1. Crea una base de datos local en PostgreSQL llamada `aquaguardian`.
2. Modifica el archivo de configuración del backend `backend/src/main/resources/application.properties` con tus credenciales locales:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5143/aquaguardian
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña
   ```

#### 2. Levantar el Servidor (Backend)
1. Abre una terminal y navega hasta la carpeta del backend:
   ```bash
   cd backend
   ```
2. Ejecuta el comando para compilar e iniciar la aplicación Spring Boot:
   ```bash
   mvn spring-boot:run
   ```
3. El servidor se iniciará por defecto en el puerto `http://localhost:8080`.

#### 3. Ejecutar la Interfaz Web (Frontend)
1. Ve a la carpeta `frontend/` en tu gestor de archivos o terminal.
2. Abre el archivo `index.html` en cualquier navegador web moderno para empezar a explorar el parque virtual marino y las vistas del proyecto.