import React from "react";
import { InfiniteMovingCards } from "./InfiniteMovingCards";
import { FaProjectDiagram, FaKey, FaCogs, FaTools, FaLightbulb, FaUsers } from 'react-icons/fa';
import prisma from "@/prisma/client";

export default async function InfiniteMovingCardsDemo() {
  const serviceTwo = await prisma.servicesTwo.findMany();

  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={serviceTwo} direction="right" speed="slow" />
    </div>
  );
}


const testimonials = [
  {
    quote:
      "We deliver to our clients the benefits of our many years of extensive project management experience. Our main goal has and always will be completing the project on time, stay within the budget, and to deliver the expected level of quality and performance.",
    name: "Service 1",
    title: "Project Management", // Updated title to match image style
    icon: "/portfolio-management.png", // Placeholder path for the icon
  },
  {
    quote:
      "We have extensive experience in developing applications across diverse environments, including centralized back-end business systems, online and batch application, client/server architectures, as well as web-based and mobile platforms. ",
    name: "Service 2",
    title: "Turnkey Development", // Updated title to match image style
    icon: "/key.png", // Placeholder path for the icon
  },
  {
    quote: "Our technical expertise enables us to integrate multiple application, facilitating information sharing and automating business processes. We employ application-to-application adapters, business rules, and workflow management to achieve seamless integration.",
    name: "Service 3",
    title: "System Integration", // Updated title to match image style
    icon: "/gear.png", // Placeholder path for the icon
  },
  {
    quote:
      "ISIANPADU Systems Sdn Bhd offers various professional services to our clients to assist them in the assessment, planning, management, development, integration, deployment and maintenance of their business applications.",
    name: "Service 4",
    title: "System Maintenance", // Updated title to match image style
    icon: "/web-optimization.png", // Placeholder path for the icon
  },
  {
    quote:
      "We offer consulting and advisory services to assist clients in evaluating various technology strategies and aligning them with their business objectives.",
    name: "Service 5",
    title: "IT Consultancy", // Updated title to match image style
    icon: "/conversation.png", // Placeholder path for the icon
  },
  {
    quote:
      "Isianpadu Systems boasts a dedicated team of experts with extensive technical and industry experience, whether managing projects, integrating system, or providing technology consulting, our team consistently strives to exceed clients’ expectations and achieve superior results.",
    name: "Service 6",
    title: "Dedicated Team", // Updated title to match image style
    icon: "/networking.png", // Placeholder path for the icon
  },
];