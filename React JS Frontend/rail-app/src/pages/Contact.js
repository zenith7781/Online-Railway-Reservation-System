import React from "react";
const Contact =()=>{
    return(
        <div style={{backgroundColor: '#dff8fc', height: '100vh', padding: '20px'}}>
    <section id="contact">
        <h1 style={{textAlign: 'center'}}>Contact Us</h1>
        <div class="contact-info" style={{fontSize: '17px'}}>
            <p><strong>Address:</strong> Bank of Baroda Building, 16, Parliament Street, New Delhi 110001</p>
            <p><strong>Call:</strong> 033-4597154</p>
        </div>
    </section>
    <footer>
        <div class="footer-links">
            <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#faq">FAQs</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="/">Home</a></li>
            </ul>
        </div>
        <div class="footer-contact">
            <p>Contact Us: info@railyatra.com</p>
        </div>
        <div class="footer-social">
            <a href="https://facebook.com/railyatra"><i className="bi bi-facebook"/></a>
            <a href="https://twitter.com/rail_yatra"><i className="bi bi-twitter"/></a>
            <a href="https://instagram.com/railyatra"><i className="bi bi-instagram"/></a>
        </div>
        <p>&copy; 2023 RailYatra. All rights reserved.</p>
    </footer>
    </div>
    )
}
export default Contact;