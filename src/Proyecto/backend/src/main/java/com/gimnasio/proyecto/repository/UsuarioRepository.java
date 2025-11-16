package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNameUsuario(String nameUsuario);
    Optional<Usuario> findByEmail(String email);
    boolean existsByNameUsuario(String nameUsuario);
    boolean existsByEmail(String email);
}

