import { useState } from "react";
// import ReactMarkdown from 'react-markdown'
// import Head from "next/head";
// import { createParser } from "eventsource-parser";

const SYSTEM_MESSAGE =
  "You are Jobot, a helpful and verstaile AI developed by Jovian using state-of-the-art ML models. and APIs.";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");

  function handleTyping(e) {
    console.log("typing:", e.target.value); // 測試用
    setUserMessage(e.target.value);
  }

  const API_URL = "https://api.openai.com/v1/chat/completions";

  async function sendRequest() {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_MESSAGE },
          // {"role": "user", "content": "Hello, please introduce yourself!"}
          { role: "user", content: "What is JavaScript?" },
        ],
      }),
    });

    const responseJson = await response.json();

    setBotMessage(responseJson.choices[0].message.content);
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

      {/* Message History */}
      <div className="flex-1">
        <div className="mx-auto w-full max-w-screen-md">Message History</div>
      </div>
      {/* Message Input Box */}
      <div>
        <div className="mx-auto w-full max-w-screen-md flex px-4 pb-4">
          <textarea
            value={userMessage}
            onChange={handleTyping}
            // onChange={(e) => setUserMessage(e.target.value)} // 取代 handleTyping
            className="border rounded-md text-lg p-1 flex-1"
            rows={1}
          />
          <button
            onClick={sendRequest}
            className="bg-blue-500 hover:bg-blue-600 border rounded-md text-white text-lg w-20 p-1 ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}