const audioPlayer = {
  // Properties
  currentTime: 0,
  // Methods
  playTrack: function(audioElement, progressElement) {
    console.log(audioElement);
    audioElement.currentTime = this.currentTime;
    progressElement.max = audioElement.duration;
    audioElement.play();
    audioElement.addEventListener('timeupdate', () => {
      this.startProgress(audioElement, progressElement);
    });
  },
  pauseTrack: function(audioElement) {
    audioElement.pause();
    this.currentTime = audioElement.currentTime;
  },
  scrubTrack: function(audioElement, progressElement, scrubTo) {
    audioElement.currentTime = scrubTo;
    progressElement.value = scrubTo;
    audioElement.play();
  },
  startProgress: function(audioElement, progressElement) {
    progressElement.value = audioElement.currentTime;
  },
};

module.exports = audioPlayer;
