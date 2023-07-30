package com.micros.booking.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "PNR_TKT")
public class PnrTicketNo {

	@Id
	private String id;
	private long ticketNumber;
	private String pnr;

	public PnrTicketNo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PnrTicketNo(String id, long ticketNumber, String pnr) {
		super();
		this.id = id;
		this.ticketNumber = ticketNumber;
		this.pnr = pnr;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public long getTicketNumber() {
		return ticketNumber;
	}

	public void setTicketNumber(long ticketNumber) {
		this.ticketNumber = ticketNumber;
	}

	public String getPnr() {
		return pnr;
	}

	public void setPnr(String pnr) {
		this.pnr = pnr;
	}

	@Override
	public String toString() {
		return "PnrTicketNo [id=" + id + ", ticketNumber=" + ticketNumber + ", pnr=" + pnr + "]";
	}

}
