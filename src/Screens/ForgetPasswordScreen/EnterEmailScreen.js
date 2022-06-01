import React, { useState } from 'react';
import "./EnterEmailScreen.css";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useNavigate } from "react-router-dom";
import { message, Form, Input } from 'antd';
import logo from '../../Assets/Images/toktoklogo.png';
import config from '../../config';

function EnterEmailScreen() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const baseurl = config.baseurl || "http://localhost:3000/";
    const emailParams = {
        email: email,
        number: Math.floor(Math.random() * 899999 + 100000)
    };

    const insertPin = () => {
        axios.post(baseurl + 'insertPIN', { pin: emailParams.number })
            .then(function (response) {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    };

    const deletePin = () => {
        axios.delete(baseurl + 'deletePIN', { params: { pin: emailParams.number } })
            .then(function (response) {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    };

    const sendEmail = () => {
        axios.post(baseurl + 'sendEmailPin', { pin: emailParams.number, email: emailParams.email })
            .then(function (response) {
                const emailTime = new Date(response.data.message); //emailTime
                const min = 3;
                // console.log("time email sent: " + emailTime);
                const expiredTime = new Date(emailTime.getTime() + min * 60000); //get time aft 3 sec
                setTimeout(
                    function () {
                        console.log("Email time: " + emailTime);
                        console.log("EMAIL EXPIRY TIME: " + expiredTime);
                        var now = new Date();
                        if (expiredTime < now) {
                            // selected date is in the past
                            console.log("Expired!!!!!!");
                            deletePin();
                            message.error("6-digit token expired. Please click on the resend button.");
                        } else if (expiredTime > now) {
                            console.log("havent expire");
                        }
                    }, 180000
                );
            }).catch((error) => {
                console.log(error);
            });
    };

    const submitHandler = async e => {
        e.preventDefault();

        await axios.get(baseurl + 'getEmail', { params: { email: email } })
            .then(function (response) {
                // console.log("Response: " + response);
                if (response.data.message === "Email not registered!") {
                    setError(response.data.message);
                    // alert("fail")
                    console.log(response);
                } else {
                    // alert("work");
                    message.success("Please check your email for the 6-digit code!");
                    console.log("Successful email: " + email + ". Your token is: " + emailParams.number);
                    sendEmail();
                    insertPin();

                    navigate("/digitPin", { state: { digitPin: emailParams.number, emailBroughtOver: emailParams.email } });
                }
            }).catch((error) => {
                console.log(error.response);
                console.log(error.response.status);
                if (error.response.status === 401) {
                    setError(error.response.data.message);
                }
            });
    };


    return (
        <div className='main' >
            <Form onSubmitCapture={submitHandler} form={form} className="form-outer">
                <div className='form-inner'>
                    <img src={logo} alt="Logo" width={300} height={70} />
                    <h2>Forgot Password</h2>
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
                        name="email"
                        label={<label style={{ color: "white" }}>Email</label>}
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: "Please enter email!"
                            },
                        ]}>
                        <Input
                            placeholder="Enter Registered Email ID"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <input type="submit" value="SUBMIT" />
                </div>

            </Form>
        </div>
    );
}

export default EnterEmailScreen;