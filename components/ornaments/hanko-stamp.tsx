export function HankoStamp({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <g filter="url(#sumi-edge-strong)" transform="rotate(6 28 28)">
        <rect x="4" y="4" width="48" height="48" rx="6" fill="#9B2C2C" />
        <text
          x="28"
          y="38"
          textAnchor="middle"
          fontFamily="Playfair Display, serif"
          fontWeight="700"
          fontSize="32"
          fill="#FAF7F1"
        >
          A
        </text>
      </g>
    </svg>
  );
}
