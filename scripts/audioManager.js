class AudioManager {
    constructor() {
        if (!AudioManager.instance) {
            AudioManager.instance = this
        }

        this.tracks = {}

        return AudioManager.instance
    }

    loadTracks(tracks) {
        tracks.forEach(track => {
            this[track] = track
            this[track] = new Howl({
                src: ['../audio/' + track + '.mp3'],
                html5: true
            })
        })
    }
}