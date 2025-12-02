package com.gimnasio.proyecto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String tipo = "Bearer";
    private Long idUsuario;
    private String username;
    private String email;
    private String rol;
    private String nombreCompleto;
    private Boolean passwordChanged;
}
