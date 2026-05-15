export function SumiFilter() {
  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
      <defs>
        <filter id="sumi-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="sumi-edge-strong">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="13" />
          <feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
