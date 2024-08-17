import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Aos from 'aos';
import Chatbot from 'react-chatbot-kit';
import { Button } from 'antd';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import config from './chatbot/config';
import MessageParser from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';
import axios from "axios";

const putWalletApi = () => {
  var uniqueID = crypto.randomUUID();
  return axios
    .request({
      method: "PUT",
      url: "https://service-testnet.maschain.com/api/wallet/entity/17",
      headers: {
        "Content-Type": "application/json",
        client_id:
          "0264a6a2135d0b766d212db38a1a0fcd2334c651acb32b69098c2fb0c6c98db9",
        client_secret:
          "sk_59bb96279047f2365169a00b7ced5e4d39f5ed5e7da417b3d5c1d849dd697318",
      },
      data: {
        name: "HealthMe " + uniqueID,
        external_id: null,
      },
    })
    .then((response) => console.log(response))
    .catch((error) => false);
};

function DonatePage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [smartContract, setSmartContract] = useState(null);
  const [showSmartContract, setShowSmartContract] = useState(false);
  const [updateSmartContract, setUpdateSmartcontract] = useState(false);
  const [amountUserKeyIn, setAmountUserKeyIn] = useState(0);

  const [downInfo, setDownInfo] = useState([
    'All age groups',
    'Not specified',
    'All income levels',
  ]);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
    //putWalletApi();
  }, []);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText("Orphaned children with blindness");
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Layout>
      <div className='flex flex-row h-5/6'>
        <div className='w-1/3 p-4'>

          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
            <div className='w-full'>
                <Button onClick={() => router.reload()} className='w-full bg-black text-white rounded-lg px-5 py-3 my-5'>Done? Restart</Button>
               </div>

        </div>

        <div className='w-2/3 p-4 overflow-y-scroll'>
          <div className='m-10 font-sans leading-7'>
            <h1 className='text-4xl font-bold text-center mb-5'>Donation Contract</h1>
            <p>This Donation Contract ("Contract") is made and entered into on this 31st July 2024, by and between:</p>

            <ul className='list-disc ml-8 my-4'>
              <li>
                <strong>Donor:</strong>
                {' '}
                Jason
              </li>
              <li>
                <strong>Recipient:</strong>
                {' '}
                SOMEONE WHO MEET THE CRITERIA IN THE DOMAIN
              </li>
              <li>
                <strong>Amount:</strong>
                {' '}
                RM
                {' '}
                <span className={`${amountUserKeyIn !== 0 ? 'font-bold' : ''}`}>{amountUserKeyIn}</span>
              </li>
            </ul>

            <div
              className='text-2xl font-bold mt-8'
              onClick={() => {
                dispatch(SettingActions.setLoading(true));
                setTimeout(() => {
                  setAmountUserKeyIn(50000);
                  dispatch(SettingActions.setLoading(false));
                  handleCopyClick()
                }, 500);
              }}
            >
              Domain
            </div>
            <p>
              The domain for this donation is specifically for individuals with
{' '}
              {amountUserKeyIn !== 0 ? <strong> brain-related issues ("Domain")</strong> : '-'}
             
            </p>

            <div
              className='text-2xl font-bold mt-8'
              onClick={() => {
                dispatch(SettingActions.setLoading(true));
                setTimeout(() => {
                  setDownInfo([
                    '<18',
                    'Blindness',
                    '0 (Orphan)',
                  ]);
                  dispatch(SettingActions.setLoading(false));
                }, 500);
              }}
            >
              Criteria
            </div>
            <p>To qualify as a recipient under this Contract, the individual must meet the following criteria ("Criteria"):</p>
            <ul className='list-disc ml-8 my-4'>
              <li>
                <strong>Age Group:</strong>
                {' '}

                <span className={`${downInfo[0] === '<18' ? 'font-bold' : ''}`}>{downInfo[0]}</span>

              </li>
              <li>
                <strong>Disability:</strong>
                {' '}
                <span className={`${downInfo[1] === 'Blindness' ? 'font-bold' : ''}`}>{downInfo[1]}</span>
              </li>
              <li>
                <strong>Family Members:</strong>
                {' '}
                <span className={`${downInfo[2] === '0 (Orphan)' ? 'font-bold' : ''}`}>
                  {' '}
                  {downInfo[2]}
                </span>
              </li>
              <li>
                <strong>Income:</strong>
                {' '}
                All
              </li>
            </ul>

            <div className='text-2xl font-bold mt-8'>Payment Delivery</div>
            <p>The payment under this Contract shall be delivered directly to the hospital where the recipient is receiving treatment. The details of the hospital and the mode of payment will be coordinated between the Donor and the hospital administration.</p>

            <div className='text-2xl font-bold mt-8'>General Provisions</div>
            <ol className='list-decimal ml-8 my-4'>
              <li>
                <strong>Governing Law:</strong>
                {' '}
                This Contract shall be governed by and construed in accordance with the laws of the state/country where the Donor resides.
              </li>
              <li>
                <strong>Entire Agreement:</strong>
                {' '}
                This Contract constitutes the entire agreement between the parties and supersedes all prior understandings, agreements, or representations, oral or written, regarding the subject matter hereof.
              </li>
              <li>
                <strong>Amendments:</strong>
                {' '}
                No amendment or modification of this Contract shall be valid unless it is in writing and signed by both parties.
              </li>
            </ol>

            <p>IN WITNESS WHEREOF, the parties hereto have executed this Contract as of the Effective Date.</p>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default DonatePage;
