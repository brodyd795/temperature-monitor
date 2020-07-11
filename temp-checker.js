let temp, message;
let on = false;

const print = () => {};

const blinkDuration = 200;
const tooHot = 77;
const tooCold = 76;

function blink(LED) {
  LED.write(false);
  LED.write(true);
  setTimeout(() => {
    LED.write(false);
  }, blinkDuration);
}

function checkTemp() {
  temp = E.getTemperature() * 9/5 + 32;
  if (temp >= tooHot) {
    blink(LED1);
  } else if (temp <= tooCold) {
    blink(LED3);
  } else {
    blink(LED2);
  }
  print('Temp is ' + temp);
}

setInterval(() => {
  if (on) checkTemp();
}, 2000);

setWatch(() => {
  on = !on;
  LED.write(false);
}, BTN, {edge:"falling", debounce:50, repeat:true});
