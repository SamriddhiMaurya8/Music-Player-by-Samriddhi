const myData = [
    {
        "title": "Death Bed",
        "artist": "Powfu",
        "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
        "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
        "id": "1"
    },
    {
        "title": "Bad Liar",
        "artist": "Imagine Dragons",
        "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
        "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
        "id": "2"
    },
    {
        "title": "Faded",
        "artist": "Alan Walker",
        "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
        "url": "https://samplesongs.netlify.app/Faded.mp3",
        "id": "3"
    },
    {
        "title": "Hate Me",
        "artist": "Ellie Goulding",
        "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
        "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
        "id": "4"
    },
    {
        "title": "Solo",
        "artist": "Clean Bandit",
        "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
        "url": "https://samplesongs.netlify.app/Solo.mp3",
        "id": "5"
    },
    {
        "title": "Without Me",
        "artist": "Halsey",
        "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
        "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
        "id": "6"
    }
];

function MusicPlayer(musicData) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    let trackIndex = 0;
    let isRepeating = false; 
    let isShuffling = false; 
    let playlist = [...musicData];

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const image = document.createElement('img');
    image.classList.add('img');
    imgContainer.appendChild(image);

    const ArtistTitle = document.createElement('div'); 
    ArtistTitle.classList.add('ArtistTitle');

    const title = document.createElement('h1');
    title.classList.add('title');

    const artist = document.createElement('p');
    artist.classList.add('artist');

    ArtistTitle.appendChild(title);
    ArtistTitle.appendChild(artist);

    const time = document.createElement('div');
    time.classList.add('time');

    const startTime = document.createElement('span');
    startTime.classList.add('startTime');
    startTime.textContent = '0:00';

    const endTime = document.createElement('span');
    endTime.classList.add('endTime');
    endTime.textContent = '0:00';

    time.appendChild(startTime);
    time.appendChild(endTime);

    const progressBar = document.createElement('input');
    progressBar.id = 'myProgressBar';
    progressBar.type = 'range';
    progressBar.name = 'range';
    progressBar.min = 0;
    progressBar.max = 100;
    progressBar.value = 0;

    const mainButton = document.createElement('div');
    mainButton.classList.add('mainButton');

    const shuffle = document.createElement('i');
    shuffle.classList.add('fa-solid', 'fa-shuffle', 'shuffle');
    shuffle.style.color = 'gray';

    const button = document.createElement('div');
    button.classList.add('playButton');

    const prevIcon = document.createElement('i');
    prevIcon.classList.add('fa-solid', 'fa-backward', 'prevIcon');
    prevIcon.style.color = 'gray';

    const playIcon = document.createElement('i');
    playIcon.classList.add('fa-solid', 'fa-circle-play', 'playIcon');
    playIcon.style.color = 'red';

    const nextIcon = document.createElement('i');
    nextIcon.classList.add('fa-solid', 'fa-forward', 'nextIcon');
    nextIcon.style.color = 'gray';

    const repeat = document.createElement('i');
    repeat.classList.add('fa-solid', 'fa-repeat', 'repeat');
    repeat.style.color = 'gray';

    button.appendChild(prevIcon);
    button.appendChild(playIcon);
    button.appendChild(nextIcon);

    mainButton.appendChild(shuffle);
    mainButton.appendChild(button);
    mainButton.appendChild(repeat);

    container.appendChild(imgContainer);
    container.appendChild(ArtistTitle);
    container.appendChild(time);
    container.appendChild(progressBar);
    container.appendChild(mainButton);

    let audio = new Audio(musicData[trackIndex].url);
    let isPlaying = false;

    function loadTrack(index) {
        trackIndex = index;
        audio.src = musicData[trackIndex].url;
        image.src = musicData[trackIndex].artwork;
        title.textContent = musicData[trackIndex].title;
        artist.textContent = `by ${musicData[trackIndex].artist}`;
        audio.currentTime = 0;
        progressBar.value = 0;

        audio.addEventListener('loadedmetadata', () => {
            endTime.textContent = formatTime(audio.duration);
        });

        audio.play();
        isPlaying = true;
        playIcon.classList.remove('fa-circle-play');
        playIcon.classList.add('fa-circle-pause');
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function getRandomIndex() {
        return Math.floor(Math.random() * playlist.length);
    }

    function shufflePlaylist() {
        for (let i = playlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
        }
    }

    playIcon.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.classList.remove('fa-circle-pause');
            playIcon.classList.add('fa-circle-play');
        } else {
            audio.play();
            playIcon.classList.remove('fa-circle-play');
            playIcon.classList.add('fa-circle-pause');
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('timeupdate', () => {
        const progress = parseInt((audio.currentTime / audio.duration) * 100);
        progressBar.value = progress;
        startTime.textContent = formatTime(audio.currentTime);
    });

    prevIcon.addEventListener('click', () => {
        if (isShuffling) {
            trackIndex = getRandomIndex();
        } else {
            trackIndex = (trackIndex > 0) ? trackIndex - 1 : musicData.length - 1;
        }
        loadTrack(trackIndex);
    });

    nextIcon.addEventListener('click', () => {
        if (isShuffling) {
            trackIndex = getRandomIndex();
        } else {
            trackIndex = (trackIndex < musicData.length - 1) ? trackIndex + 1 : 0;
        }
        loadTrack(trackIndex);
    });

    repeat.addEventListener('click', () => {
        isRepeating = !isRepeating;
        repeat.style.color = isRepeating ? 'red' : 'gray';
    });

    shuffle.addEventListener('click', () => {
        isShuffling = !isShuffling;
        shuffle.style.color = isShuffling ? 'red' : 'gray';
        if (isShuffling) {
            shufflePlaylist(); // Shuffle the playlist
            trackIndex = getRandomIndex(); // Start with a random track
            loadTrack(trackIndex);
        }
    });

    audio.addEventListener('ended', () => {
        if (isRepeating) {
            audio.currentTime = 0;
            audio.play();
        } else {
            if (isShuffling) {
                trackIndex = getRandomIndex();
            } else {
                trackIndex = (trackIndex < musicData.length - 1) ? trackIndex + 1 : 0;
            }
            loadTrack(trackIndex);
        }
    });

    loadTrack(trackIndex); 
}

document.addEventListener('DOMContentLoaded', () => {
    MusicPlayer(myData);
});
