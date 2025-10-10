import React, { useState, useEffect } from 'react';
import { Avatar, Card, Popconfirm, Button, Typography, Row, Col } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const MyAppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch user's appointment data from the backend
        
        axios.get('http://54.234.124.157:3001/my-appointments', {
            withCredentials: true
        })
        .then(response => {
            setAppointments(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the appointments!", error);
        });
    }, []);

    const handleCancelAppointment = (id) => {
        axios.put(`https://hospital-management-a92k.onrender.com/appointments/${id}/cancel`)
        .then(response => {
            setAppointments(prevAppointments => prevAppointments.map(item => item._id === id ? { ...item, status: 'Canceled' } : item));
        })
        .catch(error => {
            console.error("There was an error canceling the appointment!", error);
        });
    };

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
            <Title level={2} className="mb-4">My Appointments</Title>
            <Row gutter={16}>
                {appointments.map((item) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
                        <Card
                            title={<span>{item.reason}</span>}
                            bordered={true}
                            style={{ borderRadius: '8px', marginBottom: '16px' }}
                            extra={
                                item.status !== 'Canceled' && (
                                    <Popconfirm
                                        title="Are you sure to cancel this appointment?"
                                        onConfirm={() => handleCancelAppointment(item._id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                       
                                    </Popconfirm>
                                )
                            }
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: '16px' }} />
                                <div style={{ textAlign: 'left' }}>
                                    <Paragraph><strong>Patient Name:</strong> {item.patientName}</Paragraph>
                                    <Paragraph><strong>Appointment Date:</strong> <CalendarOutlined /> {item.appointmentDate}</Paragraph>
                                    <Paragraph><strong>Status:</strong> <span className={`text-${item.status === 'Pending' ? 'orange' : item.status === 'Scheduled' ? 'blue' : 'red'}`}>{item.status}</span></Paragraph>
                                    <Paragraph><strong>Phone No:</strong> {item.phoneNo}</Paragraph>
                                    <Paragraph><strong>Email:</strong> {item.email}</Paragraph>
                                    <Paragraph><strong>Address:</strong> {item.address}</Paragraph>
                                    <Paragraph><strong>Gender:</strong> {item.gender}</Paragraph>
                                    <Paragraph><strong>Blood Group:</strong> {item.bloodGroup}</Paragraph>
                                    <Paragraph><strong>Occupation:</strong> {item.occupation}</Paragraph>
                                    <Paragraph><strong>Insurance Policy No:</strong> {item.insurancePolicyNo}</Paragraph>
                                    <Paragraph><strong>Medical History:</strong> {item.medicalHistory}</Paragraph>
                                    <Paragraph><strong>Current Medication:</strong> {item.currentMedication}</Paragraph>
                                    <Paragraph><strong>Emergency Contact:</strong> {item.emergencyContact}</Paragraph>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default MyAppointmentPage;
