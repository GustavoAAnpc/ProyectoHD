package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Membresia;
import com.gimnasio.proyecto.repository.MembresiaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/membresias")
@CrossOrigin(origins = "http://localhost:3000")
public class MembresiaController {
    
    private final MembresiaRepository membresiaRepository;
    
    public MembresiaController(MembresiaRepository membresiaRepository) {
        this.membresiaRepository = membresiaRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Membresia>> getAllMembresias() {
        return ResponseEntity.ok(membresiaRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Membresia> getMembresiaById(@PathVariable Long id) {
        Optional<Membresia> membresia = membresiaRepository.findById(id);
        return membresia.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<Membresia>> getMembresiasByAlumno(@PathVariable Long idAlumno) {
        return ResponseEntity.ok(membresiaRepository.findByAlumnoIdAlumno(idAlumno));
    }
    
    @PostMapping
    public ResponseEntity<Membresia> createMembresia(@RequestBody Membresia membresia) {
        return ResponseEntity.ok(membresiaRepository.save(membresia));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Membresia> updateMembresia(@PathVariable Long id, @RequestBody Membresia membresia) {
        if (!membresiaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        membresia.setIdMembresia(id);
        return ResponseEntity.ok(membresiaRepository.save(membresia));
    }
    
    @PutMapping("/{id}/renovar")
    public ResponseEntity<Membresia> renovarMembresia(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        Optional<Membresia> membresiaOpt = membresiaRepository.findById(id);
        if (membresiaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Membresia membresia = membresiaOpt.get();
        Integer diasAdicionales = request.get("diasAdicionales") != null ? 
            ((Number) request.get("diasAdicionales")).intValue() : 
            membresia.getTipoMembresia().getDuracionDias();
        
        membresia.setFechaFin(membresia.getFechaFin().plusDays(diasAdicionales));
        membresia.setEstado("Activa");
        
        return ResponseEntity.ok(membresiaRepository.save(membresia));
    }
    
    @PutMapping("/{id}/suspender")
    public ResponseEntity<Membresia> suspenderMembresia(@PathVariable Long id) {
        Optional<Membresia> membresiaOpt = membresiaRepository.findById(id);
        if (membresiaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Membresia membresia = membresiaOpt.get();
        membresia.setEstado("Suspendida");
        
        return ResponseEntity.ok(membresiaRepository.save(membresia));
    }
    
    @PutMapping("/{id}/activar")
    public ResponseEntity<Membresia> activarMembresia(@PathVariable Long id) {
        Optional<Membresia> membresiaOpt = membresiaRepository.findById(id);
        if (membresiaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Membresia membresia = membresiaOpt.get();
        membresia.setEstado("Activa");
        
        return ResponseEntity.ok(membresiaRepository.save(membresia));
    }
}

