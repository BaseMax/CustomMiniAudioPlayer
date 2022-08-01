// Elements
const elm_play = document.querySelector(".player__play");
const elm_current = document.querySelector(".player__current");
const elm_progress = document.querySelector(".player__progress");
const elm_player_audio = document.querySelector(".player__audio");

// Function
const timeFormat = (ct) => {
    minutes = Math.floor(ct / 60);
    seconds = Math.floor(ct % 60);

    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
};

// Events
elm_play.addEventListener("click", () => {
    if (elm_player_audio.paused) {
        elm_player_audio.play();
        elm_progress.classList.remove("stopped");
    }
    else {
        elm_player_audio.pause();
        elm_progress.classList.add("stopped");
    }
});

elm_player_audio.onplay = () => {
    elm_play.classList.add("fa-pause");
    elm_play.classList.remove("fa-play");
};

elm_player_audio.onpause = () => {
    elm_play.classList.add("fa-play");
    elm_play.classList.remove("fa-pause");
};

elm_player_audio.ontimeupdate = () => {
    const current_time = elm_player_audio.currentTime;
    const progress = Math.floor((current_time * 100) / elm_player_audio.duration);

    elm_current.innerHTML = timeFormat(current_time);
    elm_progress.style.setProperty("--progress", progress + "%");
};

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 32) elm_play.click();
    // handle right arrow for going to next 5s
    else if (e.keyCode === 39) elm_player_audio.currentTime += 5;
    // handle left arrow for going back to prev 5s
    else if (e.keyCode === 37) elm_player_audio.currentTime -= 5;
});
