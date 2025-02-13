import prisma from "@/prisma/client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default async function CompanyIntroduction() {
  const companybg = await prisma.companyBackground.findFirst({where: {id:1}});

  return (
    <section className="container mx-auto px-4 py-12 flex justify-end">
      <div className="space-y-8">
        <div className="text-sm text-gray-600">What our customer say</div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              INTRODUCING
              <br />
              ISIANPADU
            </h1>

            <div className="space-y-6 text-gray-600 text-justify">
              <ReactMarkdown>
                {companybg?.description}
              </ReactMarkdown>
            </div>
          </div>

          <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
            <Image
              src={companybg!.Image}
              alt="ISIANPADU visual"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}