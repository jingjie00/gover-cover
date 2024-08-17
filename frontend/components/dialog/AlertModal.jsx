import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { SettingActions } from '../reducers/settingReducer';

export default function App({ message }) {
  const dispatch = useDispatch();

  return (
    <div
      id='popup-modal'
      tabIndex='-1'
      className='overflow-scroll bg-black bg-opacity-60 fixed top-0 right-0 left-0 z-[100] h-modal h-full modal-primary show'
      aria-modal='true'
      role='dialog'
    >
      <div
        className='overlay-closeable'
        onClick={() => {
          dispatch(SettingActions.setAlert([]));
        }}
      />
      <div className='relative px-5 pt-4 md:pt-8 pb-10 rounded-lg z-10 modal-dialog'>
        <div className='flex justify-end'>
          <button
            type='button'
            data-modal-toggle='popup-modal'
            onClick={() => {
              dispatch(SettingActions.setAlert([]));
            }}
          >
            <CloseOutlined style={{ fontSize: 20 }} />
          </button>
        </div>
        <div className='mb-4 mt-4 px-6 text-sm'>
          <div className='header text-center mb-2'>
            <div className='text-lg font-bold'>Important Note!</div>
          </div>
          <div className='body text-center'>
            <div className='text-sm mb-4'>{message}</div>
          </div>
          <div className='footer'>
            <div
              onClick={() => {
                dispatch(SettingActions.setAlert([]));
              }}
              className='flex bg-boxyellow rounded-lg h-10 w-full text-center items-center justify-center'
              style={{
                background: '#23AB5E',

              }}
            >
              <span className='text-white font-semibold text-sm uppercase'>
                close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
