package com.micros.trains.document;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "Train")
public class Train {

	@Id
	@Field(name = "train_id")
	private int train_id;
	private int total_Seat_sleeper;
	private int total_Seat_ac3;
	private int total_Seat_ac2;
	private int total_Seat_ac1;
	private String train_name;
	private String from_station;
	private String to_station;
	private String arrival;
	private String departure;
	private String duration;
	private double base_fare;
	private List<String> runs_on;
	private HashMap<String, List<Integer>> seat_nos;

	public Train(int train_id, int total_Seat_sleeper, int total_Seat_ac3, int total_Seat_ac2, int total_Seat_ac1,
			String train_name, String from_station, String to_station, String arrival, String departure,
			String duration, double base_fare, List<String> runs_on, HashMap<String, List<Integer>> seat_nos) {
		super();
		this.train_id = train_id;
		this.total_Seat_sleeper = total_Seat_sleeper;
		this.total_Seat_ac3 = total_Seat_ac3;
		this.total_Seat_ac2 = total_Seat_ac2;
		this.total_Seat_ac1 = total_Seat_ac1;
		this.seat_nos = seat_nos;
		this.train_name = train_name;
		this.from_station = from_station;
		this.to_station = to_station;
		this.arrival = arrival;
		this.departure = departure;
		this.duration = duration;
		this.base_fare = base_fare;
		this.runs_on = runs_on;
	}

	public Train() {
		seat_nos = new HashMap<String, List<Integer>>();
		seat_nos.put("AC1", null);
		seat_nos.put("AC2", null);
		seat_nos.put("AC3", null);
		seat_nos.put("SL", null);
	}

	public HashMap<String, List<Integer>> getSeat_nos() {
		return seat_nos;
	}

	public void setSeat_nos(HashMap<String, List<Integer>> seat_nos) {
		if (seat_nos != null) {
			this.seat_nos = seat_nos;
		}
	}

	public String getArrival() {
		return arrival;
	}

	public void setArrival(String arrival) {
		this.arrival = arrival;
	}

	public String getDeparture() {
		return departure;
	}

	public void setDeparture(String departure) {
		this.departure = departure;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public int getTrain_id() {
		return train_id;
	}

	public void setTrain_id(int train_id) {
		this.train_id = train_id;
	}

	public int getTotal_Seat_sleeper() {
		return total_Seat_sleeper;
	}

	public void setTotal_Seat_sleeper(int total_Seat_sleeper) {
		this.total_Seat_sleeper = total_Seat_sleeper;
		if (seat_nos.get("SL") == null) {
			List<Integer> list = new ArrayList<Integer>();
			for (int i = 1; i <= total_Seat_sleeper; i++) {
				list.add(i);
			}
			seat_nos.put("SL", list);
		}
	}

	public int getTotal_Seat_ac3() {
		return total_Seat_ac3;
	}

	public void setTotal_Seat_ac3(int total_Seat_ac3) {
		this.total_Seat_ac3 = total_Seat_ac3;
		if (seat_nos.get("AC3") == null) {
			List<Integer> list = new ArrayList<Integer>();
			for (int i = 1; i <= total_Seat_ac3; i++) {
				list.add(i);
			}
			seat_nos.put("AC3", list);
		}
	}

	public int getTotal_Seat_ac2() {
		return total_Seat_ac2;
	}

	public void setTotal_Seat_ac2(int total_Seat_ac2) {
		this.total_Seat_ac2 = total_Seat_ac2;
		if (seat_nos.get("AC2") == null) {
			List<Integer> list = new ArrayList<Integer>();
			for (int i = 1; i <= total_Seat_ac2; i++) {
				list.add(i);
			}
			seat_nos.put("AC2", list);
		}
	}

	public int getTotal_Seat_ac1() {
		return total_Seat_ac1;
	}

	public void setTotal_Seat_ac1(int total_Seat_ac1) {
		this.total_Seat_ac1 = total_Seat_ac1;
		if (seat_nos.get("AC1") == null) {
			List<Integer> list = new ArrayList<Integer>();
			for (int i = 1; i <= total_Seat_ac1; i++) {
				list.add(i);
			}
			seat_nos.put("AC1", list);
		}

	}

	public String getTrain_name() {
		return train_name;
	}

	public void setTrain_name(String train_name) {
		this.train_name = train_name;
	}

	public String getFrom_station() {
		return from_station;
	}

	public void setFrom_station(String from_station) {
		this.from_station = from_station;
	}

	public String getTo_station() {
		return to_station;
	}

	public void setTo_station(String to_station) {
		this.to_station = to_station;
	}

	public List<String> getRuns_on() {
		return runs_on;
	}

	public void setRuns_on(List<String> runs_on) {
		List<String> days = Arrays.asList("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
		List<String> finaldays = new ArrayList<>();
		for (String day : days) {
			if (runs_on.contains(day)) {
				finaldays.add(day);
			}
		}
		this.runs_on = finaldays;
	}

	public double getBase_fare() {
		return base_fare;
	}

	public void setBase_fare(double base_fare) {
		this.base_fare = base_fare;
	}

	@Override
	public String toString() {
		return "Train [train_id=" + train_id + ", total_Seat_sleeper=" + total_Seat_sleeper + ", total_Seat_ac3="
				+ total_Seat_ac3 + ", total_Seat_ac2=" + total_Seat_ac2 + ", total_Seat_ac1=" + total_Seat_ac1
				+ ", seat_nos=" + seat_nos + ", train_name=" + train_name + ", from_station=" + from_station
				+ ", to_station=" + to_station + ", arrival=" + arrival + ", departure=" + departure + ", duration="
				+ duration + ", base_fare=" + base_fare + ", runs_on=" + runs_on + "]";
	}

}