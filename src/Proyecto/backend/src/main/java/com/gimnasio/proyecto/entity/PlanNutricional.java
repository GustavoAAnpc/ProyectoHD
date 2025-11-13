package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "plan_nutricional")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanNutricional {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_plan")
    private Long idPlan;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_instructor", nullable = false)
    private Instructor instructor;
    
    @Column(name = "name_plan", nullable = false, length = 100)
    private String namePlan;
    
    @Column(name = "descripcion", length = 1000)
    private String descripcion;
    
    @Column(name = "objetivo", length = 200)
    private String objetivo;
    
    @Column(name = "calorias_diarias")
    private Integer caloriasDiarias;
    
    @Column(name = "notas_personalizacion", length = 500)
    private String notasPersonalizacion;
    
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;
    
    @Column(name = "estado", length = 20)
    private String estado = "Activo";
    
    @PrePersist
    protected void onCreate() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDate.now();
        }
        if (estado == null) {
            estado = "Activo";
        }
    }
}

