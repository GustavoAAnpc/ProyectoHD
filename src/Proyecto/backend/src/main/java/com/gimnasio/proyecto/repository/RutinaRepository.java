package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Long> {
    List<Rutina> findByAlumnoIdAlumno(Long idAlumno);
    List<Rutina> findByInstructorIdInstructor(Long idInstructor);
    List<Rutina> findByAlumnoIdAlumnoAndActivaTrue(Long idAlumno);
}

