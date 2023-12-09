let start = document.querySelector('.start');
let reset = document.querySelector('.reset');
let pause = document.querySelector('.pause');
let laps = document.querySelector('.laps');
let lapsList = document.querySelector('.laps-list');
let hrs = document.querySelector('.hour');
let min = document.querySelector('.min');
let sec = document.querySelector('.sec');
let microSec = document.querySelector('.micro-sec');

let hrsValue = 0;
let minValue = 0;
let secValue = 0;
let microSecValue = 0;

let timerStatus = 'off';

let startTimer = () => {
    if (timerStatus === 'off') {
        timerStatus = 'on';
        timer = setInterval(() => {
            microSecValue += 1;
            if (microSecValue === 100) {
                microSecValue = 0;
                secValue += 1;
                if (secValue === 60) {
                    secValue = 0;
                    minValue += 1;
                }
                if (minValue === 60) {
                    minValue = 0;
                    hrsValue += 1;
                }
            }
            microSec.innerHTML = microSecValue < 10 ? `0${microSecValue}` : microSecValue;
            sec.innerHTML = secValue < 10 ? `0${secValue}` : secValue;
            min.innerHTML = minValue < 10 ? `0${minValue}` : minValue;
            hrs.innerHTML = hrsValue < 10 ? `0${hrsValue}` : hrsValue;
        }, 10);
    }
};

let pauseTimer = () => {
    clearInterval(timer);
    timerStatus = 'off';
};
let resetTimer = () => {
    clearInterval(timer);
    timerStatus = 'off';
    hrsValue = 0;
    minValue = 0;
    secValue = 0;
    microSecValue = 0;
    microSec.innerHTML = '00';
    sec.innerHTML = '00';
    min.innerHTML = '00';
    hrs.innerHTML = '00';
    lapsList.innerHTML = '';
};

let counter = 0;
let addLaps = () => {
    counter++;
    if (hrsValue === 0 && minValue === 0 && secValue === 0 && microSecValue === 0) return;
    let li = document.createElement('li');
    li.textContent = `${counter}. ${hrs.textContent}:${min.textContent}:${sec.textContent}:${microSec.textContent}`;
    lapsList.prepend(li);
};

start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);
laps.addEventListener('click', addLaps);