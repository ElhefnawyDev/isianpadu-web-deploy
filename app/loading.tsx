import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      {/* Loader Spinner */}
      <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin mb-4"></div>
      {/* Loading Text with animation */}
      <p className="text-xl text-white animate-bounce">Loading...</p>
          
    </div>
  );
};

export default LoadingPage;
