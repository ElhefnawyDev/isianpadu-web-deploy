import prisma from "@/prisma/client";
import React, { useEffect, useState } from "react";

const Footer = async () => {
  const footer = await prisma.footer.findFirst({
    where: {
      id: 1,
    },
  });

  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Logo and Description */}
        <div>
          <h1 className="text-2xl font-bold mb-4">ISIANPADU</h1>
          <p className="text-justify">{footer?.description}</p>
        </div>

        {/* Explore Links */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4 ml-8">Explore</h2>
          <ul className="space-y-2 ml-8">
            <li>
              <a href="home" className="text-blue-400 hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="about" className="text-blue-400 hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="services" className="text-blue-400 hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="news&events" className="text-blue-400 hover:underline">
                News & Events
              </a>
            </li>
            <li>
              <a href="contact" className="text-blue-400 hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4">Reach Us</h2>
          <ul className="space-y-2">
            <li>{footer?.address!}</li>
            <li>{footer?.location}</li>

            <li className="mt-4">{footer?.phone}</li>
            <li>
              Email:{" "}
              <a
                href="mailto:general@isianpadu.com"
                className="text-blue-400 hover:underline"
              >
                {footer?.email}
              </a>
            </li>
          </ul>
          <p className="mt-4">{footer?.workingHourse}</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <p>&copy; {footer?.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
