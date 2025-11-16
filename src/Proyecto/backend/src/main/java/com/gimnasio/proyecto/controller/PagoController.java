package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Membresia;
import com.gimnasio.proyecto.entity.Pago;
import com.gimnasio.proyecto.repository.MembresiaRepository;
import com.gimnasio.proyecto.repository.PagoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "http://localhost:3000")
public class PagoController {
    
    private final PagoRepository pagoRepository;
    private final MembresiaRepository membresiaRepository;
    
    public PagoController(PagoRepository pagoRepository, MembresiaRepository membresiaRepository) {
        this.pagoRepository = pagoRepository;
        this.membresiaRepository = membresiaRepository;
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
        // Guardar el pago
        Pago pagoGuardado = pagoRepository.save(pago);
        
        // Si el pago está asociado a una membresía, activarla automáticamente
        if (pagoGuardado.getMembresia() != null && pagoGuardado.getMembresia().getIdMembresia() != null) {
            Optional<Membresia> membresiaOpt = membresiaRepository.findById(pagoGuardado.getMembresia().getIdMembresia());
            if (membresiaOpt.isPresent()) {
                Membresia membresia = membresiaOpt.get();
                // Si la membresía no está activa, activarla
                if (!"Activa".equals(membresia.getEstado())) {
                    membresia.setEstado("Activa");
                    membresiaRepository.save(membresia);
                }
            }
        }
        
        return ResponseEntity.ok(pagoGuardado);
    }
    
    @GetMapping("/{id}/comprobante")
    public ResponseEntity<Map<String, Object>> generarComprobante(@PathVariable Long id) {
        Optional<Pago> pagoOpt = pagoRepository.findById(id);
        if (pagoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Pago pago = pagoOpt.get();
        Map<String, Object> comprobante = new java.util.HashMap<>();
        comprobante.put("idPago", pago.getIdPago());
        comprobante.put("fechaPago", pago.getFechaPago());
        comprobante.put("monto", pago.getMonto());
        comprobante.put("metodoPago", pago.getMetodoPago());
        comprobante.put("cliente", pago.getMembresia().getAlumno().getNameAlumno() + " " + 
                       pago.getMembresia().getAlumno().getApellidosAlumno());
        comprobante.put("membresia", pago.getMembresia().getTipoMembresia().getNombre());
        comprobante.put("numeroComprobante", "COMP-" + String.format("%06d", pago.getIdPago()));
        
        return ResponseEntity.ok(comprobante);
    }
}

