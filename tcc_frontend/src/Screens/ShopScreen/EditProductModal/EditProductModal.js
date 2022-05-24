import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Modal, Form, Input, InputNumber, Upload, Space } from "antd";
import { Buffer } from "buffer";
const { TextArea } = Input;

function EditProductModal({ title, visible, onOk, onCancel, details }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([details.pImage]);

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
    // if file is empty, throw a new error
    if (!file) {
      throw new Error("No image selected.");
    }

    // If there's an image, proceed to convert
    // Safe to do this since base64 encoded string will never have ',' within it
    const byteCharacters = atob(file.thumbUrl.split(",")[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new Blob([byteArray], { type: "image/png" });
  };

  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  form.resetFields();

  useEffect(() => {
    // set initial form values
    form.setFieldsValue({
      pName: details.pName,
      pDesc: details.pDesc,
      pPrice: details.pPrice,
      pImage: [details.pImage],
      pUrl: details.pURL,
    });

    // add blob data for pop-up preview of image
    if (fileList[0]) {
      fileList[0]["thumbUrl"] = `data:image/jpg;base64,${convertToBase64(
        details.pImage.data
      )}`;
    }
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
            values = { ...values, pImage: convertToBlob(fileList[0]) };
            form.resetFields();
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
          <TextArea showCount maxLength={100} style={{ height: 120 }} />
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

export default EditProductModal;
