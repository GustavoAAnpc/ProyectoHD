package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Comentario;
import com.gimnasio.proyecto.service.ComentarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "http://localhost:3000") // Permitir peticiones desde React
public class ComentarioController {

    private final ComentarioService comentarioService;

    @Autowired
    public ComentarioController(ComentarioService comentarioService) {
        this.comentarioService = comentarioService;
    }

    /**
     * GET /api/comentarios
     * Obtiene los comentarios recientes.
     */
    @GetMapping
    public ResponseEntity<List<Comentario>> obtenerComentarios() {
        List<Comentario> comentarios = comentarioService.obtenerUltimasResenas();
        return ResponseEntity.ok(comentarios);
    }
    
    /**
     * POST /api/comentarios
     * Crea un nuevo comentario.
     */
    @PostMapping
    public ResponseEntity<?> crearComentario(@Valid @RequestBody Comentario comentario, BindingResult result) {
        // Validación de errores
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(err -> 
                errors.put(err.getField(), err.getDefaultMessage()));
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        try {
            Comentario nuevoComentario = comentarioService.guardarComentario(comentario);
            return new ResponseEntity<>(nuevoComentario, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al guardar el comentario: " + e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}