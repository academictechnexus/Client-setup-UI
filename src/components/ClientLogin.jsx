import { useState } from "react";
import api from "../api";

export default function ClientLogin({ token }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  const submit = async () => {
    await api.post(`/client-auth/register`, {
      token,
      email,
      password
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="center">
        <div className="card">
          <h2>🎉 Your AI is Live</h2>
          <p>You can now log in anytime to manage your assistant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div className="card">
        <h2>Create your login</h2>
        <p>Manage your AI assistant anytime</p>

        <input
          placeholder="Business email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={submit}>Create Account</button>
      </div>
    </div>
  );
}
