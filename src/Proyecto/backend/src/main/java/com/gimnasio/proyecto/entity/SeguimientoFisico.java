package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "seguimiento_fisico")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeguimientoFisico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_seguimiento")
    private Long idSeguimiento;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_instructor")
    private Instructor instructor;
    
    @Column(name = "fecha_registro", nullable = false)
    private LocalDate fechaRegistro;
    
    @Column(name = "peso")
    private Double peso;
    
    @Column(name = "altura")
    private Double altura;
    
    @Column(name = "grasa_corporal")
    private Double grasaCorporal;
    
    @Column(name = "musculo")
    private Double musculo;
    
    @Column(name = "medida_pecho")
    private Double medidaPecho;
    
    @Column(name = "medida_cintura")
    private Double medidaCintura;
    
    @Column(name = "medida_cadera")
    private Double medidaCadera;
    
    @Column(name = "medida_brazo")
    private Double medidaBrazo;
    
    @Column(name = "medida_pierna")
    private Double medidaPierna;
    
    @Column(name = "rendimiento", length = 500)
    private String rendimiento;
    
    @Column(name = "notas", length = 1000)
    private String notas;
    
    @PrePersist
    protected void onCreate() {
        if (fechaRegistro == null) {
            fechaRegistro = LocalDate.now();
        }
    }
}

