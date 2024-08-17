/* eslint-disable jsx-quotes */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { stack as Menu } from 'react-burger-menu';
import { routes } from '../../route';
import { SettingActions } from '../reducers/settingReducer';

// markup
function Header(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const MenuList = [
    {
      label: 'Onboarding',
      route: routes.home.to(),
    },
    {
      label: 'Learning',
      route: routes.home.to(),
    },
    {
      label: 'Investment Personality',
      route: routes.home.to(),
    },
    {
      label: 'Portfolio',
      route: routes.home.to(),
    },
  ];

  const toggleShow = (show) => {
    dispatch(SettingActions.setShowHeader(show));
  };

  return (
    <>
      <Menu
        customBurgerIcon={false}
        customCrossIcon={false}
        onClose={() => toggleShow(false)}
        animation='bubble'
        right
      >
        {MenuList.map((i, index) => {
          const last = index === MenuList.length - 1;
          return (
            <div
              key={i.label}
              className='text-white items-center mx-3 mb-2 grid grid-cols-4 font-medium uppercase align-middle text-center flex flex-col	justify-center cursor-pointer'
              // style={{ display: 'flex' }}
              onClick={() => {
                dispatch(SettingActions.setLoading(true));
                if (last) {
                  logout();
                } else if (i.access) {
                  router.push(i.route);
                } else {
                  router.push('/login');
                }

                toggleShow(false);
              }}
            >

              <div className='text-center mt-0.5 font-semibold' style={{ fontSize: 10 }}>
                {i.label}
              </div>
            </div>
          );
        })}
      </Menu>
      {props.children}

    </>
  );
}

export default Header;
