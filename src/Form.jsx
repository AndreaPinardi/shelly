import React, { useState } from "react";
import { Button, PasswordInput } from "@mantine/core";

const deviceId = import.meta.env.DEVICE_ID;
const authKey = import.meta.env.AUTH_KEY;
const CODE = import.meta.env.CODE;
const channelId = 0;

function Form({ isSwitchOn }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [command, setCommand] = useState(isSwitchOn ? "off" : "on");

  const validateCode = () => {
    if (code != CODE) {
      setError("Codice Errato!");
      return false;
    }
    setError("");
    setCode("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateCode()) {
      fetch(`https://shelly-94-eu.shelly.cloud/device/relay/control`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `channel=${encodeURIComponent(
          channelId
        )}&turn=${encodeURIComponent(command)}&id=${encodeURIComponent(
          deviceId
        )}&auth_key=${encodeURIComponent(authKey)}`,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCommand((command) => (command === "off" ? "on" : "off"));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleChange = (event) => {
    setCode(event.currentTarget.value);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <PasswordInput
        label="Codice di sicurezza"
        placeholder="Inserisci il codice di sicurezza"
        value={code}
        onChange={handleChange}
        error={error}
        required
      />
      <Button type="submit">
        {command === "off" ? "SPEGNI ALLARME" : "ACCENDI ALLARME"}
      </Button>
    </form>
  );
}

export default Form;
