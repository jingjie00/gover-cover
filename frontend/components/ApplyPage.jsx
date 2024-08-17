import React, { useState, useEffect } from 'react';
import {
  Tabs, Form, Input, Button, Checkbox,
} from 'antd';
import {
  UserOutlined, LockOutlined, MailOutlined, IdcardOutlined, PhoneOutlined, UploadOutlined,
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Dragger from 'antd/lib/upload/Dragger';
import Chatbot from 'react-chatbot-kit';
import { SettingActions } from './reducers/settingReducer';
import Layout from './general/Layout';
import 'react-chatbot-kit/build/main.css';
import config from './registerChatbot/ChatbotConfig';
import MessageParser from './registerChatbot/MessageParser';
import ActionProvider from './registerChatbot/ActionProvider';
import SpeechChatbot from './SpeechChatbot';
import SpeechChatbotApply from './SpeechChatbotApply';

const { TabPane } = Tabs;

function ApplyPage({ data }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [renderedContent, setRenderedContent] = useState(<div className='flex items-center align-center justify-center'><img src="/images/blob.gif" width={900} height={900}></img></div>)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
    });

    dispatch(SettingActions.setLoading(false));
  }, []);

  function handleContent (value){
setRenderedContent(value)
  }

  return (
    <Layout>
      <div className='w-full flex flex-row'>
        <div className='w-2/3 p-4 overflow-y-scroll'>

          {renderedContent}

        </div>

        <div className=' w-1/3 flex flex-col '>

          <div className='absolute right-8 top-24 rounded-lg bg-gradient-to-r from-red-800  to-green-700'>
            <div className='text-lg text-white font-bold px-2 '>GoVer AI</div>
          </div>
          <div>
            <SpeechChatbotApply setContent={handleContent} />
          </div>

        </div>
         
    

      </div>
    </Layout>
  );
}

export default ApplyPage;
