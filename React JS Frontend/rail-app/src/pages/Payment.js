import React, { useEffect, useState } from "react";
import IR from '../images/railLogo.png';
import { useLocation, useNavigate } from "react-router-dom";
import AppService from "./AppService";
import Swal from 'sweetalert2'
    const Payment=()=>{
        const locate=useLocation();
        const [amount, setAmt]=useState(0);
        const [ticket, setTicket]=useState({});
        const [name, setName] = useState('');
        const [phone, setPhone] = useState(0);
        const userId = localStorage.getItem('username');
        const pay_data = {amount, userId};
        const navig=useNavigate();
        function approve()
        {
            let train_no=ticket.train.train_id;
            let date = ticket.date;
            let t_class = ticket.train_class;
            let user = ticket.user_id;
            let passData = ticket.passengers;
            AppService.booktheticket(train_no, date, t_class, user, passData).then((response)=>{
                sessionStorage.setItem('Ticket',JSON.stringify(response.data));
                AppService.setPnrTicketNo().then(res=>console.log(res));
                navig('/final-ticket');
            })
        }
        const loadUserDetails=()=>
        {
            AppService.getuser(userId).then((resp)=>{
                setName(resp.data.name);
                setPhone(resp.data.phone);
            }).catch(console.error("Unable to fetch user"));
        }
        function onScriptLoad(data){
            console.log("Ok, inside the final one", data)
            var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
            "orderId": data.orderId, /* update order id */
            "token": data.body.txnToken, /* update token value */
            "tokenType": "TXN_TOKEN",
            "amount": data.amount /* update amount */
            },
            "payMode": {
                "order": [
                    "CC",
                    "DC",
                    "NB",
                    "UPI",
                    "PPBL",
                    "PPI"
                ]
              },
            "website": "WEBSTAGING",
            "merchant": {
                mid: "PAYTM_MERCHANT_ID",
                redirect: false
            },
            "handler": {
            "notifyMerchant": function(eventName,data){
            console.log("notifyMerchant handler function called");
            console.log("eventName => ",eventName);
            console.log("data => ",data);
            },
            "transactionStatus": function (data) {
                console.log("transaction completed")
                console.log(data)
                window.Paytm.CheckoutJS.close();
                if (data.RESPMSG != "Txn Success") {
                    console.log("Payment Failed");
                    window.alert(data.RESPMSG);
                    reject();
                } else if (data.RESPMSG == 'Txn Success') {
                    window.alert("Payment Successful");
                    console.log("Transaction Successful");
                    approve();
                } else {
                    window.alert("Something went wrong while payment contact to admin!!")
                }
            }
            }
        };
            
            if(window.Paytm && window.Paytm.CheckoutJS){
                console.log("Inside 1st if");
                console.log(config)
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error){
            console.log("error => ",error);
            });
            }
            }

        function onScriptLoad_RazorPay(request_data)
        {
            console.log("Order id: ",request_data.id);
            var options = {
                "key": "RAZORPAY_KEY_ID",
                "amount": request_data.amount,
                "currency": request_data.currency,
                "name": "RAIL YATRA",
                "description": "Ticket Booking Payment",
                "image": IR,
                "order_id": request_data.id,
                "handler": function (response){
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);
                Swal.fire(
                    'Success !!',
                    'Your payment is successful',
                    'success'
                  )
                approve();
                },
                "prefill": {
                "name": name,
                "email": userId,
                "contact": phone
                },
                "modal": {
                    "ondismiss": function () {
                        reject();
                    }
                },
                "notes": {
                "address": "Rail Yatra Corporate Office"
                },
                "theme": {
                "color": "#17EDAF"
                }
                };
                var rzp = new window.Razorpay(options);

                rzp.on('payment.failed', function (response){
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);
                    });

                rzp.open();
        }
        function startPayment()
        {
            AppService.paymentData(pay_data.amount).then(resp=>{
                console.log(resp.data);
                // console.log(JSON.parse(resp.data));
                console.log("initiating cl")
                onScriptLoad_RazorPay(resp.data);
            }).catch(console.log("Error Starting Payment"));
        }
        function reject()
        {
            let seats = ticket.train.seat_nos[ticket.train_class].length;
            sessionStorage.clear();
            Swal.fire({
                icon: 'error',
                title: 'Payment Failed',
                text: 'Sorry, ticket not booked!'
              })
            navig(`/book-ticket/fillForm/${ticket.train.train_id}/${ticket.train_class}/${ticket.date}/${seats}`)
        }
        useEffect(()=>{
        if(!sessionStorage.getItem('Ticket'))
        {
            navig('/');
        }
        else
        {
            setAmt(locate.state);
            setTicket(JSON.parse(sessionStorage.getItem('Ticket')));
        }
        loadUserDetails();
        console.log("No Explicit Purpose")
        },[])
        return(
            <div style={{backgroundColor: '#e1f0ec', minHeight: '770px', position:'initial'}}>
            <div style={{height:'120px'}}/>
            <div style={{padding: '30px',border:'3px solid #87918f', borderRadius: '12px', width:'651px', margin:'auto', 
            backgroundColor:'#f7f0e6', boxShadow: '0 0 10px 7px #87918f'}}>
            <div style={{fontFamily:'Signika',color:'#33085c', fontSize:'25px', width:'420px', display:'inline-block'}}>
                You are about to make a payment to Indian Railways to book your ticket
            </div>
            <div style={{float:'right'}}><img src={IR} height={140}/></div>
            <br/><br/><br/>
            <div style={{paddingLeft:'18px', fontFamily:'Kalam', fontSize:'23px'}}>Payable 
            Amount: <span style={{fontSize:'27px', fontFamily:'Signika', color:'#a30aa6', fontWeight:'500'}}>{amount+"/-"}</span><br/><br/>Category: Ticket Price</div>
            <br/><br/>
            &emsp;
            {/* <button className="btn btn-success btn-lg" onClick={startPayment}>Proceed To Pay</button> */}
            <button className="btn btn-success btn-lg" onClick={startPayment}>Proceed To Pay</button>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <button className="btn btn-warning btn-lg" onClick={reject}>Cancel Payment</button>
            </div>
            </div>
        )
    }
    export default Payment;