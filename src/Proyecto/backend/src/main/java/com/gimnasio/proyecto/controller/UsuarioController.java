package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Usuario;
import com.gimnasio.proyecto.entity.Rol;
import com.gimnasio.proyecto.repository.UsuarioRepository;
import com.gimnasio.proyecto.repository.RolRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    
    public UsuarioController(UsuarioRepository usuarioRepository,
                            PasswordEncoder passwordEncoder,
                            RolRepository rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.rolRepository = rolRepository;
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
            // Validar que el nombre de usuario no exista
            String nameUsuario = (String) request.get("nameUsuario");
            if (nameUsuario != null && usuarioRepository.existsByNameUsuario(nameUsuario)) {
                return ResponseEntity.badRequest().body("El nombre de usuario ya está en uso");
            }
            
            // Validar que el email no exista
            String email = (String) request.get("email");
            if (email != null && usuarioRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body("El email ya está registrado");
            }
            
            // Extraer datos del usuario
            Usuario usuario = new Usuario();
            usuario.setNameUsuario(nameUsuario);
            usuario.setEmail(email);
            
            if (request.get("passwordUsuario") != null && !((String) request.get("passwordUsuario")).isEmpty()) {
                usuario.setPasswordUsuario(passwordEncoder.encode((String) request.get("passwordUsuario")));
            } else {
                return ResponseEntity.badRequest().body("La contraseña es requerida");
            }
            
            // Obtener el rol
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
            
            // Guardar solo el usuario básico - las entidades relacionadas se crearán cuando el usuario complete su perfil
            usuario = usuarioRepository.save(usuario);
            
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

