'use client'

import { Image } from '@chakra-ui/react'
import React from 'react'

interface Props{
    title: string,
    description: string,
    image: string,
}

const CompanyBackground = ({title, description, image}: Props) => {
  return (
    <div>
        {/* Company Background Section */}

            <h1 className="font-bold text-2xl md:text-[30px] text-start pb-5">
              {title}
            </h1>
            <div className="flex justify-center items-center w-full md:w-auto">
            <Image
              src={image} // Replace with actual image path of the company building
              alt="Company Building"
              className="relative top-[13%] rounded-lg"
            />
          </div>
            <p className="text-justify text-sm md:text-base">
              {description} {/* Truncated text for brevity */}
            </p>
          </div>


  )
}

export default CompanyBackground