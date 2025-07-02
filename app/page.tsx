"use client";
import Section from "@/components/Section";
import ps5 from "@/public/ps5.jpg";
import xbox from "@/public/xbox.jpg";
import { useState } from "react";
import { StaticImageData } from "next/image";

type SelectedSection = "PS5" | "XBOX" | "none";

const HomePage = () => {
  const [sections] = useState<
    Array<{
      horizontalPosition: "left" | "right";
      image: StaticImageData;
      alt: "PS5" | "XBOX";
    }>
  >([
    { horizontalPosition: "left", image: ps5, alt: "PS5" },
    { horizontalPosition: "right", image: xbox, alt: "XBOX" },
  ]);
  const [selectedSection, setSelectedSection] = useState<SelectedSection>("none");

  const handlePageBlur = () => {
    setSelectedSection("none");
  };

  return (
    <div className="relative mx-auto h-screen w-full bg-gray-950 xl:container" onMouseLeave={handlePageBlur}>
      {sections.map((section) => {
        return <Section {...section} key={section.alt} setSelectedSection={setSelectedSection} selectedSection={selectedSection} />;
      })}
    </div>
  );
};

export default HomePage;
