package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Incidencia;
import com.gimnasio.proyecto.repository.IncidenciaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/incidencias")
@CrossOrigin(origins = "http://localhost:3000")
public class IncidenciaController {
    
    private final IncidenciaRepository incidenciaRepository;
    
    public IncidenciaController(IncidenciaRepository incidenciaRepository) {
        this.incidenciaRepository = incidenciaRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Incidencia>> getAllIncidencias() {
        return ResponseEntity.ok(incidenciaRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Incidencia> getIncidenciaById(@PathVariable Long id) {
        Optional<Incidencia> incidencia = incidenciaRepository.findById(id);
        return incidencia.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<Incidencia>> getIncidenciasByAlumno(@PathVariable Long idAlumno) {
        return ResponseEntity.ok(incidenciaRepository.findByAlumnoIdAlumno(idAlumno));
    }
    
    @GetMapping("/instructor/{idInstructor}")
    public ResponseEntity<List<Incidencia>> getIncidenciasByInstructor(@PathVariable Long idInstructor) {
        return ResponseEntity.ok(incidenciaRepository.findByInstructorIdInstructor(idInstructor));
    }
    
    @PostMapping
    public ResponseEntity<Incidencia> createIncidencia(@RequestBody Incidencia incidencia) {
        return ResponseEntity.ok(incidenciaRepository.save(incidencia));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Incidencia> updateIncidencia(@PathVariable Long id, @RequestBody Incidencia incidencia) {
        if (!incidenciaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        incidencia.setIdIncidencia(id);
        return ResponseEntity.ok(incidenciaRepository.save(incidencia));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncidencia(@PathVariable Long id) {
        if (!incidenciaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        incidenciaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

