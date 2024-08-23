"use client";

import { FC, useState, useEffect, useRef, KeyboardEvent } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-markdown";
import { Send, Trash } from "lucide-react";
import Image from "next/image";

interface ChatMessage {
  role: "model" | "user";
  parts: string;
}

const ChatArea: FC = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      role: "model",
      parts: "Great to meet you. Im Gemini, your chatbot.",
    },
  ]);

  // Ensure the API key is defined and of type string.
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
      setChat(
        model.startChat({
          generationConfig: {
            maxOutputTokens: 400,
          },
        })
      );
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
        parts: "Great to meet you. Im Gemini, your chatbot.",
      },
    ]);
    setInput("");
    setChat(null);
  };

  return (
    <div className="relative flex px-2 justify-center max-w-3xl min-h-dvh w-full pt-6 bg-gray-900 rounded-t-3xl max-h-screen shadow shadow-slate-900">
      <div className="flex text-sm md:text-base flex-col pt-10 pb-16 w-full flex-grow flex-1 rounded-3xl shadow-md overflow-y-auto">
        {history.map((item, index) => (
          <div
            key={index}
            className={`chat ${
              item.role === "model" ? "chat-start" : "chat-end"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-6 md:w-10 rounded-full">
                <Image
                  alt={item.role === "model" ? "Gemini Avatar" : "User Avatar"}
                  src={item.role === "model" ? "/geminis.jpeg" : "/user.jpg"}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="chat-header mx-2 font-semibold opacity-80">
              {item.role === "model" ? "Gemini" : "You"}
            </div>
            <div
              className={`chat-bubble font-medium ${
                item.role === "model" ? "chat-bubble-primary" : ""
              }`}
            >
              <Markdown>{item.parts}</Markdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute px-2 bottom-2 w-full flex gap-1">
        <button
          className="btn btn-outline shadow-md btn-error rounded-3xl backdrop-blur"
          title="Reset Chat"
          onClick={reset}
        >
          <Trash />
        </button>
        <textarea
          value={input}
          required
          rows={1}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start Chatting..."
          className="textarea backdrop-blur textarea-primary w-full mx-auto bg-opacity-60 font-medium shadow rounded-3xl"
        />
        <button
          className={`btn rounded-3xl shadow-md ${
            loading
              ? "btn-accent cursor-wait pointer-events-none"
              : "btn-primary"
          }`}
          title="Send Message"
          onClick={chatting}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Send />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
