var area = document.getElementById("area");
var cell = document.getElementsByClassName("cell");
var currentPlayer = document.getElementById("curPlay");
var modal = document.getElementById("myModal");
var closeM = modal.getElementsByClassName("close");

var player = "x";
var stat = {
  x: 0,
  o: 0,
  d: 0,
};
var winIndex = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
for (var i = 1; i <= 9; i++) {
  area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}
for (var i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", cellClick, false);
}
function cellClick() {
  var data = [];
  if (!this.innerHTML) {
    this.innerHTML = player;
  } else {
    return;
  }
  for (var i in cell) {
    if (cell[i].innerHTML == player) {
      data.push(parseInt(cell[i].getAttribute("pos")));
    }
  }

  if (checkWin(data)) {
    stat[player] += 1;
    restart("Выиграл: " + player);
  }
  if (stat[player] >= 3) {
    winner();
    console.log(stat[player]);
  } else {
    var draw = true;
    for (var i in cell) {
      if (cell[i].innerHTML == "") draw = false;
    }
    if (draw) {
      stat.d += 1;
      restart("Ничья");
    }
  }
  player = player == "x" ? "o" : "x";
  currentPlayer.innerHTML = player.toUpperCase();
}
function checkWin(data) {
  for (var i in winIndex) {
    var win = true;
    for (var j in winIndex[i]) {
      var id = winIndex[i][j];
      var ind = data.indexOf(id);

      if (ind == -1) {
        win = false;
      }
    }
    if (win) return true;
  }
  return false;
}
function restart(text) {
  alert(text);
  for (var i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
    player = "o";
  }
  updateStat();
}
function updateStat() {
  document.getElementById("sX").innerHTML = stat.x;
  document.getElementById("sO").innerHTML = stat.o;
  document.getElementById("sD").innerHTML = stat.d;
}
function winner() {
  modal.style.display = "block";
  document.getElementById("winPlay").innerHTML = player.toUpperCase();
}
function spanClose() {
  modal.style.display = "none";
  resetStat();
}

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
function resetStat() {
  document.getElementById("sX").innerHTML = 0;
  document.getElementById("sO").innerHTML = 0;
  document.getElementById("sD").innerHTML = 0;
  stat = {
    x: 0,
    o: 0,
    d: 0,
  };
  currentPlayer.innerHTML = " ";
  for (var i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
  }
}
