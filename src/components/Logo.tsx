interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Club logo mark. Swap `public/logo.svg` with the official asset —
 * this component will pick it up automatically.
 */
export default function Logo({ size = 26, className = "" }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="IETE Students' Forum logo"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    />
  );
}
