package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Equipo;
import com.gimnasio.proyecto.repository.EquipoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/equipos")
@CrossOrigin(origins = "http://localhost:3000")
public class EquipoController {
    
    private final EquipoRepository equipoRepository;
    
    public EquipoController(EquipoRepository equipoRepository) {
        this.equipoRepository = equipoRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Equipo>> getAllEquipos() {
        return ResponseEntity.ok(equipoRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Equipo> getEquipoById(@PathVariable Long id) {
        Optional<Equipo> equipo = equipoRepository.findById(id);
        return equipo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/sede/{idSede}")
    public ResponseEntity<List<Equipo>> getEquiposBySede(@PathVariable Long idSede) {
        return ResponseEntity.ok(equipoRepository.findBySedeIdSede(idSede));
    }
    
    @PostMapping
    public ResponseEntity<Equipo> createEquipo(@RequestBody Equipo equipo) {
        return ResponseEntity.ok(equipoRepository.save(equipo));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Equipo> updateEquipo(@PathVariable Long id, @RequestBody Equipo equipo) {
        if (!equipoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        equipo.setIdEquipo(id);
        return ResponseEntity.ok(equipoRepository.save(equipo));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipo(@PathVariable Long id) {
        if (!equipoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        equipoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

