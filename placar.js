async function loadPlayers() {
  const res = await fetch("https://newtons-apples.onrender.com/players");
  const players = await res.json();

  console.log(players);
  const lista = document.getElementById("lista");
  players.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.name} - ${p.score}`;
    lista.appendChild(item);
  });
 
}
window.onload = loadPlayers;