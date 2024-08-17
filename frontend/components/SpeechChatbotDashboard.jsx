import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { ChatBotComponent } from 'react-chatbot-with-text-and-speech';

import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';
import FileUploadComponent from './FileUploadComponent';
import RegisterForm from './RegisterForm';

function SpeechChatbotDashboard({ setContent }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const router = useRouter();
  const verifyUploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        // Store the uploaded file in state
        setUploadedFile(info.file);
      }
    },
  };

  // Utility function to introduce a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleMessage = async (message) => {
    console.log(message.data);

    if (message.data.toLowerCase().includes('new today')) {
      await navigator.clipboard.writeText('No. I want sth student related');

      setTimeout(() => {
        setContent(
          <div className='bg-white rounded-lg shadow-lg p-6 mx-auto max-w-4xl'>
            <div className='flex flex-col items-center md:flex-row md:items-start'>
              <img
                src='https://www.businesstoday.com.my/wp-content/uploads/2018/12/petrol-price-malaysia-9-15nov2017.png' // Replace with the actual path to your image
                alt='Petrol Incentive'
                className='w-40 h-40 rounded-full object-cover mb-4 md:mb-0 md:mr-6'
              />
              <div className='text-center md:text-left'>
                <h2 className='text-3xl font-semibold text-gray-800'>
                  B40 Malaysia Government Petrol Incentive
                </h2>
                <p className='text-gray-600 mt-3'>
                  The Malaysian government has introduced a new petrol incentive scheme targeted at the B40 income group. Eligible citizens will receive a monthly payment of RM200 directly into their bank accounts to ease the financial burden of rising fuel costs.
                </p>
                <p className='text-gray-600 mt-2'>
                  The incentive aims to support over 2 million B40 households, allowing them to afford essential travel for work, education, and daily activities. The scheme is automatically applied to all eligible MyKad holders, with no registration required.
                </p>
                <p className='text-gray-600 mt-2'>
                  Payments are disbursed on the 1st of every month starting from September 2024. For more information, visit your nearest government service center or log in to your MySejahtera account.
                </p>
              </div>
            </div>
          </div>,
        );
      }, 1000);

      await delay(2000); // Delay before returning the message
      return { text: 'I have this new B40 Malaysian Government Petrol Incentive that just released two days ago. Are you interested?' };
    }
    if (message.data.toLowerCase().includes('student related')) {
      await navigator.clipboard.writeText('Yes, this is good');

      setTimeout(() => {
        setContent(
          <div className='bg-white rounded-lg shadow-lg p-6 mx-auto max-w-4xl'>
            <div className='flex flex-col items-center md:flex-row md:items-start'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1x8T7K7dQVayZyPDJTMi-XFptantomNyQJA&s' // Replace with the actual path to your image
                alt='Student Incentive'
                className='w-40 h-40 rounded-full object-cover mb-4 md:mb-0 md:mr-6'
              />
              <div className='text-center md:text-left'>
                <h2 className='text-3xl font-semibold text-gray-800'>
                  B40 Malaysia Government Student Incentive
                </h2>
                <p className='text-gray-600 mt-3'>
                  The Malaysian government has launched a special incentive program for students from B40 families. Eligible students will receive a financial aid of RM150 per month to help cover educational expenses, such as books, transport, and school supplies.
                </p>
                <p className='text-gray-600 mt-2'>
                  This initiative aims to ensure that no student is left behind due to financial limitations. The program is designed to support over 500,000 students nationwide, particularly those in primary and secondary education. The funds will be automatically transferred to the student's or guardian's bank account every month.
                </p>
                <p className='text-gray-600 mt-2'>
                  The first payment starts in October 2024, and eligible students will be notified through their school or via SMS. For further details, visit your nearest education office or access the official government portal.
                </p>
              </div>
            </div>
          </div>,
        );
      }, 1000);

      await delay(2000); // Delay before returning the message
      return { text: 'I found this student related incentive. Does this suit you?' };
    }
    if (message.data.toLowerCase().includes('good')) {
      await navigator.clipboard.writeText("I want to apply for B40 student online course incentives.");
      setTimeout(() => {
        router.push('/apply');
        
      }, 3000);

      await delay(2000); // Delay before returning the message
      return { text: 'Now redirecting you to apply for the B40 student incentive' };
    }

    await delay(2000); // Delay before returning the fallback message
    return { text: 'Sorry, I did not understand that.' };
  };

  const options = {
    botImageUrl: '/images/chatbotIcon_optimized.png',
    speechRecognition: false,
    textToSpeech: true,
    inputBoxPlaceholder: 'What can I help you with?',
  };

  return  <>
  <style>
    {`
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css');

    ._3ybTi {
      margin: 2em;
      padding: 0.5em;
      border: 2px solid #000;
      font-size: 2em;
      text-align: center;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
    }

    ._1Lxpd {
      max-width: unset;
      margin: auto;
    }

    img {
      max-width: 100%;
    }

    ._X0mzc {
      margin: 20px 0 0;
    }

    ._3MUsL h4 {
      color: #05728f;
      font-size: 21px;
      margin: auto;
    }

    ._2Q7SN {
      display: inline-block;
    }

    ._q31tH {
      display: inline-block;
      padding: 0 0 0 10px;
      vertical-align: top;
    }

    ._2sja3 p {
      background: #ebebeb none repeat scroll 0 0;
      border-radius: 3px;
      color: #646464;
      font-size: 14px;
      margin: 0;
      padding: 15px 10px 15px 12px;
      width: 100%;
    }

    ._2LpYc {
      color: #747474;
      display: block;
      font-size: 12px;
      margin: 8px 0 0;
    }

    ._ITael {
      display: flex;
      flex-direction: column;
      width: 98%;
      border: 1px solid #c4c4c4;
      clear: both;
      overflow: hidden;
      padding: 5px;
      margin: 20px;
    }

    ._1YVLC p {
      background: #05728f none repeat scroll 0 0;
      border-radius: 3px;
      font-size: 14px;
      margin: 0;
      color: #fff;
      padding: 15px 10px 15px 12px;
      width: 100%;
    }

    ._2QFY2 {
      overflow: hidden;
      margin: 26px 0 26px;
    }

    ._1YVLC {
      float: right;
      width: 46%;
    }

    ._1DbID {
      min-width: 100%;
      border: none;
      padding-left: 20px;
      min-height: 40px;
      background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
      color: #4c4c4c;
      font-size: 15px;
      min-height: 48px;
      width: 97%;
      margin-bottom: 10px;
    }

    ._3RKbk input._KdU8Q {
      background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
      border: medium none;
      color: #4c4c4c;
      font-size: 15px;
      min-height: 48px;
      width: 97%;
      padding-left: 20px;
      margin-bottom: 10px;
    }

    ._1zt_1 {
      border-top: 1px solid #c4c4c4;
    }

    ._24B_J {
      background: #05728f none repeat scroll 0 0;
      border: medium none;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      font-size: 17px;
      height: 33px;
      width: 33px;
      float: right;
      margin-top: 5px;
    }

    ._3DmqK {
      height: calc(100vh - 230px);
      overflow-y: auto;
      margin-top: 50px;
      width: 100%;
    }

    ._1qbZS {
      min-width: 64px;
    }

    ._1vfIh {
      position: absolute;
    }

    ._2ESDW {
      padding: 10px;
      width: 100%;
      height: 500px;
    }

    ._28gVM {
      display: flex;
      gap: 31px;
      flex-flow: row;
    }

    ._DO15e {
      display: flex;
      flex-direction: row;
    }

    ._2uu7s {
      width: 450px;
      min-width: 450px;
      height: calc(100vh - 230px);
      margin-top: 50px;
    }
    `}
  </style>

  <ChatBotComponent options={options} handleMessage={handleMessage} />
</>;
}

export default SpeechChatbotDashboard;