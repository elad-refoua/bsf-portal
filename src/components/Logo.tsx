/** The CATAN mark: a grounded mountain/triangle — the signature motif. */
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="CATAN" fill="none">
      <rect width="64" height="64" rx="16" fill="#265f59" />
      {/* mountain */}
      <path d="M14 47 L30 20 L38 33 L44 26 L52 47 Z" fill="#8fc7c1" />
      {/* snow cap */}
      <path d="M30 20 L34.5 27.5 L25.5 27.5 Z" fill="#faf7f2" />
      {/* grounding line */}
      <rect x="12" y="47" width="40" height="3" rx="1.5" fill="#faf7f2" opacity="0.85" />
    </svg>
  );
}
