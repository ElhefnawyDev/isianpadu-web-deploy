import React from "react";

const RedLine = () => {
  return (
    <div
      className=" w-full h-10 bg-red-600 shadow-red-600 order-last"
      style={{ clipPath: "polygon(0 70%, 100% 70%, 100% 100%, 0% 100%)" }}
    ></div>
  );
};

export default RedLine;
