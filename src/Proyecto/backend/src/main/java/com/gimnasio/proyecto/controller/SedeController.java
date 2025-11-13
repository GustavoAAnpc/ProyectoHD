package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Sede;
import com.gimnasio.proyecto.repository.SedeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sedes")
@CrossOrigin(origins = "http://localhost:3000")
public class SedeController {
    
    private final SedeRepository sedeRepository;
    
    public SedeController(SedeRepository sedeRepository) {
        this.sedeRepository = sedeRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Sede>> getAllSedes() {
        return ResponseEntity.ok(sedeRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Sede> getSedeById(@PathVariable Long id) {
        Optional<Sede> sede = sedeRepository.findById(id);
        return sede.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Sede> createSede(@RequestBody Sede sede) {
        return ResponseEntity.ok(sedeRepository.save(sede));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Sede> updateSede(@PathVariable Long id, @RequestBody Sede sede) {
        if (!sedeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        sede.setIdSede(id);
        return ResponseEntity.ok(sedeRepository.save(sede));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSede(@PathVariable Long id) {
        if (!sedeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        sedeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

