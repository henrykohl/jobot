import { useState } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  console.log("apiKey:",apiKey) // 要開啟"開發模式"
  // const API_URL = "https://api.openai.com/v1/chat/completions";

  return (
      <div className="flex flex-col h-screen">
        {/* Navigation Bar */}
        <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
          <div className="text-xl font-bold">Job</div>
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

        {/* Message Input Box */}    
           
      </div>   
  );
}

