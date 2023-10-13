import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io("http://localhost:8000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { message: message });
      setMessages([...messages, { text: message, type: "sent" }]);
    }
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageReceived(data.message);
      setMessages([...messages, { text: data.message, type: "received" }]);
    });
  }, [socket, messages]);

  return (
    <div className="App">
      <input
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Messages: </h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.type}>
            {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
