"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Image } from "@chakra-ui/react";

// Utility function to join class names
function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    description: string;
    reference: string;
    title: string;
    icon: string; // Add the icon field to the items
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "normal" : "reverse"
      );
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const speedValue =
        speed === "fast" ? "10s" : speed === "normal" ? "20s" : "40s"; // Adjust speed as necessary
      containerRef.current.style.setProperty("--animation-duration", speedValue);
    }
  }, [speed]);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate the children to create the infinite effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true); // Start animation after setup
    }
  }, [getDirection, getSpeed]); // Add getDirection and getSpeed to dependency array

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[99%] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_99%,transparent)]",
        className!
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-b flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px] flex flex-col items-center text-center bg-white hover:shadow-lg"
            key={`${item.reference}-${idx}`} // Ensure unique key for each item
          >
            {/* Icon/Image placeholder */}
            <div className="mb-4">
              <Image
                src={item.icon} // Use the icon path from item
                alt={item.description}
                className="w-16 h-16 object-contain"
                width={64} // Adjusted width for the icon
                height={64} // Adjusted height for the icon
              />
            </div>
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900  mb-2">
              {item.title}
            </h2>
            {/* Quote */}
            <blockquote className="relative z-20 text-sm leading-[1.6] text-gray-700  font-normal">
              <p>{item.description}</p>
              <div className="mt-6 flex flex-row items-center justify-center">
                <span className="text-sm leading-[1.6] text-gray-500  font-normal">
                  - {item.reference}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>

      {/* Inline styles for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) linear infinite
            var(--animation-direction, normal);
        }

        /* Pause animation on hover */
        .scroller:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
