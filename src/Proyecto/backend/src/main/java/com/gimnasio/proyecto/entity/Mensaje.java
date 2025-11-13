package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "mensaje")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mensaje {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensaje")
    private Long idMensaje;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_remitente", nullable = false)
    private Usuario remitente;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_destinatario", nullable = false)
    private Usuario destinatario;
    
    @Column(name = "asunto", length = 200)
    private String asunto;
    
    @Column(name = "contenido", length = 2000, nullable = false)
    private String contenido;
    
    @Column(name = "leido", nullable = false)
    private Boolean leido = false;
    
    @Column(name = "fecha_envio", nullable = false)
    private LocalDateTime fechaEnvio;
    
    @PrePersist
    protected void onCreate() {
        if (fechaEnvio == null) {
            fechaEnvio = LocalDateTime.now();
        }
        if (leido == null) {
            leido = false;
        }
    }
}

