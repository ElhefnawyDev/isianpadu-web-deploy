import ExperiencesGIForm from "@/app/admin/Components/CreateNew/ExperiencesGenralInfo/experiencesGIForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditexperiencesGI = async ({ params }: Props) => {
  const ExperiencesGI = await prisma.experiencesGenralInfo.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ExperiencesGI) notFound();
  return <ExperiencesGIForm experiencesGI={ExperiencesGI}></ExperiencesGIForm>;
};

export default EditexperiencesGI;
