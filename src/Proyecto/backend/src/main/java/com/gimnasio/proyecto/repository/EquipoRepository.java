package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Long> {
    List<Equipo> findBySedeIdSede(Long idSede);
    List<Equipo> findByEstado(String estado);
}

