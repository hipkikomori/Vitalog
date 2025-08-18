package com.vitalog.health.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vitalog.health.dto.HealthDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class HealthService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.service-key}")
    private String serviceKey;

    public List<HealthDTO> getHealthData() {
        try {
            // API URL. 서비스 키를 URL에 포함하지 않습니다.
            String apiUrl = "https://api.odcloud.kr/api/15068730/v1/uddi:e57a5dba-bbbf-414e-a5cd-866c48378daa?page=1&perPage=1000";

            // HTTP 헤더를 생성하고 Authorization 키를 추가합니다.
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Infuser " + this.serviceKey);

            // HttpEntity 객체를 생성하여 헤더를 포함시킵니다.
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            // exchange() 메서드를 사용하여 헤더를 포함한 GET 요청을 보냅니다.
            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode dataNode = root.path("data");

            return mapper.readValue(dataNode.toString(), new TypeReference<List<HealthDTO>>() {});

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
