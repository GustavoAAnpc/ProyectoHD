import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { 
  alumnoService, instructorService, claseService, 
  sedeService, equipoService, tipoMembresiaService,
  membresiaService, pagoService, usuarioService
} from '../services/api';
import SedesTab from '../components/dashboard/admin/SedesTab';
import EquiposTab from '../components/dashboard/admin/EquiposTab';
import UsuariosTab from '../components/dashboard/admin/UsuariosTab';
import MembresiasTab from '../components/dashboard/admin/MembresiasTab';
import PagosTab from '../components/dashboard/admin/PagosTab';
import ReportesTab from '../components/dashboard/admin/ReportesTab';
import ModalWrapper from '../components/modals/ModalWrapper';
import SedeModal from '../components/modals/admin/SedeModal';
import EquipoModal from '../components/modals/admin/EquipoModal';
import TipoMembresiaModal from '../components/modals/admin/TipoMembresiaModal';
import MembresiaModal from '../components/modals/admin/MembresiaModal';
import PagoModal from '../components/modals/admin/PagoModal';
import UsuarioModal from '../components/modals/admin/UsuarioModal';
import './Dashboard.css';

const DashboardAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [stats, setStats] = useState({
    alumnos: 0, entrenadores: 0, clases: 0, sedes: 0,
    equipos: 0, membresias: 0, ingresos: 0, usuariosActivos: 0
  });
  const [sedes, setSedes] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [tiposMembresia, setTiposMembresia] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const loadData = useCallback(async () => {
    try {
      const [
        alumnosRes, entrenadoresRes, clasesRes, sedesRes, 
        equiposRes, tiposRes, membresiasRes, pagosRes, usuariosRes
      ] = await Promise.all([
        alumnoService.getAll(),
        instructorService.getAll(),
        claseService.getAll(),
        sedeService.getAll(),
        equipoService.getAll(),
        tipoMembresiaService.getAll(),
        membresiaService.getAll(),
        pagoService.getAll(),
        usuarioService.getAll()
      ]);
      
      setSedes(sedesRes.data);
      setEquipos(equiposRes.data);
      setTiposMembresia(tiposRes.data);
      setMembresias(membresiasRes.data);
      setPagos(pagosRes.data);
      setUsuarios(usuariosRes.data);
      setAlumnos(alumnosRes.data);
      setInstructores(entrenadoresRes.data);
      
      const totalIngresos = pagosRes.data.reduce((sum, pago) => sum + parseFloat(pago.monto || 0), 0);
      const usuariosActivos = usuariosRes.data.filter(u => u.estado).length;
      
      setStats({
        alumnos: alumnosRes.data.length,
        entrenadores: entrenadoresRes.data.length,
        clases: clasesRes.data.length,
        sedes: sedesRes.data.length,
        equipos: equiposRes.data.length,
        membresias: membresiasRes.data.length,
        ingresos: totalIngresos,
        usuariosActivos: usuariosActivos
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  }, []);

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

  const handleCreate = (type) => {
    setModalType(type);
    setEditingItem(null);
    setFormData({});
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
      switch(type) {
        case 'sede': await sedeService.delete(id); break;
        case 'equipo': await equipoService.delete(id); break;
        case 'tipoMembresia': await tipoMembresiaService.delete(id); break;
        case 'usuario': await usuarioService.delete(id); break;
      }
      loadData();
    } catch (error) {
      console.error('Error eliminando:', error);
      alert('Error al eliminar el elemento');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch(modalType) {
        case 'sede':
          if (editingItem) {
            await sedeService.update(editingItem.idSede, formData);
          } else {
            await sedeService.create(formData);
          }
          break;
        case 'equipo':
          if (editingItem) {
            await equipoService.update(editingItem.idEquipo, formData);
          } else {
            await equipoService.create(formData);
          }
          break;
        case 'tipoMembresia':
          if (editingItem) {
            await tipoMembresiaService.update(editingItem.idTipoMembresia, formData);
          } else {
            await tipoMembresiaService.create(formData);
          }
          break;
        case 'membresia':
          if (editingItem) {
            await membresiaService.update(editingItem.idMembresia, formData);
          } else {
            await membresiaService.create(formData);
          }
          break;
        case 'pago':
          await pagoService.create(formData);
          break;
        case 'usuario':
          // Validar antes de crear/actualizar
          if (!editingItem) {
            // Validaciones para creación
            if (!formData.nameUsuario || formData.nameUsuario.length < 3) {
              alert('El nombre de usuario debe tener al menos 3 caracteres');
              return;
            }
            if (!formData.passwordUsuario || formData.passwordUsuario.length < 6) {
              alert('La contraseña debe tener al menos 6 caracteres');
              return;
            }
          }
          
          if (editingItem) {
            // Al actualizar, no enviar password si está vacío
            const updateData = { ...formData };
            if (!updateData.passwordUsuario) {
              delete updateData.passwordUsuario;
            }
            await usuarioService.update(editingItem.idUsuario, updateData);
          } else {
            await usuarioService.create(formData);
          }
          break;
      }
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Error guardando:', error);
      const errorMessage = error.response?.data?.message || error.response?.data || error.message || 'Error al guardar los datos';
      alert(errorMessage);
    }
  };

  const handleToggleEstado = async (type, id, estado) => {
    try {
      if (type === 'usuario') {
        await usuarioService.cambiarEstado(id, !estado);
      } else if (type === 'sede') {
        const sede = sedes.find(s => s.idSede === id);
        if (sede) {
          sede.activa = !estado;
          await sedeService.update(id, sede);
        }
      }
      loadData();
    } catch (error) {
      console.error('Error cambiando estado:', error);
    }
  };

  const handleResetPassword = async (id) => {
    const nuevaPassword = prompt('Ingrese la nueva contraseña:');
    if (!nuevaPassword) return;
    try {
      await usuarioService.resetPassword(id, nuevaPassword);
      alert('Contraseña restablecida correctamente');
    } catch (error) {
      console.error('Error restableciendo contraseña:', error);
      alert('Error al restablecer la contraseña');
    }
  };

  const handleExportReport = (type) => {
    alert(`Exportando reporte de ${type}...`);
  };

  const getModalTitle = () => {
    const titles = {
      'sede': editingItem ? 'Editar Sede' : 'Nueva Sede',
      'equipo': editingItem ? 'Editar Equipo' : 'Nuevo Equipo',
      'tipoMembresia': editingItem ? 'Editar Tipo de Membresía' : 'Nuevo Tipo de Membresía',
      'membresia': editingItem ? 'Editar Membresía' : 'Nueva Membresía',
      'pago': 'Registrar Pago',
      'usuario': editingItem ? 'Editar Usuario' : 'Nuevo Usuario'
    };
    return titles[modalType] || '';
  };

  const renderModalContent = () => {
    switch(modalType) {
      case 'sede':
        return <SedeModal formData={formData} setFormData={setFormData} />;
      case 'equipo':
        return <EquipoModal formData={formData} setFormData={setFormData} sedes={sedes} />;
      case 'tipoMembresia':
        return <TipoMembresiaModal formData={formData} setFormData={setFormData} />;
      case 'membresia':
        return <MembresiaModal formData={formData} setFormData={setFormData} alumnos={alumnos} tiposMembresia={tiposMembresia} />;
      case 'pago':
        return <PagoModal formData={formData} setFormData={setFormData} membresias={membresias} />;
      case 'usuario':
        return <UsuarioModal formData={formData} setFormData={setFormData} editingItem={editingItem} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>💪 FORCA & FITNESS - Dashboard Administrador</h1>
        <div className="user-info">
          <ThemeToggle />
          <span>Bienvenido, {user?.nombreCompleto || user?.username}</span>
          <button onClick={() => logout(navigate)} className="logout-button">Cerrar Sesión</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            Resumen
          </button>
          <button className={`tab ${activeTab === 'sedes' ? 'active' : ''}`} onClick={() => setActiveTab('sedes')}>
            Sedes
          </button>
          <button className={`tab ${activeTab === 'equipos' ? 'active' : ''}`} onClick={() => setActiveTab('equipos')}>
            Equipos
          </button>
          <button className={`tab ${activeTab === 'usuarios' ? 'active' : ''}`} onClick={() => setActiveTab('usuarios')}>
            Usuarios
          </button>
          <button className={`tab ${activeTab === 'membresias' ? 'active' : ''}`} onClick={() => setActiveTab('membresias')}>
            Membresías
          </button>
          <button className={`tab ${activeTab === 'pagos' ? 'active' : ''}`} onClick={() => setActiveTab('pagos')}>
            Pagos
          </button>
          <button className={`tab ${activeTab === 'reportes' ? 'active' : ''}`} onClick={() => setActiveTab('reportes')}>
            Reportes
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Usuarios Activos</h3>
                <p className="stat-number">{stats.usuariosActivos}</p>
              </div>
              <div className="stat-card">
                <h3>Clientes</h3>
                <p className="stat-number">{stats.alumnos}</p>
              </div>
              <div className="stat-card">
                <h3>Entrenadores</h3>
                <p className="stat-number">{stats.entrenadores}</p>
              </div>
              <div className="stat-card">
                <h3>Clases</h3>
                <p className="stat-number">{stats.clases}</p>
              </div>
              <div className="stat-card">
                <h3>Sedes</h3>
                <p className="stat-number">{stats.sedes}</p>
              </div>
              <div className="stat-card">
                <h3>Equipos</h3>
                <p className="stat-number">{stats.equipos}</p>
              </div>
              <div className="stat-card">
                <h3>Membresías Activas</h3>
                <p className="stat-number">{stats.membresias}</p>
              </div>
              <div className="stat-card">
                <h3>Ingresos Totales</h3>
                <p className="stat-number">S/ {stats.ingresos.toFixed(2)}</p>
              </div>
            </div>

            <div className="dashboard-sections">
              <section className="dashboard-section">
                <h2>Gestión del Gimnasio</h2>
                <p>Administra sedes, equipos y horarios del gimnasio.</p>
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="btn-primary" onClick={() => handleCreate('sede')}>Nueva Sede</button>
                  <button className="btn-secondary" onClick={() => setActiveTab('equipos')}>Ver Equipos</button>
                </div>
              </section>
              <section className="dashboard-section">
                <h2>Gestión de Usuarios</h2>
                <p>Crear y gestionar cuentas de entrenadores y usuarios. Asignar roles y permisos.</p>
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="btn-primary" onClick={() => handleCreate('usuario')}>Nuevo Usuario</button>
                  <button className="btn-secondary" onClick={() => setActiveTab('usuarios')}>Ver Usuarios</button>
                </div>
              </section>
              <section className="dashboard-section">
                <h2>Membresías y Pagos</h2>
                <p>Crear tipos de membresía, asignar membresías y registrar pagos.</p>
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="btn-primary" onClick={() => handleCreate('tipoMembresia')}>Nuevo Tipo</button>
                  <button className="btn-primary" onClick={() => handleCreate('membresia')}>Asignar Membresía</button>
                </div>
              </section>
              <section className="dashboard-section">
                <h2>Reportes y Estadísticas</h2>
                <p>Genera reportes de ingresos, asistencia y desempeño.</p>
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="btn-secondary" onClick={() => setActiveTab('reportes')}>Ver Reportes</button>
                  <button className="btn-secondary" onClick={() => handleExportReport('ingresos')}>Exportar PDF</button>
                </div>
              </section>
            </div>
          </>
        )}

        {activeTab === 'sedes' && (
          <SedesTab
            sedes={sedes}
            onEdit={(s) => handleEdit('sede', s)}
            onDelete={(id) => handleDelete('sede', id)}
            onToggleEstado={(id, estado) => handleToggleEstado('sede', id, estado)}
            onCreate={() => handleCreate('sede')}
          />
        )}

        {activeTab === 'equipos' && (
          <EquiposTab
            equipos={equipos}
            sedes={sedes}
            onEdit={(e) => handleEdit('equipo', e)}
            onMantenimiento={(e) => {
              const equipoEdit = {...e, estado: 'En Mantenimiento'};
              handleEdit('equipo', equipoEdit);
            }}
            onCreate={() => handleCreate('equipo')}
          />
        )}

        {activeTab === 'usuarios' && (
          <UsuariosTab
            usuarios={usuarios}
            onEdit={(u) => handleEdit('usuario', u)}
            onToggleEstado={(id, estado) => handleToggleEstado('usuario', id, estado)}
            onResetPassword={handleResetPassword}
            onCreate={() => handleCreate('usuario')}
          />
        )}

        {activeTab === 'membresias' && (
          <MembresiasTab
            tiposMembresia={tiposMembresia}
            membresias={membresias}
            alumnos={alumnos}
            tiposActivos={tiposMembresia.filter(t => t.activa)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateTipo={() => handleCreate('tipoMembresia')}
            onCreate={() => handleCreate('membresia')}
          />
        )}

        {activeTab === 'pagos' && (
          <PagosTab
            pagos={pagos}
            membresias={membresias}
            onCreate={() => handleCreate('pago')}
          />
        )}

        {activeTab === 'reportes' && (
          <ReportesTab
            stats={stats}
            pagos={pagos}
            membresias={membresias}
            alumnos={alumnos}
            entrenadores={instructores}
            clases={[]}
            onExport={handleExportReport}
          />
        )}

        {showModal && (
          <ModalWrapper
            title={getModalTitle()}
            onClose={() => setShowModal(false)}
            footer={
              <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
                <button type="button" className="btn-primary" onClick={handleSubmit}>Guardar</button>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            }
          >
            <form onSubmit={handleSubmit}>
              {renderModalContent()}
            </form>
          </ModalWrapper>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
