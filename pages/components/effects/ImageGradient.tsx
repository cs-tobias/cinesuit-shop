// NextImageWithGradient.js
import Image from "next/image";

export default function NextImageWithGradient({ src, alt, width, height }) {
  return (
    <div className="">
      {" "}
      {/* Adjust width (w) and height (h) as needed */}
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-red-400 opacity-100"></div>
      {/* Custom CSS might be needed for more precise control */}
    </div>
  );
}
