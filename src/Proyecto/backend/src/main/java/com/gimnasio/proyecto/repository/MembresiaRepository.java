package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Membresia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MembresiaRepository extends JpaRepository<Membresia, Long> {
    List<Membresia> findByAlumnoIdAlumno(Long idAlumno);
    Optional<Membresia> findByAlumnoIdAlumnoAndEstado(Long idAlumno, String estado);
    List<Membresia> findByEstado(String estado);
    List<Membresia> findByFechaFinBefore(LocalDate fecha);
}

