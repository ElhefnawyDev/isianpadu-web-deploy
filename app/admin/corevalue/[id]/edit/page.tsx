import CoreValueForm from "@/app/admin/Components/CreateNew/CoreValueForm/CoreValueForm";
import ProgressBarForm from "@/app/admin/Components/CreateNew/ProgressBarForm/ProgressBar";
import ServicesFormForm from "@/app/admin/Components/CreateNew/Services/ServicesForm";
import ServicesOneForm from "@/app/admin/Components/CreateNew/ServicesOne/ServicesForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditServices = async ({ params }: Props) => {
  const corevalue = await prisma.coreValue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!corevalue) notFound();
  return <CoreValueForm coreValue={corevalue}></CoreValueForm>;
};

export default EditServices;
