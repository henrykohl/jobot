import { useState } from "react";
// import ReactMarkdown from 'react-markdown'
// import Head from "next/head";
// import { createParser } from "eventsource-parser";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  
  const API_URL = "https://api.openai.com/v1/chat/completions";

  function sendRequest(){
    console.log('Button clicked');
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
        </div>

        {/* Message History */}       

        {/* Message Input Box */}    

      </div>   
  );
}

