import CompanyBgForm from "@/app/admin/Components/CreateNew/CompanyBGForm/CompanyBgForm";
import PartnersForm from "@/app/admin/Components/CreateNew/Partner/partnerForm";
import VisionMissionForm from "@/app/admin/Components/CreateNew/VisionMission/CompanyBgForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditVmo = async ({ params }: Props) => {
  const vissionMission = await prisma.visionMission.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!vissionMission) notFound();
  return <VisionMissionForm visionMission={vissionMission}></VisionMissionForm>;
};

export default EditVmo;
