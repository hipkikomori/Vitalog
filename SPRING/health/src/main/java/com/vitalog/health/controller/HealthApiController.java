package com.vitalog.health.controller;

import com.vitalog.health.dto.HealthDTO;
import com.vitalog.health.service.HealthService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HealthApiController {
    private final HealthService healthService;

    public HealthApiController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/api/health-data")
    public List<HealthDTO> getHealthData() {
        return healthService.getHealthData();
    }
}
