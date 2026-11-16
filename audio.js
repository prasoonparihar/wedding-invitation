/**
 * ==========================================================
 * ROYAL WEDDING AUDIO ENGINE (YouTube API + Web Audio API)
 * Seamlessly integrates:
 *  1. Primary Soundtrack: "Tere Bina" (Guru / A.R. Rahman)
 *     YouTube Video ID: e8dLwwJ1dsE
 *  2. Procedural Fallback & Auspicious Tracks:
 *     - Shiv-Shakti & Royal Shehnai Mangalam
 *     - Royal Rajputana Sitar & Flute
 *     - Celestial Wedding Symphony & Harp
 *  3. Custom Song Upload (MP3 / WAV / M4A)
 * ==========================================================
 */

class WeddingAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrack = 'ullam-paadum-yt'; // Default: Ullam Paadum - Wedding Song | 2 States
    this.volume = 0.85;
    this.timerId = null;
    this.activeNodes = [];
    this.customAudioElement = null;
    this.isCustom = false;

    // YouTube API Player reference (Ullam Paadum - Wedding Song | 2 States)
    this.ytPlayer = null;
    this.ytReady = false;
    this.ytVideoId = 'e8dLwwJ1dsE';

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
          modestbranding: 1
        },
        events: {
          onReady: (event) => {
            this.ytReady = true;
            event.target.setVolume(Math.round(this.volume * 100));
            // If play was called before ready, start now
            if (this.isPlaying && this.currentTrack === 'tere-bina-yt') {
              try { event.target.playVideo(); } catch (e) {}
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              this.isPlaying = true;
              this.onStateChange(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              if (this.currentTrack === 'tere-bina-yt') {
                this.isPlaying = false;
                this.onStateChange(false);
              }
            }
          },
          onError: (e) => {
            console.log('YouTube notice: Falling back to auspicious procedural raga', e);
            // Fallback gracefully to Web Audio so guest never suffers silence
            if (this.isPlaying && this.currentTrack === 'tere-bina-yt') {
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
      // 1. Primary: Play requested YouTube track "Ullam Paadum - Wedding Song | 2 States"
      if (this.ytPlayer && this.ytReady && typeof this.ytPlayer.playVideo === 'function') {
        try {
          this.ytPlayer.playVideo();
        } catch (e) {
          this.startSynthesizerTrack();
        }
      } else {
        // If YT is still buffering or offline, start procedural auspicious mangalam immediately
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

    if (trackKey !== 'tere-bina-yt') {
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

    if (this.currentTrack === 'shiv-mangalam' || this.currentTrack === 'tere-bina-yt') {
      this.playRoyalRaga();
    } else if (this.currentTrack === 'rajputana-sitar') {
      this.playRajputanaSitar();
    } else if (this.currentTrack === 'celestial-harp') {
      this.playCelestialHarp();
    } else {
      this.playRoyalRaga();
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
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  // --- PROCEDURAL TRACK 1: Royal Raga (Shehnai, Sitar & Flute in Raag Yaman) ---
  playRoyalRaga() {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    // Tanpura Drone (Sa & Pa continuous warm harmonic drone)
    const droneFreqs = [146.83, 220.00, 293.66]; // D3, A3, D4
    droneFreqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.04, now);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.activeNodes.push(osc, gain, filter);
    });

    const ragaScale = [
      293.66, // D4 (Sa)
      329.63, // E4 (Re)
      369.99, // F#4 (Ga)
      440.00, // A4 (Pa)
      493.88, // B4 (Dha)
      587.33, // D5 (High Sa)
      659.25, // E5 (High Re)
      739.99  // F#5 (High Ga)
    ];

    const melodyPattern = [
      { note: 0, dur: 1.2 },
      { note: 1, dur: 0.8 },
      { note: 2, dur: 1.6 },
      { note: 3, dur: 1.0 },
      { note: 4, dur: 1.4 },
      { note: 5, dur: 2.0 },
      { note: 4, dur: 1.0 },
      { note: 3, dur: 1.2 },
      { note: 2, dur: 1.8 },
      { note: 1, dur: 0.8 },
      { note: 0, dur: 2.4 },
      { note: 2, dur: 0.7 },
      { note: 3, dur: 0.7 },
      { note: 4, dur: 0.9 },
      { note: 5, dur: 1.8 },
      { note: 6, dur: 1.2 },
      { note: 5, dur: 2.5 }
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlaying) return;

      const item = melodyPattern[noteIdx % melodyPattern.length];
      const freq = ragaScale[item.note];
      const duration = item.dur;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc1.type = 'sine'; // Bamboo flute fundamental
      osc1.frequency.setValueAtTime(freq, ctx.currentTime);

      osc2.type = 'triangle'; // Shehnai overtone
      osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      const nextItem = melodyPattern[(noteIdx + 1) % melodyPattern.length];
      const nextFreq = ragaScale[nextItem.note];
      osc1.frequency.exponentialRampToValueAtTime(
        (freq * 0.98 + nextFreq * 0.02),
        ctx.currentTime + duration * 0.8
      );

      const curTime = ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, curTime);
      noteGain.gain.exponentialRampToValueAtTime(0.18, curTime + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.001, curTime + duration);

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc1.start(curTime);
      osc2.start(curTime);
      osc1.stop(curTime + duration);
      osc2.stop(curTime + duration);

      if (item.note === 5 || item.note === 0) {
        this.playTempleBell(curTime, freq * 2);
      }

      noteIdx++;
    };

    playNextNote();
    this.timerId = setInterval(playNextNote, 1300);
  }

  // --- PROCEDURAL TRACK 2: Rajputana Sitar & Flute ---
  playRajputanaSitar() {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;

    const droneFreqs = [138.59, 207.65, 277.18];
    droneFreqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, now);

      gain.gain.setValueAtTime(0.045, now);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.activeNodes.push(osc, gain, filter);
    });

    const sitarScale = [277.18, 293.66, 349.23, 415.30, 440.00, 554.37, 587.33];
    const sitarNotes = [0, 1, 2, 3, 2, 4, 3, 5, 4, 3, 2, 1, 0, 3, 5];
    let sIdx = 0;

    const playSitarPluck = () => {
      if (!this.isPlaying) return;
      const freq = sitarScale[sitarNotes[sIdx % sitarNotes.length]];
      const curTime = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, curTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 2.2, curTime);
      filter.Q.value = 4.0;

      gain.gain.setValueAtTime(0.22, curTime);
      gain.gain.exponentialRampToValueAtTime(0.001, curTime + 1.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(curTime);
      osc.stop(curTime + 1.7);

      if (sIdx % 4 === 0) {
        this.playTempleBell(curTime, 1108.7);
      }

      sIdx++;
    };

    playSitarPluck();
    this.timerId = setInterval(playSitarPluck, 550);
  }

  // --- PROCEDURAL TRACK 3: Celestial Harp ---
  playCelestialHarp() {
    const ctx = this.ctx;
    if (!ctx) return;
    const arpeggio = [
      261.63, 329.63, 392.00, 523.25,
      293.66, 349.23, 440.00, 587.33,
      329.63, 392.00, 493.88, 659.25,
      349.23, 440.00, 523.25, 698.46
    ];

    let arpIdx = 0;
    const playHarpNote = () => {
      if (!this.isPlaying) return;

      const freq = arpeggio[arpIdx % arpeggio.length];
      const curTime = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, curTime);

      gain.gain.setValueAtTime(0.2, curTime);
      gain.gain.exponentialRampToValueAtTime(0.001, curTime + 1.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(curTime);
      osc.stop(curTime + 1.5);

      arpIdx++;
    };

    playHarpNote();
    this.timerId = setInterval(playHarpNote, 320);
  }

  playIndianTempleGhanta() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Helper to synthesize a single heavy Indian bronze temple bell strike
    const triggerGhantaStroke = (strikeTime, volumeScale = 1.0, basePitch = 432) => {
      const duration = 5.2;

      // 1. Strike transient (Bronze Clapper impact clink)
      try {
        const strikeOsc = this.ctx.createOscillator();
        const strikeGain = this.ctx.createGain();
        const strikeFilter = this.ctx.createBiquadFilter();

        strikeOsc.type = 'triangle';
        strikeOsc.frequency.setValueAtTime(2800, strikeTime);
        strikeFilter.type = 'bandpass';
        strikeFilter.frequency.setValueAtTime(3100, strikeTime);
        strikeFilter.Q.setValueAtTime(6, strikeTime);

        strikeGain.gain.setValueAtTime(0.18 * volumeScale, strikeTime);
        strikeGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + 0.08);

        strikeOsc.connect(strikeFilter);
        strikeFilter.connect(strikeGain);
        strikeGain.connect(this.masterGain);

        strikeOsc.start(strikeTime);
        strikeOsc.stop(strikeTime + 0.1);
      } catch (e) {}

      // 2. Harmonic and Inharmonic Bronze Bell Overtones with Natural Beating
      // Natural cast kansa (bronze) frequencies around 432 Hz
      const harmonics = [
        { f: basePitch * 0.625, g: 0.32, decay: 5.2 },  // Deep Hum tone (~270 Hz)
        { f: basePitch,         g: 0.40, decay: 4.8 },  // Prime fundamental (432 Hz)
        { f: basePitch + 1.6,   g: 0.36, decay: 4.8 },  // Beating oscillator (1.6 Hz acoustic flutter)
        { f: basePitch * 1.2,   g: 0.28, decay: 4.0 },  // Tierce (minor 3rd ~518 Hz)
        { f: basePitch * 1.5,   g: 0.22, decay: 3.5 },  // Quint (~648 Hz)
        { f: basePitch * 2.0,   g: 0.20, decay: 3.2 },  // Octave nominal (864 Hz)
        { f: basePitch * 2.01,  g: 0.16, decay: 3.2 },  // Octave beating
        { f: basePitch * 3.0,   g: 0.10, decay: 2.2 }   // Super-octave (~1296 Hz)
      ];

      harmonics.forEach(h => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(h.f, strikeTime);

          // Fast rise, long exponential bell decay
          gain.gain.setValueAtTime(0.001, strikeTime);
          gain.gain.linearRampToValueAtTime(h.g * volumeScale * 0.4, strikeTime + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + h.decay);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(strikeTime);
          osc.stop(strikeTime + h.decay);
        } catch (e) {}
      });
    };

    // Traditional Devasthanam Double Bell Strike ("Toll... Toll...")
    triggerGhantaStroke(now, 1.0, 432);             // First heavy strike
    triggerGhantaStroke(now + 0.68, 0.75, 432);      // Second resonant strike
  }

  playTempleBell(time, freq) {
    this.playIndianTempleGhanta();
  }

  onStateChange(playing) {
    const disc = document.getElementById('audio-disc');
    const playIcon = document.getElementById('play-icon');
    const eq = document.getElementById('equalizer');

    if (disc) {
      if (playing) disc.classList.add('spinning');
      else disc.classList.remove('spinning');
    }

    if (playIcon) {
      if (playing) {
        playIcon.className = 'fa-solid fa-pause';
      } else {
        playIcon.className = 'fa-solid fa-play';
      }
    }

    if (eq) {
      if (playing) eq.classList.add('active');
      else eq.classList.remove('active');
    }
  }
}

// Global instance
window.weddingAudio = new WeddingAudioEngine();
