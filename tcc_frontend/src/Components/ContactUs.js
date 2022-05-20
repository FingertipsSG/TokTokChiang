import React from "react";
import "../Components/css/contactus.css";
import Navbar from "../Components/Navbar";
import { Form, Button, Input, message } from "antd";
import "antd/dist/antd.css";
import { postApi } from "../Helper/Utils";
/*import background from "../Assets/Images/ContactUs.png";*/

function ContactUs() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        postApi("postEmail", values)
        .then((response) => {
            // console.log("Success:", response);
            message.success(response.message);
            form.resetFields();
        });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <html>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

            <body  className="contactUs-body">
                <div>
                    <Navbar />
                    <div className="ContactUs">
                        <h1> Stay Connected With Us</h1>
                        <p>Feel free to contact us anytime time.<br />We will get back to you as soon as we can!</p>

                        <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Name!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!",
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your phone number!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Message"
                                name="message"
                                rules={[
                                {
                                    required: true,
                                    message: "Please input message",
                                },
                                ]}
                            >
                                <Input.TextArea showCount maxLength={1000} />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                offset: 8,
                                span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </body>
        </html>
    );
}

export default ContactUs;
