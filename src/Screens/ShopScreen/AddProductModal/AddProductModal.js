import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Form, Input, InputNumber, Upload, Space } from "antd";
// import "./AddProductModal.css";

const { TextArea } = Input;

function AddProductModal({ title, visible, onOk, onCancel }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: curFileList }) => {
    setFileList(curFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const convertToBlob = (file) => {
    const byteCharacters = atob(
      file.thumbUrl.replace("data:image/png;base64,", "")
    );

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: "image/png" });
  };

  // const beforeUpload = (file) => {
  //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  //     if (!isJpgOrPng) {
  //         message.error('You can only upload JPG/PNG file!');
  //     }
  //     const isLt2M = file.size / 1024 / 1024 < 2;
  //     if (!isLt2M) {
  //         message.error('Image must smaller than 2MB!');
  //     }
  //     return isJpgOrPng && isLt2M;
  // }

  return (
    <Modal
      title={title}
      visible={visible}
      okText="Submit"
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        form.resetFields();
        setFileList([]);
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            values = { ...values, pImage: convertToBlob(fileList[0]) };
            form.resetFields();
            setFileList([]);
            onOk(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="pName"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please enter product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pDesc"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Please enter product description!",
            },
          ]}
        >
          <TextArea showCount maxLength={1000} style={{ height: 120 }} />
        </Form.Item>
        <Form.Item
          name="pPrice"
          label="Product Price"
          rules={[
            {
              required: true,
              message: "Please enter product price!",
            },
          ]}
        >
          <InputNumber
            prefix="$"
            style={{ width: "100%" }}
            min={1}
            precision={2}
            step={0.1}
          />
        </Form.Item>
        
        <Form.Item
          name="pImage"
          label="Product Image"
          rules={[
            {
              required: true,
              message: "Please upload product image!",
            },
          ]}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => false}
            >
              {fileList.length <= 1 && "+ Upload"}
            </Upload>
          </Space>
        </Form.Item>

        <Form.Item
          name="pUrl"
          label="Product URL"
          rules={[
            {
              required: true,
              message: "Please enter product url!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddProductModal;
