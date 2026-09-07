import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function FluteAudioPlayer({ frequency = 523.25, fluteName = "C Natural", compact = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const playBansuriTone = () => {
    try {
      if (isPlaying) {
        stopTone();
        return;
      }

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;

      // 1. Fundamental Oscillator (Sine for flute body)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);

      // Subtle vibrato / breath modulation (LFO)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(4.5, now); // 4.5Hz natural vibrato
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(frequency * 0.012, now); // subtle pitch bend
      lfo.connect(osc.frequency);
      lfo.start(now);

      // 2. 2nd Harmonic for wooden warmth
      const oscHarmonic = ctx.createOscillator();
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(frequency * 2, now);

      const harmonicGain = ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.18, now);

      // 3. Master Gain with smooth flute breath attack & release envelope
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.35, now + 0.3); // smooth breath swell
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2); // natural taper

      // Connect nodes
      osc.connect(masterGain);
      oscHarmonic.connect(harmonicGain);
      harmonicGain.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);

      oscillatorRef.current = osc;
      gainNodeRef.current = masterGain;
      setIsPlaying(true);

      // Auto stop after note duration
      setTimeout(() => {
        setIsPlaying(false);
        try {
          ctx.close();
        } catch (e) {}
      }, 3200);
    } catch (err) {
      console.error('Audio playback error:', err);
      setIsPlaying(false);
    }
  };

  const stopTone = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, now + 0.1);
      setTimeout(() => {
        try {
          audioCtxRef.current?.close();
        } catch (e) {}
        setIsPlaying(false);
      }, 120);
    } else {
      setIsPlaying(false);
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        className={`audio-sample-trigger ${isPlaying ? 'playing' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          playBansuriTone();
        }}
        title={`Listen to ${fluteName} tuned tone`}
      >
        {isPlaying ? <VolumeX size={13} /> : <Volume2 size={13} />}
        <span>{isPlaying ? 'Playing Tone...' : 'Hear Pitch'}</span>
      </button>
    );
  }

  return (
    <div className="sound-preview-card">
      <div className="sound-preview-info">
        <h4>Acoustic Tone Preview ({fluteName})</h4>
        <p>Simulated 440Hz Hindustani classical pitch & harmonic resonance</p>
      </div>
      <button
        type="button"
        className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'}`}
        style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
        onClick={playBansuriTone}
      >
        {isPlaying ? <VolumeX size={18} /> : <Music size={18} />}
        <span>{isPlaying ? 'Playing 440Hz Tone...' : 'Listen Scale'}</span>
      </button>
    </div>
  );
}
