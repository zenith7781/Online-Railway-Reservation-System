package com.micros.trains.document;

import org.springframework.stereotype.Component;

@Component
public class Request {

	private String datestring;

	
	public Request() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public Request(String datestring) {
		super();
		this.datestring = datestring;
	}


	public String getDatestring() {
		return datestring;
	}

	public void setDatestring(String datestring) {
		this.datestring = datestring;
	}
	
	
}
