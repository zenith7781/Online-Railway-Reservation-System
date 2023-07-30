import React from "react";
import { Link } from "react-router-dom";
import Bk from "../images/symbol-booking.png";
import NL from "../images/network-large.jpg";
const About = () => {
    return (
    <div>
    <div style={{padding: '16px', backgroundColor: 'lavenderblush'}}>
        <section id="about">
        <h1 style={{textAlign: 'center'}}>About Us - RailYatra</h1>
        <p style={{fontFamily: 'Comic Sans MS', fontSize: '18px'}}>
            Welcome to RailYatra, your ultimate destination for seamless railway ticket booking! 
        We are dedicated to making your train travel experience comfortable, convenient, and unforgettable. 
        Whether you are a seasoned traveler or embarking on your first railway journey, RailYatra is here to ensure 
        you reach your destination with ease and joy.
        </p>
        <Link className="btn btn-secondary" to='/'>Book Now</Link>
        </section>
        <br/>
    <section id="mission">
        <h2>Our Mission</h2>
        <p>At RailYatra, our mission is to redefine the way you book train tickets. We are committed to providing a user-friendly, reliable, and secure platform that caters to all your railway travel needs. Our passionate team works tirelessly to deliver exceptional customer service and create a seamless booking experience for you.</p>
        <br/><br/>
        <div class="row">
            <div class="col-lg-6">
                <img src={Bk} alt="Feature 1 Icon" width='150'/>
                <h3>Effortless Booking Process</h3>
                <p>With RailYatra, booking train tickets is a breeze. Our intuitive interface allows you to search for trains, check seat availability, and make reservations with just a few clicks.</p>
            </div>
            <div class="col-lg-6">
                <img src={NL} alt="Feature 2 Icon" width='150'/>
                <h3>Extensive Network</h3>
                <p>We cover an extensive network of railway routes, connecting numerous cities and destinations, ensuring you can book tickets for your preferred journey effortlessly.</p>
            </div>
            <div class="feature">
                <img src="feature-icon-3.png" alt="Feature 3 Icon"/>
                <h3>Real-time Updates</h3>
                <p>Stay informed about your train's status with real-time updates on delays, cancellations, and platform changes, enabling you to plan your travel with confidence.</p>
            </div>
            <div class="feature">
                <img src="feature-icon-4.png" alt="Feature 4 Icon"/>
                <h3>Secure Payments</h3>
                <p>Your safety is our top priority. RailYatra offers secure payment options, ensuring that your transactions are protected at all times.</p>
            </div>
        </div>
    </section>
        </div>
        </div>)
}
export default About;