"use client";

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

  // Initialize the chat history with a friendly greeting message
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      role: "model",
      parts: "Great to meet you, I am Gbenga, how can I help you?",
    },
  ]);

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
    if (!chat) {
      const chatInstance = model.startChat({
        generationConfig: {
          maxOutputTokens: 400,
        },
      });

      setChat(chatInstance);

      // Set context for the chat without displaying it as the initial message
      const initialContext = `You are Gbenga, a person I hired to chat in place of me to provide information about  based on the following. I want you to go through my resume I will insert below and answer the questions based on my resume and project details any recruiter that is interacting with you. I also want you to go through the Links I will provide and answer based on the information you get through those links as well. Be a little mix of casual and formal while interacting with the recruiter, also ask for the Email of the recruiter for me to contact them if they are willing to consider me for hiring into their organization.

      Here is my resume:
      **Vinit Gupta**
      [Portfolio](#) | [Leetcode](#) | [Linkedin](#) | [Github](#)
      
      **EXPERIENCE** 
      Tata Consultancy Services, Kolkata — Java Developer
      October 2023 - PRESENT
      +91 83890732221
      thevinitgupta@gmail.com`;

      chatInstance.sendMessage(initialContext);
    }
  }, [chat, model]);

  const chatting = async () => {
    setLoading(true);
    setHistory((oldHistory) => [
      ...oldHistory,
      {
        role: "user",
        parts: input,
      },
      {
        role: "model",
        parts: "Thinking...",
      },
    ]);
    setInput("");

    try {
      const result = await chat.sendMessage(input);
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
        parts: "Great to meet you, I am Gbenga, how can I help you?",
      },
    ]);
    setInput("");
    setChat(null);
  };

  return (
    <div className="fixed bottom-0 right-0 z-20">
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-75 z-5"
        onClick={() => {
          toggleChat();
        }}
      />
      <div className="fixed bottom-10 right-10 backdrop-blur duration-200 border-b bg-zinc-900/500 border border-zinc-600 p-4 rounded-lg shadow-md z-70 ">
        <button
          onClick={() => {
            toggleChat();
          }}
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
              {/* Speaker's Name */}
              <div className="text-xs font-bold mb-1 text-white">
                {message.role === "user" ? "You" : "Gbenga"}
              </div>
              {/* Message Content */}
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
