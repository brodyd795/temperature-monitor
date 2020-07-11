let temp, average;
let on = false;
let lastFiveTemps = [];

const print = () => {};

const blinkDuration = 1000;
const tooHot = 72;
const tooCold = 65;

function blink(LED) {
  LED.write(false);
  LED.write(true);
  setTimeout(() => {
    LED.write(false);
  }, blinkDuration);
}

function checkTemp() {
  temp = E.getTemperature() * 9/5 + 32;
  if (lastFiveTemps.length === 5) {
    lastFiveTemps.shift();
  }
  lastFiveTemps.push(temp);
  
  average = lastFiveTemps.reduce((a, b) => a + b) / lastFiveTemps.length;
  
  if (average >= tooHot) {
    blink(LED1);
  } else if (average <= tooCold) {
    blink(LED3);
  } else {
    blink(LED2);
  }
  print(lastFiveTemps);
  print('Temp average is ' + average);
}

setInterval(() => {
  if (on) checkTemp();
}, 2000);

setWatch(() => {
  on = !on;
  LED.write(false);
}, BTN, {edge:"falling", debounce:50, repeat:true});
