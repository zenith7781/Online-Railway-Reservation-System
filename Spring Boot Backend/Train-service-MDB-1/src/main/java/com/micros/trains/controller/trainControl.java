package com.micros.trains.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.micros.trains.document.TimeTable;
import com.micros.trains.document.Train;
import com.micros.trains.service.TimeTableService;
import com.micros.trains.service.TrainService;
import com.mongodb.DuplicateKeyException;

@RestController
@RequestMapping("trainSearch")
public class trainControl {

	@Autowired
	private TrainService tservice;

	@Autowired
	private TimeTableService ttservice;

	@PostMapping("/saveTrain")
	public Train saveTrain(@RequestBody Train train) {
		System.out.println(train);
		Train train1=tservice.saveTrain(train);
//		try {
//		train1 = tservice.saveTrain(train);
//		}
//		catch (Exception ex)
//		{
//			train1 = null;
//		}
		return train1;
	}
	
	@GetMapping("/getAllTrains")
	public List<Train> getTrains() {
		return tservice.allTrains();
	}

	@GetMapping("/getById/{id}")
	public Train gettrain(@PathVariable("id") int id) {
		return tservice.findbytrainId(id).get();
	}

	@GetMapping("/getTrainByStations/{from}/{to}")
	public List<Train> getTrains(@PathVariable("from") String from, @PathVariable("to") String to) {
		try {
			List<Train> list = tservice.trainsBetweenStations(from, to);
			return list;
		} catch (NullPointerException Ex) {
			System.out.println(Ex.getMessage());
		}
		return null;
	}

	@GetMapping("/findByTrainName/{name}")
	public List<Train> getName(@PathVariable("name") String name) {
		return tservice.findTrainByName(name);
	}

	@PutMapping("updateById/{id}")
	public Train updateTrain(@PathVariable("id") int id, @RequestBody Train train0) {
		Train oldTr = tservice.findbytrainId(id).get();
		oldTr.setTrain_id(train0.getTrain_id());
		oldTr.setFrom_station(train0.getFrom_station());
		oldTr.setTo_station(train0.getTo_station());
		oldTr.setTotal_Seat_ac1(train0.getTotal_Seat_ac1());
		oldTr.setTotal_Seat_ac2(train0.getTotal_Seat_ac2());
		oldTr.setTotal_Seat_ac3(train0.getTotal_Seat_ac3());
		oldTr.setTotal_Seat_sleeper(train0.getTotal_Seat_sleeper());
		oldTr.setTrain_name(train0.getTrain_name());
		oldTr.setArrival(train0.getArrival());
		oldTr.setDeparture(train0.getDeparture());
		oldTr.setDuration(train0.getDuration());
		oldTr.setBase_fare(train0.getBase_fare());
		oldTr.setRuns_on(train0.getRuns_on());
		tservice.saveTrain(oldTr);
		return oldTr;
	}

	@DeleteMapping("/delete/{id}")
	public String deletebyid(@PathVariable("id") int id) {
		String srt = tservice.deleteTrainbyId(id);
		return srt;
	}

	// --------Time Table API call-----------------

	// Get Trains upto the last available day from current date
	@GetMapping("/getTrains/DateFromTo/{date}/{from}/{to}")
	public List<TimeTable> getTrainFrom(@PathVariable("date") String date, @PathVariable("from") String from,
			@PathVariable("to") String to) throws ParseException {
		List<TimeTable> timetables = ttservice.getTrains(date);
		// List<Train> trainList = new ArrayList<Train>();
		for (int i = 0; i < timetables.size(); i++) {
			List<Train> trainList = new ArrayList<Train>();
			for (Train tr : timetables.get(i).getTrains()) {
				if (tr.getFrom_station().equalsIgnoreCase(from) && tr.getTo_station().equalsIgnoreCase(to)) {
					trainList.add(tr);
				}
			}
			timetables.get(i).setTrains(trainList);
		}
		return timetables;
	}
	
	@GetMapping("/getFullTT")
	public List<TimeTable> ttable()
	{
		return ttservice.getTimeTable();
	}

	// Get Exact Trains On that Day
	@GetMapping("/getTrains/getExactTrain/{date}/{from}/{to}")
	public TimeTable getExactTrains(@PathVariable("date") String date, @PathVariable("from") String from,
			@PathVariable("to") String to) throws ParseException {
		TimeTable timetable = ttservice.fetchDetails(date);
		List<Train> trainList = new ArrayList<Train>();
		for (Train tr : timetable.getTrains()) {
			if (tr.getFrom_station().equalsIgnoreCase(from) && tr.getTo_station().equalsIgnoreCase(to)) {
				trainList.add(tr);
			}
		}
		timetable.setTrains(trainList);
		return timetable;
	}

	@EventListener(ApplicationReadyEvent.class)
	public void init() throws ParseException {
//		String datestring = request.getDatestring();
		System.out.println("");
		Date today = new Date();
		final DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String today_string = dateFormat.format(today);
		String delMsg = ttservice.removeTrains(today_string);
		System.out.println(delMsg);
		String changed = "No Changes Required";
		for (int j = 0; j <= 10; j++) {
			Calendar c = Calendar.getInstance();
			c.setTime(today);
			c.add(Calendar.DATE, j);
			Date addedDate = c.getTime();
			System.out.println("Day is: " + addedDate.getDay());
			String NewDate = dateFormat.format(addedDate);
			System.out.println(NewDate);
			List<TimeTable> ttlist = ttservice.getTrains(NewDate);
			if (ttlist.isEmpty()) {
				// Add the new Record
				String days[] = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
				String day_of_week = days[addedDate.getDay()];
				List<Train> list1 = tservice.allTrains();
				List<Train> list2 = new ArrayList<Train>();
				for (Train trn : list1) {
					if (trn.getRuns_on().contains(day_of_week)) {
						list2.add(trn);
					}
				}
				TimeTable timeTable = new TimeTable();
				timeTable.setDate(NewDate);
				timeTable.setDate_string(NewDate);
				timeTable.setTrains(list2);
				ttservice.addRecord(timeTable);
				changed = "Time Table updated";
			}
		}
		System.out.println(changed);
	}
    //Update Train seats for a specific day
	@PutMapping("/changeSeat/Train/{today}")
	public String updateSeats(@PathVariable("today") String today, @RequestBody Train train2) throws ParseException {
		TimeTable tt1 = ttservice.fetchDetails(today);
		System.out.println(tt1);
		List<Train> tlist = tt1.getTrains();
		for (Train train : tlist) {
			if (train.getTrain_id() == train2.getTrain_id()) {
				train.setTotal_Seat_ac1(train2.getTotal_Seat_ac1());
				train.setTotal_Seat_ac2(train2.getTotal_Seat_ac2());
				train.setTotal_Seat_ac3(train2.getTotal_Seat_ac3());
				train.setTotal_Seat_sleeper(train2.getTotal_Seat_sleeper());
				train.setSeat_nos(train2.getSeat_nos());
				break;
			}
		}
		tt1.setTrains(tlist);
		// tt1.setId(tt1.getId());
		ttservice.addRecord(tt1);
		return train2.getTrain_id() + " " + train2.getTrain_name() + "'s seat count for " + today + " is updated";
	}

	@GetMapping("/getTrain/specificDate/{date}/{id}")
	public Train getSpecific(@PathVariable("date") String date, @PathVariable("id") int id) throws ParseException {
		TimeTable tmtbl = ttservice.fetchDetails(date);
		List<Train> trList = tmtbl.getTrains();
		for (Train train : trList) {
			if (train.getTrain_id() == id) {
				return train;
			}
		}
		return null;
	}
	
	@GetMapping("/getTimeTable/All")
	public List<TimeTable> getFullTT()
	{
		return ttservice.getTimeTable();
	}

}
