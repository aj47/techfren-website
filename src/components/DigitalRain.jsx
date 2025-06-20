import React, { useEffect, useRef } from 'react';

const DigitalRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS; // ~16.67ms for 60fps

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const columns = Math.floor(canvas.width / 20);
    const drops = new Array(columns).fill(1);

    const draw = (currentTime) => {
      // Limit frame rate to 60fps
      if (currentTime - lastTime >= frameInterval) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
          let text;
          if (Math.random() < 0.5) {
            text = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Lowercase English letters
          } else {
            text = String.fromCharCode(Math.floor(Math.random() * (0x30A1 - 0x3041 + 1)) + 0x3041); // Japanese Hiragana and Katakana characters
          }
          ctx.fillText(text, i * 20, drops[i] * 20);

          if (drops[i] * 20 > canvas.height && Math.random() > 0.89) {
            drops[i] = 0;
          }
          drops[i]++;
        }

        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default DigitalRain;
