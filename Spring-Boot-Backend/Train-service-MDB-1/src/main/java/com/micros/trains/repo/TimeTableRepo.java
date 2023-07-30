package com.micros.trains.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.micros.trains.document.TimeTable;

@Repository
public interface TimeTableRepo extends MongoRepository<TimeTable, Integer>{

	@Query("{date: {$gte: ?0}}")
	public List<TimeTable> availableTrains(Date date);
	
	@Query("{date_string: ?0}")
	public TimeTable getTrain(String date_string);
	
	@Query(value="{date :{$lt: ?0}}", delete = true)
	public void deleteRecord(Date date);
}
