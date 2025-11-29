package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.AlumnoInstructor;
import com.gimnasio.proyecto.repository.AlumnoInstructorRepository;
import com.gimnasio.proyecto.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumno-instructores")
@CrossOrigin(origins = "http://localhost:3000")
public class AlumnoInstructorController {

    private final AlumnoInstructorRepository alumnoInstructorRepository;
    private final NotificationService notificationService;
    private final com.gimnasio.proyecto.repository.AlumnoRepository alumnoRepository;
    private final com.gimnasio.proyecto.repository.InstructorRepository instructorRepository;

    public AlumnoInstructorController(AlumnoInstructorRepository alumnoInstructorRepository,
            NotificationService notificationService,
            com.gimnasio.proyecto.repository.AlumnoRepository alumnoRepository,
            com.gimnasio.proyecto.repository.InstructorRepository instructorRepository) {
        this.alumnoInstructorRepository = alumnoInstructorRepository;
        this.notificationService = notificationService;
        this.alumnoRepository = alumnoRepository;
        this.instructorRepository = instructorRepository;
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
        AlumnoInstructor saved = alumnoInstructorRepository.save(alumnoInstructor);

        // Enviar notificaciones por correo
        try {
            // Obtener detalles completos del alumno e instructor para tener sus emails y
            // nombres
            com.gimnasio.proyecto.entity.Alumno alumno = alumnoRepository.findById(saved.getAlumno().getIdAlumno())
                    .orElse(null);
            com.gimnasio.proyecto.entity.Instructor instructor = instructorRepository
                    .findById(saved.getInstructor().getIdInstructor()).orElse(null);

            if (alumno != null && instructor != null &&
                    alumno.getUsuario() != null && instructor.getUsuario() != null) {

                String alumnoEmail = alumno.getUsuario().getEmail();
                String alumnoName = alumno.getNameAlumno() + " " + alumno.getApellidosAlumno();

                String instructorEmail = instructor.getUsuario().getEmail();
                String instructorName = instructor.getNamaInstructor() + " " + instructor.getApellidosInstructor();

                notificationService.sendTrainerAssignmentEmail(alumnoEmail, alumnoName, instructorEmail,
                        instructorName);
            }
        } catch (Exception e) {
            // Log error but don't fail the request
            System.err.println("Error al enviar notificaciones de asignación: " + e.getMessage());
        }

        return ResponseEntity.ok(saved);
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
