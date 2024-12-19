import { createParser } from "eventsource-parser";

const SYSTEM_MESSAGE =
  "You are Jobot, a helpful and verstaile AI developed by Jovian using state-of-the-art ML models. and APIs.";

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
        // Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: updatedMessages,
        // messages: newMessages,
        stream: true,
      }),
    });

    const reader = response.body.getReader();

    let newMessage = "";

    // const parser = createParser((e) => {
    //   if (e.type !== "event") return;
    // });

    const parser = createParser((event) => {
      if (event.type === "event") {
        const data = event.data;
        if (data === "[DONE]") {
          return;
        }
        const json = JSON.parse(event.data);
        const content = json.choices[0].delta.content;
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
