package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.SeguimientoFisico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeguimientoFisicoRepository extends JpaRepository<SeguimientoFisico, Long> {
    List<SeguimientoFisico> findByAlumnoIdAlumno(Long idAlumno);
    List<SeguimientoFisico> findByInstructorIdInstructor(Long idInstructor);
}

