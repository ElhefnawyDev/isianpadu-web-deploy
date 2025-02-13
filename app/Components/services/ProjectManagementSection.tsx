"use client";
import React, { forwardRef } from "react";
import { Image } from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
  image: string;
  right: boolean;
  url: string;
  refs: number;
}

const ProjectManagement = forwardRef<HTMLDivElement, Props>(
  ({ title, description, image, right, url, refs }) => {
    return (
      <div className="flex flex-col w-full justify-center items-center px-4 md:px-0">
        <div
          className={`flex flex-col md:flex-row ${
            right ? "md:flex-row-reverse" : ""
          } justify-center items-center w-full h-auto md:h-[400px] my-4 space-y-4 md:space-y-0 md:space-x-0 rounded-xl`}
        >
          {/* Text Section */}
          <section
            id={`section-${refs}`}
            className="w-full md:w-[50%] text-center md:text-left px-4"
          >
            {/* Title */}
            <h1 className="text-xl md:text-3xl font-bold text-gray-700">
              {title}
            </h1>

            {/* Image placed under the title for small screens, vertically centered */}
            <div className="flex justify-center w-full mt-4 md:hidden">
              <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-full overflow-hidden border-[8px] border-white shadow-2xl shadow-gray-400">
                <Image src={image} alt="Project Image" />
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-4 text-justify text-sm md:text-base">
              {description}
            </p>
            <a
              href={url}
              className="text-sm md:text-base uppercase tracking-wider font-semibold hover:underline mt-2 inline-block"
            >
              Read More &gt;
            </a>
          </section>

          {/* Image for larger screens */}
          <div className="hidden md:block w-40 h-40 sm:w-60 sm:h-60 md:w-96 md:h-96 rounded-full overflow-hidden border-[8px] border-white shadow-2xl shadow-gray-400 relative">
            <Image src={image} alt="Project Image" />
          </div>
        </div>

        <div className="w-[90%] md:w-[50%] border-t border-zinc-400 my-4"></div>
      </div>
    );
  }
);

ProjectManagement.displayName = "ProjectManagement";

export default ProjectManagement;
