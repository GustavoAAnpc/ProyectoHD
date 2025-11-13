package com.gimnasio.proyecto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "instructor", uniqueConstraints = {
    @UniqueConstraint(columnNames = "id_usuario"),
    @UniqueConstraint(columnNames = "dni")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Instructor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_instructor")
    private Long idInstructor;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario", nullable = false, unique = true)
    private Usuario usuario;
    
    @Column(name = "nama_instructor", nullable = false, length = 100)
    private String namaInstructor;
    
    @Column(name = "apellidos_instructor", nullable = false, length = 100)
    private String apellidosInstructor;
    
    @Column(name = "dni", nullable = false, unique = true, length = 20)
    private String dni;
    
    @Column(name = "telefono", length = 20)
    private String telefono;
    
    @Column(name = "especialidad", length = 100)
    private String especialidad;
    
    @Column(name = "fecha_contratacion", nullable = false)
    private LocalDate fechaContratacion;
    
    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private List<AlumnoInstructor> alumnoInstructores;
    
    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private List<Clase> clases;
    
    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private List<PlanNutricional> planesNutricionales;
    
    @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
    private List<Incidencia> incidencias;
    
    @PrePersist
    protected void onCreate() {
        if (fechaContratacion == null) {
            fechaContratacion = LocalDate.now();
        }
    }
}

