import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Modal, List, Progress, Typography, Badge } from 'antd';
import { 
  GiftOutlined, 
  RocketOutlined, 
  TrophyOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './general/Layout';
import { useRouter } from 'next/router';
import SpeechChatbotDashboard from './SpeechChatbotDashboard';
import { useDispatch } from 'react-redux';
import { SettingActions } from './reducers/settingReducer';

const { Title } = Typography;
const { Header, Content, Sider } = Layout;


const newIncentives = [
  {
    title: "Petrol Subsidy",
    details: "Get a monthly RM200 subsidy for your fuel expenses.",
    color: "bg-blue-500",
    textColor: "text-blue-600",
    icon: "⛽", // You can replace this with an actual icon component
  },
  {
    title: "Student Financial Aid",
    details: "Receive RM150 monthly aid for eligible students.",
    color: "bg-green-500",
    textColor: "text-green-600",
    icon: "🎓",
  },
  {
    title: "Health Assistance",
    details: "Get free health checkups and subsidized medication.",
    color: "bg-red-500",
    textColor: "text-red-600",
    icon: "💊",
  },
  {
    title: "Housing Grant",
    details: "Up to RM20,000 grant for first-time home buyers.",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    icon: "🏠",
  },
];

const applicationStatus = [
  {
    title: "Petrol Subsidy Application",
    progress: 80,
    status: "In Progress",
  },
  {
    title: "Student Financial Aid Application",
    progress: 100,
    status: "Completed",
  },
  {
    title: "Health Assistance Application",
    progress: 50,
    status: "In Progress",
  },
  {
    title: "Housing Grant Application",
    progress: 25,
    status: "Pending",
  },
];

const transactionHistory = [
  {
    title: "Petrol Subsidy Payment",
    date: "15th August 2024",
    status: "Completed",
  },
  {
    title: "Student Financial Aid Payment",
    date: "1st August 2024",
    status: "Completed",
  },
  {
    title: "Health Assistance Claim",
    date: "20th July 2024",
    status: "Pending",
  },
  {
    title: "Housing Grant Disbursement",
    date: "10th July 2024",
    status: "In Progress",
  },
];

const notifications = [
  {
    title: "Application Deadline Approaching",
    description: "Reminder: Your application for the B40 Student Incentive closes on 30th September 2024.",
    date: "2 days ago",
  },
  {
    title: "Document Submission Required",
    description: "Please upload your proof of enrollment to complete your application.",
    date: "5 days ago",
  },
  {
    title: "New Incentive Available",
    description: "Check out the latest petrol incentive available for eligible users.",
    date: "1 week ago",
  },
  {
    title: "System Maintenance",
    description: "The application portal will be down for maintenance on 10th October from 12:00 AM to 4:00 AM.",
    date: "3 days ago",
  },
];
const news = [
  {
    title: "Government Launches New Housing Scheme",
    description: "A new housing scheme has been launched to provide financial assistance to first-time home buyers from the B40 group.",
    date: "5th August 2024",
  },
  {
    title: "Updates to Health Subsidy Program",
    description: "The health subsidy program now covers more medical expenses, including specialist visits and prescription medication.",
    date: "1st August 2024",
  },
  {
    title: "Education Grants for B40 Students",
    description: "New grants are available for B40 students entering tertiary education. Apply before 15th September 2024.",
    date: "20th July 2024",
  },
  {
    title: "Petrol Subsidy Program Extended",
    description: "The petrol subsidy program has been extended for another year, providing much-needed relief for eligible households.",
    date: "10th July 2024",
  },
];




const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const marqueeRef = useRef(null);
  const router = useRouter();
  const [renderedContent, setRenderedContent] = useState(null)

  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
    });
    dispatch(SettingActions.setLoading(false));

    setRenderedContent(  <div className="w-full mx-auto px-4 space-y-8">
      {/* New Eligible Incentives */}
      <div>
        <Card title="New Eligible Incentives" bordered={false} data-aos="fade-up" className="hover:shadow-2xl transition-shadow duration-500 rounded-lg">
          <div
            className="marquee overflow-hidden"
            onMouseEnter={() => (marqueeRef.current.style.animationPlayState = 'paused')}
            onMouseLeave={() => (marqueeRef.current.style.animationPlayState = 'running')}
          >
            <div className="marquee-content flex animate-marquee" ref={marqueeRef}>
              {newIncentives.concat(newIncentives).map((incentive, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 mb-4 mx-2 cursor-pointer hover:bg-gradient-to-r from-gray-100 to-white"
                  onClick={() => router.push('/')}
                >
                  <div className="flex items-center">
                    <div className={`${incentive.color} text-white p-3 rounded-full mr-4 shadow-lg`}>
                      {incentive.icon}
                    </div>
                    <span className={`font-semibold ${incentive.textColor}`}>{incentive.title}</span>
                  </div>
                  <div className="text-gray-500">
                    {incentive.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Application Status Tracker */}
      <div>
        <Card title="Application Status Tracker" bordered={false} className="hover:shadow-2xl transition-shadow duration-500 rounded-lg">
          <List
            itemLayout="horizontal"
            dataSource={applicationStatus}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<span className="font-semibold">{item.title}</span>}
                  description={<Progress percent={item.progress} status={item.progress === 100 ? 'success' : 'active'} />}
                />
                <Badge
                  count={item.status}
                  style={{
                    backgroundColor: item.progress === 100 ? '#52c41a' : '#f0ad4e',
                    color: 'white',
                  }}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

   
    </div>)
    // Trigger modal after 20 seconds
    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  
  
  
  }, []);

  const newIncentives = [
    { title: 'Bantuan Prihatin Nasional (BPN)', details: 'Eligibility: High | Deadline: 30/09/2024', icon: <GiftOutlined />, color: 'bg-green-500', textColor: 'text-green-600' },
    { title: 'Geran Khas Prihatin (GKP)', details: 'Eligibility: Medium | Deadline: 15/10/2024', icon: <RocketOutlined />, color: 'bg-purple-500', textColor: 'text-purple-600' },
    { title: 'Program Subsidi Upah', details: 'Eligibility: Low | Deadline: 01/11/2024', icon: <TrophyOutlined />, color: 'bg-orange-500', textColor: 'text-orange-600' },
    { title: 'Bantuan Sara Hidup (BSH)', details: 'Eligibility: High | Deadline: 20/09/2024', icon: <FileTextOutlined />, color: 'bg-blue-600', textColor: 'text-blue-600' },
    { title: 'Skim Bantuan Persekolahan', details: 'Eligibility: Medium | Deadline: 25/10/2024', icon: <CheckCircleOutlined />, color: 'bg-red-500', textColor: 'text-red-600' },
  ];

  const applicationStatus = [
    { title: 'Petrol Subsidy Application', progress: 75, status: 'In Progress' },
    { title: 'Education Grant Application', progress: 100, status: 'Approved' },
    { title: 'Healthcare Assistance Application', progress: 50, status: 'Pending' },
  ];

  const transactionHistory = [
    { title: 'Petrol Subsidy - Submitted', date: '01/08/2024', status: 'Verified' },
    { title: 'Education Grant - Approved', date: '20/07/2024', status: 'Verified' },
    { title: 'Healthcare Assistance - Submitted', date: '15/07/2024', status: 'Pending' },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleContent (value){
    setRenderedContent(value)
      }
  return (
    <Layout>

<div className='w-full flex flex-row'>
        <div className='w-2/3 p-4 h-screen overflow-y-scroll'>

          {renderedContent}

        </div>

        <div className=' w-1/3 flex flex-col '>

          <div className='absolute right-8 top-24 rounded-lg bg-gradient-to-r from-red-800  to-green-700'>
            <div className='text-lg text-white font-bold px-2 '>GoVer AI</div>
          </div>
          <div>
            <SpeechChatbotDashboard setContent={handleContent} />
          </div>

        </div>

      </div>
    
    </Layout>
  );
};

export default Dashboard;