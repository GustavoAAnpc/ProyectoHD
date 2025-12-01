import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  alumnoService, planNutricionalService, reservaClaseService,
  incidenciaService, rutinaService, membresiaService,
  pagoService, claseService, foodDataService, mensajeService,
  rutinaEjercicioService, seguimientoFisicoService, alumnoInstructorService
} from '../services/api';
import PerfilTab from '../components/dashboard/PerfilTab';
import RutinasTab from '../components/dashboard/RutinasTab';
import ProgresoTab from '../components/dashboard/ProgresoTab';
import NutricionTab from '../components/dashboard/NutricionTab';
import ClasesTab from '../components/dashboard/ClasesTab';
import MembresiaTab from '../components/dashboard/MembresiaTab';
import ComunicacionTab from '../components/dashboard/ComunicacionTab';
import PerfilModal from '../components/modals/PerfilModal';
import RutinaModal from '../components/modals/RutinaModal';
import MensajeModal from '../components/modals/MensajeModal';
import FeedbackModal from '../components/modals/FeedbackModal';
import PromocionCarousel from '../components/PromocionCarousel';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';
import './Dashboard.css';
import { detectarConLogMeal } from "../services/logmealService";

const DashboardUsuario = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [alumno, setAlumno] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const [ejerciciosRutina, setEjerciciosRutina] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [clases, setClases] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [seguimientos, setSeguimientos] = useState([]);
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [selectedDia, setSelectedDia] = useState('');
  const [foodSearch, setFoodSearch] = useState('');
  const [foodResults, setFoodResults] = useState([]);
  const [alimentosConsumidos, setAlimentosConsumidos] = useState([]);
  const [alimentosDetectados, setAlimentosDetectados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [miEntrenador, setMiEntrenador] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Check if user needs to change password on mount
  useEffect(() => {
    if (user && user.passwordChanged === false) {
      setShowPasswordModal(true);
    }
  }, [user]);

  const loadData = useCallback(async () => {
    try {
      const alumnoRes = await alumnoService.getByUsuario(user.idUsuario);
      const alumnoData = alumnoRes.data;
      setAlumno(alumnoData);

      if (alumnoData?.idAlumno) {
        const [
          planesRes, reservasRes, rutinasRes, membresiasRes,
          pagosRes, clasesRes, mensajesRes, seguimientosRes
        ] = await Promise.all([
          planNutricionalService.getByAlumno(alumnoData.idAlumno),
          reservaClaseService.getByAlumno(alumnoData.idAlumno),
          rutinaService.getByAlumno(alumnoData.idAlumno),
          membresiaService.getByAlumno(alumnoData.idAlumno),
          pagoService.getAll(),
          claseService.getAll(),
          mensajeService.getByDestinatario(user.idUsuario),
          seguimientoFisicoService.getByAlumno(alumnoData.idAlumno)
        ]);

        setPlanes(planesRes.data);
        setReservas(reservasRes.data);
        setRutinas(rutinasRes.data);
        setMembresias(membresiasRes.data);
        setPagos(pagosRes.data.filter(p => p.membresia?.alumno?.idAlumno === alumnoData.idAlumno));
        setClases(clasesRes.data);
        setMensajes(mensajesRes.data);
        setSeguimientos(seguimientosRes.data);

        const instructoresRes = await alumnoInstructorService.getByAlumno(alumnoData.idAlumno);
        if (instructoresRes.data && instructoresRes.data.length > 0) {
          setMiEntrenador(instructoresRes.data[0].instructor);
        }
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  }, [user.idUsuario]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeTab) {
      setSearchParams({ tab: activeTab }, { replace: true });
    }
  }, [activeTab, setSearchParams]);

  // Handlers
  const handleEditPerfil = () => {
    setModalType('perfil');
    // Asegurar que el email esté disponible en formData desde usuario
    setFormData({
      ...alumno,
      email: alumno.usuario?.email || alumno.email || '',
      telefono: alumno.telefono || alumno.celular || ''
    });
    setShowModal(true);
  };

  const handleViewRutina = async (rutina) => {
    setSelectedRutina(rutina);
    try {
      const ejerciciosRes = await rutinaEjercicioService.getByRutina(rutina.idRutina);
      setEjerciciosRutina(ejerciciosRes.data);
      setShowModal(true);
      setModalType('verRutina');
    } catch (error) {
      console.error('Error cargando ejercicios:', error);
    }
  };

  const handleMarcarCompletado = async (ejercicioId, completado) => {
    try {
      const ejercicio = ejerciciosRutina.find(e => e.idRutinaEjercicio === ejercicioId);
      if (ejercicio) {
        await rutinaEjercicioService.update(ejercicioId, { ...ejercicio, completado: !completado });
        if (selectedRutina) {
          handleViewRutina(selectedRutina);
        }
      }
    } catch (error) {
      console.error('Error marcando ejercicio:', error);
      alert('Error al actualizar el ejercicio');
    }
  };

  const handleReservarClase = async (clase) => {
    if (!alumno) return;
    try {
      const reserva = {
        alumno: { idAlumno: alumno.idAlumno },
        clase: { idClase: clase.idClase },
        fechaReserva: new Date().toISOString(),
        estado: 'Reservada'
      };
      await reservaClaseService.create(reserva);
      alert('Clase reservada exitosamente');
      loadData();
    } catch (error) {
      console.error('Error reservando clase:', error);
      alert('Error al reservar la clase');
    }
  };

  const handleCancelarReserva = async (reserva) => {
    if (!window.confirm('¿Está seguro de cancelar esta reserva?')) return;
    try {
      await reservaClaseService.update(reserva.idReserva, { ...reserva, estado: 'Cancelada' });
      alert('Reserva cancelada exitosamente');
      loadData();
    } catch (error) {
      console.error('Error cancelando reserva:', error);
      alert('Error al cancelar la reserva');
    }
  };

  const handleFoodSearch = async (input) => {
    try {

      // Si es foto
      if (input instanceof File) {
        const detectados = await detectarConLogMeal(input);

        if (detectados.length === 0) {
          alert("No se detectaron alimentos en la imagen");
          return;
        }

        const alimentoDetectado = detectados[0];
        setFoodSearch(alimentoDetectado);

        const response = await foodDataService.search(alimentoDetectado);
        setFoodResults(response.data?.foods || []);
        return;
      }

      // Si es búsqueda por texto
      if (!foodSearch.trim()) return;

      const response = await foodDataService.search(foodSearch);
      setFoodResults(response.data?.foods || []);

    } catch (error) {
      console.error("Error en handleFoodSearch:", error);
      alert("Error al procesar la búsqueda");
    }
  };


  const handleDetectarImagen = async (imageFile) => {
    try {
      const alimentos = await detectarConLogMeal(imageFile);

      if (!alimentos || alimentos.length === 0) {
        alert("No se detectaron alimentos en la imagen");
        setAlimentosDetectados([]);
        return;
      }

      // Guardar todos los alimentos detectados para mostrarlos como botones
      setAlimentosDetectados(alimentos);

      // Limpiar búsqueda anterior
      setFoodResults([]);
      setFoodSearch('');


    } catch (err) {
      console.error("Error al detectar:", err);
      setAlimentosDetectados([]);
    }
  };

  const handleSeleccionarAlimento = async (alimento) => {
    try {
      // Actualiza el input
      setFoodSearch(alimento);

      // Ejecuta búsqueda USDA
      const response = await foodDataService.search(alimento);
      setFoodResults(response.data?.foods || []);
    } catch (error) {
      console.error("Error al buscar alimento:", error);

      if (error.response?.status === 403) {
        alert("Error de autenticación. Por favor, inicia sesión nuevamente.");
      } else if (error.response?.status === 404) {
        alert("No se encontró información para este alimento.");
        setFoodResults([]);
      } else {
        alert("Error al buscar el alimento. Por favor, intenta nuevamente.");
      }
    }
  };


  const handleRegistrarAlimento = (food, cantidad = 100) => {
    // Los valores de USDA son por 100g, calculamos proporcionalmente
    const factor = cantidad / 100;

    const alimento = {
      id: Date.now(),
      nombre: food.description,
      cantidad: cantidad,
      calorias: (food.foodNutrients?.find(n => n.nutrientId === 1008)?.value || 0) * factor,
      proteinas: (food.foodNutrients?.find(n => n.nutrientId === 1003)?.value || 0) * factor,
      carbohidratos: (food.foodNutrients?.find(n => n.nutrientId === 1005)?.value || 0) * factor,
      grasas: (food.foodNutrients?.find(n => n.nutrientId === 1004)?.value || 0) * factor,
      fecha: new Date().toISOString().split('T')[0]
    };
    setAlimentosConsumidos([...alimentosConsumidos, alimento]);
    setFoodResults([]);
    setFoodSearch('');
  };

  const handleEnviarMensaje = async () => {
    if (!alumno || !miEntrenador?.usuario) return;
    try {
      const mensaje = {
        remitente: { idUsuario: user.idUsuario },
        destinatario: { idUsuario: miEntrenador.usuario.idUsuario },
        asunto: formData.asunto || 'Mensaje',
        contenido: formData.contenido,
        leido: false
      };
      await mensajeService.create(mensaje);
      alert('Mensaje enviado exitosamente');
      setShowModal(false);
      setFormData({});
      loadData();
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      alert('Error al enviar el mensaje');
    }
  };

  const handleEnviarFeedback = async () => {
    if (!alumno || !miEntrenador) return;
    try {
      const incidencia = {
        alumno: { idAlumno: alumno.idAlumno },
        instructor: { idInstructor: miEntrenador.idInstructor },
        tipoIncidencia: formData.tipo || 'Feedback',
        descripcion: formData.descripcion,
        fechaIncidencia: new Date().toISOString().split('T')[0],
        estado: 'Abierta'
      };
      await incidenciaService.create(incidencia);
      alert('Feedback enviado exitosamente');
      setShowModal(false);
      setFormData({});
      loadData();
    } catch (error) {
      console.error('Error enviando feedback:', error);
      alert('Error al enviar el feedback');
    }
  };

  const handleMarcarMensajeLeido = async (mensaje) => {
    try {
      await mensajeService.marcarLeido(mensaje.idMensaje);
      loadData();
    } catch (error) {
      console.error('Error marcando mensaje:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'perfil') {
        await alumnoService.update(alumno.idAlumno, formData);
        alert('Perfil actualizado exitosamente');
      } else if (modalType === 'mensaje') {
        await handleEnviarMensaje();
        return;
      } else if (modalType === 'feedback') {
        await handleEnviarFeedback();
        return;
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Error guardando:', error);
      alert('Error al guardar los datos');
    }
  };

  const membresiaActiva = membresias.find(m => m.estado === 'Activa');
  const planActivo = planes.find(p => p.estado === 'Activo');

  const renderModal = () => {
    if (!showModal) return null;

    const modalTitle = {
      'verRutina': 'Mi Rutina - ' + selectedDia,
      'perfil': 'Editar Perfil',
      'mensaje': 'Enviar Mensaje a mi Entrenador',
      'feedback': 'Enviar Feedback'
    }[modalType] || '';

    return (
      <div className="modal" onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{modalTitle}</h3>
            <button className="close-button" onClick={() => setShowModal(false)}>✕</button>
          </div>
          {modalType === 'verRutina' && (
            <RutinaModal
              rutina={selectedRutina}
              selectedDia={selectedDia}
              setSelectedDia={setSelectedDia}
              ejerciciosRutina={ejerciciosRutina}
              onMarcarCompletado={handleMarcarCompletado}
              onClose={() => setShowModal(false)}
            />
          )}
          {modalType === 'perfil' && (
            <PerfilModal
              alumno={alumno}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          )}
          {modalType === 'mensaje' && (
            <MensajeModal
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          )}
          {modalType === 'feedback' && (
            <FeedbackModal
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content" style={{ paddingTop: '20px' }}>
        <div className="tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            Resumen
          </button>
          <button className={`tab ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>
            Mi Perfil
          </button>
          <button className={`tab ${activeTab === 'rutinas' ? 'active' : ''}`} onClick={() => setActiveTab('rutinas')}>
            Rutinas
          </button>
          <button className={`tab ${activeTab === 'progreso' ? 'active' : ''}`} onClick={() => setActiveTab('progreso')}>
            Mi Progreso
          </button>
          <button className={`tab ${activeTab === 'nutricion' ? 'active' : ''}`} onClick={() => setActiveTab('nutricion')}>
            Nutrición
          </button>
          <button className={`tab ${activeTab === 'clases' ? 'active' : ''}`} onClick={() => setActiveTab('clases')}>
            Clases
          </button>
          <button className={`tab ${activeTab === 'membresia' ? 'active' : ''}`} onClick={() => setActiveTab('membresia')}>
            Membresía
          </button>
          <button className={`tab ${activeTab === 'comunicacion' ? 'active' : ''}`} onClick={() => setActiveTab('comunicacion')}>
            Comunicación
          </button>
          <button className={`tab ${activeTab === 'promociones' ? 'active' : ''}`} onClick={() => setActiveTab('promociones')}>
            Promociones
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            {alumno && (
              <div className="profile-section">
                <h2>Mi Resumen</h2>
                <div className="profile-info">
                  <br />
                  <p><strong>Nombre:</strong> {alumno.nameAlumno} {alumno.apellidosAlumno}</p>
                  <br />
                  <p><strong>Membresía:</strong> {membresiaActiva ?
                    `Activa hasta ${new Date(membresiaActiva.fechaFin).toLocaleDateString()}` :
                    'Sin membresía activa'}</p>
                  <br />
                  {miEntrenador && (
                    <p><strong>Mi Entrenador:</strong> {miEntrenador.namaInstructor} {miEntrenador.apellidosInstructor}</p>
                  )}
                </div>
              </div>
            )}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Rutinas Activas</h3>
                <p className="stat-number">{rutinas.filter(r => r.activa).length}</p>
              </div>
              <div className="stat-card">
                <h3>Plan Nutricional</h3>
                <p className="stat-number">{planActivo ? 'Activo' : 'No'}</p>
              </div>
              <div className="stat-card">
                <h3>Clases Reservadas</h3>
                <p className="stat-number">{reservas.filter(r => r.estado === 'Reservada' || r.estado === 'Confirmada').length}</p>
              </div>
              <div className="stat-card">
                <h3>Mensajes Nuevos</h3>
                <p className="stat-number">{mensajes.filter(m => !m.leido).length}</p>
              </div>
            </div>
          </>
        )
        }

        {
          activeTab === 'perfil' && (
            <PerfilTab
              alumno={alumno}
              onEdit={handleEditPerfil}
              onChangePassword={() => setShowPasswordModal(true)}
            />
          )
        }

        {
          activeTab === 'rutinas' && (
            <RutinasTab rutinas={rutinas} onViewRutina={handleViewRutina} />
          )
        }

        {
          activeTab === 'progreso' && (
            <ProgresoTab seguimientos={seguimientos} />
          )
        }

        {
          activeTab === 'nutricion' && (
            <NutricionTab
              planActivo={planActivo}
              foodSearch={foodSearch}
              setFoodSearch={setFoodSearch}
              foodResults={foodResults}
              alimentosConsumidos={alimentosConsumidos}
              alimentosDetectados={alimentosDetectados}
              onSearch={handleFoodSearch}
              onRegistrarAlimento={handleRegistrarAlimento}
              onDetectarImagen={handleDetectarImagen}
              onSeleccionarAlimento={handleSeleccionarAlimento}
            />

          )
        }

        {
          activeTab === 'clases' && (
            <ClasesTab
              clases={clases}
              reservas={reservas}
              onReservar={handleReservarClase}
              onCancelar={handleCancelarReserva}
            />
          )
        }

        {
          activeTab === 'membresia' && (
            <MembresiaTab membresiaActiva={membresiaActiva} pagos={pagos} />
          )
        }

        {
          activeTab === 'comunicacion' && (
            <ComunicacionTab
              miEntrenador={miEntrenador}
              mensajes={mensajes}
              onEnviarMensaje={() => {
                setModalType('mensaje');
                setFormData({});
                setShowModal(true);
              }}
              onEnviarFeedback={() => {
                setModalType('feedback');
                setFormData({});
                setShowModal(true);
              }}
              onMarcarLeido={handleMarcarMensajeLeido}
            />
          )
        }

        {
          activeTab === 'promociones' && (
            <div className="tab-content">
              <h2>Promociones Especiales</h2>
              <PromocionCarousel type="dashboard-usuario" />
            </div>
          )
        }

        {renderModal()}

        {showPasswordModal && user && (
          <ChangePasswordModal
            user={user}
            onClose={() => setShowPasswordModal(false)}
          />
        )}
      </div >
    </div >
  );
};

export default DashboardUsuario;
