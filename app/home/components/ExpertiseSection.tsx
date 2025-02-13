import { Network, Settings, Cog } from "lucide-react";
type props = {
  title: string;
  name: string;
  description: string;
  image: string;
};

export function ExpertiseSection ({ title, name, description, image }:props) {
  return (
    <section className="relative flex flex-col lg:flex-row  items-center justify-between px-6 lg:px-32 bg-white xl:mx-[8%]">
      {/* Text Content */}
      <div className="lg:w-1/2 text-start basis-1/2">
        <h4 className="text-sm font-medium text-gray-500 uppercase">
          {title}
        </h4>
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-2 font-satoshi">
          {name}
        </h2>
        <p className="text-gray-600 text-lg mt-4 w-[90%]">{description}</p>
      </div>

      {/* Image */}
      <div className="lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0 basis-1/2">
        <img
          src={image}
          alt="Expertise illustration"
          className="max-w-full h-auto rounded-lg"
        />
      </div>
    </section>
  );
}
