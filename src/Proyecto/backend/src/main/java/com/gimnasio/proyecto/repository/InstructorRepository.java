package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {
    Optional<Instructor> findByUsuarioIdUsuario(Long idUsuario);
    Optional<Instructor> findByDni(String dni);
}

