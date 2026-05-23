let play = document.querySelector(".play");
let img = document.querySelector(".play img");
let back = document.querySelector(".back");
let farward = document.querySelector(".farward");
let sname = document.querySelector(".name");
let bar = document.getElementById("bar");
let volume = document.getElementById("volume");
let image = document.querySelector(".right .image img");
let left = document.querySelector(".left");
let volumeContainer = document.querySelector(".volume-container");
let volumeIcon = document.querySelector(".volume-icon img");
let index = 0;
let current = document.querySelector(".current")
let final = document.querySelector(".final")
let time = document.querySelector(".time")

let sources = [
    "assets/icons8-pause-50.png",
    "assets/icons8-play-50.png",
    "assets/icons8-volume-50.png",
    "assets/icons8-mute-50.png"

]


// songs list
let songs = [
    {
        name: "song1",
        path: "songs/song1.mpeg",
        cover: "assets/download (1).jpg",
        id: 0
    },
    {
        name: "song2",
        path: "songs/song2.mpeg",
        cover: "assets/download (2).jpg",
        id: 1


    },
    {
        name: "song3",
        path: "songs/song3.mpeg",
        cover: "assets/download.jpg",
        id: 2


    },
    {
        name: "song4",
        path: "songs/song4.mpeg",
        cover: "assets/images.jpg",
        id: 3

    }
]

//    constructor
let playing = new Audio("songs/song1.mpeg");
playing.volume = volume.value;



//    play-pause icon handling
play.addEventListener("click", () => {
    if (img.src.includes(sources[1])) {
        img.src = sources[0];
        playing.play();
    }
    else {
        img.src = sources[1];
        playing.pause();
    }

})

//   back control
back.addEventListener("click", () => {
    if (index > 0) {
        playing.src = songs[index - 1].path;
        sname.innerHTML = songs[index - 1].name;
        image.src = songs[index - 1].cover;

        index--;
    }

    else if (index <= 0) {
        index = songs.length - 1;
        playing.src = songs[index].path;
        sname.innerHTML = songs[index].name;
        image.src = songs[index].cover;
    }
    playing.play();

})

//   farward control
farward.addEventListener("click", () => {
    if (index + 1 < songs.length) {
        playing.src = songs[index + 1].path;
        sname.innerHTML = songs[index + 1].name;
        image.src = songs[index + 1].cover;
        index++;
    }

    else if (index + 1 >= songs.length) {
        playing.src = songs[0].path;
        sname.innerHTML = songs[0].name;
        image.src = songs[0].cover;
        index = 0;
    }

    playing.play();
})


// time controller
playing.addEventListener("timeupdate", () => {
    bar.value = parseInt((playing.currentTime / playing.duration) * 100);
    let i = Math.round(playing.duration%60);
    let j = Math.round(playing.duration/60);
    let k = Math.round(playing.currentTime%60);
    let l = Math.round(playing.currentTime/60);
    time.innerHTML = `<span class="current">${l < 10 ? '0' + l : l}:${k < 10 ? '0' + k : k}</span>
                      <span class="final">${j < 10 ? '0' + j : j}:${i < 10 ? '0' + i : i}</span>`

})



//    position update
bar.addEventListener("change", () => {
    playing.currentTime = parseInt((bar.value * playing.duration) / 100);
})


//  volume controller
let array = []
volume.addEventListener("change", (event) => {
    event.value = parseInt(event.value / event.max);
    let currentvalue = event.target.value;
    array.push(currentvalue);
    playing.volume = currentvalue;
    if (volumeIcon.src.includes(sources[3]) && (playing.volume !== 0)) {
        volumeIcon.src = sources[2];
        volume.value = array[array.length - 1];
        playing.volume = volume.value;
    }
    else if (volumeIcon.src.includes(sources[2]) && (playing.volume === 0)) {
        volumeIcon.src = sources[3];
        volume.value = 0;
        playing.volume = volume.value;
    }
})

// volume-mute icon controll

volumeIcon.addEventListener("click", () => {
    if (volumeIcon.src.includes(sources[2])) {
        volumeIcon.src = sources[3];
        volume.value = 0;
        playing.volume = 0;
    }
    else {
        volumeIcon.src = sources[2];
        volume.value = array[array.length - 1];
        playing.volume = volume.value;
    }
})

// generating HTML through JS 
let html = '';
let i = 0;
songs.forEach(s => {
    html += `
    <div class="details" id=${i}>
    <img src="${s.cover}">
    <p>${s.name}</p>    
    </div>
    `
    i++;
})
left.innerHTML = html;

let songlist = document.querySelectorAll(".details");

songlist.forEach((song) => {
    song.addEventListener("click", (e) => {
        let id = Number(e.currentTarget.id);
        songs.forEach((element) => {
            if (element.id === id) {
                playing.src = element.path;
                image.src = element.cover;
                sname.innerHTML = element.name;
                playing.play();
                img.src = sources[0];
            }
        })
    })
})
