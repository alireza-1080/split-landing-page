import Section from "@/components/Section";
import ps5 from "@/public/ps5.jpg"
import xbox from "@/public/xbox.jpg"

const HomePage = () => {
  return (
    <div className="relative container mx-auto h-screen w-full bg-gray-950">
      <Section horizontalPosition="left" image={ps5} alt={"PS5"}/>
      <Section horizontalPosition="right" image={xbox} alt={"XBOX"}/>
    </div>
  );
};

export default HomePage;
