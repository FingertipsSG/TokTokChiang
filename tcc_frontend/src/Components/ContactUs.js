import React from "react";
import "../Components/css/contactus.css";
import Navbar from "../Components/Navbar";
/*import background from "../Assets/Images/ContactUs.png";*/


function ContactUs() {
    return (
        <html>
            <head>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</head>
            <body className="contactUs-body">
                <Navbar />
                <div className='ContactUs'>
                    <h1> Stay Connected With Us</h1>
                    <p>Feel free to contact us anytime time.<br />We will get back to you as soon as we can!</p>
                    <form>
                        <input type="text" placeholder="Name" />
                        <br /><br />
                        <input type="email" placeholder="Email" />
                        <br /><br />
                        <input type="tel" placeholder="Phone" />
                        <br /><br />
                        <textarea placeholder="Message..." type="text" rows="4" cols="50"></textarea>
                        <br /><br />
                        <button>SUBMIT</button>
                    </form>
                </div>
            </body>

        </html>

    );
}

export default ContactUs;
