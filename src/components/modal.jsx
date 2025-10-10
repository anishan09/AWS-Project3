import React, { useState } from "react";
import { Button, Modal, Form, Input, TimePicker, Result } from 'antd';

const CustomModal = ({ open, title, handleCancel, handleOk }) => {
    const [res, setResult] = useState(false);
    const [form] = Form.useForm();

    const onSubmit = () => {
        form.validateFields()
            .then(values => {
                form.resetFields();
                setResult(true);
                setTimeout(() => {
                    handleOk(values);
                    setResult(false);
                }, 3000);
                
                 // Show the success message after successful submission
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            open={open}
            title={title}
            onCancel={handleCancel}
            footer={
                !res && [ // Only show footer buttons if the result is not displayed
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                ]
            }
        >
            {res ? (
                <Result
                    status="success"
                    title="Successfully Scheduled Appointment"
                />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    name="appointmentForm"
                >
                    <Form.Item
                        name="doctorName"
                        label="Doctor Name"
                        rules={[{ required: true, message: 'Please input the doctor\'s name!' }]}
                    >
                        <Input placeholder="Enter doctor's name" />
                    </Form.Item>
                    <Form.Item
                        name="appointmentTime"
                        label="Appointment Time"
                        rules={[{ required: true, message: 'Please select the appointment time!' }]}
                    >
                        <TimePicker use12Hours format="h:mm a" />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default CustomModal;
