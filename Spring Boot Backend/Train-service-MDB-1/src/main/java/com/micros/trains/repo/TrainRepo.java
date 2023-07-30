package com.micros.trains.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.micros.trains.document.Train;

@Repository
public interface TrainRepo extends MongoRepository<Train, Integer>{

	@Query("{from_station: ?0, to_station: ?1}")
	List<Train> findtrains(String from, String to);
	
	@Query("{train_name: /?0/i}")
	List<Train> trainName(String name);
	
//	@Query(value = "db.Train.find({train_name: /?0/i})")
//	List<Train> FindByTrain_nameLike(String name);
}
