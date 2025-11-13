package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "rutina")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rutina {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rutina")
    private Long idRutina;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_instructor", nullable = false)
    private Instructor instructor;
    
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;
    
    @Column(name = "descripcion", length = 1000)
    private String descripcion;
    
    @Column(name = "objetivo", length = 200)
    private String objetivo; // Ganar masa, Bajar grasa, Mantenimiento
    
    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;
    
    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
    
    @Column(name = "activa", nullable = false)
    private Boolean activa = true;
    
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;
    
    @OneToMany(mappedBy = "rutina", cascade = CascadeType.ALL)
    private List<RutinaEjercicio> ejercicios;
    
    @PrePersist
    protected void onCreate() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDate.now();
        }
        if (activa == null) {
            activa = true;
        }
    }
}

