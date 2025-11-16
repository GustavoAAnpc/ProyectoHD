package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.*;
import com.gimnasio.proyecto.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "http://localhost:3000")
public class PagoController {
    
    private final PagoRepository pagoRepository;
    private final MembresiaRepository membresiaRepository;
    private final AlumnoRepository alumnoRepository;
    private final TipoMembresiaRepository tipoMembresiaRepository;
    
    public PagoController(PagoRepository pagoRepository, 
                          MembresiaRepository membresiaRepository,
                          AlumnoRepository alumnoRepository,
                          TipoMembresiaRepository tipoMembresiaRepository) {
        this.pagoRepository = pagoRepository;
        this.membresiaRepository = membresiaRepository;
        this.alumnoRepository = alumnoRepository;
        this.tipoMembresiaRepository = tipoMembresiaRepository;
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
    public ResponseEntity<?> createPago(@RequestBody Map<String, Object> request) {
        try {
            // Extraer datos del pago
            Pago pago = new Pago();
            
            // Obtener alumno
            Map<String, Object> alumnoMap = (Map<String, Object>) request.get("alumno");
            if (alumnoMap == null || alumnoMap.get("idAlumno") == null) {
                return ResponseEntity.badRequest().body("Alumno es requerido");
            }
            Long idAlumno = ((Number) alumnoMap.get("idAlumno")).longValue();
            Optional<Alumno> alumnoOpt = alumnoRepository.findById(idAlumno);
            if (alumnoOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Alumno no encontrado");
            }
            Alumno alumno = alumnoOpt.get();
            
            // Obtener tipo de membresía
            Map<String, Object> tipoMembresiaMap = (Map<String, Object>) request.get("tipoMembresia");
            if (tipoMembresiaMap == null || tipoMembresiaMap.get("idTipoMembresia") == null) {
                return ResponseEntity.badRequest().body("Tipo de membresía es requerido");
            }
            Long idTipoMembresia = ((Number) tipoMembresiaMap.get("idTipoMembresia")).longValue();
            Optional<TipoMembresia> tipoMembresiaOpt = tipoMembresiaRepository.findById(idTipoMembresia);
            if (tipoMembresiaOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Tipo de membresía no encontrado");
            }
            TipoMembresia tipoMembresia = tipoMembresiaOpt.get();
            
            // Crear la membresía automáticamente
            Membresia membresia = new Membresia();
            membresia.setAlumno(alumno);
            membresia.setTipoMembresia(tipoMembresia);
            
            // Fecha de inicio = fecha de pago
            LocalDate fechaPago = request.get("fechaPago") != null ? 
                LocalDate.parse(request.get("fechaPago").toString()) : 
                LocalDate.now();
            membresia.setFechaInicio(fechaPago);
            
            // Fecha fin = fecha inicio + duración en meses
            Integer duracionMeses = tipoMembresia.getDuracionMeses() != null ? 
                tipoMembresia.getDuracionMeses() : 1;
            membresia.setFechaFin(fechaPago.plusMonths(duracionMeses));
            membresia.setEstado("Activa");
            
            // Guardar la membresía
            membresia = membresiaRepository.save(membresia);
            
            // Crear el pago asociado a la membresía
            pago.setMembresia(membresia);
            pago.setMonto(new java.math.BigDecimal(request.get("monto").toString()));
            pago.setFechaPago(fechaPago);
            pago.setMetodoPago((String) request.get("metodoPago"));
            pago.setComprobante((String) request.get("comprobante"));
            pago.setEstado(request.get("estado") != null ? (String) request.get("estado") : "Pagado");
            
            // Guardar el pago
            Pago pagoGuardado = pagoRepository.save(pago);
            
            return ResponseEntity.ok(pagoGuardado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al crear pago: " + e.getMessage());
        }
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

