package com.payment.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class PaytmPaymentGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaytmPaymentGatewayApplication.class, args);
	}

}
