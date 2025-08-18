package com.vitalog.health;

import com.vitalog.health.service.HealthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HealthApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(HealthService healthService) {
		return args -> {
			System.out.println("애플리케이션 시작 시 데이터 로딩을 시작합니다.");
			System.out.println("데이터 로딩 준비 완료!");
		};
	}
}
