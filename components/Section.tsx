import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  image: StaticImageData;
  horizontalPosition: "left" | "right";
  alt: "PS5" | "XBOX";
};

const Section = ({ image, horizontalPosition, alt }: Props) => {
  return (
    <section
      className={`absolute h-full w-1/2 overflow-hidden ${horizontalPosition === "left" ? "left-0 origin-left" : "right-0 origin-right"}`}
    >
      <figure className="relative h-full w-screen">
        <Image
          quality={100}
          src={image}
          fill
          className="h-full w-full bg-cover"
          alt={alt}
        />
      </figure>
      <article
        className={`absolute top-0 left-0 h-screen w-full ${alt === "PS5" ? "bg-blue-500/80" : "bg-gray-800/80"}`}
      ></article>
      <h3 className="absolute top-1/4 left-1/2 -translate-x-1/2 text-7xl font-bold text-nowrap">
        {alt === "PS5" ? "PlayStation 5" : "XBOX Series X"}
      </h3>
      <button className="absolute top-2/4 uppercase text-3xl left-1/2 -translate-x-1/2 border-2 px-16 py-5">buy now</button>
    </section>
  );
};

export default Section;
