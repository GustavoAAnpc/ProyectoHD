package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "incidencia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Incidencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_incidencia")
    private Long idIncidencia;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_instructor", nullable = false)
    private Instructor instructor;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;
    
    @Column(name = "tipo_incidencia", length = 50)
    private String tipoIncidencia;
    
    @Column(name = "descripcion", length = 1000)
    private String descripcion;
    
    @Column(name = "fecha_incidencia", nullable = false)
    private LocalDate fechaIncidencia;
    
    @Column(name = "estado", length = 20)
    private String estado = "Abierta";
    
    @PrePersist
    protected void onCreate() {
        if (fechaIncidencia == null) {
            fechaIncidencia = LocalDate.now();
        }
        if (estado == null) {
            estado = "Abierta";
        }
    }
}

