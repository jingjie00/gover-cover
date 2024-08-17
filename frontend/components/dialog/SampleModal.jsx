/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import LoadingModal from './LoadingModal';
import { useDispatch } from 'react-redux';
import { SettingActions } from '../reducers/settingReducer';

export default function SampleModal({
  show,
  toggleModal,

}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div
        id='popup-modal'
        tabIndex='-1'
        className={
          show
            ? 'md:p-10 overflow-scroll bg-black bg-opacity-60 fixed top-0 right-0 left-0 z-50 h-modal h-full modal-primary show md:px-60'
            : 'md:p-10 overflow-scroll bg-black bg-opacity-60 fixed top-0 right-0 left-0 z-50 h-modal h-full modal-primary md:px-60'
        }
        aria-modal='true'
        role='dialog'
      >
        <div className='overlay-closeable' onClick={() => {dispatch(SettingActions.setIsChatbotOpen(false)); toggleModal(); }} />
        <div
          className='relative py-4 md:pt-5 pb-5 rounded-xl z-10 modal-dialog wide'
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className='text-white m-3 mx-5'>
            <div className='flex justify-end'>
              <button onClick={() => {dispatch(SettingActions.setIsChatbotOpen(false)); toggleModal(); }}>
                <CloseCircleFilled
                  fill='white'
                  style={{ fontSize: '32px', color: 'black' }}
                />
              </button>
            </div>
            <div className='md:flex md:gap-7'>
             <img src="./images/purchaseDescription.png"/>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingModal />}
    </>
  );
}
