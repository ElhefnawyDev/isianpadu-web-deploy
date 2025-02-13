'use client';
import { Image } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  name: string;
  position: string;
  bio: string;
  image: string;
  right: boolean;
}

const TeamDirectors = ({ name, position, bio, image, right }: Props) => {
  const [isRight, setIsRight] = useState(right);

  return (
    <div className="flex flex-col w-full justify-center items-center px-4 md:px-5">
      <div className={`flex flex-col md:flex-row justify-center items-center w-full my-4 md:space-x-20 space-y-20 md:space-y-0 rounded-xl ${isRight ? '' : 'md:space-x-40'}`}>
        {/* Image Section */}
        <div className={`flex justify-center items-center w-full ${isRight ? 'md:w-[50%] md:order-2' : 'md:w-auto'}`}>
          <Image
            src={image}
            alt="Managing Director Image"
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
        {/* Text Section */}
        <div className={`flex flex-col justify-center items-center w-full md:w-[50%] text-center md:text-left ${isRight ? 'md:order-1' : ''}`}>
          <h2 className="text-sm text-red-500 uppercase tracking-wider font-semibold">
            {position}
          </h2>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
            {name}
          </h1>
          <p className="text-gray-600 mt-4 text-justify w-[90%] text-sm md:text-base ">
            {bio}
          </p>
        </div>
      </div>
      <div className="w-[50%] border-t self border-zinc-400 my-4"></div>
    </div>
  );
};

export default TeamDirectors;
