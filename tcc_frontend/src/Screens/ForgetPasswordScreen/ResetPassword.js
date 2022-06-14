import React, { useState } from 'react';
import "./ResetPassword.css";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { message, Form, Input } from 'antd';
import logo from '../../Assets/Images/toktoklogo.png';
import config from '../../config';

function ResetPassword() {
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [cfmPassword, setCfmPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const email = location.state.emailBroughtOver;
    // console.log("Email: " + email);

    const updatePassword = () => {
        axios.patch(config.LOCAL_BACKEND + '/updatePassword', { password: password, email: email })
            .then(function (response) {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    };

    const submitHandler = e => {
        e.preventDefault();
        console.log("PW: " + password);
        console.log("Cfm Pw: " + cfmPassword);

        if (password === cfmPassword) {
            message.success("Password match!");
            updatePassword();
            navigate("/login");
        } else {
            setError("Password dont match!");
        }
    };

    return (
        <div className='main' >
            <Form form={form} onSubmitCapture={submitHandler} className="form-outer">
                <div className='form-inner'>
                    <img src={logo} alt="Logo" width={300} height={70} />
                    <h2>Reset Password</h2>
                    <Form.Item
                        name="password"
                        label={<label style={{ color: "white" }}>Password</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder='Enter New Password'
                            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                            style={{width: "80%", marginLeft: "50px"}}
                            title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />                    
                    </Form.Item>

                    <Form.Item
                        name="cfmPassword"
                        label={<label style={{ color: "white" }}>Confirm Password</label>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            placeholder='Confirm New Password'
                            value={cfmPassword} onChange={e => setCfmPassword(e.target.value)}
                        />                    
                    </Form.Item>
                    <input type="submit" value="SUBMIT" />
                </div>
            </Form>
        </div>
    );
}

export default ResetPassword;