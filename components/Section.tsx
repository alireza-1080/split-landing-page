import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Dispatch, SetStateAction, useRef } from "react";

gsap.registerPlugin(useGSAP);

type SelectedSection = "PS5" | "XBOX" | "none";

type Props = {
  image: StaticImageData;
  horizontalPosition: "left" | "right";
  alt: "PS5" | "XBOX";
  setSelectedSection: Dispatch<SetStateAction<SelectedSection>>;
  selectedSection: SelectedSection;
};

const Section = ({ image, horizontalPosition, alt, setSelectedSection, selectedSection }: Props) => {
  const buttonAnimation = useRef<gsap.core.Tween>(null);
  const button = useRef<HTMLButtonElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const h3 = useRef<HTMLHeadingElement>(null);
  const bgCover = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));

  useGSAP(() => {
    buttonAnimation.current = gsap.to(button.current, {
      background: "white",
      borderColor: "white",
      color: "black",
      scale: 1.1,
      fontWeight: "700",
      paused: true,
    });
  }, []);

  const handleButtonHover = () => {
    buttonAnimation.current?.play();
  };

  const handleButtonBlur = () => {
    buttonAnimation.current?.reverse();
  };

  const handleSectionHover = () => {
    setSelectedSection(alt);
  };

  useGSAP(() => {
    tl.current.clear()
    if (selectedSection === "none") {
      tl.current
      .to(section.current, { width: "50%" })
      .to(bgCover.current, { opacity: 1 }, "<")
      .to(button.current, { opacity: 1 }, "<")
      .to(h3.current, { rotate: "0deg", y: 0, top: "25%" }, "<")
    } else if (selectedSection === alt) {
      tl.current
      .to(section.current, { width: "85%" })
      .to(bgCover.current, { opacity: 0 }, "<")
      .to(button.current, { opacity: 1 }, "<")
      .to(h3.current, { rotate: "0deg", y: 0, top: 100 }, "<")
    } else {
      tl.current.to(section.current, { width: "15%" })
      .to(bgCover.current, { opacity: 1 }, "<")
      .to(button.current, { opacity: 0 }, "<")
      .to(h3.current, { rotate: alt === "PS5" ? "-90deg" : "90deg", y: 150 }, "<")
    }
  }, [selectedSection]);

  useGSAP(() => {
    tl.current.kill()
    tl.current.play();
  }, [tl.current]);

  return (
    <section ref={section} onMouseEnter={handleSectionHover} className={`absolute h-full w-1/2 overflow-hidden ${horizontalPosition === "left" ? "left-0 origin-left" : "right-0 origin-right"}`}>
      <figure className="relative h-full w-screen">
        <Image quality={100} src={image} fill className="h-full w-full bg-cover" alt={alt} />
      </figure>
      <article ref={bgCover} className={`absolute top-0 left-0 h-screen w-full ${alt === "PS5" ? "bg-blue-500/80" : "bg-gray-800/80"}`}></article>
      <h3 ref={h3} className="absolute top-1/4 left-1/2 -translate-x-1/2 translate-y-0 rotate-0 text-7xl font-bold text-nowrap">
        {alt === "PS5" ? "PlayStation 5" : "XBOX Series X"}
      </h3>
      <button
        ref={button}
        className="absolute top-2/4 left-1/2 -translate-x-1/2 cursor-pointer border-4 px-16 py-5 text-3xl text-nowrap uppercase"
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonBlur}
      >
        buy now
      </button>
    </section>
  );
};

export default Section;
