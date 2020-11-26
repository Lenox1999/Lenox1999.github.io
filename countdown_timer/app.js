const main_Container = document.querySelector(".main");

const countdown_Input = document.querySelector(".main .time_input");
const button = document.querySelector(".start_button");
const minutes = document.querySelectorAll("h2")[0];
const seconds = document.querySelectorAll("h2")[1];

let playing = false;

// setup alarm tone

const audio = new Audio("./assets/alarm_sound.mp3");

// setup alarm tone

let time = undefined;

console.log(main_Container);

const countdown = (min, secs) => {
  time = min * 60 + secs;

  let showMins = min;
  let showSecs = secs;
  setInterval(() => {
    time -= 1;
    showSecs -= 1;

    if (showSecs == 0 && showMins >= 1) {
      showSecs = 59;
      showMins -= 1;
    }

    if (!time <= 0) {
      minutes.innerHTML = `${showMins} min`;
      seconds.innerHTML = `${showSecs} s`;
    } else {
      const finsihLabel = document.createElement("h2");
      finsihLabel.innerHTML = "Countdown has finished";
      // hide minutes and secs
      minutes.style.display = "none";
      seconds.style.display = "none";
      // show that countdown has finished
      main_Container.append(finsihLabel);
      audio.volume = 0.2;
      audio.play();
      playing = true;
      button.innerHTML = "Snooze";
      return;
    }
  }, 1000);
};

console.log(countdown_Input);
button.addEventListener("click", () => {
  if (playing) {
    audio.pause();
    playing = false;
    countdown_Input.value = "";
    location.reload();
  }

  const input = countdown_Input.value;
  console.log(input);
  if (!input || input.trim() == "") {
    console.error("no countdown time given");
  }
  countdown(parseInt(input.split(":")[0]), parseInt(input.split(":")[1]));
});
