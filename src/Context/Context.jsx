import { createContext, useState } from "react";
import run from "../Config/gemini";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [sidebar, setSidebar] = useState(false);

  const sidebarShrink = () => {
    setSidebar((prev) => !prev);
    console.log(sidebar)
  };

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = ()=>{
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response="";
    if(prompt !== undefined){
        setRecentPrompt(prompt)
        setPreviousPrompt((prev)=>[...prev, prompt])
        response = await run(prompt);
    }
    else{
        setPreviousPrompt((prev)=>[...prev, input]);
        setRecentPrompt(input);
        response = await run(input)
    }
    // setRecentPrompt(input);
    // setPreviousPrompt(prev=>[...prev, input])
    // const response = await run(prompt);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 !== 0) {
        // console.log(responseArray[i] + "\n");
        newResponse += "<b>" + responseArray[i] + "</b>";
      } else {
        // console.log(responseArray[i] + "\n");
        newResponse += responseArray[i];
      }
    }
    newResponse = newResponse.replace("##", "");

    let newRosponse2 = newResponse.split("*").join("</br >");

    const words = newRosponse2.split(" ");
    for (let i = 0; i < words.length; i++) {
      delayPara(i, words[i] + " "); 
    }

    // setResultData(newRosponse2);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    previousPrompt,
    setPreviousPrompt,
    sidebar,
    sidebarShrink,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
