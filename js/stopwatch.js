//STOPWATCH

window.onload = function() {

  //defining each variable as 00 and then drawing the elements from the html using their IDs. append(x) defines what is written in the place of the element x which is first defined in the html code. This is done for each set of "00" in the time and also for each of the controlling buttons.
  var minutes = 00;
  var seconds = 00;
  var tens = 00;
  var appendMinutes = document.getElementById("minutes")
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var buttonReset = document.getElementById('button-reset');
  var Interval;

  //define the interval when the start button is clicked
  buttonStart.onclick = function() {

    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
  }

  //what happens when the stop button is clicked. 
  buttonStop.onclick = function() {
    clearInterval(Interval);
  }

  // When the resent button is clicked it resents each element of the stopwatch to "00". 
  buttonReset.onclick = function() {
    clearInterval(Interval);
    minutes = "00";
    tens = "00";
    seconds = "00";
    appendMinutes.innerHTML = minutes;
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
  }


  //when the timer is started the tens is told to go up by one consitently. 
  function startTimer() {
    tens++;

    // this "if" statement ensures that in a single digit number (anything below 10) then it will be displayed so that there is a zero in front of it in the secion of the stopwatch. The next if statement says that when the section is a two digit nnumber it just displays those two digits. 
    if (tens <= 9) {
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
      appendTens.innerHTML = tens;

    }
    //This "if" statement shows that once the tens column reaches 99 then it will reset to 00 and begin up again. It dictates that each time 99 is reached then the second column increased by 1. 
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }


    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }

    // says that once there are 60 seconds then the seconds column resets to 00 and the minutes column increases by 1.
    if (seconds > 59) {
      console.log("minutes");
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
    }

    if (minutes > 9) {
      appendMinutes.innerHTML = minutes;
    }
  }

}