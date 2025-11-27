package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "promocion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Promocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_promocion")
    private Long idPromocion;

    @Column(name = "nombre", nullable = false, length = 200)
    private String nombre;

    @Column(name = "descripcion", length = 1000)
    private String descripcion;

    @Column(name = "descuento_porcentaje", nullable = false, precision = 5, scale = 2)
    private BigDecimal descuentoPorcentaje;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Column(name = "activa", nullable = false)
    private Boolean activa = true;

    @Column(name = "mostrar_en_web", nullable = false)
    private Boolean mostrarEnWeb = true;

    @Column(name = "mostrar_en_dashboard_usuario", nullable = false)
    private Boolean mostrarEnDashboardUsuario = true;

    @Column(name = "mostrar_en_dashboard_entrenador", nullable = false)
    private Boolean mostrarEnDashboardEntrenador = true;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion;

    @PrePersist
    protected void onCreate() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDate.now();
        }
    }
}
