// import Image from "next/image";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

import { useState } from "react";
import ReactMarkdown from 'react-markdown'
import Head from "next/head";

const SYSTEM_MESSAGE = "You are Jobot, a helpful and verstaile AI developed by Jovian using state-of-the-art ML models. and APIs."

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  // console.log("apiKey:",apiKey)
  const API_URL = "https://api.openai.com/v1/chat/completions";
  
  // const [botMessage, setBotMessage] = useState(""); //沒用到？

  // 初始
  // const [messageHistory, setMessageHistory] = useState([
  //   {"role": "system", "content": SYSTEM_MESSAGE},
  //   // {"role": "user", "content": "What is JavaScript?"}, // 測試用
  // ]);
  // 重命名後
  const [messages, setMessages] = useState([
    {"role": "system", "content": SYSTEM_MESSAGE},
  ]);

  const [userMessage, setUserMessage] = useState("");

  // function handleTyping(e){ // 移至 onChange 中
  //   console.log("typing:",e.target.value); // 測試用
  //   setUserMessage(e.target.value) 
  // }

  // function sendRequest(){
  //   console.log('button clicked');
  // }

  async function sendRequest(){
    // update the message history
    const newMessage = {role: "user", content: userMessage};
    // 初始
    // const newMessageHistory = [...messages,newMessage]
    // 重新命名後
    const newMessages = [...messages,newMessage]

    setMessages(newMessages);
    setUserMessage("");

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        // "messages": [
        //   // {"role": "system", "content": SYSTEM_MESSAGE}, // 移至 userMessage
        //   // {"role": "user", "content": "Hello!"}
        //   // {"role": "user", "content": "Hello, please introduce yourself!"}
        //   // {"role": "user", "content": "What is JavaScript?"} // 移至 userMessage
        // ]
        "messages": newMessages
      }),    
    });
    
    const responseJson = await response.json();

    // console.log("responseJson", responseJson); // 測試用

    const newBotMessage = responseJson.choices[0].message;

    const newMessages2  = [...newMessages, newBotMessage];

    setMessages(newMessages2);

    // setBotMessage(responseJson.choices[0].message.content);

    // console.log('botMessage', botMessage); ## 測試用


}
  
  return (
    <>
      <Head>
          <title>Jobot</title>
      </Head>
      <div className="flex flex-col h-screen">
        {/* Navigation Bar */}
        <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
          <div className="text-xl font-bold">Job</div>
          <div>
            <input
                  type="password"
                  className="border rounded p-1"
                  placeholder="Enter API key.."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
          </div>
        </nav>
        
        {/* Message History */}
        <div className="flex-1 overflow-y-scroll">
          <div className="mx-auto w-full max-w-screen-md p-4 ">
            {/* 初版 */}
            {/* {messages.map((message, idx) => (
              <div key={idx} className="mt-3">
                <div className="font-bold">{message.role}</div>
                <div className="text-lg">{message.content}</div>
              </div>
            ))} */}
            {/* 改版 */}
            {messages
            .filter((message) => message.role !== "system")
            .map((message, idx) => (
              <div key={idx} className="my-3">
                {/* 初始 */}
                {/* <div className="font-bold">{message.role}</div>
                <div className="text-lg">{message.content}</div> */}
                {/* 修改過 */}
                <div className="font-bold">
                  {message.role === "user" ? "You" : "Jobot"}
                </div>
                <div className="text-lg prose">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
          
        </div>

        {/* Message Input Box */}
        <div>
          <div className="mx-auto w-full max-w-screen-md flex px-4 pb-4">
            <textarea
              value={userMessage}
              // onChange={handleTyping}
              onChange={(e)=>setUserMessage(e.target.value)} // 取代 handleTyping
              className="border rounded-md text-lg p-1 flex-1"
              rows={1}
            />
            <button
              onClick={sendRequest}
              className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white text-lg p-1 w-20 ml-2"
            >
              Send
            </button>
          </div>
        </div>
        {/* <div className="p-4">
          <button
            onClick={sendRequest}
            // className="w-40 bordered rounded bg-blue-500 hover:bg-blue-600 text-white p-2"
            className="bordered rounded-md bg-blue-500 hover:bg-blue-600 text-white p-2"
          >
            Send Request
          </button>
        <div className="mt-4 text-lg">{botMessage}</div>
        </div> */}
      </div>
    </>
  );
}

