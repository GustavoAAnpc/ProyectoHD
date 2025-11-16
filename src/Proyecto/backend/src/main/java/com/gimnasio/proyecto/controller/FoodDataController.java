package com.gimnasio.proyecto.controller;

import com.gimnasio.proyecto.service.FoodDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodDataController {
    
    private final FoodDataService foodDataService;
    
    public FoodDataController(FoodDataService foodDataService) {
        this.foodDataService = foodDataService;
    }
    
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> buscarAlimento(@RequestParam String query) {
        Map<String, Object> resultado = foodDataService.buscarAlimento(query);
        return ResponseEntity.ok(resultado);
    }
    
    @GetMapping("/{fdcId}")
    public ResponseEntity<Map<String, Object>> obtenerDetalleAlimento(@PathVariable Long fdcId) {
        Map<String, Object> resultado = foodDataService.obtenerDetalleAlimento(fdcId);
        return ResponseEntity.ok(resultado);
    }
}

