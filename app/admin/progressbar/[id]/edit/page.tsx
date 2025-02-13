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
  const progressBar = await prisma.progressBar.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!progressBar) notFound();
  return <ProgressBarForm progressBar={progressBar}></ProgressBarForm>;
};

export default EditServices;
