import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleForm);


function createPromise (delay, checkRadio) {
    const data = {delay, checkRadio};
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            if (checkRadio === "fulfilled") {
                resolve(data);
            }
            else {
                reject(data);
            }
        }, delay);
    });
}


function handleForm (event) {
    event.preventDefault();

    const form = event.target;
    const delay = +form.elements.delay.value;
    const checkRadio = form.elements.state.value;
    
    createPromise(delay, checkRadio)
    .then ( ({delay})  => iziToast.show({
        title: '✅ Fulfilled',
        message: `promise in ${delay}ms`,
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        progressBarColor: '#b5ea7c'
      }))
    .catch ( ({delay})  => iziToast.show({
        title: '❌ Rejected',
        message: `promise in ${delay}ms`,
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        progressBarColor: '#ffbebe'

  }))
}