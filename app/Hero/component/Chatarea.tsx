import { FC, useState, useEffect, useRef, KeyboardEvent } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SendHorizontal, SquareX } from "lucide-react";
import "./style.css";

interface ChatMessage {
  role: "model" | "user";
  parts: string;
}

interface ChatAreaProps {
  toggleChat: () => void;
}

const ChatArea: FC<ChatAreaProps> = ({ toggleChat }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  // Initialize the chat history from localStorage or with a default greeting
  const [history, setHistory] = useState<ChatMessage[]>(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    const savedTimestamp = localStorage.getItem("chatHistoryTimestamp");

    if (savedHistory && savedTimestamp) {
      const currentTime = new Date().getTime();
      const savedTime = parseInt(savedTimestamp, 10);

      // Check if the saved history is less than 1 hour old
      if (currentTime - savedTime < 3600000) {
        return JSON.parse(savedHistory);
      }
    }

    return [
      {
        role: "model",
        parts:
          "Hello there! I'm Gbenga, an AI assistant for Creatotum Inc. May I know your name? I'd love to address you personally as we discuss how I can help you with our AI content generation services.",
      },
    ];
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(apiKey);
  const [chat, setChat] = useState<any>(null);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  useEffect(() => {
    // Save chat history to localStorage whenever it changes
    localStorage.setItem("chatHistory", JSON.stringify(history));
    localStorage.setItem(
      "chatHistoryTimestamp",
      new Date().getTime().toString()
    );
  }, [history]);

  useEffect(() => {
    if (!chat) {
      const chatInstance = model.startChat({
        generationConfig: {
          maxOutputTokens: 400,
        },
      });

      setChat(chatInstance);

      // Set context for the chat without displaying it as the initial message
      const initialContext = `You are AI Gbenga, an AI assistant for Creatotum Inc, a leading AI content generation platform. Your primary role is to provide helpful and informative responses to user inquiries about Creatotum Inc and its services.

If the user provides their name, address them by it throughout the conversation. If they don't provide a name, continue the conversation without using a name.

About Creatotum Inc:
Creatotum Inc offers an advanced content generation service tailored for content creators and various users. We provide content based on over 50 different templates, covering a wide range of needs.

Our Key Services:
1. Blog Content: Titles, full articles, and topic ideas
2. YouTube Optimization: SEO titles, descriptions, and tags
3. Article Rewriting: Plagiarism-free content
4. Text Enhancement: Improving existing content and adding emojis
5. Social Media: Instagram post generation, hashtag creation, and post/reel ideas
6. Writing Assistance: English grammar checks
7. Programming Support: Code writing, explanation, and bug detection
8. Marketing: Tagline and product description generation

Service Plans:
- Free Tier: 10,000 words of generated content per month
- Premium Service: $9.99 per month for unlimited access

Key Points to Remember:
- Always maintain a professional and friendly tone
- Provide accurate information about our services and pricing
- For complex inquiries or issues you can't resolve, direct users to email oshagbemigbenga@gmail.com

Your goal is to assist users effectively, showcase the value of Creatotum Inc's services, and ensure a positive interaction. If you're unsure about any information, it's best to acknowledge that and suggest contacting our support email for the most up-to-date details.`;

      chatInstance.sendMessage(initialContext);
    }
  }, [chat, model]);

  const chatting = async () => {
    setLoading(true);
    const userMessage = input.trim();
    setHistory((oldHistory) => [
      ...oldHistory,
      {
        role: "user",
        parts: userMessage,
      },
      {
        role: "model",
        parts: "Thinking...",
      },
    ]);
    setInput("");

    try {
      // Check if this is the user's first message (potentially their name)
      if (!userName && history.length === 1) {
        setUserName(userMessage);
      }

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = await response.text();

      setLoading(false);
      setHistory((oldHistory) => {
        const newHistory = oldHistory.slice(0, oldHistory.length - 1);
        newHistory.push({
          role: "model",
          parts: text,
        });
        return newHistory;
      });
    } catch (error) {
      setHistory((oldHistory) => {
        const newHistory = oldHistory.slice(0, oldHistory.length - 1);
        newHistory.push({
          role: "model",
          parts: "Oops! Something went wrong.",
        });
        return newHistory;
      });
      setLoading(false);
      console.error(error);
      alert("Oops! Something went wrong.");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chatting();
    }
  };

  const reset = () => {
    setHistory([
      {
        role: "model",
        parts:
          "Hello there! I'm Gbenga, an AI assistant for Creatotum Inc. May I know your name? I'd love to address you personally as we discuss how I can help you with our AI content generation services.",
      },
    ]);
    setInput("");
    setUserName("");
    setChat(null);
    localStorage.removeItem("chatHistory");
    localStorage.removeItem("chatHistoryTimestamp");
  };

  return (
    <div className="fixed bottom-0 right-0 z-20">
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-75 z-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <div
        className="fixed bottom-10 right-10 backdrop-blur duration-200 border-b bg-zinc-900/500 border border-zinc-600 p-4 rounded-lg shadow-md z-70"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={toggleChat}
          className="absolute -top-5 -right-5 z-10 text-red-500 p-2 font-mono"
        >
          <SquareX size={28} />
        </button>
        <div className="flex flex-col gap-2 w-[20rem] h-80 overflow-y-auto snap-y chat-scrollbar">
          {history.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="text-xs font-bold mb-1 text-white">
                {message.role === "user" ? "You" : "Gbenga"}
              </div>
              <div
                className={`text-sm max-w-[80%] p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-cyan-300"
                }`}
              >
                {message.parts}
              </div>
            </div>
          ))}
          {loading && <div className="text-center">Loading...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center justify-between">
          <textarea
            value={input}
            required
            rows={1}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start Chatting..."
            className="w-full border border-gray-300 px-3 py-2 text-gray-700 text-sm rounded-md mt-4 focus:outline-none"
            disabled={loading}
          />
          <button
            className={`bg-[rgba(29,71,253,1)] px-4 py-2 text-white rounded-md shadow-md hover:bg-[#1d46fdd5] disabled:bg-slate-500 focus:outline-none ml-4`}
            onClick={chatting}
            disabled={input === "" || loading}
          >
            <SendHorizontal size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
