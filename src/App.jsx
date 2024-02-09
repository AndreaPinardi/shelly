import { useEffect } from "react";
import "./App.css";
import Form from "./Form";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const deviceId = import.meta.env.VITE_DEVICE_ID;
const authKey = import.meta.env.VITE_AUTH_KEY;

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://shelly-94-eu.shelly.cloud/device/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `id=${encodeURIComponent(
            deviceId
          )}&auth_key=${encodeURIComponent(authKey)}`,
        }
      );
      const { data } = await res.json();
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <MantineProvider theme={theme}>
        <Form />{" "}
      </MantineProvider>
    </>
  );
}

export default App;
