// import { useState } from "react";

// export default function Home() {
//   const parser = createParser((event) => {
//     console.log(">", event);
//     if (event.type === "event") {
//       console.log("Received event:", event);
//     }
//   });

//   console.log("HERE");
//   const sseData = `data: Hello\n\n`;
//   parser.feed(sseData);

//   return <div className="flex flex-col h-screen">TEST</div>;
// }

import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import Head from "next/head";
import { createParser } from "eventsource-parser";

const SYSTEM_MESSAGE =
  "You are Jobot, a helpful and verstaile AI developed by Jovian using state-of-the-art ML models. and APIs.";

export default function Home() {
  const [apiKey, setApiKey] = useState("");

  const [messages, setMessages] = useState([
    { role: "system", content: SYSTEM_MESSAGE },
  ]);

  const [userMessage, setUserMessage] = useState("");

  const API_URL = "https://api.openai.com/v1/chat/completions";

  const sendRequest = async () => {
    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: userMessage,
      },
    ];

    setMessages(updatedMessages);
    setUserMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: updatedMessages,
          stream: true,
        }),
      });

      const reader = response.body.getReader();

      let newMessage = "";

      const parser = createParser((event) => {
        console.log("~~", event);
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            return;
          }
          const json = JSON.parse(event.data);
          const content = json.choices[0].delta.content;
          console.log(">>", content);
          if (!content) {
            return;
          }

          newMessage += content;

          const updatedMessages2 = [
            ...updatedMessages,
            { role: "assistant", content: newMessage },
          ];

          setMessages(updatedMessages2);
        } else {
          return "";
        }
      });

      // eslint-disable-next-line
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;
        const text = new TextDecoder().decode(value);

        parser.feed(text);
      }
    } catch (error) {
      console.error("error");
      window.alert("Error:" + error.message);
    }
  };

  return (
    <>
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
        {/* <div className="flex-1  overflow-y-scroll">
          <div className="mx-auto w-full max-w-screen-md">
            {messages
              .filter((message) => message.role !== "system")
              .map((message, idx) => (
                <div key={idx} className="my-3">
                  <div className="font-bold">
                    {message.role === "user" ? "You" : "Jobot"}
                  </div>
                  <div className="text-lg prose">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
          </div>
        </div> */}
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

      <div class="lg:w-1/2 2xl:w-1/3 p-8 rounded-md bg-gray-100">
        <h1 class="text-3xl font-bold mb-6">
          Streaming OpenAI API Completions in JavaScript
        </h1>
        <div id="resultContainer" class="mt-4 h-48 overflow-y-auto">
          <p class="text-gray-500 text-sm mb-2">Generated Text</p>
          <p id="resultText" class="whitespace-pre-line"></p>
        </div>
        <input
          type="text"
          id="promptInput"
          class="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
          placeholder="Enter prompt..."
        />
        <div class="flex justify-center mt-4">
          <button
            id="generateBtn"
            class="w-1/2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 focus:outline-none mr-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            Generate
          </button>
          <button
            id="stopBtn"
            disabled
            class="w-1/2 px-4 py-2 rounded-md border border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700 focus:outline-none ml-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
}
