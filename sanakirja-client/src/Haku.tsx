import { useState } from "react";

function Haku() {
  const [hakusana, setHakusana] = useState("");
  const [vastaus, setVastaus] = useState("");
  const [virhe, setVirhe] = useState("");

  const haeSana = async () => {
    if (!hakusana.trim()) {
      setVirhe("Syötä suomenkielinen sana.");
      setVastaus("");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/sanakirja/${encodeURIComponent(hakusana)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setVastaus(data.eng);
        setVirhe("");
      } else {
        setVastaus("");
        setVirhe(data.message);
      }
    } catch (error) {
      setVastaus("");
      setVirhe("Palvelimeen ei saatu yhteyttä.");
    }
  };

  return (
    <div>
      <h2>Hae sanaa</h2>

      <label>Suomenkielinen sana:</label>
      <br />

      <input
        type="text"
        value={hakusana}
        onChange={(e) => setHakusana(e.target.value)}
      />

      <button onClick={haeSana}>Hae</button>

      {vastaus && (
        <div>
          <h3>Englanniksi:</h3>
          <p>{vastaus}</p>
        </div>
      )}

      {virhe && <p>{virhe}</p>}
    </div>
  );
}

export default Haku;
