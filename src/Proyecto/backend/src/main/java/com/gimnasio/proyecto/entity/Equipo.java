package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "equipo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Equipo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipo")
    private Long idEquipo;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_sede", nullable = false)
    private Sede sede;
    
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;
    
    @Column(name = "tipo", length = 50)
    private String tipo;
    
    @Column(name = "marca", length = 50)
    private String marca;
    
    @Column(name = "modelo", length = 50)
    private String modelo;
    
    @Column(name = "estado", length = 20)
    private String estado; // Disponible, En Mantenimiento, Fuera de Servicio
    
    @Column(name = "ubicacion", length = 100)
    private String ubicacion;
    
    @Column(name = "fecha_ultimo_mantenimiento")
    private LocalDate fechaUltimoMantenimiento;
    
    @Column(name = "fecha_proximo_mantenimiento")
    private LocalDate fechaProximoMantenimiento;
    
    @Column(name = "notas", length = 500)
    private String notas;
}

