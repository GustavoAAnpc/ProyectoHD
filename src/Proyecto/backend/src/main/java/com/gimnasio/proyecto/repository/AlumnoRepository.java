package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    Optional<Alumno> findByUsuarioIdUsuario(Long idUsuario);
    Optional<Alumno> findByDni(String dni);
}

