package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name_usuario"),
        @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "name_usuario", nullable = false, unique = true, length = 50)
    private String nameUsuario;

    @Column(name = "password_usuario", nullable = false)
    private String passwordUsuario;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "estado", nullable = false)
    private Boolean estado = true;

    @Column(name = "password_changed", nullable = false)
    private Boolean passwordChanged = false;

    @PrePersist
    protected void onCreate() {
        fechaRegistro = LocalDateTime.now();
        if (estado == null) {
            estado = true;
        }
        if (passwordChanged == null) {
            passwordChanged = false;
        }
    }
}
