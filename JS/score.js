// Function to get rounds from localStorage
function getRounds() {
  return JSON.parse(localStorage.getItem("rounds")) || [];
}

function getBestScore() {
  const rounds = getRounds();
  let best = rounds[0];
  let i = 0;
  rounds.forEach((round, index) => {
    if (round.score > best.score) {
      best = round;
      i = index+1;
    }
  });
  const tableBody = document
    .getElementById("bestRoundTable")
    .getElementsByTagName("tbody")[0];

  tableBody.innerHTML = "";
  const row = tableBody.insertRow();
  row.insertCell(0).textContent = "⭐ " + i + " ⭐" ;
  row.insertCell(1).textContent = best.a;
  row.insertCell(2).textContent = best.b;
  row.insertCell(3).textContent = best.counter;
  row.insertCell(4).textContent = "🏆 " + best.score+" 🏆 ";
  row.insertCell(5).textContent = best.time;
}
function displayRounds() {
  getBestScore();
  let rounds = getRounds();
  const tableBody = document
    .getElementById("roundsTable")
    .getElementsByTagName("tbody")[0];

  tableBody.innerHTML = "";

  rounds.forEach((round, index) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = index + 1;
    row.insertCell(1).textContent = round.a;
    row.insertCell(2).textContent = round.b;
    row.insertCell(3).textContent = round.counter;
    row.insertCell(4).textContent = round.score;
    row.insertCell(5).textContent = round.time;
  });
}

// Display rounds when the page loads
document.addEventListener("DOMContentLoaded", displayRounds);
