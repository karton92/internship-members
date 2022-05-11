import EditIntern from "./EditIntern/EditIntern";
import InternList from "./InternList/InternList";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import logo2 from "../assets/images/logo2.png";

function App() {
  return (
    <div className="container">
      <img className="logo" src={logo2} alt="Brand logo" />
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
