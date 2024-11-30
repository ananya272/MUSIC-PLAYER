let playBtn = document.querySelector('#play-btn');
let prevBtn = document.querySelector('#prev-btn');
let nextBtn = document.querySelector('#next-btn');
let progress = document.querySelector('#progress');
let songList = document.querySelector('#song-list');

let songs = [
    { name: "Song 1", id: 1 },
    { name: "Song 2", id: 2 },
    { name: "Song 3", id: 3 },
    { name: "Song 4", id: 4 }
];

// Show all the songs in the ul
for (let song of songs) {
    let li = document.createElement('li');
    li.innerText = song.name;
    li.setAttribute('id', song.id);
    li.classList.add('song-item');
    songList.append(li);
}

let audio = new Audio();
let currentSongIndex = 0;

function playSong() {
    audio.src = `./media/song${songs[currentSongIndex].id}.mp3`;
    audio.play();
    playBtn.children[0].classList.replace('fa-play', 'fa-pause');
}

function pauseSong() {
    audio.pause();
    playBtn.children[0].classList.replace('fa-pause', 'fa-play');
}

playBtn.addEventListener('click', function () {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// Update progress bar
audio.addEventListener('timeupdate', function () {
    let currentProgress = (audio.currentTime * 100) / audio.duration;
    progress.value = currentProgress;
});

// Change song progress
progress.addEventListener('input', function () {
    audio.currentTime = (audio.duration * progress.value) / 100;
});

// Select song from list
songList.addEventListener('click', function (e) {
    let songId = e.target.getAttribute('id');
    currentSongIndex = songs.findIndex(song => song.id == songId);
    playSong();
});

// Play previous song
prevBtn.addEventListener('click', function () {
    currentSongIndex = (currentSongIndex - 1 + songs.length) >= 0 ? currentSongIndex - 1 : songs.length - 1;
    playSong();
});

// Play next song
nextBtn.addEventListener('click', function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong();
});
