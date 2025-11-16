package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Noticia;
import com.gimnasio.proyecto.repository.NoticiaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/noticias")
@CrossOrigin(origins = "http://localhost:3000")
public class NoticiaController {
    
    private final NoticiaRepository noticiaRepository;
    
    public NoticiaController(NoticiaRepository noticiaRepository) {
        this.noticiaRepository = noticiaRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Noticia>> getAllNoticias() {
        return ResponseEntity.ok(noticiaRepository.findAll());
    }
    
    @GetMapping("/activas")
    public ResponseEntity<List<Noticia>> getNoticiasActivas() {
        return ResponseEntity.ok(noticiaRepository.findByActivaTrueOrderByFechaPublicacionDesc());
    }
    
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Noticia>> getNoticiasByTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(noticiaRepository.findByTipoAndActivaTrueOrderByFechaPublicacionDesc(tipo));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Noticia> getNoticiaById(@PathVariable Long id) {
        Optional<Noticia> noticia = noticiaRepository.findById(id);
        return noticia.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Noticia> createNoticia(@RequestBody Noticia noticia) {
        return ResponseEntity.ok(noticiaRepository.save(noticia));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Noticia> updateNoticia(@PathVariable Long id, @RequestBody Noticia noticia) {
        if (!noticiaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        noticia.setIdNoticia(id);
        return ResponseEntity.ok(noticiaRepository.save(noticia));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoticia(@PathVariable Long id) {
        if (!noticiaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        noticiaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

