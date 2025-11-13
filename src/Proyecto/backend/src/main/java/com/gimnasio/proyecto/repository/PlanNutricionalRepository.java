package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.PlanNutricional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanNutricionalRepository extends JpaRepository<PlanNutricional, Long> {
    List<PlanNutricional> findByAlumnoIdAlumno(Long idAlumno);
    List<PlanNutricional> findByInstructorIdInstructor(Long idInstructor);
}

