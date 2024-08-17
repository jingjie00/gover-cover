/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import {
  PlusOutlined,
  UpOutlined,
  CloseCircleFilled,
  AndroidFilled,
  UserOutlined,
} from "@ant-design/icons";
import _, { stubTrue } from "lodash";
import axios from "axios";
import { BackTop, Button } from "antd";
import Aos from "aos";
import LoadingModal from "../dialog/LoadingModal";
import AlertModal from "../dialog/AlertModal";
import { SettingActions } from "../reducers/settingReducer";
import MenuSection from "./MenuSection";
import { logoIcon } from "../../images";
import { current } from "@reduxjs/toolkit";
import { setRequestMeta } from "next/dist/server/request-meta";
import Cookies from 'js-cookie';

function Layout(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state) => state.setting.loading);
  const isAlert = useSelector((state) => state.setting.alert);
  const isChatbotOpen = useSelector((state) => state.setting.isChatbotOpen);
  const isLogin = useSelector((state) => state.setting.isLogin);
  const userInputLatest = useSelector((state) => state.setting.userInputLatest);
  const [currentUrl, setCurrentUrl] = useState("");


  useEffect(() => {
    Aos.init();
  }, []);

  const middleMenu = [
    {
      key: 0,
      label: "Dashboard",
      action: async () => {
        await navigator.clipboard.writeText("What is new today?");
        dispatch(SettingActions.setLoading(true));
        router.push("/dashboard");
      },
    },
    {
      key: 1,
      label: "Apply",
      action: async () => {
        await navigator.clipboard.writeText("I want to apply for B40 student online course incentives.");
        dispatch(SettingActions.setLoading(true));
        router.push("/apply");
      },
    },
    {
      key: 2,
      label: "Contribute",
      action: async () => {
        await navigator.clipboard.writeText("I want to make a contribution");
        dispatch(SettingActions.setLoading(true));
        router.push("/contribute");
      },
    },
    {
      key: 3,
      label: "Scheme List",
      action: () => {
        dispatch(SettingActions.setLoading(true));
        router.push("/schemeList");
      },
    },
  ];

  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <div className="relative bg-custom h-screen overflow-hidden text-black">
              <div className="">
                <div
                  id="page-container"
                  className=" h-screen overflow-y-auto hidden-scrollbar"
                >
                  <div className="">
                    <div
                      id="pageHeader"
                      className=" z-50 bg-white pb-1 pt-3 px-5 flex justify-between align-center shadow-xl shadow shadow-gray-200"
                    >
                      <div className="flex justify-between gap-3">
                        {" "}
                        <span className="-mt-2 ml-0.5 w-[150px] h-[150px] cursor-pointer">
                          <img
                            alt="Logo"
                            onClick={() => {
                              dispatch(SettingActions.setLoading(true));
                              router.push("/");
                              Cookies.remove('addRecord')
                              dispatch(SettingActions.setSelected(null));
                              dispatch(SettingActions.setLoading(false));
                            }}
                            src="/images/logo.png"
                          />
                        </span>
                 
                    
                      </div>

                      <div className="flex items-center align-center">
                        <MenuSection menuRow={middleMenu} />
                      </div>

                 
                      <div className="col-span-5 col-start-8 md:col-span-10 flex items-center align-center ">
                        <div className="flex items-center justify-end md:justify-between w-full">
                        {isLogin && <UserOutlined
                          style={{ fontSize: "32px", color: "#1B57F0" }}
                          className="pt-1 cursor-pointer"
                          

                        
                        />}

                        </div>
                      </div>
                    </div>

                    <div className=" mx-auto">
                      <div className="mb-auto h-screen">
                        <div className="h-screen">
                          <div className="">
                            <div
                              className={`h-screen px-4`}
                            >
                                <div className="">{props.children}</div>

                            </div>
                            {isChatbotOpen && (
                              <div
                                className=" shadow-2xl shadow-gray-500  col-span-3 bg-white text-white  transition-opacity duration-500 ease-in-out"
                                id="chatbot-region"
                              >
                                <div className="col-span-3 w-full h-full">
                                  <div className="w-full h-full">
                                    <Chatbot
                                      config={selectedConfigLocal}
                                      actionProvider={ActionProvider}
                                      messageParser={MessageParser}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
      <div className="text-white">
        {isLoading && <LoadingModal />}
        {isAlert.length > 0 && (
          <AlertModal message={isAlert[0]?.msg} action={isAlert[1]} />
        )}
      </div>
    </>
  );
}

export default Layout;
