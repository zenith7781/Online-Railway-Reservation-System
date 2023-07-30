package com.micros.security1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.micros.security1.entity.Admin;

public interface AdminRepo extends MongoRepository<Admin, String>{

	@Query("{adminUserName: ?0}")
	Admin getTheAdmin(String username);
}
