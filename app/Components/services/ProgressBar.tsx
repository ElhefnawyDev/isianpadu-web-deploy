"use client";
import { Text } from "@chakra-ui/react";
import React from "react";
import AnimatedCounter from "../AnimatedCounter";

interface Props {
  title: string;
  present: string;
  font?: number; // Optional font size prop
  number: boolean;
}

const ProgressBar = ({ title, present, font, number }: Props) => {
  return (
    <div className="flex flex-col text-center basis-full sm:basis-1/2 md:basis-1/4 p-4">
      {/* Pass font size and suffix to AnimatedCounter */}
      {number ? (
        <AnimatedCounter
          from={0}
          to={parseInt(present)}
          fontSize={font}
          suffix="+"
        />
      ) : (
        <Text className="text-6xl font-bold" fontSize={font}>
          {present}
        </Text>
      )}
      <Text className="text-sm">{title}</Text>
    </div>
  );
};

export default ProgressBar;
