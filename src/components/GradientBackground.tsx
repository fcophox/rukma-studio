export function GradientBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full object-cover"
      viewBox="0 0 1920 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="mainGradient" x1="0" y1="540" x2="1920" y2="540">
          <stop offset="0%" stopColor="#0D0F12" />
          <stop offset="22%" stopColor="#0F2A2E" />
          <stop offset="48%" stopColor="#3A464D" />
          <stop offset="72%" stopColor="#B7CEC7" />
          <stop offset="100%" stopColor="#F2F4F6" />
        </linearGradient>

        <radialGradient id="softLight" cx="72%" cy="48%" r="65%">
          <stop offset="0%" stopColor="#F2F4F6" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#DDE3E6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#DDE3E6" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="darkDepth" cx="10%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#0D0F12" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#0F2A2E" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0F2A2E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#mainGradient)" />
      <rect width="1920" height="1080" fill="url(#softLight)" />
      <rect width="1920" height="1080" fill="url(#darkDepth)" />
    </svg>
  );
}
