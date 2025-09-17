package com.tuempresa.proyecto.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        if ("admin".equals(username) && "1234".equals(password)) {
            return ResponseEntity.ok("Login correcto");
        } else {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
        }
    }
}