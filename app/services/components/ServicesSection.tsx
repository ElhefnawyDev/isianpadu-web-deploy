"use client"
import type React from "react"
import { useState } from "react"
import Frame from "./Frame"
import { Montserrat } from "next/font/google"
import { Image } from "@chakra-ui/react"
import ReactMarkdown from "react-markdown"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

interface ServiceSectionProps {
  service: {
    title: string
    description: string
    hsDescription?: string
    image3: string
    lDescription: string
    titleImage?: string // Add this new property
  }
  isEven: boolean
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ service, isEven }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <div className="min-h-screen bg-white text-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-28">
          <h1
            className={`text-[#000000] text-4xl md:text-6xl lg:text-7xl font-bold ${montserrat.className}`}
          >
            {service.title}
          </h1>
          {/* Add the image here */}
          {service.titleImage && (
            <div className="mt-8">
              <img
                src={service.titleImage}
                alt="Title illustration"
                className="object-contain w-full max-w-2xl mx-auto"
              />
            </div>
          )}
          <div className="text-lg md:text-xl lg:text-2xl mt-4 tracking-wider">
            {service.hsDescription || service.description}
            <span className="italic"> Our Services</span>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 items-center ${
            isEven ? "" : "md:flex-row-reverse"
          }`}
        >
          {isEven ? (
            <>
              <ContentSection
                onButtonClick={handleModalToggle}
                longDescription={service.description!}
              />
              <ImageSection image={service.image3} />
            </>
          ) : (
            <>
              <ImageSection image={service.image3} />
              <ContentSection
                onButtonClick={handleModalToggle}
                longDescription={service.description!}
              />
            </>
          )}
        </div>

        {isModalOpen && (
          <ServiceModal service={service} onClose={handleModalToggle} />
        )}
      </div>
    </div>
  )
}

const ContentSection = ({
  onButtonClick,
  longDescription,
}: {
  onButtonClick: () => void
  longDescription: string
}) => (
  <div className="space-y-6">
    <p className="font-semibold text-xl">{longDescription}</p>

    <button
      onClick={onButtonClick}
      className="w-40 h-12 mt-8 bg-[#0A40E1] rounded-full text-white font-medium shadow-lg hover:bg-[#0A40E1]/90 transition"
    >
      Learn More
    </button>
  </div>
)

const ImageSection = ({ image }: { image: string }) => (
  <Frame className="max-w-xl mx-auto">
    <img
      src={image || "/placeholder.svg"}
      alt="Service illustration"
      className="object-contain w-full h-full"
    />
  </Frame>
)
const ServiceModal = ({
  service,
  onClose,
}: {
  service: { title: string; description: string; hsDescription?: string; image3: string; lDescription: string }
  onClose: () => void
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-lg p-8 w-[95%] max-h-[95%] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
      <Image src={service.image3} alt="Service image" className="w-auto h-auto max-w-full max-h-60 mb-4 object-contain mx-auto" />
      <ReactMarkdown className="mb-6">{service.lDescription}</ReactMarkdown>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-[#0A40E1] text-white font-medium rounded-full hover:bg-[#0A40E1]/90 transition"
      >
        Close
      </button>
    </div>
  </div>
)


export default ServiceSection