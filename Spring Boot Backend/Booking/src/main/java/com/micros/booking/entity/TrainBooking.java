package com.micros.booking.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Train_Booking")
public class TrainBooking {

	@Id
	private String pnr;
	@Indexed(unique = true)
	private long ticket_no;
	private String date;
	private String time;
	private double fare;
	private Train train;
	private String train_class;
	private String user_id;
	private List<Passenger> passengers;

	public TrainBooking(String pnr, long ticket_no, String date, String time, double fare, Train train,
			String train_class, String user_id, List<Passenger> passengers) {
		super();
		this.pnr = pnr;
		this.ticket_no = ticket_no;
		this.date = date;
		this.time = time;
		this.fare = fare;
		this.train = train;
		this.train_class = train_class;
		this.user_id = user_id;
		this.passengers = passengers;
	}

	public TrainBooking() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getTrain_class() {
		return train_class;
	}

	public void setTrain_class(String train_class) {
		this.train_class = train_class;
	}

	public String getPnr() {
		return pnr;
	}

	public void setPnr(String pnr) {
		this.pnr = pnr;
	}

	public long getTicket_no() {
		return ticket_no;
	}

	public void setTicket_no(long ticket_no) {
		this.ticket_no = ticket_no;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public double getFare() {
		return fare;
	}

	public void setFare(double fare) {
		this.fare = fare;
	}

	public Train getTrain() {
		return train;
	}

	public void setTrain(Train train) {
		this.train = train;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public List<Passenger> getPassengers() {
		return passengers;
	}

	public void setPassengers(List<Passenger> passengers) {
		this.passengers = passengers;
	}

	@Override
	public String toString() {
		return "TrainBooking [pnr=" + pnr + ", ticket_no=" + ticket_no + ", date=" + date + ", time=" + time + ", fare="
				+ fare + ", train=" + train + ", user_id=" + user_id + ", passengers=" + passengers
				+ "]";
	}

}
