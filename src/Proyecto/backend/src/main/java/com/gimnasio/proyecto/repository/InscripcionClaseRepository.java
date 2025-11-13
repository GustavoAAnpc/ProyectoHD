package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.InscripcionClase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InscripcionClaseRepository extends JpaRepository<InscripcionClase, Long> {
    List<InscripcionClase> findByAlumnoIdAlumno(Long idAlumno);
    List<InscripcionClase> findByClaseIdClase(Long idClase);
}

