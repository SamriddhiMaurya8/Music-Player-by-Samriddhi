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




function MusicPlayer(musicData){
    


    const container = document.getElementById('container');

    container.innerHTML = '';

    const track = musicData[0];

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const image = document.createElement('img');
    image.classList.add('img');
    image.src = track.artwork;
    image.alt = track.title;

    imgContainer.appendChild(image);

    container.appendChild(imgContainer);



    const ArtistTitle = document.createElement('div') ; 
    ArtistTitle.classList.add('ArtistTitle') ; 


    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = track.title;



    const artist = document.createElement('h3');
    artist.classList.add('artist') ; 
    artist.textContent= `by ${track.artist}` ; 


    const progressBar = document.createElement('input');
    progressBar.id = 'myProgressBar';
    progressBar.type ='range' ; 
    progressBar.name='range' ; 
    progressBar.min=0 ; 
    progressBar.max=100 ; 
    progressBar.value=0 ; 

    
    
    ArtistTitle.appendChild(title);
    ArtistTitle.appendChild(artist) ; 


const mainButton = document.createElement('button');
mainButton.classList.add('mainButton') ; 



const button = document.createElement('button');
button.classList.add('playButton') ; 


    const playIcon = document.createElement('i');
    playIcon.classList.add('fa-solid', 'fa-circle-play' , 'playIcon');
    playIcon.style.color = '#ea1026'; 



    // <i class="fa-solid fa-backward"></i>
    const prevIcon = document.createElement('i') ; 
    prevIcon.classList.add('fa-solid' , 'fa-backward' , 'prevIcon') ; 
    prevIcon.style.color='gray'; 

    const nextIcon = document.createElement('i') ; 
    nextIcon.classList.add('fa-solid' , 'fa-forward' , 'nextIcon') ; 
    nextIcon.style.color='gray'; 

    const shuffle = document.createElement('i') ; 
    shuffle.classList.add('fa-solid' , 'fa-shuffle' , 'shuffle') ; 
    shuffle.style.color='gray'; 

    const repeat = document.createElement('i') ; 
    repeat.classList.add('fa-solid' , 'fa-repeat' , 'repeat') ; 
    repeat.style.color='gray'; 

   
    button.appendChild(prevIcon) ; 
    button.appendChild(playIcon) ; 
    button.appendChild(nextIcon);
    

    mainButton.appendChild(shuffle) ; 
    mainButton.appendChild(button) ; 
    mainButton.appendChild(repeat);

    
    container.appendChild(ArtistTitle);
    
    container.appendChild(progressBar) ; 
    container.appendChild(mainButton);

    const audio = new Audio(track.url);
    let isPlaying = false;

    
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


}

document.addEventListener('DOMContentLoaded', () => {
    MusicPlayer(myData);
});


