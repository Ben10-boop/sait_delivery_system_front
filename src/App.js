
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import axios from "axios";
import { useUser } from "./hooks/UseUser";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
const { getToken} = useUser();
const token = getToken();

  useEffect(() => {
     axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Pages />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
