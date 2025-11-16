package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
    List<Mensaje> findByRemitenteIdUsuario(Long idUsuario);
    List<Mensaje> findByDestinatarioIdUsuario(Long idUsuario);
    List<Mensaje> findByDestinatarioIdUsuarioAndLeidoFalse(Long idUsuario);
}

