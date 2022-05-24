import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input } from 'antd';

function AddShopModal({ title, visible, onOk, onCancel }) {
    const [form] = Form.useForm();

    return (
        <Modal
            title={title}
            visible={visible}
            okText="Submit"
            cancelText="Cancel"
            onCancel={() => {onCancel(); form.resetFields();}}
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
                    name="sName"
                    label="Shop Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter product name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
    
            </Form>
        </Modal>
    );
}

export default AddShopModal;