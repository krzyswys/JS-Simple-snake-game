//utility-----------------------------------------
speed = 100; //szybkość poruszania
var move = 15; //wielkość wensza (i obiektów)
var walls = 10; //max komplexów ścian na mapie
var food = 3; // ilosc jednostek jedzenia na mapie
var len = 8; //dlugosc bazowa wensza
var score = 0;
var sizeXY = 510; //wielość mapy (związana z canvasem w htmlu)
var vectorX = 0;
var vectorY = 0;
var snake = [];
var walls_arr = [];
var food_arr = [];
var eventhelp = 0;

var snake_body_color = "rgb(204, 0, 153)"; // "rgb(228, 224, 25)";
var snake_head_color = "rgb(102,0,51"; //"rgb(23, 129, 1)";
var dead_color = "rgb(236, 122, 122)";
var wall_color = "rgb(89, 92, 88)";
var food_color = "rgb(0, 191, 255)"; //"orange";
var food_eat_flick = "black";
var background_color = "rgb(255, 230, 255)"; //"white";

var size = move;
var edge = Math.floor(sizeXY / move) - 1;

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
let x = 0;
let y = 0;
let vector = 0;

//-----------------------------------------------
function clear_map() {
  eventhelp = 0;
  snake = [];
  walls_arr = [];
  food_arr = [];
  walls = parseInt(document.getElementById("walls_am").value);
  len = parseInt(document.getElementById("snake_size").value);
  speed = parseInt(document.getElementById("speed").value);
  food = parseInt(document.getElementById("food_am").value);
  // console.log(walls, len, speed, food);
  score = 0;
  x = 0;
  y = 0;
  vector = 0;
  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");
  ctx.fillStyle = background_color;
  ctx.fillRect(0, 0, sizeXY, sizeXY);
}
function dead(id) {
  //konczy interval oraz zmienia kolor na końcowy - funkcja zakańczająca grę
  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");
  clearInterval(id);
  for (var i = 0; i < len; i++) {
    ctx.fillStyle = dead_color;
    ctx.fillRect(snake[i].X * move, snake[i].Y * move, size, size);
  }
}

function generateWalls() {
  //generuje ściany
  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");
  let w = 0;
  for (var i = 0; i < walls; i++) {
    let a = getRandom(0, Math.floor(sizeXY / move) - 1);
    let b = getRandom(0, Math.floor(sizeXY / move) - 1);
    let number = getRandom(1, 5);
    w += number - 1;
    for (var j = 0; j < number; j++) {
      while (notIntersectWalls(a, b) == false) {
        a = getRandom(0, Math.floor(sizeXY / move) - 1);
        b = getRandom(0, Math.floor(sizeXY / move) - 1);
      }
      walls_arr.push({
        X: a,
        Y: b,
      });

      xx = getRandom(-1, 2);
      yy = getRandom(-1, 2);
      a += xx;
      b += yy;
    }
  }
  walls += w;
  for (var i = 0; i < walls; i++) {
    ctx.fillStyle = wall_color;
    ctx.fillRect(walls_arr[i].X * move, walls_arr[i].Y * move, size, size);
  }
}

function notIntersectFood(x, y) {
  //sprawdza czy generowane jedzenie nie przetnie się ze śianami oraz z wenszem (chociaż chuj wie czemu czasmi generuje sie na nim ale tlyko przy końcu)
  if (x <= 1 || y <= 1) {
    return false;
  }
  for (var i = 0; i < walls; i++) {
    if (
      Math.abs(walls_arr[i].X - x) <= 2 &&
      Math.abs(walls_arr[i].Y - y) <= 2
    ) {
      return false;
    }
  }
  for (var i = 0; i < len; i++) {
    if (Math.abs(snake[i].X - x) <= 2 && Math.abs(snake[i].Y - y) <= 2) {
      return false;
    }
  }
  return true;
}

function notIntersectWalls(x, y) {
  //sprawdza czy ściany nie przecinają się z pozycją wensza
  for (var i = 0; i < len; i++) {
    if (Math.abs(snake[i].X - x) <= 1 && Math.abs(snake[i].Y - y) <= 1) {
      return false;
    }
  }
  return true;
}

function generateFood() {
  // generuje losowo w odległości 2 jednostek od obiektów jedzenie
  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");
  for (var i = 0; i < food; i++) {
    let a = getRandom(0, Math.floor(sizeXY / move) - 1);
    let b = getRandom(0, Math.floor(sizeXY / move) - 1);

    while (notIntersectFood(a, b) == false) {
      a = getRandom(0, Math.floor(sizeXY / move) - 1);
      b = getRandom(0, Math.floor(sizeXY / move) - 1);
    }
    food_arr.push({
      X: a,
      Y: b,
    });
  }
  for (var i = 0; i < food; i++) {
    ctx.fillStyle = food_color;
    ctx.fillRect(food_arr[i].X * move, food_arr[i].Y * move, size, size);
  }
}
function checkSnake(id) {
  // sprawdzanie czy trafiło się na siebie
  for (var i = 0; i < len - 1; i++) {
    if (snake[i].X == snake[len - 1].X && snake[i].Y == snake[len - 1].Y) {
      return false;
    }
  }
  return true;
}

function checkWalls() {
  // sprawdzanie czy trafiło się na ścianę
  for (var i = 0; i < walls; i++) {
    if (
      walls_arr[i].X == snake[len - 1].X &&
      walls_arr[i].Y == snake[len - 1].Y
    ) {
      return false;
    }
  }
  return true;
}
function check_n_generateFood(f) {
  //sprawdzanie czy trafiło się na jedzenie
  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");

  for (var i = 0; i < food - f; i++) {
    if (
      food_arr[i].X == snake[len - 1].X &&
      food_arr[i].Y == snake[len - 1].Y
    ) {
      snake.unshift({
        X: snake[0].X,
        Y: snake[0].Y,
      });
      score += 1;

      ctx.fillStyle = food_eat_flick;
      ctx.fillRect(snake[0].X * move, snake[0].Y * move, 15, 15);
      len += 1;
      f += 1;
      food_arr.splice(i, 1);
      break;
    }
  }
  if (f == food) {
    generateFood();
    f = 0;
  }
  for (var i = 0; i < food - f; i++) {
    ctx.fillStyle = food_color;
    ctx.fillRect(food_arr[i].X * move, food_arr[i].Y * move, size, size);
  }
  return f;
}

function generateSnake() {
  // generuje wensza
  x = getRandom(len * 2, Math.floor(sizeXY / move) - len * 2 - 1);
  y = getRandom(len * 2, Math.floor(sizeXY / move) - len * 2 - 1);
  vector = getRandom(0, 4); // 0-prawo, 1 dol, 2 lewo, 3 gora

  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");

  switch (vector) {
    case 0:
      vectorX = 1;
      vectorY = 0;
      break;
    case 1:
      vectorX = 0;
      vectorY = 1;
      break;
    case 2:
      vectorX = -1;
      vectorY = 0;
      break;
    case 3:
      vectorX = 0;
      vectorY = -1;
      break;
  }

  for (var i = 0; i < len; i++) {
    x += vectorX;
    y += vectorY;
    snake.push({
      X: x,
      Y: y,
    });
    ctx.fillStyle = snake_body_color;
    ctx.fillRect(snake[i].X * move, snake[i].Y * move, size, size);
  }
  ctx.fillStyle = snake_head_color;
  ctx.fillRect(snake[len - 1].X * move, snake[len - 1].Y * move, size, size);
}

function load_map() {
  //ustaenie początkowowe mapy

  document.getElementById("score").innerHTML = "Wynik: " + score;
  generateSnake();
  generateWalls();
  generateFood();
}
// let counter = 0;
function clicked() {
  // działanie po kliknięciu

  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");

  for (var i = 0; i < len - 1; i++) {
    ctx.fillStyle = snake_body_color;
    ctx.fillRect(snake[i].X * move, snake[i].Y * move, size, size);
  }
  let f = 0;
  var id = setInterval(function () {
    // console.log(
    //   speed,
    //   move,
    //   walls,
    //   food,
    //   len,
    //   snake.length,
    //   walls_arr.length,
    //   counter
    // );
    // counter += 1;
    document.addEventListener("keydown", (event) => {
      console.log(event.code);
      if (event.code == "ArrowRight" && vector != 2) {
        vector = 0;
      }
      if (event.code == "ArrowLeft" && vector != 0) {
        vector = 2;
      }
      if (event.code == "ArrowUp" && vector != 1) {
        vector = 3;
      }
      if (event.code == "ArrowDown" && vector != 3) {
        vector = 1;
      }
    });
    if (
      snake[len - 1].X < edge &&
      snake[len - 1].Y < edge &&
      snake[len - 1].X > 0 &&
      snake[len - 1].Y > 0
    ) {
      switch (vector) {
        case 0:
          vectorX = 1;
          vectorY = 0;
          break;
        case 1:
          vectorX = 0;
          vectorY = 1;
          break;
        case 2:
          vectorX = -1;
          vectorY = 0;
          break;
        case 3:
          vectorX = 0;
          vectorY = -1;
          break;
      }
      ctx.fillStyle = background_color;
      ctx.fillRect(snake[0].X * move, snake[0].Y * move, size, size);
      snake.shift();
      ctx.fillStyle = snake_body_color;
      ctx.fillRect(x * move, y * move, size, size);
      x += vectorX;
      y += vectorY;
      ctx.fillStyle = snake_head_color;
      ctx.fillRect(x * move, y * move, size, size);
      snake.push({
        X: x,
        Y: y,
      });

      if (checkSnake(id) == false) {
        dead(id);
      }
      if (checkWalls(id) == false) {
        dead(id);
      }
      f = check_n_generateFood(f);
      document.getElementById("score").innerHTML = "Wynik: " + score;
    } else {
      dead(id);
    }
  }, speed);
}

function changeSize() {
  let c = document.getElementById("snake_size").value;
  clear_map();
  len = parseInt(c);
  load_map();
}

function changeFood() {
  let a = document.getElementById("food_am").value;
  clear_map();
  food = parseInt(a);
  load_map();
}
function changeWalls() {
  let c = document.getElementById("walls_am").value;
  clear_map();
  walls = parseInt(c);
  load_map();
}
function changeSpeed() {
  let c = document.getElementById("speed").value;
  clear_map();
  speed = parseInt(c);
  load_map();
}
function generate_map() {
  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");

  clear_map();
  load_map();
  document.addEventListener("keydown", (event) => {
    console.log(event.code);
    if (event.code == "Space") {
      if (eventhelp == 0) {
        clicked();
        eventhelp = 1;
      }
    }
  });
}
