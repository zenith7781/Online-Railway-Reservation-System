package com.micros.useradmin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.micros.useradmin.entity.Passenger;
import com.micros.useradmin.service.PassengerService;

@RestController
@RequestMapping("passenger")
public class PassengerController {

	@Autowired
	private PassengerService pservice;
	
	@PostMapping("createPassenger")
	public Passenger savePassenger(@RequestBody Passenger passn){
		return pservice.create(passn);
	}
	
	@DeleteMapping("deletePassenger/{id}")
	public String deletePass(@PathVariable("id") int id)
	{
	     String str = pservice.deletePass(id);
	     return str;
	}
	
	@DeleteMapping("/removeAll")
	public String deleteALLPs()
	{
		return pservice.deleteAllPass();
	}
	
	@PutMapping("updatePassenger/{id}")
	public Passenger updatePass(@PathVariable("mobile") int id, @RequestBody Passenger pass1)
	{
		Passenger pass0 = pservice.fetchwithId(id);
		pass0.setPass_name(pass1.getPass_name());
		pass0.setPass_train_class(pass1.getPass_train_class());
		pass0.setPass_mobile(pass1.getPass_mobile());
		pass0.setPass_gender(pass1.getPass_gender());
		pass0.setPass_credit_no(pass0.getPass_credit_no());
		pass0.setPass_bank_name(pass1.getPass_bank_name());
		pass0.setPass_address(pass1.getPass_address());
		pass0.setPass_age(pass1.getPass_age());
		
		return pservice.create(pass0);
	}
	
	@GetMapping("getPassenger/{id}")
	public Passenger getPass(@PathVariable("id") int id)
	{
		return pservice.fetchwithId(id);
	}
	
	@GetMapping("getAll")
	public List<Passenger> findeveryone()
	{
		return pservice.fetchAll();
	}
}
