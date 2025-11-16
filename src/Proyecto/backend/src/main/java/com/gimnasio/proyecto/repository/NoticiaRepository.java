package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long> {
    List<Noticia> findByActivaTrueOrderByFechaPublicacionDesc();
    List<Noticia> findByTipoAndActivaTrueOrderByFechaPublicacionDesc(String tipo);
}

