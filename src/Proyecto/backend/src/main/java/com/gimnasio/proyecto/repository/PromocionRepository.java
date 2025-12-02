package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PromocionRepository extends JpaRepository<Promocion, Long> {
        List<Promocion> findByActivaTrue();

        List<Promocion> findByMostrarEnWebTrueAndActivaTrueAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(
                        LocalDate fechaActual1, LocalDate fechaActual2);

        List<Promocion> findByMostrarEnDashboardUsuarioTrueAndActivaTrueAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(
                        LocalDate fechaActual1, LocalDate fechaActual2);

        List<Promocion> findByMostrarEnDashboardEntrenadorTrueAndActivaTrueAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(
                        LocalDate fechaActual1, LocalDate fechaActual2);

        List<Promocion> findByFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(LocalDate fechaInicio,
                        LocalDate fechaFin);
}
