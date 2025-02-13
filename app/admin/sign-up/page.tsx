import React from "react";
import SignInForm from "../Components/form/signInForm";
import { Image } from "@chakra-ui/react";
import imageBg from "../../assets/Image_3737.png";
import SignupForm from "../Components/form/signupForm";
const page = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* Background Image */}
      {/* <Image
        src={imageBg.src} // Replace with your image path
        alt="Background"
        objectFit="cover"
        className="absolute z-0 mt-44" // Set background image behind content
      /> */}
      {/* Sign In Form */}
      <div className="relative z-10">
        {" "}
        {/* Ensure it appears above the background */}
        <SignupForm />
      </div>
    </div>
  );
};

export default page;
