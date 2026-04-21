export const playHappyBirthday = () => {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const melody = [
    { f: 392.00, d: 200 }, { f: 392.00, d: 150 }, { f: 440.00, d: 400 }, { f: 392.00, d: 400 }, { f: 523.25, d: 400 }, { f: 493.88, d: 800 },
    { f: 392.00, d: 200 }, { f: 392.00, d: 150 }, { f: 440.00, d: 400 }, { f: 392.00, d: 400 }, { f: 587.33, d: 400 }, { f: 523.25, d: 800 },
    { f: 392.00, d: 200 }, { f: 392.00, d: 150 }, { f: 783.99, d: 400 }, { f: 659.25, d: 400 }, { f: 523.25, d: 400 }, { f: 493.88, d: 400 }, { f: 440.00, d: 600 },
    { f: 698.46, d: 200 }, { f: 698.46, d: 150 }, { f: 659.25, d: 400 }, { f: 523.25, d: 400 }, { f: 587.33, d: 400 }, { f: 523.25, d: 800 },
  ];

  let time = audioCtx.currentTime;
  
  melody.forEach((note) => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = note.f;
    
    // Envelope to make it sound plucky/soft instead of continuous beep
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.3, time + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + (note.d / 1000) - 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(time);
    osc.stop(time + (note.d / 1000));
    
    time += (note.d / 1000) + 0.05; // Added slight pause between notes
  });
};
