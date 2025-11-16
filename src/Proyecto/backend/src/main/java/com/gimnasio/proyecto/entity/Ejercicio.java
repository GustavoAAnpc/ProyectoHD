package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "ejercicio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ejercicio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ejercicio")
    private Long idEjercicio;
    
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;
    
    @Column(name = "descripcion", length = 1000)
    private String descripcion;
    
    @Column(name = "grupo_muscular", length = 50)
    private String grupoMuscular; // Pecho, Espalda, Piernas, etc.
    
    @Column(name = "nivel", length = 20)
    private String nivel; // Principiante, Intermedio, Avanzado
    
    @Column(name = "video_url", length = 500)
    private String videoUrl;
    
    @Column(name = "imagen_url", length = 500)
    private String imagenUrl;
    
    @OneToMany(mappedBy = "ejercicio", cascade = CascadeType.ALL)
    private List<RutinaEjercicio> rutinaEjercicios;
}

