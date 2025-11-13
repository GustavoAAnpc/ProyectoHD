package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Instructor;
import com.gimnasio.proyecto.repository.InstructorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/instructores")
@CrossOrigin(origins = "http://localhost:3000")
public class InstructorController {
    
    private final InstructorRepository instructorRepository;
    
    public InstructorController(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Instructor>> getAllInstructores() {
        return ResponseEntity.ok(instructorRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Instructor> getInstructorById(@PathVariable Long id) {
        Optional<Instructor> instructor = instructorRepository.findById(id);
        return instructor.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Instructor> getInstructorByUsuario(@PathVariable Long idUsuario) {
        Optional<Instructor> instructor = instructorRepository.findByUsuarioIdUsuario(idUsuario);
        return instructor.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}

