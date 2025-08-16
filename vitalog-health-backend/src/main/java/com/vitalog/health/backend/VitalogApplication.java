package com.vitalog.health.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VitalogApplication {

	public static void main(String[] args) {
		SpringApplication.run(VitalogApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(DataProcessingService dataProcessingService) {
		return args -> {
			System.out.println("애플리케이션 시작 시 데이터 로딩을 시작합니다.");
			// API를 호출하는 코드를 여기서 실행하지 않고, 필요할 때만 호출하도록 합니다.
			System.out.println("데이터 로딩 준비 완료!");
		};
	}
}