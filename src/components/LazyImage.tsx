export default function LazyImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-square">
      <img
        src={src}
        alt={alt}
        className="object-contain w-full h-full"
        loading="lazy"
      />
    </div>
  );
}
