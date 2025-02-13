"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../experience/components/ui/Dialog";
import Image from "next/image";

const directors = [
  {
    name: "Sarah Chen",
    position: "Chief Executive Officer",
    image: "/building.svg",
    bio: "Sarah brings over 20 years of experience in technology and business leadership. She has led multiple successful digital transformation initiatives and is passionate about leveraging technology to solve complex business challenges.",
    expertise: [
      "Digital Transformation",
      "Strategic Planning",
      "Business Development",
      "Technology Innovation",
    ],
    social: [
      {
        platform: "LinkedIn",
        url: "#",
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
    ],
  },

  {
    name: "Sarah Chen",
    position: "Chief Executive Officer",
    image: "/building.svg",
    bio: "Sarah brings over 20 years of experience in technology and business leadership. She has led multiple successful digital transformation initiatives and is passionate about leveraging technology to solve complex business challenges.",
    expertise: [
      "Digital Transformation",
      "Strategic Planning",
      "Business Development",
      "Technology Innovation",
    ],
    social: [
      {
        platform: "LinkedIn",
        url: "#",
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
    ],
  },
  {
    name: "Sarah Chen",
    position: "Chief Executive Officer",
    image: "/building.svg",
    bio: "Sarah brings over 20 years of experience in technology and business leadership. She has led multiple successful digital transformation initiatives and is passionate about leveraging technology to solve complex business challenges.",
    expertise: [
      "Digital Transformation",
      "Strategic Planning",
      "Business Development",
      "Technology Innovation",
    ],
    social: [
      {
        platform: "LinkedIn",
        url: "#",
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
      },
    ],
  },
  // ... other directors data
];

// Progress Stat Component
function ProgressStat() {
  return (
    <div className="container px-4 md:px-6 mt-12 mx-auto">
      <h2 className="mb-4 text-Start text-3xl font-bold tracking-tighter sm:text-4xl">
        Directors
      </h2>
      <p className="mb-12 text-gray-600">
        Stay updated with the latest news and events from Isianpadu. Explore our
        milestones, project launches, and participation in industry events as we
        continue to drive innovation and success.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {directors.map((director) => (
          <Dialog key={director.name}>
            <DialogTrigger asChild>
              <button className="group relative w-full overflow-hidden rounded-xl bg-white p-6 shadow-md transition-transform hover:shadow-lg">
                <div className="relative mb-4 h-60 w-full overflow-hidden rounded-lg">
                  <Image
                    src={director.image}
                    alt={director.name}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                  />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-gray-800">
                  {director.name}
                </h3>
                <p className="text-sm text-gray-600">{director.position}</p>
                <div className="mt-3 flex gap-3">
                  {director.social.map((item) => (
                    <a
                      key={item.platform}
                      href={item.url}
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{item.platform}</span>
                      {item.icon}
                    </a>
                  ))}
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  {director.name}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-1">
                <div className="space-y-4 md:col-span-3">
                  <h4 className="text-base font-medium text-gray-600">
                    {director.position}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {director.bio}
                  </p>
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700">
                      Areas of Expertise:
                    </h5>
                    <ul className="list-inside list-disc text-sm text-gray-600">
                      {director.expertise.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

export default ProgressStat;
