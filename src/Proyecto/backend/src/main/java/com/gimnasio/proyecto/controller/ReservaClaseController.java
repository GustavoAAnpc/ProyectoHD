package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.ReservaClase;
import com.gimnasio.proyecto.repository.ReservaClaseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas-clase")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservaClaseController {
    
    private final ReservaClaseRepository reservaClaseRepository;
    
    public ReservaClaseController(ReservaClaseRepository reservaClaseRepository) {
        this.reservaClaseRepository = reservaClaseRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<ReservaClase>> getAllReservas() {
        return ResponseEntity.ok(reservaClaseRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ReservaClase> getReservaById(@PathVariable Long id) {
        Optional<ReservaClase> reserva = reservaClaseRepository.findById(id);
        return reserva.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<ReservaClase>> getReservasByAlumno(@PathVariable Long idAlumno) {
        return ResponseEntity.ok(reservaClaseRepository.findByAlumnoIdAlumno(idAlumno));
    }
    
    @PostMapping
    public ResponseEntity<ReservaClase> createReserva(@RequestBody ReservaClase reserva) {
        return ResponseEntity.ok(reservaClaseRepository.save(reserva));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ReservaClase> updateReserva(@PathVariable Long id, @RequestBody ReservaClase reserva) {
        if (!reservaClaseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reserva.setIdReserva(id);
        return ResponseEntity.ok(reservaClaseRepository.save(reserva));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        if (!reservaClaseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reservaClaseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

