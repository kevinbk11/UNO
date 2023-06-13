class AudioPlayer{
    static player = new this()
    constructor(){
        this.audio = document.createElement('audio')
    }
    static playDrawCardEffect(){
        const audio = AudioPlayer.player.audio.cloneNode()
        audio.setAttribute('src',`../../../sounds/draw-card-${1+Math.floor(Math.random()*100)%2}.mp3`)
        audio.volume=localStorage.getItem('volume')/100
        console.log(audio.volume)
        audio.play()
    }
}