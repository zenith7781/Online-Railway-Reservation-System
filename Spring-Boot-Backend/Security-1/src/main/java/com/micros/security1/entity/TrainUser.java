package com.micros.security1.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class TrainUser {

	@Id
	private String user_id;
	private String email;
	private String password;
	private long phone;
	private String name;

	public TrainUser() {
	}

	public TrainUser(String user_id, String email, String password, long phone, String name) {
		super();
		this.user_id = user_id;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.name = name;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getPhone() {
		return phone;
	}

	public void setPhone(long phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "TrainUser [user_id=" + user_id + ", email=" + email + ", password=" + password + ", phone=" + phone
				+ ", name=" + name + "]";
	}

}
