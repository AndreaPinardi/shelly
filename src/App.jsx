import { useEffect } from "react";
import "./App.css";

const deviceId = "c82e180baa70";
const authKey =
  "MjE2ZTM2dWlkA295752D04067728B2D9F50FAA56716B163725FA16835174B8F498CFB8CEA9165CCA04CB8567D434";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://shelly-94-eu.shelly.cloud/device/status",
        {
          method: "POST",
          headers: {
            id: deviceId,
            auth_key: authKey,
          },
        }
      );
      console.log(res);
    };
    fetchData();
  }, []);
  return <>ciao</>;
}

export default App;
