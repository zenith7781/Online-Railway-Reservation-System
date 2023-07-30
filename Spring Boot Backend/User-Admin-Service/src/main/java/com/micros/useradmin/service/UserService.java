package com.micros.useradmin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.micros.useradmin.entity.TrainUser;
import com.micros.useradmin.repo.UserRepo;

@Service
public class UserService {

	@Autowired
	private UserRepo urepo;
	
	public TrainUser createUser(TrainUser user)
	{
		return urepo.save(user);
	}
	
	public TrainUser getByEmailId(String email)
	{
		return urepo.getByEmail(email);
	}
	
	public String deleteUserByMail(String email)
	{
		urepo.deleteByEmail(email);
		return "Deleted Successfully";
	}

	public List<TrainUser> duplicates(String email) {
		// TODO Auto-generated method stub
		return urepo.findMultiple(email);
	}
}
