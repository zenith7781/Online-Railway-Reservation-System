package com.micros.booking.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.micros.booking.entity.TrainBooking;

@Repository
public interface BookingRepo extends MongoRepository<TrainBooking, String>{

	@Query("{user_id: ?0}")
	List<TrainBooking> ticketByUserId(String id);
	
}
