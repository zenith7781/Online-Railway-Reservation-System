package com.micros.trains.document;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "timetable")
public class TimeTable {

	@Id
	private String id;
	private List<Train> trains;
	private Date date;
	private String date_string;

	@Override
	public String toString() {
		return "TimeTable [id=" + id + ", trains=" + trains + ", date=" + date + ", date_string=" + date_string + "]";
	}

	public TimeTable() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public TimeTable(String id, List<Train> trains, Date date, String date_string) {
		super();
		this.id = id;
		this.trains = trains;
		this.date = date;
		this.date_string = date_string;
	}

	public String getDate_string() {
		return date_string;
	}

	public void setDate_string(String date_string) {
		this.date_string = date_string;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<Train> getTrains() {
		return trains;
	}

	public void setTrains(List<Train> trains) {
		this.trains = trains;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(String date) throws ParseException {
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = formatter.parse(date);
		this.date = date1;
	}

}
