package com.gimnasio.proyecto.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class FoodDataService {
    
    private static final String API_KEY = "Z6YXejF1CPprTBPR20OwmAkujIIHL4bOdsqNxcvu";
    private static final String BASE_URL = "https://api.nal.usda.gov/fdc/v1";
    private final RestTemplate restTemplate;
    
    public FoodDataService() {
        this.restTemplate = new RestTemplate();
    }
    
    @SuppressWarnings("unchecked")
    public Map<String, Object> buscarAlimento(String query) {
        try {
            String url = BASE_URL + "/foods/search?api_key=" + API_KEY + "&query=" + query + "&pageSize=10";
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url, 
                HttpMethod.GET, 
                entity, 
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody() != null ? response.getBody() : new HashMap<>();
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al buscar alimento: " + e.getMessage());
            return error;
        }
    }
    
    @SuppressWarnings("unchecked")
    public Map<String, Object> obtenerDetalleAlimento(Long fdcId) {
        try {
            String url = BASE_URL + "/food/" + fdcId + "?api_key=" + API_KEY;
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url, 
                HttpMethod.GET, 
                entity, 
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody() != null ? response.getBody() : new HashMap<>();
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener detalle del alimento: " + e.getMessage());
            return error;
        }
    }
}
