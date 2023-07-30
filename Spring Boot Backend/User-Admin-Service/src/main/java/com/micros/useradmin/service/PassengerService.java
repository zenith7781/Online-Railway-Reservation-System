package com.micros.useradmin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.micros.useradmin.entity.Passenger;
import com.micros.useradmin.repo.PassengerRepo;

@Service
public class PassengerService {
	
	@Autowired
	private PassengerRepo prepo;
	
	public String deletePass(int id)
	{
		prepo.deleteById(id);
		return "Deleted Successfully";
	}

	public String deleteAllPass()
	{
		prepo.deleteAll();
		return "All Passengers deleted";
	}
	public Passenger create(Passenger passenger)
	{
		return prepo.save(passenger);
	}
	
	public Passenger fetchwithId(int id)
	{
		return prepo.findById(id).get();
	}

	public List<Passenger> fetchAll() {
		// TODO Auto-generated method stub
		return prepo.findAll();
	}
}
