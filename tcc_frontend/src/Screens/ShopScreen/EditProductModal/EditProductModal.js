import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Modal, Form, Input, InputNumber, Upload, Space, message } from "antd";
import { Buffer } from "buffer";
const { TextArea } = Input;

function EditProductModal({ title, visible, onOk, onCancel, details }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState(details.pImage);

  const onChange = ({ fileList: curFileList }) => {
    // console.log(curFileList);
    const isLt2M = curFileList[curFileList.length - 1].size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    } else {
      setFileList(curFileList);
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    // console.log(src);
    
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

  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  // const beforeUpload = (file) => {
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isLt2M;
  // };

  // To convert BLOB to base64 encoded then load the base64 image STEP
  const convertToBase64 = (imgData) => {
    const imageBuffer = Buffer.from(imgData);
    const imageBuffer64 = imageBuffer.toString("base64");

    return imageBuffer64;
  };

  useEffect(() => {
    // console.log(details.pImage);

    // form.resetFields();
    // set initial form values
    form.setFieldsValue({
      pName: details.pName,
      pDesc: details.pDesc,
      pPrice: details.pPrice,
      pImage: details.pImage,
      pUrl: details.pURL,
    });

    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        fileList[i].thumbUrl = `data:image/jpg;base64,${convertToBase64(
          details.pImage[i]
        )}`;
      }
    }
  }, []);

  return (
    <Modal
      title={title}
      visible={visible}
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        // console.log(fileList);
        form
          .validateFields()
          .then((values) => {
            values = { ...values };
            values["pImage"] = fileList;
            // console.log(values);
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
          label="Product Image (Order: Front, Back, Left Side, Right Side)"
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
              maxCount={4}
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              onRemove={onRemove}
              beforeUpload={() => false} // () => false / beforeUpload
              accept = "image/*"
            >
              {fileList.length <= 4 && "+ Upload"}
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
