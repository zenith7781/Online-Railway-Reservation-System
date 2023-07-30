package com.micros.gateway2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class SecondApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecondApiGatewayApplication.class, args);
	}

}
