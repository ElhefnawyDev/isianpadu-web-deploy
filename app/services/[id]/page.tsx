import Footer from "@/app/Components/Footer";
import Header from "@/app/Header";
import prisma from "@/prisma/client";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const services = await prisma.services.findMany();

  return (
    <div>
      <Header header={"Services"} />

      {services.map((service) => (
        <div key={service.title}>
          {params.id === service.title.split(" ").join("") && (
            <div className="flex flex-col justify-center items-center w-full px-4">
              {/* Main content container */}
              <div className="bg-white shadow-lg p-8 flex flex-col md:flex-row items-center w-full md:w-[70%] justify-center rounded-lg space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-shrink-0 w-full md:w-1/2">
                  <Image
                    src={service.image3!} // Ensure image path is correct
                    alt="Project Management"
                    width={500}
                    height={300}
                    className="rounded-lg w-full h-auto" // Make image responsive
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
              {/* Description Section */}
              <div className="bg-white shadow-lg p-8 w-full md:w-[70%] justify-center rounded-lg mt-4">
                <ReactMarkdown className="prose max-w-full text-justify border-t-2 border-zinc-300 p-5 mt-2">
                  {service?.lDescription}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default page;
