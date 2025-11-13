package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.InscripcionClase;
import com.gimnasio.proyecto.repository.InscripcionClaseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inscripciones-clase")
@CrossOrigin(origins = "http://localhost:3000")
public class InscripcionClaseController {
    
    private final InscripcionClaseRepository inscripcionClaseRepository;
    
    public InscripcionClaseController(InscripcionClaseRepository inscripcionClaseRepository) {
        this.inscripcionClaseRepository = inscripcionClaseRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<InscripcionClase>> getAllInscripciones() {
        return ResponseEntity.ok(inscripcionClaseRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<InscripcionClase> getInscripcionById(@PathVariable Long id) {
        Optional<InscripcionClase> inscripcion = inscripcionClaseRepository.findById(id);
        return inscripcion.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<InscripcionClase>> getInscripcionesByAlumno(@PathVariable Long idAlumno) {
        return ResponseEntity.ok(inscripcionClaseRepository.findByAlumnoIdAlumno(idAlumno));
    }
    
    @GetMapping("/clase/{idClase}")
    public ResponseEntity<List<InscripcionClase>> getInscripcionesByClase(@PathVariable Long idClase) {
        return ResponseEntity.ok(inscripcionClaseRepository.findByClaseIdClase(idClase));
    }
    
    @PostMapping
    public ResponseEntity<InscripcionClase> createInscripcion(@RequestBody InscripcionClase inscripcion) {
        return ResponseEntity.ok(inscripcionClaseRepository.save(inscripcion));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<InscripcionClase> updateInscripcion(@PathVariable Long id, @RequestBody InscripcionClase inscripcion) {
        if (!inscripcionClaseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        inscripcion.setIdInscripcion(id);
        return ResponseEntity.ok(inscripcionClaseRepository.save(inscripcion));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscripcion(@PathVariable Long id) {
        if (!inscripcionClaseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        inscripcionClaseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

