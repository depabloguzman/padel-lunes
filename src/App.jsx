import { useState } from "react";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("drive");
  const [pairs, setPairs] = useState([]);

  const drives = players.filter(p => p.position === "drive");
  const reveses = players.filter(p => p.position === "reves");

  const addPlayer = () => {
    if (name.trim() === "") return;
    if (players.length >= 16) return;
    if ((position === "drive" && drives.length >= 8) || (position === "reves" && reveses.length >= 8)) return;
    setPlayers([...players, { name, position }]);
    setName("");
    setPosition("drive");
  };

  const removePlayer = (playerName) => {
    setPlayers(players.filter(p => p.name !== playerName));
    setPairs([]);
  };

  const sortearParejas = () => {
    const shuffledDrives = [...drives].sort(() => Math.random() - 0.5);
    const shuffledReveses = [...reveses].sort(() => Math.random() - 0.5);
    const nuevasParejas = [];
    for (let i = 0; i < 8; i++) {
      nuevasParejas.push({ drive: shuffledDrives[i].name, reves: shuffledReveses[i].name });
    }
    setPairs(nuevasParejas);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Peña de Pádel - Lunes</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nombre del jugador"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "60%", padding: "8px", marginRight: "10px" }}
        />
        <select
          value={position}
          onChange={e => setPosition(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="drive">Drive</option>
          <option value="reves">Revés</option>
        </select>
        <button onClick={addPlayer} style={{ display: "block", width: "100%", marginTop: "10px", padding: "10px" }}>
          Anotar jugador
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h2>Drive ({drives.length}/8)</h2>
          <ul>
            {drives.map((p, i) => (
              <li key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                {p.name}
                <button onClick={() => removePlayer(p.name)}>Borrarse</button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Revés ({reveses.length}/8)</h2>
          <ul>
            {reveses.map((p, i) => (
              <li key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                {p.name}
                <button onClick={() => removePlayer(p.name)}>Borrarse</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {players.length === 16 && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "green", fontWeight: "bold" }}>
          ¡Jugadores completos! Listos para sortear parejas.
          <br />
          <button onClick={sortearParejas} style={{ marginTop: "10px", padding: "10px" }}>Sortear parejas</button>
        </div>
      )}

      {pairs.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Parejas sorteadas:</h2>
          <ul>
            {pairs.map((pair, index) => (
              <li key={index}>
                Pareja {index + 1}: {pair.drive} + {pair.reves}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
