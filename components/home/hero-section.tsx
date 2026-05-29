import TextPressure from '@/components/text-pressure';

export function HeroSection() {
  return (
    <section className="space-y-4 text-center">
      <div className="relative mx-auto h-28 w-full max-w-5xl sm:h-36 lg:h-44">
        <TextPressure
          text="Formula 1 Dashboard"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="#ffffff"
          strokeColor="#ff1600"
          minFontSize={100}
          className="drop-shadow-[0_0_24px_rgba(255,22,0,0.35)]"
        />
      </div>
      <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
        Live standings, race calendar, results, and drivers information. Stay
        updated with every lap.
      </p>
    </section>
  );
}
