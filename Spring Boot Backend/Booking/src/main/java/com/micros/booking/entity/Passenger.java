package com.micros.booking.entity;

public class Passenger {
	private int pass_id;
	private String pass_name;
	private int pass_age;
	private String pass_gender;
	private String pass_address;
	private String pass_credit_no;
	private String pass_bank_name;
	private String pass_train_class;
	private int pass_seat_no;
	private long pass_mobile;
	public Passenger() {
	}

	public Passenger(int pass_id, String pass_name, int pass_age, String pass_gender, String pass_address,
			String pass_credit_no, String pass_bank_name, String pass_train_class, int pstn, long pass_mobile) {
		super();
		this.pass_id = pass_id;
		this.pass_name = pass_name;
		this.pass_age = pass_age;
		this.pass_gender = pass_gender;
		this.pass_address = pass_address;
		this.pass_credit_no = pass_credit_no;
		this.pass_bank_name = pass_bank_name;
		this.pass_train_class = pass_train_class;
		this.pass_mobile = pass_mobile;
		this.pass_seat_no = pstn;
	}

	public int getPass_seat_no() {
		return pass_seat_no;
	}

	public void setPass_seat_no(int pass_seat_no) {
		this.pass_seat_no = pass_seat_no;
	}

	public int getPass_id() {
		return pass_id;
	}

	public void setPass_id(int pass_id) {
		this.pass_id = pass_id;
	}

	public String getPass_name() {
		return pass_name;
	}

	public void setPass_name(String pass_name) {
		this.pass_name = pass_name;
	}

	public int getPass_age() {
		return pass_age;
	}

	public void setPass_age(int pass_age) {
		this.pass_age = pass_age;
	}

	public String getPass_gender() {
		return pass_gender;
	}

	public void setPass_gender(String pass_gender) {
		this.pass_gender = pass_gender;
	}

	public String getPass_address() {
		return pass_address;
	}

	public void setPass_address(String pass_address) {
		this.pass_address = pass_address;
	}

	public String getPass_credit_no() {
		return pass_credit_no;
	}

	public void setPass_credit_no(String pass_credit_no) {
		this.pass_credit_no = pass_credit_no;
	}

	public String getPass_bank_name() {
		return pass_bank_name;
	}

	public void setPass_bank_name(String pass_bank_name) {
		this.pass_bank_name = pass_bank_name;
	}

	public String getPass_train_class() {
		return pass_train_class;
	}

	public void setPass_train_class(String pass_train_class) {
		this.pass_train_class = pass_train_class;
	}

	public long getPass_mobile() {
		return pass_mobile;
	}

	public void setPass_mobile(long pass_mobile) {
		this.pass_mobile = pass_mobile;
	}

	@Override
	public String toString() {
		return "Passenger [pass_id=" + pass_id + ", pass_name=" + pass_name + ", pass_age=" + pass_age
				+ ", pass_gender=" + pass_gender + ", pass_address=" + pass_address + ", pass_credit_no="
				+ pass_credit_no + ", pass_bank_name=" + pass_bank_name + ", pass_train_class=" + pass_train_class
				+ ", pass_mobile=" + pass_mobile + "]";
	}
}
