package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.SeguimientoFisico;
import com.gimnasio.proyecto.repository.SeguimientoFisicoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seguimientos")
@CrossOrigin(origins = "http://localhost:3000")
public class SeguimientoFisicoController {
    
    private final SeguimientoFisicoRepository seguimientoFisicoRepository;
    
    public SeguimientoFisicoController(SeguimientoFisicoRepository seguimientoFisicoRepository) {
        this.seguimientoFisicoRepository = seguimientoFisicoRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<SeguimientoFisico>> getAllSeguimientos() {
        return ResponseEntity.ok(seguimientoFisicoRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SeguimientoFisico> getSeguimientoById(@PathVariable Long id) {
        Optional<SeguimientoFisico> seguimiento = seguimientoFisicoRepository.findById(id);
        return seguimiento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<SeguimientoFisico>> getSeguimientosByAlumno(@PathVariable Long idAlumno) {
        return ResponseEntity.ok(seguimientoFisicoRepository.findByAlumnoIdAlumno(idAlumno));
    }
    
    @PostMapping
    public ResponseEntity<SeguimientoFisico> createSeguimiento(@RequestBody SeguimientoFisico seguimiento) {
        return ResponseEntity.ok(seguimientoFisicoRepository.save(seguimiento));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SeguimientoFisico> updateSeguimiento(@PathVariable Long id, @RequestBody SeguimientoFisico seguimiento) {
        if (!seguimientoFisicoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        seguimiento.setIdSeguimiento(id);
        return ResponseEntity.ok(seguimientoFisicoRepository.save(seguimiento));
    }
}

