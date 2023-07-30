package com.micros.useradmin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@EnableEurekaClient
@SpringBootApplication
public class UserAdminServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserAdminServiceApplication.class, args);
	}

	@Bean
	@LoadBalanced
	public RestTemplate rest()
	{
		return new RestTemplate();
	}
}
