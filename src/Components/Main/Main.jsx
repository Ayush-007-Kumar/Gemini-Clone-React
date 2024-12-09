import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    sidebar,
    sidebarShrink,
  } = useContext(Context);

  const prevInputRef = useRef();

  

  return (
    <div className="min-h-screen max-w-screen w-full">
      <div className="w-full flex flex-col items-center min-h-screen relative">
        <nav className="flex md:bg-transparent bg-white justify-between sticky top-0 items-center py-7 px-5 w-full">
          <div className="flex gap-3">
            <img
              onClick={sidebarShrink}
              className={`h-9 block cursor-pointer ${
                sidebar ? "hidden" : "visible"
              }`}
              src={assets.menu_icon}
              alt=""
            />

            <div>
              <p className="text-3xl justify-end font-medium text-gray-400">
                Gemini
              </p>
            </div>
          </div>
          <div>
            <img className="h-9 rounded-full" src={assets.user_icon} alt="" />
          </div>
        </nav>
        {!showResult ? (
          <div className="flex flex-col items-center justify-center w-full p-7">
            <div className="mx-auto md:text-left text-center">
              <p className="text-[6vh] inline-block bg-gradient-to-r font-semibold from-indigo-500 via-purple-500 to-pink-500 ... bg-clip-text text-transparent">
                Hello, Dev.
              </p>
              <p className="text-[6vh] font-semibold text-gray-400">
                How can I help you today?
              </p>

              <div className="flex flex-col md:flex-row  mt-[60px] gap-4 my-7 ">
                <div className="relative md:w-[15vw] md:h-[30vh] p-2 rounded-md bg-gray-300 gap-4 flex flex-col justify-between">
                  <p>
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
                  <img
                    className="bg-gray-100 rounded-full p-1 bottom-2 right-2 h-7 self-end"
                    src={assets.compass_icon}
                    alt=""
                  />
                </div>
                <div className="relative md:w-[15vw] md:h-[30vh] p-2 rounded-md bg-gray-300 gap-4 flex flex-col justify-between">
                  <p>Briefly summarize this concept: urban planning</p>
                  <img
                    className="bg-gray-100 rounded-full p-1  bottom-2 right-2 h-7 self-end"
                    src={assets.bulb_icon}
                    alt=""
                  />
                </div>
                <div className="relative md:w-[15vw] md:h-[30vh] p-2 rounded-md bg-gray-300 gap-4 flex flex-col justify-between">
                  <p>
                    Brainstorming team bonding activities for our work retreat
                  </p>
                  <img
                    className="bg-gray-100 rounded-full p-1 bottom-2 right-2 h-7 self-end"
                    src={assets.message_icon}
                    alt=""
                  />
                </div>
                <div className="relative md:w-[15vw] md:h-[30vh] p-2 rounded-md bg-gray-300 gap-4 flex flex-col justify-between">
                  <p>Improve the readability of the following code</p>
                  <img
                    className="bg-gray-100 rounded-full p-1 bottom-2 right-2 h-7 self-end"
                    src={assets.code_icon}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full md:px-60 px-4 mt-10">
            <div className="flex justify-end">
              <p className=" p-2">{recentPrompt}</p>
              <img
                className="h-9 object-contain mb-1"
                src={assets.user_icon}
                alt=""
              />
            </div>
            <div className="flex justify-start gap-5 mt-10">
              <img className="h-10" src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="flex flex-col gap-3 w-full">
                  <hr className="rounded animate-loader border-none p-2 bg-[#f6f7f8] bg-gradient-to-r from-blue-300 via-white to-blue-300 ...]" />
                  <hr className="rounded animate-loader border-none p-2 bg-[#f6f7f8] bg-gradient-to-r from-blue-300 via-white to-blue-300 ...]" />
                  <hr className="rounded animate-loader border-none p-2 bg-[#f6f7f8] bg-gradient-to-r from-blue-300 via-white to-blue-300 ...]" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="sticky m-auto bottom-0 flex flex-col items-center md:w-[65%] px-[2vh] bg-white">
        <div className="bg-gray-100 rounded-full px-4 py-2 flex justify-center items-center gap-2 w-full text-black">
          <input
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                onSent(input)
              }
            }}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter your prompt here"
            className="flex-grow px-4 py-2 rounded-lg border-none outline-none bg-transparent text-black"
          />
          <img className="h-5" src={assets.gallery_icon} alt="" />
          <img className="h-5" src={assets.mic_icon} alt="" />
          <img
            onClick={() => onSent(input)}
            className="h-5"
            src={assets.send_icon}
            alt=""
          />
        </div>
        <div>
          <p className="text-[13px]">
            Gemini may display inaccurate info, including about people, so
            double chech its responses. Your privacy ang Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
