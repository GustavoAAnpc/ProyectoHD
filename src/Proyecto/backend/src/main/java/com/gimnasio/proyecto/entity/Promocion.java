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
    
    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;
    
    @Column(name = "descripcion", length = 1000)
    private String descripcion;
    
    @Column(name = "tipo_promocion", length = 50)
    private String tipoPromocion; // 2x1, Descuento, Inscripción Gratuita, etc.
    
    @Column(name = "descuento_porcentaje", precision = 5, scale = 2)
    private BigDecimal descuentoPorcentaje;
    
    @Column(name = "descuento_monto", precision = 10, scale = 2)
    private BigDecimal descuentoMonto;
    
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

