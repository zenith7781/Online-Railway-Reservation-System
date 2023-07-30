package com.micros.security1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.micros.security1.entity.JWTRequest;
import com.micros.security1.entity.JWTResponse;
import com.micros.security1.service.userService;
import com.micros.security1.utility.JWTUtility;

@RestController
@CrossOrigin("*")
@RequestMapping("secure")
public class SecurityController {
	
	@Autowired
	private JWTUtility utility;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private userService uservice;

	@GetMapping("/hello")
	public String welcome()
	{
		return "<h3><center>Getting started with Spring security</center></h3>";
	}
	@GetMapping("/helloadmin")
	public String helloadmin()
	{
		return "Only an authorized administrator can see this";
	}
	
	@GetMapping("/hellouser")
	public String hellouser()
	{
		return "<h3><center>Welcome User</center></h3>";
	}
	@PostMapping("/authenticate")
	public JWTResponse verify(@RequestBody JWTRequest request) throws Exception
	{
		try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        UserDetails userDetails = null;
		try {
			userDetails = uservice.loadUserByUsername(request.getUsername());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new Exception ("Wrong Username Vro");
		}

        final String token =
                utility.generateToken(userDetails);

        return  new JWTResponse(token);
    }

}
