// =========================
// Music Player Pro
// Complete script.js
// =========================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const songList = document.getElementById("songList");


// Songs

const songs = [
{
  name: "24 Songs",
  artist: "Unknown Artist",
  src: "24_Songs(48k).m4a",
  image: "images.jpeg"
}
];


let currentSong = 0;


// Load Song

function loadSong(){

let song = songs[currentSong];

title.innerText = song.name;
artist.innerText = song.artist;

cover.src = song.image;

audio.src = song.src;

}


// Play

function playSong(){

audio.play()
.then(()=>{

playBtn.innerText="⏸";
cover.classList.add("playing");

})
.catch(()=>{

alert("Song load nahi ho raha. songs folder check karo.");

});

}


// Pause

function pauseSong(){

audio.pause();

playBtn.innerText="▶️";

cover.classList.remove("playing");

}


// Play Pause

playBtn.onclick=()=>{

if(audio.paused){

playSong();

}else{

pauseSong();

}

};



// Next

nextBtn.onclick=()=>{

currentSong++;

if(currentSong >= songs.length){

currentSong=0;

}

loadSong();

playSong();

};



// Previous

prevBtn.onclick=()=>{

currentSong--;

if(currentSong < 0){

currentSong=songs.length-1;

}

loadSong();

playSong();

};



// Progress

audio.addEventListener("timeupdate",()=>{

if(audio.duration){

progress.value =
(audio.currentTime/audio.duration)*100;

}

});



progress.oninput=()=>{

audio.currentTime =
(progress.value/100)*audio.duration;

};



// Volume

volume.oninput=()=>{

audio.volume=volume.value;

};



// Playlist

songs.forEach((song,index)=>{

let li=document.createElement("li");

li.innerText=song.name;


li.onclick=()=>{

currentSong=index;

loadSong();

playSong();

};


songList.appendChild(li);

});



// Auto Next

audio.onended=()=>{

nextBtn.click();

};



// Start

loadSong();