package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Clase;
import com.gimnasio.proyecto.repository.ClaseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clases")
@CrossOrigin(origins = "http://localhost:3000")
public class ClaseController {
    
    private final ClaseRepository claseRepository;
    
    public ClaseController(ClaseRepository claseRepository) {
        this.claseRepository = claseRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Clase>> getAllClases() {
        return ResponseEntity.ok(claseRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Clase> getClaseById(@PathVariable Long id) {
        Optional<Clase> clase = claseRepository.findById(id);
        return clase.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/instructor/{idInstructor}")
    public ResponseEntity<List<Clase>> getClasesByInstructor(@PathVariable Long idInstructor) {
        return ResponseEntity.ok(claseRepository.findByInstructorIdInstructor(idInstructor));
    }
    
    @PostMapping
    public ResponseEntity<Clase> createClase(@RequestBody Clase clase) {
        return ResponseEntity.ok(claseRepository.save(clase));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Clase> updateClase(@PathVariable Long id, @RequestBody Clase clase) {
        if (!claseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        clase.setIdClase(id);
        return ResponseEntity.ok(claseRepository.save(clase));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClase(@PathVariable Long id) {
        if (!claseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        claseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

