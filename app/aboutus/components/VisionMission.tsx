"use client";
import Image from "next/image";
import { Card, CardContent } from "../../experience/components/ui/Card";
import prisma from "@/prisma/client";

interface MissionVisionProps {
  missionDescription: string;
  visionDescription: string;
}

export default function MissionVision({
  missionDescription,
  visionDescription,
}: MissionVisionProps) {
  return (
    <div className="flex flex-col justify-around md:flex-row gap-8 max-w-7xl mx-auto">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[240px] space-y-4">
          <h3 className="text-xl font-semibold text-center text-blue-600">
            Mission
          </h3>
          <p className="text-md text-gray-600 text-center">
            {missionDescription}
          </p>
        </CardContent>
      </Card>
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[240px] space-y-4">
          <h3 className="text-xl font-semibold text-center text-red-600">
            Vision
          </h3>
          <p className="text-md text-gray-600 text-center">
            {visionDescription}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
