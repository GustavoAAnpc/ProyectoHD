package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Ejercicio;
import com.gimnasio.proyecto.repository.EjercicioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ejercicios")
@CrossOrigin(origins = "http://localhost:3000")
public class EjercicioController {
    
    private final EjercicioRepository ejercicioRepository;
    
    public EjercicioController(EjercicioRepository ejercicioRepository) {
        this.ejercicioRepository = ejercicioRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Ejercicio>> getAllEjercicios() {
        return ResponseEntity.ok(ejercicioRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Ejercicio> getEjercicioById(@PathVariable Long id) {
        Optional<Ejercicio> ejercicio = ejercicioRepository.findById(id);
        return ejercicio.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/grupo/{grupo}")
    public ResponseEntity<List<Ejercicio>> getEjerciciosByGrupo(@PathVariable String grupo) {
        return ResponseEntity.ok(ejercicioRepository.findByGrupoMuscular(grupo));
    }
    
    @PostMapping
    public ResponseEntity<Ejercicio> createEjercicio(@RequestBody Ejercicio ejercicio) {
        return ResponseEntity.ok(ejercicioRepository.save(ejercicio));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Ejercicio> updateEjercicio(@PathVariable Long id, @RequestBody Ejercicio ejercicio) {
        if (!ejercicioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ejercicio.setIdEjercicio(id);
        return ResponseEntity.ok(ejercicioRepository.save(ejercicio));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEjercicio(@PathVariable Long id) {
        if (!ejercicioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ejercicioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

