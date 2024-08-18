import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form, notification } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { ChatBotComponent } from 'react-chatbot-with-text-and-speech';

import emailjs from 'emailjs-com';
import { useRouter } from 'next/router';
import { AptosClient, AptosAccount, FaucetClient } from 'aptos';
import RegisterForm from './RegisterForm';
import FileUploadComponent from './FileUploadComponent';

const NODE_URL = 'https://fullnode.testnet.aptoslabs.com';

const aptosClient = new AptosClient(NODE_URL);

const sendTransaction = async (setTransactionHash) => {
  try {
    // Load the government account using its private key
    const governmentPrivateKey = '9fc0923b3240af747b130c742dbb308ac9abbe7464a2afe955f2daefe26261d6'; // Replace with your actual private key
    const government = new AptosAccount(Buffer.from(governmentPrivateKey, 'hex'));

    // Define the transaction payload
    const payload = {
      type: 'entry_function_payload',
      function: '0x95f2511d231f2ef854467a101dd8d3aba8f6673407eb2fffec0da73ce5c8bd88::message::set_message',
      type_arguments: [], // No type arguments needed unless required by the function
      arguments: [
        '{"Transfer to": "Soh Huang Siah","Malaysian Identity Card Hash": "bab2455a57524929c19827240dfec07f","Program": "Online Course Incentive","Collab": "Apple Pencil Free Gift from Urban Republic", "Amount": "RM400.00"}',
      ], // Arguments passed to the function
    };

    // Generate and submit the transaction
    const txnRequest = await aptosClient.generateTransaction(government.address(), payload);
    const signedTxn = await aptosClient.signTransaction(government, txnRequest);
    const txnResponse = await aptosClient.submitTransaction(signedTxn);

    // Wait for the transaction to be finalized
    await aptosClient.waitForTransaction(txnResponse.hash);

    // Notify the user of success
  

    setTransactionHash(txnResponse.hash)

    console.log(`Transaction hash: ${txnResponse.hash}`);
  } catch (error) {
    console.error('Transaction failed:', error);
    notification.error({
      message: 'Transaction Failed',
      description: error.message,
    });
  }
};

const handleTransaction = async (setMoneyHash) => {
  const NODE_URL = 'https://fullnode.testnet.aptoslabs.com';
  const FAUCET_URL = 'https://faucet.testnet.aptoslabs.com';

  const amount = 400; // Amount to transfer

  const governmentPrivateKey = 'b3d4a9e6c947728ab4ed1258c6a9f1a2a2c7816c1fe64dbad89e9f9cdb45b5a1'; // Replace with your own 32-byte hex seed
  const bankAddress = '0xb1a9e5b77615658a7dd54fcfd509f698833e95ba86c20554bcacf8e6f4069cb2';

  try {
    // Initialize clients
    const aptosClient = new AptosClient(NODE_URL);
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

    // Load government account with the private key
    const government = new AptosAccount(Buffer.from(governmentPrivateKey, 'hex'));

    // Fund the government account if needed
    await faucetClient.fundAccount(government.address(), 100_000_000); // Fund with 100 APT

    // Prepare transaction payload for transferring coins
    const payload = {
      type: 'entry_function_payload',
      function: '0x1::aptos_account::transfer',
      type_arguments: [],
      arguments: [
        bankAddress, // Recipient address
        amount, // Amount to transfer in Octas (1 APT = 10^8 Octas)
      ],
    };

    // Generate, sign, and submit the transaction
    const txnRequest = await aptosClient.generateTransaction(government.address(), payload);
    const signedTxn = await aptosClient.signTransaction(government, txnRequest);
    const transactionResponse = await aptosClient.submitTransaction(signedTxn);

   

    setMoneyHash(transactionResponse.hash);

   
  } catch (error) {
    console.error('Transaction failed:', error);
    notification.error({
      message: 'Transaction Failed',
      description: error.message,
    });
  }
};

function sendEmail (tid, mid){
  emailjs.init('nEOa7brxpEkuoZvpM');

  emailjs.send("service_dfxu0dm","template_v81ybnd",{
    tid: tid,
    mid: mid,
    });
  
}
function SpeechChatbotApply({ setContent }) {
  const [uploadedFile, setUploadedFile] = useState(null);
const [transactionHash, setTransactionHash] = useState(null);
const [moneyHash, setMoneyHash] = useState(null);

useEffect(()=>{
  console.log(transactionHash, moneyHash)
if(transactionHash && moneyHash){
  notification.success({
    message: 'Transaction Successful',
    description: (
      <>
        {`Transaction hash: ${transactionHash}`}<br />
        {`Message hash: ${moneyHash}`}
      </>
    ),
  });
  sendEmail(transactionHash, moneyHash);
}
}, [transactionHash, moneyHash])
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
    if (message.data.toLowerCase().includes('online course')) {
      await navigator.clipboard.writeText('Done uploading.');
      setTimeout(() => {
        setContent(
          <div><FileUploadComponent /></div>,
        );
      }, 1000);

      await delay(2000); // Delay before returning the message
      return { text: 'I see that this is your first time requesting for this incentive. May I have your offer letter as proof?' };
    }
    if (message.data.toLowerCase().includes('done uploading')) {
      await navigator.clipboard.writeText('Here is my receipt');

      setTimeout(() => {
        setContent(
          <div><FileUploadComponent /></div>,
        );
      }, 1000);

      await delay(2000); // Delay before returning the message
      return { text: 'I will also need a picture of your receipt of the amount that you want to claim to proceed.' };
    }
    if (message.data.toLowerCase().includes('receipt')) {
      await navigator.clipboard.writeText('Yes please.');
      setContent(<div className='flex items-center align-center justify-center h-full'><img src='/images/loadingGif.gif' /></div>);
      setTimeout(() => {
        setContent(<div className='flex items-center align-center justify-center h-full'><img src='/images/doneGif.gif' /></div>);
      }, 4000);

      await delay(2000); // Delay before returning the message
      return { text: 'Your eiligibility has been confirmed. Would you like to cash out to your usual bank account?' };
    }
    if (message.data.toLowerCase().includes('yes')) {

   
        sendTransaction(setTransactionHash)
        handleTransaction(setMoneyHash)

        await delay(3000);
        return { text: 'Your funds will be received in your bank within one day.' };
  
      // After both transactions are successful, you can call a third function (if needed) with their results
     
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

export default SpeechChatbotApply;
