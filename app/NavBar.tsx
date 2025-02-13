"use client";
import Image from "next/image";
import logo from "./assets/logo-removebg-preview.png";
import logoWhite from "./assets/logo-removebg-preview.png";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { gsap } from "gsap";

const menuLinks = [
  { path: "/home", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/news&events", label: "News & Events" },
  { path: "/experience", label: "Experience" },
  { path: "/aboutus", label: "About Us" },
];

const NavBar = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldHideMenu, setShouldHideMenu] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>();

  const toggleMenu = () => {
    if (!isAnimating) {
      setIsMenuOpen(!isMenuOpen);
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    tl.current = gsap
      .timeline({ paused: true, onComplete: () => setIsAnimating(false) })
      .to(".menu-line-3", {
        duration: 0.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.in",
        delay: -0.2,
      })
      .to(".menu-line-2", {
        duration: 0.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.in",
        delay: -0.2,
      })
      .to(".menu-line-1", {
        duration: 0.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.in",
        delay: -0.2,
      })
      .to(".menu-overlay", {
        duration: 0.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.in",
        delay: -0.2,
      })
      .to(".menu-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: -0.75,
      });

    gsap.set(".menu-line-3", {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    });
    gsap.set(".menu-line-2", {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    });
    gsap.set(".menu-line-1", {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
      height: "100%",
    });
    gsap.set(".menu-overlay", {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    });
    gsap.set(".menu-bg", { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" });

    gsap.set(".menu-link-item-holder", { y: 75 });
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      tl.current!.play();
      setShouldHideMenu(true);
    } else {
      tl.current!.reverse().then(() => {
        setIsAnimating(false);
        setShouldHideMenu(false);
      });
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      <div
        className="flex justify-between bg-[#ffffff] animate-gradient
        h-[70px] lg:px-40 md:px-10 px-5 items-center menu-bar"
        style={{ backgroundSize: "400% 400%" }}
      >
        <Link href={"/home"}>
          <Image
            src={logo}
            alt={"Isianpadu"}
            className="w-1/2 h-1/2 sm:w-1/4 sm:h-1/4 md:w-1/4 md:h-1/4 lg:w-1/6 lg:h-1/6"
          />
        </Link>
        <a
          onClick={toggleMenu}
          className="hover:text-red-600 flex space-x-1 cursor-pointer text-black text-[20px]"
        >
          <p>Menu </p>
          <IoMenu className="mt-[3px] size-7" />
        </a>
      </div>

      {/* Menu background */}
      <div
        className={`fixed inset-0 w-screen h-screen flex items-center justify-center z-50 menu-bg ${
          shouldHideMenu ? "visible" : "invisible"
        }`}
      ></div>
      <div
        className={`fixed inset-0 w-screen h-[40%] bg-[#ffffff] flex self-start justify-start top-0 z-50 menu-line-1 ${
          shouldHideMenu ? "visible" : "invisible"
        }`}
      ></div>
      <div
        className={`fixed inset-0 w-screen h-[40%] bg-[#ffffff] flex self-center justify-center z-50 menu-line-2 ${
          shouldHideMenu ? "visible" : "invisible"
        }`}
      ></div>
      <div
        className={`fixed inset-0 w-screen h-[36%] bg-[#ffffff] flex self-end justify-end z-50 menu-line-3 ${
          shouldHideMenu ? "visible" : "invisible"
        }`}
      ></div>

      {/* Menu content */}
      <div className="fixed inset-0 w-screen h-screen bg-[#00000000] flex items-center justify-center z-50 menu-overlay ">
        <div className="absolute top-7 right-5 lg:top-[18px] lg:right-44 md:top-4 md:right-20 sm:top-4 sm:right-10 w-auto z-[1000]">
          <a
            onClick={toggleMenu}
            className="hover:text-red-600 flex space-x-1 cursor-pointer text-black text-[20px] w-auto"
          >
            <p>Close</p>
            <IoMenu className="mt-[3px] size-7" />
          </a>
        </div>
        <div className="absolute top-7 left-5 lg:top-[18px] lg:left-[160px] md:top-4 md:left-20 sm:top-4 sm:left-10">
          <Link href={"/home"}>
            <Image
              src={logoWhite}
              alt={"Isianpadu"}
              className="w-1/2 h-1/2 sm:w-1/4 sm:h-1/4 md:w-1/4 md:h-1/4 lg:w-1/6 lg:h-1/6"
            />
          </Link>
        </div>
        <div
          className={`flex flex-col sm:flex-col md:flex-col lg:flex-row text-blue-800 text-5xl md:px-5 font-bold justify-center items-center lg:space-x-32 space-y-10 lg:space-y-0 ${
            shouldHideMenu ? "visible" : "invisible"
          }`}
        >
          {menuLinks.map((link, index) => (
            <div
              className="menu-link-item [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_0_100%)] hover:text-red-500"
              key={index}
            >
              <div className="menu-link-item-holder" onClick={toggleMenu}>
                <Link href={link.path} className="menu-link">
                  {link.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-1 sm:bottom-10 md:bottom-10 lg:bottom-10 text-center mb-12">
          <h1 className="text-white text-1xl px-3">
            No. 346 & 446, Block 6, Laman Seri Business Park, No. 7 Jalan
            Persiaran Sukan, Seksyen 13,40100 Shah Alam, Selangor Darul Ehsan,
            Malaysia
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
