package com.payment.gateway.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.payment.gateway.utility.PaymentInfo;
import com.paytm.pg.merchant.PaytmChecksum;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("payment")
public class PaymentController {

	@GetMapping("hello")
	public String welcome()
	{
		return "<h3>Working properly it is huh?</h3>";
	}
	
	@PostMapping("start")
	public Map<String, Object> startPayment(@RequestBody Map<String, Object> data) {

		String tsmp = LocalDateTime.now().toString();
		tsmp=tsmp.replaceAll("-", "");
		tsmp=tsmp.replaceAll(":", "");
		tsmp=tsmp.replace(".", "");
		String orderId = "PAYMENT_" + tsmp;
		System.out.println("Order ID: "+orderId);

		// param created
		JSONObject paytmParams = new JSONObject();

		// body information
		JSONObject body = new JSONObject();

		body.put("requestType", "Payment");
		body.put("mid", PaymentInfo.MERCHANT_ID);
		body.put("websiteName", PaymentInfo.WEBSITE);
		body.put("orderId", orderId);
		body.put("callbackUrl", "http://localhost:8073/payment-success");
		//body.put("email", PaymentInfo.EMAIL);

		JSONObject txnAmount = new JSONObject();
		txnAmount.put("value", data.get("amount"));
		txnAmount.put("currency", "INR");

		JSONObject userInfo = new JSONObject();
		userInfo.put("custId", data.get("userId"));

		body.put("txnAmount", txnAmount);
		body.put("userInfo", userInfo);

		String responseData = "";
		ResponseEntity<Map> response = null;

		try {

			String checksum = PaytmChecksum.generateSignature(body.toString(), PaymentInfo.MERCHANT_KEY);
			JSONObject head = new JSONObject();
			head.put("signature", checksum);

			paytmParams.put("body", body);
			paytmParams.put("head", head);

			String url = "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid="
					+ PaymentInfo.MERCHANT_ID + "&orderId=" + orderId;
			
			HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(paytmParams.toMap(), headers);

            //calling api
            RestTemplate restTemplate = new RestTemplate();
            response = restTemplate.postForEntity(url, httpEntity, Map.class);

            System.out.println("Transaction is successful");
            System.out.println(response);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
		}
		Map<String, Object> body1 = response.getBody();
        body1.put("orderId", orderId);
        body1.put("amount", txnAmount.get("value"));
        System.out.println("Returned object\n"+body1);
        return body1;
	}
	
	@PostMapping("start-payment")
	public String invokePayment(@RequestBody int amount) throws RazorpayException, Exception
	{
		RazorpayClient rz_client = new RazorpayClient(PaymentInfo.RAZPAY_KEY_ID, 
				PaymentInfo.RAZPAY_KEY_SECRET, true);
		
		JSONObject json_obj = new JSONObject();
		
		json_obj.put("amount", amount*100);    //amount should be entered in paise
		json_obj.put("currency", "INR");
		json_obj.put("receipt", "trn_554234"); //any random string in receipt
		
		Order order = rz_client.orders.create(json_obj);
		System.out.println("Order Created:\n"+order);
		return order.toString();
	}
}
