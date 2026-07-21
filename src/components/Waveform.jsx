const BAR_COUNT = 28;

export default function Waveform({ className = "", color = "#0F6E68" }) {
  const bars = Array.from({ length: BAR_COUNT });
  return (
    <div className={`flex items-center justify-center gap-[3px] ${className}`}>
      {bars.map((_, i) => {
        const base = 14 + Math.abs(Math.sin(i * 0.7)) * 26;
        const duration = 0.8 + (i % 5) * 0.15;
        const delay = (i % 7) * 0.08;
        return (
          <span
            key={i}
            style={{
              width: 3,
              height: base,
              background: color,
              borderRadius: 3,
              opacity: 0.85,
              animation: `waveform ${duration}s ease-in-out ${delay}s infinite`,
              transformOrigin: "center",
            }}
          />
        );
      })}
      <style>{`
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
