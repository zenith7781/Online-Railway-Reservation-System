package com.micros.useradmin.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.micros.useradmin.entity.TrainUser;

@Repository
public interface UserRepo extends MongoRepository<TrainUser, String>{

	@Query("{email: ?0}")
	TrainUser getByEmail(String email);
	
	@Query(value="{email : ?0}", delete = true)
	public void deleteByEmail(String email);

	@Query("{email: ?0}")
	List<TrainUser> findMultiple(String email);
}
