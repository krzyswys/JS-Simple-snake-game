//utility-----------------------------------------
speed = 100; //15 * 3;
let move = 15;
var arr = [];
var blocks = [];
var items = 8;
var len = 6;

var sizeXY = 500;

function getRAndom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
let x = getRAndom(move * len, sizeXY - move * len);
let y = getRAndom(move * len, sizeXY - move * len);
let vector = getRAndom(0, 4); // 0-prawo, 1 dol, 2 lewo, 3 gora
var prev_vector = vector;
// let position = {
//   X: 25,
//   Y: 25,
// };
//-----------------------------------------------

//ustawienie poczatkowe---------------------------
if (vector == 0) {
  for (var i = 0; i < len; i++) {
    arr.push({
      X: x,
      Y: y,
    });
    x += move;
  }
} else if (vector == 1) {
  for (var i = 0; i < len; i++) {
    arr.push({
      X: x,
      Y: y,
    });
    y += move;
  }
} else if (vector == 2) {
  for (var i = 0; i < len; i++) {
    arr.push({
      X: x,
      Y: y,
    });
    x -= move;
  }
} else if (vector == 3) {
  for (var i = 0; i < len; i++) {
    arr.push({
      X: x,
      Y: y,
    });
    y -= move;
  }
}

for (var i = 0; i < items; i++) {
  let x = getRAndom(1, Math.floor((sizeXY - move) / move));
  x = x * move;
  let y = getRAndom(1, Math.floor((sizeXY - move) / move));
  y = y * move;
  let type = getRAndom(0, 2); //0 to jedzenie, 1 to sciana
  blocks.push({
    X: x,
    Y: y,
    what: type,
  });
}
//----------------------------------------------------------

//pokolorowanie poczatkowe przed rozpoczecziem tj klikiem---------
function loaded() {
  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");

  for (var i = 0; i < len; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
  }
  ctx.fillStyle = "cyan";
  ctx.fillRect(arr[len - 1].X, arr[len - 1].Y, 15, 15);
  for (var i = 0; i < items; i++) {
    if (blocks[i].what == 0) {
      ctx.fillStyle = "blue";
      ctx.fillRect(blocks[i].X, blocks[i].Y, 15, 15);
    } else {
      ctx.fillStyle = "grey";
      ctx.fillRect(blocks[i].X, blocks[i].Y, 15, 15);
    }
  }
}
//-----------------------------------------------
function pip() {
  let convas = document.getElementById("canva");
  let ctx = convas.getContext("2d");

  for (var i = 0; i < len; i++) {
    ctx.fillStyle = "black";
    ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
  }
  ctx.fillStyle = "cyan";
  ctx.fillRect(arr[len - 1].X, arr[len - 1].Y, 15, 15);
  var id = setInterval(function () {
    document.addEventListener("keydown", (event) => {
      console.log(event.code);
      if (event.code == "ArrowRight" && prev_vector != 2) {
        vector = 0;
      }
      if (event.code == "ArrowLeft" && prev_vector != 0) {
        vector = 2;
      }
      if (event.code == "ArrowUp" && prev_vector != 1) {
        vector = 3;
      }
      if (event.code == "ArrowDown" && prev_vector != 3) {
        vector = 1;
      }
    });
    prev_vector = vector;
    if (
      arr[len - 1].X >= sizeXY - 15 ||
      arr[len - 1].Y >= sizeXY - 15 ||
      arr[len - 1].X <= 5 ||
      arr[len - 1].Y <= 5
    ) {
      clearInterval(id);
      for (var i = 0; i < len; i++) {
        ctx.fillStyle = "rgb(236, 122, 122)";
        ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
      }
    } else if (vector == 0) {
      ctx.fillStyle = "white";
      ctx.fillRect(arr[0].X, arr[0].Y, 15, 15);
      arr.shift();
      arr.push({
        X: x,
        Y: y,
      });
      x += move;
      for (var i = 0; i < len; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
      }
      ctx.fillStyle = "cyan";
      ctx.fillRect(arr[len - 1].X, arr[len - 1].Y, 15, 15);
    } else if (vector == 1) {
      ctx.fillStyle = "white";
      ctx.fillRect(arr[0].X, arr[0].Y, 15, 15);
      arr.shift();
      arr.push({
        X: x,
        Y: y,
      });
      y += move;
      for (var i = 0; i < len; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
      }
      ctx.fillStyle = "cyan";
      ctx.fillRect(arr[len - 1].X, arr[len - 1].Y, 15, 15);
    } else if (vector == 2) {
      ctx.fillStyle = "white";
      ctx.fillRect(arr[0].X, arr[0].Y, 15, 15);
      arr.shift();
      arr.push({
        X: x,
        Y: y,
      });
      x -= move;
      for (var i = 0; i < len; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
      }
      ctx.fillStyle = "cyan";
      ctx.fillRect(arr[len - 1].X, arr[len - 1].Y, 15, 15);
    } else if (vector == 3) {
      ctx.fillStyle = "white";
      ctx.fillRect(arr[0].X, arr[0].Y, 15, 15);
      arr.shift();
      arr.push({
        X: x,
        Y: y,
      });
      y -= move;
      for (var i = 0; i < len; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
      }
      ctx.fillStyle = "cyan";
      ctx.fillRect(arr[len - 1].X, arr[len - 1].Y, 15, 15);
    }

    for (var i = 0; i < items; i++) {
      if (
        Math.abs(blocks[i].X - arr[len - 1].X) <= 15 &&
        Math.abs(blocks[i].Y - arr[len - 1].Y) <= 15 &&
        blocks[i].what == 1
      ) {
        clearInterval(id);
        for (var i = 0; i < len; i++) {
          ctx.fillStyle = "rgb(236, 122, 122)";
          ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
        }
        blocks[i].what = 2;
      } else if (
        Math.abs(blocks[i].X - arr[len - 1].X) <= 15 &&
        Math.abs(blocks[i].Y - arr[len - 1].Y) <= 15 &&
        blocks[i].what == 0
      ) {
        arr.unshift({
          X: arr[0].X - 15,
          Y: arr[0].Y,
        });
        len += 1;
        blocks[i].what = 2;
        ctx.fillStyle = "white";
        ctx.fillRect(blocks[i].X, blocks[i].Y, 15, 15);
      } else if (blocks[i].what == 0) {
        ctx.fillStyle = "blue";
        ctx.fillRect(blocks[i].X, blocks[i].Y, 15, 15);
      } else if (blocks[i].what == 1) {
        ctx.fillStyle = "grey";
        ctx.fillRect(blocks[i].X, blocks[i].Y, 15, 15);
      }
    }
    for (var i = 0; i < len - 1; i++) {
      if (arr[i].X == arr[len - 1].X && arr[i].Y == arr[len - 1].Y) {
        clearInterval(id);
        for (var i = 0; i < len; i++) {
          ctx.fillStyle = "rgb(236, 122, 122)";
          ctx.fillRect(arr[i].X, arr[i].Y, 15, 15);
        }
      }
    }
  }, speed);
}
