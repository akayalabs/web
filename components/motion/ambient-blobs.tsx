export function AmbientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div
        className="absolute -left-[10%] top-[5%] h-[60vw] w-[60vw] rounded-full opacity-[0.3] blur-[60px]"
        style={{ background: "radial-gradient(circle at center, rgba(216,123,133,0.55), transparent 60%)" }}
      />
      <div
        className="absolute right-[-10%] top-[40%] h-[55vw] w-[55vw] rounded-full opacity-[0.28] blur-[60px]"
        style={{ background: "radial-gradient(circle at center, rgba(184,137,61,0.6), transparent 60%)" }}
      />
      <div
        className="absolute left-[20%] bottom-[-15%] h-[50vw] w-[50vw] rounded-full opacity-[0.22] blur-[60px]"
        style={{ background: "radial-gradient(circle at center, rgba(155,44,44,0.45), transparent 60%)" }}
      />
    </div>
  );
}
