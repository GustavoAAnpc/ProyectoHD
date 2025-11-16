package com.gimnasio.proyecto.config;

import com.gimnasio.proyecto.entity.*;
import com.gimnasio.proyecto.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final RolRepository rolRepository;
    private final UsuarioRepository usuarioRepository;
    private final AlumnoRepository alumnoRepository;
    private final InstructorRepository instructorRepository;
    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;
    
    public DataInitializer(RolRepository rolRepository,
                          UsuarioRepository usuarioRepository,
                          AlumnoRepository alumnoRepository,
                          InstructorRepository instructorRepository,
                          AdministradorRepository administradorRepository,
                          PasswordEncoder passwordEncoder) {
        this.rolRepository = rolRepository;
        this.usuarioRepository = usuarioRepository;
        this.alumnoRepository = alumnoRepository;
        this.instructorRepository = instructorRepository;
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // Crear roles si no existen
        if (rolRepository.count() == 0) {
            Rol adminRol = new Rol();
            adminRol.setNombreRol(Rol.NombreRol.Administrador);
            rolRepository.save(adminRol);
            
            Rol entrenadorRol = new Rol();
            entrenadorRol.setNombreRol(Rol.NombreRol.Entrenador);
            rolRepository.save(entrenadorRol);
            
            Rol usuarioRol = new Rol();
            usuarioRol.setNombreRol(Rol.NombreRol.Usuario);
            rolRepository.save(usuarioRol);
        }
        
        // Crear usuario administrador de prueba
        if (!usuarioRepository.existsByNameUsuario("admin")) {
            Rol adminRol = rolRepository.findByNombreRol(Rol.NombreRol.Administrador).orElseThrow();
            
            Usuario adminUsuario = new Usuario();
            adminUsuario.setNameUsuario("admin");
            adminUsuario.setPasswordUsuario(passwordEncoder.encode("admin123"));
            adminUsuario.setEmail("admin@gimnasio.com");
            adminUsuario.setRol(adminRol);
            adminUsuario.setEstado(true);
            adminUsuario.setFechaRegistro(LocalDateTime.now());
            adminUsuario = usuarioRepository.save(adminUsuario);
            
            Administrador admin = new Administrador();
            admin.setUsuario(adminUsuario);
            admin.setNameAdmin("Administrador");
            admin.setApellidosAdmin("Principal");
            admin.setDni("12345678");
            administradorRepository.save(admin);
        }
        
        // Datos de prueba deshabilitados - solo se crean si no hay usuarios en la base de datos
        // Descomentar las siguientes líneas solo para desarrollo inicial
        /*
        // Crear usuario entrenador de prueba
        if (!usuarioRepository.existsByNameUsuario("entrenador")) {
            Rol entrenadorRol = rolRepository.findByNombreRol(Rol.NombreRol.Entrenador).orElseThrow();
            
            Usuario entrenadorUsuario = new Usuario();
            entrenadorUsuario.setNameUsuario("entrenador");
            entrenadorUsuario.setPasswordUsuario(passwordEncoder.encode("entrenador123"));
            entrenadorUsuario.setEmail("entrenador@gimnasio.com");
            entrenadorUsuario.setRol(entrenadorRol);
            entrenadorUsuario.setEstado(true);
            entrenadorUsuario.setFechaRegistro(LocalDateTime.now());
            entrenadorUsuario = usuarioRepository.save(entrenadorUsuario);
            
            Instructor instructor = new Instructor();
            instructor.setUsuario(entrenadorUsuario);
            instructor.setNamaInstructor("Juan");
            instructor.setApellidosInstructor("Pérez");
            instructor.setDni("87654321");
            instructor.setTelefono("987654321");
            instructor.setEspecialidad("Fitness y Musculación");
            instructor.setFechaContratacion(LocalDate.now());
            instructorRepository.save(instructor);
        }
        
        // Crear usuario de prueba
        if (!usuarioRepository.existsByNameUsuario("usuario")) {
            Rol usuarioRol = rolRepository.findByNombreRol(Rol.NombreRol.Usuario).orElseThrow();
            
            Usuario usuarioUsuario = new Usuario();
            usuarioUsuario.setNameUsuario("usuario");
            usuarioUsuario.setPasswordUsuario(passwordEncoder.encode("usuario123"));
            usuarioUsuario.setEmail("usuario@gimnasio.com");
            usuarioUsuario.setRol(usuarioRol);
            usuarioUsuario.setEstado(true);
            usuarioUsuario.setFechaRegistro(LocalDateTime.now());
            usuarioUsuario = usuarioRepository.save(usuarioUsuario);
            
            Alumno alumno = new Alumno();
            alumno.setUsuario(usuarioUsuario);
            alumno.setNameAlumno("Carlos");
            alumno.setApellidosAlumno("García");
            alumno.setDni("11223344");
            alumno.setTelefono("912345678");
            alumno.setDireccion("Av. Principal 123");
            alumno.setGenero("Masculino");
            alumno.setPesoActual(75.5);
            alumno.setAltura(175.0);
            alumno.setFechaInscripcion(LocalDate.now());
            alumno.setEstadoMembresia("Activo");
            alumnoRepository.save(alumno);
        }
        */
    }
}

