package com.micros.security1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.micros.security1.entity.TrainUser;

@Repository
public interface UserRepository extends MongoRepository<TrainUser, String>{
	
	@Query("{email: ?0}")
	TrainUser getTheUser(String email);

}
