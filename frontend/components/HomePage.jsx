/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
// import Link from 'next/link';
import _ from 'lodash';
import Aos from 'aos';
import { ArrowRightOutlined } from '@ant-design/icons';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import { logoIcon } from '../images';
import { routes } from '../route';
import axios from "axios";

const getAuditTransactionApi = () => {
  return axios
    .request({
      method: "get",
      url: "https://service-testnet.maschain.com/api/audit/get-audit-transaction?wallet_address=0xdA383c9CaCa3dbfCbF8535fFB9B8E8F3eD9CD70c&contract_address=0xD43a487e7977B0D7B30A707A4402174AA98a5228&filter=from",
      headers: {
        "Content-Type": "application/json",
        client_id:
          "0264a6a2135d0b766d212db38a1a0fcd2334c651acb32b69098c2fb0c6c98db9",
        client_secret:
          "sk_59bb96279047f2365169a00b7ced5e4d39f5ed5e7da417b3d5c1d849dd697318",
      },
    })
    .then((response) => console.log(response))
    .catch((error) => false);
};
function HomePage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
    //getAuditTransactionApi();
  }, []);

  return (
    <Layout>

      <div className='text-xl flex flex-col justify-center align-center items-center my-24'>

        <div className='w-2/5'>
          <img src="./images/logo.png" alt="logo" />
    
        </div>

        <div className='ml-5 text-xl font-bold'>
          {'      '}

          Practise with AI Guidance.
          {' '}
          {' '}
          Enhance Your Investment Confidence.
        </div>

        <div className='mt-20'>

        <div
          className='bg-red-500 rounded-full p-5 px-10 font-bold text-white cursor-pointer text-2xl'
          onClick={() => {
            router.push('/login'); 
            dispatch(SettingActions.setSelected(3));
          }}
        >
          Getting Started →
        </div>


        </div>
        <div className='items-center align-center mt-5 font-bold justify-center'>
          Build Your Personality Profile First!
          {' '}

        </div>

      </div>

    </Layout>
  );
}

export default HomePage;
