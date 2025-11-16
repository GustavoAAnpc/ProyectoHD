package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rol")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rol {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long idRol;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "nombre_rol", nullable = false, length = 20)
    private NombreRol nombreRol;
    
    public enum NombreRol {
        Administrador,
        Entrenador,
        Usuario
    }
}

