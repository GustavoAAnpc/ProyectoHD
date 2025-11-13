package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.AlumnoInstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlumnoInstructorRepository extends JpaRepository<AlumnoInstructor, Long> {
    List<AlumnoInstructor> findByAlumnoIdAlumno(Long idAlumno);
    List<AlumnoInstructor> findByInstructorIdInstructor(Long idInstructor);
}

