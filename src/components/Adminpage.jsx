import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { IoWarningOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { GiAlarmClock } from "react-icons/gi";
import {
    Avatar, Button, Layout, Menu, Popover, Popconfirm, Card, List, Statistic, Typography, Row, Col, Modal
} from 'antd';
import CountUp from 'react-countup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const AdminPage = () => {
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [pending, setPending] = useState(0);
    const [scheduled, setScheduled] = useState(0);
    const [canceled, setCanceled] = useState(0);
    const [collapsed, setCollapsed] = useState(true);
    const [loading, setLoading] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const cookie = Cookies.get("_id");
        axios.get('http://54.234.124.157:3001/admin',{cookie})
            .then(response => {
                const appointments = response.data;
                setAppointments(appointments);

                let pendingCount = 0;
                let scheduledCount = 0;
                let canceledCount = 0;

                for (const appointment of appointments) {
                    if (appointment.status === 'Pending') {
                        pendingCount++;
                    } else if (appointment.status === 'Scheduled') {
                        scheduledCount++;
                    } else if (appointment.status === 'Canceled') {
                        canceledCount++;
                    }
                }

                setPending(pendingCount);
                setScheduled(scheduledCount);
                setCanceled(canceledCount);
            })
            .catch(error => {
                console.error("There was an error fetching the appointments!", error);
            });
    }, []);

    const handleSchedule = (item) => {
        setCurrentItem(item);
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setLoading(prev => ({ ...prev, [currentItem._id]: true }));
        axios.put(`http://54.234.124.157:3001/admin/${currentItem._id}/schedule`)
            .then(response => {
                setAppointments(prev => prev.map(item => item._id === currentItem._id ? { ...item, status: 'Scheduled' } : item));
                setScheduled(prev => prev + 1);
                setPending(prev => prev - 1);
                setLoading(prev => ({ ...prev, [currentItem._id]: false }));
                setOpen(false);
            })
            .catch(error => {
                console.error("There was an error scheduling the appointment!", error);
                setLoading(prev => ({ ...prev, [currentItem._id]: false }));
            });
    };

    const handleCancelAppointment = (id) => {
        setLoading(prev => ({ ...prev, [id]: true }));
        axios.put(`http://54.234.124.157:3001admin/${id}/cancel`)
            .then(response => {
                setAppointments(prev => prev.map(item => item._id === id ? { ...item, status: 'Canceled' } : item));
                setCanceled(prev => prev + 1);
                setPending(prev => prev - 1);
                setLoading(prev => ({ ...prev, [id]: false }));
            })
            .catch(error => {
                console.error("There was an error canceling the appointment!", error);
                setLoading(prev => ({ ...prev, [id]: false }));
            });
    };

    const formatter = (value) => <CountUp end={value} separator="," />;

    const data = [
        {
            title: 'Pending Appointments',
            description: 'Manage pending appointments here.',
            count: pending,
            icon: <SlCalender />,
            color: '#FFD147'
        },
        {
            title: 'Scheduled Appointments',
            description: 'View and manage scheduled appointments.',
            count: scheduled,
            icon: <GiAlarmClock />,
            color: '#79B5EC'
        },
        {
            title: 'Canceled Appointments',
            description: 'Review canceled appointments.',
            count: canceled,
            icon: <IoWarningOutline />,
            color: '#FF4F4E'
        },
    ];

    const popoverContent = (
        <div>
            <Paragraph>Are you sure you want to schedule this appointment?</Paragraph>
            <Button onClick={handleOk} type="primary" loading={loading[currentItem?._id]}>
                Schedule
            </Button>
            <Button onClick={handleCancel} type="default">
                Cancel
            </Button>
        </div>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="md" collapsedWidth="0">
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LogoutOutlined />} onClick={() => navigate('/')}>
                        Home
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                        borderRadius: '8px',
                    }}
                >
                    <Title level={2} className="mb-4">Welcome to the Admin Panel</Title>
                    <Paragraph className="mb-8">Here you can manage your application settings, users, and more.</Paragraph>
                    
                    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                        {data.map((item) => (
                            <Col xs={24} sm={12} md={8} key={item.title}>
                                <Card
                                    title={item.title}
                                    bordered={false}
                                    style={{
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        textAlign: 'center',
                                    }}
                                >
                                    <div style={{ fontSize: '24px', color: item.color }}>
                                        {item.icon}
                                    </div>
                                    <Statistic
                                        title={item.title}
                                        value={item.count}
                                        valueStyle={{ color: item.color }}
                                        formatter={formatter}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    
                    <List
                        bordered
                        dataSource={appointments}
                        renderItem={(item) => (
                            <List.Item>
                                <div className='flex flex-wrap gap-5 w-full'>
                                    <Avatar icon={<UserOutlined />} />
                                    <div>
                                        <p><strong>Patient Name:</strong> {item.patientName}</p>
                                        <p><strong>Reason:</strong> {item.reason}</p>
                                        <p><strong>Appointment Date:</strong> {item.appointmentDate}</p>
                                        <p><strong>Status:</strong> <span className={`text-${item.status === 'Pending' ? 'orange' : item.status === 'Scheduled' ? 'blue' : 'red'}`}>{item.status}</span></p>
                                        <p><strong>Phone No:</strong> {item.phoneNo}</p>
                                        <p><strong>Email:</strong> {item.email}</p>
                                        <p><strong>Address:</strong> {item.address}</p>
                                        <p><strong>Gender:</strong> {item.gender}</p>
                                        <p><strong>Blood Group:</strong> {item.bloodGroup}</p>
                                        <p><strong>Occupation:</strong> {item.occupation}</p>
                                        <p><strong>Insurance Policy No:</strong> {item.insurancePolicyNo}</p>
                                        <p><strong>Medical History:</strong> {item.medicalHistory}</p>
                                        <p><strong>Current Medication:</strong> {item.currentMedication}</p>
                                        <p><strong>Emergency Contact:</strong> {item.emergencyContact}</p>
                                    </div>
                                    <div className='ml-auto'>
                                        <Popover
                                            content={popoverContent}
                                            title="Confirmation"
                                            trigger="click"
                                            onClick={() => handleSchedule(item)}
                                        >
                                            <Button 
                                                type="primary" 
                                                style={{ marginRight: '8px' }} 
                                                disabled={item.status !== 'Pending' || loading[item._id]}
                                                loading={loading[item._id] && item.status === 'Pending'}
                                            >
                                                Schedule
                                            </Button>
                                        </Popover>
                                        <Popconfirm
                                            title="Cancel the Appointment"
                                            description="Are you sure to cancel this Appointment?"
                                            onConfirm={() => handleCancelAppointment(item._id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button 
                                                danger 
                                                disabled={item.status !== 'Pending' || loading[item._id]}
                                                loading={loading[item._id] && item.status === 'Pending'}
                                            >
                                                Cancel
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
            <Modal
                title="Confirmation"
                visible={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Popover
                    content={popoverContent}
                    title="Confirmation"
                    trigger="click"
                >
                    <Button type="primary" onClick={handleOk}>Confirm</Button>
                </Popover>
            </Modal>
        </Layout>
    );
};

export default AdminPage;
