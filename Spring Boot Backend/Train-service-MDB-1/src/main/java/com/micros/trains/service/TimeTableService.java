package com.micros.trains.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.micros.trains.document.TimeTable;
import com.micros.trains.repo.TimeTableRepo;

@Service
public class TimeTableService {

	@Autowired
	private TimeTableRepo ttrepo;
	
	public TimeTable addRecord(TimeTable tt)
	{
		return ttrepo.save(tt);
	}
	
	public TimeTable fetchDetails(String date) throws ParseException
	{
		return ttrepo.getTrain(date);
	}
	
	public List<TimeTable> getTrains(String date) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = formatter.parse(date);
		return ttrepo.availableTrains(date1);
	}
	
	public List<TimeTable> getTimeTable()
	{
		return ttrepo.findAll();
	}
	
	public String removeTrains(String date) throws ParseException
	{
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = formatter.parse(date);
		ttrepo.deleteRecord(date1);
		return "Records before "+date+" are deleted successfully, if any";
	}
	
}
