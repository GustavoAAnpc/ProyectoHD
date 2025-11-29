package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    
    // Obtener los 10 comentarios más recientes
    List<Comentario> findTop10ByOrderByFechaCreacionDesc();
}