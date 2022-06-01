import React, { useState } from 'react';
import "./EnterDigitPinScreen.css";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { message, Form, Input } from "antd";
import logo from '../../Assets/Images/toktoklogo.png';

function EnterDigitPinScreen() {
    const [error, setError] = useState("");
    const [digitPin, setDigitPin] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();
    const email = location.state.emailBroughtOver;
    const baseurl = "https://tok-tok-chiang-nodejs.herokuapp.com/";
    // console.log("from prev page: " + JSON.stringify(location.state));

    const getResendPin = () => {
        const pin = Math.floor(Math.random() * 899999 + 100000);
        return pin;
    };

    const pin = getResendPin();

    // console.log("resent pin after load = " + getResendPin());

    const getPin = () => {
        axios.get(baseurl + 'getPIN', { params: { pin: digitPin } })
            .then(function (response) {
                console.log("===========================");
                console.log("RESPONSE FRM GET PIN (SHOULD BE CORRECT PIN): " + response.data.message);
                axios.delete(baseurl + 'deletePIN', { params: { pin: response.data.message } })
                    .then(function (response) {
                        console.log(response.status);
                    }).catch((error) => {
                        console.log(error);
                    });
                navigate("/reset", { state: { digitPin: digitPin, emailBroughtOver: email } });
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    setError(error.response.data.message);
                }
                if (error.response.status === 500) {
                    setError(error.response.data.message);
                }
            });
    };

    const submitHandler = e => {
        e.preventDefault();
        getPin(); //check if pin is correct 

    };

    //RESEND EMAIL CODES
    const resendEmail = () => {
        axios.post(baseurl + 'sendEmailPin', { pin: pin, email: email })
            .then(function (response) {
                // console.log("SUCCESS IN EMAIL RESEND");
                // console.log("===========================");
                message.success("6-digit PIN resent to your email!");
                reInsertPin();
                const emailTime = new Date(response.data.message); //emailTime
                const min = 3;
                const expiredTime = new Date(emailTime.getTime() + min * 60000); //get time aft 3 sec
                // console.log("===========================");
                // console.log("TIME OF LAST EMAIL SENT: " + emailTime);
                // console.log("===========================");
                // console.log("EXPIRED TIME: " + expiredTime);
                // console.log("===========================");
                setTimeout(
                    function () {
                        var now = new Date();
                        if (expiredTime < now) {
                            console.log("Expired!!!!!!");
                            axios.delete(baseurl + 'deletePIN', { params: { pin: pin } })
                                .then(function (response) {
                                    console.log(response.status);
                                }).catch((error) => {
                                    console.log(error);
                                });
                                message.error("6-digit token expired. Please click on the resend button.");
                                console.log("DELETED BECUZ EXPIRE");
                        } else if (expiredTime > now) {
                            console.log("havent expire");
                        }
                    }, 180000
                );
            }).catch((error) => {
                console.log("===========================");
                console.log("ERROR IN RESEND EMAIL FUNCTION");
                console.log(error);
            });
    };

    //REINSERT PIN
    const reInsertPin = () => {
        axios.post(baseurl + 'insertPIN', { pin: pin })
            .then(function (response) {
                console.log(response.status);
            }).catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='main' >
            <Form form={form} className="form-outer">
                <div className='form-inner'>
                    <img src={logo} alt="Logo" width={300} height={70} />
                    <h2>Enter 6-digit pin</h2>
                    {
                        (error !== "") ?
                            (
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {error} <strong>Try again!</strong>
                                </Alert>)
                            : ""
                    }
                    <br />
                    <Form.Item
                        name="pin"
                        label={<label style={{ color: "white" }}>Pin</label>}
                        rules={[
                            {
                                type: 'tel',
                                maxLength: "6",
                                minLength: "6",
                                required: true,
                                message: "Please enter PIN!"
                            },
                        ]}>
                        <Input
                            placeholder="Enter 6-Digit PIN"
                            value={digitPin}
                            onChange={e => setDigitPin(e.target.value)} />
                    </Form.Item>
                    <button onClick={resendEmail} className="resendBtn">RESEND 6-DIGIT PIN</button>
                    <button onClick={submitHandler} className="submitBtn">SUBMIT</button>
                </div>
            </Form>
        </div>
    );
}

export default EnterDigitPinScreen;