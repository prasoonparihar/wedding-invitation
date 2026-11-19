/**
 * ==========================================================
 * ROYAL WEDDING AUDIO ENGINE (YouTube API + Web Audio API)
 * Ultra-Resilient Mobile Audio Architecture:
 *  - Primary: "Ullam Paadum - Wedding Song | 2 States" (trimmed from 00:15)
 *  - Immediate Web Audio chime & drone fallback (iOS Safari safe)
 *  - Procedural Indian Temple Bell (Mandir Ghanta)
 * ==========================================================
 */

class WeddingAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrack = 'ullam-paadum-yt';
    this.volume = 0.85;
    this.timerId = null;
    this.activeNodes = [];
    this.customAudioElement = null;
    this.isCustom = false;

    // YouTube API Player reference
    this.ytPlayer = null;
    this.ytReady = false;
    this.ytVideoId = 'e8dLwwJ1dsE';
    this.startTime = 15; // Trimmed from 00:15 onwards

    this.masterGain = null;
    this.initYouTubeAPI();
  }

  initYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this.setupYTPlayer();
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      this.setupYTPlayer();
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  setupYTPlayer() {
    const container = document.getElementById('yt-player-container');
    if (!container || !window.YT) return;

    try {
      this.ytPlayer = new window.YT.Player('yt-player-container', {
        height: '200',
        width: '200',
        videoId: this.ytVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: this.ytVideoId,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
          modestbranding: 1,
          start: this.startTime
        },
        events: {
          onReady: (event) => {
            this.ytReady = true;
            try {
              event.target.setVolume(Math.round(this.volume * 100));
              if (this.isPlaying) {
                this.stopSynthesizerTrack();
                event.target.seekTo(this.startTime, true);
                event.target.playVideo();
              }
            } catch (e) {}
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              this.isPlaying = true;
              this.onStateChange(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              this.isPlaying = false;
              this.onStateChange(false);
            }
          },
          onError: (e) => {
            if (this.isPlaying) {
              this.startSynthesizerTrack();
            }
          }
        }
      });
    } catch (err) {
      console.log('Procedural audio ready fallback:', err);
    }
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn('AudioContext init error handled:', e);
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    try {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
      }
      if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.setVolume === 'function') {
        this.ytPlayer.setVolume(Math.round(this.volume * 100));
      }
    } catch (e) {}
  }

  play() {
    this.init();
    this.isPlaying = true;

    // 1. Play Mandir Ghanta chime immediately on user gesture
    try {
      this.playIndianTempleGhanta();
    } catch (e) {}

    // 2. Play YouTube track
    let ytStarted = false;
    if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.playVideo === 'function') {
      try {
        if (typeof this.ytPlayer.seekTo === 'function') {
          this.ytPlayer.seekTo(this.startTime, true);
        }
        this.ytPlayer.playVideo();
        ytStarted = true;
      } catch (e) {
        console.log('YT play exception:', e);
      }
    }

    // 3. If YouTube was not ready or blocked by mobile autoplay policies, start auspicious shehnai raga
    if (!ytStarted) {
      this.startSynthesizerTrack();
    }

    this.onStateChange(true);
  }

  pause() {
    this.isPlaying = false;
    try {
      if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.pauseVideo === 'function') {
        this.ytPlayer.pauseVideo();
      }
    } catch (e) {}

    this.stopSynthesizerTrack();
    this.onStateChange(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  startSynthesizerTrack() {
    this.stopSynthesizerTrack();
    this.playShivMangalam();
  }

  stopSynthesizerTrack() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  onStateChange(isPlaying) {
    const disc = document.getElementById('audio-disc');
    const playIcon = document.getElementById('play-icon');
    if (disc) disc.classList.toggle('spinning', isPlaying);
    if (playIcon) {
      playIcon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
  }

  /**
   * Auspicious Raag Yaman Shehnai & Flute Mangalam
   */
  playShivMangalam() {
    if (!this.ctx) return;
    try {
      const baseFreq = 146.83; // D3 Sa
      this.startTanpuraDrone(baseFreq);

      const yamanScale = [146.83, 164.81, 185.00, 207.65, 220.00, 246.94, 277.18, 293.66];
      let noteIdx = 0;

      const playFlute = () => {
        if (!this.isPlaying) return;
        const freq = yamanScale[noteIdx % yamanScale.length] * 2;
        this.triggerFluteNote(freq, 2.8);
        noteIdx = (noteIdx + Math.floor(Math.random() * 3) + 1) % yamanScale.length;
      };

      playFlute();
      this.timerId = setInterval(playFlute, 2200);
    } catch (e) {}
  }

  startTanpuraDrone(freq) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(freq * 1.5, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc1.start();
      osc2.start();

      this.activeNodes.push(osc1, osc2, gainNode, filter);
    } catch (e) {}
  }

  triggerFluteNote(freq, duration) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  /**
   * Authentic Indian Temple Bell (Mandir Ghanta) Synthesizer (432 Hz Bronze)
   */
  playIndianTempleGhanta() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const fundamental = 432;

      const partials = [
        { ratio: 1.0,  gain: 0.55, decay: 4.8 },
        { ratio: 1.48, gain: 0.35, decay: 3.9 },
        { ratio: 2.01, gain: 0.28, decay: 3.2 },
        { ratio: 2.76, gain: 0.22, decay: 2.6 },
        { ratio: 3.82, gain: 0.16, decay: 2.0 }
      ];

      partials.forEach(p => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * p.ratio, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(p.gain * 0.45, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + p.decay + 0.1);
      });
    } catch (e) {}
  }

  playTempleBell() {
    this.playIndianTempleGhanta();
  }
}

window.weddingAudio = new WeddingAudioEngine();
