package com.gimnasio.proyecto.service;

import com.gimnasio.proyecto.entity.Comentario;
import com.gimnasio.proyecto.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ComentarioService {

    private final ComentarioRepository comentarioRepository;

    @Autowired
    public ComentarioService(ComentarioRepository comentarioRepository) {
        this.comentarioRepository = comentarioRepository;
    }

    /**
     * Obtiene los últimos 10 comentarios (reseñas) para el frontend.
     */
    @Transactional(readOnly = true)
    public List<Comentario> obtenerUltimasResenas() {
        return comentarioRepository.findTop10ByOrderByFechaCreacionDesc();
    }
    
    /**
     * Guarda un nuevo comentario.
     */
    public Comentario guardarComentario(Comentario comentario) {
        return comentarioRepository.save(comentario);
    }
}