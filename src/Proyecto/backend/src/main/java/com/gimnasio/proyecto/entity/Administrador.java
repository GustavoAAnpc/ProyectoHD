package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "administrador", uniqueConstraints = {
    @UniqueConstraint(columnNames = "id_usuario"),
    @UniqueConstraint(columnNames = "dni")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Administrador {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_administrador")
    private Long idAdministrador;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario", nullable = false, unique = true)
    private Usuario usuario;
    
    @Column(name = "name_admin", nullable = false, length = 100)
    private String nameAdmin;
    
    @Column(name = "apellidos_admin", nullable = false, length = 100)
    private String apellidosAdmin;
    
    @Column(name = "dni", nullable = false, unique = true, length = 20)
    private String dni;
}

