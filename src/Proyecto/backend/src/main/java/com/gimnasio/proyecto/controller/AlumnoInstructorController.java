package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.AlumnoInstructor;
import com.gimnasio.proyecto.repository.AlumnoInstructorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumno-instructores")
@CrossOrigin(origins = "http://localhost:3000")
public class AlumnoInstructorController {
    
    private final AlumnoInstructorRepository alumnoInstructorRepository;
    
    public AlumnoInstructorController(AlumnoInstructorRepository alumnoInstructorRepository) {
        this.alumnoInstructorRepository = alumnoInstructorRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<AlumnoInstructor>> getAll() {
        return ResponseEntity.ok(alumnoInstructorRepository.findAll());
    }
    
    @GetMapping("/instructor/{idInstructor}")
    public ResponseEntity<List<AlumnoInstructor>> getByInstructor(@PathVariable Long idInstructor) {
        return ResponseEntity.ok(alumnoInstructorRepository.findByInstructorIdInstructor(idInstructor));
    }
    
    @GetMapping("/alumno/{idAlumno}")
    public ResponseEntity<List<AlumnoInstructor>> getByAlumno(@PathVariable Long idAlumno) {
        return ResponseEntity.ok(alumnoInstructorRepository.findByAlumnoIdAlumno(idAlumno));
    }
    
    @PostMapping
    public ResponseEntity<AlumnoInstructor> create(@RequestBody AlumnoInstructor alumnoInstructor) {
        return ResponseEntity.ok(alumnoInstructorRepository.save(alumnoInstructor));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!alumnoInstructorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        alumnoInstructorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

