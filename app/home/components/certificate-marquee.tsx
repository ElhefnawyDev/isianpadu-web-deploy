"use client";

import { useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Dialog, DialogContent, DialogTrigger } from "@/app/aboutus/components/ui/Dialog";

interface Certificate {
  id: number;
  image: string;
  alt: string;
  width: number;
  height: number;
  description: string;
}

interface CertificateMarqueeProps {
  certificates: Certificate[];
}

const CONTAINER_HEIGHT = 400; // Fixed container height

export function CertificateMarquee({ certificates }: CertificateMarqueeProps) {
  const calculateWidth = (originalWidth: number, originalHeight: number): number => {
    const aspectRatio = originalWidth / originalHeight;
    return Math.round(CONTAINER_HEIGHT * aspectRatio);
  };

  // State to track the selected certificate for modal
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const halfIndex = Math.ceil(certificates.length / 2);
  const firstHalf = certificates.slice(0, halfIndex);
  const secondHalf = certificates.slice(halfIndex);

  // Function to calculate the maximum dimensions for the image
  const getMaxDimensions = (imageWidth: number, imageHeight: number) => {
    const screenWidth = window.innerWidth * 0.9; // 90% of screen width
    const screenHeight = window.innerHeight * 0.8; // 80% of screen height

    const aspectRatio = imageWidth / imageHeight;

    let maxWidth = screenWidth;
    let maxHeight = screenHeight;

    if (imageWidth > screenWidth || imageHeight > screenHeight) {
      if (aspectRatio > 1) {
        // Landscape image
        maxHeight = screenWidth / aspectRatio;
      } else {
        // Portrait image
        maxWidth = screenHeight * aspectRatio;
      }
    }

    return { maxWidth, maxHeight };
  };

  return (
    <section className="w-full overflow-hidden bg-background mb-12 items-center justify-center max-sm:mt-24  max-sm:mb-0">
      <h2 className="text-center text-3xl font-bold tracking-tight">Certificates</h2>
      <p className="mt-4 max-w-6xl mx-auto text-center text-lg leading-relaxed text-muted-foreground max-sm:px-6">
        We are a proud partner of leading industry organizations and hold certifications that reflect 
        our commitment to quality and professionalism. We are fully registered with SSM, ensuring 
        compliance and credibility in all our operations.
      </p>
      
      <div className="mt-8 space-y-8">
        {/* Conditionally render one marquee row if certificates length is less than 10 */}
        {certificates.length < 10 ? (
          <Marquee gradient={false} speed={40} pauseOnHover={true}>
            {certificates.map((cert) => {
              const containerWidth = calculateWidth(cert.width, cert.height);
              return (
                <Dialog key={cert.id}>
                  <DialogTrigger asChild>
                    <div
                      className="relative bg-gray-200 mx-2 cursor-pointer"
                      style={{ height: CONTAINER_HEIGHT, width: containerWidth }}
                      onClick={() => setSelectedCertificate(cert)}
                    >
                      <Image
                        src={cert.image}
                        alt={cert.alt}
                        className="object-contain p-4"
                        width={cert.width}
                        height={cert.height}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </DialogTrigger>

                  {/* Modal Popup */}
                  {selectedCertificate && (
                    <DialogContent className="max-w-4xl flex flex-col items-center justify-center">
                      <Image
                        src={selectedCertificate.image}
                        alt={selectedCertificate.alt}
                        width={selectedCertificate.width}
                        height={selectedCertificate.height}
                        className="rounded-lg"
                        style={{
                          maxWidth: "90vw", // Ensure it doesn't exceed the screen width
                          maxHeight: "80vh", // Ensure it doesn't exceed the screen height
                          width: "auto",
                          height: "auto",
                        }}
                      />
                      <p className="text-center mt-4 font-medium">{selectedCertificate.alt}</p>
                      <p className="text-center mt-4 font-medium">{selectedCertificate.description}</p>
                    </DialogContent>
                  )}
                </Dialog>
              );
            })}
          </Marquee>
        ) : (
          <>
            {/* First Marquee for the first half */}
            <Marquee gradient={false} speed={40} pauseOnHover={true}>
              {firstHalf.map((cert) => {
                const containerWidth = calculateWidth(cert.width, cert.height);
                return (
                  <Dialog key={cert.id}>
                    <DialogTrigger asChild>
                      <div
                        className="relative bg-gray-200 mx-2 cursor-pointer"
                        style={{ height: CONTAINER_HEIGHT, width: containerWidth }}
                        onClick={() => setSelectedCertificate(cert)}
                      >
                        <Image
                          src={cert.image}
                          alt={cert.alt}
                          className="object-contain p-4"
                          width={cert.width}
                          height={cert.height}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </DialogTrigger>

                    {/* Modal Popup */}
                    {selectedCertificate && (
                      <DialogContent className="max-w-4xl flex flex-col items-center justify-center">
                        <Image
                          src={selectedCertificate.image}
                          alt={selectedCertificate.alt}
                          width={selectedCertificate.width}
                          height={selectedCertificate.height}
                          className="rounded-lg"
                          style={{
                            maxWidth: "90vw", // Ensure it doesn't exceed the screen width
                            maxHeight: "80vh", // Ensure it doesn't exceed the screen height
                            width: "auto",
                            height: "auto",
                          }}
                        />
                        <p className="text-center mt-4 font-medium">{selectedCertificate.alt}</p>
                        <p className="text-center mt-4 font-medium">{selectedCertificate.description}</p>
                      </DialogContent>
                    )}
                  </Dialog>
                );
              })}
            </Marquee>

            {/* Second Marquee for the second half */}
            <Marquee gradient={false} speed={40} pauseOnHover={true} direction="right">
              {secondHalf.map((cert) => {
                const containerWidth = calculateWidth(cert.width, cert.height);
                return (
                  <Dialog key={cert.id}>
                    <DialogTrigger asChild>
                      <div
                        className="relative bg-gray-200 mx-2 cursor-pointer"
                        style={{ height: CONTAINER_HEIGHT, width: containerWidth }}
                        onClick={() => setSelectedCertificate(cert)}
                      >
                        <Image
                          src={cert.image}
                          alt={cert.alt}
                          className="object-contain p-4"
                          width={cert.width}
                          height={cert.height}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </DialogTrigger>

                    {/* Modal Popup */}
                    {selectedCertificate && (
                      <DialogContent className="max-w-4xl flex flex-col items-center justify-center">
                        <Image
                          src={selectedCertificate.image}
                          alt={selectedCertificate.alt}
                          width={selectedCertificate.width}
                          height={selectedCertificate.height}
                          className="rounded-lg"
                          style={{
                            maxWidth: "90vw", // Ensure it doesn't exceed the screen width
                            maxHeight: "80vh", // Ensure it doesn't exceed the screen height
                            width: "auto",
                            height: "auto",
                          }}
                        />
                        <p className="text-center mt-4 font-medium">{selectedCertificate.alt}</p>
                      </DialogContent>
                    )}
                  </Dialog>
                );
              })}
            </Marquee>
          </>
        )}
      </div>
    </section>
  );
}
