package com.micros.security1.entity;

public class JWTResponse {

	private String jwt_token;

	public JWTResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public JWTResponse(String jwt_token) {
		this.jwt_token = jwt_token;
	}


	public String getJwt_token() {
		return jwt_token;
	}

	public void setJwt_token(String jwt_token) {
		this.jwt_token = jwt_token;
	}


	@Override
	public String toString() {
		return "jwt_token=" + jwt_token;
	}
	
	
}
