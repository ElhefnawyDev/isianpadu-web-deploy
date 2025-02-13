import { Button, Image, Link } from "@chakra-ui/react";
import React from "react";
import FQAPatern from "../../assets/FQA_Component.png";

interface Props {
  Title: string;
  short_description: string;
  ProgressNo1: string;
  ProgressName1: string;
  ProgressNo2: string;
  ProgressName2: string;
  ProgressNo3: string;
  ProgressName3: string;
  image: string;
}

const FQA = ({
  Title,
  short_description,
  ProgressNo1,
  ProgressName1,
  ProgressNo2,
  ProgressName2,
  ProgressNo3,
  ProgressName3,
  image,
}: Props) => {
  return (
    <div className="flex justify-center w-full mt-16">
      <div className="max-w-7xl mx-auto p-6">
        {/* Eclipse Pattern */}
        <div className="items-center">
          {/* Stats Grid */}
          <div className="grid gap-8 bg-[#0041E8] max-w-7xl p-6 min-h-[200px] max-sm:h-auto max-sm:gap-1 rounded-3xl relative">
            <div className="absolute inset-0">
              <Image
                src={FQAPatern.src}
                alt="Eclipse Background"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Trusted Partner & Progress Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12  max-sm:gap-4 sm:w-80%">
              {/* Trusted Partner Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-white">
                  {Title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white">
                  {short_description}
                </p>
              </div>

              {/* Progress Stats Section */}
              <div>
                <Link href={"/faq"}>
                  <Button
                    fontSize={["14px", "16px", "18px"]} // Responsive font size for Chakra UI
                    h={["40px", "45px", "52px"]}
                    w={["120px", "130px", "142px"]}
                    borderRadius="30"
                    textColor="white"
                    _hover={{
                      textColor: "black",
                      backgroundColor: "white",
                    }}
                    variant="outline"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FQA;
