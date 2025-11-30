package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.*;
import com.gimnasio.proyecto.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolRepository rolRepository;
    private final AlumnoRepository alumnoRepository;
    private final InstructorRepository instructorRepository;
    private final com.gimnasio.proyecto.service.NotificationService notificationService;

    public UsuarioController(UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            RolRepository rolRepository,
            AlumnoRepository alumnoRepository,
            InstructorRepository instructorRepository,
            com.gimnasio.proyecto.service.NotificationService notificationService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.rolRepository = rolRepository;
        this.alumnoRepository = alumnoRepository;
        this.instructorRepository = instructorRepository;
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUsuario(@RequestBody Map<String, Object> request) {
        try {
            String nameUsuario = (String) request.get("nameUsuario");
            if (nameUsuario != null && usuarioRepository.existsByNameUsuario(nameUsuario)) {
                return ResponseEntity.badRequest().body("El nombre de usuario ya está en uso");
            }

            String email = (String) request.get("email");
            if (email != null && usuarioRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body("El email ya está registrado");
            }

            String passwordOriginal = (String) request.get("passwordUsuario");
            if (passwordOriginal == null || passwordOriginal.isEmpty()) {
                return ResponseEntity.badRequest().body("La contraseña es requerida");
            }

            Usuario usuario = new Usuario();
            usuario.setNameUsuario(nameUsuario);
            usuario.setEmail(email);
            usuario.setPasswordUsuario(passwordEncoder.encode(passwordOriginal));

            Map<String, Object> rolMap = (Map<String, Object>) request.get("rol");
            if (rolMap != null && rolMap.get("idRol") != null) {
                Long idRol = ((Number) rolMap.get("idRol")).longValue();
                Optional<Rol> rolOpt = rolRepository.findById(idRol);
                if (rolOpt.isPresent()) {
                    usuario.setRol(rolOpt.get());
                } else {
                    return ResponseEntity.badRequest().body("Rol no encontrado");
                }
            } else {
                return ResponseEntity.badRequest().body("Rol es requerido");
            }

            usuario.setEstado(request.get("estado") != null ? (Boolean) request.get("estado") : true);
            usuario.setPasswordChanged(false);

            usuario = usuarioRepository.save(usuario);

            String nombreRol = usuario.getRol().getNombreRol().name();
            String nombreCompleto = (String) request.get("nombreCompleto");

            if (nombreCompleto == null || nombreCompleto.trim().isEmpty()) {
                String nombres = (String) request.get("nombres");
                String apellidos = (String) request.get("apellidos");
                if (nombres != null && apellidos != null) {
                    nombreCompleto = nombres.trim() + " " + apellidos.trim();
                } else {
                    nombreCompleto = nameUsuario;
                }
            }

            if ("Usuario".equals(nombreRol)) {
                if (alumnoRepository.findByUsuarioIdUsuario(usuario.getIdUsuario()).isEmpty()) {
                    Alumno alumno = new Alumno();
                    alumno.setUsuario(usuario);

                    if (nombreCompleto != null && !nombreCompleto.trim().isEmpty()) {
                        String[] partes = nombreCompleto.trim().split("\\s+", 2);
                        alumno.setNameAlumno(partes[0]);
                        alumno.setApellidosAlumno(partes.length > 1 ? partes[1] : "");
                    } else {
                        alumno.setNameAlumno(usuario.getNameUsuario());
                        alumno.setApellidosAlumno("");
                    }

                    // Mapear celular a telefono si viene en el request
                    String celular = (String) request.get("celular");
                    if (celular != null && !celular.trim().isEmpty()) {
                        alumno.setTelefono(celular);
                    }

                    String dniTemporal = "TEMP-" + System.currentTimeMillis() + "-" + usuario.getIdUsuario();
                    alumno.setDni(dniTemporal);
                    alumno.setFechaInscripcion(LocalDate.now());
                    alumno.setEstadoMembresia("Inactivo");
                    alumnoRepository.save(alumno);
                }
            } else if ("Entrenador".equals(nombreRol)) {
                if (instructorRepository.findByUsuarioIdUsuario(usuario.getIdUsuario()).isEmpty()) {
                    Instructor instructor = new Instructor();
                    instructor.setUsuario(usuario);

                    if (nombreCompleto != null && !nombreCompleto.trim().isEmpty()) {
                        String[] partes = nombreCompleto.trim().split("\\s+", 2);
                        instructor.setNamaInstructor(partes[0]);
                        instructor.setApellidosInstructor(partes.length > 1 ? partes[1] : "");
                    } else {
                        instructor.setNamaInstructor(usuario.getNameUsuario());
                        instructor.setApellidosInstructor("");
                    }

                    // Mapear celular a telefono si viene en el request
                    String celular = (String) request.get("celular");
                    if (celular != null && !celular.trim().isEmpty()) {
                        instructor.setTelefono(celular);
                    }

                    String dniTemporal = "TEMP-" + System.currentTimeMillis() + "-" + usuario.getIdUsuario();
                    instructor.setDni(dniTemporal);
                    instructor.setFechaContratacion(LocalDate.now());
                    instructorRepository.save(instructor);
                }
            }

            try {
                notificationService.sendCredentialsEmail(email, nameUsuario, passwordOriginal, nombreCompleto);
            } catch (Exception e) {
                System.err.println("Error al enviar email de credenciales: " + e.getMessage());
                e.printStackTrace();
                return ResponseEntity.ok().body(Map.of(
                        "usuario", usuario,
                        "warning",
                        "Usuario creado correctamente pero no se pudo enviar el email de notificación. Por favor, informe las credenciales manualmente."));
            }

            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al crear usuario: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario usuarioExistente = usuarioOpt.get();
        usuarioExistente.setNameUsuario(usuario.getNameUsuario());
        usuarioExistente.setEmail(usuario.getEmail());
        usuarioExistente.setRol(usuario.getRol());
        usuarioExistente.setEstado(usuario.getEstado());

        if (usuario.getPasswordUsuario() != null && !usuario.getPasswordUsuario().isEmpty()) {
            usuarioExistente.setPasswordUsuario(passwordEncoder.encode(usuario.getPasswordUsuario()));
        }

        return ResponseEntity.ok(usuarioRepository.save(usuarioExistente));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Usuario> cambiarEstado(@PathVariable Long id, @RequestBody Boolean estado) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setEstado(estado);
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @PutMapping("/{id}/reset-password")
    public ResponseEntity<Usuario> resetPassword(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String nuevaPassword = request.get("password");
        if (nuevaPassword == null || nuevaPassword.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setPasswordUsuario(passwordEncoder.encode(nuevaPassword));
        usuario.setPasswordChanged(false);
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        if (currentPassword == null || newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("Contraseña actual y nueva son requeridas");
        }

        Usuario usuario = usuarioOpt.get();

        if (!passwordEncoder.matches(currentPassword, usuario.getPasswordUsuario())) {
            return ResponseEntity.badRequest().body("Contraseña actual incorrecta");
        }

        usuario.setPasswordUsuario(passwordEncoder.encode(newPassword));
        usuario.setPasswordChanged(true);
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
