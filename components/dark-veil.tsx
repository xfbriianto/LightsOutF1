'use client';

import { useRef, useEffect } from 'react';

type Props = {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
};

export function DarkVeil({
  hueShift = 240,
  noiseIntensity = 0.05,
  scanlineIntensity = 0,
  speed = 0.5,
  scanlineFrequency = 0,
  warpAmount = 0,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Dark veil effect with hue shift
      const hue = hueShift;
      gradient.addColorStop(0, `hsla(${hue}, 70%, 15%, 0.9)`);
      gradient.addColorStop(0.5, `hsla(${hue}, 60%, 10%, 0.95)`);
      gradient.addColorStop(1, `hsla(${hue}, 70%, 5%, 0.9)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add noise effect
      if (noiseIntensity > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * noiseIntensity * 255;
          data[i] += noise;
          data[i + 1] += noise;
          data[i + 2] += noise;
        }
        
        ctx.putImageData(imageData, 0, 0);
      }

      // Add animated waves with sine waves
      if (warpAmount > 0) {
        const waveHeight = 20 * warpAmount;
        const waveFrequency = 0.005;
        
        ctx.strokeStyle = `rgba(220, 0, 0, ${0.1 * warpAmount})`;
        ctx.lineWidth = 2;
        
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 5) {
            const offsetY = Math.sin((x * waveFrequency + time * speed * 0.01)) * waveHeight;
            if (x === 0) {
              ctx.moveTo(x, y + offsetY);
            } else {
              ctx.lineTo(x, y + offsetY);
            }
          }
          ctx.stroke();
        }
      }

      // Add F1 red accent lines
      ctx.strokeStyle = 'rgba(220, 0, 0, 0.15)';
      ctx.lineWidth = 1;
      
      const lineY = Math.sin(time * speed * 0.001) * 30 + canvas.height * 0.3;
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.lineTo(canvas.width, lineY);
      ctx.stroke();

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [hueShift, noiseIntensity, speed, warpAmount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full block pointer-events-none"
    />
  );
}
