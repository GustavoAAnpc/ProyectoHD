package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.RutinaEjercicio;
import com.gimnasio.proyecto.repository.RutinaEjercicioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rutina-ejercicios")
@CrossOrigin(origins = "http://localhost:3000")
public class RutinaEjercicioController {
    
    private final RutinaEjercicioRepository rutinaEjercicioRepository;
    
    public RutinaEjercicioController(RutinaEjercicioRepository rutinaEjercicioRepository) {
        this.rutinaEjercicioRepository = rutinaEjercicioRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<RutinaEjercicio>> getAll() {
        return ResponseEntity.ok(rutinaEjercicioRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RutinaEjercicio> getById(@PathVariable Long id) {
        Optional<RutinaEjercicio> rutinaEjercicio = rutinaEjercicioRepository.findById(id);
        return rutinaEjercicio.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/rutina/{idRutina}")
    public ResponseEntity<List<RutinaEjercicio>> getByRutina(@PathVariable Long idRutina) {
        return ResponseEntity.ok(rutinaEjercicioRepository.findByRutinaIdRutina(idRutina));
    }
    
    @PostMapping
    public ResponseEntity<RutinaEjercicio> create(@RequestBody RutinaEjercicio rutinaEjercicio) {
        return ResponseEntity.ok(rutinaEjercicioRepository.save(rutinaEjercicio));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RutinaEjercicio> update(@PathVariable Long id, @RequestBody RutinaEjercicio rutinaEjercicio) {
        if (!rutinaEjercicioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        rutinaEjercicio.setIdRutinaEjercicio(id);
        return ResponseEntity.ok(rutinaEjercicioRepository.save(rutinaEjercicio));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!rutinaEjercicioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        rutinaEjercicioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

