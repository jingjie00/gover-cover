import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { ChatBotComponent } from 'react-chatbot-with-text-and-speech';

import emailjs from 'emailjs-com';
import FileUploadComponent from './FileUploadComponent';
import RegisterForm from './RegisterForm';

function SpeechChatbot({ setContent }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const verifyUploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        setUploadedFile(info.file);
      }
    },
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleMessage = async (message) => {
    console.log(message.data);

    if (message.data.toLowerCase().includes('how do i register')) {
      await navigator.clipboard.writeText('Done uploading.');
      setTimeout(() => {
        setContent(
          <div><FileUploadComponent /></div>,
        );
      }, 1000);

      await delay(1000); // Add a 2-second delay before returning
      return { text: 'Great to have you onboard! Please upload a clear picture of your IC to proceed.' };
    }
    if (message.data.toLowerCase().includes('uploading')) {
      await navigator.clipboard.writeText('Please proceed.');
      setTimeout(() => {
        setContent(
          <div><RegisterForm /></div>,
        );
      }, 2000);

      await delay(1000); // Add a 2-second delay before returning
      return { text: 'I have extracted your personal information. Please fill in your email and phone number.' };
    }
    if (message.data.toLowerCase().includes('please proceed')) {
      emailjs.init('nEOa7brxpEkuoZvpM');

      emailjs.send('service_dfxu0dm', 'template_r29dk04');

      setTimeout(() => {
        setContent(
          <div className='flex h-full flex-col items-center align-center justify-center'>
            <img src='/images/doneGif.gif' alt="Done" />
            <div className='flex text-center text-xl items-center align-center justify-center my-4'>Register Successful.</div>
          </div>,
        );
      }, 1000);

      await delay(1000); // Add a 2-second delay before returning
      return { text: 'Your personal information are now under review. Please check your email for confirmation.' };
    }

    await delay(1000); // Add a 2-second delay before returning
    return { text: 'Sorry, I did not understand that.' };
  };

  const options = {
    botImageUrl: '/images/chatbotIcon_optimized.png',
    speechRecognition: false,
    textToSpeech: true,
    inputBoxPlaceholder: 'What can I help you with?',
  };

  return (
    <>
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
    </>
  );
}

export default SpeechChatbot;
