package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Administrador;
import com.gimnasio.proyecto.repository.AdministradorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/administradores")
@CrossOrigin(origins = "http://localhost:3000")
public class AdministradorController {

    private final AdministradorRepository administradorRepository;

    public AdministradorController(AdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    @GetMapping
    public ResponseEntity<List<Administrador>> getAllAdministradores() {
        return ResponseEntity.ok(administradorRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrador> getAdministradorById(@PathVariable Long id) {
        Optional<Administrador> administrador = administradorRepository.findById(id);
        return administrador.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Administrador> getAdministradorByUsuario(@PathVariable Long idUsuario) {
        Optional<Administrador> administrador = administradorRepository.findByUsuarioIdUsuario(idUsuario);
        return administrador.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrador> updateAdministrador(@PathVariable Long id,
            @RequestBody Administrador administrador) {
        if (!administradorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        administrador.setIdAdministrador(id);
        return ResponseEntity.ok(administradorRepository.save(administrador));
    }
}
