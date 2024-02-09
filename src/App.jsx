import { useEffect } from "react";
import "./App.css";
import Form from "./Form";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({});

const deviceId = import.meta.env.PROD.DEVICE_ID;
const authKey = import.meta.env.PROD.AUTH_KEY;

function App() {
  useEffect(() => {
    const fetchData = async () => {
      if (!deviceId && !authKey) {
        return;
      }
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
