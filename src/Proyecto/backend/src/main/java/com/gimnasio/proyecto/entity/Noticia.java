package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "noticia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Noticia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_noticia")
    private Long idNoticia;
    
    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;
    
    @Column(name = "contenido", length = 5000)
    private String contenido;
    
    @Column(name = "tipo", length = 50)
    private String tipo; // Noticia, Evento, Comunicado
    
    @Column(name = "fecha_publicacion", nullable = false)
    private LocalDate fechaPublicacion;
    
    @Column(name = "fecha_evento")
    private LocalDate fechaEvento;
    
    @Column(name = "activa", nullable = false)
    private Boolean activa = true;
    
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;
    
    @PrePersist
    protected void onCreate() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDateTime.now();
        }
        if (fechaPublicacion == null) {
            fechaPublicacion = LocalDate.now();
        }
    }
}

