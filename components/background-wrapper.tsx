'use client';

import { DarkVeil } from './dark-veil';
import FloatingLines from './floating-lines';
import { ReactNode } from 'react';

interface BackgroundWrapperProps {
  children: ReactNode;
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <DarkVeil
          hueShift={240}
          noiseIntensity={0.05}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0.2}
        />
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax
          animationSpeed={1}
          gradientStart="#ff1600"
          gradientMid="#340202"
          gradientEnd="#6a6a6a"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
