import { useState } from "react";

function Lisays() {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [viesti, setViesti] = useState("");

  const lisaaSana = async (e: React.FormEvent) => {
    e.preventDefault();

    const uusiSana = {
      fin: fin,
      eng: eng,
    };

    try {
      const response = await fetch("http://localhost:3000/sanakirja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uusiSana),
      });

      const data = await response.json();

      if (response.ok) {
        setViesti(`Sana "${data.fin}" lisättiin onnistuneesti!`);
        setFin("");
        setEng("");
      } else {
        setViesti(data.message);
      }
    } catch (error) {
      setViesti("Palvelimeen ei saatu yhteyttä.");
    }
  };

  return (
    <div>
      <h2>Lisää uusi sana</h2>

      <form onSubmit={lisaaSana}>
        <div>
          <label>Suomeksi:</label>
          <br />
          <input
            type="text"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Englanniksi:</label>
          <br />
          <input
            type="text"
            value={eng}
            onChange={(e) => setEng(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Lisää sana</button>
      </form>

      {viesti && <p>{viesti}</p>}
    </div>
  );
}

export default Lisays;
