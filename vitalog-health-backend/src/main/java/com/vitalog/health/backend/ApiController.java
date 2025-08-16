package com.vitalog.health.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {
    private final DataProcessingService dataProcessingService;

    public ApiController(DataProcessingService dataProcessingService) {
        this.dataProcessingService = dataProcessingService;
    }

    @GetMapping("/api/health-data")
    public List<HealthRecord> getHealthData() {
        return dataProcessingService.getHealthData();
    }
}