import { Network, Settings, Cog } from "lucide-react";

type props = {
  title: string;
  name: string;
  description: string;
  image: string;
};

export default function ServicesSection({
  title,
  name,
  description,
  image,
}: props) {
  return (
    <div className="container mx-auto w-[70%] max-sm:w-[90%] h-[750px] md:py-24 flex flex-col lg:flex-row items-center justify-center lg:items-center gap-5">
      {/* Image Section */}
      <div className="lg:w-1/2 flex items-center justify-center lg:justify-start mb-8 max-sm:mb-0 max-sm:mt-8 lg:mb-0">
        <img
          src={image}
          alt="Service Illustration"
          className="max-w-full h-auto rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col h-[450px] justify-center lg:w-1/2 space-y-6 text-center lg:text-left">
        <p className="text-gray-600 text-lg">{name}</p>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight font-satoshi">
          {title}
        </h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        <a href="/services">
          <button className="w-[160px] h-[50px] bg-[#0A40E1] shadow-lg shadow-blue-500/50 rounded-full text-white font-medium">
            Learn More
          </button>
        </a>
      </div>
    </div>
  );
}
