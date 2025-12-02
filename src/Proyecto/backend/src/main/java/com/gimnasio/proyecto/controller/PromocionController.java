package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Promocion;
import com.gimnasio.proyecto.repository.PromocionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/promociones")
@CrossOrigin(origins = "http://localhost:3000")
public class PromocionController {

    private final PromocionRepository promocionRepository;

    public PromocionController(PromocionRepository promocionRepository) {
        this.promocionRepository = promocionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Promocion>> getAllPromociones() {
        return ResponseEntity.ok(promocionRepository.findAll());
    }

    @GetMapping("/activas")
    public ResponseEntity<List<Promocion>> getPromocionesActivas() {
        return ResponseEntity.ok(promocionRepository.findByActivaTrue());
    }

    @GetMapping("/web")
    public ResponseEntity<List<Promocion>> getPromocionesWeb() {
        try {
            LocalDate hoy = LocalDate.now();
            System.out.println("=== Buscando promociones web para fecha: " + hoy + " ===");
            
            // Primero, obtener todas las promociones que cumplen los criterios básicos
            List<Promocion> todas = promocionRepository.findAll();
            System.out.println("Total de promociones en BD: " + todas.size());
            
            // Filtrar manualmente para tener control total
            List<Promocion> filtradas = todas.stream()
                    .filter(p -> {
                        boolean mostrarEnWeb = p.getMostrarEnWeb() != null && p.getMostrarEnWeb();
                        boolean activa = p.getActiva() != null && p.getActiva();
                        boolean fechaValida = p.getFechaInicio() != null 
                                && p.getFechaFin() != null
                                && !hoy.isBefore(p.getFechaInicio())
                                && !hoy.isAfter(p.getFechaFin());
                        
                        if (mostrarEnWeb && activa) {
                            System.out.println("Promoción: " + p.getNombre() + 
                                    " | mostrarEnWeb: " + mostrarEnWeb + 
                                    " | activa: " + activa + 
                                    " | fechaInicio: " + p.getFechaInicio() + 
                                    " | fechaFin: " + p.getFechaFin() + 
                                    " | fechaValida: " + fechaValida);
                        }
                        
                        return mostrarEnWeb && activa && fechaValida;
                    })
                    .collect(Collectors.toList());
            
            System.out.println("Promociones web válidas encontradas: " + filtradas.size());
            return ResponseEntity.ok(filtradas);
        } catch (Exception e) {
            System.err.println("Error al obtener promociones web: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.ok(new ArrayList<>());
        }
    }

    @GetMapping("/dashboard-usuario")
    public ResponseEntity<List<Promocion>> getPromocionesDashboardUsuario() {
        LocalDate hoy = LocalDate.now();
        return ResponseEntity.ok(promocionRepository
                .findByMostrarEnDashboardUsuarioTrueAndActivaTrueAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(
                        hoy, hoy));
    }

    @GetMapping("/dashboard-entrenador")
    public ResponseEntity<List<Promocion>> getPromocionesDashboardEntrenador() {
        LocalDate hoy = LocalDate.now();
        return ResponseEntity.ok(promocionRepository
                .findByMostrarEnDashboardEntrenadorTrueAndActivaTrueAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(
                        hoy, hoy));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Promocion> getPromocionById(@PathVariable Long id) {
        Optional<Promocion> promocion = promocionRepository.findById(id);
        return promocion.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Promocion> createPromocion(@RequestBody Promocion promocion) {
        return ResponseEntity.ok(promocionRepository.save(promocion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Promocion> updatePromocion(@PathVariable Long id, @RequestBody Promocion promocion) {
        if (!promocionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        promocion.setIdPromocion(id);
        return ResponseEntity.ok(promocionRepository.save(promocion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromocion(@PathVariable Long id) {
        if (!promocionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        promocionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
