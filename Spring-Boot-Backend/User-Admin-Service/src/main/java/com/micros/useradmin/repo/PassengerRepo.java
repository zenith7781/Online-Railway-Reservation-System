package com.micros.useradmin.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.micros.useradmin.entity.Passenger;

@Repository
public interface PassengerRepo extends MongoRepository<Passenger, Integer>{
	
	@Query("{pass_mobile: ?0}")
	Passenger getbyMobile(long mobile);
	
	@Query(value="{'pass_mobile' : ?0}", delete = true)
	public void deleteByMobile(long pass_mobile);
	
}
