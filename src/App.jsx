import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import "@mantine/core/styles.css";
import { Loader, MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const deviceId = import.meta.env.VITE_DEVICE_ID;
const authKey = import.meta.env.VITE_AUTH_KEY;

const getDeviceData = async (onSuccess) => {
  try {
    const res = await fetch("https://shelly-94-eu.shelly.cloud/device/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `id=${encodeURIComponent(deviceId)}&auth_key=${encodeURIComponent(
        authKey
      )}`,
    });
    const { data } = await res.json();
    console.log(data);
    onSuccess(data);
  } catch (err) {
    console.log(err);
  }
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDeviceData(setData);
  }, []);

  return (
    <div className="app">
      {data?.online && (
        <div className="online">
          <span></span>
          <p>Online</p>
        </div>
      )}
      <MantineProvider theme={theme}>
        {data ? (
          <Form isSwitchOn={data.device_status["switch:0"].output} />
        ) : (
          <Loader color="blue" />
        )}
      </MantineProvider>
    </div>
  );
}

export default App;
