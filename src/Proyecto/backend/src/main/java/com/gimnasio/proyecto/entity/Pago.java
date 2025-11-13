package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pago")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pago {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pago")
    private Long idPago;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_membresia", nullable = false)
    private Membresia membresia;
    
    @Column(name = "monto", nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;
    
    @Column(name = "fecha_pago", nullable = false)
    private LocalDate fechaPago;
    
    @Column(name = "metodo_pago", length = 50)
    private String metodoPago; // Efectivo, Tarjeta, Transferencia
    
    @Column(name = "comprobante", length = 100)
    private String comprobante;
    
    @Column(name = "estado", length = 20)
    private String estado; // Pagado, Pendiente, Cancelado
    
    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;
    
    @PrePersist
    protected void onCreate() {
        if (fechaRegistro == null) {
            fechaRegistro = LocalDateTime.now();
        }
        if (fechaPago == null) {
            fechaPago = LocalDate.now();
        }
        if (estado == null) {
            estado = "Pagado";
        }
    }
}

