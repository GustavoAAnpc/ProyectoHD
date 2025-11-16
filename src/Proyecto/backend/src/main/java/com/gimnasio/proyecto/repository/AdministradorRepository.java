package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    Optional<Administrador> findByUsuarioIdUsuario(Long idUsuario);
    Optional<Administrador> findByDni(String dni);
}

