package com.micros.security1.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Admin")
public class Admin {

	@Id
	private String adminUserName;
	private String password;
	private String name;

	public Admin() {

	}

	public Admin(String adminUserName, String password, String name) {
		super();
		this.adminUserName = adminUserName;
		this.password = password;
		this.name = name;
	}

	public String getAdminUserName() {
		return adminUserName;
	}

	public void setAdminUserName(String adminUserName) {
		this.adminUserName = adminUserName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Admin [adminUserName=" + adminUserName + ", password=" + password + ", name=" + name + "]";
	}

}
