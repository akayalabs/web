export function SakuraPetal({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden filter="url(#sumi-edge)">
      <defs>
        <radialGradient id="sakura-grad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F9E1E5" />
          <stop offset="70%" stopColor="#F4D4D9" />
          <stop offset="100%" stopColor="#D87B85" />
        </radialGradient>
      </defs>
      <path
        d="M14 2 C18 6 22 9 22 15 C22 21 18 24 14 26 C10 24 6 21 6 15 C6 9 10 6 14 2 Z"
        fill="url(#sakura-grad)"
      />
      <path d="M14 6 C14 12 14 20 14 26" stroke="#B86E76" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}
