package com.micros.useradmin.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.micros.useradmin.entity.Train;
import com.micros.useradmin.entity.TrainUser;
import com.micros.useradmin.service.UserService;

@RestController
@RequestMapping("users")
public class UserController {

	@Autowired
	private UserService uservice;
	
	@Autowired
	private RestTemplate rest;
	
	@GetMapping("findUserByMail/{email}")
	public TrainUser findbymail(@PathVariable("email") String email)
	{
		return uservice.getByEmailId(email);
	}
	
	@GetMapping("findDuplicateUsers/{email}")
	public List<TrainUser> findDuplicates(@PathVariable("email") String email)
	{
		return uservice.duplicates(email);
	}
	
	@GetMapping("getByStaions/{from}/{to}")
	public List<Train> gettrains(@PathVariable("from") String from, @PathVariable("to") String to)
	{
		ResponseEntity<Train[]> response = 
				rest.getForEntity("http://train-service/trainSearch/getTrainByStations/"+from+"/"+to, Train[].class);
		Train[] trains = response.getBody();
		List<Train> trainList = Arrays.asList(trains);
		
		return trainList;
	}
	
	@PostMapping("createUser")
	public TrainUser saveuser(@RequestBody TrainUser user)
	{
		return uservice.createUser(user);
	}
	
	@PutMapping("updateUserByMail/{email}")
	public TrainUser updateUser(@PathVariable("email") String email, @RequestBody TrainUser user1)
	{
		TrainUser user0 = uservice.getByEmailId(email);
		user0.setEmail(user1.getEmail());
		user0.setPassword(user1.getPassword());
		user0.setPhone(user1.getPhone());
		user0.setName(user1.getName());
		uservice.createUser(user0);
		return user0;
	}
	
	@DeleteMapping("deleteUser/{email}")
	public String deleteUser(@PathVariable("email") String email)
	{
		return uservice.deleteUserByMail(email);
	}
}
