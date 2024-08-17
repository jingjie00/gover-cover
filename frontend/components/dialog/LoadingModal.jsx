import React from 'react';
// import { motion } from 'framer-motion';

import {
  loadingGif,
} from '../../images';

export default function App() {
  return (
    <div>
      <div
        id='popup-modal'
        tabIndex='-1'
        className='overflow-y-hidden bg-black bg-opacity-60 overflow-x-hidden fixed top-0 right-0 left-0 z-[100] md:inset-0 h-modal h-full justify-center items-center flex'
        aria-modal='true'
        role='dialog'
      >
        <div className='md:hidden'>
          <img src="/images/loading.gif" width={60} height={60} />
        </div>
        <div className='md:contents hidden'>
          <img src="/images/loading.gif" width={60} height={60} />
        </div>
      </div>
    </div>
  );
}
