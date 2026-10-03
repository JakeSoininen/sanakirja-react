import { useState } from "react";
import Lisays from "./Lisays";
import Haku from "./Haku";
import "./App.css";

function App() {
  const [sivu, setSivu] = useState("etusivu");

  return (
    <div className="container">
      <h1>Sanakirja</h1>

      <nav>
        <button onClick={() => setSivu("etusivu")}>Etusivu</button>

        <button onClick={() => setSivu("lisaa")}>Lisää sana</button>

        <button onClick={() => setSivu("haku")}>Hae sanaa</button>
      </nav>

      {sivu === "etusivu" && (
        <div>
          <h2>Tervetuloa sanakirjaan!</h2>
          <p>
            Voit lisätä uusia sanoja tai hakea suomenkieliselle sanalle
            englanninkielisen vastineen.
          </p>
        </div>
      )}

      {sivu === "lisaa" && <Lisays />}

      {sivu === "haku" && <Haku />}
    </div>
  );
}

export default App;
