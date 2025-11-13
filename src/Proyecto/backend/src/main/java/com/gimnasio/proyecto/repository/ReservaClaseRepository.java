package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.ReservaClase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaClaseRepository extends JpaRepository<ReservaClase, Long> {
    List<ReservaClase> findByAlumnoIdAlumno(Long idAlumno);
    List<ReservaClase> findByClaseIdClase(Long idClase);
    List<ReservaClase> findByEstado(String estado);
}

