package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Rutina;
import com.gimnasio.proyecto.repository.RutinaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rutinas")
@CrossOrigin(origins = "http://localhost:3000")
public class RutinaController {
    
    private final RutinaRepository rutinaRepository;
    
    public RutinaController(RutinaRepository rutinaRepository) {
        this.rutinaRepository = rutinaRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Rutina>> getAllRutinas() {
        return ResponseEntity.ok(rutinaRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Rutina> getRutinaById(@PathVariable Long id) {
        Optional<Rutina> rutina = rutinaRepository.findById(id);
        return rutina.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<Rutina>> getRutinasByAlumno(@PathVariable Long idAlumno) {
        return ResponseEntity.ok(rutinaRepository.findByAlumnoIdAlumno(idAlumno));
    }
    
    @GetMapping("/instructor/{idInstructor}")
    public ResponseEntity<List<Rutina>> getRutinasByInstructor(@PathVariable Long idInstructor) {
        return ResponseEntity.ok(rutinaRepository.findByInstructorIdInstructor(idInstructor));
    }
    
    @PostMapping
    public ResponseEntity<Rutina> createRutina(@RequestBody Rutina rutina) {
        return ResponseEntity.ok(rutinaRepository.save(rutina));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Rutina> updateRutina(@PathVariable Long id, @RequestBody Rutina rutina) {
        if (!rutinaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        rutina.setIdRutina(id);
        return ResponseEntity.ok(rutinaRepository.save(rutina));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRutina(@PathVariable Long id) {
        if (!rutinaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        rutinaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

