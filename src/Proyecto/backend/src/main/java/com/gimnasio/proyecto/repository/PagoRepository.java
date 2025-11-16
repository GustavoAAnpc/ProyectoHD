package com.gimnasio.proyecto.repository;

import com.gimnasio.proyecto.entity.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByMembresiaIdMembresia(Long idMembresia);
    List<Pago> findByFechaPagoBetween(LocalDate fechaInicio, LocalDate fechaFin);
    List<Pago> findByEstado(String estado);
}

