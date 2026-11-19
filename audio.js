/**
 * ==========================================================
 * ROYAL WEDDING AUDIO ENGINE (YouTube API + Web Audio API)
 * Seamlessly integrates:
 *  1. Primary Soundtrack: "Ullam Paadum - Wedding Song | 2 States"
 *     YouTube Video ID: e8dLwwJ1dsE (Trimmed from 00:15 onwards)
 *  2. Procedural Fallback & Auspicious Tracks:
 *     - Shiv-Shakti & Royal Shehnai Mangalam
 *     - Royal Rajputana Sitar & Flute
 *     - Celestial Wedding Symphony & Harp
 *  3. Authentic Temple Bell (Mandir Ghanta) Physical Acoustic Synthesizer
 *  4. Custom Song Upload (MP3 / WAV / M4A)
 * ==========================================================
 */

class WeddingAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrack = 'ullam-paadum-yt'; // Default: Ullam Paadum (2 States)
    this.volume = 0.85;
    this.timerId = null;
    this.activeNodes = [];
    this.customAudioElement = null;
    this.isCustom = false;

    // YouTube API Player reference (Ullam Paadum - Wedding Song | 2 States)
    this.ytPlayer = null;
    this.ytReady = false;
    this.ytVideoId = 'e8dLwwJ1dsE';
    this.startTime = 15; // User requested: trimmed from 00:15 onwards

    // Master Gain for Web Audio
    this.masterGain = null;

    // Initialize YouTube API loader
    this.initYouTubeAPI();
  }

  initYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this.setupYTPlayer();
      return;
    }

    // Set global callback
    window.onYouTubeIframeAPIReady = () => {
      this.setupYTPlayer();
    };

    // Load iframe API script
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
            event.target.setVolume(Math.round(this.volume * 100));
            // If play was initiated before YouTube ready, play now at 15s
            if (this.isPlaying && (this.currentTrack === 'ullam-paadum-yt' || this.currentTrack === 'tere-bina-yt')) {
              try {
                event.target.seekTo(this.startTime, true);
                event.target.playVideo();
              } catch (e) {}
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              this.isPlaying = true;
              this.onStateChange(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              if (this.currentTrack === 'ullam-paadum-yt' || this.currentTrack === 'tere-bina-yt') {
                this.isPlaying = false;
                this.onStateChange(false);
              }
            }
          },
          onError: (e) => {
            console.log('YouTube notice: Falling back to auspicious procedural raga', e);
            if (this.isPlaying && (this.currentTrack === 'ullam-paadum-yt' || this.currentTrack === 'tere-bina-yt')) {
              this.startSynthesizerTrack();
            }
          }
        }
      });
    } catch (err) {
      console.log('Error creating YT player, procedural audio ready:', err);
    }
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.customAudioElement) {
      this.customAudioElement.volume = this.volume;
    }
    if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.setVolume === 'function') {
      this.ytPlayer.setVolume(Math.round(this.volume * 100));
    }
  }

  play() {
    this.init();
    this.isPlaying = true;

    if (this.currentTrack === 'ullam-paadum-yt' || this.currentTrack === 'tere-bina-yt') {
      // Primary: Play YouTube track "Ullam Paadum - Wedding Song | 2 States" from 15s
      if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.playVideo === 'function') {
        try {
          const current = this.ytPlayer.getCurrentTime ? this.ytPlayer.getCurrentTime() : 0;
          if (current < 1) {
            this.ytPlayer.seekTo(this.startTime, true);
          }
          this.ytPlayer.playVideo();
        } catch (e) {
          this.startSynthesizerTrack();
        }
      } else {
        // Fallback until YT loads
        this.startSynthesizerTrack();
      }
    } else if (this.isCustom && this.customAudioElement) {
      this.customAudioElement.play().catch(e => console.log('Audio playback notice:', e));
    } else {
      this.startSynthesizerTrack();
    }

    this.onStateChange(true);
  }

  pause() {
    this.isPlaying = false;

    if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.pauseVideo === 'function') {
      try {
        this.ytPlayer.pauseVideo();
      } catch (e) {}
    }

    if (this.isCustom && this.customAudioElement) {
      this.customAudioElement.pause();
    }

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

  setTrack(trackKey) {
    const wasPlaying = this.isPlaying;
    this.pause();

    this.isCustom = false;
    this.currentTrack = trackKey;

    if (trackKey !== 'ullam-paadum-yt' && trackKey !== 'tere-bina-yt') {
      if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.stopVideo === 'function') {
        try { this.ytPlayer.stopVideo(); } catch (e) {}
      }
    }

    if (wasPlaying) {
      this.play();
    }
  }

  loadCustomFile(file) {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    if (!this.customAudioElement) {
      this.customAudioElement = new Audio();
      this.customAudioElement.loop = true;
    }
    this.customAudioElement.src = objectUrl;
    this.customAudioElement.volume = this.volume;
    this.isCustom = true;
    this.currentTrack = 'custom';
    this.play();
  }

  startSynthesizerTrack() {
    this.stopSynthesizerTrack();

    if (this.currentTrack === 'shiv-mangalam' || this.currentTrack === 'ullam-paadum-yt' || this.currentTrack === 'tere-bina-yt') {
      this.playShivMangalam();
    } else if (this.currentTrack === 'rajputana-sitar') {
      this.playRajputanaSitar();
    } else if (this.currentTrack === 'celestial-harp') {
      this.playCelestialSymphony();
    }
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
    const equalizer = document.getElementById('equalizer');

    if (disc) disc.classList.toggle('spinning', isPlaying);
    if (equalizer) equalizer.classList.toggle('active', isPlaying);
    if (playIcon) {
      playIcon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
  }

  /**
   * Sound 1: Shiv-Shakti Mangalam (Auspicious Raag Yaman)
   */
  playShivMangalam() {
    if (!this.ctx) return;
    const baseFreq = 146.83; // D3 (Auspicious Sa)
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
  }

  /**
   * Sound 2: Rajputana Sitar & Darbari
   */
  playRajputanaSitar() {
    if (!this.ctx) return;
    const darbariScale = [130.81, 146.83, 155.56, 174.61, 196.00, 207.65, 233.08, 261.63];
    this.startTanpuraDrone(130.81);

    let step = 0;
    const playPluck = () => {
      if (!this.isPlaying) return;
      const freq = darbariScale[step % darbariScale.length] * 2;
      this.triggerSitarPluck(freq);
      step = (step + 1) % darbariScale.length;
    };

    playPluck();
    this.timerId = setInterval(playPluck, 1400);
  }

  /**
   * Sound 3: Celestial Symphony & Harp
   */
  playCelestialSymphony() {
    if (!this.ctx) return;
    const arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    let idx = 0;

    const playArp = () => {
      if (!this.isPlaying) return;
      const freq = arpeggio[idx % arpeggio.length];
      this.triggerHarpNote(freq);
      idx++;
    };

    playArp();
    this.timerId = setInterval(playArp, 450);
  }

  /**
   * Tanpura Drone Generator
   */
  startTanpuraDrone(freq) {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq * 1.5, this.ctx.currentTime); // Pa (Fifth)

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
  }

  /**
   * Bansuri / Flute Note
   */
  triggerFluteNote(freq, duration) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const vib = this.ctx.createOscillator();
    const vibGain = this.ctx.createGain();
    vib.frequency.setValueAtTime(5.2, this.ctx.currentTime); // 5.2Hz Indian Flute vibrato
    vibGain.gain.setValueAtTime(4.5, this.ctx.currentTime);
    vib.connect(osc.frequency);
    vib.start();

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
    vib.stop(now + duration);
  }

  /**
   * Sitar Pluck with Resonant Jawari
   */
  triggerSitarPluck(freq) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.6);
  }

  /**
   * Harp Pluck
   */
  triggerHarpNote(freq) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.1);
  }

  /**
   * Authentic Indian Temple Bell (Mandir Ghanta) Synthesizer
   */
  playIndianTempleGhanta() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const fundamental = 432; // Auspicious 432 Hz bronze bell resonance

    const partials = [
      { ratio: 1.0,  gain: 0.55, decay: 4.8 },
      { ratio: 1.48, gain: 0.35, decay: 3.9 },
      { ratio: 2.01, gain: 0.28, decay: 3.2 },
      { ratio: 2.76, gain: 0.22, decay: 2.6 },
      { ratio: 3.82, gain: 0.16, decay: 2.0 },
      { ratio: 5.12, gain: 0.10, decay: 1.4 },
      { ratio: 6.84, gain: 0.06, decay: 1.0 },
      { ratio: 8.92, gain: 0.04, decay: 0.7 }
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
  }

  playTempleBell() {
    this.playIndianTempleGhanta();
  }
}

// Global Audio Engine Instance
window.weddingAudio = new WeddingAudioEngine();
