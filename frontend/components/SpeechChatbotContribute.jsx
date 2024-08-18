import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form, notification } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { ChatBotComponent } from 'react-chatbot-with-text-and-speech';

import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';
import FileUploadComponent from './FileUploadComponent';
import RegisterForm from './RegisterForm';
import { useDispatch } from 'react-redux';
import { SettingActions } from './reducers/settingReducer';
import Cookies from 'js-cookie';
import { AptosAccount, AptosClient } from 'aptos';

const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';

const aptosClient = new AptosClient(NODE_URL);


function SpeechChatbotContribute({ setContent }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const dispatch = useDispatch();

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


  const sendTransaction = async () => {
    try {
      // Load the government account using its private key
      const governmentPrivateKey = '998adc8b753d91dff7df63674e1edf1046fd5a13f1c0e044770cd55cd8672533'; // Replace with your actual private key
      const government = new AptosAccount(Buffer.from(governmentPrivateKey, 'hex'));
  
      // Define the transaction payload
      const payload = {
        type: 'entry_function_payload',
        function: '0x242c55e5645f7266eb4dde738242ba24567e6dd6a084ea8be06fe7629b637f55::message::set_message',
        type_arguments: [], // No type arguments needed unless required by the function
        arguments: ['{"Transfer to": "{ \"incentive\": \"Free smart tablets\", \"criteria\": { \"target_group\": \"B40\", \"number_of_items\": 1000, \"eligibility\": \"Successful applicants\", \"description\": \"The first 1000 successful B40 incentive applicants will receive a free smart tablet.\" }}"}'],
        // Arguments passed to the function
      };
  
      // Generate and submit the transaction
      const txnRequest = await aptosClient.generateTransaction(government.address(), payload);
      const signedTxn = await aptosClient.signTransaction(government, txnRequest);
      const txnResponse = await aptosClient.submitTransaction(signedTxn);
  
      // Wait for the transaction to be finalized
      await aptosClient.waitForTransaction(txnResponse.hash);
  
      // Notify the user of success
    
      console.log(`Transaction hash: ${txnResponse.hash}`);

      notification.success({
        message: 'Sponsorship Transaction Successful',
        description: (
          <>
            {`Message hash: ${txnResponse.hash}`}
          </>
        ),
      })

      return (txnResponse.hash)
  
     
    } catch (error) {
      console.error('Transaction failed:', error);
      notification.error({
        message: 'Transaction Failed',
        description: error.message,
      });
    }
  };

  const handleMessage = async (message) => {
    if (message.data.toLowerCase().includes('make a contribution')) {
      await navigator.clipboard.writeText('I want to give out smart tablets to schooling children from B40 families.');

      setTimeout(() => {
        setContent(
          <div className='w-full flex items-center align-center justify-center'>
            <div className='bg-white w-2/3 rounded-lg shadow-lg p-6 flex flex-col items-center'>
              <img
                src='/path-to-your-image.jpg'
                alt='Description of Image'
                className='w-32 h-32 rounded-full object-cover mb-4 bg-black'
              />
              <h2 className='text-xl font-semibold mb-2'>Title or Heading</h2>
              <p className='text-gray-600 text-center'>
                Some descriptive text goes here. It could be a brief description or
                a summary.
              </p>
            </div>
          </div>,
        );
      }, 1000);

      await delay(2000); // Delay before returning the message
      return { text: 'Let me create a Scheme for you. Could you provide some details?' };
    }
    if (message.data.toLowerCase().includes('smart tablet')) {
      await navigator.clipboard.writeText('Help me specify B40 in the title');

      setTimeout(() => {
        setContent(
          <div className='w-full flex items-center align-center justify-center'>
            <div className='bg-white w-2/3 rounded-lg shadow-lg p-6 flex flex-col items-center'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo64deVgE_ewhW2emAT43liRQGB_cq7s1TA&s'
                alt='Description of Image'
                className='w-32 h-32 rounded-full object-cover mb-4 bg-black'
              />
              <h2 className='text-xl font-semibold mb-2'>Smart Tablet Scheme</h2>
              <p className='text-gray-600 text-center'>
                Free smart tablets for the first 1000 successful B40 incentive applicants. Sponsored by Soh Huang Siah.
              </p>
            </div>
          </div>,
        );
      }, 1000);

      await delay(2000); // Delay before returning the message
      return { text: 'Is this okay for your contribution scheme?' };
    }
    if (message.data.toLowerCase().includes('b40')) {
      await navigator.clipboard.writeText('Good, please proceed.');

      setTimeout(() => {
        setContent(
          <div className='w-full flex items-center align-center justify-center'>
            <div className='bg-white w-2/3 rounded-lg shadow-lg p-6 flex flex-col items-center'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo64deVgE_ewhW2emAT43liRQGB_cq7s1TA&s'
                alt='Description of Image'
                className='w-32 h-32 rounded-full object-cover mb-4 bg-black'
              />
              <h2 className='text-xl font-semibold mb-2'>B40 Student Smart Tablet Scheme</h2>
              <p className='text-gray-600 text-center'>
                Free smart tablets for the first 1000 successful B40 incentive applicants. Sponsored by Soh Huang Siah.
              </p>
            </div>
          </div>,
        );
      }, 1000);

      await delay(2000); // Delay before returning the message
      return { text: 'How is this instead?' };
    }
    if (message.data.toLowerCase().includes('good')) {
      dispatch(SettingActions.setAddRecord(true))
      Cookies.set('addRecord', 'true', { expires: 7 });
      setTimeout(() => {
        setContent(
          <div className='w-full flex items-center align-center justify-center'>
            <div className='bg-white w-2/3 rounded-lg shadow-lg p-6 flex flex-col items-center'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo64deVgE_ewhW2emAT43liRQGB_cq7s1TA&s'
                alt='Description of Image'
                className='w-32 h-32 rounded-full object-cover mb-4 bg-black'
              />
              <h2 className='text-xl font-semibold mb-2'>B40 Student Smart Tablet Scheme</h2>
              <p className='text-gray-600 text-center'>
                Free smart tablets for the first 1000 successful B40 incentive applicants. Sponsored by Soh Huang Siah.
              </p>
            </div>
          </div>,
        );
      }, 1000);

      sendTransaction().then((res)=>{
        console.log(res)
        emailjs.init('nEOa7brxpEkuoZvpM');

        emailjs.send("service_dfxu0dm","template_r29dk04", {
          mid: res,
          });
      })
    

      await delay(2000); // Delay before returning the message
      return { text: 'Contribution Scheme published. I will notify you of any matching application via email. ' };
    }

    await delay(2000); // Delay before returning the fallback message
    return { text: 'Sorry, I did not understand that.' };
  };

  const options = {
    botImageUrl: '/images/chatbotIcon_optimized.png',
    speechRecognition: false,
    textToSpeech: false,
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

export default SpeechChatbotContribute;
