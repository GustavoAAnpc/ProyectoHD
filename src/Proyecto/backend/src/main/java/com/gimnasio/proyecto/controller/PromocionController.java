package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Promocion;
import com.gimnasio.proyecto.repository.PromocionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/promociones")
@CrossOrigin(origins = "http://localhost:3000")
public class PromocionController {
    
    private final PromocionRepository promocionRepository;
    
    public PromocionController(PromocionRepository promocionRepository) {
        this.promocionRepository = promocionRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Promocion>> getAllPromociones() {
        return ResponseEntity.ok(promocionRepository.findAll());
    }
    
    @GetMapping("/activas")
    public ResponseEntity<List<Promocion>> getPromocionesActivas() {
        return ResponseEntity.ok(promocionRepository.findByActivaTrue());
    }
    
    @GetMapping("/web")
    public ResponseEntity<List<Promocion>> getPromocionesWeb() {
        return ResponseEntity.ok(promocionRepository.findByMostrarEnWebTrueAndActivaTrue());
    }
    
    @GetMapping("/dashboard-usuario")
    public ResponseEntity<List<Promocion>> getPromocionesDashboardUsuario() {
        return ResponseEntity.ok(promocionRepository.findByMostrarEnDashboardUsuarioTrueAndActivaTrue());
    }
    
    @GetMapping("/dashboard-entrenador")
    public ResponseEntity<List<Promocion>> getPromocionesDashboardEntrenador() {
        return ResponseEntity.ok(promocionRepository.findByMostrarEnDashboardEntrenadorTrueAndActivaTrue());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Promocion> getPromocionById(@PathVariable Long id) {
        Optional<Promocion> promocion = promocionRepository.findById(id);
        return promocion.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Promocion> createPromocion(@RequestBody Promocion promocion) {
        return ResponseEntity.ok(promocionRepository.save(promocion));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Promocion> updatePromocion(@PathVariable Long id, @RequestBody Promocion promocion) {
        if (!promocionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        promocion.setIdPromocion(id);
        return ResponseEntity.ok(promocionRepository.save(promocion));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromocion(@PathVariable Long id) {
        if (!promocionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        promocionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

