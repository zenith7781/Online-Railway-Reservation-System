package com.micros.booking.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.micros.booking.entity.Passenger;
import com.micros.booking.entity.PnrTicketNo;
import com.micros.booking.entity.Train;
import com.micros.booking.entity.TrainBooking;
import com.micros.booking.service.BookingService;

@RestController
@RequestMapping("trainBooking")
public class BookingController {

	@Autowired
	private BookingService book_service;

	@Autowired
	private RestTemplate restTemplate;

	@GetMapping("findTicket/PNR/{pnr}")
	public TrainBooking find_ticket(@PathVariable("pnr") String pnr) {
		TrainBooking ticket = null;
		try {
			ticket = book_service.getTicket(pnr);
		} catch (NoSuchElementException Nex) {
			System.out.println("No ticket present with given PNR");
		}
		return ticket;
	}

	@GetMapping("findUserSpecificTickets/{user_id}")
	public List<TrainBooking> fetchtickets(@PathVariable("user_id") String user_id) {
		return book_service.findUserIdTickets(user_id);
	}

	@PostMapping("bookTicket/{train_no}/{date}/{class}/{user}")
	public TrainBooking book_a_ticket(@PathVariable("train_no") int train_id, @PathVariable("date") String date,
			@PathVariable("class") String train_class, @PathVariable("user") String user_id,
			@RequestBody List<Passenger> passeList) {
		List<Passenger> newPassn = new ArrayList<>();
		int no_of_pass = passeList.size();
		ResponseEntity<Train> response = restTemplate.getForEntity(
				"http://train-service/trainSearch/getTrain/specificDate/" + date + "/" + train_id, Train.class);
		Train train = response.getBody();
		List<Integer> seats = train.getSeat_nos().get(train_class);
		for (int i = 0; i < no_of_pass; i++) {
			Passenger passn = passeList.get(i);
			passn.setPass_seat_no(seats.get(i));
			newPassn.add(passn);
		}
		// Calculate distance, fare and create a ticket
		double fare = train.getBase_fare() * passeList.size();
		if (train_class.equals("AC1")) {
			fare = fare * 1.6;
			train.setTotal_Seat_ac1(train.getTotal_Seat_ac1() - no_of_pass);
		} else if (train_class.equals("AC2")) {
			fare = fare * 1.4;
			train.setTotal_Seat_ac2(train.getTotal_Seat_ac2() - no_of_pass);
		} else if (train_class.equals("AC3")) {
			fare = fare * 1.2;
			train.setTotal_Seat_ac3(train.getTotal_Seat_ac3() - no_of_pass);
		} else {
			train.setTotal_Seat_sleeper(train.getTotal_Seat_sleeper() - no_of_pass);
		}

        String time = LocalTime.now().toString().substring(0, 8);
        String ddt=LocalDate.now().toString();
        time=ddt.substring(8)+"/"+ddt.substring(5,7)+"/"+ddt.substring(0,4)+" at "+time;
		TrainBooking ticket = new TrainBooking();
		PnrTicketNo pn_tk = getPnrTktNo();
		ticket.setPnr(pn_tk.getPnr());
		ticket.setTicket_no(pn_tk.getTicketNumber());
		ticket.setTime(time);
		ticket.setDate(date);
		ticket.setFare(fare);
		ticket.setPassengers(newPassn);
		ticket.setTrain(train);
		ticket.setTrain_class(train_class);
		ticket.setUser_id(user_id);
		// Logic After setting ticket object
		setPnrandTkt();
		seats.subList(0, no_of_pass).clear();
		HashMap<String, List<Integer>> seat_nos = new HashMap<String, List<Integer>>();
		seat_nos = train.getSeat_nos();
		seat_nos.replace(train_class, seats);
		train.setSeat_nos(seat_nos);
		restTemplate.put("http://train-service/trainSearch/changeSeat/Train/" + date, train);
		return book_service.bookTicket(ticket);
	}

	@DeleteMapping("deleteTicket/PNR/{pnr}")
	public String delete_a_ticket(@PathVariable("pnr") String pnr) {
		List<Integer> new_seats = new ArrayList<Integer>();
		TrainBooking ticket = find_ticket(pnr);
		Train train = ticket.getTrain();
		List<Passenger> passList = ticket.getPassengers();
		HashMap<String, List<Integer>> seat_nos = train.getSeat_nos();
		int pass_num = ticket.getPassengers().size();
		String train_class = ticket.getTrain_class();
		if (train_class.equals("AC1")) {
			train.setTotal_Seat_ac1(train.getTotal_Seat_ac1() + pass_num);
		} else if (train_class.equals("AC2")) {
			train.setTotal_Seat_ac2(train.getTotal_Seat_ac2() + pass_num);
		} else if (train_class.equals("AC3")) {
			train.setTotal_Seat_ac3(train.getTotal_Seat_ac3() + pass_num);
		} else {
			train.setTotal_Seat_sleeper(train.getTotal_Seat_sleeper() + pass_num);
		}
		for (Passenger pass : passList) {
			new_seats.add(pass.getPass_seat_no());
		}
		new_seats.addAll(seat_nos.get(train_class));
		seat_nos.replace(train_class, new_seats);
		train.setSeat_nos(seat_nos);
		try {
			restTemplate.put("http://train-service/trainSearch/changeSeat/Train/" + ticket.getDate(), train);
		} catch (NoSuchElementException ex) {
			System.out.println(ex);
		}
		return book_service.deleteTicket(pnr);
	}

	@PutMapping("update/trainNo/{id}")
	public Train updateTrain(@PathVariable("id") int id, @RequestBody Train train_new) {
		restTemplate.put("http://train-service/trainSearch/updateById/" + id, train_new);
		return train_new;
	}

	@GetMapping("/getPNR/TicketNo")
	public PnrTicketNo getPnrTktNo() {
		return book_service.pnrandticketno();
	}

	@PutMapping("/setPNR/TicketNumber")
	public PnrTicketNo setPnrandTkt() {
		PnrTicketNo pt0 = book_service.pnrandticketno();
		String pnr = pt0.getPnr();
		pnr = pnr.replaceAll("-", "");
		long pnr2sub = Long.parseLong(pnr);
		pnr2sub += 1;
		pnr = String.valueOf(pnr2sub);
		pnr = pnr.substring(0, 3) + "-" + pnr.substring(3);
		long tktno = pt0.getTicketNumber();
		tktno = tktno + 1;
		pt0.setPnr(pnr);
		pt0.setTicketNumber(tktno);
		return book_service.setpnr(pt0);
	}

	@PostMapping("/setDefault")
	public PnrTicketNo setdef(@RequestBody PnrTicketNo ptn) {
		return book_service.setpnr(ptn);
	}

}
