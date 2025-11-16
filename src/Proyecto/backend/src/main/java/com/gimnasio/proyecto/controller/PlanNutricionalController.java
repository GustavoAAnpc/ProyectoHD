package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.PlanNutricional;
import com.gimnasio.proyecto.repository.PlanNutricionalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/planes-nutricionales")
@CrossOrigin(origins = "http://localhost:3000")
public class PlanNutricionalController {
    
    private final PlanNutricionalRepository planNutricionalRepository;
    
    public PlanNutricionalController(PlanNutricionalRepository planNutricionalRepository) {
        this.planNutricionalRepository = planNutricionalRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<PlanNutricional>> getAllPlanes() {
        return ResponseEntity.ok(planNutricionalRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PlanNutricional> getPlanById(@PathVariable Long id) {
        Optional<PlanNutricional> plan = planNutricionalRepository.findById(id);
        return plan.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<PlanNutricional>> getPlanesByAlumno(@PathVariable Long idAlumno) {
        return ResponseEntity.ok(planNutricionalRepository.findByAlumnoIdAlumno(idAlumno));
    }
    
    @GetMapping("/instructor/{idInstructor}")
    public ResponseEntity<List<PlanNutricional>> getPlanesByInstructor(@PathVariable Long idInstructor) {
        return ResponseEntity.ok(planNutricionalRepository.findByInstructorIdInstructor(idInstructor));
    }
    
    @PostMapping
    public ResponseEntity<PlanNutricional> createPlan(@RequestBody PlanNutricional plan) {
        return ResponseEntity.ok(planNutricionalRepository.save(plan));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PlanNutricional> updatePlan(@PathVariable Long id, @RequestBody PlanNutricional plan) {
        if (!planNutricionalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        plan.setIdPlan(id);
        return ResponseEntity.ok(planNutricionalRepository.save(plan));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        if (!planNutricionalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        planNutricionalRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

