package com.micros.trains;

import java.text.ParseException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.micros.trains.controller.trainControl;

@EnableEurekaClient
@SpringBootApplication
public class TrainServiceMdb1Application {

	public static void main(String[] args) {
//		try {
//			new trainControl().modifyTable();
//		} catch (ParseException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		SpringApplication.run(TrainServiceMdb1Application.class, args);
	}

	@Bean
	@LoadBalanced
	public RestTemplate rest() {
		return new RestTemplate();
	}
}
