package com.micros.security1.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

import com.micros.security1.filter.JWTFilter;
import com.micros.security1.service.userService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private userService uservice;

	@Autowired
	private JWTFilter jwtfilter;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// TODO Auto-generated method stub
		auth.userDetailsService(uservice);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		// TODO Auto-generated method stub
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests().antMatchers("/users").hasAnyAuthority("USER", "ADMIN")
				.antMatchers("/adminSearch").hasAuthority("ADMIN").antMatchers("/secure/helloadmin")
				.hasAuthority("ADMIN").antMatchers("/secure/hellouser").hasAnyAuthority("USER", "ADMIN")
				.antMatchers("/trainBooking").hasAnyAuthority("ADMIN", "USER").antMatchers("/trainSearch").permitAll()
				.antMatchers("/secure/authenticate").permitAll().anyRequest().authenticated().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and().httpBasic();
		http.cors();

		http.addFilterBefore(jwtfilter, UsernamePasswordAuthenticationFilter.class);
	}
}
