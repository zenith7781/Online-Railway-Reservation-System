package com.micros.trains.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.micros.trains.document.Train;
import com.micros.trains.repo.TrainRepo;

@Service
public class TrainService {

	@Autowired
	private TrainRepo trepo;
	
	public Train saveTrain(Train train)
	{
		System.out.println(train);
		return trepo.save(train);
	}
	
	public Optional<Train> findbytrainId(int id)
	{
		return trepo.findById(id);
	}
	
	public List<Train> trainsBetweenStations(String from, String to)
	{
		return trepo.findtrains(from, to);
	}
	
	public List<Train> allTrains()
	{
		return trepo.findAll();
	}
	public String deleteTrainbyId(int id)
	{
		trepo.deleteById(id);
		return "Deleted if found";
	}
	
	public List<Train> findTrainByName(String str)
	{
		return trepo.trainName(str);
	}
}
