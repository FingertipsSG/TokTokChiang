import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Form, Input,InputNumber } from 'antd';

function EditShopModal({ title, visible, onOk, onCancel, details }) {
    const [form] = Form.useForm();
    form.resetFields();

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
                    <Input defaultValue={details.sName} />
                </Form.Item>
    
            </Form>
        </Modal>
    );
}

export default EditShopModal;