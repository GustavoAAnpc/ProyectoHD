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
    private final PromocionRepository promocionRepository;

    public PagoController(PagoRepository pagoRepository,
            MembresiaRepository membresiaRepository,
            AlumnoRepository alumnoRepository,
            TipoMembresiaRepository tipoMembresiaRepository,
            PromocionRepository promocionRepository) {
        this.pagoRepository = pagoRepository;
        this.membresiaRepository = membresiaRepository;
        this.alumnoRepository = alumnoRepository;
        this.tipoMembresiaRepository = tipoMembresiaRepository;
        this.promocionRepository = promocionRepository;
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

            // Variables para la membresía
            TipoMembresia tipoMembresiaAUsar;
            Integer duracionMeses;
            java.math.BigDecimal montoCalculado;

            // Verificar si hay promoción
            Map<String, Object> promocionMap = (Map<String, Object>) request.get("promocion");
            if (promocionMap != null && promocionMap.get("idPromocion") != null) {
                // HAY PROMOCIÓN: Usar lógica especial
                Long idPromocion = ((Number) promocionMap.get("idPromocion")).longValue();

                // Buscar la promoción
                Optional<Promocion> promocionOpt = promocionRepository.findById(idPromocion);
                if (promocionOpt.isEmpty()) {
                    return ResponseEntity.badRequest().body("Promoción no encontrada");
                }
                Promocion promocion = promocionOpt.get();
                Integer mesesPromocion = promocion.getDuracionMeses() != null ? promocion.getDuracionMeses() : 1;

                // PRIORIDAD 1: Buscar membresía que coincida exactamente con la duración de la
                // promoción
                // Ejemplo: Promoción de 12 meses -> buscar membresía anual (12 meses)
                Optional<TipoMembresia> membresiaCoincidente = tipoMembresiaRepository.findAll().stream()
                        .filter(t -> t.getActiva() && t.getDuracionMeses() != null
                                && t.getDuracionMeses().equals(mesesPromocion))
                        .findFirst();

                if (membresiaCoincidente.isPresent()) {
                    // Caso 1: Existe membresía con la misma duración (ej: anual, semestral,
                    // trimestral)
                    TipoMembresia membresiaExacta = membresiaCoincidente.get();
                    java.math.BigDecimal precioMembresia = membresiaExacta.getPrecio();

                    // Aplicar descuento de la promoción
                    java.math.BigDecimal descuento = promocion.getDescuentoPorcentaje();
                    java.math.BigDecimal factorDescuento = java.math.BigDecimal.ONE
                            .subtract(descuento.divide(new java.math.BigDecimal(100)));
                    montoCalculado = precioMembresia.multiply(factorDescuento);

                    tipoMembresiaAUsar = membresiaExacta;
                    duracionMeses = mesesPromocion;

                } else {
                    // Caso 2: No existe membresía con esa duración -> usar cálculo mensual
                    List<TipoMembresia> tiposMensuales = tipoMembresiaRepository.findAll().stream()
                            .filter(t -> t.getActiva() && t.getDuracionMeses() != null && t.getDuracionMeses() == 1)
                            .toList();

                    if (tiposMensuales.isEmpty()) {
                        return ResponseEntity.badRequest()
                                .body("No existe una membresía mensual activa. Se requiere para aplicar la promoción.");
                    }

                    TipoMembresia membresiaMensual = tiposMensuales.get(0);

                    // Calcular el monto: precio mensual × meses de la promoción
                    java.math.BigDecimal precioMensual = membresiaMensual.getPrecio();
                    java.math.BigDecimal precioBase = precioMensual.multiply(new java.math.BigDecimal(mesesPromocion));

                    // Aplicar descuento
                    java.math.BigDecimal descuento = promocion.getDescuentoPorcentaje();
                    java.math.BigDecimal factorDescuento = java.math.BigDecimal.ONE
                            .subtract(descuento.divide(new java.math.BigDecimal(100)));
                    montoCalculado = precioBase.multiply(factorDescuento);

                    tipoMembresiaAUsar = membresiaMensual;
                    duracionMeses = mesesPromocion;
                }

            } else {
                // NO HAY PROMOCIÓN: Usar lógica normal
                Map<String, Object> tipoMembresiaMap = (Map<String, Object>) request.get("tipoMembresia");
                if (tipoMembresiaMap == null || tipoMembresiaMap.get("idTipoMembresia") == null) {
                    return ResponseEntity.badRequest().body("Tipo de membresía es requerido");
                }
                Long idTipoMembresia = ((Number) tipoMembresiaMap.get("idTipoMembresia")).longValue();
                Optional<TipoMembresia> tipoMembresiaOpt = tipoMembresiaRepository.findById(idTipoMembresia);
                if (tipoMembresiaOpt.isEmpty()) {
                    return ResponseEntity.badRequest().body("Tipo de membresía no encontrado");
                }

                tipoMembresiaAUsar = tipoMembresiaOpt.get();
                duracionMeses = tipoMembresiaAUsar.getDuracionMeses() != null ? tipoMembresiaAUsar.getDuracionMeses()
                        : 1;
                montoCalculado = tipoMembresiaAUsar.getPrecio();
            }

            // Crear la membresía automáticamente
            Membresia membresia = new Membresia();
            membresia.setAlumno(alumno);
            membresia.setTipoMembresia(tipoMembresiaAUsar);

            // Fecha de inicio = fecha de pago
            LocalDate fechaPago = request.get("fechaPago") != null
                    ? LocalDate.parse(request.get("fechaPago").toString())
                    : LocalDate.now();
            membresia.setFechaInicio(fechaPago);

            // Fecha fin = fecha inicio + duración en meses (de la promoción o del tipo de
            // membresía)
            membresia.setFechaFin(fechaPago.plusMonths(duracionMeses));
            membresia.setEstado("Activa");

            // Guardar la membresía
            membresia = membresiaRepository.save(membresia);

            // Crear el pago asociado a la membresía
            pago.setMembresia(membresia);
            pago.setMonto(montoCalculado);
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
