import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

function EditUserModal({ title, visible, onOk, onCancel, details }) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(({
            uName: details.uName,
            uPass: details.uPass,
            uEmail: details.uEmail,
            uRole: details.uRole,
        }));
    });

    return (
        <Modal
            title={title}
            visible={visible}
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onOk(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="uName"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="uPass"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter password!',
                        },
                    ]}
                    hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                    name="uCPass"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('uPass') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="uEmail"
                    label="User's Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter email!',
                        },
                    ]}
                >
                    <Input/>
 
                </Form.Item>
                <Form.Item
                    name="uRole"
                    label="Role"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter User &nbsp Role!',
                        },
                    ]}
                >
                  <Select
                        placeholder="Select role"
                        allowClear
                    >
                        <Option value="master">Master</Option>
                        <Option value="staff">Staff</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditUserModal;