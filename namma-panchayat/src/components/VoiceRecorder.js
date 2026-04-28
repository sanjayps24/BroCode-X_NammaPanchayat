"use client";
import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function VoiceRecorder({ onStop }) {
  const { lang } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        if (onStop) onStop(blob, url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording failed", err);
      alert(lang === 'en' ? "Microphone access denied" : "ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <button 
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        className={`pulse ${isRecording ? 'recording' : ''}`}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: 'none',
          background: isRecording ? 'var(--color-emergency)' : 'var(--color-primary)',
          color: 'white',
          fontSize: '3rem',
          boxShadow: 'var(--shadow-lg)',
          cursor: 'pointer'
        }}
      >
        🎤
      </button>
      
      <p style={{ fontWeight: 700, color: isRecording ? 'var(--color-emergency)' : 'var(--color-foreground)' }}>
        {isRecording 
          ? (lang === 'en' ? "Recording... (Release to stop)" : "ಧ್ವನಿ ಮುದ್ರಣವಾಗುತ್ತಿದೆ... (ನಿಲ್ಲಿಸಲು ಬಿಡಿ)") 
          : (lang === 'en' ? "Hold to Record" : "ಧ್ವನಿ ಮುದ್ರಿಸಲು ಒತ್ತಿ ಹಿಡಿಯಿರಿ")}
      </p>

      {audioUrl && !isRecording && (
        <audio src={audioUrl} controls style={{ width: '100%', maxWidth: '300px' }} />
      )}
    </div>
  );
}
