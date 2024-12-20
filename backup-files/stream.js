import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";

const SYSTEM_MESSAGE =
  "You are Jobot, a helpful and verstaile AI developed by Jovian using state-of-the-art ML models. and APIs.";

export default function Home() {
  const [apiKey, setApiKey] = useState("");

  const API_URL = "https://api.openai.com/v1/chat/completions";

  let controller = null; // Store the AbortController instance

  const [promptInput, setPromptInput] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const [msgs, setMsgs] = useState([
    { role: "system", content: SYSTEM_MESSAGE },
  ]);

  const [res, setRes] = useState("");

  const generate = async () => {
    // Alert the user if no prompt value
    if (!promptInput) {
      alert("Please enter a prompt.");
      return;
    }

    // Disable the generate button and enable the stop button
    // generateBtn.disabled = true; (原方式)
    // stopBtn.disabled = false; (原方式)
    // resultText.innerText = "Generating..."; (原方式)
    setIsDisable(false);
    setRes("Generating...");

    // Create a new AbortController instance
    controller = new AbortController();
    const signal = controller.signal;

    try {
      const newMessage = { role: "user", content: promptInput };

      const newMessages = [...msgs, newMessage];

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMessages,
          max_tokens: 1000,
          stream: true, // For streaming responses (streaming reponse 一定要這麼設定 )
        }),
        signal, // Pass the signal to the fetch request
      });

      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      // resultText.innerText = "";
      let msg_stream = "";
      setRes(msg_stream);

      /* eslint-disable no-constant-condition */ // (必需要此行，否則會出現Unexpected constant condition)
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // Massage and parse the chunk of data
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n"); // 以行分割，lines 是 list 型態
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
          .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
          .map((line) => JSON.parse(line)); // Parse the JSON string (轉成 JSON 型態)

        for (const parsedLine of parsedLines) {
          const { choices } = parsedLine;
          const { delta } = choices[0];
          const { content } = delta;
          // Update the UI with the new content
          if (content) {
            // resultText.innerText += content;
            msg_stream += content;
            setRes(msg_stream);
          }
        }
      }

      // const data = await response.json();

      const newBotMessage = { role: "assistant", content: msg_stream };

      const newMessages2 = [...newMessages, newBotMessage];

      setMsgs(newMessages2);
    } catch (error) {
      // Handle fetch request errors
      if (signal.aborted) {
        // resultText.innerText = "Request aborted."; (原方式)
        setRes("Request aborted.");
      } else {
        console.error("Error:", error);
        // resultText.innerText = "Error occurred while generating."; (原方式)
        setRes("Error occurred while generating.");
      }
    } finally {
      // Enable the generate button and disable the stop button
      // generateBtn.disabled = false; (原方式)
      // stopBtn.disabled = true; (原方式)
      setIsDisable(true);
      controller = null; // Reset the AbortController instance
    }
  };

  const stop = () => {
    // Abort the fetch request by calling abort() on the AbortController instance
    if (controller) {
      controller.abort();
      controller = null;
    }
  };

  return (
    <>
      <Head>
        <title>Jobot</title>
      </Head>
      <div className="flex flex-col h-screen">
        {/* Navigation Bar */}
        <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
          <div className="text-xl  font-bold">Job</div>
          <div>
            <input
              type="password"
              className="border rounded p-1"
              placeholder="Paste API key here"
              value={apiKey} // 此例，可以不需要
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </nav>

        <div class="lg:w-1/2 2xl:w-1/3 p-8 rounded-md bg-gray-100">
          <h1 class="text-3xl font-bold mb-6">
            Streaming OpenAI API Completions in JavaScript
          </h1>
          <div id="resultContainer" class="mt-4 h-48 overflow-y-auto">
            <p class="text-gray-500 text-sm mb-2">Generated Text</p>
            <div id="resultText" class="whitespace-pre-line">
              <div className="text-lg prose">
                <ReactMarkdown>{res}</ReactMarkdown>
              </div>
            </div>
          </div>
          <input
            type="text"
            id="promptInput"
            class="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
            placeholder="Enter prompt..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <div class="flex justify-center mt-4">
            <button
              id="generateBtn"
              class="w-1/2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 focus:outline-none mr-2 disabled:opacity-75 disabled:cursor-not-allowed"
              disabled={!isDisable}
              onClick={generate}
            >
              Generate
            </button>
            <button
              id="stopBtn"
              disabled={isDisable}
              class="w-1/2 px-4 py-2 rounded-md border border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700 focus:outline-none ml-2 disabled:opacity-75 disabled:cursor-not-allowed"
              onClick={stop}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
