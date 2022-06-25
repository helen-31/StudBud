// PROMODO TIMER

// using the function getElementById() to draw on ID elements form the HTML to create new javascript variables

var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');

var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');

var bm = document.getElementById('b_minutes');
var bs = document.getElementById('b_seconds');

//store a reference to a timer variable
var startTimer;

// using the function addEventListener is used to listen for when an event occurs and to offer a supplimentary event which happens when the first occurrs. a function is defined for when each previously defined varibale is clicked in this instance (start, reset, stop) 

//this one below also defines the startTimer function in relation to "timer" which will be defined later

start.addEventListener('click', function() {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000)
  }
})

//the reset button being clicked will reset the following readings which make up the timer to their original readings. It also sets the counter by drawing on the ID and sets it to 0 again

reset.addEventListener('click', function() {
  wm.innerText = 25;
  ws.innerText = "00";

  bm.innerText = 5;
  bs.innerText = "00";

  document.getElementById('counter').innerText = 0;
  stopInterval()
  startTimer = undefined;
})


stop.addEventListener('click', function() {
  stopInterval()
  startTimer = undefined;
})


//Start Timer Function is completed by defining "timer" here, which is previously used as a parameter in startTimer

function timer() {
  //Work Timer Countdown. So the "seconds" column is created so that every time it reads "00" then the reading changes to "59" and then beginds to count down from 59 until it reaches "00" again
  if (ws.innerText != 0) {
    ws.innerText--;
  } else if (wm.innerText != 0 && ws.innerText == 0) {
    ws.innerText = 59;
    wm.innerText--;
  }

  //Break Timer Countdown. This switches the countdown to the break timer when all values in the work timer are 0. The break timer is programmed the same way. 
  if (wm.innerText == 0 && ws.innerText == 0) {
    if (bs.innerText != 0) {
      bs.innerText--;
    } else if (bm.innerText != 0 && bs.innerText == 0) {
      bs.innerText = 59;
      bm.innerText--;
    }
  }

  //Increment Counter by one if one full cycle is completed. 
  if (wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0) {
    wm.innerText = 25;
    ws.innerText = "00";

    bm.innerText = 5;
    bs.innerText = "00";
// this increases the counter by 1 everytime a full cycle of the work and break timer has been completed
    document.getElementById('counter').innerText++;
  }
}

//Stop Timer Function
function stopInterval() {
  clearInterval(startTimer);
}

