import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

const RegisterForm = () => {
  const [form] = Form.useForm();

  // Default values for the form
  const defaultValues = {
    name: 'Soh Huang Siah',
    icNumber: '010625-78-9012',
    dob: moment('2001-06-25'), // DatePicker requires moment for default date
    address: '33, Jalan Desa 7/13a, Bandar Country Homes, 48000 Rawang',
    phoneNumber: '',
    email: '',
  };

  // Layout styling using Tailwind CSS
  const tailLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
  };

  return (
    <div className="flex justify-center items-centerbg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
       
        <Form
          {...tailLayout}
          form={form}
          initialValues={defaultValues}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="IC Number"
            name="icNumber"
            rules={[{ required: true, message: 'Please enter your IC number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Please select your date of birth' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;