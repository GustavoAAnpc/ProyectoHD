# Sistema de Gestión de Gimnasio

Sistema completo de gestión de gimnasio desarrollado con Spring Boot (Backend) y React (Frontend), utilizando MariaDB como base de datos y Hibernate como ORM.

## 🚀 Tecnologías

### Backend
- **Spring Boot 3.2.0**
- **Spring Data JPA / Hibernate**
- **Spring Security** con JWT
- **MariaDB**
- **Java 17**

### Frontend
- **React 19.1.1**
- **React Router DOM 7.9.1**
- **Axios** para peticiones HTTP

## 📋 Requisitos Previos

- Java 17 o superior
- Maven 3.6+
- Node.js 16+ y npm
- MariaDB 10.5+ (o MySQL 8+)

## 🗄️ Base de Datos

### Configuración de MariaDB

1. Instalar MariaDB
2. Crear la base de datos (se crea automáticamente si no existe):
   ```sql
   CREATE DATABASE IF NOT EXISTS gimnasio_db;
   ```

3. Configurar las credenciales en `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=tu_password
   ```

## 🔧 Instalación y Configuración

### Backend

1. Navegar a la carpeta backend:
   ```bash
   cd backend
   ```

2. Compilar el proyecto:
   ```bash
   mvn clean install
   ```

3. Ejecutar la aplicación:
   ```bash
   mvn spring-boot:run
   ```

El backend estará disponible en `http://localhost:8080`

### Frontend

1. Navegar a la carpeta frontend:
   ```bash
   cd frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar la aplicación:
   ```bash
   npm start
   ```

El frontend estará disponible en `http://localhost:3000`

## 👤 Usuarios de Prueba

El sistema crea automáticamente los siguientes usuarios de prueba:

### Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Rol:** Administrador

### Entrenador
- **Usuario:** `entrenador`
- **Contraseña:** `entrenador123`
- **Rol:** Entrenador

### Usuario
- **Usuario:** `usuario`
- **Contraseña:** `usuario123`
- **Rol:** Usuario

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/gimnasio/proyecto/
│   │       │   ├── entity/          # Entidades JPA
│   │       │   ├── repository/       # Repositorios JPA
│   │       │   ├── service/         # Servicios de negocio
│   │       │   ├── controller/      # Controladores REST
│   │       │   ├── config/          # Configuración (Security, JWT)
│   │       │   └── dto/             # Data Transfer Objects
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/      # Componentes React
    │   ├── pages/           # Páginas/Dashboards
    │   ├── services/        # Servicios API
    │   ├── context/         # Context API (Auth)
    │   └── App.js
    └── package.json
```

## 🎯 Funcionalidades

### Dashboard Administrador
- **Gestión del Gimnasio:** Crear, editar y eliminar sedes, control de equipos, definir horarios
- **Gestión de Usuarios:** Crear y gestionar cuentas de entrenadores y usuarios, asignar roles
- **Membresías y Pagos:** Crear tipos de membresía, asignar membresías, registrar pagos, generar comprobantes
- **Monitoreo y Reportes:** Ver reportes de ingresos, asistencia y desempeño, exportar reportes

### Dashboard Entrenador
- **Gestión de Clientes:** Ver lista de usuarios asignados, historial de entrenamientos y progreso físico
- **Planificación y Rutinas:** Crear y asignar rutinas personalizadas, cargar videos de ejercicios, consultar base de datos de ejercicios
- **Seguimiento Nutricional:** Crear planes alimenticios, ajustar dietas según objetivos
- **Comunicación:** Chat interno con usuarios, enviar notificaciones

### Dashboard Usuario
- **Perfil Personal:** Ver y editar información básica, consultar estado de membresía, ver historial de pagos
- **Rutinas y Progreso:** Consultar rutina diaria/semanal, marcar ejercicios completados, ver progreso físico
- **Plan Nutricional:** Ver plan de comidas, consultar valores nutricionales, **consultar información de alimentos con FoodData Central API**
- **Clases y Reservas:** Ver clases disponibles, reservar clases, ver historial de clases asistidas
- **Comunicación:** Chat con entrenador, enviar retroalimentación, recibir notificaciones

## 🍎 Integración con FoodData Central

El sistema incluye integración con la API de FoodData Central del USDA para consultar información nutricional de alimentos:

- **Endpoint:** `/api/food/search?query={alimento}` - Buscar alimentos
- **Endpoint:** `/api/food/{fdcId}` - Obtener detalles nutricionales de un alimento
- **API Key:** Configurada en el servicio (FoodDataService.java)

Los usuarios pueden buscar información nutricional de alimentos directamente desde su dashboard, incluyendo:
- Calorías
- Proteínas, carbohidratos, grasas
- Vitaminas y minerales
- Y más información nutricional detallada

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

1. El usuario inicia sesión con usuario y contraseña
2. El backend valida las credenciales
3. Se genera un token JWT que se envía al frontend
4. El frontend almacena el token y lo incluye en todas las peticiones
5. El backend valida el token en cada petición

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Alumnos
- `GET /api/alumnos` - Listar todos los alumnos
- `GET /api/alumnos/{id}` - Obtener alumno por ID
- `GET /api/alumnos/usuario/{idUsuario}` - Obtener alumno por usuario

### Instructores
- `GET /api/instructores` - Listar todos los instructores
- `GET /api/instructores/{id}` - Obtener instructor por ID
- `GET /api/instructores/usuario/{idUsuario}` - Obtener instructor por usuario

### Clases
- `GET /api/clases` - Listar todas las clases
- `GET /api/clases/{id}` - Obtener clase por ID
- `GET /api/clases/instructor/{idInstructor}` - Clases de un instructor
- `POST /api/clases` - Crear clase
- `PUT /api/clases/{id}` - Actualizar clase
- `DELETE /api/clases/{id}` - Eliminar clase

### Planes Nutricionales
- `GET /api/planes-nutricionales` - Listar todos los planes
- `GET /api/planes-nutricionales/{id}` - Obtener plan por ID
- `GET /api/planes-nutricionales/alumno/{idAlumno}` - Planes de un alumno
- `GET /api/planes-nutricionales/instructor/{idInstructor}` - Planes de un instructor
- `POST /api/planes-nutricionales` - Crear plan
- `PUT /api/planes-nutricionales/{id}` - Actualizar plan
- `DELETE /api/planes-nutricionales/{id}` - Eliminar plan

### Incidencias
- `GET /api/incidencias` - Listar todas las incidencias
- `GET /api/incidencias/{id}` - Obtener incidencia por ID
- `GET /api/incidencias/alumno/{idAlumno}` - Incidencias de un alumno
- `GET /api/incidencias/instructor/{idInstructor}` - Incidencias de un instructor
- `POST /api/incidencias` - Crear incidencia
- `PUT /api/incidencias/{id}` - Actualizar incidencia
- `DELETE /api/incidencias/{id}` - Eliminar incidencia

### Inscripciones a Clases
- `GET /api/inscripciones-clase` - Listar todas las inscripciones
- `GET /api/inscripciones-clase/{id}` - Obtener inscripción por ID
- `GET /api/inscripciones-clase/alumno/{idAlumno}` - Inscripciones de un alumno
- `GET /api/inscripciones-clase/clase/{idClase}` - Inscripciones de una clase
- `POST /api/inscripciones-clase` - Crear inscripción
- `PUT /api/inscripciones-clase/{id}` - Actualizar inscripción
- `DELETE /api/inscripciones-clase/{id}` - Eliminar inscripción

## 🛠️ Desarrollo

### Compilar Backend
```bash
cd backend
mvn clean package
```

### Compilar Frontend
```bash
cd frontend
npm run build
```

## 📄 Licencia

Este proyecto es de uso educativo.

## 👨‍💻 Autor

Desarrollado para el curso de Herramientas de Desarrollo - UTP

