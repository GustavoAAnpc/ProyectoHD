package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "inscripcion_clase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscripcionClase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inscripcion")
    private Long idInscripcion;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_clase", nullable = false)
    private Clase clase;
    
    @Column(name = "fecha_inscripcion", nullable = false)
    private LocalDate fechaInscripcion;
    
    @Column(name = "estado", length = 20)
    private String estado;
    
    @PrePersist
    protected void onCreate() {
        if (fechaInscripcion == null) {
            fechaInscripcion = LocalDate.now();
        }
    }
}

