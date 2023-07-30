package com.micros.booking.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.micros.booking.entity.PnrTicketNo;

@Repository
public interface PnrTicketRepo extends MongoRepository<PnrTicketNo, String>{

}
