package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.TipoMembresia;
import com.gimnasio.proyecto.repository.TipoMembresiaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tipos-membresia")
@CrossOrigin(origins = "http://localhost:3000")
public class TipoMembresiaController {
    
    private final TipoMembresiaRepository tipoMembresiaRepository;
    
    public TipoMembresiaController(TipoMembresiaRepository tipoMembresiaRepository) {
        this.tipoMembresiaRepository = tipoMembresiaRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<TipoMembresia>> getAllTipos() {
        return ResponseEntity.ok(tipoMembresiaRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TipoMembresia> getTipoById(@PathVariable Long id) {
        Optional<TipoMembresia> tipo = tipoMembresiaRepository.findById(id);
        return tipo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<TipoMembresia> createTipo(@RequestBody TipoMembresia tipo) {
        return ResponseEntity.ok(tipoMembresiaRepository.save(tipo));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TipoMembresia> updateTipo(@PathVariable Long id, @RequestBody TipoMembresia tipo) {
        if (!tipoMembresiaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        tipo.setIdTipoMembresia(id);
        return ResponseEntity.ok(tipoMembresiaRepository.save(tipo));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipo(@PathVariable Long id) {
        if (!tipoMembresiaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        tipoMembresiaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

