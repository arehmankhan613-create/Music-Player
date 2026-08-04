const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const songList = document.getElementById("songList");

// ===== Songs =====

const songs = [
{
    name: "24 Songs",
    artist: "Unknown Artist",
    src: "24_Songs(48k).m4a",
    image: "images.jpeg"
}
];

let currentSong = 0;
let shuffle = false;
let repeat = false;

// ===== Load Song =====

function loadSong(){

    const song = songs[currentSong];

    title.textContent = song.name;
    artist.textContent = song.artist;
    cover.src = song.image;

    audio.src = song.src;
    audio.load();

}

loadSong();

// ===== Play =====

function playSong(){

    audio.play();

    playBtn.textContent = "⏸";

    cover.classList.add("playing");

}

// ===== Pause =====

function pauseSong(){

    audio.pause();

    playBtn.textContent = "▶️";

    cover.classList.remove("playing");

}

// ===== Play Button =====

playBtn.addEventListener("click",()=>{

    if(audio.paused){

        playSong();

    }else{

        pauseSong();

    }

});// ===== Next =====

nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong();
    playSong();

});

// ===== Previous =====

prevBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong();
    playSong();

});

// ===== Progress =====

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);

});

// ===== Seek =====

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime = (progress.value / 100) * audio.duration;

    }

});

// ===== Volume =====

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

// ===== Playlist =====

songList.innerHTML = "";

songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.textContent = song.name;

    li.addEventListener("click", () => {

        currentSong = index;

        loadSong();

        playSong();

    });

    songList.appendChild(li);

});

// ===== Shuffle =====

shuffleBtn.addEventListener("click", () => {

    shuffle = !shuffle;

});

// ===== Repeat =====

repeatBtn.addEventListener("click", () => {

    repeat = !repeat;

    audio.loop = repeat;

});

// ===== Auto Next =====

audio.addEventListener("ended", () => {

    if (repeat) return;

    if (shuffle) {

        currentSong = Math.floor(Math.random() * songs.length);

    } else {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

    }

    loadSong();
    playSong();

});

// ===== Time Format =====

function formatTime(time) {

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

}

// ===== Default Volume =====

audio.volume = 1;
volume.value = 1;

