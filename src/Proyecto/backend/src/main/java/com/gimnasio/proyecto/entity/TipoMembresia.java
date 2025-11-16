package com.gimnasio.proyecto.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "tipo_membresia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipoMembresia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_membresia")
    private Long idTipoMembresia;
    
    @Column(name = "nombre", nullable = false, length = 50)
    private String nombre; // Mensual, Anual, Premium, etc.
    
    @Column(name = "descripcion", length = 500)
    private String descripcion;
    
    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Column(name = "duracion_dias")
    private Integer duracionDias;
    
    @Column(name = "activa", nullable = false)
    private Boolean activa = true;
    
    @OneToMany(mappedBy = "tipoMembresia", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Membresia> membresias;
}

