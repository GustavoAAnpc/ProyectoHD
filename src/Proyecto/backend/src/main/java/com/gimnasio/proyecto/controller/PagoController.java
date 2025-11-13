package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Pago;
import com.gimnasio.proyecto.repository.PagoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "http://localhost:3000")
public class PagoController {
    
    private final PagoRepository pagoRepository;
    
    public PagoController(PagoRepository pagoRepository) {
        this.pagoRepository = pagoRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Pago>> getAllPagos() {
        return ResponseEntity.ok(pagoRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Pago> getPagoById(@PathVariable Long id) {
        Optional<Pago> pago = pagoRepository.findById(id);
        return pago.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/membresia/{idMembresia}")
    public ResponseEntity<List<Pago>> getPagosByMembresia(@PathVariable Long idMembresia) {
        return ResponseEntity.ok(pagoRepository.findByMembresiaIdMembresia(idMembresia));
    }
    
    @PostMapping
    public ResponseEntity<Pago> createPago(@RequestBody Pago pago) {
        return ResponseEntity.ok(pagoRepository.save(pago));
    }
}

