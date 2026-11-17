import Image from "next/image";

/** Capture mobile réelle dans un cadre d'appareil sobre (ratio 780×1688). */
export function PhoneShot({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[780/1688] overflow-hidden rounded-[2rem] border-[6px] border-surface-2 bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
    </div>
  );
}
