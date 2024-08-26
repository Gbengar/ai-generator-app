import ChatArea from "./component/Chatarea";
import Header from "./component/Header";

export default function Chat() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-between selection:text-blue-700 selection:bg-yellow-100">
      <Header name="Pro" />
      <ChatArea />
    </main>
  );
}
