import React, { useRef, useState } from "react";
import { Phone, MessageSquare, Mail, Twitter } from "lucide-react";
import ChatArea from "@/app/Hero/component/Chatarea";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    console.log("toggleChat");
    setIsOpen((prev) => !prev);
  };

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID &&
      form.current
    ) {
      const formData = new FormData(form.current);
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const name = `${firstName} ${lastName}`.trim();
      const email = formData.get("email") as string;
      const phoneNumber = formData.get("phoneNumber") as string;
      const message = formData.get("message") as string;

      const templateParams = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        message: message,
      };

      emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
        .then(
          (result) => {
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="/images/waving.jpg"
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Thank You
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Message sent successfully!!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            ));

            form.current?.reset();
          },
          (error) => {
            alert("Failed to send the message, please try again.");
          }
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Call us</h2>
            <p className="text-gray-600 text-sm mb-1">
              Call our team Mon-Fri from 8am to 5pm.
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              +1 (555) 000-0000
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Chat with us</h2>
            <p className="text-gray-600 text-sm mb-3">
              Speak to our friendly team via live chat.
            </p>
            <button
              onClick={toggleChat}
              className="flex items-center text-gray-800 hover:text-gray-600 mb-2"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium">Start a live chat</span>
            </button>
            <a
              className="flex items-center text-gray-800 hover:text-gray-600 mb-2"
              href="mailto:creatotum@outlook.com"
              title="Get quote now"
              role="button"
            >
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium">Shoot us an email</span>
            </a>
            <a
              className="flex items-center text-gray-800 hover:text-gray-600"
              href="https://x.com/messages/126291110-1125442029566287873?text="
              target="_blank"
            >
              <Twitter className="w-4 h-4 mr-2 text-gray-400" />
              <span className="font-medium">Message us on Twitter</span>
            </a>
          </div>
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                US
              </span>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+1 (555) 000-0000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Leave us a message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send message
            </button>
          </div>
        </form>
      </div>

      {/* ChatArea popup */}
      <div
        className={`fixed bottom-10 right-10 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {isOpen && <ChatArea toggleChat={toggleChat} />}
      </div>
    </div>
  );
}
