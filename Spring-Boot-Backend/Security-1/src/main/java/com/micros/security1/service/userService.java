package com.micros.security1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.micros.security1.entity.Admin;
import com.micros.security1.entity.TrainUser;
import com.micros.security1.repository.AdminRepo;
import com.micros.security1.repository.UserRepository;

@Service
public class userService implements UserDetailsService {

	@Autowired
	private UserRepository urepo;

	@Autowired
	private AdminRepo arepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, NullPointerException {
		String uname = "";
		String passwd = "";
		SimpleGrantedAuthority sga = null;
		if (username.contains("@")) {
			TrainUser trainUser = urepo.getTheUser(username);
			System.out.println(trainUser);
			if (trainUser == null) {
				throw new NullPointerException("Sorry Vro! You aren't allowed");
			}
			uname = trainUser.getEmail();
			passwd = trainUser.getPassword();
			sga = new SimpleGrantedAuthority("USER");
		} else {
			Admin admin = arepo.getTheAdmin(username);
			if (admin == null) {
				throw new NullPointerException("Go away fake admin");
			}
			uname = admin.getAdminUserName();
			passwd = admin.getPassword();
			sga = new SimpleGrantedAuthority("ADMIN");
		}
		return new User(uname, passwd, List.of(sga));
	}

}
