package com.gimnasio.proyecto.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "alumno", uniqueConstraints = {
    @UniqueConstraint(columnNames = "id_usuario"),
    @UniqueConstraint(columnNames = "dni")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alumno {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alumno")
    private Long idAlumno;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario", nullable = false, unique = true)
    private Usuario usuario;
    
    @Column(name = "name_alumno", nullable = false, length = 100)
    private String nameAlumno;
    
    @Column(name = "apellidos_alumno", nullable = false, length = 100)
    private String apellidosAlumno;
    
    @Column(name = "dni", nullable = false, unique = true, length = 20)
    private String dni;
    
    @Column(name = "telefono", length = 20)
    private String telefono;
    
    @Column(name = "direccion", length = 200)
    private String direccion;
    
    @Column(name = "genero", length = 20)
    private String genero;
    
    @Column(name = "peso_actual")
    private Double pesoActual;
    
    @Column(name = "altura")
    private Double altura;
    
    @Column(name = "fecha_inscripcion", nullable = false)
    private LocalDate fechaInscripcion;
    
    @Column(name = "estado_membresia", nullable = false, length = 20)
    private String estadoMembresia = "Activo";
    
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<AlumnoInstructor> alumnoInstructores;
    
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<InscripcionClase> inscripcionesClases;
    
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PlanNutricional> planesNutricionales;
    
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Incidencia> incidencias;
    
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Membresia> membresias;
    
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Rutina> rutinas;
    
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SeguimientoFisico> seguimientosFisicos;
    
    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ReservaClase> reservasClases;
    
    @PrePersist
    protected void onCreate() {
        if (fechaInscripcion == null) {
            fechaInscripcion = LocalDate.now();
        }
        if (estadoMembresia == null) {
            estadoMembresia = "Activo";
        }
    }
}

