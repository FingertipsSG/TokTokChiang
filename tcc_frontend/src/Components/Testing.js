import React from "react";
import "../Components/css/testing.css";
import Navbar from "./Navbar";



function Testing() {
    return (
        <html className="testingHtml">
            <head>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            </head>
            <body className="testingBody">
                <Navbar />
                <br />
                <div className="testingDiv">
                </div>
            </body >
        </html >
    );
}

export default Testing;
