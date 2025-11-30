import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: (username, password) => {
    return api.post('/auth/login', { username, password });
  },
};

export const alumnoService = {
  getAll: () => api.get('/alumnos'),
  getById: (id) => api.get(`/alumnos/${id}`),
  getByUsuario: (idUsuario) => api.get(`/alumnos/usuario/${idUsuario}`),
  update: (id, alumno) => api.put(`/alumnos/${id}`, alumno),
};

export const instructorService = {
  getAll: () => api.get('/instructores'),
  getById: (id) => api.get(`/instructores/${id}`),
  getByUsuario: (idUsuario) => api.get(`/instructores/usuario/${idUsuario}`),
  update: (id, instructor) => api.put(`/instructores/${id}`, instructor),
};

export const claseService = {
  getAll: () => api.get('/clases'),
  getById: (id) => api.get(`/clases/${id}`),
  getByInstructor: (idInstructor) => api.get(`/clases/instructor/${idInstructor}`),
  create: (clase) => api.post('/clases', clase),
  update: (id, clase) => api.put(`/clases/${id}`, clase),
  delete: (id) => api.delete(`/clases/${id}`),
};

export const planNutricionalService = {
  getAll: () => api.get('/planes-nutricionales'),
  getById: (id) => api.get(`/planes-nutricionales/${id}`),
  getByAlumno: (idAlumno) => api.get(`/planes-nutricionales/alumno/${idAlumno}`),
  getByInstructor: (idInstructor) => api.get(`/planes-nutricionales/instructor/${idInstructor}`),
  create: (plan) => api.post('/planes-nutricionales', plan),
  update: (id, plan) => api.put(`/planes-nutricionales/${id}`, plan),
  delete: (id) => api.delete(`/planes-nutricionales/${id}`),
};

export const incidenciaService = {
  getAll: () => api.get('/incidencias'),
  getById: (id) => api.get(`/incidencias/${id}`),
  getByAlumno: (idAlumno) => api.get(`/incidencias/alumno/${idAlumno}`),
  getByInstructor: (idInstructor) => api.get(`/incidencias/instructor/${idInstructor}`),
  create: (incidencia) => api.post('/incidencias', incidencia),
  update: (id, incidencia) => api.put(`/incidencias/${id}`, incidencia),
  delete: (id) => api.delete(`/incidencias/${id}`),
};

export const inscripcionClaseService = {
  getAll: () => api.get('/inscripciones-clase'),
  getById: (id) => api.get(`/inscripciones-clase/${id}`),
  getByAlumno: (idAlumno) => api.get(`/inscripciones-clase/alumno/${idAlumno}`),
  getByClase: (idClase) => api.get(`/inscripciones-clase/clase/${idClase}`),
  create: (inscripcion) => api.post('/inscripciones-clase', inscripcion),
  update: (id, inscripcion) => api.put(`/inscripciones-clase/${id}`, inscripcion),
  delete: (id) => api.delete(`/inscripciones-clase/${id}`),
};

export const sedeService = {
  getAll: () => api.get('/sedes'),
  getById: (id) => api.get(`/sedes/${id}`),
  create: (sede) => api.post('/sedes', sede),
  update: (id, sede) => api.put(`/sedes/${id}`, sede),
  delete: (id) => api.delete(`/sedes/${id}`),
};

export const equipoService = {
  getAll: () => api.get('/equipos'),
  getById: (id) => api.get(`/equipos/${id}`),
  getBySede: (idSede) => api.get(`/equipos/sede/${idSede}`),
  create: (equipo) => api.post('/equipos', equipo),
  update: (id, equipo) => api.put(`/equipos/${id}`, equipo),
  delete: (id) => api.delete(`/equipos/${id}`),
};

export const tipoMembresiaService = {
  getAll: () => api.get('/tipos-membresia'),
  getById: (id) => api.get(`/tipos-membresia/${id}`),
  create: (tipo) => api.post('/tipos-membresia', tipo),
  update: (id, tipo) => api.put(`/tipos-membresia/${id}`, tipo),
  delete: (id) => api.delete(`/tipos-membresia/${id}`),
};

export const membresiaService = {
  getAll: () => api.get('/membresias'),
  getById: (id) => api.get(`/membresias/${id}`),
  getByAlumno: (idAlumno) => api.get(`/membresias/alumno/${idAlumno}`),
  create: (membresia) => api.post('/membresias', membresia),
  update: (id, membresia) => api.put(`/membresias/${id}`, membresia),
  renovar: (id, diasAdicionales) => api.put(`/membresias/${id}/renovar`, { diasAdicionales }),
  suspender: (id) => api.put(`/membresias/${id}/suspender`),
  activar: (id) => api.put(`/membresias/${id}/activar`),
};

export const pagoService = {
  getAll: () => api.get('/pagos'),
  getById: (id) => api.get(`/pagos/${id}`),
  getByMembresia: (idMembresia) => api.get(`/pagos/membresia/${idMembresia}`),
  create: (pago) => api.post('/pagos', pago),
  generarComprobante: (id) => api.get(`/pagos/${id}/comprobante`),
};

export const ejercicioService = {
  getAll: () => api.get('/ejercicios'),
  getById: (id) => api.get(`/ejercicios/${id}`),
  getByGrupoMuscular: (grupo) => api.get(`/ejercicios/grupo/${grupo}`),
  create: (ejercicio) => api.post('/ejercicios', ejercicio),
  update: (id, ejercicio) => api.put(`/ejercicios/${id}`, ejercicio),
  delete: (id) => api.delete(`/ejercicios/${id}`),
};

export const rutinaService = {
  getAll: () => api.get('/rutinas'),
  getById: (id) => api.get(`/rutinas/${id}`),
  getByAlumno: (idAlumno) => api.get(`/rutinas/alumno/${idAlumno}`),
  getByInstructor: (idInstructor) => api.get(`/rutinas/instructor/${idInstructor}`),
  create: (rutina) => api.post('/rutinas', rutina),
  update: (id, rutina) => api.put(`/rutinas/${id}`, rutina),
  delete: (id) => api.delete(`/rutinas/${id}`),
};

export const rutinaEjercicioService = {
  getAll: () => api.get('/rutina-ejercicios'),
  getById: (id) => api.get(`/rutina-ejercicios/${id}`),
  getByRutina: (idRutina) => api.get(`/rutina-ejercicios/rutina/${idRutina}`),
  create: (rutinaEjercicio) => api.post('/rutina-ejercicios', rutinaEjercicio),
  update: (id, rutinaEjercicio) => api.put(`/rutina-ejercicios/${id}`, rutinaEjercicio),
  delete: (id) => api.delete(`/rutina-ejercicios/${id}`),
};

export const alumnoInstructorService = {
  getAll: () => api.get('/alumno-instructores'),
  getByInstructor: (idInstructor) => api.get(`/alumno-instructores/instructor/${idInstructor}`),
  getByAlumno: (idAlumno) => api.get(`/alumno-instructores/alumno/${idAlumno}`),
  create: (alumnoInstructor) => api.post('/alumno-instructores', alumnoInstructor),
  delete: (id) => api.delete(`/alumno-instructores/${id}`),
};

export const seguimientoFisicoService = {
  getAll: () => api.get('/seguimientos'),
  getById: (id) => api.get(`/seguimientos/${id}`),
  getByAlumno: (idAlumno) => api.get(`/seguimientos/alumno/${idAlumno}`),
  getByInstructor: (idInstructor) => api.get(`/seguimientos/instructor/${idInstructor}`),
  create: (seguimiento) => api.post('/seguimientos', seguimiento),
  update: (id, seguimiento) => api.put(`/seguimientos/${id}`, seguimiento),
};

export const reservaClaseService = {
  getAll: () => api.get('/reservas-clase'),
  getById: (id) => api.get(`/reservas-clase/${id}`),
  getByAlumno: (idAlumno) => api.get(`/reservas-clase/alumno/${idAlumno}`),
  create: (reserva) => api.post('/reservas-clase', reserva),
  update: (id, reserva) => api.put(`/reservas-clase/${id}`, reserva),
  delete: (id) => api.delete(`/reservas-clase/${id}`),
};

export const mensajeService = {
  getAll: () => api.get('/mensajes'),
  getById: (id) => api.get(`/mensajes/${id}`),
  getByDestinatario: (idUsuario) => api.get(`/mensajes/destinatario/${idUsuario}`),
  create: (mensaje) => api.post('/mensajes', mensaje),
  marcarLeido: (id) => api.put(`/mensajes/${id}/leido`),
};

export const foodDataService = {
  search: (query) => api.get(`/food/search?query=${query}`),
  getDetail: (fdcId) => api.get(`/food/${fdcId}`),
};

export const usuarioService = {
  getAll: () => api.get('/usuarios'),
  getById: (id) => api.get(`/usuarios/${id}`),
  create: (usuario) => api.post('/usuarios', usuario),
  update: (id, usuario) => api.put(`/usuarios/${id}`, usuario),
  delete: (id) => api.delete(`/usuarios/${id}`),
  cambiarEstado: (id, estado) => api.put(`/usuarios/${id}/estado`, estado),
  resetPassword: (id, password) => api.put(`/usuarios/${id}/reset-password`, { password }),
  changePassword: (id, currentPassword, newPassword) => api.put(`/usuarios/${id}/change-password`, { currentPassword, newPassword }),
};

export const administradorService = {
  getAll: () => api.get('/administradores'),
  getById: (id) => api.get(`/administradores/${id}`),
  getByUsuario: (idUsuario) => api.get(`/administradores/usuario/${idUsuario}`),
  update: (id, administrador) => api.put(`/administradores/${id}`, administrador),
};

export const promocionService = {
  getAll: () => api.get('/promociones'),
  getActivas: () => api.get('/promociones/activas'),
  getWeb: () => api.get('/promociones/web'),
  getDashboardUsuario: () => api.get('/promociones/dashboard-usuario'),
  getDashboardEntrenador: () => api.get('/promociones/dashboard-entrenador'),
  getById: (id) => api.get(`/promociones/${id}`),
  create: (promocion) => api.post('/promociones', promocion),
  update: (id, promocion) => api.put(`/promociones/${id}`, promocion),
  delete: (id) => api.delete(`/promociones/${id}`),
};

export const noticiaService = {
  getAll: () => api.get('/noticias'),
  getActivas: () => api.get('/noticias/activas'),
  getByTipo: (tipo) => api.get(`/noticias/tipo/${tipo}`),
  getById: (id) => api.get(`/noticias/${id}`),
  create: (noticia) => api.post('/noticias', noticia),
  update: (id, noticia) => api.put(`/noticias/${id}`, noticia),
  delete: (id) => api.delete(`/noticias/${id}`),
};

export default api;

