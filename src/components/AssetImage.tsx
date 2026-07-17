import { useState } from "react";

/**
 * An <img> that simply removes itself if the file is missing (404) — so AI-generated
 * illustrations enhance the page when present, and the layout degrades gracefully when not.
 */
export default function AssetImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={`${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
