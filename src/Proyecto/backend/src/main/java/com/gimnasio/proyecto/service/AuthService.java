package com.gimnasio.proyecto.service;

import com.gimnasio.proyecto.config.JwtUtil;
import com.gimnasio.proyecto.dto.LoginRequest;
import com.gimnasio.proyecto.dto.LoginResponse;
import com.gimnasio.proyecto.entity.*;
import com.gimnasio.proyecto.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final AlumnoRepository alumnoRepository;
    private final InstructorRepository instructorRepository;
    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UsuarioRepository usuarioRepository,
            AlumnoRepository alumnoRepository,
            InstructorRepository instructorRepository,
            AdministradorRepository administradorRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.alumnoRepository = alumnoRepository;
        this.instructorRepository = instructorRepository;
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNameUsuario(request.getUsername());

        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPasswordUsuario())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        if (!usuario.getEstado()) {
            throw new RuntimeException("Usuario inactivo");
        }

        String rol = usuario.getRol().getNombreRol().name();
        String nombreCompleto = obtenerNombreCompleto(usuario);
        String token = jwtUtil.generateToken(usuario.getNameUsuario(), usuario.getIdUsuario(), rol);

        return new LoginResponse(
                token,
                "Bearer",
                usuario.getIdUsuario(),
                usuario.getNameUsuario(),
                usuario.getEmail(),
                rol,
                nombreCompleto,
                usuario.getPasswordChanged());
    }

    private String obtenerNombreCompleto(Usuario usuario) {
        String rolNombre = usuario.getRol().getNombreRol().name();

        switch (rolNombre) {
            case "Usuario":
                Optional<Alumno> alumno = alumnoRepository.findByUsuarioIdUsuario(usuario.getIdUsuario());
                if (alumno.isPresent()) {
                    return alumno.get().getNameAlumno() + " " + alumno.get().getApellidosAlumno();
                }
                break;
            case "Entrenador":
                Optional<Instructor> instructor = instructorRepository.findByUsuarioIdUsuario(usuario.getIdUsuario());
                if (instructor.isPresent()) {
                    return instructor.get().getNamaInstructor() + " " + instructor.get().getApellidosInstructor();
                }
                break;
            case "Administrador":
                Optional<Administrador> admin = administradorRepository.findByUsuarioIdUsuario(usuario.getIdUsuario());
                if (admin.isPresent()) {
                    return admin.get().getNameAdmin() + " " + admin.get().getApellidosAdmin();
                }
                break;
        }

        return usuario.getNameUsuario();
    }
}
