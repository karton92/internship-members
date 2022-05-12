import EditIntern from "./EditIntern/EditIntern";
import InternList from "./InternList/InternList";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import logo from "../assets/images/logo.png";

function App() {
  return (
    <div className="container">
      <img className="logo" src={logo} alt="Brand logo" />
      <main>
        <Routes>
          <Route path="/interns/:id" exact element={<EditIntern />} />
          <Route path="/" element={<InternList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
