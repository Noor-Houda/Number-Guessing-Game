
let end = false;
let seconds = 0;
let minutes = 0;
let score = 0;
let nbr_iteration = 0;
let res;
let input_box;
let a;
let b;
let timer_started = false;
let timeout_val;
let number;
/*-------------------------------------------------------*/
function timer() {
  increment();
}

function increment() {
  if (!end) {
    document.getElementById("timer").style.color = "black";
    if (seconds < 60) {
      seconds = seconds + 1;
      document.getElementById("sec").innerHTML = seconds;
    } else {
      minutes++;
      seconds = 0;
      document.getElementById("timer").style.color = "red";
      document.getElementById("sec").innerHTML = seconds;
      document.getElementById("min").innerHTML = minutes;
    }
    timeout_val = setTimeout(increment, 1000);
  }
}
/*-------------------------------------------------------*/
function getRounds() {
  return JSON.parse(localStorage.getItem("rounds")) || [];
}

function saveRounds(rounds) {
  localStorage.setItem("rounds", JSON.stringify(rounds));
}

function addRound(a,b,counter,score, time) {
  const rounds = getRounds();
  const round = {a,b,counter,score,time};
  rounds.push(round);
  saveRounds(rounds);
}
function clearRounds() {
  localStorage.removeItem("rounds");
}

function _endRound(){
  addRound(a, b, nbr_iteration, score , minutes + ":" + seconds);
}
/*-------------------------------------------------------*/
function _restart() {
  clearRounds();
  input_box.value="";
  nbr_iteration = 0;
  score = 0;
  clearTimeout(timeout_val);
  timer_started = false;
  document.getElementById("score_count").innerHTML = score;
  document.getElementById("nbr").innerHTML = nbr_iteration;
  jeux();
  document.getElementById("type").value = "";
}
/*-------------------------------------------------------*/

function nb_aleatoire(min, max) {
  const nb = min + (max - min + 1) * Math.random();
  return Math.floor(nb);
}

function saisie_x() {
  let x = prompt("Donner le min:", 0);
  while (isNaN(x) || x < 0) {
    alert("❌ Valeur incorrect! ❌");
    x = prompt("Donner le min:", 0);
  }
  return x;
}

function saisie_y() {
  let y = prompt("Donner le max:", 100);
  while (isNaN(y) || y > 100) {
    alert("❌ Valeur incorrect! ❌");
    y = prompt("Donner le max:", 100);
  }
  return y;
}

function print_star(x) {
  str = "";
  for (let i = 0; i < x.toString().length; i++) str += "*";
  return str;
}

function get_ans(x, y) {
  str = "";
  for (let i = 0; i < y.length; i++) {
    str += x[i] == y[i] ? y[i] + " " : "* ";
  }
  return str;
}

function verify(x, y) {
  return x === y;
}

function handleGuess() {
  if (verify(input_box.value.toString(), number.toString())) {
    res.innerHTML = number;
    alert("Bravo! Vous avez gagné ✔");
    score++;
    document.getElementById("score_count").innerHTML = score;
    end = true;
    number = -1;
    input_box.value="";
    setTimeout(jeux, 500);
  } else {
    res.innerHTML = get_ans(input_box.value.toString(), number.toString());
    nbr_iteration++;
    document.getElementById("nbr").innerHTML = nbr_iteration;
  }
}
function jeux() {
  if (score === 0 && !timer_started) {
    a = saisie_x();
    b = saisie_y();
    timer_started = true;
    setTimeout(timer, 1000);
    minutes = 0;
    seconds = 0;
  }
  res = document.getElementById("star");
  input_box = document.getElementById("type");
  number = nb_aleatoire(parseInt(a), parseInt(b));
  res.innerHTML = print_star(number);
  console.log(number);

  // Remove previous event listeners
  const newInputBox = input_box.cloneNode(true);
  input_box.replaceWith(newInputBox);
  input_box = newInputBox;

  // Set up event listener for input after element initialization
  input_box.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      handleGuess();
    }
  });
}
