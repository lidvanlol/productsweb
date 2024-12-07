import Image from "next/image";
import { getShimmerDataUrl } from "@/utils/imageEffects";

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function ProductImage({
  src,
  alt,
  width,
  height,
}: ProductImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
      placeholder="blur"
      blurDataURL={getShimmerDataUrl(width, height)}
    />
  );
}
