async function loadPlayers() {
  const res = await fetch("https://newtons-apples.onrender.com/players");
  const players = await res.json();

  console.log(players);
  const lista = document.getElementById("lista");
  players.forEach(p => {
    const item = document.createElement("li");
    item.innerHTML = `<h3>${p.name}</h3>
                      <h2>${p.score}</h2>`
    item.classList.add("flex");
    lista.appendChild(item);
  });
 
}
window.onload = loadPlayers;
`${p.name} - ${p.score}`