const startBtn = document.querySelector("button[data-start]");

const clockDays = document.querySelector("span[data-days]");
const clockHours = document.querySelector("span[data-hours]");
const clockMinutes = document.querySelector("span[data-minutes]");
const clockSeconds = document.querySelector("span[data-seconds]");


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
const fp = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    const now = new Date();
    userSelectedDate = selectedDates[0];
    if(userSelectedDate < now) {
        iziToast.show({
            id: null, 
            title: 'Error',
    titleColor: '#fff',
            message: ' Illegal operation',
            messageColor: '#fff',
            messageSize: '16px',
            backgroundColor: '#ef4040',
          })
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
  },}); // flatpickr






startBtn.addEventListener("click", start)  


let intervalId = null;



function start() {
   
        const now = new Date ();
        let timeDifference = userSelectedDate - now;
        intervalId = setInterval(() => {
        timeDifference -= 1000;
if( timeDifference > 0) {
        const time = getTimeComponents(timeDifference);
        onTick(time);
                
}
  }, 1000)
}


function getTimeComponents(time) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(time / day);
    // Remaining hours
    const hours = pad(Math.floor((time % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((time % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((time % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };

  }

function pad(value) {
    return String(value).padStart(2, "0");
}

function onTick({ days, hours, minutes, seconds }) {
    clockDays.textContent = `${days}`;
    clockHours.textContent = `${hours}`;
    clockMinutes.textContent = `${minutes}`;
    clockSeconds.textContent = `${seconds}`;

}