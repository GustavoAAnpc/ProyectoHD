package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Usuario;
import com.gimnasio.proyecto.repository.UsuarioRepository;
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
    
    public UsuarioController(UsuarioRepository usuarioRepository,
                            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
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
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        if (usuario.getPasswordUsuario() != null && !usuario.getPasswordUsuario().isEmpty()) {
            usuario.setPasswordUsuario(passwordEncoder.encode(usuario.getPasswordUsuario()));
        }
        return ResponseEntity.ok(usuarioRepository.save(usuario));
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

