import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { SettingActions } from '../reducers/settingReducer';

function MenuSection({menuRow}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeSelected = useSelector((state) => state.setting.selected);
  const isLogin = useSelector((state) => state.setting.isLogin);


  return (
    <div className='menu-responsive hidden md:flex justify-center align-center items-center flex '>
      {menuRow.map((i, index) => {
        const isActive = activeSelected === i.key;
        const isDisabled = !isLogin;

        return (
          <div
            className={`cursor-pointer ${i.label == "Personality"? isActive ? 'bg-red-500 text-white p-2 rounded-2xl ' : 'border border-2 border-red-500 text-white p-2 rounded-2xl ': isActive ? ' px-5 bg-blue-500 hover:bg-gray-200 text-white p-2 rounded-2xl ' : ' px-5'}`}
            key={i.key}
            style={{color: i.label == "Personality"? isActive ? 'white' : 'black' : 'black'}}
            onClick={(e) => {!isActive && i.action()}}
          >
            <span
            className={` font-bold text-xl capitalize`}
            >{i.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default MenuSection;
