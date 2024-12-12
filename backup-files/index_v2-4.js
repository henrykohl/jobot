import { useState } from "react";
// import ReactMarkdown from 'react-markdown'
// import Head from "next/head";
// import { createParser } from "eventsource-parser";

const SYSTEM_MESSAGE =
  "You are Jobot, a helpful and verstaile AI developed by Jovian using state-of-the-art ML models. and APIs.";

export default function Home() {
  const [apiKey, setApiKey] = useState("");

  const [messages, setMessages] = useState([
    { role: "system", content: SYSTEM_MESSAGE },
  ]);

  const [userMessage, setUserMessage] = useState("");

  const API_URL = "https://api.openai.com/v1/chat/completions";

  async function sendRequest() {
    // update the message history
    const newMessage = { role: "user", content: userMessage };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setUserMessage("");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: newMessages,
      }),
    });

    const responseJson = await response.json();

    const newBotMessage = responseJson.choices[0].message;

    const newMessages2 = [...newMessages, newBotMessage];
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
        <div className="mx-auto w-full max-w-screen-md">
          {messages.map((message, idx) => (
            <div key={idx} className="mt-3">
              <div className="font-bold">{message.role}</div>
              <div className="text-lg">{message.content}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Message Input Box */}
      <div>
        <div className="mx-auto w-full max-w-screen-md flex px-4 pb-4">
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)} // 取代 handleTyping
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
