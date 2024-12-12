import { useState } from "react";
// import ReactMarkdown from 'react-markdown'
// import Head from "next/head";
// import { createParser } from "eventsource-parser";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const [botMessage, setBotMessage] = useState("");

  async function sendRequest(){
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {"role": "user", "content": "Hello!"}
          // {"role": "user", "content": "Hello, please introduce yourself!"}
        ]
        
      }),    
    });
    
    const responseJson = await response.json();

    console.log("responseJson", responseJson); // 測試用

    setBotMessage(responseJson.choices[0].message.content);

    console.log('botMessage', botMessage); // Send 按鈕要按第二次才會有資訊
  }

  return (
    
      <div className="flex flex-col h-screen">
        {/* Navigation Bar */}
        <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
          <div className="text-xl  font-bold">Job</div>
          <div>
            <input
                  type="password"
                  className="border rounded p-1"
                  placeholder="Paste API key here"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
          </div>
        </nav>

        <div className="p-4">
          <button
            onClick={sendRequest}
            className="bordered rounded-md bg-blue-500 hover:bg-blue-600 text-white p-2"
          >
            Send Request
          </button>
          <div className="mt-4 text-lg">{botMessage}</div>
        </div>

        {/* Message History */}       

        {/* Message Input Box */}    

      </div>   
  );
}

