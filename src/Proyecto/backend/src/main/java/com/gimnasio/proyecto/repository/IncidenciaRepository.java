package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
    List<Incidencia> findByAlumnoIdAlumno(Long idAlumno);
    List<Incidencia> findByInstructorIdInstructor(Long idInstructor);
}

