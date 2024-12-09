import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
function Sidebar() {
  const { onSent, sidebar, sidebarShrink, setRecentPrompt, previousPrompt, newChat } = useContext(Context);

  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <>
      <div
        className={`md:max-h-full max-h-full md:min-w-[25vh]  min-w-40 inline-flex flex-col justify-between py-7 px-5 bg-[#f0f4f9] ${
          sidebar ? " max-w-[180px] visible" : "hidden"
        }`}
      >
        <div className="sticky top-7">
          <img
            onClick={sidebarShrink}
            className="w-9 block cursor-pointer pb-7"
            src={assets.menu_icon}
            alt=""
          />
          <div
          onClick={newChat}
           className="mt-[10px] inline-flex items-center g-[10px] py-[10px] px-[15px] bg-[#e6eaf1] rounded-[50px] text-[14px] caret-gray-400 cursor-pointer">
            <img className="w-5" src={assets.plus_icon} alt="" />
            <p>New Chat</p>
          </div>
          {sidebar && (
            <div className="flex flex-col">
              <p className="my-[15px] w-full font-semibold">Recent</p>
              {previousPrompt.map((items, index) => {
                return (
                  <div className="flex justify-left items-start gap-1 rounded-full text-[#282828] cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
                  onClick={()=> 
                    // console.log("onclick working");
                    loadPrompt(items)
                    }>
                    <img className="w-5" src={assets.message_icon} alt="" />
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {items}
                    </p>
                    <br/>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col sticky bottom-7 gap-5">
          <div className="flex gap-2">
            <img
              className="w-5 object-contain cursor-pointer"
              src={assets.question_icon}
              alt=""
            />
            {sidebar && <p className="cursor-pointer">Help</p>}
          </div>
          <div className="flex gap-2">
            <img
              className="w-5 object-contain cursor-pointer"
              src={assets.history_icon}
              alt=""
            />
            {sidebar && <p className="cursor-pointer">Activity</p>}
          </div>
          <div className="flex gap-2">
            <img
              className="w-5 object-contain cursor-pointer"
              src={assets.setting_icon}
              alt=""
            />
            {sidebar && <p className="cursor-pointer">Settings</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
