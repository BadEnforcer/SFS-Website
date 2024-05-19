import "./App.css";

import { useState } from "react";

import axios from "axios";

axios.defaults.baseURL = "https://sfs-server-dot-rajdwivedispaceweb.el.r.appspot.com";
axios.defaults.headers.authorization = "Bearer " + "token";

function App() {
  const [message, setMessage] = useState("");
  const handleDisableAccount = async () => {
    try {
      const response = await axios.post("/api/v1/auth/disable-user", {uid: "9YAyNzFQ1UTOnuK89fc4BXaG5sj1"});
      setMessage(response.data.message);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      }
      
    }
  }
  const handleEnableAccount = async () => {
    try {
      const response = await axios.post("/api/v1/auth/enable-user", {uid: "9YAyNzFQ1UTOnuK89fc4BXaG5sj1"});
      setMessage(response.data.message+ "");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message)
      }
    }
  }

  return (
    <div className="App">
      <p>Welcome to SFS</p>
      <button onClick={async () => await handleDisableAccount()}>Click to disable account</button>
      <button onClick={async () => await handleEnableAccount()}>Click to enable account</button>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
