package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.entity.Mensaje;
import com.gimnasio.proyecto.repository.MensajeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mensajes")
@CrossOrigin(origins = "http://localhost:3000")
public class MensajeController {
    
    private final MensajeRepository mensajeRepository;
    
    public MensajeController(MensajeRepository mensajeRepository) {
        this.mensajeRepository = mensajeRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Mensaje>> getAllMensajes() {
        return ResponseEntity.ok(mensajeRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Mensaje> getMensajeById(@PathVariable Long id) {
        Optional<Mensaje> mensaje = mensajeRepository.findById(id);
        return mensaje.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/destinatario/{idUsuario}")
    public ResponseEntity<List<Mensaje>> getMensajesByDestinatario(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(mensajeRepository.findByDestinatarioIdUsuario(idUsuario));
    }
    
    @PostMapping
    public ResponseEntity<Mensaje> createMensaje(@RequestBody Mensaje mensaje) {
        return ResponseEntity.ok(mensajeRepository.save(mensaje));
    }
    
    @PutMapping("/{id}/leido")
    public ResponseEntity<Mensaje> marcarLeido(@PathVariable Long id) {
        Optional<Mensaje> mensajeOpt = mensajeRepository.findById(id);
        if (mensajeOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Mensaje mensaje = mensajeOpt.get();
        mensaje.setLeido(true);
        return ResponseEntity.ok(mensajeRepository.save(mensaje));
    }
}

