import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reg() {
  const [inputs, setInputs] = useState({});
  const [sing, setSing] = useState("...");
  const navigate = useNavigate();
  const [log, setLog] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:5173/api/reg", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((json) => {
        json.message ? setLog(json.message) : setLog(json.error);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
        <input
          placeholder="Password again"
          name="password2"
          type="password"
          value={inputs.password2 || ""}
          onChange={handleChange}
        />
        <div className="buttons">
          <button className="button" type="submit" onClick={handleSubmit}>
            Registration
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
            onFocus={() => setSing("Login")}
            onMouseOver={() => setSing("Login")}
            onMouseLeave={() => setSing("...")}
            className="button2"
          >
            {sing}
          </button>
        </div>
      </form>
      <div style={{ color: "red" }}>{log}</div>
    </div>
  );
}