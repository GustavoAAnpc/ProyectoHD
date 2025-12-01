import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  instructorService, claseService, planNutricionalService,
  alumnoService, rutinaService, ejercicioService,
  seguimientoFisicoService, alumnoInstructorService,
  rutinaEjercicioService, mensajeService, foodDataService
} from '../services/api';
import ClientesTab from '../components/dashboard/entrenador/ClientesTab';
import RutinasTab from '../components/dashboard/entrenador/RutinasTab';
import EjerciciosTab from '../components/dashboard/entrenador/EjerciciosTab';
import NutricionTab from '../components/dashboard/entrenador/NutricionTab';
import SeguimientoTab from '../components/dashboard/entrenador/SeguimientoTab';
import ComunicacionTab from '../components/dashboard/entrenador/ComunicacionTab';
import EntrenadorPerfilTab from '../components/dashboard/entrenador/EntrenadorPerfilTab';
import ModalWrapper from '../components/modals/ModalWrapper';
import SeguimientoModal from '../components/modals/entrenador/SeguimientoModal';
import RutinaModal from '../components/modals/entrenador/RutinaModal';
import EjercicioModal from '../components/modals/entrenador/EjercicioModal';
import PlanNutricionalModal from '../components/modals/entrenador/PlanNutricionalModal';
import VerRutinaModal from '../components/modals/entrenador/VerRutinaModal';
import EntrenadorPerfilModal from '../components/modals/entrenador/EntrenadorPerfilModal';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';
import PromocionCarousel from '../components/PromocionCarousel';
import './Dashboard.css';

const DashboardEntrenador = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [instructorId, setInstructorId] = useState(null);
  const [stats, setStats] = useState({
    clases: 0, planes: 0, alumnos: 0, rutinas: 0, seguimientos: 0
  });
  const [clases, setClases] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [clientesAsignados, setClientesAsignados] = useState([]);
  const [rutinas, setRutinas] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [ejerciciosRutina, setEjerciciosRutina] = useState([]);
  const [seguimientos, setSeguimientos] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [selectedDia, setSelectedDia] = useState('');
  const [foodSearch, setFoodSearch] = useState('');
  const [foodResults, setFoodResults] = useState([]);
  const [filterGrupoMuscular, setFilterGrupoMuscular] = useState('');
  const [filterNivel, setFilterNivel] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [instructor, setInstructor] = useState(null);

  // Check if user needs to change password on mount
  useEffect(() => {
    if (user && user.passwordChanged === false) {
      setShowPasswordModal(true);
    }
  }, [user]);

  const loadData = useCallback(async () => {
    try {
      const instructorRes = await instructorService.getByUsuario(user.idUsuario);
      const instructor = instructorRes.data;
      if (instructor?.idInstructor) {
        setInstructorId(instructor.idInstructor);
        setInstructor(instructor);

        const [
          clasesRes, planesRes, clientesRes, rutinasRes,
          ejerciciosRes, seguimientosRes, mensajesRes
        ] = await Promise.all([
          claseService.getByInstructor(instructor.idInstructor),
          planNutricionalService.getByInstructor(instructor.idInstructor),
          alumnoInstructorService.getByInstructor(instructor.idInstructor),
          rutinaService.getByInstructor(instructor.idInstructor),
          ejercicioService.getAll(),
          seguimientoFisicoService.getByInstructor(instructor.idInstructor),
          mensajeService.getByDestinatario(user.idUsuario)
        ]);

        setClases(clasesRes.data);
        setPlanes(planesRes.data);
        setClientesAsignados(clientesRes.data);
        setRutinas(rutinasRes.data);
        setEjercicios(ejerciciosRes.data);
        setSeguimientos(seguimientosRes.data);
        setMensajes(mensajesRes.data);

        setStats({
          clases: clasesRes.data.length,
          planes: planesRes.data.length,
          alumnos: clientesRes.data.length,
          rutinas: rutinasRes.data.length,
          seguimientos: seguimientosRes.data.length
        });
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

  const handleCreate = (type, clienteId = null) => {
    setModalType(type);
    setEditingItem(null);
    const initialData = {};
    if (clienteId) initialData.alumno = { idAlumno: clienteId };
    if (instructorId) initialData.instructor = { idInstructor: instructorId };
    setFormData(initialData);
    setShowModal(true);
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('¿Está seguro de eliminar este elemento?')) return;
    try {
      if (type === 'rutina') await rutinaService.delete(id);
      else if (type === 'ejercicio') await ejercicioService.delete(id);
      loadData();
    } catch (error) {
      console.error('Error eliminando:', error);
      alert('Error al eliminar el elemento');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (modalType) {
        case 'seguimiento':
          if (editingItem) {
            await seguimientoFisicoService.update(editingItem.idSeguimiento, formData);
          } else {
            await seguimientoFisicoService.create(formData);
          }
          break;
        case 'rutina':
          if (editingItem) {
            await rutinaService.update(editingItem.idRutina, formData);
          } else {
            const rutinaRes = await rutinaService.create(formData);
            if (formData.ejercicios?.length > 0) {
              await Promise.all(
                formData.ejercicios.map(ej =>
                  rutinaEjercicioService.create({
                    ...ej,
                    rutina: { idRutina: rutinaRes.data.idRutina }
                  })
                )
              );
            }
          }
          break;
        case 'ejercicio':
          if (editingItem) {
            await ejercicioService.update(editingItem.idEjercicio, formData);
          } else {
            await ejercicioService.create(formData);
          }
          break;
        case 'planNutricional':
          if (editingItem) {
            await planNutricionalService.update(editingItem.idPlan, formData);
          } else {
            await planNutricionalService.create(formData);
          }
          break;
        case 'entrenadorPerfil':
          if (instructor) {
            await instructorService.update(instructor.idInstructor, formData);
            alert('Perfil actualizado exitosamente');
            loadData();
          }
          break;
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Error guardando:', error);
      alert('Error al guardar los datos');
    }
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

  const handleFoodSearch = async () => {
    try {
      const response = await foodDataService.search(foodSearch);
      setFoodResults(response.data.foods || []);
    } catch (error) {
      console.error('Error buscando alimentos:', error);
      alert('Error al buscar alimentos');
    }
  };

  const gruposMusculares = [...new Set(ejercicios.map(e => e.grupoMuscular).filter(Boolean))];
  const niveles = [...new Set(ejercicios.map(e => e.nivel).filter(Boolean))];

  const getModalTitle = () => {
    const titles = {
      'seguimiento': editingItem ? 'Editar Registro de Seguimiento' : 'Nuevo Registro de Seguimiento',
      'rutina': editingItem ? 'Editar Rutina' : 'Nueva Rutina',
      'ejercicio': editingItem ? 'Editar Ejercicio' : 'Nuevo Ejercicio',
      'planNutricional': editingItem ? 'Editar Plan Nutricional' : 'Nuevo Plan Nutricional',
      'ejercicio': editingItem ? 'Editar Ejercicio' : 'Nuevo Ejercicio',
      'planNutricional': editingItem ? 'Editar Plan Nutricional' : 'Nuevo Plan Nutricional',
      'verRutina': 'Ejercicios de la Rutina',
      'entrenadorPerfil': 'Editar Mi Perfil'
    };
    return titles[modalType] || '';
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'seguimiento':
        return (
          <SeguimientoModal
            formData={formData}
            setFormData={setFormData}
            clientesAsignados={clientesAsignados}
            editingItem={editingItem}
          />
        );
      case 'rutina':
        return (
          <RutinaModal
            formData={formData}
            setFormData={setFormData}
            clientesAsignados={clientesAsignados}
          />
        );
      case 'ejercicio':
        return (
          <EjercicioModal
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 'planNutricional':
        return (
          <PlanNutricionalModal
            formData={formData}
            setFormData={setFormData}
            clientesAsignados={clientesAsignados}
          />
        );
      case 'verRutina':
        return (
          <VerRutinaModal
            rutina={selectedRutina}
            ejerciciosRutina={ejerciciosRutina}
            selectedDia={selectedDia}
            setSelectedDia={setSelectedDia}
            onClose={() => setShowModal(false)}
          />
        );
      case 'entrenadorPerfil':
        return <EntrenadorPerfilModal formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content" style={{ paddingTop: '20px' }}>
        <div className="tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            Resumen
          </button>
          <button className={`tab ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>
            Perfil
          </button>
          <button className={`tab ${activeTab === 'clientes' ? 'active' : ''}`} onClick={() => setActiveTab('clientes')}>
            Mis Clientes
          </button>
          <button className={`tab ${activeTab === 'rutinas' ? 'active' : ''}`} onClick={() => setActiveTab('rutinas')}>
            Rutinas
          </button>
          <button className={`tab ${activeTab === 'ejercicios' ? 'active' : ''}`} onClick={() => setActiveTab('ejercicios')}>
            Ejercicios
          </button>
          <button className={`tab ${activeTab === 'nutricion' ? 'active' : ''}`} onClick={() => setActiveTab('nutricion')}>
            Nutrición
          </button>
          <button className={`tab ${activeTab === 'seguimiento' ? 'active' : ''}`} onClick={() => setActiveTab('seguimiento')}>
            Seguimiento
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
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Mis Clientes</h3>
                <p className="stat-number">{stats.alumnos}</p>
              </div>
              <div className="stat-card">
                <h3>Rutinas Activas</h3>
                <p className="stat-number">{stats.rutinas}</p>
              </div>
              <div className="stat-card">
                <h3>Mis Clases</h3>
                <p className="stat-number">{stats.clases}</p>
              </div>
              <div className="stat-card">
                <h3>Planes Nutricionales</h3>
                <p className="stat-number">{stats.planes}</p>
              </div>
              <div className="stat-card">
                <h3>Registros de Seguimiento</h3>
                <p className="stat-number">{stats.seguimientos}</p>
              </div>
              <div className="stat-card">
                <h3>Mensajes</h3>
                <p className="stat-number">{mensajes.filter(m => !m.leido).length}</p>
              </div>
            </div>

            <div className="dashboard-sections">
              <section className="dashboard-section">
                <h2>Gestión de Clientes</h2>
                <p>Ver lista de usuarios asignados y su historial de entrenamientos.</p>
                <button className="btn-primary" onClick={() => setActiveTab('clientes')} style={{ marginTop: '15px' }}>
                  Ver Clientes
                </button>
              </section>
              <section className="dashboard-section">
                <h2>Planificación y Rutinas</h2>
                <p>Crear y asignar rutinas personalizadas con ejercicios específicos.</p>
                <button className="btn-primary" onClick={() => handleCreate('rutina')} style={{ marginTop: '15px' }}>
                  Nueva Rutina
                </button>
              </section>
              <section className="dashboard-section">
                <h2>Seguimiento Nutricional</h2>
                <p>Crear planes alimenticios y ajustar dietas según objetivos.</p>
                <button className="btn-primary" onClick={() => handleCreate('planNutricional')} style={{ marginTop: '15px' }}>
                  Nuevo Plan
                </button>
              </section>
            </div>
          </>
        )}

        {activeTab === 'clientes' && (
          <ClientesTab
            clientesAsignados={clientesAsignados}
            onNuevoRegistro={(id) => handleCreate('seguimiento', id)}
            onViewCliente={() => { }}
          />
        )}

        {activeTab === 'rutinas' && (
          <RutinasTab
            rutinas={rutinas}
            onViewRutina={handleViewRutina}
            onEdit={(r) => handleEdit('rutina', r)}
            onDelete={(id) => handleDelete('rutina', id)}
            onCreate={() => handleCreate('rutina')}
          />
        )}

        {activeTab === 'ejercicios' && (
          <EjerciciosTab
            ejercicios={ejercicios}
            filterGrupoMuscular={filterGrupoMuscular}
            setFilterGrupoMuscular={setFilterGrupoMuscular}
            filterNivel={filterNivel}
            setFilterNivel={setFilterNivel}
            gruposMusculares={gruposMusculares}
            niveles={niveles}
            onEdit={(e) => handleEdit('ejercicio', e)}
            onDelete={(id) => handleDelete('ejercicio', id)}
            onCreate={() => handleCreate('ejercicio')}
          />
        )}

        {activeTab === 'nutricion' && (
          <NutricionTab
            planes={planes}
            foodSearch={foodSearch}
            setFoodSearch={setFoodSearch}
            foodResults={foodResults}
            onSearch={handleFoodSearch}
            onEdit={(p) => handleEdit('planNutricional', p)}
            onCreate={() => handleCreate('planNutricional')}
          />
        )}

        {activeTab === 'seguimiento' && (
          <SeguimientoTab
            seguimientos={seguimientos}
            onEdit={(s) => handleEdit('seguimiento', s)}
            onCreate={() => handleCreate('seguimiento')}
          />
        )}

        {activeTab === 'comunicacion' && (
          <ComunicacionTab mensajes={mensajes} onMarcarLeido={() => { }} />
        )}

        {activeTab === 'promociones' && (
          <div className="tab-content">
            <PromocionCarousel type="dashboard-entrenador" />
          </div>
        )}

        {activeTab === 'perfil' && (
          <EntrenadorPerfilTab
            instructor={instructor}
            onEdit={() => {
              setModalType('entrenadorPerfil');
              setFormData({
                ...instructor,
                email: instructor.usuario?.email || user?.email || ''
              });
              setShowModal(true);
            }}
            onChangePassword={() => setShowPasswordModal(true)}
          />
        )}

        {showModal && (
          <ModalWrapper
            title={getModalTitle()}
            onClose={() => setShowModal(false)}
            showFooter={modalType !== 'verRutina'}
            footer={
              modalType !== 'verRutina' ? (
                <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                  <button type="button" className="btn-primary" onClick={handleSubmit}>Guardar</button>
                  <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              ) : null
            }
          >
            {modalType !== 'verRutina' ? (
              <form onSubmit={handleSubmit}>
                {renderModalContent()}
              </form>
            ) : (
              renderModalContent()
            )}
          </ModalWrapper>
        )}

        {showPasswordModal && user && (
          <ChangePasswordModal
            user={user}
            onClose={() => setShowPasswordModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardEntrenador;
