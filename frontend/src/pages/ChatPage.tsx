import { Send, Users } from "lucide-react";

const messages = [
  { name: "林怀古", time: "09:30", text: "端午祭祖活动资料已经放到公告里，请大家确认参加情况。" },
  { name: "张秋丹", time: "09:42", text: "我会补充几张旧照片，稍后发给资料整理人。" },
  { name: "林文翰", time: "10:05", text: "V1 群聊只保留入口，后续接 Socket.IO 后再完善实时消息。" },
];

export function ChatPage() {
  return (
    <div className="chat-page custom-flow-page">
      <header className="custom-flow-header">
        <span aria-hidden="true" />
        <h2>家族群聊</h2>
        <button type="button" aria-label="成员">
          <Users size={18} />
        </button>
      </header>
      <main className="chat-list">
        {messages.map((message) => (
          <article className="chat-bubble" key={message.time}>
            <span>{message.name.slice(0, 1)}</span>
            <div>
              <strong>{message.name}<time>{message.time}</time></strong>
              <p>{message.text}</p>
            </div>
          </article>
        ))}
      </main>
      <footer className="chat-input">
        <input placeholder="V3 接入实时群聊，此处为静态输入框" />
        <button type="button" aria-label="发送"><Send size={18} /></button>
      </footer>
    </div>
  );
}
