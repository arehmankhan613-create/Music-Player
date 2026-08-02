// =========================
// Music Player Pro
// JavaScript
// =========================


const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");

const songList = document.getElementById("songList");


// Songs Data

const songs = [

{
name:"Song 1",
artist:"Artist 1",
src:"songs/song1.mp3",
image:"cover.jpg"
},

{
name:"Song 2",
artist:"Artist 2",
src:"songs/song2.mp3",
image:"cover.jpg"
},

{
name:"Song 3",
artist:"Artist 3",
src:"songs/song3.mp3",
image:"cover.jpg"
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



// Play Song

function playSong(){

audio.play();

playBtn.innerText="⏸";

}


// Pause Song

function pauseSong(){

audio.pause();

playBtn.innerText="▶️";

}



// Play Button

playBtn.onclick=()=>{


if(audio.paused){

playSong();

}else{

pauseSong();

}


};



// Next Song

nextBtn.onclick=()=>{


currentSong++;


if(currentSong >= songs.length){

currentSong=0;

}


loadSong();

playSong();


};



// Previous Song

prevBtn.onclick=()=>{


currentSong--;


if(currentSong < 0){

currentSong=songs.length-1;

}


loadSong();

playSong();


};



// Progress Bar

audio.addEventListener("timeupdate",()=>{


progress.value =
(audio.currentTime / audio.duration) * 100 || 0;


});



progress.oninput=()=>{


audio.currentTime =
(progress.value / 100) * audio.duration;


};



// Playlist

songs.forEach((song,index)=>{


let li=document.createElement("li");


li.innerText =
song.name;


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