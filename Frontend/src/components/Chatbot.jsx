import { useState } from "react";
import axios from "axios";


function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    setResponse("Loading...");
    try {
      const res = await axios.post("http://localhost:3001/api/prompt", { prompt });
      setResponse(res.data.response);
    } catch (err) {
      setResponse("Error fetching response.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🧠 AI Health Assistant</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask me anything..."
        style={{ width: "70%", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Send
      </button>
      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        <strong>AI Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Chatbot;
