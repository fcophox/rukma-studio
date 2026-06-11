interface PageBackgroundProps {
  /** Image source. Defaults to the contact-style header background. */
  src?: string;
  /** Tailwind height utility for the background area. */
  heightClassName?: string;
}

/**
 * Decorative header background used on interior pages (Blog, Casos, service
 * detail, etc.). Mirrors the look of the contact page: a background image
 * anchored to the top that fades down into the dark page background.
 */
export function PageBackground({
  src = "/bg/background-contact.svg",
  heightClassName = "h-[70vh]",
}: PageBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 ${heightClassName} overflow-hidden`}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0F12]/50 to-[#0D0F12]" />
    </div>
  );
}
