class AudioManager {
    constructor() {
        if (!AudioManager.instance) {
            AudioManager.instance = this
        }

        this.sfx = {}
        this.music = {}
        this.ambience = {}
        this.nowPlaying = null

        return AudioManager.instance
    }

    // MARK: loadSFX
    loadSFX(sfx) {
        if (!Array.isArray(sfx)) sfx = [sfx]
        sfx.forEach(effect => {
            this.sfx[effect] = effect
            this.sfx[effect] = new Howl({
                src: ['audio/sfx/' + effect + '.mp3'],
                html5: true
            })
        })
    }
    
    // MARK: loadMusic
    loadMusic(track) {
        this.music[track] = track
        this.music[track] = new Howl({
            src: ['audio/music/' + track + '.mp3'],
            html5: true,
            loop: true
        })
    }

    // MARK: loadAmbience
    loadAmbience(track) {
        this.ambience[track] = track
        this.ambience[track] = new Howl({
            src: ['audio/ambience/' + track + '.mp3'],
            html5: true,
            loop: true
        })
    }

    // MARK: playSFX
    async playSFX(sfx) {
        if (!this.sfx[sfx] && sfx !== null) {
            await this.loadSFX(sfx)
        }

        if (this.sfx[sfx]) {
            this.sfx[sfx].play()
        } else {
            console.log("ERROR! Couldn't find sfx/" + sfx + "!")
        }
    }

    // MARK: stopAmbience
    stopAmbience() {
        if (this.ambience.active && this.ambience[this.ambience.active]) {
            this.ambience[this.ambience.active].stop()
            this.ambience.active = null
        }
    }

    // MARK: playAmbience
    async playAmbience(track) {
        if (this.ambience.active === track) {
            return
        }

        if (!this.ambience[track] && track !== null) {
            await this.loadAmbience(track)
        }

        if (this.ambience[track]) {
            this.stopAmbience()
            this.ambience[track].play()
            this.ambience.active = track
        } else if (track !== null) {
            console.log("ERROR! Couldn't find ambience/" + track + "!")
        } else {
            this.stopAmbience()
        }
    }

    // MARK: stopMusic
    stopMusic() {
        console.log(this.music.active)
        if (this.music.active && this.music[this.music.active]) {
            let x = this.music.active
            this.music[x].fade(1, 0, 500)
            this.music[x].once('fade', () => {
                this.music[x].stop()
                this.music.active = null
                this.nowPlaying = null
            })
        }
    }

    // MARK: playMusic
    async playMusic(track) {
        // return
        
        // Don't switch track if it's already playing
        if (this.music.active === track) {
            return
        }

        if (!this.music[track] && track !== null) {
            await this.loadMusic(track)
        }

        if (track === null) {
            this.stopMusic()
            this.nowPlaying = null
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
                    this.nowPlaying = track
                })
            } else {
                // console.log("loading " + track)
                // Start new track
                this.music.active = track
                this.music[track].volume(1)
                this.music[track].play()
                this.nowPlaying = track
            }
        } else if (track !== null) {
            console.log("ERROR! Couldn't find music/" + track + "!")
        }
    }
}
