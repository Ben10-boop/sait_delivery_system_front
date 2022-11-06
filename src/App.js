
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import axios from "axios";
import { useUser } from "./hooks/UseUser";

function App() {
const { getToken} = useUser();
const token = getToken();

  useEffect(() => {
     axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <h1>hello</h1>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
