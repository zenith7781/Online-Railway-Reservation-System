package com.micros.booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.micros.booking.entity.PnrTicketNo;
import com.micros.booking.entity.TrainBooking;
import com.micros.booking.repository.BookingRepo;
import com.micros.booking.repository.PnrTicketRepo;

@Service
public class BookingService {

	@Autowired
	private BookingRepo book_repo;
	
	@Autowired
	private PnrTicketRepo pnr_repo;
	
	public TrainBooking bookTicket(TrainBooking booking)
	{
		return book_repo.save(booking);
	}
	
	public TrainBooking getTicket(String pnr)
	{
		return book_repo.findById(pnr).get();
	}
	
	public String deleteTicket(String pnr)
	{
		book_repo.deleteById(pnr);
		return "Ticket with PNR "+pnr+" is deleted";
	}
	
	public List<TrainBooking> findUserIdTickets(String id)
	{
		return book_repo.ticketByUserId(id);
	}
	
	public PnrTicketNo pnrandticketno()
	{
		return pnr_repo.findAll().get(0);
	}
	
	public PnrTicketNo setpnr(PnrTicketNo pnrtkt)
	{
		return pnr_repo.save(pnrtkt);
	}
}
