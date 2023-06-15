class AudioPlayer{
    static player = new this()
    constructor(){
        this.audio = document.createElement('audio')
    }
    static playDrawCardEffect(){
        const audio = AudioPlayer.player.audio.cloneNode()
        audio.setAttribute('src',`../../../sounds/draw-card-${1+Math.floor(Math.random()*100)%2}.mp3`)
        audio.volume=localStorage.getItem('volume')/100
        audio.play()
    }
    static playBackgroundMusic(){
        const audio = AudioPlayer.player.audio.cloneNode()
        audio.setAttribute('src',`../../../sounds/background-music.mp3`)
        audio.volume=(localStorage.getItem('volume')/100)*0.75
        audio.loop=true;
        audio.play()
    }
    static playThrowCardEffect(){
        console.log("throw")
        const audio = AudioPlayer.player.audio.cloneNode()
        audio.setAttribute('src',`../../../sounds/throw-card.mp3`)
        audio.volume=(localStorage.getItem('volume')/100)*1.5
        audio.play()
    }
}