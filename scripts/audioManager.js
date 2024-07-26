class AudioManager {
    constructor() {
        if (!AudioManager.instance) {
            AudioManager.instance = this
        }

        this.sfx = {}
        this.music = {}

        return AudioManager.instance
    }

    loadTracks(sfx) {
        sfx.forEach(effect => {
            this.sfx[effect] = effect
            this.sfx[effect] = new Howl({
                src: ['../audio/sfx/' + effect + '.mp3'],
                html5: true
            })
        })
    }
    loadMusic(track) {
        this.music[track] = track
        this.music[track] = new Howl({
            src: ['../audio/music/' + track + '.mp3'],
            html5: true,
            loop: true
        })
    }

    playSFX(sfx) {
        if (this.sfx[sfx]) {
            this.sfx[sfx].play()
        } else {
            console.log("ERROR! Couldn't find " + sfx + "!")
        }
    }
    stopMusic() {
        if (this.music.active && this.music[this.music.active]) {
            let x = this.music.active
            this.music[x].fade(1, 0, 500)
            this.music[x].once('fade', () => {
                this.music[x].stop()
                this.music.active = null
                console.log('music ended')
            })
        }
    }

    async playMusic(track) {
        // Don't switch track if it's already playing
        if (this.music.active === track) {
            return
        }

        if (!this.music[track] && track !== null) {
            await this.loadMusic(track)
        }

        if (track === null) {
            this.stopMusic()
        } if (this.music[track]) {
            // End currently playing track
            if (this.music.active) {
                this.music[this.music.active].fade(1, 0, 500)
                let x = this.music.active
                this.music[x].once('fade', () => {
                    this.music[x].stop()
                    // Start new track
                    this.music.active = track
                    console.log(this.music[track].volume(1))
                    this.music[track].play()
                })
            } else {
                // console.log("loading " + track)
                // Start new track
                this.music.active = track
                this.music[track].volume(1)
                this.music[track].play()
            }
        } else if (track !== null) {
            console.log("ERROR! Couldn't find " + track + "!")
        }
    }
}