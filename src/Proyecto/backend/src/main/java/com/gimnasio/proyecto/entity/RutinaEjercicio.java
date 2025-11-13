package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rutina_ejercicio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RutinaEjercicio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rutina_ejercicio")
    private Long idRutinaEjercicio;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rutina", nullable = false)
    private Rutina rutina;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ejercicio", nullable = false)
    private Ejercicio ejercicio;
    
    @Column(name = "dia_semana", length = 20)
    private String diaSemana; // Lunes, Martes, etc.
    
    @Column(name = "series")
    private Integer series;
    
    @Column(name = "repeticiones", length = 50)
    private String repeticiones; // "10-12" o "8-10-12"
    
    @Column(name = "peso", length = 50)
    private String peso; // "20kg" o "cuerpo"
    
    @Column(name = "tiempo_descanso", length = 20)
    private String tiempoDescanso; // "60 segundos"
    
    @Column(name = "orden")
    private Integer orden;
    
    @Column(name = "completado", nullable = false)
    private Boolean completado = false;
}

